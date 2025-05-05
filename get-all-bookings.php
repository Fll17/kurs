<?php
header('Content-Type: application/json');
require_once("link.php");

// Получаем параметры сортировки
$sortField = $_GET['sort'] ?? 'created_at';
$sortDirection = $_GET['dir'] ?? 'desc';

// Валидация полей сортировки
$allowedSortFields = [
    'id_booking', 'full_name', 'corpus', 'apartment_type', 
    'booking_date', 'created_at', 'phone'
];
$sortField = in_array($sortField, $allowedSortFields) ? $sortField : 'created_at';
$sortDirection = strtolower($sortDirection) === 'asc' ? 'ASC' : 'DESC';

try {
    // Подготавливаем запрос с сортировкой
    $query = "SELECT b.*, CONCAT(u.name_user, ' ', u.surname_user) as full_name, u.number_user as phone
              FROM bookings b
              JOIN users u ON b.user_id = u.id_user
              ORDER BY ";
    
    // Особые случаи для сложных полей
    switch ($sortField) {
        case 'full_name':
            $query .= "u.surname_user $sortDirection, u.name_user $sortDirection";
            break;
        case 'booking_date':
            $query .= "b.booking_date $sortDirection, b.booking_time $sortDirection";
            break;
        default:
            $query .= "b.$sortField $sortDirection";
    }
    
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $bookings = $result->fetch_all(MYSQLI_ASSOC);
    
    // Форматируем даты для удобства
    foreach ($bookings as &$booking) {
        $booking['formatted_booking_date'] = date('d.m.Y H:i', strtotime($booking['booking_date'] . ' ' . $booking['booking_time']));
        $booking['formatted_created_at'] = date('d.m.Y H:i', strtotime($booking['created_at']));
    }
    
    echo json_encode([
        'success' => true,
        'bookings' => $bookings,
        'sort' => [
            'field' => $sortField,
            'direction' => strtolower($sortDirection)
        ]
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Ошибка: ' . $e->getMessage()
    ]);
}

$stmt->close();
$conn->close();
?>