-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2013 年 06 月 13 日 04:17
-- 服务器版本: 5.5.24-log
-- PHP 版本: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `movie2013`
--

-- --------------------------------------------------------

--
-- 表的结构 `prize_info`
--

CREATE TABLE IF NOT EXISTS `movie_prize_info` (
  `date0` int(5) NOT NULL,
  `date1` int(5) NOT NULL,
  `date2` int(5) NOT NULL,
  `date3` int(5) NOT NULL,
  `date4` int(5) NOT NULL,
  `date5` int(5) NOT NULL,
  `date6` int(5) NOT NULL,
  `rate` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `prize_info`
--

INSERT INTO `movie_prize_info` (`date0`, `date1`, `date2`, `date3`, `date4`, `date5`, `date6`, `rate`) VALUES
(200, 200, 200, 200, 640, 640, 640, 0.5);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
