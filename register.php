<?php
header('Content-Type: application/json');
error_reporting(E_ALL);

require_once("link.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['registerName'];
    $surname = $_POST['registerSurname'];
    $patronymic = $_POST['registerPatronymic'] ?? '';
    $number = $_POST['registerNumber'];
    $password = $_POST['registerPassword']; // Сохраняем пароль в открытом виде

    // Проверяем, существует ли пользователь с таким номером
    $sql = "SELECT * FROM users WHERE number_user = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        echo json_encode(['success' => false, 'message' => 'Ошибка подготовки запроса: ' . $conn->error]);
        exit;
    }
    $stmt->bind_param('s', $number);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'Пользователь с таким номером уже существует']);
    } else {
        // Добавляем нового пользователя
        $sql = "INSERT INTO users (name_user, surname_user, patronymic_user, number_user, password_user) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            echo json_encode(['success' => false, 'message' => 'Ошибка подготовки запроса: ' . $conn->error]);
            exit;
        }
        $stmt->bind_param('sssss', $name, $surname, $patronymic, $number, $password);

        if ($stmt->execute()) {
            $conn->query("UPDATE users SET registration_date = NOW() WHERE number_user = '$number'");
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Ошибка при регистрации: ' . $stmt->error]);
        }
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Метод запроса не POST']);
}

$conn->close();
?>