// JavaScript Document

var maskTop = 1008;
(function($,window , undefined){
	//ADS的命名空间
    if(!window.ADS){window['ADS'] = {}}
	
	//摇一摇
	var shake = {
		speed:10,
		x:0,
		y:0,
		z:0,
		lastX:0,
		lastY:0,
		lastZ:0,
		liTime:0,
		curTime:0,
		init:function(callback){
			
			if(window.DeviceMotionEvent){
				window.addEventListener('devicemotion',function(){
					
					shake.liTime = new Date().getTime();
					
					if(shake.curTime > 10000 && (shake.liTime - shake.curTime) > 480){
						shake.curTime = 0;
	
						if(animation.wipe){
							animation.wipe = false;
							callback();
						}
						
						if(animation.shook){
							callback();
						}
					}
					
					var acceleration =event.accelerationIncludingGravity;
		
					shake.x = acceleration.x;
					
					shake.y = acceleration.y;
					
					if(Math.abs(shake.x-shake.lastX) > shake.speed || Math.abs(shake.y-shake.lastY) > shake.speed) {
						shake.curTime = new Date().getTime();
						shake.liTime = shake.curTime;
					}
			
					shake.lastX = shake.x;
					
					shake.lastY = shake.y;
				},false);
				//callback();
			}else{
				return false;
			}
		}
		
	};
	
    window['ADS']['shake'] = shake;
	
	
	
	
	
	/**
	*动画
	*/
	var animation = {
		wipe:true,
		ben:true,
		bridge:true,
		rain:true,
		shook:false,
		setInt:"",
		setInterOne:"",
		setInterTwo:"",
		setInterThree:"",
		setInter:"",
		x:0,
		y:0,
		i:0,
		iconInit:function(){
			animation.setInt = setInterval(function(){
				if(animation.x >= 6){
					animation.x = 0;
					animation.y = animation.y >= 6 ? 0 : animation.y += 1;
				}
				$(".shake:visible,.shake-white:visible").css("background-position",(-(animation.x) * 121) + "px " + (-(animation.y)*121) + "px");
				$(".touch:visible,.touch-white:visible").css("background-position",(-animation.x * 120) + "px " + (-animation.y*120) + "px");
				$(".swipe:visible,.swipe-white:visible").css("background-position",(-animation.x * 121) + "px " + (-animation.y*120) + "px");
				if($(".animate:visible").size() <=0){
					clearInterval(animation.setInt);
				}
				animation.x++;
			},38);
		},
		maskAnimationOne:function(x,y,end,time,step,callback){
			slightMovement.ismove = false;
			clearInterval(animation.setInterOne);
			var _x_a = _y_a = _i_a = 0;
			animation.setInterOne = setInterval(function(){
				if(_x_a >= x){
					_x_a=0;
					_y_a = _y_a >= y ? 0 : _y_a += 1;
				}
				$("#stage5 .touch1").css("-webkit-mask-position", (-_x_a*640)+"px "+(-_y_a*1008-100)+"px");
				_x_a+=1;
				_i_a++;
				if(_i_a>=end){
					clearInterval(animation.setInterOne);
					callback();
				}
			},time);
		},
		maskAnimationTwo:function(x,y,end,time,step,callback){
			slightMovement.ismove = false;
			clearInterval(animation.setInterTwo);
			var _x_b = _y_b = _i_b = 0;
			animation.setInterTwo = setInterval(function(){
				if(_x_b >= x){
					_x_b=0;
					_y_b = _y_b >= y ? 0 : _y_b += 1;
				}
				$("#stage5 .touch2").css("-webkit-mask-position", (-_x_b*640)+"px "+(-_y_b*1008-100)+"px");
				_x_b+=1;
				_i_b++;
				if(_i_b>=end){
					clearInterval(animation.setInterTwo);
					callback();
				}
			},time);
		},
		maskAnimationThree:function(x,y,end,time,step,callback){
			slightMovement.ismove = false;
			clearInterval(animation.setInterThree);
			var _x_c = _y_c = _i_c = 0;
			animation.setInterThree = setInterval(function(){
				if(_x_c >= x){
					_x_c=0;
					_y_c = _y_c >= y ? 0 : _y_c += 1;
				}
				$("#stage5 .touch3").css("-webkit-mask-position", (-_x_c*640)-20+"px "+(-_y_c*1008-120)+"px");
				_x_c+=1;
				_i_c++;
				if(_i_c>=end){
					clearInterval(animation.setInterThree);
					callback();
				}
			},time);
		},
		maskAnimation:function(x,y,end,time,step,callback){
			slightMovement.ismove = false;
			clearInterval(animation.setInter);
			var _x = _y = _i = 0;
			animation.setInter = setInterval(function(){
				if(_x >= x){
					_x=0;
					_y = _y >= y ? 0 : _y += 1;
				}
				step(_x,_y);
				_x+=1;
				_i++;
				if(_i>=end){
					clearInterval(animation.setInter);
					slightMovement.ismove = true;
					callback();
				}
			},time);
		},
		wipeAnimation:function(){
			
			if(_version.getLeavl()==0){
				slightMovement.initSlightMovement();
			}

			if(animation.shook){
				 burberry.shookCallback();
				 animation.shook = false;
				 return;
			}
			
			//$("#stage1 .tc").fadeOut(1000);
			animation.wipe = false;
			
			var deg = 3;
			var scale = 1;
			
			$("#stage1 .widget-panel").delay(2000).css("z-index","5").fadeIn(2000);
			
			animation.maskAnimation(4,5,20,125,function(x,y){
				$("#stage1 .background").css("-webkit-mask-position", (-x*640)+"px "+(-y*maskTop)+"px");
				scale += 0.005;
				deg -= 0.15;
				$(".an1").css("-webkit-transform","scale("+scale+") rotate("+deg+"deg)");
			},function(){
				$("#stage1 .activity-detail").hide();		

				burberry.isanimate = true;
				if(burberry.isload){
					animation.benAnimation();
				}else{
					$("#loading").fadeIn();	
				}
				burberry.wipeCallback();
				
			});
		},
		benAnimation:function(){
			//第一画
			//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button6410107183&ref');
			
			burberry.isload = false;
			burberry.isanimate = false;
			$("#stage-1-tab").show();
			$("#loading").fadeOut(100);	
			$("#stage1 .control").delay(500).fadeIn(2000,function(){
				animation.iconInit();	
			});
			$("#stage2").css({display:"block",left:"640px"});
			
			$("#stage-1-tab").bind("touchstart",function(e){
				$("#stage1 .control").fadeOut(2000);
				var touch = event.touches[0];
				var _x = touch.pageX - 640;
				var _y = touch.pageY+(-genericTop) - 1150;
				$("#stage2").css({left:0});
				$("#stage-1-tab").hide();
				
				$("#stage2 .widget-panel").delay(2000).fadeIn(2000);
				animation.maskAnimation(4,5,20,150,function(x,y){
					$("#stage2 .background").css("-webkit-mask-position", (-x*1280+_x)+"px "+(-y*2016+_y)+"px");
				},function(){
					
					$("#stage2 .motion,#fog-top").show();
					$("#stage1").hide();
					$("#stage-2-fog").show();

					burberry.isanimate = true;
					if(burberry.isload){
						animation.fogAnimation();
					}else{
						$("#loading-black").fadeIn();
					}
					burberry.benCallback();

				});
			});


		},fogAnimation:function(){
			//第二画
			//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button6410107184&ref');
			
			$("#loading-black").fadeOut(100);
			$("#stage2 .control").delay(500).css("z-index",4).fadeIn(2000,function(){
				animation.iconInit();	
			});
			
			function fog(id,speed){
				this.ele = $("#"+id);
				this.speed = speed;
				this.opacity = 1;
				this.opacityChange = 0.0003;
				this.draw = function(s){
					if(this.opacity <= 0.4){
						$("#stage2 .widget-panel,#stage2 .control").fadeOut(1500);
						this.ele.animate({"opacity":0},1500,function(){
							fogStageCallback();
						});
					}else{
						this.opacity = this.opacity - this.opacityChange*s;
						var left = parseFloat(this.ele.css("left"));
						this.ele.css({"left":left-this.speed,"opacity":this.opacity});
					}
				}
			}
			var fog1 = new fog("fog-top",0.05),
				callbackExec = false,
				lastPoint = null;

			function getPosition(ev){
				if (ev.originalEvent.pageX || ev.originalEvent.pageY) {
					return {
						x: ev.originalEvent.pageX,
						y: ev.originalEvent.pageY
					};
				}
				return {x:ev.originalEvent.changedTouches[0].clientX,y:ev.originalEvent.changedTouches[0].clientY};
			}
			function fogStageCallback(){
				if(!callbackExec){
					callbackExec = true;
					$("#stage3").css({left:"640px",display:"block"}).find(".background").show();
					setTimeout(function(){
						animation.bridgeAnimation();
					},1000);
				}
			}

			$("#stage-2-fog").bind("touchstart",function(ev){
				ev.preventDefault();
			});
			$("#stage-2-fog").bind("touchmove",function(ev){
				ev.preventDefault();
				var point = getPosition(ev);
				if(lastPoint==null){
					lastPoint = point;
				}
				if(!(point.x==lastPoint.x && point.y==lastPoint.y)){
					var x = Math.abs(point.x-lastPoint.x);
					var y = Math.abs(point.y-lastPoint.y);
					var s = Math.sqrt(x*x+y*y);
					fog1.draw(s);
				}
				lastPoint = point;
			});

			$("#stage-2-fog").bind("touchend",function(ev){
				ev.preventDefault();
			});	
		},
		bridgeAnimation:function(){
			//第三画
			//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button6410107185&ref');
			
			
			burberry.isload = false;
			burberry.isanimate = false;
			$("#loading").fadeOut(100);	
			$("#stage3").css({left:"0"});
			
			$("#stage3 .widget-panel").delay(2000).fadeIn(2000);
			animation.maskAnimation(4,5,20,125,function(x,y){
				$("#stage3 .background").css("-webkit-mask-position", (-x*640)+"px "+(-y*1008)+"px");
			},function(){
				$("#stage3 .motion").show();
				$("#stage2").hide();
				burberry.isanimate = true;
				if(burberry.isload){
					animation.rainAnimation();
				}else{
					$("#loading").fadeIn();	
				}
				burberry.bridgeCallback();
			});
			
		},
		rainAnimation:function(){
			burberry.isload = false;
			burberry.isanimate = false;
			$("#loading").fadeOut(100);
			$("#stage2").hide();
			$("#stage3 .control").delay(500).fadeIn(2000,function(){
				animation.iconInit();	
			});
			$("#stage-3-water").show();
			$("#stage-3-water").bind("touchstart",function(ev){
				$("#stage3 .widget-panel,#stage3 .control").fadeOut(2000);
				$("#stage-3-water").hide();
				$("#towter").animate({top:-50},4000);
				slightMovement.ismove = false;
				
				var pre = 0;
				var cur = 0;
				var spirit = setInterval(function(){
					$("#tower-spirit li").eq(pre).fadeOut(100,function(){
						$(this).css("z-index",1);	
					});
					pre = cur = cur >= 6 ? 0 : cur+=1;
					$("#tower-spirit li").eq(cur).css({"z-index":5,display:"block"});
				},200);
				
				$("#stage4").css({left:"640px",display:"block"});
				
				var touch = event.touches[0];
				var water_x = touch.pageX - 740;
				var water_y = touch.pageY+(-genericTop) - 1150;
				
				animation.maskAnimation(4,5,20,200,function(x,y){
					$("#water-mask").css("-webkit-mask-position", (-x*1480+water_x)+"px "+(-y*2016+water_y)+"px");
				},function(){
					$("#stage4").css({left:"0"});
					setTimeout(function(){
						$("#stage4 .widget-panel").delay(2000).fadeIn(2000);
						animation.maskAnimation(4,5,20,125,function(x,y){
							$("#stage4 .background").css("-webkit-mask-position", (-x*640)+"px "+(-y*1008)+"px");
						},function(){
							clearInterval(spirit);
							$("#stage4 .motion").show();
							$("#stage3").hide();
							
							burberry.isanimate = true;
							if(burberry.isload){
								animation.shookAnimation();
							}else{
								$("#loading").fadeIn();	
							}
							burberry.rainCallback();
							$("#stage5").css({"left":"640px",display:"block"});
						});
					},2000);
				});
			});
		},
		shookAnimation:function(){
			//第四画
			//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button6410107186&ref');
			
			
			$("#loading").fadeOut(100);	
			
			$("#stage4 .control").delay(500).fadeIn(2000,function(){
				animation.iconInit();	
			});
			$("#stage5").css({"left":"0"});
			
			setTimeout(function(){
				$("#touch").fadeIn(2000);
			},1000);
			
			
			var n = 0;
			var s = true;
			$("#click-right").bind("touchstart",function(ev){
					n+=1;
					$(this).hide();
					animation.maskAnimationOne(4,3,12,80,function(x,y){
					},function(){
						
					});
					setTimeout(function(){
						if(n>=3 && s){
							s = false;
							animation.touchAnimate();	
						}
					},500);
			});
			$("#click-left").bind("touchstart",function(ev){
					n+=1;
					$(this).hide();
					animation.maskAnimationTwo(4,3,12,80,function(x,y){
					},function(){
						
					});
					setTimeout(function(){
						if(n>=3 && s){
							s = false;
							animation.touchAnimate();	
						}
					},500);
					
			});
			$("#click-center").bind("touchstart",function(ev){
					n+=1;
					$(this).hide();
					animation.maskAnimationThree(4,3,12,80,function(x,y){
					},function(){
					});
					setTimeout(function(){
						if(n>=3 && s){
							s = false;
							animation.touchAnimate();	
						}
					},500);
			});

			
		},touchAnimate:function(){
						
			animation.maskAnimation(4,5,20,125,function(x,y){
				$("#stage5 .background").css("-webkit-mask-position", (-x*640)+"px "+(-y*1008)+"px");
			},function(){
					$("#stage5 .motion").show();
					$("#stage4").hide();
					$(".touch1,.touch2,.touch3").hide();
					$("#stage5 .widget-panel").delay(1000).fadeIn(2000);

					setTimeout(function(){
						animation.award();
					},2000);
			});
		},
		award:function(){
			//第五画
			//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button6410107187&ref');

			slightMovement.ismove = true;
			$("#stage5 .control").fadeIn(2000,function(){
				animation.iconInit();
				slightMovement.ismove = true;
			});
			$("#stage-5-ad").show();
			if(_version.getLeavl()==0){
				animation.shook = true;
			}else{
				$("#stage-5-ad").bind("touchstart",function(ev){
					$("#stage-5-ad").hide();
					burberry.shookCallback();
				});
			}
		},
		getcount:function(day){			
			if(day==0)
			{
			//today message here
			$("#count").html("<img data-src='images/0.png' src='images/0.png' />");
			}
			else if (day >0)
			{
			$("#count").html("<img data-src='images/"+day+".png' src='images/"+day+".png' />");
			}
			else if (day < 0)
			{
			$("#count").html("<img data-src='images/end.png' src='images/end.png' />");
			}			
			
			
		}
	}
	/*
	* 简版
	*/
	var simple = {
		init:function(){
			burberry.isanimate = true;
			//var touch = window.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart";
			var touch = window.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart";
			$('.background').html('').css("-webkit-mask","none");
			$('#stage1 .background,#stage1 .widget-panel').hide();
			$("#stage1 .simple").show();
			$('#stage1 .control2').show();
			$("#fz").attr("data-src","images/txt-step42.png");
			
			var s = true;
			
			var load1 = "<img data-src='images/pic.jpg' /><img data-src='images/pic-iPhone4.jpg' />";
			var load2 = "<img data-src='images/bg2.jpg' /><img data-src='images/bg21.jpg' /><img data-src='images/SWIPE_v06_120x120_BLACK_PNG8.png' />";
			var load3 = "<img data-src='images/tower2.jpg' /><img data-src='images/TAP_v04_120x120_WHITE_PNG8.png' />";
			var load4 = "<img data-src='images/bg4.jpg' /><img data-src='images/pic-iPhone4.jpg' />";
			var load5 = "<img data-src='images/bg5.jpg' /><img data-src='images/SHAKE_v04_120x120_WHITE_PNG8.png' />";
			
			$("#imgLOAD").html(load1);
			$("#stage2 .imgLOAD").html(load2);
			$("#stage3 .imgLOAD").html(load3);
			$("#stage4 .imgLOAD").html(load4);
			$("#stage5 .imgLOAD").html(load5);
			
			simple.loading("#imgLOAD",function(){
				$("#loading-black").fadeOut(300,function(){
					$(this).css("background","none");
					$(this).find('div').attr("class","load2");
				});
			});

			$("#stage1 .activity-detail").bind(touch,function(ev){
				if(s){
					s = false;
					$("#stage1 .background").fadeIn(1000,function(){
						$("#loading").fadeIn(100);
						$("#stage1 .widget-panel").css("z-index",5).fadeIn(1000,function(){
							simple.loading("#stage2",function(){
								$("#loading").fadeOut(100);
								$("#stage1 .control").fadeIn(1000,function(){
									s = true;	
									clearInterval(animation.setInt);
									animation.iconInit();	
								});
								$("#stage2").css({"z-index":-1,display:"block"});
							});
						});
						$("#stage-1-tab").show();
						//第一画
						//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button6410107183&ref');
					});
					//$("#stage1 .tc,#stage1 .copy").fadeOut();
				}
			});
			
			$("#stage-1-tab").bind(touch,function(ev){
				if(s){
					s = false;
					$("#stage2").css({"z-index":3,display:"none"}).fadeIn(1000,function(){
						$("#loading-black").fadeIn(100);
						$("#stage2 .widget-panel").css("z-index",5).fadeIn(1000,function(){
							simple.loading("#stage3",function(){
								$("#loading-black").fadeOut(100);
								$("#stage2 .control").fadeIn(1000,function(){
									s = true;	
									clearInterval(animation.setInt);
									animation.iconInit();	
								});
								$("#stage3").css({"z-index":-1,display:"block"});
							});
						});
						

						$("#stage-2-fog").show();
						//第二画
						//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button6410107184&ref');
					});
				}
			});
			

			$("#stage-2-fog").bind(touch,function(ev){
				if(s){
					s = false;
					$("#stage1").hide();
					$("#stage2 .widget-panel").fadeOut();
					$("#stage2 .control").fadeOut();
					$("#stage2 .background").fadeOut(1000);
					$("#stage2 .simple").fadeIn(1000,function(){
						setTimeout(function(){
						$("#stage3").css({"z-index":4,display:"none"}).fadeIn(1000,function(){
							$("#stage2").hide();
							$("#loading").fadeIn(100);
							$("#stage3 .widget-panel").fadeIn(1000,function(){
								simple.loading("#stage4",function(){
									$("#loading").fadeOut(100);
									$("#stage3 .control").fadeIn(1000,function(){
										s = true;	
										clearInterval(animation.setInt);
										animation.iconInit();	
									});
									$("#stage4").css({"z-index":-1,display:"block"});
								});
							});
							$("#stage-3-tower").show();	
						});
						},2000);
						//第三画
						//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button6410107185&ref');
					});
					
				}
			});
			$("#stage-3-tower").bind(touch,function(ev){
				if(s){
					s = false;
					$("#stage4").css({"z-index":5,display:"none"}).fadeIn(1000,function(){
						$("#stage3").hide();
						$("#loading").fadeIn(100);
						$("#stage4 .widget-panel").fadeIn(1000,function(){
							simple.loading("#stage5",function(){
								$("#loading").fadeOut(100);
								$("#stage4 .control").fadeIn(1000,function(){
									s = true;	
									clearInterval(animation.setInt);
									animation.iconInit();	
								});
								$("#stage5").css({"z-index":-1,display:"block"});
							});
						});
						$("#stage4").show();	
						//第四画
						trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button6410107186&ref');
					});
					
				}
			});
			$("#stage4").bind(touch,function(ev){
				if(s){
					s = false;
					$("#stage5").css({"z-index":6,display:"none"}).fadeIn(1000,function(){
						$("#stage4").hide();
						$("#stage5 .widget-panel").fadeIn(1000);	
						$("#stage5 .control").css('z-index',45).fadeIn(1000,function(){
							s = true;
							clearInterval(animation.setInt);
							animation.iconInit();	
						});	
						$("#stage-5-ad").show();	
						//第五画
						//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button6410107187&ref');
					});
				}
			});
			$("#stage-5-ad").bind(touch,function(ev){
				if(s){
					s = false;
					burberry.shookCallback();
				}
			});
		},
		loading:function(obj,callback){
			var size = $(obj).find("img").size();
			var n=0;
			$(obj).find("img").each(function(){
				
				var img = new Image();
				img.src = $(this).attr("data-src");
				$(this).attr("src",img.src);
				img.onload  = function(){
					n+=1;
					if(n>=size){
						n=0;
						callback();
					}
				}
				img.onerror = function(){
					n+=1;
					if(n>=size){
						n=0;
						callback();
					}
				}
			});
			
		}
	}
	
	/*
	* Tracking
	*/
	var trckingCode = {
		init:function(code){
			$.getScript(code);
		}
	}
	/*
	*验证
	*/
	var validate = {
		isName:false,
		isPhone:false,
		isEmail:false,
		isAgree:false,
		init:function(){
			$("#submit").click(function(){
				$(window).scrollTop(0);
				var name = $("#name").val();
				var sex = $("#sex").val();
				var phone = $("#phone").val();
				var email = $("#email").val();
				var agree = $("#agree").attr('val');
				var pass = true;
				$("#name").parent("p").attr("class","name");
				$("#phone").parent("p").attr("class","phone");
				$("#email").parent("p").attr("class","mail");
				$("#agree").removeClass("error");
				
				if(sex == "0"){
					$("#select").addClass("error");
					pass = false;
					//性别错误检测
					//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button64101071815&ref');
				}else{
					$("#select").addClass("pass");
				}
				
				if(name == null || name == "" || name.length <= 0){
					$("#name").parent("p").addClass("error");
					pass = false;
					//姓名错误检测
					//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button64101071812&ref');
				}else{
					$("#name").parent("p").addClass("pass");
				}
				
				var myPhone = /^(?:13\d|14\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;
		   
				if(!myPhone.test(phone))
				{
					$("#phone").parent("p").addClass("error");
					pass = false;
					//手机错误检测
					//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button64101071813&ref');
				}else{
					$("#phone").parent("p").addClass("pass");
				}
				
				var myEmail = /^[-._A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;  
				if (!myEmail.test(email)){
					$("#email").parent("p").addClass("error");
					pass = false;
					//邮箱错误检测
					//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button64101071814&ref');
				}else{
					$("#email").parent("p").addClass("pass");
				}
				
				
				if (agree == "0"){
					$("#agree").addClass("error");
					pass = false;
				}
				
				
				if(pass){
					$("#loading").addClass("loadbg").show();
					$("#tip p").fadeOut(300);
					burberry.saveDate(name,phone,sex,email);
				}else{
					validate.pointError("请完成必填栏位");
					
				}
			});
			$("#sex").change(function(){
				if($(this).val()==0){
					validate.pointError("请完成必填栏位");
					//性别错误检测
					//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button64101071815&ref');
				}else{
					validate.hideError();	
				}
				$(window).scrollTop(0);
			});
			
			$("#name").focus(function(){
				$(this).parent("p").removeClass('error');
				$(this).parent("p").removeClass('pass');
			}).blur(function(){
				var name = $(this).val();
				if(name == null || name == "" || name.length <= 0){
					$(this).parent("p").addClass("error");
					validate.pointError("请完成必填栏位");
					//姓名错误检测
					//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button64101071812&ref');
				}else{
					$(this).parent("p").addClass("pass");
					validate.hideError();
				}
				$(window).scrollTop(0);
			});

			$("#phone").focus(function(){
				$(this).parent("p").removeClass('error');
				$(this).parent("p").removeClass('pass');
			}).blur(function(){
				var myPhone = /^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;
		   		var phone = $(this).val();
				if(!myPhone.test(phone))
				{
					$(this).parent("p").addClass("error");
					validate.pointError("请完成必填栏位");
					//手机错误检测
					//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button64101071813&ref');
				}else{
					$(this).parent("p").addClass("pass");
					validate.hideError();
				}
				$(window).scrollTop(0);
			});
			
			$("#email").focus(function(){
				$(this).parent("p").removeClass('error');
				$(this).parent("p").removeClass('pass');
			}).blur(function(){
				var myEmail = /^[-._A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;  
				var email = $(this).val();
				if (!myEmail.test(email)){
					$(this).parent("p").addClass("error");
					validate.pointError("请完成必填栏位");
					//邮箱错误检测
					//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button64101071814&ref');
				}else{
					$(this).parent("p").addClass("pass");
					validate.hideError();
				}
				$(window).scrollTop(0);
			});
			$("#agree").click(function(){
				if($(this).attr('val')==1){
					validate.hideError();
				}
			});
			
			$("#button").click(function(){
				$(window).scrollTop(0);
				$("#pop").fadeIn(600);
			});
		},
		pointError:function(txt){
			$("#tip p").html(txt).fadeIn(300);
		},
		hideError:function(){
			if($('.error').size() <= 0){
				$("#tip p").fadeOut(100);
			}
		}
	};
	
	window["ADS"]['validate'] = validate;
	
	/**
	*开始
	*/
	var burberry = {
		position:true,
		countdown:10,
		leavl:2,
		isanimate:false,
		isload:false,
		win:{},
		init:function(){
			//加载结束检测
			//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button6410107181&ref');
			/*
			 *获取倒计时 Gets the countdown
			 *@return day
			 */
			 
			burberry.countdown = _API.countDown();
			
			if(burberry.countdown < 0){
				burberry.position = false;
			}else{
				//请求接口 判断是国内还是国外
				burberry.position = _API.getPosition();
			}
			
			animation.getcount(burberry.countdown);
			
			validate.init();
			
			animation.iconInit();

			if(burberry.position){
				$('.yes').show();
			}else{
				$('.non').show();
			}
			switch(_version.getLeavl()){
				
				case 0:
				//支持摇一摇
				$("#loading-black").delay(500).fadeOut(300,function(){
					$(this).css("background","none");
					$(this).find('div').attr("class","load2");
				});
				
				//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button64101071810&ref');
				$('.is-shake').show();
				shake.init(animation.wipeAnimation);
				break;	
				
				case 1:
				//不支持摇一摇
				$("#loading-black").delay(500).fadeOut(300,function(){
					$(this).css("background","none");
					$(this).find('div').attr("class","load2");
				});
				
				//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button64101071810&ref');
				$('.no-shake').show();
				var isstart = true;
				$("#stage1 .background").bind("touchstart",function(){
					if(isstart){
						isstart = false;
						animation.wipeAnimation();
					}
				});
				break;
				
				case 2:
				//简版
				//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button6410107189&ref');
				$('.no-shake').show();
				simple.init();
				break;
				
				default:
				//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button64101071811&ref');
				$("#view-potrait").remove();
				$("#main,#view-potrait").remove();
				$("#nonsupport").show().html("<img src='images/nonsupport.jpg' />");
				//设备不支持
				break;
				
			}

		},
		wipeCallback:function(){
			burberry.loading(2,animation.benAnimation);
		},
		benCallback:function(){
			burberry.loading(3,animation.fogAnimation);
		},
		bridgeCallback:function(){
			burberry.loading(4,animation.rainAnimation);
		},
		rainCallback:function(){
			burberry.loading(5,animation.shookAnimation);
		},
		shookCallback:function(){
			$("#stage5 .control").hide();
			$("#loading").fadeIn(100);
			//国内
			if(burberry.position){
				/*
				 *获取是否中奖 Gets whether winning
				 *@return code 0  yes
						  code 1  no
				 */
				
				burberry.win = _API.getLottery();
				
				//没中奖
				if(burberry.win.item == "0"){
					//没中奖检测
					//trckingCode.init('http://t.l.qq.com/ping?t=m&cpid=641010718&url=http%3A//app_minisite_click_monitor/button6410107188&ref');
					burberry.loading(10,function(){
						$("#loading").stop().fadeOut(100);
						$("#stage10").fadeIn(2000);
						$("#stage5 .control,#stage5 .widget-panel,#stage-5-ad").hide();
					});
				//中奖了
				}else if(burberry.win.item == "1"){
					burberry.loading(7,function(){
						$("#loading").stop().fadeOut(100);
						$("html,body").height('1008px');

						$("#stage7").fadeIn(1500,function(){
							$("#stage7 h2").fadeIn(1000);
						});
						setTimeout(function(){
							$(".form-info").fadeIn(2000);
						},4000);
						$("#stage5 .control,#stage5 .widget-panel,#stage-5-ad").hide();
					});
				}
				
			}else{//国外
				burberry.loading(6,function(){
					$("#loading").stop().fadeOut(100);
					$("#stage5 .control,#stage5 .widget-panel,#stage-5-ad").hide();
					$("#stage6").fadeIn(2000);
				});
			}
			
			
		},
		loading:function(num,callback){
			var size = $("#stage"+num).find("img").size();
			var n=0;
			$("#stage"+num).find("img").each(function(){
				var img = new Image();
				img.src = $(this).attr("data-src");
				$(this).attr("src",img.src);
				img.onload  = function(){
					n+=1;
					if(n>=size){
						n=0;
						burberry.isload = true;
						if(burberry.isanimate){
							callback();
						}
					}
				}
				img.onerror = function(){
					n+=1;
					if(n>=size){
						n=0;
						burberry.isload = true;
						if(burberry.isanimate){
							callback();
						}
					}
				}
			});
		},
		saveDate:function(name,mobile,sex,email){
			/*
			 *保存获奖信息 Save the prize information
			 *@return code 0 success
					  code 1 Mobile phone number repetition
					  code 2 Data format is not correct
					  code 3 Token is not correct
					  message 提示信息
			 */
			 
			var msg = _API.saveProfile(name,mobile,sex,email,burberry.win.token);
			
			switch(msg.code){
				case 0:
				//保存成功
				
				burberry.loading(8,function(){
					$("#loading").removeClass("loadbg").stop().fadeOut(100);
					$("#stage7").hide();
					$("#user").html(name);
					$("#stage8").fadeIn(1000);
				});
				break;

				default:
				$("#loading").fadeOut(100);
				$("#tip p").html(msg.message).fadeIn(300);
				setTimeout(function(){
					validate.hideError();
				},3000);
				break;
			}
		}
	}
	
	window['ADS']['burberry'] = burberry;
	
	/*
	*版本,支持程度检测
	*/
	var _version = {
		getLeavl:function(){
			
			if(window.navigator.msPointerEnabled){
				return 2;
			}
			if(window.DeviceMotionEvent && "ontouchend" in document && _version.supports("Animation") && _version.supports("Mask")){
				return 0;
			}else if("ontouchend" in document && _version.supports("Animation") && _version.supports("Mask")){
				return 1;
			}else if(("ontouchend" in document)){
				return 2;
			}else{
				return 3;
			}
		},
		supports:function(prop){
			var div = document.createElement('div'), 
			
			vendors = 'Khtml O Moz Webkit'.split(' '), 
			
			len = vendors.length; 
			
			if ( prop in div.style ) return true; 
			
			if ('-ms-' + prop in div.style) return true; 
			
			prop = prop.replace(/^[a-z]/, function(val) { 
			
				return val.toUpperCase(); 
			}); 
			
			while(len--) { 
				if ( vendors[len] + prop in div.style ) { 
					return true; 
				} 
			} 
			
			return false; 
		}
	}
	
	//左右移动slightMovement.ismove
	var slightMovement = {
		ismove:false,
		initSlightMovement:function(){
			var h = window.screen.width > window.screen.height ? window.screen.width : window.screen.height;
			if (window.DeviceMotionEvent && ! navigator.userAgent.match(/Android/i) && h >= 568) { 
				slightMovement.addEvent(window,"devicemotion",slightMovement.deviceMotionHandler);
			}
		},
		addEvent:function(obj,type,fn){
			if(obj.attachEvent){
				obj['e' + type +fn] = fn;
				obj[type+fn] = function(){
					obj['e' + type + fn](window.event);
				}
				obj.attachEvent("on" + type,obj[type+fn]);
			}else{
				obj.addEventListener(type,fn,false);
			}
		},
		removeEvent:function(obj,type,fn){
			if ( obj.detachEvent ) { 
				obj.detachEvent( 'on'+type, obj[type+fn] ); 
				obj[type+fn] = null; 
			  } else {
				obj.removeEventListener( type, fn, false ); 
			  }
				
		},
		deviceMotionHandler:function(eventData){
			if(slightMovement.ismove){
				 var acceleration = eventData.accelerationIncludingGravity; 
				 var facingUp = -1; 
				 if (acceleration.z > 0) { 
					facingUp = +1; 
				 }      
				 var LR = Math.round(((acceleration.x) / 9.81) * -180); 

				 if(navigator.userAgent.match(/Android/i)){
					 if(LR < -20 ){
						 LR = LR < -40 ? -40 : LR;
						$(".motion:visible").stop().animate({"left":-40},600);
					 }else if(LR > 20 ){
						  LR = LR > 40 ? 40 : LR;
						$(".motion:visible").stop().animate({"left":40},600);
					 }else{
						$(".motion:visible").stop().animate({"left":0},600);
					 }
				}else{
					 if(LR < -10 ){
						 LR = LR < -40 ? -40 : LR;
						$(".motion:visible").stop().animate({"left":-LR},300);
					 }else if(LR > 15 ){
						  LR = LR > 40 ? 40 : LR;
						$(".motion:visible").stop().animate({"left":-LR},300);
					 }else{
						$(".motion:visible").stop().animate({"left":-LR},300);
					 }
				}
			}else{
				$(".motion:visible").stop();
			}
		}
	};
	
	
})(jQuery,window);

var genericTop = 0;
var isWindowOrt = true;//原先是ture
var isIntroLoad = true;
var windowHeight = window.screen.height > window.screen.width ? window.screen.height : window.screen.width;
if(window.devicePixelRatio){
	windowHeight*=window.devicePixelRatio;
}

function resetWindowTop(n){
	var height = window.screen.height;
	if(window.devicePixelRatio){
		height*=window.devicePixelRatio;
	}
	var wor = window.orientation || 0;
	if($(window).height() != 640 && $(window).height() != 1280 && wor==0 && isWindowOrt){
		isWindowOrt = false;
		var _height = $(window).height();
		var top = -(1008 - _height) /2+20;
		if(top < -130){
			top = -130;	
		}
		if(_height>900){
			top = 0;	
		}
		
		genericTop =top;
		if(n!=1){
			$("#stage2 .background,#stage3 .background,#stage4 .background,#stage2 .simple").css("top",top);
		}
		
		$("html").removeClass("iphone4");
		maskTop = 1008;
		$("#introMask").attr("data-src","images/Intro.png");
		/*if(_height < 920){
			$("html").addClass("iphone4");
			$("#stage7").removeClass("iphone5");
			maskTop = 1008;
			$("#introMask").attr("data-src","images/Intro.png");//Intro-iPhone4.png
		}*/
		
		if(isIntroLoad){
			isIntroLoad = false;
			var num = 0;
			$("#introLoad img").each(function(){
					var img = new Image();
					img.src = $(this).attr("data-src");
					$(this).attr("src",img.src);
					img.onload  = function(){
						num+=1;
						if(num>=3){
							ADS.burberry.init();
						}
					}
					img.onerror = function(){
						num+=1;
						if(num>=size){
							ADS.burberry.init();
						}
					}
			});	
		}
	}
}
$(function(){
	if(navigator.userAgent.indexOf('Firefox') > 0 || window.navigator.msPointerEnabled){
		resetWindowTop(1);	
	}else{
		resetWindowTop();	
	}
});
