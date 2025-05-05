<?php
session_start();
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once("link.php");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Необходима авторизация']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$userId = $_SESSION['user_id'];
$corpus = $input['corpus'] ?? '';
$apartmentType = $input['apartmentType'] ?? '';
$bookingDate = $input['bookingDate'] ?? '';
$bookingTime = $input['bookingTime'] ?? '';

// 1. Проверка на максимальное количество броней (3 в день)
$stmt = $conn->prepare("
    SELECT COUNT(*) as count 
    FROM bookings 
    WHERE user_id = ? 
    AND booking_date = ?
");
$stmt->bind_param('is', $userId, $bookingDate);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();

if ($result['count'] >= 3) {
    echo json_encode([
        'success' => false,
        'message' => 'Вы не можете забронировать более 3 квартир в день'
    ]);
    exit;
}

// 2. Проверка на повторное бронирование той же квартиры
$stmt = $conn->prepare("
    SELECT id_booking 
    FROM bookings 
    WHERE user_id = ? 
    AND corpus = ? 
    AND apartment_type = ? 
    AND booking_date = ?
");
$stmt->bind_param('isss', $userId, $corpus, $apartmentType, $bookingDate);
$stmt->execute();

if ($stmt->get_result()->num_rows > 0) {
    echo json_encode([
        'success' => false,
        'message' => 'Вы уже бронировали эту квартиру на выбранную дату'
    ]);
    exit;
}

// 3. Проверка занятости времени другими пользователями
$stmt = $conn->prepare("
    SELECT id_booking, created_at 
    FROM bookings 
    WHERE corpus = ? 
    AND apartment_type = ? 
    AND booking_date = ? 
    AND booking_time = ?
    ORDER BY created_at ASC
    LIMIT 1
");
$stmt->bind_param('ssss', $corpus, $apartmentType, $bookingDate, $bookingTime);
$stmt->execute();
$existingBooking = $stmt->get_result()->fetch_assoc();

if ($existingBooking) {
    // Предлагаем время на 1 час позже
    $newTime = date('H:i', strtotime($bookingTime) + 3600);
    
    if (date('H', strtotime($newTime)) >= 20) {
        echo json_encode([
            'success' => false,
            'message' => 'Это время уже занято. Следующее доступное время - завтра с 10:00'
        ]);
        exit;
    }
    
    echo json_encode([
        'success' => false,
        'message' => 'Это время уже занято другим пользователем',
        'alternativeTime' => $newTime
    ]);
    exit;
}

// Если все проверки пройдены, создаем бронь
$stmt = $conn->prepare("
    INSERT INTO bookings 
    (user_id, corpus, apartment_type, full_name, phone, booking_date, booking_time) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
");
$stmt->bind_param('issssss', 
    $userId, 
    $corpus, 
    $apartmentType, 
    $input['fullName'], 
    $input['phone'], 
    $bookingDate, 
    $bookingTime
);


if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка при бронировании']);
}

// После успешного бронирования
document.dispatchEvent(new Event('booking-created'));

$stmt->close();
$conn->close();
?>