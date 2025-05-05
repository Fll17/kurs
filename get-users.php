<?php
header('Content-Type: application/json');
require_once("link.php");

$searchTerm = $_GET['search'] ?? '';
$sortField = $_GET['sort'] ?? 'id_user';
$sortDirection = $_GET['dir'] ?? 'asc';

// Валидация полей сортировки
$allowedSortFields = ['id_user', 'name_user', 'surname_user', 'number_user', 'registration_date', 'reviews_count', 'bookings_count'];
$sortField = in_array($sortField, $allowedSortFields) ? $sortField : 'id_user';
$sortDirection = strtolower($sortDirection) === 'desc' ? 'DESC' : 'ASC';

try {
    $query = "SELECT u.*, 
          (SELECT COUNT(*) FROM reviews r WHERE r.user_id = u.id_user) as reviews_count,
          (SELECT COUNT(*) FROM bookings b WHERE b.user_id = u.id_user) as bookings_count
          FROM users u";
    
    if (!empty($searchTerm)) {
        $query .= " WHERE u.name_user LIKE ? OR u.surname_user LIKE ? OR u.number_user LIKE ?";
        $searchParam = "%$searchTerm%";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sss", $searchParam, $searchParam, $searchParam);
    } else {
        $stmt = $conn->prepare($query);
    }
    
    $stmt->execute();
    $result = $stmt->get_result();
    $users = $result->fetch_all(MYSQLI_ASSOC);
    
    // Сортировка
    usort($users, function($a, $b) use ($sortField, $sortDirection) {
        if ($sortDirection === 'DESC') {
            return $b[$sortField] <=> $a[$sortField];
        }
        return $a[$sortField] <=> $b[$sortField];
    });
    
    echo json_encode([
        'success' => true,
        'users' => $users
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Ошибка: ' . $e->getMessage()
    ]);
}
?>