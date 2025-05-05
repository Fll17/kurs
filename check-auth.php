<?php
session_start();
header('Content-Type: application/json');

// Убедимся, что все необходимые переменные сессии существуют
$response = [
    'success' => false,
    'userId' => null,
    'userName' => '',
    'userPhone' => '',
    'isAdmin' => false
];

try {
    // Проверяем базовую авторизацию
    if (isset($_SESSION['user_id'])) {
        $response['success'] = true;
        $response['userId'] = $_SESSION['user_id'];
        
        // Проверяем наличие имени пользователя
        if (isset($_SESSION['user_name'])) {
            $response['userName'] = $_SESSION['user_name'];
        }
        
        // Проверяем наличие номера телефона
        if (isset($_SESSION['user_phone'])) {
            $response['userPhone'] = $_SESSION['user_phone'];
            
            // Проверяем административные права (без вывода номера в ответ)
            $response['isAdmin'] = ($_SESSION['user_phone'] === '+79041090910');
            
            // Дополнительная проверка через отдельный флаг
            if (isset($_SESSION['is_admin'])) {
                $response['isAdmin'] = $_SESSION['is_admin'];
            }
        }
        
        // Логирование попытки доступа (можно закомментировать после тестирования)
        error_log("Auth check for user ID: " . $_SESSION['user_id'] . ", Admin: " . ($response['isAdmin'] ? 'Yes' : 'No'));
    }
    
    // Защита от кэширования
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    
    echo json_encode($response);
    
} catch (Exception $e) {
    // Логируем ошибку, но не раскрываем детали клиенту
    error_log("Error in check-auth.php: " . $e->getMessage());
    
    // Возвращаем минимальный безопасный ответ
    echo json_encode([
        'success' => false,
        'error' => 'Authentication check failed'
    ]);
}

// Всегда завершаем выполнение
exit();
?>