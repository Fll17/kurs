<?php
session_start();
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once("link.php");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Неверный метод запроса']);
    exit;
}

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Не авторизован']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$reviewText = $data['text'] ?? '';

if (mb_strlen($reviewText) > 2000) {
    echo json_encode(['success' => false, 'message' => 'Максимум 2000 символов']);
    exit;
}

try {
    $stmt = $conn->prepare("INSERT INTO reviews (user_id, text) VALUES (?, ?)");
    $stmt->bind_param("is", $_SESSION['user_id'], $reviewText);
    $stmt->execute();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Ошибка: ' . $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>