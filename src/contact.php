<?php
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ============================================
// SMTP-Zugangsdaten hier eintragen
// ============================================
$smtpHost     = 'mail.example.com';      // SMTP-Server
$smtpPort     = 587;                      // Port (587 = TLS, 465 = SSL)
$smtpUser     = 'info@cib-horizonte.de';  // SMTP-Benutzername
$smtpPass     = '';                       // SMTP-Passwort
$empfaenger   = 'info@cib-horizonte.de';  // Empfänger der Kontaktanfragen
// ============================================

// Spam-Schutz: Honeypot
if (!empty($_POST['website'])) {
    echo json_encode(['success' => true, 'message' => 'Vielen Dank!']);
    exit;
}

// Spam-Schutz: Zeitprüfung (mind. 3 Sekunden)
$formtime = intval($_POST['formtime'] ?? 0);
if ($formtime > 0 && (Date('U') * 1000 - $formtime) < 3000) {
    http_response_code(429);
    echo json_encode(['error' => 'Bitte warten Sie einen Moment.']);
    exit;
}

$name = htmlspecialchars(strip_tags($_POST['name'] ?? ''));
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$anliegen = htmlspecialchars(strip_tags($_POST['anliegen'] ?? ''));
$nachricht = htmlspecialchars(strip_tags($_POST['nachricht'] ?? ''));

if (!$name || !$email || !$nachricht) {
    http_response_code(400);
    echo json_encode(['error' => 'Bitte füllen Sie alle Pflichtfelder aus.']);
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = $smtpHost;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtpUser;
    $mail->Password   = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $smtpPort;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom($smtpUser, 'CIB Horizonte Website');
    $mail->addAddress($empfaenger);
    $mail->addReplyTo($email, $name);

    $mail->Subject = "Kontaktanfrage: $anliegen";
    $mail->Body = "Neue Kontaktanfrage über die Website:\n\n"
        . "Name: $name\n"
        . "E-Mail: $email\n"
        . "Anliegen: $anliegen\n\n"
        . "Nachricht:\n$nachricht\n";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Vielen Dank! Ihre Nachricht wurde gesendet.']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Die Nachricht konnte nicht gesendet werden.']);
}
