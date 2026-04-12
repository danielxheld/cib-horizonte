<?php
session_start();

// .env laden
$envFile = __DIR__ . '/../../.env';
if (file_exists($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if (str_starts_with(trim($line), '#')) continue;
        putenv(trim($line));
    }
}

$adminUser = getenv('ADMIN_USER') ?: 'admin';
$adminPass = getenv('ADMIN_PASS') ?: '';

// Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: /admin/');
    exit;
}

// Login prüfen
if (!isset($_SESSION['admin_logged_in'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
        if ($_POST['user'] === $adminUser && $_POST['pass'] === $adminPass && $adminPass !== '') {
            $_SESSION['admin_logged_in'] = true;
            header('Location: /admin/');
            exit;
        }
        $loginError = 'Ungültige Zugangsdaten.';
    }
    showLogin($loginError ?? null);
    exit;
}

// Datenpfad
$dataDir = __DIR__ . '/../../src/_data';

// Seitenkonfiguration
$pages = [
    'site'           => ['label' => 'Allgemein', 'icon' => '⚙'],
    'home'           => ['label' => 'Startseite', 'icon' => '🏠'],
    'leistungen'     => ['label' => 'Leistungen', 'icon' => '📋'],
    'zertifizierung' => ['label' => 'Zertifizierung', 'icon' => '✓'],
    'kommunen'       => ['label' => 'Kommunen & Tourismus', 'icon' => '🏛'],
    'gastronomie'    => ['label' => 'Gastronomie & Hotellerie', 'icon' => '🍽'],
    'coaching'       => ['label' => 'Coaching', 'icon' => '💬'],
    'uebermich'      => ['label' => 'Über mich', 'icon' => '👤'],
    'kontakt'        => ['label' => 'Kontakt', 'icon' => '✉'],
];

$currentPage = $_GET['page'] ?? null;
$message = null;

// Speichern
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save']) && $currentPage) {
    $filePath = "$dataDir/$currentPage.json";
    if (file_exists($filePath)) {
        $json = $_POST['content'];
        $decoded = json_decode($json, true);
        if ($decoded !== null) {
            file_put_contents($filePath, json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
            // Rebuild auslösen
            $projectDir = realpath(__DIR__ . '/../../');
            exec("cd $projectDir && PATH=/usr/bin:/usr/local/bin:\$PATH /usr/bin/npx @11ty/eleventy 2>&1", $output, $code);
            $message = $code === 0
                ? ['type' => 'success', 'text' => 'Gespeichert und veröffentlicht!']
                : ['type' => 'error', 'text' => 'Gespeichert, aber Build fehlgeschlagen.'];
        } else {
            $message = ['type' => 'error', 'text' => 'Ungültiges JSON. Bitte prüfen Sie die Eingabe.'];
        }
    }
}

?><!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CIB Horizonte – Admin</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background: #F3EFE7; color: #2B2B2B; display: flex; min-height: 100vh; }
.sidebar { width: 260px; background: #0F1C33; color: #F3EFE7; padding: 24px 0; flex-shrink: 0; position: fixed; height: 100vh; overflow-y: auto; }
.sidebar-brand { padding: 0 24px 24px; border-bottom: 1px solid rgba(243,239,231,0.1); margin-bottom: 16px; }
.sidebar-brand h2 { font-size: 1.1rem; color: #F3EFE7; }
.sidebar-brand small { opacity: 0.5; font-size: 0.75rem; }
.sidebar a { display: flex; align-items: center; gap: 12px; padding: 10px 24px; color: #F3EFE7; text-decoration: none; font-size: 0.9rem; transition: background 0.2s; }
.sidebar a:hover, .sidebar a.active { background: rgba(243,239,231,0.1); }
.sidebar a.active { border-left: 3px solid #F3EFE7; }
.sidebar-footer { position: absolute; bottom: 0; width: 100%; padding: 16px 24px; border-top: 1px solid rgba(243,239,231,0.1); }
.sidebar-footer a { padding: 8px 0; font-size: 0.8rem; opacity: 0.6; }
.main { margin-left: 260px; flex: 1; padding: 32px 40px; max-width: 900px; }
.main h1 { color: #1E2F4F; font-size: 1.5rem; margin-bottom: 8px; }
.main .subtitle { color: #888; margin-bottom: 24px; font-size: 0.9rem; }
.msg { padding: 12px 20px; border-radius: 8px; margin-bottom: 20px; font-size: 0.9rem; }
.msg-success { background: #d4edda; color: #155724; }
.msg-error { background: #f8d7da; color: #721c24; }
.field { margin-bottom: 20px; }
.field label { display: block; font-weight: 500; font-size: 0.85rem; color: #1E2F4F; margin-bottom: 6px; }
.field input, .field textarea { width: 100%; padding: 10px 14px; border: 2px solid rgba(30,47,79,0.15); border-radius: 8px; font-family: inherit; font-size: 0.9rem; background: #fff; transition: border-color 0.2s; }
.field input:focus, .field textarea:focus { outline: none; border-color: #1E2F4F; }
.field textarea { min-height: 100px; resize: vertical; }
.field-group { background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 20px; border: 1px solid rgba(30,47,79,0.08); }
.field-group h3 { color: #1E2F4F; font-size: 1rem; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid rgba(30,47,79,0.08); }
.list-item { background: #f8f7f4; border-radius: 8px; padding: 16px; margin-bottom: 12px; position: relative; }
.list-item .remove-btn { position: absolute; top: 8px; right: 8px; background: none; border: none; color: #999; cursor: pointer; font-size: 1.2rem; }
.list-item .remove-btn:hover { color: #c00; }
.add-btn { background: none; border: 2px dashed rgba(30,47,79,0.2); border-radius: 8px; padding: 10px; width: 100%; cursor: pointer; color: #1E2F4F; font-size: 0.85rem; margin-top: 8px; transition: border-color 0.2s; }
.add-btn:hover { border-color: #1E2F4F; }
.btn { display: inline-block; padding: 12px 32px; border: none; border-radius: 8px; font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
.btn-primary { background: #1E2F4F; color: #fff; }
.btn-primary:hover { background: #0F1C33; }
.welcome { text-align: center; padding: 80px 40px; }
.welcome h2 { color: #1E2F4F; margin-bottom: 12px; }
.welcome p { color: #888; }
textarea.json-editor { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 0.85rem; min-height: 500px; white-space: pre; tab-size: 2; }
.tabs { display: flex; gap: 4px; margin-bottom: 20px; }
.tab { padding: 8px 16px; border-radius: 6px 6px 0 0; cursor: pointer; font-size: 0.85rem; border: 1px solid rgba(30,47,79,0.1); border-bottom: none; background: #fff; color: #888; }
.tab.active { background: #1E2F4F; color: #fff; }
</style>
</head>
<body>

<div class="sidebar">
    <div class="sidebar-brand">
        <h2>CIB Horizonte</h2>
        <small>Content-Verwaltung</small>
    </div>
    <?php foreach ($pages as $key => $page): ?>
    <a href="?page=<?= $key ?>" class="<?= $currentPage === $key ? 'active' : '' ?>">
        <span><?= $page['icon'] ?></span> <?= $page['label'] ?>
    </a>
    <?php endforeach; ?>
    <div class="sidebar-footer">
        <a href="/" target="_blank">Website ansehen</a>
        <a href="?logout">Abmelden</a>
    </div>
</div>

<div class="main">
<?php if (!$currentPage): ?>
    <div class="welcome">
        <h2>Willkommen im Admin-Bereich</h2>
        <p>Wählen Sie links eine Seite aus, um deren Inhalte zu bearbeiten.</p>
    </div>
<?php else:
    $filePath = "$dataDir/$currentPage.json";
    $data = file_exists($filePath) ? json_decode(file_get_contents($filePath), true) : [];
    $pageInfo = $pages[$currentPage];
?>
    <h1><?= $pageInfo['icon'] ?> <?= $pageInfo['label'] ?></h1>
    <p class="subtitle">Inhalte bearbeiten und veröffentlichen</p>

    <?php if ($message): ?>
    <div class="msg msg-<?= $message['type'] ?>"><?= $message['text'] ?></div>
    <?php endif; ?>

    <div class="tabs">
        <div class="tab active" onclick="showView('visual')">Visuell</div>
        <div class="tab" onclick="showView('json')">JSON</div>
    </div>

    <form method="POST" id="editForm">
        <input type="hidden" name="save" value="1">

        <div id="view-visual">
            <?php renderFields($data); ?>
        </div>

        <div id="view-json" style="display:none">
            <textarea name="content" class="json-editor" id="jsonEditor"><?= htmlspecialchars(json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) ?></textarea>
        </div>

        <br>
        <button type="submit" class="btn btn-primary" onclick="beforeSubmit()">Speichern & Veröffentlichen</button>
    </form>
<?php endif; ?>
</div>

<script>
function showView(view) {
    document.getElementById('view-visual').style.display = view === 'visual' ? 'block' : 'none';
    document.getElementById('view-json').style.display = view === 'json' ? 'block' : 'none';
    document.querySelectorAll('.tab').forEach((t, i) => {
        t.classList.toggle('active', (i === 0 && view === 'visual') || (i === 1 && view === 'json'));
    });
    if (view === 'json') syncToJson();
}

function syncToJson() {
    const data = collectData();
    document.getElementById('jsonEditor').value = JSON.stringify(data, null, 2);
}

function beforeSubmit() {
    if (document.getElementById('view-json').style.display === 'none') {
        syncToJson();
    }
}

function collectData() {
    const fields = document.querySelectorAll('[data-path]');
    const data = JSON.parse(document.getElementById('jsonEditor').value || '{}');

    fields.forEach(field => {
        const path = field.dataset.path.split('.');
        let obj = data;
        for (let i = 0; i < path.length - 1; i++) {
            if (obj[path[i]] === undefined) obj[path[i]] = {};
            obj = obj[path[i]];
        }
        obj[path[path.length - 1]] = field.value;
    });

    return data;
}
</script>

</body>
</html>

<?php
function showLogin($error = null) { ?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CIB Horizonte – Login</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background: #0F1C33; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
.login-box { background: #fff; border-radius: 16px; padding: 48px 40px; width: 100%; max-width: 400px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
.login-box h1 { color: #1E2F4F; font-size: 1.3rem; margin-bottom: 4px; }
.login-box p { color: #888; font-size: 0.85rem; margin-bottom: 28px; }
.login-box label { display: block; font-weight: 500; font-size: 0.85rem; color: #1E2F4F; margin-bottom: 6px; }
.login-box input { width: 100%; padding: 12px 14px; border: 2px solid rgba(30,47,79,0.15); border-radius: 8px; font-size: 0.9rem; margin-bottom: 16px; font-family: inherit; }
.login-box input:focus { outline: none; border-color: #1E2F4F; }
.login-box button { width: 100%; padding: 14px; background: #1E2F4F; color: #fff; border: none; border-radius: 8px; font-size: 0.95rem; font-weight: 500; cursor: pointer; }
.login-box button:hover { background: #0F1C33; }
.error { background: #f8d7da; color: #721c24; padding: 10px 14px; border-radius: 8px; font-size: 0.85rem; margin-bottom: 16px; }
</style>
</head>
<body>
<div class="login-box">
    <h1>CIB Horizonte</h1>
    <p>Content-Verwaltung</p>
    <?php if ($error): ?><div class="error"><?= $error ?></div><?php endif; ?>
    <form method="POST">
        <input type="hidden" name="login" value="1">
        <label>Benutzername</label>
        <input type="text" name="user" required autofocus>
        <label>Passwort</label>
        <input type="password" name="pass" required>
        <button type="submit">Anmelden</button>
    </form>
</div>
</body>
</html>
<?php }

function renderFields($data, $prefix = '') {
    foreach ($data as $key => $value) {
        $path = $prefix ? "$prefix.$key" : $key;
        $label = ucfirst(str_replace('_', ' ', $key));

        if (is_array($value) && !empty($value) && isset($value[0]) && is_string($value[0])) {
            // String-Array
            echo "<div class='field-group'><h3>$label</h3>";
            foreach ($value as $i => $item) {
                echo "<div class='field'><input type='text' data-path='{$path}.{$i}' value='" . htmlspecialchars($item) . "'></div>";
            }
            echo "</div>";
        } elseif (is_array($value) && !empty($value) && isset($value[0]) && is_array($value[0])) {
            // Object-Array
            echo "<div class='field-group'><h3>$label</h3>";
            foreach ($value as $i => $item) {
                echo "<div class='list-item'>";
                renderFields($item, "{$path}.{$i}");
                echo "</div>";
            }
            echo "</div>";
        } elseif (is_array($value) && !isset($value[0])) {
            // Nested object
            echo "<div class='field-group'><h3>$label</h3>";
            renderFields($value, $path);
            echo "</div>";
        } else {
            // Simple value
            $escaped = htmlspecialchars($value);
            if (strlen($value) > 80) {
                echo "<div class='field'><label>$label</label><textarea data-path='$path'>$escaped</textarea></div>";
            } else {
                echo "<div class='field'><label>$label</label><input type='text' data-path='$path' value='$escaped'></div>";
            }
        }
    }
}
?>
