<?php
session_start();
header('Content-Type: application/json');
require_once("link.php");

if (!isset($_SESSION['is_admin']) || !$_SESSION['is_admin']) {
    echo json_encode(['success' => false, 'message' => 'Доступ запрещен']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'] ?? null;

if (!$id) {
    echo json_encode(['success' => false, 'message' => 'Неверные параметры']);
    exit;
}

try {
    // Удаляем связанные записи сначала (если нужно)
    $conn->begin_transaction();
    
    // Удаляем отзывы пользователя
    $stmt = $conn->prepare("DELETE FROM reviews WHERE user_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    
    // Удаляем бронирования пользователя
    $stmt = $conn->prepare("DELETE FROM bookings WHERE user_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    
    // Удаляем самого пользователя
    $stmt = $conn->prepare("DELETE FROM users WHERE id_user = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    
    $conn->commit();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => 'Ошибка: ' . $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>