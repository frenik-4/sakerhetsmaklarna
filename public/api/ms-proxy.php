<?php

header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex');

function proxyError(int $status, string $error): void
{
    http_response_code($status);
    header('Content-Type: application/json');
    header('Cache-Control: no-store');
    echo json_encode(['error' => $error]);
    exit;
}

$configFile = __DIR__ . '/ms-config.php';
if (!is_file($configFile)) {
    proxyError(503, 'not configured');
}

$config = require $configFile;
$origin = $config['origin'] ?? null;
if (!is_string($origin) || !filter_var($origin, FILTER_VALIDATE_URL)
    || !preg_match('~\Ahttps://(?:\[[0-9A-Fa-f:.]+\]|[A-Za-z0-9.-]+)(?::[0-9]+)?\z~', $origin)) {
    proxyError(503, 'not configured');
}

$path = $_GET['p'] ?? '';
if (!is_string($path) || strpos($path, '..') !== false || strpos($path, '\\') !== false
    || strpos($path, "\0") !== false || preg_match('~\A(?:/|[A-Za-z][A-Za-z0-9+.-]*:)~', $path)) {
    proxyError(404, 'not found');
}

// Apache prepends the rewritten path before appending the original query string.
if (preg_match('/\Ap=([^&]*)/', $_SERVER['QUERY_STRING'] ?? '', $match)
    && urldecode($match[1]) !== $path) {
    proxyError(404, 'not found');
}

if (preg_match('~\AXPMobileSDK/[A-Za-z0-9_./-]+\.js\z~', $path)) {
    $method = 'GET';
    $maxResponseBytes = 2 * 1024 * 1024;
} elseif ($path === 'XProtectMobile/Communication' || $path === 'XProtectMobile/Video') {
    $method = 'POST';
    $maxResponseBytes = 4 * 1024 * 1024;
} else {
    proxyError(404, 'not found');
}

if ($_SERVER['REQUEST_METHOD'] !== $method) {
    header('Allow: ' . $method);
    proxyError(405, 'method not allowed');
}

if ($path === 'XProtectMobile/Video') {
    $videoId = $_SERVER['HTTP_X_MS_VIDEO_ID'] ?? '';
    if (!preg_match('~\A[0-9A-Fa-f-]{36}\z~', $videoId)) {
        proxyError(400, 'invalid video id');
    }
    $path .= '/' . $videoId . '/';
}

$maxBodyBytes = 1024 * 1024;
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > $maxBodyBytes) {
    proxyError(413, 'body too large');
}
$body = file_get_contents('php://input', false, null, 0, $maxBodyBytes + 1);
if ($body === false) {
    proxyError(400, 'invalid body');
}
if (strlen($body) > $maxBodyBytes) {
    proxyError(413, 'body too large');
}

$headers = ['Origin: ' . $origin, 'Referer: ' . $origin];
if (!empty($_SERVER['CONTENT_TYPE'])) {
    $headers[] = 'Content-Type: ' . $_SERVER['CONTENT_TYPE'];
} else {
    // Suppress cURL's default Content-Type when sending a body without one.
    $headers[] = 'Content-Type:';
}

$curl = curl_init($origin . '/' . $path);
$status = null;
$contentType = null;
$headersReady = false;
$responseBytes = 0;
$cacheControl = $method === 'GET' ? 'public, max-age=3600' : 'no-store';
$options = [
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_CONNECTTIMEOUT => 8,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
    CURLOPT_HEADERFUNCTION => function ($curl, string $line) use (
        &$status, &$contentType, &$headersReady, $cacheControl
    ): int {
        if (preg_match('~\AHTTP/\S+\s+([0-9]{3})\b~', $line, $match)) {
            $status = (int) $match[1];
            $contentType = null;
            $headersReady = false;
        } elseif ($status !== null && strncasecmp($line, 'Content-Type:', 13) === 0) {
            $contentType = trim(substr($line, 13));
        } elseif ($status !== null && trim($line) === '') {
            if ($status >= 200) {
                http_response_code($status);
                if ($contentType !== null && $contentType !== '') {
                    header('Content-Type: ' . $contentType);
                } else {
                    header_remove('Content-Type');
                }
                header('Cache-Control: ' . $cacheControl);
                $headersReady = true;
            }
            $status = null;
        }
        return strlen($line);
    },
    CURLOPT_WRITEFUNCTION => function ($curl, string $chunk) use (
        $maxResponseBytes, &$headersReady, &$responseBytes
    ): int {
        $length = strlen($chunk);
        if (!$headersReady || $length > $maxResponseBytes - $responseBytes) {
            return -1;
        }

        $responseBytes += $length;
        echo $chunk;
        if (ob_get_level() > 0) {
            ob_flush();
        }
        flush();
        return $length;
    },
];
if ($method === 'POST' || $body !== '') {
    $options[CURLOPT_POSTFIELDS] = $body;
}
curl_setopt_array($curl, $options);
$response = curl_exec($curl);
curl_close($curl);

// Once streaming starts, a failed transfer ends without appending an error body.
if ($responseBytes === 0 && ($response === false || !$headersReady)) {
    proxyError(502, 'upstream');
}
