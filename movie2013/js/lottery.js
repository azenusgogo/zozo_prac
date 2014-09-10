/*
 * 删除左右两端的空格
 */
function Trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

/*
 * 定义数组
 */
function GetSide(m, n) {
	// 初始化数组
	var arr = [];
	for (var i = 0; i < m; i++) {
		arr.push([]);
		for (var j = 0; j < n; j++) {
			arr[i][j] = i * n + j;
		}
	}
	// 获取数组最外圈
	var resultArr = [];
	var tempX = 0, tempY = 0, direction = "Along", count = 0;
	while (tempX >= 0 && tempX < n && tempY >= 0 && tempY < m && count < m * n) {
		count++;
		resultArr.push([tempY, tempX]);
		if (direction == "Along") {
			if (tempX == n - 1)
				tempY++;
			else
				tempX++;
			if (tempX == n - 1 && tempY == m - 1)
				direction = "Inverse"
		} else {
			if (tempX == 0)
				tempY--;
			else
				tempX--;
			if (tempX == 0 && tempY == 0)
				break;
		}
	}
	return resultArr;
}

var lottery_index = 0, // 当前亮区位置
prevIndex = 0, // 前一位置
Speed = 300, // 初始速度
Time, // 定义对象
arr = GetSide(3, 4), // 初始化数组
EndIndex = 0, // 决定在哪一格变慢
tb = document.getElementById("tb"), // 获取tb对象
cycle = 0, // 转动圈数
EndCycle = 0, // 计算圈数
flag = false, // 结束转动标志
quick = 0, // 加速
url_part = "",
code = 0, btn = document.getElementById("btn1");

function StartLottery() {
	$("#rush_ticket").attr("available", "0");
	clearInterval(Time);
	cycle = 0;
	flag = false;
	EndIndex = 10;// 原来是乘以16 Math.floor(Math.random() * 10)
	// EndCycle=Math.floor(Math.random()*4);
	EndCycle = 5;
	Time = setInterval(Star, Speed);
}
function getPrizeRandom() {
	var win_array = new Array(1, 4, 6, 9);
	var rand = parseInt(4 * Math.random());
	return win_array[rand];
}
function missPrizeRandom() {
	var mis_array = new Array(2, 3, 5, 7, 8, 10);
	var rand = parseInt(6 * Math.random());
	return mis_array[rand];
}
function locateToCity(whichmap) {
	var theCity = new BMap.LocalCity();
        theCity.get(function(re) {
            if (re.name) {
                var _cityName = re.name || "北京市";
                $(".city_inner").html(_cityName);
                var map = _g.initMap(_cityName, whichmap);
                
                var urll = GLOBAL_URL+"/maps/interfaces/movie/get_cinema_info?city=";
                $.ajax({
                    url : urll + encodeURIComponent(_cityName),
                    type : "get",
                    dataType : "jsonp",
                    jsonp : "callback",
                    success : function(re) {
                        var tid = "";
                        $.each(re, function(i, v){
                                    _g
                                            .addMarker(
                                                    new BMap.Point(
                                                            Number(v.lonlat
                                                                    .split(",")[0]),
                                                            Number(v.lonlat
                                                                    .split(",")[1])),
                                                    i, _g.map);
                                });
                    
                      setTimeout(function(){$("#map").find(".BMap_Marker").first().trigger("click");},1000);
                     
                    }
                   
                })

            } else {
                alert("您所在城市的坐标获取失败,系统将定位到默认城市...");
                $(".city_inner").html("北京市");
                var map = _g.initMap("北京市", whichmap);
                
                var urll = GLOBAL_URL+"/maps/interfaces/movie/get_cinema_info?city=";
                $.ajax({
                    url : urll + encodeURIComponent("北京市"),
                    type : "get",
                    dataType : "jsonp",
                    jsonp : "callback",
                    success : function(re) {
                        var tid = "";
                        $.each(re, function(i, v){
                                    _g
                                            .addMarker(
                                                    new BMap.Point(
                                                            Number(v.lonlat
                                                                    .split(",")[0]),
                                                            Number(v.lonlat
                                                                    .split(",")[1])),
                                                    i, _g.map);
                                });
                    
                      setTimeout(function(){$("#map").find(".BMap_Marker").first().trigger("click");},1000);
                     
                    }
                   
                })
            }
        })
   
};

function Star() {
	// 跑马灯变速
	if (flag == false) {
		// 走四格开始加速
		if (quick == 4) {
			clearInterval(Time);
			Speed = 50;
			Time = setInterval(Star, Speed);
		}
		// 跑N圈减速
		if (cycle == EndCycle + 1 && lottery_index == parseInt(EndIndex)) {
			clearInterval(Time);
			Speed = 300;
			flag = true; // 触发结束
			Time = setInterval(Star, Speed);
		}
	}

	if (lottery_index >= arr.length) {
		lottery_index = 0;
		cycle++;
	}

	// 结束转动并选中号码
	// trim里改成数字就可以减速，变成Endindex的话就没有减速效果了
	if (flag == true && lottery_index == (code == 1 ? getPrizeRandom() : missPrizeRandom()) - 1) {// parseInt(Trim('6'))
		quick = 0;
		clearInterval(Time);
		$("#rush_ticket").attr("available", "1");
		if (code == 1) {
			$(".pop_mask").show();
			$(".chose_city",$(".success")).on("change",function(){
	
       	            	 var _city_name = $(this).val(),
       	            	        _url = GLOBAL_URL+"/maps/interfaces/movie/get_cinema_info?city=";
       	            	 $.ajax({
                			  url:_url+encodeURIComponent(_city_name),
                			  type:"get",
                	          dataType:"jsonp", 
                	          jsonp:"callback",
                	          success:function(re){
                	        	  var _optionStr = "<option value=''>请选择影院</option>";
                	        	 $.each(re,function(i,v){
                	        		 _optionStr += "<option runouturl='"+v.href+"' value='"+v.name+"'>"+v.name+"</option>";                	        		               
                	                     });
                	        	    $(".chose_cinema",$(".success")).html(_optionStr);
                	        	   
                	          }
               		     });
               		    
       	             });
       	             //选择影院 生成选座购票按钮跳转url
	         $(".chose_cinema",$(".success")).on("change",function(){
	        	 $(this).prev().val($(this).val());
	        	 $(".success").find("#choseAndBuy").attr("jump",$(this).find("option:selected").attr("runouturl")+url_part);
	         });
       	     $("#choseAndBuy").on("click",function(){
       	     if($(".chose_cinema",$(".success")).val()==""){
       	        alert("请先选择影院");
       	        return false;
       	      }
       	      var _url = $(this).attr("jump");
              var j =encodeURIComponent(_url);
              window.open("mid.html?jump="+j);
       	     });        
			$(".success").find("#lottery_result").show().end().find("#activity_over").hide().end().show();
		} else if (code == 0) {
		
			$(".pop_mask").show();
			$(".fail").show();
		}
		
	}
	tb.rows[arr[lottery_index][0]].cells[arr[lottery_index][1]].className = "glow";
	if (lottery_index > 0)
		prevIndex = lottery_index - 1;
	else {
		prevIndex = arr.length - 1;
	}
	tb.rows[arr[prevIndex][0]].cells[arr[prevIndex][1]].className = "playnormal";
	lottery_index++;
	quick++;

}