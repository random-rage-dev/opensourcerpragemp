/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 80014
Source Host           : localhost:3306
Source Database       : state

Target Server Type    : MYSQL
Target Server Version : 80014
File Encoding         : 65001

Date: 2019-07-27 03:46:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `accounts`
-- ----------------------------
DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `socialClub` varchar(255) NOT NULL,
  `hardwareID` varchar(255) NOT NULL,
  `devServer` int(11) NOT NULL,
  `teamStatus` int(11) NOT NULL,
  `banned` int(11) NOT NULL,
  `bannedDay` varchar(255) NOT NULL DEFAULT 'none',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of accounts
-- ----------------------------
INSERT INTO `accounts` VALUES ('2', 'SnillocTV', '$2a$10$4U38PHJ6lFno2OR8YYEVV.5X7S1lr/esKOlJpZIIq6psT2DT4WV3m', 'HappyAngle2018', 'D8903A045B468240F6E46180E642C110B918AC0CC6C8F78057F018C8DD223FC0E84C9E6C60B48158D9BA6430DB44143010AE08A056B6E938FE90A2587796E180', '0', '0', '0', 'none');

-- ----------------------------
-- Table structure for `atms`
-- ----------------------------
DROP TABLE IF EXISTS `atms`;
CREATE TABLE `atms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `posX` int(255) DEFAULT NULL,
  `posY` int(255) DEFAULT NULL,
  `posZ` int(255) DEFAULT NULL,
  `money` int(11) DEFAULT NULL,
  `usable` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of atms
-- ----------------------------
INSERT INTO `atms` VALUES ('1', '147', '-1035', '29', '5000', '0');

-- ----------------------------
-- Table structure for `bank_konten`
-- ----------------------------
DROP TABLE IF EXISTS `bank_konten`;
CREATE TABLE `bank_konten` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ownerId` int(11) DEFAULT '0',
  `amout` decimal(38,2) DEFAULT '0.00',
  `kontonummer` varchar(50) DEFAULT NULL,
  `beschreibung` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bank_konten
-- ----------------------------
INSERT INTO `bank_konten` VALUES ('1', '2', '5000.00', '14654565', 'Anna Klein');

-- ----------------------------
-- Table structure for `characters`
-- ----------------------------
DROP TABLE IF EXISTS `characters`;
CREATE TABLE `characters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountID` int(11) NOT NULL,
  `ped` int(11) NOT NULL,
  `pedHash` int(11) NOT NULL,
  `created` int(11) NOT NULL DEFAULT '0',
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `posX` float NOT NULL,
  `posY` float NOT NULL,
  `posZ` float NOT NULL,
  `posR` float NOT NULL,
  `dimension` int(11) NOT NULL,
  `health` float NOT NULL,
  `armor` float NOT NULL,
  `food` float NOT NULL,
  `drink` float NOT NULL,
  `adminRank` int(11) NOT NULL,
  `faction` varchar(1255) NOT NULL DEFAULT 'Civillian',
  `factioncloth` varchar(1255) NOT NULL DEFAULT 'Zivil',
  `duty` int(11) NOT NULL DEFAULT '0',
  `onlineId` int(11) NOT NULL DEFAULT '0',
  `isOnline` int(11) NOT NULL DEFAULT '0',
  `factionrang` int(11) NOT NULL,
  `money` float NOT NULL,
  `phone` int(11) NOT NULL,
  `phoneNumber` int(11) NOT NULL,
  `isCreator` int(11) NOT NULL,
  `data` text NOT NULL,
  `hat` int(11) NOT NULL,
  `hattext` int(11) NOT NULL,
  `eye` int(11) NOT NULL,
  `eyetext` int(11) NOT NULL,
  `mask` int(11) NOT NULL,
  `masktext` int(11) NOT NULL,
  `shirt` int(11) NOT NULL,
  `shirttext` int(11) NOT NULL,
  `jacket` int(11) NOT NULL,
  `jackettext` int(11) NOT NULL,
  `body` int(11) NOT NULL,
  `bodytext` int(11) NOT NULL,
  `torso` int(11) NOT NULL,
  `leg` int(11) NOT NULL,
  `legtext` int(11) NOT NULL,
  `shoe` int(11) NOT NULL,
  `shoetext` int(11) NOT NULL,
  `earpice` int(11) NOT NULL,
  `accessoire` int(11) NOT NULL,
  `arm` int(11) NOT NULL,
  `bday` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of characters
-- ----------------------------
INSERT INTO `characters` VALUES ('2', '2', '0', '0', '1', 'Anna', 'Klein', '444.127', '-1015.35', '28.6143', '89.6239', '0', '58', '77', '38', '0', '6', 'Civillian', 'Zivil', '0', '0', '1', '0', '25489', '0', '323548632', '0', '{\"Gender\":1,\"Parents\":{\"Father\":0,\"Mother\":37,\"Similarity\":0,\"SkinSimilarity\":0},\"Features\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\"Appearance\":[{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":1,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1}],\"Hair\":[3,29,29,0,0,0,0,0,0]}', '44', '0', '11', '0', '1', '1', '2', '0', '16', '0', '0', '0', '12', '16', '7', '1', '5', '0', '0', '12', null);
INSERT INTO `characters` VALUES ('3', '2', '0', '0', '1', 'Jack', 'Collins', '10.4857', '21.3888', '70.6414', '291.699', '0', '88', '0', '100', '100', '0', 'Civillian', 'Zivil', '0', '0', '0', '0', '0', '0', '0', '0', '{\"Gender\":0,\"Parents\":{\"Father\":14,\"Mother\":24,\"Similarity\":0.12,\"SkinSimilarity\":0.44},\"Features\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\"Appearance\":[{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1}],\"Hair\":[0,0,0,0,0,0,0,0,0]}', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');

-- ----------------------------
-- Table structure for `faction`
-- ----------------------------
DROP TABLE IF EXISTS `faction`;
CREATE TABLE `faction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `dutyX` int(11) DEFAULT NULL,
  `dutyY` int(11) DEFAULT NULL,
  `dutyZ` int(11) DEFAULT NULL,
  `clothesX` int(11) DEFAULT NULL,
  `clothesY` int(11) DEFAULT NULL,
  `clothesZ` int(11) DEFAULT NULL,
  `equipX` int(11) DEFAULT NULL,
  `equipY` int(11) DEFAULT NULL,
  `equipZ` int(11) DEFAULT NULL,
  `pcX` int(11) DEFAULT NULL,
  `pcY` int(11) DEFAULT NULL,
  `pcZ` int(11) DEFAULT NULL,
  `chiefX` int(11) DEFAULT NULL,
  `chiefY` int(11) DEFAULT NULL,
  `chiefZ` int(11) DEFAULT NULL,
  `vehicleX` int(11) DEFAULT NULL,
  `vehicleY` int(11) DEFAULT NULL,
  `vehicleZ` int(11) DEFAULT NULL,
  `parkX` int(11) DEFAULT NULL,
  `parkY` int(11) DEFAULT NULL,
  `parkZ` int(11) DEFAULT NULL,
  `ausnahme` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of faction
-- ----------------------------
INSERT INTO `faction` VALUES ('1', 'LSPD', '440', '-976', '31', '458', '-993', '31', '452', '-980', '31', '442', '-979', '31', '448', '-973', '31', '441', '-1000', '31', '452', '-997', '26', '0');

-- ----------------------------
-- Table structure for `garage`
-- ----------------------------
DROP TABLE IF EXISTS `garage`;
CREATE TABLE `garage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `pedx` int(11) DEFAULT NULL,
  `pedy` int(11) DEFAULT NULL,
  `pedz` int(11) DEFAULT NULL,
  `pedr` int(11) DEFAULT NULL,
  `spawn1x` int(11) DEFAULT NULL,
  `spawn1y` int(11) DEFAULT NULL,
  `spawn1z` int(11) DEFAULT NULL,
  `spawn1r` int(11) DEFAULT NULL,
  `spawn2x` int(11) DEFAULT NULL,
  `spawn2y` int(11) DEFAULT NULL,
  `spawn2z` int(11) DEFAULT NULL,
  `spawn2r` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of garage
-- ----------------------------
INSERT INTO `garage` VALUES ('1', 'test', '162', '-1037', '29', '266', '166', '-1037', '29', '266', '166', '-1037', '29', '266');

-- ----------------------------
-- Table structure for `items`
-- ----------------------------
DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemName` varchar(50) NOT NULL DEFAULT '0',
  `usable` varchar(50) NOT NULL DEFAULT '0',
  `type` varchar(50) NOT NULL DEFAULT '0',
  `fillvalue` int(11) NOT NULL DEFAULT '0',
  `itemcount` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of items
-- ----------------------------
INSERT INTO `items` VALUES ('1', 'Wasser', 'Y', 'drink', '15', '1');
INSERT INTO `items` VALUES ('2', 'Belegtes Brötchen', 'Y', 'food', '15', '1');
INSERT INTO `items` VALUES ('3', 'Tasche', 'Y', 'bag', '0', '1');
INSERT INTO `items` VALUES ('4', 'Tasche ausgepackt', 'Y', 'bag', '0', '1');

-- ----------------------------
-- Table structure for `licenses`
-- ----------------------------
DROP TABLE IF EXISTS `licenses`;
CREATE TABLE `licenses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `charId` int(11) NOT NULL DEFAULT '0',
  `weapona` int(11) NOT NULL DEFAULT '0',
  `weaponb` int(11) NOT NULL DEFAULT '0',
  `pkw` int(11) NOT NULL DEFAULT '0',
  `lkw` int(11) NOT NULL DEFAULT '0',
  `pilot` int(11) NOT NULL DEFAULT '0',
  `job` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of licenses
-- ----------------------------
INSERT INTO `licenses` VALUES ('4', '2', '1', '1', '1', '1', '1', '1');
INSERT INTO `licenses` VALUES ('5', '3', '0', '0', '0', '0', '0', '0');

-- ----------------------------
-- Table structure for `shortcuts`
-- ----------------------------
DROP TABLE IF EXISTS `shortcuts`;
CREATE TABLE `shortcuts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `charId` int(11) DEFAULT NULL,
  `num1animA` varchar(255) DEFAULT NULL,
  `num1animB` varchar(255) DEFAULT NULL,
  `num1animC` int(11) DEFAULT NULL,
  `num1animD` int(11) DEFAULT NULL,
  `num1name` varchar(255) DEFAULT 'Nicht Belegt',
  `num2animA` varchar(255) DEFAULT NULL,
  `num2animB` varchar(255) DEFAULT NULL,
  `num2animC` int(11) DEFAULT NULL,
  `num2animD` int(11) DEFAULT NULL,
  `num2name` varchar(255) DEFAULT 'Nicht Belegt',
  `num3animA` varchar(255) DEFAULT NULL,
  `num3animB` varchar(255) DEFAULT NULL,
  `num3animC` int(11) DEFAULT NULL,
  `num3animD` int(11) DEFAULT NULL,
  `num3name` varchar(255) DEFAULT 'Nicht Belegt',
  `num4animA` varchar(255) DEFAULT 'Nicht Belegt',
  `num4animB` varchar(255) DEFAULT 'Nicht Belegt',
  `num4animC` int(11) DEFAULT NULL,
  `num4animD` int(11) DEFAULT NULL,
  `num4name` varchar(255) DEFAULT 'Nicht Belegt',
  `num5animA` varchar(255) DEFAULT NULL,
  `num5animB` varchar(255) DEFAULT NULL,
  `num5animC` int(11) DEFAULT NULL,
  `num5animD` int(11) DEFAULT NULL,
  `num5name` varchar(255) DEFAULT 'Nicht Belegt',
  `num6animA` varchar(255) DEFAULT NULL,
  `num6animB` varchar(255) DEFAULT NULL,
  `num6animC` int(11) DEFAULT NULL,
  `num6animD` int(11) DEFAULT NULL,
  `num6name` varchar(255) DEFAULT 'Nicht Belegt',
  `num7animA` varchar(255) DEFAULT NULL,
  `num7animB` varchar(255) DEFAULT NULL,
  `num7animC` int(11) DEFAULT NULL,
  `num7animD` int(11) DEFAULT NULL,
  `num7name` varchar(255) DEFAULT 'Nicht Belegt',
  `num8animA` varchar(255) DEFAULT NULL,
  `num8animB` varchar(255) DEFAULT NULL,
  `num8animC` int(11) DEFAULT NULL,
  `num8animD` int(11) DEFAULT NULL,
  `num8name` varchar(255) DEFAULT 'Nicht Belegt',
  `num9animA` varchar(255) DEFAULT NULL,
  `num9animB` varchar(255) DEFAULT NULL,
  `num9animC` int(11) DEFAULT NULL,
  `num9animD` int(11) DEFAULT NULL,
  `num9name` varchar(255) DEFAULT 'Nicht Belegt',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shortcuts
-- ----------------------------
INSERT INTO `shortcuts` VALUES ('1', '2', '\"amb@world_human_sunbathe@male@back@base\"', '\"base\"', '1', '35', 'Auf dem Rücken liegen', '\"timetable@amanda@drunk@idle_a\"', '\"idle_pinot\"', '1', '33', 'Betrunken liegen', '\"amb@world_human_yoga@female@base\"', '\"base_c\"', '1', '33', 'Yoga 5', '\"anim@heists@fleeca_bank@ig_7_jetski_owner\"', '\"owner_idle\"', '1', '33', 'Sitzen (Männl.)', '\"anim@mp_player_intupperwave\"', '\"idle_a\"', '1', '49', 'Winken', '\"anim@mp_player_intcelebrationmale@freakout\"', '\"freakout\"', '1', '49', 'Ausrasten', '\"amb@lo_res_idles@\"', '\"world_human_picnic_female_lo_res_base\"', '1', '33', 'Sitzen (Weibl.)', '\"anim@mp_player_intupperwave\"', '\"idle_a\"', '1', '49', 'Nicht Belegt', '\"anim@mp_player_intupperface_palm\"', '\"idle_a\"', '1', '49', 'Nicht Belegt');
INSERT INTO `shortcuts` VALUES ('5', '3', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'Nicht Belegt', 'Nicht Belegt', null, null, null, null, null, null, null, 'Nicht Belegt', null, null, null, null, 'Nicht Belegt', null, null, null, null, 'Nicht Belegt', null, null, null, null, 'Nicht Belegt', null, null, null, null, 'Nicht Belegt');

-- ----------------------------
-- Table structure for `user_items`
-- ----------------------------
DROP TABLE IF EXISTS `user_items`;
CREATE TABLE `user_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `charId` int(11) NOT NULL DEFAULT '0',
  `itemId` int(11) NOT NULL DEFAULT '0',
  `amount` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_items
-- ----------------------------
INSERT INTO `user_items` VALUES ('5', '2', '4', '1');
INSERT INTO `user_items` VALUES ('6', '2', '192', '1');
INSERT INTO `user_items` VALUES ('7', '2', '194', '1');
INSERT INTO `user_items` VALUES ('8', '2', '196', '1');
INSERT INTO `user_items` VALUES ('9', '2', '198', '1');

-- ----------------------------
-- Table structure for `vehiclekeys`
-- ----------------------------
DROP TABLE IF EXISTS `vehiclekeys`;
CREATE TABLE `vehiclekeys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keyOwner` int(11) DEFAULT NULL,
  `vehID` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `isActive` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of vehiclekeys
-- ----------------------------

-- ----------------------------
-- Table structure for `vehicles`
-- ----------------------------
DROP TABLE IF EXISTS `vehicles`;
CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(50) DEFAULT NULL,
  `numberPlate` varchar(50) DEFAULT 'NOLIC',
  `parked` int(11) DEFAULT '0',
  `impounded` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of vehicles
-- ----------------------------
INSERT INTO `vehicles` VALUES ('1', 'Raiden', 'Gurke', null, null);
INSERT INTO `vehicles` VALUES ('2', 'Raiden', 'Gurke', null, null);
INSERT INTO `vehicles` VALUES ('3', 'Raiden', 'Gurke', null, null);
INSERT INTO `vehicles` VALUES ('4', 'Raiden', 'Gurke', null, null);
INSERT INTO `vehicles` VALUES ('5', 'Raiden', 'Gurke', null, null);
