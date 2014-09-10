-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2013 年 08 月 06 日 23:46
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
-- 表的结构 `map_zt_group`
--

CREATE TABLE IF NOT EXISTS `map_zt_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `zid` int(11) NOT NULL COMMENT '专题id',
  `group_name` varchar(100) NOT NULL COMMENT '组别内容',
  `active` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否可用(0：不可用。1：可用。默认为1)',
  `rate` float NOT NULL DEFAULT '0' COMMENT '中奖率(x%)',
  PRIMARY KEY (`id`),
  KEY `zid` (`zid`),
  KEY `zid_2` (`zid`),
  KEY `zid_3` (`zid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `map_zt_group`
--

INSERT INTO `map_zt_group` (`id`, `zid`, `group_name`, `active`, `rate`) VALUES
(1, 2, 'qixi2013短信', 1, 100),
(2, 2, 'qixi2013中奖码', 1, 100),
(3, 2, 'qixi2013大奖', 1, 100),
(6, 2, 'qixi2013', 1, 0),
(8, 4, '百度背包', 1, 100),
(9, 4, '百度地图T恤', 1, 100),
(10, 4, '百度地图三显表', 1, 100);

--
-- 限制导出的表
--

--
-- 限制表 `map_zt_group`
--
ALTER TABLE `map_zt_group`
  ADD CONSTRAINT `map_zt_group_ibfk_1` FOREIGN KEY (`zid`) REFERENCES `map_zt_info` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
