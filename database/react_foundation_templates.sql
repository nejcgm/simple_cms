-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (x86_64)
--
-- Host: localhost    Database: react_foundation
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `templates`
--

DROP TABLE IF EXISTS `templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `templates` (
  `template_id` int NOT NULL AUTO_INCREMENT,
  `template_name` varchar(255) NOT NULL,
  `is_visible` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`template_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templates`
--

LOCK TABLES `templates` WRITE;
/*!40000 ALTER TABLE `templates` DISABLE KEYS */;
INSERT INTO `templates` VALUES (1,'Header Template',0,'2024-10-15 17:40:59','2025-01-08 17:51:42'),(2,'mission_template',1,'2024-10-23 13:20:05','2024-12-22 13:39:55'),(3,'programs_template',1,'2024-10-24 06:43:17','2024-12-18 07:25:13'),(4,'people_template',1,'2024-10-28 08:44:07','2024-12-20 07:42:45'),(5,'planet_template',1,'2024-10-28 09:34:19','2025-01-06 12:34:14'),(6,'relief_template',1,'2024-10-28 09:44:21','2024-10-28 09:44:21'),(7,'getinvolved_template',1,'2024-10-28 09:53:16','2024-12-16 12:44:54'),(8,'the_foundation',1,'2024-11-25 07:04:43','2025-01-06 13:37:02'),(9,'funding',1,'2024-11-25 07:50:58','2024-12-20 08:20:59'),(10,'frank',1,'2024-11-25 12:02:26','2024-12-30 18:30:51'),(11,'sylvia',1,'2024-11-25 12:02:26','2024-12-17 11:45:36'),(12,'vanessa',1,'2024-11-25 12:02:26','2024-12-23 15:46:47'),(13,'albert',1,'2024-11-25 12:02:26','2024-12-16 12:43:56'),(14,'edvin',1,'2024-11-25 12:02:26','2024-12-23 15:47:49'),(15,'melissa',1,'2024-11-25 12:02:26','2024-11-25 12:02:26'),(16,'our_team',1,'2024-11-25 13:59:21','2024-12-16 13:49:10'),(17,'frank_full',1,'2024-11-27 07:32:12','2024-11-27 07:32:12'),(18,'sylvia_full',1,'2024-11-27 07:37:48','2024-11-27 07:37:48'),(19,'vanesa_full',1,'2024-11-27 07:46:36','2024-11-27 07:46:36'),(20,'albert_full',1,'2024-11-27 07:46:36','2024-11-27 07:46:36'),(21,'edwin_full',1,'2024-11-27 07:46:36','2024-11-27 07:46:36'),(22,'melissa_full',1,'2024-11-27 07:46:36','2024-11-27 07:46:36'),(23,'join_team',1,'2024-11-27 09:15:38','2024-12-17 11:15:40'),(24,'contact_us',1,'2024-11-27 09:33:02','2024-11-27 09:33:02'),(25,'InvolvedHead',1,'2024-11-27 10:59:51','2024-11-27 10:59:51'),(26,'about_program',1,'2024-11-27 16:09:08','2024-11-27 16:09:08'),(27,'get_content',1,'2024-11-28 11:39:53','2024-11-28 11:39:53'),(28,'future_funding',1,'2024-11-28 12:10:39','2024-11-28 12:10:39'),(29,'join_us',1,'2024-11-28 12:28:35','2024-11-28 12:28:35');
/*!40000 ALTER TABLE `templates` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-29 15:38:56
