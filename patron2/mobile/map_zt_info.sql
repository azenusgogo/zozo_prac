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
-- 表的结构 `map_zt_info`
--

CREATE TABLE IF NOT EXISTS `map_zt_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `zt_name` varchar(200) NOT NULL COMMENT '专题名称',
  `detail` varchar(500) NOT NULL COMMENT '详细描述',
  `start_date` datetime NOT NULL COMMENT '开始时间',
  `end_date` datetime NOT NULL COMMENT '结束时间',
  `sms_tpl` varchar(200) NOT NULL COMMENT '短信模板',
  `get_more` tinyint(1) NOT NULL DEFAULT '1' COMMENT '同一手机是否可以多次获得奖品:(0：不可以。1：可以。默认为1)',
  `active` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否可用:(0：不可用。1：可用。默认为1)',
  `rate` float NOT NULL DEFAULT '100' COMMENT '专题全局中奖率',
  `is_delete` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否被删除：默认为0.删除后为1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `map_zt_info`
--

INSERT INTO `map_zt_info` (`id`, `zt_name`, `detail`, `start_date`, `end_date`, `sms_tpl`, `get_more`, `active`, `rate`, `is_delete`) VALUES
(2, 'qixi', 'qixi2013', '2013-07-22 00:00:00', '2013-08-22 00:00:00', 'hello world', 1, 1, 0, 0),
(4, '老用户召回二期', '老用户召回活动抽奖', '2013-08-02 00:00:00', '2013-08-31 00:00:00', '老用户召回', 0, 1, 100, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
