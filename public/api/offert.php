<?php
// Tar emot offertförfrågan. PHP 7.3-kompatibel.
// Utan config.php körs TESTLÄGE: inget mejl skickas och inget sparas.
// config.php (laddas upp separat, ligger ej i git):
//   <?php return ['mottagare' => 'info@sakerhetsmaklarna.se', 'avsandare' => 'webb@sakerhetsmaklarna.se'];

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method']);
    exit;
}

function falt($namn, $max = 500) {
    $v = isset($_POST[$namn]) ? trim((string) $_POST[$namn]) : '';
    $v = str_replace(["\r", "\0"], '', $v);
    return mb_substr($v, 0, $max);
}

// Honeypot: botar fyller i dolda fält. Låtsas att det gick bra.
if (falt('webbplats') !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

$namn = falt('namn', 120);
$tel = falt('telefon', 40);
$epost = falt('epost', 160);
$start = falt('start', 20);
$typ = falt('typ', 80);
$medd = falt('meddelande', 3000);

if ($namn === '' || $tel === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'saknas']);
    exit;
}
if ($epost !== '' && !filter_var($epost, FILTER_VALIDATE_EMAIL)) {
    $epost = '';
}

$configFil = __DIR__ . '/config.php';
if (!is_file($configFil)) {
    echo json_encode(['ok' => true, 'test' => true]);
    exit;
}
$cfg = require $configFil;

$rader = [
    'Namn: ' . $namn,
    'Telefon: ' . $tel,
    'E-post: ' . ($epost ?: '-'),
    'Önskat startdatum: ' . ($start ?: '-'),
    'Typ: ' . ($typ ?: '-'),
    '',
    $medd ?: '(inget meddelande)',
];
$amne = '=?UTF-8?B?' . base64_encode('Offertförfrågan: ' . $typ . ' – ' . $namn) . '?=';
$headers = [
    'From: ' . $cfg['avsandare'],
    'Content-Type: text/plain; charset=UTF-8',
];
if ($epost !== '') {
    $headers[] = 'Reply-To: ' . $epost;
}

$ok = mail($cfg['mottagare'], $amne, implode("\n", $rader), implode("\r\n", $headers));
if (!$ok) {
    http_response_code(500);
}
echo json_encode(['ok' => (bool) $ok]);
