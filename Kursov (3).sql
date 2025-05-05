-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 23 2025 г., 09:39
-- Версия сервера: 10.7.5-MariaDB
-- Версия PHP: 8.0.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `Kursov`
--

-- --------------------------------------------------------

--
-- Структура таблицы `bookings`
--

CREATE TABLE `bookings` (
  `id_booking` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `corpus` varchar(10) NOT NULL,
  `apartment_type` varchar(10) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `booking_date` date NOT NULL,
  `booking_time` time NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `bookings`
--

INSERT INTO `bookings` (`id_booking`, `user_id`, `corpus`, `apartment_type`, `full_name`, `phone`, `booking_date`, `booking_time`, `created_at`) VALUES
(14, 10, 'k3', '3k', 'Белова Марина Евгеньевна', '+79012345678', '2025-04-30', '10:00:00', '2025-04-19 15:54:54'),
(15, 9, 'k3', '4k', 'Сидоров Михаил Игоревич', '+79345678901', '2025-04-19', '14:30:00', '2025-04-19 15:56:33'),
(16, 10, 'k3', '2k', 'Белова Марина Евгеньевна', '+79012345678', '2025-05-15', '16:00:00', '2025-04-19 16:04:29'),
(17, 8, 'k4', '3k', 'Иванов Алексей Дмитриевич', '+79123456789', '2025-06-15', '17:00:00', '2025-04-19 16:05:58');

-- --------------------------------------------------------

--
-- Структура таблицы `callbacks`
--

CREATE TABLE `callbacks` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `is_email` tinyint(1) NOT NULL,
  `apartment_type` varchar(10) DEFAULT NULL,
  `corpus` varchar(10) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `processed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `callbacks`
--

INSERT INTO `callbacks` (`id`, `full_name`, `contact`, `is_email`, `apartment_type`, `corpus`, `created_at`, `processed`) VALUES
(1, 'Иванов Алексей Дмитриевич', '+12221211212', 0, '1k', 'k4', '2025-04-20 03:40:24', 0),
(2, 'Сидоров Михаил Игоревич', '+78498093490', 0, '2k', 'k3', '2025-04-20 03:41:58', 0),
(4, 'Белова Марина Евгеньевна', '+23334423453', 0, NULL, 'k4', '2025-04-20 04:20:27', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `text`, `date`) VALUES
(2, 2, 'Выбирали жильё долго и остановились на EARTH & SKY – не пожалели! Район развивается быстро, транспортная развязка рядом, а под домом открыли крутое кафе. Жить здесь – одно удовольствие!', '2025-03-19 14:33:26'),
(9, 7, 'Живём полгода – никаких нареканий! Управляющая компания действительно заботится о резидентах: зимой чистили снег, летом поливают газоны. Приятно, когда о тебе думают!', '2025-04-19 18:48:04'),
(10, 8, 'УК работает на высоте: быстро реагируют на заявки, территория всегда чистая, охрана бдит. Жаль, что не везде такой сервис!', '2025-04-19 18:50:39'),
(11, 9, 'Бронировали квартиру онлайн – удобно, быстро и без лишних бумаг. Особенно порадовала возможность заморозки цены на этапе стройки. Отличный сервис!', '2025-04-19 18:52:47'),
(12, 10, 'Квартира светлая, с панорамными окнами и хорошей шумоизоляцией. Видно, что строили с душой – никаких косяков, как в других новостройках. Рекомендую!', '2025-04-19 18:54:21');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name_user` varchar(50) NOT NULL,
  `surname_user` varchar(50) NOT NULL,
  `patronymic_user` varchar(50) DEFAULT NULL,
  `number_user` varchar(15) NOT NULL,
  `password_user` varchar(255) NOT NULL,
  `registration_date` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id_user`, `name_user`, `surname_user`, `patronymic_user`, `number_user`, `password_user`, `registration_date`) VALUES
(2, 'Дверцов', 'Афонасьев', 'Алесандр', '+9090009900', '123', '2025-04-05 17:58:57'),
(5, 'Admin', '', '', '+79041090910', '1A4B6C8D0', '2025-04-05 17:58:57'),
(6, 'Дмитрий', 'Юрьевич', '', '+7890903212', '123', '2025-04-06 13:35:00'),
(7, 'Юрий', 'Кирцов', 'Васильевич', '+78929032312', '123', '2025-04-19 15:46:41'),
(8, 'Иванов', 'Алексей', 'Дмитриевич', '+79123456789', 'alex123', '2025-04-19 15:49:51'),
(9, 'Сидоров', 'Михаил', 'Игоревич', '+79345678901', 'misha555', '2025-04-19 15:51:42'),
(10, 'Белова', 'Марина', 'Евгеньевна', '+79012345678', 'marina22', '2025-04-19 15:53:48');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id_booking`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `callbacks`
--
ALTER TABLE `callbacks`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `number_user` (`number_user`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id_booking` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `callbacks`
--
ALTER TABLE `callbacks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`);

--
-- Ограничения внешнего ключа таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
