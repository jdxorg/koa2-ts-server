/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80016
Source Host           : localhost:3306
Source Database       : db_account

Target Server Type    : MYSQL
Target Server Version : 80016
File Encoding         : 65001

Date: 2019-08-01 10:20:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_menu`;
CREATE TABLE `t_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parentid` int(11) DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `zh` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `route` varchar(255) DEFAULT NULL,
  `display` int(11) NOT NULL DEFAULT '1',
  `createdBy` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of t_menu
-- ----------------------------
INSERT INTO `t_menu` VALUES ('1', null, 'Dashboard', '仪表盘', 'dashboard', '/dashboard', '1', null, null, null, null);
INSERT INTO `t_menu` VALUES ('2', null, 'Account', '账户管理', 'user', '/account', '1', null, null, null, null);
INSERT INTO `t_menu` VALUES ('3', null, 'Request', 'Request', 'api', '/request', '1', null, null, null, null);
INSERT INTO `t_menu` VALUES ('4', null, 'UI Element', 'UI组件', 'camera-o', '/UIElement', '1', null, null, null, null);
INSERT INTO `t_menu` VALUES ('5', null, 'Charts', '图表', 'code-o', '/chart', '1', null, null, null, null);
INSERT INTO `t_menu` VALUES ('6', null, 'Test', '测试', 'code-o', '/test', '0', null, null, null, null);
INSERT INTO `t_menu` VALUES ('7', null, 'Posts', '岗位管理', 'shopping-cart', '/post', '0', null, null, null, null);
INSERT INTO `t_menu` VALUES ('8', '2', 'user', '用户管理', 'user', '/account/user', '1', null, null, null, null);
INSERT INTO `t_menu` VALUES ('9', '2', 'role', '角色管理', 'user', '/account/role', '1', null, null, null, null);
INSERT INTO `t_menu` VALUES ('10', '4', 'Button', 'Button', 'edit', '/UIElement/button', '1', null, null, null, null);
INSERT INTO `t_menu` VALUES ('11', '4', 'Form', 'Form', 'edit', '/UIElement/form', '1', null, null, null, null);
INSERT INTO `t_menu` VALUES ('12', '4', 'Table', 'Table', 'edit', '/UIElement/table', '1', null, null, null, null);
INSERT INTO `t_menu` VALUES ('13', '4', 'Editor', 'Editor', 'edit', '/UIElement/editor', '1', null, null, null, null);
INSERT INTO `t_menu` VALUES ('14', '5', 'ECharts', 'ECharts', 'line-chart', '/chart/ECharts', '1', null, null, null, null);
INSERT INTO `t_menu` VALUES ('15', '5', 'HighCharts', 'HighCharts', 'bar-chart', '/chart/highCharts', '1', null, null, null, null);
INSERT INTO `t_menu` VALUES ('16', '5', 'Rechartst', 'Rechartst', 'area-chart', '/chart/Recharts', '1', null, null, null, null);

-- ----------------------------
-- Table structure for t_role
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `roleName` varchar(255) NOT NULL,
  `roleType` int(11) NOT NULL COMMENT '角色类型(0-系统角色 1-PC角色 2-APP角色 4-公众号角色)',
  `state` int(11) NOT NULL DEFAULT '0',
  `roleDesc` text,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of t_role
-- ----------------------------
INSERT INTO `t_role` VALUES ('3', 'admin', 'admin', 'admin', '0', '0', 'admin', '1564449872338', '1564450817832');
INSERT INTO `t_role` VALUES ('4', 'admin', 'admin', 'guest', '1', '0', 'guest', '1564450809509', '1564450828295');
INSERT INTO `t_role` VALUES ('5', 'admin', 'admin', 'developer', '1', '0', 'developer', '1564450844277', '1564450906767');
INSERT INTO `t_role` VALUES ('7', 'admin', 'admin', 'ceshi', '0', '0', '111', '1564554204452', '1564554204452');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `loginName` varchar(255) NOT NULL,
  `loginPwd` varchar(255) NOT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `nickName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `userName` varchar(100) DEFAULT NULL,
  `remark` text,
  `state` int(11) NOT NULL,
  `age` int(11) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `addressCode` varchar(255) DEFAULT NULL,
  `familyAddress` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `visit` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('4', 'admin', 'admin', 'admin', 'b41199aa5fcb5454ba8a3bc5b03a35a787d3c7cf4dc9602fabce7e1c6cf2b40d', '13514511111', '289608944@qq.com', '0', '系统管理员', 'admin', '433223发的发的发', '1', '23', 'http://127.0.0.1:4000/images/5132339798319379.jpg', '天津 天津市 河东区', '[\"120000\",\"120100\",\"120102\"]', '3322332434', null, null, '[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\"]');
INSERT INTO `t_user` VALUES ('21', 'admin', 'admin', 'guest', '13099aeb09292375f357318a0ef7c4b697783b012f13259fbef49bac9c444c8f', '13466666666', 'jiangdexiao@icarbonx.com', '1', '莉莉', 'guest', null, '1', '18', 'http://127.0.0.1:4000/images/4321522244666225.jpg', '河北省 唐山市 路南区', '[\"130000\",\"130200\",\"130202\"]', '2121', null, null, null);
INSERT INTO `t_user` VALUES ('22', 'admin', 'admin', 'developer', '7757b784617ce83232a6fe9a2a70d4e33deb9ed99ae378fe21f4cfe2d97aac1a', '13514511111', '289608944@qq.com', '0', '开发者', 'developer', null, '1', '23', 'http://127.0.0.1:4000/images/1418709374846958.jpg', '江苏省 南京市 玄武区', '[\"320000\",\"320100\",\"320102\"]', '32', null, null, null);
INSERT INTO `t_user` VALUES ('24', 'admin', 'admin', 'ceshi', '05393febeeda806b01c4558480605dfa5d4a9570c21125207d6f0332559a0013', '13411112222', '289608944@qq.com', '0', '测试', '测试', '', '1', '18', 'http://127.0.0.1:4000/images/47877734048444176.jpg', '天津 天津市 和平区', '[\"120000\",\"120100\",\"120101\"]', '12334231', null, null, '[\"1\",\"2\",\"8\",\"9\"]');

-- ----------------------------
-- Table structure for t_user_login_info
-- ----------------------------
DROP TABLE IF EXISTS `t_user_login_info`;
CREATE TABLE `t_user_login_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `last_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `last_ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `operate` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'login/logout',
  `system_type` int(11) NOT NULL,
  `error_count` int(11) DEFAULT NULL,
  `error_allct` int(11) DEFAULT NULL,
  `visit_ct` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=179 DEFAULT CHARSET=utf8 COMMENT='用户登录信息表';

-- ----------------------------
-- Records of t_user_login_info
-- ----------------------------

-- ----------------------------
-- Table structure for t_user_role
-- ----------------------------
DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_80e39a8d09f0eb64c46fe5850fa` (`userId`),
  KEY `FK_885251b48e54160005bff905662` (`roleId`),
  CONSTRAINT `FK_80e39a8d09f0eb64c46fe5850fa` FOREIGN KEY (`userId`) REFERENCES `t_user` (`id`),
  CONSTRAINT `FK_885251b48e54160005bff905662` FOREIGN KEY (`roleId`) REFERENCES `t_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of t_user_role
-- ----------------------------
INSERT INTO `t_user_role` VALUES ('59', '4', '3');
INSERT INTO `t_user_role` VALUES ('60', '24', '7');
