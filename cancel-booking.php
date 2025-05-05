<?php
session_start();
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once("link.php");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Требуется авторизация']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$bookingId = $input['id'] ?? null;

if (!$bookingId) {
    echo json_encode(['success' => false, 'message' => 'Не указан ID брони']);
    exit;
}

try {
    // Проверяем, что бронь принадлежит пользователю
    $checkStmt = $conn->prepare("SELECT id_booking FROM bookings WHERE id_booking = ? AND user_id = ?");
    $checkStmt->bind_param("ii", $bookingId, $_SESSION['user_id']);
    $checkStmt->execute();
    
    if (!$checkStmt->get_result()->num_rows) {
        echo json_encode(['success' => false, 'message' => 'Бронь не найдена или не принадлежит вам']);
        exit;
    }
    
    // Удаляем бронь
    $deleteStmt = $conn->prepare("DELETE FROM bookings WHERE id_booking = ?");
    $deleteStmt->bind_param("i", $bookingId);
    
    if ($deleteStmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка при удалении брони']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Ошибка: ' . $e->getMessage()]);
} finally {
    if (isset($checkStmt)) $checkStmt->close();
    if (isset($deleteStmt)) $deleteStmt->close();
    $conn->close();
}
?>