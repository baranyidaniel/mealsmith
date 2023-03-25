-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Már 25. 14:18
-- Kiszolgáló verziója: 10.4.11-MariaDB
-- PHP verzió: 7.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `mealsmith`
--
CREATE DATABASE IF NOT EXISTS `mealsmith` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `mealsmith`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text COLLATE utf8_hungarian_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `follows`
--

CREATE TABLE `follows` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `kovetett_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `description` text COLLATE utf8_hungarian_ci NOT NULL,
  `short_desc` text COLLATE utf8_hungarian_ci DEFAULT NULL,
  `elkeszitesi_ido` int(11) NOT NULL,
  `adag` int(11) NOT NULL,
  `ingredients` text COLLATE utf8_hungarian_ci NOT NULL,
  `datum` datetime NOT NULL DEFAULT current_timestamp(),
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `title`, `description`, `short_desc`, `elkeszitesi_ido`, `adag`, `ingredients`, `datum`, `points`) VALUES
(1, 1, 'Chicken adobo', 'aaa', 'aa', 95, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-07 08:26:34', 5364),
(2, 1, 'Halászlé', 'aaa', 'aa', 195, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-06 01:26:34', 564),
(3, 1, 'Poutine', 'aaa', 'aa', 300, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-01 08:26:34', 53640),
(4, 1, 'Kimchi', 'aaa', 'aa', 63, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-07 01:26:34', 564),
(5, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `recept_kepek`
--

CREATE TABLE `recept_kepek` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `filename` text COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `passwd` varchar(40) COLLATE utf8_hungarian_ci NOT NULL,
  `display_name` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `description` text COLLATE utf8_hungarian_ci DEFAULT NULL,
  `points` int(11) NOT NULL DEFAULT 0,
  `reg` datetime NOT NULL DEFAULT current_timestamp(),
  `last` datetime DEFAULT NULL,
  `jog` int(11) NOT NULL DEFAULT 1,
  `img` varchar(200) COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `passwd`, `display_name`, `description`, `points`, `reg`, `last`, `jog`, `img`) VALUES
(1, 'admin', 'admin@admin.hu', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', NULL, NULL, 0, '2023-01-30 10:07:34', '2023-03-25 14:17:05', 0, NULL);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `recept_kepek`
--
ALTER TABLE `recept_kepek`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `follows`
--
ALTER TABLE `follows`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `recept_kepek`
--
ALTER TABLE `recept_kepek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
