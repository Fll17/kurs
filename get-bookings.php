<?php
session_start();
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once("link.php");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false]);
    exit;
}

$userId = $_SESSION['user_id'];

// Получаем все бронирования пользователя, отсортированные по дате
$sql = "SELECT id_booking, corpus, apartment_type, full_name, phone, booking_date, booking_time 
        FROM bookings 
        WHERE user_id = ? 
        ORDER BY booking_date DESC, booking_time DESC";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Ошибка подготовки запроса: ' . $conn->error]);
    exit;
}

$stmt->bind_param('i', $userId);
$stmt->execute();
$result = $stmt->get_result();

$bookings = [];
while ($row = $result->fetch_assoc()) {
    $bookings[] = $row;
}

if (count($bookings) > 0) {
    echo json_encode(['success' => true, 'bookings' => $bookings]);
} else {
    echo json_encode(['success' => false]);
}

$stmt->close();
$conn->close();
?>