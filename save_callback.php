<?php
header('Content-Type: application/json');

// Отключаем вывод ошибок в production
ini_set('display_errors', 0);
ini_set('log_errors', 1);

try {
    // Подключение к базе данных
    $host = 'localhost';
    $dbname = 'Kursov';
    $username = 'root';
    $password = '';

    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Получаем данные из запроса
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON input');
    }

    // Проверяем обязательные поля
    if (empty($data['name']) || empty($data['contact'])) {
        throw new Exception('Заполните все обязательные поля');
    }

    // Подготовка SQL запроса
    $sql = "INSERT INTO callbacks 
            (full_name, contact, is_email, apartment_type, corpus, created_at) 
            VALUES 
            (:name, :contact, :is_email, :apartment_type, :corpus, NOW())";

    $stmt = $pdo->prepare($sql);
    
    $stmt->bindParam(':name', $data['name']);
    $stmt->bindParam(':contact', $data['contact']);
    $stmt->bindValue(':is_email', $data['is_email'] ? 1 : 0, PDO::PARAM_INT);
    $stmt->bindParam(':apartment_type', $data['apartment_type']);
    $stmt->bindParam(':corpus', $data['corpus']);
    
    if (!$stmt->execute()) {
        throw new Exception('Ошибка при сохранении данных');
    }
    
    echo json_encode(['success' => true, 'message' => 'Данные успешно сохранены']);
    
} catch (Exception $e) {
    http_response_code(400); // Bad Request
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}