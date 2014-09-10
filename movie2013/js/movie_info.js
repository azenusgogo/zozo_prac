// 影院数据
window._g = {};
$.extend(window._g, {
	pointInfo : {
		"131" : [{
					coor : "116.425734,39.902611"//
				}, {
					coor : "116.375399,39.852549"
				}, {
					coor : "116.368787,39.895077"
				}, {
					coor : "116.41708,39.890648"
				}],
		"289" : [{
					coor : "121.478061,31.212662"
				}, {
					coor : "121.433505,31.226497"
				}, {
					coor : "121.408497,31.187704"
				}, {
					coor : "121.520893,31.191905"
				}],
		guangzhou : []
	},
	movInfo : {
		"116.425734,39.902611" : { //   12963827.11,4827857.18  116.454801,39.928462
			movName : "搜秀影城",
			address : "北京市崇文区崇外大街40号搜秀城9层",
			tel : "(010)88699220"
		},
		"116.375399,39.852549" : {
			movName : "格瓦拉菜市口店",
			address : "菜市口东大街甲20号",
			tel : "(010)84786599"
			
		},
		"116.368787,39.895077" : {
			movName : "耀莱国际影城五道口店",
			address : "五道口1号",
			tel : "(010)82775555"
		},
		"116.41708,39.890648" : {
			movName : "星美影城回龙观店",
			address : "海淀区回龙观西口88号",
			tel : "(010)83666666"			
		}
	},
	cityList : ['beijing', 'shanghai', 'guangzhou', 'shenzhen', 'hangzhou',
			'lijiang', 'chengdu', 'sanya', 'xiamen', 'xian'],
	tpl : function(template, data, label) {
		var tmp = String(template), s = label || /&\{([^}]*)\}/mg;
		return tmp.replace(s, function(value, name) {
					if (data[$.trim(name)] === '') {
						return value = '&nbsp';
					}
					return value = data[$.trim(name)];
				});
	},
	mecatorTolnglat:function(x,y) {
	var poi = new BMap.Pixel(x,y);
	return this.map.getMapType().getProjection().pointToLngLat(poi);
	},
	lngLatToMecator:function (lng,lat){
	var poi = new BMap.Point(lng,lat);
	return this.map.getMapType().getProjection().lngLatToPoint(poi);
    },

	map : {},
	initMap : function(cityName,targetDiv) {
		var map = new BMap.Map(targetDiv);
		map.centerAndZoom(cityName, 12);
		map.enableScrollWheelZoom();
		this.map = map;
	},
	temp:"<div id='popupBox' style='width:412px;height:356px;background:url(img/popup.png) no-repeat scroll 0 0 transparent;color:#ffffff;'><div class='popup_title' style='overflow:hidden;font-size:14px;height:34px;line-height:34px;text-indent:15px'>&{name}</div><div style='height:55px;text-indent:15px'><div style='height:30px;line-height:30px;'>&{address}</div><div style='height:25px;line-height:12px;'>&{tel}</div></div><ul style='padding:0 14px;height:162px;width:412px;overflow:hidden;'><li style='float:left;display:inline;'><img src='img/1s.jpg' width='115px' height='161px'/></li><li style='float:left;display:inline;margin-left:18px;'><img src='img/2s.jpg' width='115px' height='161px'/></li><li style='float:left;display:inline;margin-left:18px;'><img src='img/3s.jpg' width='115px' height='161px'/></li></ul><div style='height:31px; width:169px; padding:14px 121px;'><a style='width:174px;height:29px;line-height:29px;display:block;text-align:center;color:#ffffff;background:url(img/pick_seat.png);cursor:pointer;text-decoration:none;font-weight:bold;' poiJump='&{href}' target='_blank' class='buy_ticket' movId='&{id}'>选座购票</a></div></div>",
	addMarker : function(point, index, map) {
		var that = this;
		var myIcon = new BMap.Icon("img/raindrop.png", new BMap.Size(27, 40)),marker = new BMap.Marker(
				point, {
					icon : myIcon
				});
		marker.setOffset(new BMap.Size(0, -20));
		marker.addEventListener("click",function() {
			if($("#map").find(".infoBox").length>0){
			  $("#map").find(".infoBox").remove();
			}
			
			var    mov_key = point.lng+","+point.lat;//point.lng+","+point.lat,  
			       
			       
			       $.ajax({
         			  url:GLOBAL_URL+"/maps/interfaces/movie/get_cinema_detail?lonlat="+mov_key,
         			  type:"get",
         	          dataType:"jsonp",
         	          jsonp:"callback",
         	          success:function(re){
         	        	var  cnt = that.tpl(that.temp,re[0]);	
         	        	 var mov_popup = new BMapLib.InfoBox(that.map,cnt,{closeIconMargin: "13px 10px 0 0",alignBottom: true,closeIconUrl:"img/close.png",enableAutoPan:true});//boxStyle:{background:"url('img/popup.png') no-repeat scroll 0 0 transparent",width: "412px",height:"356px",color:"#ffffff"}*/
                             mov_popup.open(point);
                             $("#map").find(".buy_ticket").on("click",function(){
                             var _url = $(this).attr("poiJump");
                             var j =encodeURIComponent(_url+"&channel=pc2");
                             window.open("mid.html?jump="+j);
                             })
                             
         	          }
        		 });
				

		});
		that.map.addOverlay(marker);
	}

});
					/*
					 * 自定义弹窗 window._g.MoviePopUpOverlay = function(coor, temp,
					 * data,opts,map) { this._map = map; this._width =
					 * opts.width; this._coor = coor; this._cnt = _g.tpl(temp,
					 * data); } window._g.MoviePopUpOverlay.prototype = new
					 * BMap.Overlay();
					 * window._g.MoviePopUpOverlay.prototype.initialize =
					 * function(map) {
					 * map.getPanes().floatPane.appendChild(this._cnt); return
					 * this._cnt; } window._g.MoviePopUpOverlay.prototype.draw =
					 * function() { // 根据地理坐标转换为像素坐标，并设置给容器 var position =
					 * this._map.pointToOverlayPixel(this._coor);
					 * this._cnt.style.left = position.x - this._width / 2 +
					 * "px"; this._cnt.style.top = position.y - this._width / 2 +
					 * "px"; }
					 */