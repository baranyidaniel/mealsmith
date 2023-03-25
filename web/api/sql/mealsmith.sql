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

--
-- A tábla adatainak kiíratása `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `post_id`) VALUES
(59, 7, 40);

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
  `title` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `description` text COLLATE utf8_hungarian_ci NOT NULL,
  `short_desc` varchar(100) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `elkeszitesi_ido` int(11) NOT NULL,
  `adag` int(11) NOT NULL DEFAULT 1,
  `ingredients` text COLLATE utf8_hungarian_ci NOT NULL,
  `datum` datetime NOT NULL DEFAULT current_timestamp(),
  `points` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `title`, `description`, `short_desc`, `elkeszitesi_ido`, `adag`, `ingredients`, `datum`, `points`) VALUES
(1, 1, 'dfghdfgh', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit ac arcu in rhoncus. Fusce sollicitudin sollicitudin diam eget tristique. Nullam varius nibh consequat, fringilla ante a, aliquam enim. Nam convallis augue vitae porttitor viverra. Cras laoreet accumsan magna ut vulputate. Etiam pellentesque fermentum ex at lacinia. Proin nibh ligula, rutrum vitae sagittis nec, pretium non lectus. Curabitur fringilla eu elit at pharetra. Praesent et luctus nibh. Maecenas tempor augue in nibh imperdiet, sed tempus odio egestas. Etiam ut dui ac ex maximus efficitur at eu nisl. Nulla consectetur non leo vel pretium. Praesent dapibus fringilla quam ac porta. Etiam varius facilisis pulvinar.\r\n\r\nPhasellus eu lobortis ex, et volutpat sapien. Aliquam aliquam quam iaculis quam efficitur, nec efficitur dolor tempor. Nulla turpis est, vehicula id aliquam non, rutrum sed mi. Mauris lacinia sed augue id iaculis. Sed leo orci, scelerisque non feugiat id, faucibus ut arcu. Etiam dapibus, justo quis dapibus cursus, lorem tortor porta lacus, id feugiat diam neque in nisl. Etiam sollicitudin urna condimentum vehicula pharetra. Proin ultricies nec sem a tempor. Duis sed consequat ligula. Integer sodales consequat quam, vel tempor justo pharetra pulvinar. Nunc porttitor vitae magna a scelerisque. In malesuada, nulla vel pharetra ornare, purus enim convallis neque, a malesuada nulla nisl et ex. Sed vestibulum quis leo a iaculis.\r\n\r\nEtiam at sem nisl. Etiam ut hendrerit risus. Suspendisse potenti. Sed pretium maximus velit quis dictum. Duis efficitur justo quis sem placerat ullamcorper. Quisque quis ipsum dapibus nisi placerat placerat. Ut et nibh sem.\r\n\r\nMauris malesuada, mauris non interdum pretium, diam felis varius erat, et dapibus risus augue a ex. Aenean pharetra mi quis est consectetur, sed interdum ipsum varius. Proin porta quam lorem. In lacinia auctor nunc, sed imperdiet sem ornare fermentum. Etiam et dolor sapien. Maecenas nisi augue, ullamcorper facilisis tellus a, efficitur pellentesque diam. Vivamus consequat erat mi, ut volutpat turpis pharetra a. Duis et risus a libero elementum placerat. Sed ultricies turpis sit amet commodo ullamcorper. Aliquam sit amet mi non ligula efficitur auctor. Quisque vel augue sit amet nunc maximus ornare. Mauris accumsan nec mauris quis commodo. Nunc ex massa, congue quis nulla et, vestibulum dictum diam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed odio ex, maximus et scelerisque in, finibus eu odio. Sed ultrices sapien quis scelerisque tincidunt. ', 'ez egy nagyon hosszú leírás kipróbálás céljából, hogy láthassuk, hogy hogy néz ki a kártyán az, amik', 95, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-07 08:26:34', 5364),
(2, 1, 'Halászlé', 'aaa', 'aa', 195, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-06 01:26:34', 564),
(3, 1, 'Poutine', 'aaa', 'aa', 300, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-01 08:26:34', 53640),
(4, 1, 'Kimchi', 'aaa', 'aa', 35, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-07 01:26:34', 564),
(5, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(6, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(7, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(8, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(9, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(10, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(11, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(12, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(13, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(14, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(15, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(16, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(17, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(18, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(19, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(20, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(21, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(22, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(23, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(24, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(25, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(26, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(27, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(28, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(29, 1, 'Chicken adobo 4', 'aaa', 'aa', 100, 1, 'chicken;500 mg|zöldség;400 mg|ketchup;1 kg', '2023-02-08 12:40:34', 12),
(30, 0, 'asdasd', 'asdddddddaddddddddddddddddddddddddd', 'asdasdasd', 23, 1, '', '2023-03-01 10:15:33', 0),
(31, 0, 'Új reczept', 'hosszú leírás', 'rövid', 666, 1, '', '2023-03-01 10:28:27', 0),
(32, 7, 'Hó', 'Menj ki a házból (nehéz)\r\nHa tél van, szedj össze egy kis havat, ha nincs tél, várd meg, amíg tél lesz\r\nkészzi ius !!!!', 'Ezzel a recepttel nagyon finom havat lehet készíteni, én mindig ezt csomagolom a gyerekeimnek az isk', 5, 1, 'hó;16kg', '2023-03-03 12:06:22', 0),
(33, 7, 'Hó 2', 'Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú Nagyon hosszú', 'Rövidke leíráska', 2322, 1, '1kg;ketchup', '2023-03-03 12:15:24', 0),
(34, 7, '213', '123', '123', 213, 1, '123', '2023-03-06 13:25:45', 0),
(35, 7, 'asd', 'asd\nasd\na\nda\nsd\nas\nsa\ndsa\nds', 'asdasdasdasd', 233, 1, 'asdsad;23', '2023-03-07 08:31:28', 0),
(36, 10, 'Egy antológia. Két műhely. Negyvennyolc vers. Megs', 'Egy antológia. Két műhely. Negyvennyolc vers. Megszámlálhatatlan közös történet.\nFelhajtóerő - a Jelenkor Kiadó és a Vates közös kortársvers-antológiája.\n\nA tartásunk, a felhajtóerőnk: az elemi hiány, hogy éppen abból a valamiből nincs nekünk, amiről azt gondoljuk, lennie kell. Mondjuk, szeretetből, Istenből, humorból, szülőből, lelkiismeretből. Leginkább pedig tartásból, felhajtóerőből.\nEzzel jön létre a Mi. Mert alighanem mindannyian így vagy úgy, de benne vagyunk ebben a könyvben, hiába nem gondoljuk magunkat egyként összetartozónak - talán csak ha nagy és közös, igazán fenyegető ellenséget találnánk. Keresni akkor is külön-külön, párban vagy legfeljebb kisebb csoportokban keresnénk, és egymásra is csak akkor ismernénk, ha szemközt vagyunk az ellenséggel. Azzal a valamivel, amitől annyira féltünk, hogy el kellett indulnunk megkeresni. Állunk előtte, és körbetekintünk:\n,,beértünk mindannyian,\nhogy egyszerre értünk,\nhogy most értünk be -\nés most elbukunk.\"\nHogy ne bukjunk el, végtére is két út kínálkozik. Megmenekülünk néhányan, ügyességünknek vagy a véletlennek köszönhetően, hátrahagyva a többieket. Lehettek volna ők is ügyesek vagy szerencsések. A másik út mára nehezen komolyan vehető, titokban mégis vágyott kockázata a létezésnek. Az, hogy megszólalunk: önmagunkról például, és nem önmagunkért.\n\nBeck Zoltán\n\nA kötet szerzői: Áfra János, András László, Babiczky Tibor, Balla Zsófia, Bándi Máté, Biró Krisztián, Csider István Zoltán, Dékány Dávid, Deres Kornélia, Erdős Virág, Eszenyi Fanni, Fehér Renátó, Fekete Vince, Gráf Dóra, Horváth Benji, Horváth Florencia, Izsó Zita, Kali Ágnes, Kállay Eszter, Kemény István, Kemény Zsófi, Kiss Dávid, Kósa Eszter, Kustos Júlia, Láng Orsolya, Locker Dávid, Lukács Flóra, Nádasdy Ádám, Nagy Dániel, Nagy Márta Júlia, Nemes Z. Márió, Peer Krisztián, Pion István, Purosz Leonidasz, Ráday Zsófia, Seres Lili Hanna, Simon Bettina, Simon Márton, Székely Szabolcs, Szijj Ferenc, Terék Anna, Tóth Krisztina, Tóth Vivien, Turi Tímea, Vajna Ádám, Vida Kamilla, Závada Péter, Zilahi Anna', 'Egy antológia. Két műhely. Negyvennyolc vers. Megszámlálhatatlan közös történet.\nFelhajtóerő - a Jel', 323, 1, 'Egy antológia. Két műhely. Negyvennyolc vers. Megszámlálhatatlan közös történet.\nFelhajtóerő - a Jelenkor Kiadó és a Vates közös kortársvers-antológiája.\n\nA tartásunk, a felhajtóerőnk: az elemi hiány, hogy éppen abból a valamiből nincs nekünk, amiről azt gondoljuk, lennie kell. Mondjuk, szeretetből, Istenből, humorból, szülőből, lelkiismeretből. Leginkább pedig tartásból, felhajtóerőből.\nEzzel jön létre a Mi. Mert alighanem mindannyian így vagy úgy, de benne vagyunk ebben a könyvben, hiába nem gondoljuk magunkat egyként összetartozónak - talán csak ha nagy és közös, igazán fenyegető ellenséget találnánk. Keresni akkor is külön-külön, párban vagy legfeljebb kisebb csoportokban keresnénk, és egymásra is csak akkor ismernénk, ha szemközt vagyunk az ellenséggel. Azzal a valamivel, amitől annyira féltünk, hogy el kellett indulnunk megkeresni. Állunk előtte, és körbetekintünk:\n,,beértünk mindannyian,\nhogy egyszerre értünk,\nhogy most értünk be -\nés most elbukunk.\"\nHogy ne bukjunk el, végtére is két út kínálkozik. Megmenekülünk néhányan, ügyességünknek vagy a véletlennek köszönhetően, hátrahagyva a többieket. Lehettek volna ők is ügyesek vagy szerencsések. A másik út mára nehezen komolyan vehető, titokban mégis vágyott kockázata a létezésnek. Az, hogy megszólalunk: önmagunkról például, és nem önmagunkért.\n\nBeck Zoltán\n\nA kötet szerzői: Áfra János, András László, Babiczky Tibor, Balla Zsófia, Bándi Máté, Biró Krisztián, Csider István Zoltán, Dékány Dávid, Deres Kornélia, Erdős Virág, Eszenyi Fanni, Fehér Renátó, Fekete Vince, Gráf Dóra, Horváth Benji, Horváth Florencia, Izsó Zita, Kali Ágnes, Kállay Eszter, Kemény István, Kemény Zsófi, Kiss Dávid, Kósa Eszter, Kustos Júlia, Láng Orsolya, Locker Dávid, Lukács Flóra, Nádasdy Ádám, Nagy Dániel, Nagy Márta Júlia, Nemes Z. Márió, Peer Krisztián, Pion István, Purosz Leonidasz, Ráday Zsófia, Seres Lili Hanna, Simon Bettina, Simon Márton, Székely Szabolcs, Szijj Ferenc, Terék Anna, Tóth Krisztina, Tóth Vivien, Turi Tímea, Vajna Ádám, Vida Kamilla, Závada Péter, Zilahi Anna', '2023-03-07 09:15:22', 0),
(37, 7, 'fláaerkégtmjer t', 'sadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hf', 'sadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hfsadfhs sgh', 25, 12, 'sadfhs sghsfhfg sgfhs fghsghs hs fghsfhsdf hf', '2023-03-08 10:06:25', 0),
(38, 12, 'Ezt a tartalmat az űrlap tulajdonosa hozta létre. ', 'Ezt a tartalmat az űrlap tulajdonosa hozta létre. Az adatok, amelyeket beküld, az úrlap tulajdonosához kerülnek. A Microsoft nem tartozik felelősséggel az ügyfelei adatvédelmi és/vagy biztonsági gyakorlataiért, közöttük az űrlap tulajdonosáéért sem. Soha ne adja ki a jelszavát!\nSzolgáltató: Microsoft Forms | Az űrlap tulajdonosa nem adott meg adatvédelmi nyilatkozatot arra vonatkozóan, hogy hogyan fogják felhasználni a válaszadatokat. Ne adjon meg személyes vagy érzékeny adatokat.\n| Használati feltételek', 'Ezt a tartalmat az űrlap tulajdonosa hozta létre. Az adatok, amelyeket beküld, az úrlap tulajdonosáh', 23, 23, '', '2023-03-08 11:28:12', 0),
(39, 7, 'asdadasd', 'asdasdasdasdad', 'asdad', 233, 2, 'asd;sd 2|ketchup;23 kg|barany;999999 kg|kerék ádám tamás;425 kg|', '2023-03-10 12:23:28', 0),
(40, 7, 'ketchup', 's\nd\nd\nf', 'as', 23, 12, 'ketchup;1kg|', '2023-03-13 13:50:32', 99999999),
(41, 13, 'ggg', 'dd\nds', 'sd', 34, 3, 'só;8 kg|', '2023-03-17 12:22:24', 0);

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
(1, 'admin', 'admin@admin.hu', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', NULL, NULL, 0, '2023-01-30 10:07:34', '2023-03-25 14:17:05', 0, NULL),
(2, 'Teszt1', 'teszt@teszt.hu', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', 'Teszt Elek', 'asdasd', 32313, '2023-01-31 09:05:25', NULL, 1, NULL),
(4, 'teszter', 'teszt@er.gov', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', NULL, NULL, 0, '2023-01-31 09:29:36', NULL, 1, NULL),
(7, 'petyerka', 'szabopeter@turr.hu', '069313aeea17a7d95ecc3399e174bd0bb18e00eb', 'óbazS retéP', '-', 99999999, '2023-03-01 11:34:50', '2023-03-22 10:57:23', 1, NULL),
(9, 'asd', 'asd@asd.hu', '3810f3c42b21d2bc4f26609152909346c5a04923', NULL, NULL, 0, '2023-03-06 13:43:42', NULL, 1, NULL),
(10, 'barany', 'baranyidaniel@turr.hu', '3810f3c42b21d2bc4f26609152909346c5a04923', NULL, NULL, 0, '2023-03-06 14:07:39', '2023-03-07 09:14:01', 1, NULL),
(11, 'asdasdasasdasdasdsadasdasdsaddsdsdsdsdsdsdsdsdssds', 'a@aa.hu', '3810f3c42b21d2bc4f26609152909346c5a04923', NULL, NULL, 0, '2023-03-08 10:18:03', '2023-03-08 10:18:14', 1, NULL),
(12, '漢字漢字漢字漢字漢字漢字漢字漢字', 'asd@gov.cn', '069313aeea17a7d95ecc3399e174bd0bb18e00eb', NULL, NULL, 0, '2023-03-08 10:21:09', '2023-03-08 10:21:50', 1, NULL),
(13, 'mao', 'mao@gov.cn', '170bec8a686f790c7eb8dfa2fae3cc04d24394d2', NULL, NULL, 0, '2023-03-14 08:43:10', '2023-03-22 09:56:05', 1, NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT a táblához `recept_kepek`
--
ALTER TABLE `recept_kepek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
