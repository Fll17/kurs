<?php
header('Content-Type: application/json');
require_once("link.php");

try {
  $stmt = $conn->query("
    SELECT 
      r.text, 
      DATE_FORMAT(r.date, '%d ') AS day_part,
      CASE MONTH(r.date)
        WHEN 1 THEN 'января'
        WHEN 2 THEN 'февраля'
        WHEN 3 THEN 'марта'
        WHEN 4 THEN 'апреля'
        WHEN 5 THEN 'мая'
        WHEN 6 THEN 'июня'
        WHEN 7 THEN 'июля'
        WHEN 8 THEN 'августа'
        WHEN 9 THEN 'сентября'
        WHEN 10 THEN 'октября'
        WHEN 11 THEN 'ноября'
        WHEN 12 THEN 'декабря'
      END AS month_part,
      DATE_FORMAT(r.date, '%Y') AS year_part,
      CONCAT(u.name_user, ' ', u.surname_user) AS username 
    FROM reviews r
    JOIN users u ON r.user_id = u.id_user
    ORDER BY r.date ASC
  ");

  $reviews = $stmt->fetch_all(MYSQLI_ASSOC);
  $formattedReviews = array_map(function($review) {
      return [
          'text' => $review['text'],
          'date' => $review['day_part'] . $review['month_part'] . ' ' . $review['year_part'],
          'username' => $review['username']
      ];
  }, $reviews);
  
  echo json_encode(['success' => true, 'reviews' => $formattedReviews]);
} catch (Exception $e) {
  echo json_encode(['success' => false, 'message' => 'Ошибка: ' . $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>