<?php
// Убедимся, что нет пробелов перед <?php
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'Kursov';

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    error_log("DB Connection failed: ".$conn->connect_error);
    die(json_encode([
        'success' => false,
        'message' => 'Database connection error'
    ]));
}

$conn->set_charset("utf8mb4");
?>