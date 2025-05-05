<?php
header('Content-Type: application/json');
require_once("link.php");

// Получаем и валидируем параметры
$sortField = isset($_GET['sort']) ? $_GET['sort'] : 'date';
$sortDirection = isset($_GET['dir']) ? strtolower($_GET['dir']) : 'desc';

// Разрешенные поля для сортировки
$allowedFields = [
    'id' => 'r.id',
    'user_name' => 'user_name',
    'date' => 'r.date',
    'text' => 'r.text'
];

// Проверяем поле сортировки
if (!array_key_exists($sortField, $allowedFields)) {
    $sortField = 'date';
}

// Проверяем направление сортировки
$sortDirection = in_array($sortDirection, ['asc', 'desc']) ? strtoupper($sortDirection) : 'DESC';

try {
    // Формируем SQL-запрос
    $query = "SELECT 
                r.id, 
                r.text, 
                r.date, 
                CONCAT(u.name_user, ' ', u.surname_user) as user_name
              FROM reviews r
              JOIN users u ON r.user_id = u.id_user
              ORDER BY ";
    
    // Особый случай для сортировки по имени пользователя
    if ($sortField === 'user_name') {
        $query .= "u.surname_user {$sortDirection}, u.name_user {$sortDirection}";
    } else {
        $query .= "{$allowedFields[$sortField]} {$sortDirection}";
    }
    
    $stmt = $conn->prepare($query);
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }
    
    $stmt->execute();
    $result = $stmt->get_result();
    $reviews = $result->fetch_all(MYSQLI_ASSOC);
    
    // Форматируем данные для вывода
    foreach ($reviews as &$review) {
        $review['formatted_date'] = date('d.m.Y H:i', strtotime($review['date']));
        $review['short_text'] = (mb_strlen($review['text']) > 100) 
            ? mb_substr($review['text'], 0, 100) . '...' 
            : $review['text'];
    }
    
    echo json_encode([
        'success' => true,
        'reviews' => $reviews,
        'sort' => [
            'field' => $sortField,
            'direction' => strtolower($sortDirection)
        ]
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Ошибка сервера',
        'error' => $e->getMessage(),
        'query' => $query
    ]);
}

$stmt->close();
$conn->close();
?>