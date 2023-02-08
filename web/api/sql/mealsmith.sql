-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Feb 08. 12:52
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `mealsmith`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text COLLATE utf8_hungarian_ci NOT NULL,
  `datum` datetime NOT NULL DEFAULT current_timestamp(),
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `favorites`
--

CREATE TABLE `favorites` (
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `follows`
--

CREATE TABLE `follows` (
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
(2, 1, 'Chicken adobo 2', 'aaa', 'aa', 195, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-07 08:26:34', 564),
(3, 1, 'Chicken adobo 3', 'aaa', 'aa', 300, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-07 08:26:34', 53640);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `recept_kepek`
--

CREATE TABLE `recept_kepek` (
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
(1, 'admin', 'admin@admin.hu', 'a', NULL, NULL, 0, '2023-01-30 10:07:34', NULL, 0, NULL),
(2, 'Teszt1', 'teszt@teszt.hu', 'a', 'Teszt Elek', 'asdasd', 32313, '2023-01-31 09:05:25', NULL, 1, NULL),
(4, 'teszter', 'teszt@er.gov', 'gfdff', NULL, NULL, 0, '2023-01-31 09:29:36', NULL, 1, NULL);

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
  ADD PRIMARY KEY (`user_id`);

--
-- A tábla indexei `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`user_id`);

--
-- A tábla indexei `posts`
--
ALTER TABLE `posts`
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
-- AUTO_INCREMENT a táblához `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
