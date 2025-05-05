<?php
session_start();
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once("link.php");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Метод запроса не POST']);
    exit;
}

$number = $_POST['loginNumber'] ?? '';
$password = $_POST['loginPassword'] ?? '';
$_SESSION['user_phone'] = $number;

if (empty($number) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Номер и пароль обязательны']);
    exit;
}

$sql = "SELECT id_user, name_user, surname_user, password_user FROM users WHERE number_user = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Ошибка подготовки запроса: ' . $conn->error]);
    exit;
}

$stmt->bind_param('s', $number);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
   // После успешной проверки пароля
// После успешной проверки пароля
if ($password === $user['password_user']) {
    $fullName = $user['name_user'] . ' ' . $user['surname_user'];
    $_SESSION['user_id'] = $user['id_user'];
    $_SESSION['user_name'] = $fullName;
    $_SESSION['user_phone'] = $number;
    $_SESSION['user_password'] = $password;
    
    // Проверяем, является ли пользователь администратором
    $isAdmin = ($number === '+79041090910');
    $_SESSION['is_admin'] = $isAdmin; // Сохраняем в сессии
    
    echo json_encode([
        'success' => true, 
        'userName' => $fullName,
        'isAdmin' => $isAdmin
    ]);
} else {
        echo json_encode(['success' => false, 'message' => 'Неверный пароль']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Пользователь не найден']);
}

$stmt->close();
$conn->close();