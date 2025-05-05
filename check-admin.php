<?php
session_start();
header('Content-Type: application/json');

$isAdmin = false;

if (isset($_SESSION['user_id']) && isset($_SESSION['user_phone'])) {
    // Проверяем, является ли пользователь администратором
    require_once("link.php");
    
    $phone = $_SESSION['user_phone'];
    $password = $_SESSION['user_password'] ?? ''; // Нужно убедиться, что пароль сохраняется при авторизации
    
    $stmt = $conn->prepare("SELECT id_user FROM users WHERE number_user = ? AND password_user = ?");
    $stmt->bind_param("ss", $phone, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        // Проверяем, является ли это администратором (номер +79041090910)
        if ($phone === '+79041090910') {
            $isAdmin = true;
        }
    }
    
    $stmt->close();
    $conn->close();
}

echo json_encode([
    'success' => true,
    'isAdmin' => $isAdmin
]);
?>