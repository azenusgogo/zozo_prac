-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2013 年 08 月 06 日 23:47
-- 服务器版本: 5.5.24-log
-- PHP 版本: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `zt_lottery`
--

-- --------------------------------------------------------

--
-- 表的结构 `map_zt_user`
--

CREATE TABLE IF NOT EXISTS `map_zt_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL COMMENT '奖品id',
  `phone` varchar(11) NOT NULL COMMENT '电话',
  `name` varchar(30) NOT NULL COMMENT '姓名',
  `address` varchar(300) NOT NULL COMMENT '地址',
  `update_time` int(11) NOT NULL COMMENT '提交时间',
  PRIMARY KEY (`id`),
  KEY `pid` (`pid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `map_zt_user`
--

INSERT INTO `map_zt_user` (`id`, `pid`, `phone`, `name`, `address`, `update_time`) VALUES
(1, 1, '18311462698', '', '', 2013),
(2, 4, '18311462698', '', '', 0),
(3, 1, '18311462698', 'whp', '', 0),
(4, 1, '18311462698', 'whp', 'aaa', 1375435762),
(5, 74, 'undefined', 'undefined', 'undefined', 1375774918),
(6, 84, '13889812345', 'zozo', 'beijingshi', 1375775206),
(7, 54, 'rrr', 'dfa', 'dfadf', 1375775799);

--
-- 限制导出的表
--

--
-- 限制表 `map_zt_user`
--
ALTER TABLE `map_zt_user`
  ADD CONSTRAINT `map_zt_user_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `map_zt_prize` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
