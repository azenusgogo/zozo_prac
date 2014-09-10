-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2013 年 06 月 13 日 04:16
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
-- 表的结构 `cinema_info`
--

CREATE TABLE IF NOT EXISTS `movie_cinema_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `qid` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `href` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `lonlat` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `code` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tel` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `rsid` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=140 ;

--
-- 转存表中的数据 `cinema_info`
--

INSERT INTO `movie_cinema_info` (`id`, `uid`, `qid`, `name`, `href`, `lonlat`, `city`, `address`, `code`, `tel`, `rsid`) VALUES
(1, '3be82bff3126a83d07026fce', '120356254955549000', '保利国际影城(中环广场店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=3be82bff3126a83d07026fce', '113.287871,23.142855', '广州市', '广州市越秀区建设大马路18号中环广场南楼五层', '6491ecfb-5fdc-67df-20fa-59e24ae2e28e', '(020)83030222', 1),
(2, '70aa9bf48658185c1ef74d2e', '311197726287508000', '橙天嘉禾影城(万象城店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=70aa9bf48658185c1ef74d2e', '114.11781,22.546076', '深圳市', '深圳市罗湖区宝安南路1881号华润万象城中座3层', '6df3abef-c0ab-0b7e-b4aa-a807aa0565d1', '4000080888', 2),
(3, '9d282d3d3cd60257f603b8b9', '670219025427698000', 'ume国际影城(涪陵店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=9d282d3d3cd60257f603b8b9', '107.405413,29.706654 ', '重庆市', '重庆市涪陵区兴华中路25号泽胜中央广场商业步行街4楼', '4d5a55da-b39a-4671-607b-da8893b9df6e', '(023)72870011', 3),
(4, '1f8f7fbc2fc8aac3cbfa5f6c', '1178590591551020000', '博纳国际影城(龙岗店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=1f8f7fbc2fc8aac3cbfa5f6c', '114.231208,22.698132', '深圳市', '深圳市龙岗区黄阁路与深惠路交汇处COCO PARK4楼', 'ba91476e-2ffe-62e5-23b2-aafa5e67d018', '(0755)25585111', 0),
(5, 'f59b8afcc856667e9e82ea96', '1912942488927510000', '百老汇影城(国瑞城店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=f59b8afcc856667e9e82ea96', '116.431281,39.904403 ', '北京市', '北京市崇文区崇文门外大街18号国瑞城首层、地下二层', '3eee494e-2e52-b96c-8890-801e746f004f', '(010)67171338', 0),
(6, '338ba76caff6496ec1f1cf82', '2245605469308240000', 'ume国际影城(江北店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=338ba76caff6496ec1f1cf82', '106.540427,29.584015 ', '重庆市', '重庆市江北区北城天街(原洋河路)8号北城天街购物广场B区5F', '8204baf0-8a2c-07f1-2918-c81324fe84fd', '(023)67701166', 0),
(7, '919c0a802e4ae2bf8bfc060f', '3295915750555520000', '广州上影联和电影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=919c0a802e4ae2bf8bfc060f', '113.284591,23.088761', '广州市', '广州市海珠区江燕路108号燕汇广场4楼', '7d6fb512-07c1-9b88-5157-eb29578e6cfa', '(020)89778118', 0),
(8, '9bca92268e382a191ce999b9', '3301977354682870000', '成都上影国际影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=9bca92268e382a191ce999b9', '104.0832,30.625808 ', '成都市', '成都市武侯区科华中路9号百联天府购物中心5楼', 'efa5523b-6849-7cd0-5453-dde7bbdda4c3', '(028)85222236', 0),
(9, '36c80222dc51526e97ec8406', '3987217965179170000', '华谊兄弟影院(望京店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=36c80222dc51526e97ec8406', '116.474826,40.016006', '北京市', '北京市朝阳区广顺北大街16号望京华彩商业中心B1', 'e86e90a4-6d02-976a-6128-b045c9467198', '(010)57620488', 0),
(10, '31f877271c1320819e9d686f', '4174094210138980000', '橙天嘉禾影城(凯丹店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=31f877271c1320819e9d686f', '104.069421,30.608745', '成都市', '成都市高新区盛和一路99号凯丹广场4楼', '81f91af2-4457-e4a0-452a-574ff496083a', '(028)65035900', 0),
(11, 'fafdd7ffd1cce498e8f853f2', '4395735711312830000', '保利国际影城(首地大峡谷店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=fafdd7ffd1cce498e8f853f2', '116.372761,39.860241 ', '北京市', '北京市丰台区南三环首地大峡谷5层', 'abaa4118-2251-cc58-af5d-562ad5fb3693', '(010)87578551;(010)87578535', 0),
(12, 'eaf99c707769b8c3b7265540', '4815232307092110000', 'ume国际影城(沙坪坝店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=eaf99c707769b8c3b7265540', '106.466362,29.563566', '重庆市', '重庆市沙坪坝区三峡广场炫地购物中心6楼', '6ef5e7ca-0ad3-2f25-7084-718d1a347596', '(023)65365599', 0),
(13, 'a7ffadcf75d9f8972b201aeb', '5419452063907610000', '嘉华国际影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=a7ffadcf75d9f8972b201aeb', '116.360466,40.014328', '北京市', '海淀区学清路甲8号圣熙8号购物中心5楼(金码大厦北侧)', 'ea763154-0cb1-559e-d9b6-cfc3b4ba9441', '(010)82732228', 0),
(14, '0244c008870a057e3a13fd80', '5455864348401030000', '华影万晟国际影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=0244c008870a057e3a13fd80', '113.245446,23.126637', '广州市', '广州市荔湾区逢源路153号3-5楼', '1e8812f9-aa4a-cc5f-d892-fda11cc01274', '(020)81236302;(020)81236303', 0),
(15, 'f07163a670095ddd100daa1b', '6054001194136840000', '广州飞影电影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=f07163a670095ddd100daa1b', '113.343094,23.157966', '广州市', '广州市天河区东莞庄路富力院士庭广场2楼', 'aa67a09e-daef-eba8-100b-ce839c334862', '(020)37225388', 0),
(16, 'af2cc44ef9fe058bc27da29f', '6307879648737410000', '橙天嘉禾影城(一品店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=af2cc44ef9fe058bc27da29f', '104.03536,30.702613 ', '成都市', '成都市金牛区一品天下大街399号北京华联5楼', '05dd310d-b209-380f-9ea1-9d00401d89c3', '(028)87735666', 0),
(17, 'ea2efdf151bde59bab175a94', '6373382312380770000', '博纳国际影城(易诚店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=ea2efdf151bde59bab175a94', '106.463257,29.540787', '重庆市', '重庆市沙坪坝区凤天大道37号', 'd26c44c3-a527-4454-198c-c7a147aa0ba5', '(023)65535020', 0),
(18, 'c2968cc55e2733a92b11d127', '6403673784126830000', 'ume国际影城(北碚店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=c2968cc55e2733a92b11d127', '106.411643,29.805452', '重庆市', '重庆市北碚区康宁路58号嘉陵风情步行街4-5楼(状元府第旁)', 'a9b8513f-d0a6-6097-c60c-7be71ff36a30', '(023)60306699', 0),
(19, '1938fdda84e196aee3110384', '6526003689489030000', '橙天嘉禾影城(大渡口店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=1938fdda84e196aee3110384', '106.49169,29.488628', '重庆市', '重庆市大渡口区新山村街道文体路88号壹街购物中心2楼', 'a52a4c96-a533-405f-875a-eb6d3794b807', '(023)88613666', 0),
(20, 'ee2375c3a520a50251e5c575', '7263119401180340000', '环艺新民众电影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=ee2375c3a520a50251e5c575', '114.294058,30.58198', '武汉市', '武汉市江汉区汉口中山大道608号新民众乐园4-5楼', 'cb37ba4f-6df0-a738-8fba-6b242958f4ee', '(027)85379075', 0),
(21, '50faf94762a8775ef4231066', '7285427647368230000', '星际银河影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=50faf94762a8775ef4231066', '114.376442,22.690988', '深圳市', '深圳市坪山新区坪山办事处沙坣社区同富裕路9号A栋三层', 'e9cc5b0d-4bd2-8343-24b4-9b0463514513', '(0755)28395920', 0),
(22, 'b34cdba998eb4b0433169b52', '7336639528947250000', '星美国际影城(西南影都店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=b34cdba998eb4b0433169b52', '104.078277,30.664117 ', '成都市', '成都市锦江区总府路68号(盐市口茂业百货对面)', 'e8a2d13c-e35b-a025-870c-d582eb612899', '(028)86679268;(028)86679204', 0),
(23, '06acaa43d978f5e0bda24005', '7818264162700330000', '广州番禺沙湾数字电影院', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=06acaa43d978f5e0bda24005', '113.343628,22.907554', '广州市', '广州市番禺区沙湾镇大巷涌路66号文化中心', '6abf702a-1179-aceb-84ff-a34609c1a8e9', '(020)34737921', 0),
(24, 'f54f39c798d66d8d246e9884', '7929460760778080000', 'ume国际影城(双井店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=f54f39c798d66d8d246e9884', '116.467605,39.901414 ', '北京市', '北京市朝阳区东三环中路 双井桥北富力广场5-6层', '517e2f15-7e12-d907-cc31-b1cefcfe5796', '(010)59037171;(010)59037373', 0),
(25, '8248924e2666860eb1077db5', '7958828147293460000', '时代金球影城(华南城店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=8248924e2666860eb1077db5', '114.130731,22.682393', '深圳市', '深圳市龙岗区平湖街道华南城西门环球物流中心四楼', '27248bb9-4671-bd8a-9cb4-9f7b09263c22', '(0755)89885688', 0),
(26, 'f5671be08a63a59e58f6bef4', '7972164172451160000', '博纳国际影城(方庄店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=f5671be08a63a59e58f6bef4', '116.43016,39.870888 ', '北京市', '北京市丰台区蒲黄榆路28号芳群园一区', 'b2e0f919-93ba-fe09-cb48-cd239bfd9e25', '(010)67699909', 0),
(27, '76dcea7317ee1d4726e0a09b', '8356431786884320000', '华谊兄弟影院(袁家岗店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=76dcea7317ee1d4726e0a09b', '106.516648,29.534267', '重庆市', '重庆市九龙坡区袁家岗奥体路1号中心城上城3F', 'cfc00043-b2db-2f97-c49a-693cd414f226', '(023)68425803', 0),
(28, 'f1feb40db328e635c7f025e8', '8412086862836590000', '华谊兄弟影院(太古城店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=f1feb40db328e635c7f025e8', '113.94668,22.506783', '深圳市', '深圳市南山区深圳湾太古城北区B132', '3275e955-204b-d5d6-1609-b4c5e8b21cf1', '(0755)21621200', 0),
(29, '309fc9761d8de4af7adbd2b8', '8472535862021230000', '重庆环艺电影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=309fc9761d8de4af7adbd2b8', '106.584774,29.563251', '重庆市', '重庆市渝中区邹容路68号大都会广场六楼', '5f5ce909-dff0-22f9-1c55-ec077bbcfa34', '(023)63739803', 0),
(30, '8b1f6004d7c9321ecc06a4b3', '9214291201526610000', '橙天嘉禾影城(停机坪购物广场店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=8b1f6004d7c9321ecc06a4b3', '113.271572,23.188457', '广州市', '广州市白云新城机场路云霄路五号停机坪购物广场3楼', 'da0ca4ea-9d7e-c136-e5c3-a7ba9e3a2c28', '(020)36077789;4000080888', 0),
(31, '22fba482b6ed3018cd06a4ec', '9647230371016000000', '深圳宝安环星影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=22fba482b6ed3018cd06a4ec', '113.916,22.565334', '深圳市', '深圳市宝安区新安二路70号', '4c7599b2-347a-e5fc-bb66-1303cc8f0436', '(0755)29668666', 0),
(32, 'fcb7abe8bd7095cfa1d23086', '10172899626038400000', '搜秀影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=fcb7abe8bd7095cfa1d23086', '116.425734,39.902611 ', '北京市', '北京市崇文区崇外大街40号搜秀城9层', '68eaabd7-fd5d-c9ee-045f-2bde3c06475a', '(010)51671298', 0),
(33, 'b5adcf1de59a8c2738221c1a', '10314415900355400000', '百老汇影城(当代MOMA店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=b5adcf1de59a8c2738221c1a', '116.4457,39.955817 ', '北京市', '北京市东城区香河园路1号当代MOMA北区T4座', 'ae916830-e614-3fd7-8b8b-1915cc60e343', '(010)84388258', 0),
(34, 'be84ac31fd4308634e776e67', '10443262642564200000', '横店电影城(王府井店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=be84ac31fd4308634e776e67', '116.416428,39.920086', '北京市', '北京市东城区王府井大街253号王府井百货大楼北馆8层', 'f61df039-549e-6554-a05c-3cd0a43b6cc7', '(010)65231588', 0),
(35, '569c34d2a2d4fbd82b201a1c', '10535256231090700000', '中影国际影城(武汉东购店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=569c34d2a2d4fbd82b201a1c', '114.322682,30.627509', '武汉市', '武汉市江岸区二七路汉口东部购物公园C2栋4楼', '8565c24b-64bd-4330-9a01-a76d82245a7a', '(027)82285802', 0),
(36, 'bcbabfbb79284dc9ae31e53b', '10551605934120200000', '博纳国际影城(悠唐店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=bcbabfbb79284dc9ae31e53b', '116.447137,39.927542 ', '北京市', '北京市朝阳区朝外三丰北里2号楼悠唐生活广场B1层(朝外钱柜南侧)', '19a9ac60-18f0-baa5-0381-09d8269aa219', '(010)59775660', 0),
(37, '090de77f72e0e402faf0cbbd', '10651848903357300000', 'ume国际影城(九龙坡店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=090de77f72e0e402faf0cbbd', '106.52436,29.516581', '重庆市', '重庆市九龙坡区杨家坪珠江路48号龙湖西城天街购物广场3F-26号', '1f590a65-ae52-6167-8b20-eee3b50ce8e4', '(023)68126066', 0),
(38, '0f0c62b5ce19c76bc7f0257e', '11141603735318100000', '橙天嘉禾影城(上地店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=0f0c62b5ce19c76bc7f0257e', '116.318136,40.034522', '北京市', '北京市海淀区上地南口华联商厦4F', 'c3d645b9-bd5b-dbf7-2478-528e9547f4e1', '(010)62667799', 0),
(39, '86bf92b2393da1e3d0f49e9d', '11300359464403800000', '海岸影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=86bf92b2393da1e3d0f49e9d', '113.942171,22.522909', '深圳市', '深圳市南山区文心五路33号海岸城购物中心三楼', '5681dcee-9ab9-e6c4-597f-8004b11a075c', '(0755)86129988', 0),
(40, '50c39892e45f4bcb80a00c35', '11563051518093700000', '百丽宫影院(金宝汇店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=50c39892e45f4bcb80a00c35', '116.427565,39.921497 ', '北京市', '北京市东城区金宝街88号', '94040660-8159-2f1a-677d-4be8c2bb7ece', '(010)85221977', 0),
(41, '961699d9fb10cd0e2ffaa722', '11654168314314700000', '华夏艺术中心数码影院', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=961699d9fb10cd0e2ffaa722', '113.991863,22.540426', '深圳市', '深圳市南山区华侨城光侨街1号', '8e415028-6966-f68c-9be3-693d0cfb0ec6', '(0755)26602342', 0),
(42, '26ab79042f2e88f72c4733e1', '11859601058116000000', '中影国际影城(中航九方店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=26ab79042f2e88f72c4733e1', '104.072143,30.595791', '成都市', '成都市高新区府城大道中段88号九方购物中心6楼L600', '3b712ee9-32f7-00c5-a495-c453d6dab2d5', '(028)83333632', 0),
(43, '9942a408d0aa920786420ee5', '12186180472805400000', '博纳国际影城(通州店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=9942a408d0aa920786420ee5', '116.638619,39.910976 ', '北京市', '北京市通州区杨庄北里天时名苑14号楼F4-01', '8414646f-7176-a981-e44c-49871e71bc64', '(010)56351916', 0),
(44, 'fc583e34f1a0bc1bc51b7568', '12735967668680700000', 'ume国际影城(安贞店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=fc583e34f1a0bc1bc51b7568', '116.417398,39.972311 ', '北京市', '北京市东城区北三环东路36号环球贸易中心E座B1/F1/F3', 'd31233ad-cb4e-7c3a-6e7a-864be3a5012b', '(010)58257733', 0),
(45, '7db74a0de7510ba0c356ac70', '12882277753334900000', '博纳国际影城(华强北茂业店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=7db74a0de7510ba0c356ac70', '114.092957,22.551692', '深圳市', '深圳市福田区华强北茂业百货九楼', 'ac10ad18-ebe1-e86f-95a2-22f4283a8c7e', '(0755)83019333', 0),
(46, '78cad6d05ba34578d91318a8', '12995124828387500000', 'ume国际影城(两江新区店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=78cad6d05ba34578d91318a8', '106.571109,29.636415', '重庆市', '重庆市两江新区机场高速路西部奥特莱斯商业广场5-7楼', 'd90be281-8604-32f4-3a22-1335a6c1ecb2', '(023)67305500', 0),
(47, '43e1aeb999504ee941ab9a7a', '13193074104456300000', '橙天嘉禾影城(富力天汇店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=43e1aeb999504ee941ab9a7a', '104.076862,30.671207', '成都市', '成都青羊区上西顺城街289富力天汇mall7楼', '8ddfb675-493a-5f26-a704-8e35d02235ff', '(028)61322266', 0),
(48, '39ead7ce9ab929c97069d39d', '14490508769923100000', '橙天嘉禾影城(日月光店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=39ead7ce9ab929c97069d39d', '106.578909,29.559851 ', '重庆市', '重庆市渝中区较场口日月光广场6F(台北纯K KTV楼上)', '363ae7bf-2f39-031a-7196-4035811c6baf', '(023)88062666', 0),
(49, 'af1e0a716e4ad138f4eafcf1', '14692896783763900000', '华影青宫电影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=af1e0a716e4ad138f4eafcf1', '113.275426,23.130484', '广州市', '广州市越秀区北京路312号青年文化宫二楼', 'cdbad2c0-b5fd-3887-2a45-557df55c92a9', '(020)83329918', 0),
(50, '37e38933d2f4e2a49eec2bef', '14777431570500400000', '中影火山湖电影城(番禺店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=37e38933d2f4e2a49eec2bef', '113.374501,22.933767', '广州市', '广州市番禺区桥南街桥南路108号', 'dd6c10ef-8f2e-6345-726c-0dff50e3d4ad', '(020)39292999', 0),
(51, '6b04a1e8a20f269f04fef56b', '14976958767194300000', 'ume国际影城(华星店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=6b04a1e8a20f269f04fef56b', '116.332346,39.973582 ', '北京市', '北京市海淀区双榆树科学院南路44号(双安商场对面)', '17348287-2882-3c80-f902-48f0d44cd4bf', '(010)82111601', 0),
(52, '14e31ad9661058ecd6b74e9e', '15135184599546700000', '新华国际影城(大钟寺店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=14e31ad9661058ecd6b74e9e', '116.348559,39.971384', '北京市', '北京市海淀区大钟寺中坤广场C座3层', 'bf6c7fc8-a24c-c60c-1dc0-10dde97b6eed', '(010)82511616', 0),
(53, '2e4903dcbb971c99631809b8', '15490578783010000000', '百老汇影城(新世纪东方广场店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=2e4903dcbb971c99631809b8', '116.42093,39.915998 ', '北京市', '北京市东城区东长安街1号东方广场地下一层BB65', 'acfb53dc-8147-16cf-424e-d775fbdc206e', '(010)85186778', 0),
(54, '953bdf2d6c6aaa75bca240c6', '15541077207024500000', '紫光影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=953bdf2d6c6aaa75bca240c6', '116.454801,39.928462 ', '北京市', '北京市朝阳区朝外大街10号(蓝岛大厦西区五-六层)', 'ba94c9b2-82fa-0132-c07c-e500ec0af666', '(010)65992922', 0),
(55, '49eb68d4c6d515bf7702694d', '15659526080499500000', '横店电影城(上河坊店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=49eb68d4c6d515bf7702694d', '114.054402,22.602441', '深圳市', '深圳市宝安区民治书香门第上河坊', 'e8e48cee-465b-3f6d-0355-2fc9d80f90df', '(0755)29309990;(0755)29233330', 0),
(56, 'eaee388590adfc28373a71aa', '15688741919780200000', '中影益田假日影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=eaee388590adfc28373a71aa', '113.982368,22.542713', '深圳市', '深圳市南山区益田假日广场L3-8', 'bd2145b5-9864-bb14-e171-68aa633057b9', '(0755)86298989', 0),
(57, 'bb2f4c6de67abeda96ca07e5', '15923510239837100000', '首都电影院(西单店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=bb2f4c6de67abeda96ca07e5', '116.379998,39.916897 ', '北京市', '北京市西城区西单北大街甲131号大悦城商场十层', '2815e294-be51-8c09-8c2a-25865d312c81', '(010)66062266', 0),
(58, '0f1a68a07ec74c82d0ff23fd', '16265063563814000000', '中影国际影城(永旺店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=0f1a68a07ec74c82d0ff23fd', '116.296497,40.102072', '北京市', '北京市昌平区北清路1号永旺国际商城3楼', '38379ec3-7a64-b1e2-73ea-e9f42a793913', '(010)80700847', 0),
(59, 'f202528a29123e2ba5da3939', '16402645998080500000', '华谊兄弟影院(南坪百联店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=f202528a29123e2ba5da3939', '106.566651,29.534816', '重庆市', '重庆市南岸区南坪西路38号百联上海城购物中心5楼', 'ecfd7b1e-8863-1af7-6caa-bf362a2cfa1a', '(023)62626670;(023)62626671', 0),
(60, '09e3b47051d5e18b8c1a89e3', '16802652217501900000', 'ume国际影城(成都店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=09e3b47051d5e18b8c1a89e3', '104.115669,30.680812', '成都市', '成都市成华区一环路东二段1号龙湖天街三千集购物中心5楼(厂北路口)   ', '20bdc051-c3b9-275b-7b1c-93a712f0e259', '(028)84406111', 0),
(61, '323fa11d95c966ecfbf0cba2', '16884221795135700000', '百老汇影城(新东安店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=323fa11d95c966ecfbf0cba2', '116.418122,39.921469 ', '北京市', '北京市东城区王府井大街新东安广场6层', 'd099aff7-6c74-de16-700e-dd5de273f8e1', '(010)65281898', 0),
(62, '10d810984a89b214b21e369d', '17611072533885700000', '橙天嘉禾影城(江北店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=10d810984a89b214b21e369d', '106.551391,29.585829', '重庆市', '重庆江北区北城天街48号附1号5号(欧式一条街同创国际对面)', '4382860a-402f-ac61-5f23-62fe8d020d98', '(023)88191000', 0),
(63, 'e268b183d0845ccaacee7a73', '17620645183152900000', '星美国际影城(华南影都店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=21051763ba6206f7f4e73bc1', '113.254895,23.152666', '广州市', '广州市荔湾区环市西路133路华南影都D区2楼(近广园西路)', 'fa373c94-2e4a-cb00-efa3-0c2428c9a5d8', '(020)28340088', 0),
(64, 'ffed9d374229fcd441ab9a0e', '17629692190155600000', 'ume国际影城(渝中店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=ffed9d374229fcd441ab9a0e', '106.517505,29.545037 ', '重庆市', '重庆市渝中区时代天街路1号龙湖时代天街购物广场B馆5F(大坪商圈)', '65035af4-790a-2006-5793-3d9fa8d1f9d9', '(023)68505500', 0),
(65, '8c20e59fae63ded70b1cc76c', '18053663436369600000', '中影今典国际影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=8c20e59fae63ded70b1cc76c', '114.018165,22.551616', '深圳市', '深圳市福田区农林路69号深国投广场三楼', '539225db-5b04-6b5c-e45e-5563580f2d89', '(0755)82531106', 0),
(66, 'f31a8f08fa4f08fff7e73b70', '18215527352856400000', '东都国际影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=f31a8f08fa4f08fff7e73b70', '116.495123,39.890986 ', '北京市', '北京市朝阳区东四环中路195号华腾新天地五层', '5eef1c90-e72f-9846-fca6-a8843658e9be', '(010)87952964', 0),
(67, '0f41fd56a91287ad471a321c', '468858469811642000', '广州UME国际影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=0f41fd56a91287ad471a321c', '113.272499,23.100446', '广州市', '海珠区宝岗大道498号广百新一城广场6楼', '0233e9b2-a5dd-0122-9f48-db675ea92bd2', '020-84257979', 0),
(68, 'f0ac4d4750d841a6d5b74e2e', '586807172821070000', '和平影都', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=f0ac4d4750d841a6d5b74e2e', '121.48251,31.238716', '上海市', '上海市黄浦区西藏中路290号(近汉口路)', '8dd83700-c38b-3bf2-121d-241dc474a702', '(021)63225252', 0),
(69, '594ce74d941ddff7841541ae', '876584653655002000', '武汉中影天河影院', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=594ce74d941ddff7841541ae', '114.409603,30.511115', '武汉市', '洪山区光谷步行街C区3楼（近名族大道）', '0835d1a0-3254-023c-ef94-d9f63bb2f293', '027-87416895', 0),
(70, '861752adb7cb7e4132870a64', '1145720642532620000', '深圳金域新百花电影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=861752adb7cb7e4132870a64', '114.284662,22.694822', '深圳市', '龙岗区南约社区宏佰超市四楼（宝龙比亚迪厂斜对面）', 'bd658e37-ef99-41b5-e5f1-bdb90cc0e627', '0755-28329816', 0),
(71, '42ab6e3a3b78f5a081a12ee4', '1638941479097440000', '喜洋时代影城-东圃四季荟店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=42ab6e3a3b78f5a081a12ee4', '113.408621,23.126471', '广州市', '天河区东圃大马路4号', '68ceea48-8748-bc31-3cf2-fdd62eb2214d', '020-82306000', 0),
(72, '9c7bff6526d2d8bd40e19242', '2002249648778340000', '武汉金逸国际影城-销品茂店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=9c7bff6526d2d8bd40e19242', '114.348212,30.59391', '武汉市', '洪山区徐东大街18号销品茂5楼（近友谊大道）', 'ed89d404-a40c-ff16-faff-91d76474e164', '027-68898561 68898566', 0),
(73, '4e37ef5582693e7f5cd4fe98', '2507796599734710000', '大光明电影院', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=4e37ef5582693e7f5cd4fe98', '121.477773,31.239009', '上海市', '上海市黄浦区南京西路216号(近黄河路)', 'bd90af4e-0198-4d7d-469d-17956a795206', '(021)63273399;(021)63277002', 0),
(74, '764fd00f436ee23b8c55eced', '2977527671499860000', '开元地中海影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=764fd00f436ee23b8c55eced', '121.224754,31.04327', '上海市', '上海市松江区新松江路927弄4042号开元地中海商业广场4楼(近西林北路口)', '2995270f-b34e-5a9a-e2c0-a26f76e8a152', '(021)37793999', 0),
(75, 'd49360e8703ccd20fa0cadbb', '3230867350024320000', '重庆橙天嘉禾影城-九街店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=d49360e8703ccd20fa0cadbb', '106.551531,29.585829', '重庆市', '江北区北城天街48号附1号5号（欧式一条街同创国际对面）', '37538df3-061c-b1aa-9651-b7d94d59dbf8', '023-88191000', 0),
(76, '3eb6ed005492566c81288a06', '3288230392948460000', '中影环星电影城新安店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=3eb6ed005492566c81288a06', '113.916273,22.565467', '深圳市', '宝安区新安二路70号', 'e577f894-b370-0446-c08c-c7b495c02174', '0755-29668666', 0),
(77, '466b302ce4fad8876268583b', '3736396817076240000', '金逸院线新恒星影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=466b302ce4fad8876268583b', '121.478391,31.24858', '上海市', '上海市闸北区西藏北路166号大悦城10-11楼(近曲阜路)', '88e519a5-c622-d1fc-894a-a1687491a14a', '(021)36527206;(021)36397050', 0),
(78, '998ac5c974f4b5780782c2bb', '3944200515978460000', '世博国际影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=998ac5c974f4b5780782c2bb', '121.499041,31.194221', '上海市', '上海市浦东新区世博大道1200号世博文化中心6楼', 'd303e308-952f-5427-c620-3b76ecb20a87', '(021)20251186', 0),
(79, '969bf6af3b8863872fb17ea4', '4005715828922610000', '深圳戏院', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=969bf6af3b8863872fb17ea4', '114.123081,22.551767', '深圳市', '罗湖区新园路1号（东门步行街西口）', 'bb4f596a-1e34-72a6-0b70-71274d68dc95', '0755-82175808', 0),
(80, 'cf74f1b0c3598df45abbbcb2', '4134596655917090000', '新世纪影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=cf74f1b0c3598df45abbbcb2', '121.523019,31.234023', '上海市', '上海市浦东新区张扬路501号第一八佰伴10楼(近浦东南路)', '9663755c-1614-226d-09a0-25ce4be13b93', '(021)58362988;(021)62817017', 0),
(81, 'cd718968a8db3d74adb22a46', '4206059362470250000', '上影CGV莘庄影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=cd718968a8db3d74adb22a46', '121.394514,31.114042', '上海市', '上海市闵行区都市路5001号仲盛世界商城4楼(近莘庄地铁南广场)', '551db04a-9876-870c-b166-d4c1aeecf204', '(021)34633318', 0),
(82, 'eac9e0300b984d977adbd2c0', '4407769975153090000', '成都幸福蓝海春天影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=eac9e0300b984d977adbd2c0', '104.027551,30.670205', '成都市', '青羊区二环路西二段19号仁和春天广场C座5楼', '4623a498-bdf9-f9b6-fdfe-b82675a41816', '028-61500800 61500808', 0),
(83, 'aba2d7c7027a8571e81e973f', '4451344284989960000', '广州金逸国际影城-达镖店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=aba2d7c7027a8571e81e973f', '113.282538,23.095792', '广州市', '海珠区昌岗中路238号达镖国际中心第五层', 'c0456596-260a-2fda-e5df-44ed68210bad', '', 0),
(84, '7b1350c9ab2e69e51ee99956', '4762007688681030000', '重庆橙天嘉禾影城-壹街店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=7b1350c9ab2e69e51ee99956', '106.49169,29.488628', '重庆市', '大渡口区新山村街道文体路88号壹街购物中心2楼', '7555c48c-6680-c5ad-a786-0df222ba9448', '023-88613666', 0),
(85, '142a46778dd01f4a09b93a4c', '5152909255032890000', '17.5影城(又一城店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=142a46778dd01f4a09b93a4c', '121.522379,31.306309', '上海市', '上海市杨浦区凇沪路8号百联又一城购物中心8楼(近五角场邯郸路)', '92ca65a7-85a2-7bd4-61bd-e3b1cb76620f', '(021)65483135;(021)65483154', 0),
(86, 'c9dac7642261d487be48429c', '5267166331493130000', '华谊兄弟影院武汉黄陂店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=c9dac7642261d487be48429c', '114.381917,30.886979', '武汉市', '黄陂区黄陂大道387号黄陂广场C座（国土局旁）', 'ec4bacb6-0725-9231-6ff0-9f006605b4eb', '027-61106297', 0),
(87, '8879446be7f25ddc157643d0', '5451853243493130000', 'ume国际影城(新天地)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=8879446be7f25ddc157643d0', '121.481898,31.224913', '上海市', '上海市黄浦区兴业路123弄新天地南里6号5楼(新天地广场内)', '2e132371-70c8-f166-5ea9-a0a20f6fc3fe', '(021)63733333;(021)63841435', 0),
(88, '2bc3a9e62245361088db7370', '5763612846938630000', '华谊兄弟影院武汉光谷店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=2bc3a9e62245361088db7370', '114.41776,30.483692', '武汉市', '洪山区关山大道光谷天地F1区三楼', '8c188f81-f83d-3f11-9d4f-c5599eb91c16', '027－51779999', 0),
(89, '644c2ca8757aabb88533049e', '5810476432388650000', '金逸国际影城(中环店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=644c2ca8757aabb88533049e', '121.385968,31.239634', '上海市', '上海市普陀区金沙江路1628号绿洲中环太平洋广场5号楼(近中环路)', 'b75d0aa2-8cbc-2115-2d64-d57dbaeeb132', '(021)32512826;(021)32513346', 0),
(90, '09c977e4eca2cdc8882fb571', '6276726009564090000', '广州金逸国际影城-太阳城店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=09c977e4eca2cdc8882fb571', '113.334043,23.193324', '广州市', '白云区广州大道北1811号嘉裕太阳城广场三楼', '60687fe1-5805-bb5b-9a53-e22ba3e23e4a', '020-36732288 36732009', 0),
(91, 'ef419376e278b8fbb23c819d', '6669597766060970000', '重庆金逸国际影城-地王店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=ef419376e278b8fbb23c819d', '106.585353,29.565992', '重庆市', '渝中区民族路166号地王广场6楼（王府井百货6楼）', 'da439aa0-0e14-4562-717e-91786cb62315', '023-63808758', 0),
(92, '4ebff763b401bbb6dc1e522b', '6865167468161690000', '武汉金逸国际影城-南湖店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=4ebff763b401bbb6dc1e522b', '114.331662,30.510679', '武汉市', '武昌区丁字桥南路518号南国南湖城市广场3楼', 'ff37c701-a540-6881-6294-0848decdcdf3', '027-88709396', 0),
(93, '8b3cf45e9cd9f3913517dcbf', '7198983707894220000', '世纪仙霞影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=8b3cf45e9cd9f3913517dcbf', '121.377671,31.214182', '上海市', '上海市长宁区仙霞西路88号百联西郊购物中心4楼(近哈密路)', '269d9d94-871d-af96-fdfc-dd28c138bf7a', '(021)62397873', 0),
(94, '29ee5c0ed798f016f7e73bad', '7404545282282090000', '成都横店影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=29ee5c0ed798f016f7e73bad', '104.07325,30.608023', '成都市', '高新区天府大道8号苏宁广场6楼', '8772e16d-d124-1819-d2ce-7692a9a96748', '028-85153512', 0),
(95, '1f3e615b7425445a441a32b1', '8016671323706230000', '广州飞影电影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=1f3e615b7425445a441a32b1', '113.343094,23.157966', '广州市', '天河区东莞庄路世纪联华二楼', '30d5521c-2108-629b-3760-71212cf70245', '020-37225388', 0),
(96, 'f7a5b3633d9e2c48a3acc4b4', '8042366889938290000', '广东科学中心', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=f7a5b3633d9e2c48a3acc4b4', '113.369281,23.046564', '广州市', '番禺区大学城西六路168号', '2bad527d-cc4a-a101-612f-73b5e3f160c9', '020-39348080', 0),
(97, 'c4a6a2be6bd7b0f04bcc4a2d', '8270899755167650000', '广州丽江影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=c4a6a2be6bd7b0f04bcc4a2d', '113.310071,23.037255', '广州市', '番禺区丽江花园渔人码头商饮中心三楼丽江影城', '6eee5712-fdf6-a914-7c18-825478bf25a5', '020-39986366', 0),
(98, 'a3349cda33b0660fb6147f5c', '8435998297154790000', '喜玛拉雅海上国际影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=a3349cda33b0660fb6147f5c', '121.568501,31.214846', '上海市', '上海市浦东新区芳甸路1188弄喜玛拉雅中心7-8楼', '00b4429c-5477-2349-b4ee-dfeb25ba4c20', '(021)60457099;(021)60457098', 0),
(99, 'ec4adc8c8fdb7eecf5c59c1b', '8626256480390780000', '龙之梦影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=ec4adc8c8fdb7eecf5c59c1b', '121.42274,31.224635', '上海市', '上海市长宁区长宁路1018号龙之梦9楼(近中山公园)', '46372233-cc9a-2b23-69c6-0c839d46f698', '(021)52378276', 0),
(100, '8d7ec023ca23b9d9eaf85303', '9091418886789360000', '万达影城(上海五角场万达广场店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=8d7ec023ca23b9d9eaf85303', '121.519536,31.306648', '上海市', '上海市杨浦区国宾路58号万达广场三层', 'dac65749-4b8d-146d-3072-8d6dbc8ec517', '(021)55660926;4000806060', 0),
(101, '3f91d8740c5eafeb1e1d115e', '9160786120457170000', '国金百丽宫影院', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=3f91d8740c5eafeb1e1d115e', '121.509004,31.242212', '上海市', '上海市浦东新区世纪大道8号国金中心商场地下一层LG1-1(近银城中路)', '889e7345-9f76-3c94-87f7-09f05765fec7', '(021)31263886;(021)31267833', 0),
(102, '01f53be3854c438b095cb34c', '9259190822552000000', '世纪友谊影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=01f53be3854c438b095cb34c', '121.406284,31.136933', '上海市', '上海市闵行区沪闵路7250号友谊商城9楼(近莲花路地铁站)', 'f8a242dc-c06e-5ec7-7e06-5c5bf9147e8d', '(021)64120260;(021)64120804', 0),
(103, 'db51f18bc8d69ba66ca3cc71', '9705263732226540000', '重庆煌华横店电影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=db51f18bc8d69ba66ca3cc71', '106.4684,29.56421', '重庆市', '沙坪坝区三峡广场步行街6号煌华新纪元购物广场8楼', 'f986fb58-e722-953d-e8e2-d35f59c9ea24', '023-65007645', 0),
(104, 'ad28dc3b9ef863b80e3dda3a', '9813886163014100000', '武汉金逸国际影城-王家湾店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=ad28dc3b9ef863b80e3dda3a', '114.214978,30.564669', '武汉市', '汉阳区王家湾龙阳大道特6号摩尔城C区5楼', 'b50ab28d-7712-3552-3a7d-ce9c52fb0a47', '027-84459599', 0),
(105, 'e6cbfed45fa695f3a5c7568e', '10082119396870700000', '上影CGV大宁影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=e6cbfed45fa695f3a5c7568e', '121.459141,31.279779', '上海市', '上海市闸北区共和新路1878号大宁国际商业广场S1座3楼(近大宁路)', '0f0ff7d4-e1d7-83b0-e585-b039a71c661f', '(021)56651212', 0),
(106, '6beedb45a44be5810f0e6b49', '10672196394984700000', '万达影城(上海周浦万达广场店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=6beedb45a44be5810f0e6b49', '121.576792,31.120472', '上海市', '上海市浦东新区年家浜路518号万达广场四层', 'b3c8fa7c-94ad-b3e3-0dd3-c80e091ac5a2', '(021)38230668;4000806060', 0),
(107, 'cd7f57d494eb41f8a0d23008', '10987073801128600000', '世纪大上海电影院', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=cd7f57d494eb41f8a0d23008', '121.480807,31.241927', '上海市', '上海市黄浦区西藏中路500号第一百货商店新楼8楼(近南京东路)', '05f4bb0d-92c5-9f4a-fd94-537aebd51f49', '(021)63616078', 0),
(108, 'f26769342a5b20597f29bd5d', '11042586036526200000', '广州金逸国际影城-和业店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=f26769342a5b20597f29bd5d', '113.253742,23.127593', '广州市', '荔湾区康王中路486号和业广场4楼(龙津东路口)', 'a7f4217d-d9e3-03fd-9b6f-0321dd96ecb3', '020-81236080 81236090', 0),
(109, '094c5dfe2e340123ab059d49', '11366259728458800000', '莘庄海上国际影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=094c5dfe2e340123ab059d49', '121.384484,31.113849', '上海市', '上海市闵行区沪闵路6088号凯德龙之梦广场4楼(近莘建路)', '9fb3168c-baad-0b39-7133-599327ef642b', '(021)64880138', 0),
(110, '66f395e14f80e1192b06ce1f', '11534311709961800000', '成都上影国际影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=66f395e14f80e1192b06ce1f', '104.0832,30.625808', '成都市', '武侯区科华中路9号王府井百货5楼', 'a8f78827-4136-5e79-2ca8-812e826816f3', '028-85222236', 0),
(111, '8da133c711da33c64354d72a', '11721395700351300000', '永华电影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=8da133c711da33c64354d72a', '121.443131,31.200469', '上海市', '上海市徐汇区虹桥路1号港汇广场6楼(近华山路)', '84759e9e-d8bf-f5df-ba71-90f26e948642', '(021)64076622', 0),
(112, '065599ca4cc0cd804f554729', '11837634993970700000', '重庆金逸国际影城-长寿店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=065599ca4cc0cd804f554729', '107.080961,29.837115', '重庆市', '长寿区凤城镇向阳路2号协信购物广场7楼', 'f4f63574-1f0a-7071-1536-0d40bfec6691', '023-40236011', 0),
(113, 'e4c05e540ba29ff9c909f0e9', '12017963764362700000', '广州华影梅花园影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=e4c05e540ba29ff9c909f0e9', '113.327179,23.18418', '广州市', '白云区广州大道北28号梅花园商业广场5楼', '4a9f546d-c910-bb8e-1658-b60c9d13c906', '020-37322088', 0),
(114, '607b3bd42a8ba014f32d83c1', '12110372755452100000', '重庆华谊兄弟影城-金源店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=607b3bd42a8ba014f32d83c1', '106.536524,29.578848', '重庆市', '江北区建新北路二支路1号金源地下不夜城', '51509324-94cb-308c-5c0b-66b3f53dbede', '023-61802211', 0),
(115, '1b1bce9cd40e680914c8f6e3', '12552800054937200000', '金逸国际影城(张江店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=1b1bce9cd40e680914c8f6e3', '121.590586,31.206553', '上海市', '上海市浦东新区碧波路635号传奇广场2楼(近祖冲之路)', '0e672a81-98f3-1eaf-8542-43e6507eab40', '(021)50802001', 0),
(116, '262144336ef5d0b8130daaff', '12643801116295100000', '重庆华大影院', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=262144336ef5d0b8130daaff', '106.519608,29.606823', '重庆市', '渝北区新南路36号卜蜂莲花超市3楼', 'a931d8ec-da3d-da8c-c379-6d256ab3a2df', '023-67960705', 0),
(117, 'd15891210c0eb2fcf503b87c', '12681556657225800000', '新世界电影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=d15891210c0eb2fcf503b87c', '121.480379,31.24168', '上海市', '上海市黄浦区南京西路2-68号新世界12楼(近西藏中路)', 'fdf16e56-f3a0-1f8b-0cd0-4f1fbfd658c4', '(021)63596810;(021)63594933', 0),
(118, '1940014d530cecffb04c4978', '13442714459153200000', '武汉天河国际影城后湖百步亭店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=1940014d530cecffb04c4978', '114.328706,30.662292', '武汉市', '江岸区后湖大道268号新生活摩尔城三楼', '4ddac204-4f49-72bd-25d9-28d436b694c8', '027-82311119-804 805', 0),
(119, '90dea616e6cfecb121f017eb', '13754237828070800000', '喜洋时代影城-星光汇店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=90dea616e6cfecb121f017eb', '113.211051,23.391928', '广州市', '花都区建设北路72号星光汇商厦八楼', '84d0fa6e-3bc3-7c9f-d1f7-fde2ef35eba1', '020-36991000', 0),
(120, 'f18e562848ee2c1381288ad6', '13864419422244700000', '江汉环球电影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=f18e562848ee2c1381288ad6', '114.306288,30.553295', '武汉市', '武昌区司门口解放路464号原江汉剧场(户部巷对面)', '72f319ec-5187-4259-e8bd-1695b27a2fe8', '027-88863743', 0),
(121, '21071ff7ceb7151f97031975', '14093498657062600000', '汉阳天河国际影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=21071ff7ceb7151f97031975', '114.217678,30.567491', '武汉市', '汉阳区汉阳大道687号，汉商21购物娱乐中心三楼（近汉水公园）', '20ad5f93-213f-4c6f-eb98-b9900f4bcde3', '027－84675900 84675911', 0),
(122, '894c9c488158d6f762685820', '14115612739570600000', '万达影城(上海江桥万达广场店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=894c9c488158d6f762685820', '121.333078,31.247036', '上海市', '上海市嘉定区金沙江西路1075弄49号万达广场三层', 'db0a52d7-64ec-7b3e-7521-f88d5b6b68e2', '(021)31275666;4000806060', 0),
(123, '63a6b4f5f7f0491c5fd4fee7', '14283186296511000000', '深圳金逸国际影城-碧海城店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=63a6b4f5f7f0491c5fd4fee7', '113.863136,22.575004', '深圳市', '宝安区西乡大道与兴业路交汇处碧海城广场4楼', '0d5593fe-3fd0-b7cf-41ee-618f54e86bba', '0755-29885188', 0),
(124, 'e50f67cf75b46e129d82ea7f', '14309273781626600000', '成都保利万和国际影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=e50f67cf75b46e129d82ea7f', '104.10219,30.685743', '成都市', '成华区府青路二段2号财富又一城5楼', '20dd2091-528a-6163-8515-d4dccc88f0ce', '028-83266069', 0),
(125, '6e76cb75d634765fb7265592', '14378139719276000000', '中影火山湖电影城-东山口店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=6e76cb75d634765fb7265592', '113.302048,23.131382', '广州市', '越秀区农林下路4-6号东山锦轩现代城4楼', '7016cd74-9703-3eb2-4215-6b186af6c5d8', '020-87623898', 0),
(126, '5906ca95b3524faf734b87a3', '14400407733521900000', '环艺电影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=5906ca95b3524faf734b87a3', '121.462735,31.23542', '上海市', '上海市静安区南京西路1038号梅龙镇广场10楼(近江宁路)', '24c3881e-5904-a487-4aee-a0f16df6b680', '(021)62187109;(021)62183189', 0),
(127, '682c80b7ae134711e6e965ee', '14748749898332500000', '星美国际影城(浦东正大店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=682c80b7ae134711e6e965ee', '121.506941,31.242629', '上海市', '上海市浦东新区陆家嘴西路168号正大广场8楼(近东方明珠)', 'd68aa606-cc04-264b-aae5-267134527d50', '(021)50472025', 0),
(128, '0f267165bfa95e4df90cadf9', '15160222403550300000', '超极电影世界', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=0f267165bfa95e4df90cadf9', '121.446418,31.199511', '上海市', '上海市徐汇区肇嘉浜路1111号美罗城5楼(近漕溪北路)', 'ef8e116e-c54d-aac7-68a0-064965013f73', '(021)64268181', 0),
(129, 'a907b651473ce955725e80bb', '15375142177907400000', '上海影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=a907b651473ce955725e80bb', '121.436219,31.208638', '上海市', '上海市长宁区新华路160号(番禺路口)', 'a430496a-274a-56bb-d745-3bf6afa26ec2', '(021)62806088', 0),
(130, '4c6da9644e17ed3fdc1e52e1', '15559954396556400000', '成都峨影1958影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=4c6da9644e17ed3fdc1e52e1', '104.030508,30.676293', '成都市', '青羊区清江东路360号', '0ffc6f96-29bc-92b1-931d-6a51b64790de', '400-616-6688', 0),
(131, '922341d4016ef63cdf1e52e7', '15634640671387600000', '广州金逸国际影城-维家思店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=922341d4016ef63cdf1e52e7', '113.334098,23.131091', '广州市', '天河区黄埔大道西188号维家思广场三楼', '9c46c138-0258-57da-8e5d-aa5825658d66', '020-87588855', 0),
(132, 'ae4d9617569ab79501294fe8', '15647587073802900000', '广州金逸国际影城-百信店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=ae4d9617569ab79501294fe8', '113.268902,23.200449', '广州市', '白云区机场路1423-1455号百信三期5楼', 'a651e45d-d054-f39c-2f67-b228c550ae87', '020-86310906 86310908', 0),
(133, 'a588e96efd6ad4d2da2f286e', '15936765454663200000', '重庆南岸横店电影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=a588e96efd6ad4d2da2f286e', '106.57061,29.532098', '重庆市', '南岸区惠工路13号五楼（元旦购物广场）', '1ca4104c-1de2-55cc-b19e-f195b4244471', '023-62822200', 0),
(134, '4e74877fbe06b30ea7c756ad', '16054278558741400000', '成都星美国际影城-沙河店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=4e74877fbe06b30ea7c756ad', '104.109331,30.675198', '成都市', '成华区建设路26号', 'aff0eff9-f702-4ccd-a4d9-344991409c91', '028-84339232', 0),
(135, '8accd6a4228ef806aaf7297e', '16134834874251200000', '庆春电影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=8accd6a4228ef806aaf7297e', '121.418601,31.176187', '上海市', '上海市徐汇区田林路140号越界广场15幢2楼(近苍梧路)', '505fb972-c6ca-7196-d5c7-627f436920d2', '(021)33676660', 0),
(136, '0f930b8df1545e9e01294f77', '16163590782347400000', '深圳金逸国际影城-建安店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=0f930b8df1545e9e01294f77', '113.891413,22.589445', '深圳市', '宝安区建安二路河东骏丰园首层金逸影城', '5bc54422-7e30-081e-eadf-24f5ca13cbd2', '0755-85268280 0755-85268281', 0),
(137, '78c37c3a4e5ff17043afe602', '17880493269603100000', '深影凤凰国际影城', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=78c37c3a4e5ff17043afe602', '114.139951,22.553427', '深圳市', '罗湖区凤凰路和清平路交汇处京基凤凰印象三楼', 'a8678594-73a1-69ad-df81-df7df66bfa78', '0755-82119111', 0),
(138, 'f61acef3238530bceb12e404', '', '金逸国际电影城(北京中关村店)', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=f61acef3238530bceb12e404', '116.322649,39.984288 ', '北京市', '北京市海淀区中关村大街19号新中关购物中心地下一层B180 ', '', '(010)82486800 ', 0),
(139, 'c73d22291003a249c51e51f8', '', '金逸国际电影城朝阳大悦城店', 'http://map.baidu.com/detail?qt=ninf&detail=life&uid=c73d22291003a249c51e51f8', '116.524686,39.929824 ', '北京市', '朝阳区朝阳北路101号朝阳大悦城8楼(青年路口)', '', '(010)85527919 ', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;