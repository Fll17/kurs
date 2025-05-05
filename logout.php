<?php
session_start();

// Очищаем все данные сессии
$_SESSION = array();

// Удаляем cookie сессии
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(), 
        '', 
        time() - 42000,
        $params["path"], 
        $params["domain"],
        $params["secure"], 
        $params["httponly"]
    );
}

// Уничтожаем сессию
session_destroy();

// Возвращаем корректный JSON-ответ
header('Content-Type: application/json');
echo json_encode(['success' => true]);
exit();
?>