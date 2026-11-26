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
} elseif ($path === 'XProtectMobile/Communication'
    || preg_match('~\AXProtectMobile/Video/[0-9A-Fa-f-]{36}/?\z~', $path)) {
    $method = 'POST';
} else {
    proxyError(404, 'not found');
}

if ($_SERVER['REQUEST_METHOD'] !== $method) {
    header('Allow: ' . $method);
    proxyError(405, 'method not allowed');
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
$options = [
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_CONNECTTIMEOUT => 8,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
    CURLOPT_RETURNTRANSFER => true,
];
if ($method === 'POST' || $body !== '') {
    $options[CURLOPT_POSTFIELDS] = $body;
}
curl_setopt_array($curl, $options);
$response = curl_exec($curl);
$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
$contentType = curl_getinfo($curl, CURLINFO_CONTENT_TYPE);
curl_close($curl);

if ($response === false || $status === 0) {
    proxyError(502, 'upstream');
}

http_response_code($status);
if ($contentType) {
    header('Content-Type: ' . $contentType);
}
header('Cache-Control: ' . ($method === 'GET' ? 'public, max-age=3600' : 'no-store'));
echo $response;
