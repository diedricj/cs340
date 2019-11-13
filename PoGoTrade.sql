-- MySQL dump 10.16  Distrib 10.1.32-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: sakila
-- ------------------------------------------------------
-- Server version	10.1.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `id` int NOT NULL AUTO_INCREMENT,
  `team_name` varchar(45) NOT NULL,
  `team_color` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1, 'Mystic', 'blue'), (2, 'Valor', 'red'), (3, 'Instinct', 'yellow');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discord`
--

DROP TABLE IF EXISTS `discord`;

CREATE TABLE `discord` (
  `id` int NOT NULL AUTO_INCREMENT,
  `discord_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discord`
--

LOCK TABLES `discord` WRITE;
/*!40000 ALTER TABLE `discord` DISABLE KEYS */;
INSERT INTO `discord` VALUES (1, 'Chipaiyi'), (2, 'MicroMice'), (3, 'Winks'), (4,'Neenja'), (5, 'PerfectShinyPumpkinKing');
/*!40000 ALTER TABLE `discord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainer`
--

DROP TABLE IF EXISTS `trainer`;

CREATE TABLE `trainer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pogo_id` int NOT NULL,
  `trainer_name` varchar(45) NOT NULL,
  `discord_id` int,
  `team_id` int,
  FOREIGN KEY (`discord_id`)
    REFERENCES `discord` (`id`),
  FOREIGN KEY (`team_id`)
    REFERENCES `team` (`id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainer`
--

LOCK TABLES `trainer` WRITE;
/*!40000 ALTER TABLE `trainer` DISABLE KEYS */;
INSERT INTO `trainer` VALUES (1, 12345678, 'Kyshire', 1, 1), (2, 45831583, 'MicroMice', 2, 1), (3, 45381387, 'Winks', 3, 1), (4, 73131853,'Neenja', 4, 2),(5, 18318375, 'pkpdogg', 5, 3), (6, 84314351, 'ScrewdaBlue', 5, 3);
/*!40000 ALTER TABLE `trainer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pokedex`
--

DROP TABLE IF EXISTS `pokedex`;

CREATE TABLE `pokedex` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dex_id` int NOT NULL,
  `pokemon_name` varchar(45) NOT NULL,
  `regional` boolean not null DEFAULT 0,
  `shiny` boolean not null DEFAULT 0,
  `special` boolean not null DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokedex`
--

LOCK TABLES `pokedex` WRITE;
/*!40000 ALTER TABLE `pokedex` DISABLE KEYS */;
INSERT INTO `pokedex` (`dex_id`,`pokemon_name`) VALUES (1, 'Bulbasaur'), (2,'Ivysaur'), (3, 'Venusaur');
/*!40000 ALTER TABLE `pokedex` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `offering`;

CREATE TABLE `offering` (
  `pogo_id` int,
  `pokemon_id` int,
  FOREIGN KEY (`pogo_id`)
    REFERENCES `trainer` (`pogo_id`),
  FOREIGN KEY (`pokemon_id`)
    REFERENCES `pokedex` (`id`),
  PRIMARY KEY (`pogo_id`, `pokemon_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offering`
--

LOCK TABLES `offering` WRITE;
/*!40000 ALTER TABLE `offering` DISABLE KEYS */;
--INSERT INTO `offering` (`dex_id`,`pokemon_name`) VALUES (1, 'Bulbasaur'), (2,'Ivysaur'), (3, 'Venusaur');
/*!40000 ALTER TABLE `offering` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-27 16:41:55
