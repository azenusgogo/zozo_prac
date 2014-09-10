
if(navigator.userAgent.indexOf('Firefox') > 0 || window.navigator.msPointerEnabled){
	
	var head = document.getElementsByTagName('head');
	var viewport = document.createElement('meta');
	viewport.name = 'viewport';
	viewport.id = 'viewport';
	viewport.content = "width=640";
	head.length > 0 && head[head.length - 1].appendChild(viewport);
	$(window).resize(function(){
		resizeWindow();
		resetWindowTop(1);
		
	});
	function resizeWindow(){
		if($(window).width()>$(window).height()){
			$("#view-potrait").show();
		}else{
			$("#view-potrait").hide();
		}
	}
	$(function(){
		$("#view-potrait").hide();
		$("#stage11").click(function(){
			return false;
		});
		$("#stage8,#stage11").click(function(){
			return false;
		});
		resizeWindow();
	});
}else{
	
	var adaptUILayout = (function(){
	  
	
		//根据校正appVersion或userAgent校正屏幕分辨率宽度值
		var regulateScreen = (function(){
			var cache = {};
			
			//默认尺寸
			var defSize = {
				width  : window.screen.width,
				height : window.screen.height
			};
			
			var ver = window.navigator.appVersion;
			var s = window.orientation;
			var _ = null;
			
			var check = function(key){
				return key.constructor == String ? ver.indexOf(key) > -1 : ver.test(key);
			};
			
			var add = function(name, key, size){
				if(name && key)
					cache[name] = {
						key : key,
						size : size
					};
			};
			
			var del = function(name){
				if(cache[name])
					delete cache[name];
			};
			
			var cal = function(){
				if(_ != null)
					return _;
					
				for(var name in cache){
					if(check(cache[name].key)){
						_ = cache[name].size;
						break;
					}
				}
				
				if(_ == null)
					_ = defSize;
				
				return _;
			};
			
			return {
				add : add,
				del : del,
				cal : cal,
				s : s
			};
		})();
		
	
		//实现缩放
		var adapt = function(uiWidth){
			var 
			deviceWidth,
			devicePixelRatio,
			targetDensitydpi,
			//meta,
			initialContent,
			head,
			viewport,
			ua;
	
			ua = navigator.userAgent.toLowerCase();
			//whether it is the iPhone or iPad
			isiOS = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1;
		
			//获取设备信息,并矫正参数值
			devicePixelRatio = window.devicePixelRatio;
			devicePixelRatio < 1.5 ? 2  : devicePixelRatio;
			
			if(window.orientation == 0 || window.orientation == 180){
				$("#view-potrait").hide();
				$("#main").show();
				if(regulateScreen.s!=0){
					if(regulateScreen.cal().width < regulateScreen.cal().height){
						deviceWidth      = regulateScreen.cal().width; 
					}else{
						deviceWidth      = regulateScreen.cal().height; 
					}
				}else{
					deviceWidth      = regulateScreen.cal().width; 
				}
			}else{
				$("#view-potrait").show();
				//$("#main").hide();
				if(regulateScreen.s!=0){
					$(function(){
						$("#view-potrait").fadeIn(100);
						//$("#main").hide();
					});
					if(regulateScreen.cal().width > regulateScreen.cal().height){
						deviceWidth      = regulateScreen.cal().width; 
					}else{
						deviceWidth      = regulateScreen.cal().height; 
					}
				}else{
					deviceWidth      = regulateScreen.cal().height; 
				}
			}
	
			if(devicePixelRatio==2 && (deviceWidth==320 || deviceWidth==360 || deviceWidth==592 || deviceWidth==640)){
				deviceWidth*=2;
			}
			if(devicePixelRatio==1.5 && (deviceWidth==320)){
				deviceWidth*=2;
				devicePixelRatio = 2;
			}
			if(devicePixelRatio==1.5 && (deviceWidth==640)){
				devicePixelRatio = 2;
			}
	
			//获取最终dpi
			targetDensitydpi = uiWidth / deviceWidth * devicePixelRatio * 160;
			//alert(targetDensitydpi);
			//use viewport width attribute on the iPhone or iPad device
			//use viewport target-densitydpi attribute on the Android device
			initialContent   = isiOS 
				? 'width=' + uiWidth + 'px, user-scalable=no'
				: 'target-densitydpi=' + targetDensitydpi + ', width='+ uiWidth +', user-scalable=no';
			$("#viewport").remove();
			head = document.getElementsByTagName('head');
			viewport = document.createElement('meta');
			viewport.name = 'viewport';
			viewport.id = 'viewport';
			viewport.content = initialContent;
			
			if(isiOS && window.orientation != 0 && window.orientation != 180){
				viewport.content = 'width=1280';
				head.length > 0 && head[head.length - 1].appendChild(viewport);
			}else{
				head.length > 0 && head[head.length - 1].appendChild(viewport);
			}
		};
		
		return {
			regulateScreen : regulateScreen,
			adapt : adapt
		};
	})();
	
	adaptUILayout.adapt(640);
	
	$(window).bind( 'orientationchange', function(e){
		adaptUILayout.adapt(640);
		resetWindowTop();
	});
}