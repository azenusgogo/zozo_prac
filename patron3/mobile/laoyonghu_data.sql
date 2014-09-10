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
-- 表的结构 `laoyonghu_data`
--

CREATE TABLE IF NOT EXISTS `laoyonghu_data` (
  `single1` int(10) NOT NULL,
  `single2` int(10) NOT NULL,
  `single3` int(10) NOT NULL,
  `mult1` int(10) NOT NULL,
  `mult2` int(10) NOT NULL,
  `mult3` int(10) NOT NULL,
  `mult4` int(10) NOT NULL,
  `mult5` int(10) NOT NULL,
  `mult6` int(10) NOT NULL,
  `mult7` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `laoyonghu_data`
--

INSERT INTO `laoyonghu_data` (`single1`, `single2`, `single3`, `mult1`, `mult2`, `mult3`, `mult4`, `mult5`, `mult6`, `mult7`) VALUES
(3, 19, 3, 7, 9, 11, 5, 6, 2, 2);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
