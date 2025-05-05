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
$changes = $input['changes'] ?? [];

if (!$id || empty($changes)) {
    echo json_encode(['success' => false, 'message' => 'Неверные параметры']);
    exit;
}

try {
    $setParts = [];
    $params = [];
    $types = '';
    
    foreach ($changes as $field => $value) {
        $setParts[] = "$field = ?";
        $params[] = $value;
        $types .= 's';
    }
    
    $params[] = $id;
    $types .= 'i';
    
    $sql = "UPDATE reviews SET " . implode(', ', $setParts) . " WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$params);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка обновления']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Ошибка: ' . $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>