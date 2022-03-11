-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.0.45-community-nt


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema demo
--

CREATE DATABASE IF NOT EXISTS demo;
USE demo;

--
-- Definition of table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hibernate_sequence`
--

/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` (`next_val`) VALUES 
 (6);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;


--
-- Definition of table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` bigint(20) NOT NULL auto_increment,
  `product_code` varchar(255) default NULL,
  `product_name` varchar(255) default NULL,
  `selling_price` double default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`id`,`product_code`,`product_name`,`selling_price`) VALUES 
 (1,'101apple','apple',120),
 (2,'11komla','komla',120),
 (3,'123labu','labu',112);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;


--
-- Definition of table `sales_invoice`
--

DROP TABLE IF EXISTS `sales_invoice`;
CREATE TABLE `sales_invoice` (
  `id` bigint(20) NOT NULL,
  `customer_name` varchar(255) default NULL,
  `invoice_date` datetime default NULL,
  `invoice_number` varchar(255) default NULL,
  `total_amount` double default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sales_invoice`
--

/*!40000 ALTER TABLE `sales_invoice` DISABLE KEYS */;
INSERT INTO `sales_invoice` (`id`,`customer_name`,`invoice_date`,`invoice_number`,`total_amount`) VALUES 
 (1646981051709,'jesmin','2022-03-11 12:44:11','inv-121',1440);
/*!40000 ALTER TABLE `sales_invoice` ENABLE KEYS */;


--
-- Definition of table `sales_invoice_details`
--

DROP TABLE IF EXISTS `sales_invoice_details`;
CREATE TABLE `sales_invoice_details` (
  `id` bigint(20) NOT NULL auto_increment,
  `amount` double default NULL,
  `sales_invoice_id` bigint(20) default NULL,
  `line_number` int(11) default NULL,
  `product_id` bigint(20) default NULL,
  `product_name` varchar(255) default NULL,
  `quantity` double default NULL,
  `unit_price` double default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_sales_invoice_details_1` (`sales_invoice_id`),
  KEY `FK_product` (`product_id`),
  CONSTRAINT `FK_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FK_sales_invoice_details_1` FOREIGN KEY (`sales_invoice_id`) REFERENCES `sales_invoice` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sales_invoice_details`
--

/*!40000 ALTER TABLE `sales_invoice_details` DISABLE KEYS */;
INSERT INTO `sales_invoice_details` (`id`,`amount`,`sales_invoice_id`,`line_number`,`product_id`,`product_name`,`quantity`,`unit_price`) VALUES 
 (4,1440,1646981051709,0,2,'komla',12,120);
/*!40000 ALTER TABLE `sales_invoice_details` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
