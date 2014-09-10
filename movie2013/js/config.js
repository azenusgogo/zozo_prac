
/**
 * @fileoverview 专题配置文件
 * @create-date 2013-04-20
 * @author v_zuonan
 */

/*code统计*/
/* 100150 2013年POI纠错寻宝第二期统计 
var ZT_PAGE_LOGIN            = 100150;  //进入页面用户数（已登录）
var ZT_PAGE_UNLOGIN          = 100151;  //进入页面用户数（未登录）
var ZT_BTN_LOGIN             = 100152;  //活动页面点击登录数（ICON）
var ZT_BTN_LOTTERY_LOGIN     = 100153;  //活动页面点击抽奖数（已登录）
var ZT_BTN_LOTTERY_UNLOGIN   = 100154;  //活动页面点击抽奖数（未登录） 100302*/

//立减10元区影院code统计
/*var PC_M10_CINEMA1   = 100401,      //保利国际影城(中环广场店)      
	PC_M10_CINEMA2   = 100402,      //橙天嘉禾影城(万象城店)        
	PC_M10_CINEMA3   = 100403,      //ume国际影城(涪陵店)           
	PC_M10_CINEMA4   = 100404,      //博纳国际影城(龙岗店)          
	PC_M10_CINEMA5   = 100405,      //百老汇影城(国瑞城店)          
	PC_M10_CINEMA6   = 100406,      //ume国际影城(江北店)           
	PC_M10_CINEMA7   = 100407,      //广州上影联和电影城            
	PC_M10_CINEMA8   = 100408,      //成都上影国际影城              
	PC_M10_CINEMA9   = 100409,      //华谊兄弟影院(望京店)          
	PC_M10_CINEMA10  = 100410,      //橙天嘉禾影城(凯丹店)          
	PC_M10_CINEMA11  = 100411,      //保利国际影城(首地大峡谷店)    
	PC_M10_CINEMA12  = 100412,      //ume国际影城(沙坪坝店)         
	PC_M10_CINEMA13  = 100413,      //嘉华国际影城                  
	PC_M10_CINEMA14  = 100414,      //华影万晟国际影城              
	PC_M10_CINEMA15  = 100415,      //广州飞影电影城                
	PC_M10_CINEMA16  = 100416,      //橙天嘉禾影城(一品店)          
	PC_M10_CINEMA17  = 100417,      //博纳国际影城(易诚店)          
	PC_M10_CINEMA18  = 100418,      //ume国际影城(北碚店)           
	PC_M10_CINEMA19  = 100419,      //橙天嘉禾影城(大渡口店)        
	PC_M10_CINEMA20  = 100420,      //环艺新民众电影城              
	PC_M10_CINEMA21  = 100421,      //星际银河影城                  
	PC_M10_CINEMA22  = 100422,      //星美国际影城(西南影都店)      
	PC_M10_CINEMA23  = 100423,      //广州番禺沙湾数字电影院        
	PC_M10_CINEMA24  = 100424,      //ume国际影城(双井店)           
	PC_M10_CINEMA25  = 100425,      //时代金球影城(华南城店)        
	PC_M10_CINEMA26  = 100426,      //博纳国际影城(方庄店)          
	PC_M10_CINEMA27  = 100427,      //华谊兄弟影院(袁家岗店)        
	PC_M10_CINEMA28  = 100428,      //华谊兄弟影院(太古城店)        
	PC_M10_CINEMA29  = 100429,      //重庆环艺电影城                
	PC_M10_CINEMA30  = 100430,      //橙天嘉禾影城(停机坪购物广场店)
	PC_M10_CINEMA31  = 100431,      //深圳宝安环星影城              
	PC_M10_CINEMA32  = 100432,      //搜秀影城                      
	PC_M10_CINEMA33  = 100433,      //百老汇影城(当代MOMA店)        
	PC_M10_CINEMA34  = 100434,      //横店电影城(王府井店)          
	PC_M10_CINEMA35  = 100435,      //中影国际影城(武汉东购店)      
	PC_M10_CINEMA36  = 100436,      //博纳国际影城(悠唐店)          
	PC_M10_CINEMA37  = 100437,      //ume国际影城(九龙坡店)         
	PC_M10_CINEMA38  = 100438,      //橙天嘉禾影城(上地店)          
	PC_M10_CINEMA39  = 100439,      //海岸影城                      
	PC_M10_CINEMA40  = 100440,      //百丽宫影院(金宝汇店)          
	PC_M10_CINEMA41  = 100441,      //华夏艺术中心数码影院          
	PC_M10_CINEMA42  = 100442,      //中影国际影城(中航九方店)      
	PC_M10_CINEMA43  = 100443,      //博纳国际影城(通州店)          
	PC_M10_CINEMA44  = 100444,      //ume国际影城(安贞店)           
	PC_M10_CINEMA45  = 100445,      //博纳国际影城(华强北茂业店)    
	PC_M10_CINEMA46  = 100446,      //ume国际影城(两江新区店)       
	PC_M10_CINEMA47  = 100447,      //橙天嘉禾影城(富力天汇店)      
	PC_M10_CINEMA48  = 100448,      //橙天嘉禾影城(日月光店)        
	PC_M10_CINEMA49  = 100449,      //华影青宫电影城                
	PC_M10_CINEMA50  = 100450,      //中影火山湖电影城(番禺店)      
	PC_M10_CINEMA51  = 100451,      //ume国际影城(华星店)           
	PC_M10_CINEMA52  = 100452,      //新华国际影城(大钟寺店)        
	PC_M10_CINEMA53  = 100453,      //百老汇影城(新世纪东方广场店)  
	PC_M10_CINEMA54  = 100454,      //紫光影城                      
	PC_M10_CINEMA55  = 100455,      //横店电影城(上河坊店)          
	PC_M10_CINEMA56  = 100456,      //中影益田假日影城              
	PC_M10_CINEMA57  = 100457,      //首都电影院(西单店)            
	PC_M10_CINEMA58  = 100458,      //中影国际影城(永旺店)          
	PC_M10_CINEMA59  = 100459,      //华谊兄弟影院(南坪百联店)      
	PC_M10_CINEMA60  = 100460,      //ume国际影城(成都店)           
	PC_M10_CINEMA61  = 100461,      //百老汇影城(新东安店)          
	PC_M10_CINEMA62  = 100462,      //橙天嘉禾影城(江北店)          
	PC_M10_CINEMA63  = 100463,      //星美国际影城(华南影都店)      
	PC_M10_CINEMA64  = 100464,      //ume国际影城(渝中店)           
	PC_M10_CINEMA65  = 100465,      //中影今典国际影城              
	PC_M10_CINEMA66  = 100466,      //东都国际影城                  
	PC_M10_CINEMA67  = 100467,      //广州UME国际影城               
	PC_M10_CINEMA68  = 100468,      //和平影都                      
	PC_M10_CINEMA69  = 100469,      //武汉中影天河影院              
	PC_M10_CINEMA70  = 100470,      //深圳金域新百花电影城          
	PC_M10_CINEMA71  = 100471,      //喜洋时代影城-东圃四季荟店     
	PC_M10_CINEMA72  = 100472,      //武汉金逸国际影城-销品茂店     
	PC_M10_CINEMA73  = 100473,      //大光明电影院                  
	PC_M10_CINEMA74  = 100474,      //开元地中海影城                
	PC_M10_CINEMA75  = 100475,      //重庆橙天嘉禾影城-九街店       
	PC_M10_CINEMA76  = 100476,      //中影环星电影城新安店          
	PC_M10_CINEMA77  = 100477,      //金逸院线新恒星影城            
	PC_M10_CINEMA78  = 100478,      //世博国际影城                  
	PC_M10_CINEMA79  = 100479,      //深圳戏院                      
	PC_M10_CINEMA80  = 100480,      //新世纪影城                    
	PC_M10_CINEMA81  = 100481,      //上影CGV莘庄影城               
	PC_M10_CINEMA82  = 100482,      //成都幸福蓝海春天影城          
	PC_M10_CINEMA83  = 100483,      //广州金逸国际影城-达镖店       
	PC_M10_CINEMA84  = 100484,      //重庆橙天嘉禾影城-壹街店       
	PC_M10_CINEMA85  = 100485,      //17.5影城(又一城店)            
	PC_M10_CINEMA86  = 100486,      //华谊兄弟影院武汉黄陂店        
	PC_M10_CINEMA87  = 100487,      //ume国际影城(新天地)           
	PC_M10_CINEMA88  = 100488,      //华谊兄弟影院武汉光谷店        
	PC_M10_CINEMA89  = 100489,      //金逸国际影城(中环店)          
	PC_M10_CINEMA90  = 100490,      //广州金逸国际影城-太阳城店     
	PC_M10_CINEMA91  = 100491,      //重庆金逸国际影城-地王店       
	PC_M10_CINEMA92  = 100492,      //武汉金逸国际影城-南湖店       
	PC_M10_CINEMA93  = 100493,      //世纪仙霞影城                  
	PC_M10_CINEMA94  = 100494,      //成都横店影城                  
	PC_M10_CINEMA95  = 100495,      //广州飞影电影城                
	PC_M10_CINEMA96  = 100496,      //广东科学中心                  
	PC_M10_CINEMA97  = 100497,      //广州丽江影城                  
	PC_M10_CINEMA98  = 100498,      //喜玛拉雅海上国际影城          
	PC_M10_CINEMA99  = 100499,      //龙之梦影城                    
	PC_M10_CINEMA100 = 100500,      //万达影城(上海五角场万达广场店)
	PC_M10_CINEMA101 = 100501,      //国金百丽宫影院                
	PC_M10_CINEMA102 = 100502,      //世纪友谊影城                  
	PC_M10_CINEMA103 = 100503,      //重庆煌华横店电影城            
	PC_M10_CINEMA104 = 100504,      //武汉金逸国际影城-王家湾店     
	PC_M10_CINEMA105 = 100505,      //上影CGV大宁影城               
	PC_M10_CINEMA106 = 100506,      //万达影城(上海周浦万达广场店)  
	PC_M10_CINEMA107 = 100507,      //世纪大上海电影院              
	PC_M10_CINEMA108 = 100508,      //广州金逸国际影城-和业店       
	PC_M10_CINEMA109 = 100509,      //莘庄海上国际影城              
	PC_M10_CINEMA110 = 100510,      //成都上影国际影城              
	PC_M10_CINEMA111 = 100511,      //永华电影城                    
	PC_M10_CINEMA112 = 100512,      //重庆金逸国际影城-长寿店       
	PC_M10_CINEMA113 = 100513,      //广州华影梅花园影城            
	PC_M10_CINEMA114 = 100514,      //重庆华谊兄弟影城-金源店       
	PC_M10_CINEMA115 = 100515,      //金逸国际影城(张江店)          
	PC_M10_CINEMA116 = 100516,      //重庆华大影院                  
	PC_M10_CINEMA117 = 100517,      //新世界电影城                  
	PC_M10_CINEMA118 = 100518,      //武汉天河国际影城后湖百步亭店  
	PC_M10_CINEMA119 = 100519,      //喜洋时代影城-星光汇店         
	PC_M10_CINEMA120 = 100520,      //江汉环球电影城                
	PC_M10_CINEMA121 = 100521,      //汉阳天河国际影城              
	PC_M10_CINEMA122 = 100522,      //万达影城(上海江桥万达广场店)  
	PC_M10_CINEMA123 = 100523,      //深圳金逸国际影城-碧海城店     
	PC_M10_CINEMA124 = 100524,      //成都保利万和国际影城          
	PC_M10_CINEMA125 = 100525,      //中影火山湖电影城-东山口店     
	PC_M10_CINEMA126 = 100526,      //环艺电影城                    
	PC_M10_CINEMA127 = 100527,      //星美国际影城(浦东正大店)      
	PC_M10_CINEMA128 = 100528,      //超极电影世界                  
	PC_M10_CINEMA129 = 100529,      //上海影城                      
	PC_M10_CINEMA130 = 100530,      //成都峨影1958影城              
	PC_M10_CINEMA131 = 100531,      //广州金逸国际影城-维家思店     
	PC_M10_CINEMA132 = 100532,      //广州金逸国际影城-百信店       
	PC_M10_CINEMA133 = 100533,      //重庆南岸横店电影城            
	PC_M10_CINEMA134 = 100534,      //成都星美国际影城-沙河店       
	PC_M10_CINEMA135 = 100535,      //庆春电影城                    
	PC_M10_CINEMA136 = 100536,      //深圳金逸国际影城-建安店       
	PC_M10_CINEMA137 = 100537,      //深影凤凰国际影城              
	PC_M10_CINEMA138 = 100538,      //洪山天河国际影城              
	//立减30元区影院code统计        
	PC_M30_CINEMA1   = 100539,      //保利国际影城(中环广场店)      
	PC_M30_CINEMA2   = 100540,      //橙天嘉禾影城(万象城店)        
	PC_M30_CINEMA3   = 100541,      //ume国际影城(涪陵店)           
	PC_M30_CINEMA4   = 100542,      //博纳国际影城(龙岗店)          
	PC_M30_CINEMA5   = 100543,      //百老汇影城(国瑞城店)          
	PC_M30_CINEMA6   = 100544,      //ume国际影城(江北店)           
	PC_M30_CINEMA7   = 100545,      //广州上影联和电影城            
	PC_M30_CINEMA8   = 100546,      //成都上影国际影城              
	PC_M30_CINEMA9   = 100547,      //华谊兄弟影院(望京店)          
	PC_M30_CINEMA10  = 100548,      //橙天嘉禾影城(凯丹店)          
	PC_M30_CINEMA11  = 100549,      //保利国际影城(首地大峡谷店)    
	PC_M30_CINEMA12  = 100550,      //ume国际影城(沙坪坝店)         
	PC_M30_CINEMA13  = 100551,      //嘉华国际影城                  
	PC_M30_CINEMA14  = 100552,      //华影万晟国际影城              
	PC_M30_CINEMA15  = 100553,      //广州飞影电影城                
	PC_M30_CINEMA16  = 100554,      //橙天嘉禾影城(一品店)          
	PC_M30_CINEMA17  = 100555,      //博纳国际影城(易诚店)          
	PC_M30_CINEMA18  = 100556,      //ume国际影城(北碚店)           
	PC_M30_CINEMA19  = 100557,      //橙天嘉禾影城(大渡口店)        
	PC_M30_CINEMA20  = 100558,      //环艺新民众电影城              
	PC_M30_CINEMA21  = 100559,      //星际银河影城                  
	PC_M30_CINEMA22  = 100560,      //星美国际影城(西南影都店)      
	PC_M30_CINEMA23  = 100561,      //广州番禺沙湾数字电影院        
	PC_M30_CINEMA24  = 100562,      //ume国际影城(双井店)           
	PC_M30_CINEMA25  = 100563,      //时代金球影城(华南城店)        
	PC_M30_CINEMA26  = 100564,      //博纳国际影城(方庄店)          
	PC_M30_CINEMA27  = 100565,      //华谊兄弟影院(袁家岗店)        
	PC_M30_CINEMA28  = 100566,      //华谊兄弟影院(太古城店)        
	PC_M30_CINEMA29  = 100567,      //重庆环艺电影城                
	PC_M30_CINEMA30  = 100568,      //橙天嘉禾影城(停机坪购物广场店)
	PC_M30_CINEMA31  = 100569,      //深圳宝安环星影城              
	PC_M30_CINEMA32  = 100570,      //搜秀影城                      
	PC_M30_CINEMA33  = 100571,      //百老汇影城(当代MOMA店)        
	PC_M30_CINEMA34  = 100572,      //横店电影城(王府井店)          
	PC_M30_CINEMA35  = 100573,      //中影国际影城(武汉东购店)      
	PC_M30_CINEMA36  = 100574,      //博纳国际影城(悠唐店)          
	PC_M30_CINEMA37  = 100575,      //ume国际影城(九龙坡店)         
	PC_M30_CINEMA38  = 100576,      //橙天嘉禾影城(上地店)          
	PC_M30_CINEMA39  = 100577,      //海岸影城                      
	PC_M30_CINEMA40  = 100578,      //百丽宫影院(金宝汇店)          
	PC_M30_CINEMA41  = 100579,      //华夏艺术中心数码影院          
	PC_M30_CINEMA42  = 100580,      //中影国际影城(中航九方店)      
	PC_M30_CINEMA43  = 100581,      //博纳国际影城(通州店)          
	PC_M30_CINEMA44  = 100582,      //ume国际影城(安贞店)           
	PC_M30_CINEMA45  = 100583,      //博纳国际影城(华强北茂业店)    
	PC_M30_CINEMA46  = 100584,      //ume国际影城(两江新区店)       
	PC_M30_CINEMA47  = 100585,      //橙天嘉禾影城(富力天汇店)      
	PC_M30_CINEMA48  = 100586,      //橙天嘉禾影城(日月光店)        
	PC_M30_CINEMA49  = 100587,      //华影青宫电影城                
	PC_M30_CINEMA50  = 100588,      //中影火山湖电影城(番禺店)      
	PC_M30_CINEMA51  = 100589,      //ume国际影城(华星店)           
	PC_M30_CINEMA52  = 100590,      //新华国际影城(大钟寺店)        
	PC_M30_CINEMA53  = 100591,      //百老汇影城(新世纪东方广场店)  
	PC_M30_CINEMA54  = 100592,      //紫光影城                      
	PC_M30_CINEMA55  = 100593,      //横店电影城(上河坊店)          
	PC_M30_CINEMA56  = 100594,      //中影益田假日影城              
	PC_M30_CINEMA57  = 100595,      //首都电影院(西单店)            
	PC_M30_CINEMA58  = 100596,      //中影国际影城(永旺店)          
	PC_M30_CINEMA59  = 100597,      //华谊兄弟影院(南坪百联店)      
	PC_M30_CINEMA60  = 100598,      //ume国际影城(成都店)           
	PC_M30_CINEMA61  = 100599,      //百老汇影城(新东安店)          
	PC_M30_CINEMA62  = 100600,      //橙天嘉禾影城(江北店)          
	PC_M30_CINEMA63  = 100601,      //星美国际影城(华南影都店)      
	PC_M30_CINEMA64  = 100602,      //ume国际影城(渝中店)           
	PC_M30_CINEMA65  = 100603,      //中影今典国际影城              
	PC_M30_CINEMA66  = 100604,      //东都国际影城                  
	PC_M30_CINEMA67  = 100605,      //广州UME国际影城               
	PC_M30_CINEMA68  = 100606,      //和平影都                      
	PC_M30_CINEMA69  = 100607,      //武汉中影天河影院              
	PC_M30_CINEMA70  = 100608,      //深圳金域新百花电影城          
	PC_M30_CINEMA71  = 100609,      //喜洋时代影城-东圃四季荟店     
	PC_M30_CINEMA72  = 100610,      //武汉金逸国际影城-销品茂店     
	PC_M30_CINEMA73  = 100611,      //大光明电影院                  
	PC_M30_CINEMA74  = 100612,      //开元地中海影城                
	PC_M30_CINEMA75  = 100613,      //重庆橙天嘉禾影城-九街店       
	PC_M30_CINEMA76  = 100614,      //中影环星电影城新安店          
	PC_M30_CINEMA77  = 100615,      //金逸院线新恒星影城            
	PC_M30_CINEMA78  = 100616,      //世博国际影城                  
	PC_M30_CINEMA79  = 100617,      //深圳戏院                      
	PC_M30_CINEMA80  = 100618,      //新世纪影城                    
	PC_M30_CINEMA81  = 100619,      //上影CGV莘庄影城               
	PC_M30_CINEMA82  = 100620,      //成都幸福蓝海春天影城          
	PC_M30_CINEMA83  = 100621,      //广州金逸国际影城-达镖店       
	PC_M30_CINEMA84  = 100622,      //重庆橙天嘉禾影城-壹街店       
	PC_M30_CINEMA85  = 100623,      //17.5影城(又一城店)            
	PC_M30_CINEMA86  = 100624,      //华谊兄弟影院武汉黄陂店        
	PC_M30_CINEMA87  = 100625,      //ume国际影城(新天地)           
	PC_M30_CINEMA88  = 100626,      //华谊兄弟影院武汉光谷店        
	PC_M30_CINEMA89  = 100627,      //金逸国际影城(中环店)          
	PC_M30_CINEMA90  = 100628,      //广州金逸国际影城-太阳城店     
	PC_M30_CINEMA91  = 100629,      //重庆金逸国际影城-地王店       
	PC_M30_CINEMA92  = 100630,      //武汉金逸国际影城-南湖店       
	PC_M30_CINEMA93  = 100631,      //世纪仙霞影城                  
	PC_M30_CINEMA94  = 100632,      //成都横店影城                  
	PC_M30_CINEMA95  = 100633,      //广州飞影电影城                
	PC_M30_CINEMA96  = 100634,      //广东科学中心                  
	PC_M30_CINEMA97  = 100635,      //广州丽江影城                  
	PC_M30_CINEMA98  = 100636,      //喜玛拉雅海上国际影城          
	PC_M30_CINEMA99  = 100637,      //龙之梦影城                    
	PC_M30_CINEMA100 = 100638,      //万达影城(上海五角场万达广场店)
	PC_M30_CINEMA101 = 100639,      //国金百丽宫影院                
	PC_M30_CINEMA102 = 100640,      //世纪友谊影城                  
	PC_M30_CINEMA103 = 100641,      //重庆煌华横店电影城            
	PC_M30_CINEMA104 = 100642,      //武汉金逸国际影城-王家湾店     
	PC_M30_CINEMA105 = 100643,      //上影CGV大宁影城               
	PC_M30_CINEMA106 = 100644,      //万达影城(上海周浦万达广场店)  
	PC_M30_CINEMA107 = 100645,      //世纪大上海电影院              
	PC_M30_CINEMA108 = 100646,      //广州金逸国际影城-和业店       
	PC_M30_CINEMA109 = 100647,      //莘庄海上国际影城              
	PC_M30_CINEMA110 = 100648,      //成都上影国际影城              
	PC_M30_CINEMA111 = 100649,      //永华电影城                    
	PC_M30_CINEMA112 = 100650,      //重庆金逸国际影城-长寿店       
	PC_M30_CINEMA113 = 100651,      //广州华影梅花园影城            
	PC_M30_CINEMA114 = 100652,      //重庆华谊兄弟影城-金源店       
	PC_M30_CINEMA115 = 100653,      //金逸国际影城(张江店)          
	PC_M30_CINEMA116 = 100654,      //重庆华大影院                  
	PC_M30_CINEMA117 = 100655,      //新世界电影城                  
	PC_M30_CINEMA118 = 100656,      //武汉天河国际影城后湖百步亭店  
	PC_M30_CINEMA119 = 100657,      //喜洋时代影城-星光汇店         
	PC_M30_CINEMA120 = 100658,      //江汉环球电影城                
	PC_M30_CINEMA121 = 100659,      //汉阳天河国际影城              
	PC_M30_CINEMA122 = 100660,      //万达影城(上海江桥万达广场店)  
	PC_M30_CINEMA123 = 100661,      //深圳金逸国际影城-碧海城店     
	PC_M30_CINEMA124 = 100662,      //成都保利万和国际影城          
	PC_M30_CINEMA125 = 100663,      //中影火山湖电影城-东山口店     
	PC_M30_CINEMA126 = 100664,      //环艺电影城                    
	PC_M30_CINEMA127 = 100665,      //星美国际影城(浦东正大店)      
	PC_M30_CINEMA128 = 100666,      //超极电影世界                  
	PC_M30_CINEMA129 = 100667,      //上海影城                      
	PC_M30_CINEMA130 = 100668,      //成都峨影1958影城              
	PC_M30_CINEMA131 = 100669,      //广州金逸国际影城-维家思店     
	PC_M30_CINEMA132 = 100670,      //广州金逸国际影城-百信店       
	PC_M30_CINEMA133 = 100671,      //重庆南岸横店电影城            
	PC_M30_CINEMA134 = 100672,      //成都星美国际影城-沙河店       
	PC_M30_CINEMA135 = 100673,      //庆春电影城                    
	PC_M30_CINEMA136 = 100674,      //深圳金逸国际影城-建安店       
	PC_M30_CINEMA137 = 100675,      //深影凤凰国际影城              
	PC_M30_CINEMA138 = 100676,      //洪山天河国际影城 */
	var 
	    //GLOBAL_URL = "http://tjyx-testing-map57.vm.baidu.com:8885",
	    GLOBAL_URL = "http://map.baidu.com",
	  //  GLOBAL_URL = "http://172.22.182.214",
	PC_M30_START_LOTTERY = 100677,  //立减30元，PC端“开始抽奖”按钮点击量
	PC_M30_DAILY_GOT_PRIZE = 100678;//立减30元，PC端每日中奖人数

    
function addStat(code, opts){
  if (!code){
    return;
  }
  // 组装参数
  opts = opts || {};
  var extq = "";
  for (var i in opts){
    extq = extq + "&" + i + "=" + encodeURIComponent(opts[i]);
  }
  // 内部函数定义 - 发送统计请求
  var sendStat = function(q){
    if (!q){
      return;
    }
    addStat._sending = true;
    setTimeout(function(){$("#statImg").attr('src',"http://map.baidu.com/img/transparent.gif?newmap=1" + q.src)}, 50);
  }
  // 内部函数定义 - 发送队列中下一个统计请求
  var reqNext = function (){
    var nq = addStat._reqQueue.shift()
    if (nq){
      sendStat(nq);
    }
  }
  var ts = (Math.random() * 100000000).toFixed(0);
  if (addStat._sending){
    // 将本次请求加入队列
    addStat._reqQueue.push({src: "&code=" + code + extq+"&t=" + ts});
  }
  else{
    // 直接发送请求
    sendStat({src: "&code=" + code + extq + "&t=" + ts});
  }
  // 绑定事件
  if (!addStat._binded){
    $("#statImg").on("load", function(){
      addStat._sending = false;
      reqNext();
    });
    $("#statImg").on("error", function(){
      addStat._sending = false;
      reqNext();
    });
    addStat._binded = true;
  }
}

// 初始化请求队列
addStat._reqQueue = [];