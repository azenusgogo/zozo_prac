$(function(){
        		function getPlatform (){
            		var sys = {
                   		 ios:false,
                   		android:false
                   	},ua = navigator.userAgent.toLowerCase();
            		sys.ios = ua.indexOf("iphone")>-1;
            		sys.android = ua.indexOf("android")>-1;
            		return sys;       		
            	} 
        		function popupUpdate(){    
              	    var getClientSize = function(){
              	        if(document.compatMode === "CSS1Compat"){
              	            return {
              	                width:document.documentElement.clientWidth,
              	                height:document.documentElement.clientHeight
              	            };
              	        }else{
              	            return {
              	                width:document.body.clientWidth,
              	                height:document.body.clientHeight
              	            };
              	        }
              	    }; 
              	  
              	  $("#popup_wrap").css({position:"absolute",top:Math.abs(getClientSize().height-338)/2+"px",left:(getClientSize().width-270)/2+"px"});
                  }
                	
                	if(getPlatform().ios){
                		addStat(main_ios_pv);
                	}if(getPlatform().android){
                		addStat(main_android_pv);
                	}
                	$("#j_to_survey").on("click",function(){
                		addStat(start_lottery);;//抽奖点击量
                		$.ajaxJSONP({
                			url:GLOBAL_URL+"/zt_lottery/index.php/laoyonghu3/lottery?callback=?",
                			success:function(re){
                				if(re.count ===1){
                					$("#pop_mask").show();
                        			$("#popup_cnt").html("很抱歉 您已经参与过抽奖了<br/>感谢您对百度地图的支持！").closest("#popup_wrap").show();
                        			return false;
                				}
                				if(re.total ===0){
                					$("#pop_mask").show();
                        			$("#popup_cnt").html("很抱歉 奖品已经送完了<br/>感谢您对百度地图的支持！").closest("#popup_wrap").show();
                        			return false;
                				}
                				if(re.status===0){
                					$("#prize_name").val("");
                					$("#pop_mask").show();
                        			$("#popup_cnt").html("很遗憾 您没有中奖<br/>感谢您对百度地图的支持！").closest("#popup_wrap").show();               			
                				}
                				if(re.status===1){
                					 var bingo = "<p class='popup_info'>恭喜你！获得<span style='color:#4876cf;'>"+re.prize_name+"</span> 请填写以下个人信息，方便我们将代金券发送到您的手机</p>"+                   
        		                      "<p><label>手机号<input type='tel' value='' id='cellphone'/></label></p>"+
        		                      "<p><label>验证码<input type='text' value='' id='vcode'/></label></p>"+
        		                      "<p><img src='@' id='vcode_img'/><a id='vague'>看不清？</a></p>";
        		                     
                				     var   getVcode = function(){
        				        				        
        							                      $.ajaxJSONP({
                				                 			  url:"http://map.baidu.com/maps/services/captcha?cb=?",         			        	        				
                			        	        		      success:function(data){
                			        	        					if(data.result.error===0){                			        	        						
                			        	        						$("#vcode_img").attr("src","http://map.baidu.com/maps/services/captcha/image?vcode="+data.content.vcode);
                			        	        						$("#auth_code").val(data.content.vcode);//生成码
                			        	             				$("#vague").on("click",function(){
                			        	           				    	var that = $(this);
                			        	           				    	 $.ajaxJSONP({
                			        	   		                 			  url:"http://map.baidu.com/maps/services/captcha?cb=?",     			        	        				
                			        	   	        	        		      success:function(da){
                			        	   	        	        					if(da.result.error===0){	        	        						
                			        	   	        	        						that.prev().attr("src","http://map.baidu.com/maps/services/captcha/image?vcode="+da.content.vcode);
                			        	   	        	        						$("#vcode").val("");
                			        	   	        	        						$("#auth_code").val(da.content.vcode);
                			        	   	        	        					}
                			        	   	        	        				}
                			        	   	        	        			});	  
                			        	           				    });
                			        	        				   }
                			        	        				}
                			        	        			}); 	  
                				                      };
                				                    				                    				                        
        	        	        						$("#pop_mask").show();
        	        	             				    $("#popup_cnt").html(bingo).closest("#popup_wrap").show().find("#close_btn").hide();
        	        	             				    getVcode();
        					        				    $("#prize_name").val(re.prize_name);       				   					        				    
        					        				    addStat(win_prize_user);
                				    
                				}
                				
                			}
                		});
                		popupUpdate();
                	});//提交那妞逻辑end
                	$("#close_btn").on("click",function(){
                		$("#pop_mask").hide();
                		$(this).closest("#popup_wrap").hide();
                	});
                	$("#confirmed").on("click",function(){
                		var prize_name = $("#prize_name").val();
                		     
                		if(prize_name!=""){
                			var  prize_name =$("#prize_name").val(),
               		             vcode = $("#vcode").val(),//用户填写的验证码
               		             auth_code =  $("#auth_code").val(),//生成码
               		             tel = $("#cellphone").val();        			
                			if(tel==""){
                				prompt("亲~请填写您的手机号");
                				return;
                			}
                			if(!(/^[1][3-8]\d{9}$/.test(tel))){
                				alert("亲~请填写合法的手机号！");
                				return;
                			}
                			if(vcode==""){
                				prompt("亲~请填写验证码");
                				return;
                			}
                			if(vcode.length!=4){
                				prompt("亲~请填写4位验证码");
                				return;
                			}
                			$.ajaxJSONP({
                				url:GLOBAL_URL+"/zt_lottery/index.php/laoyonghu3/sendMsg?callback=?&prize_name="+prize_name+"&auth_code="+auth_code+"&phone="+tel+"&vcode="+vcode,
                				success:function(data){
                					if(data.error===0){
                						$("#prize_name").val("");
                						alert("提交成功!");
                						$("#pop_mask").hide();
                		        		$("#popup_wrap").hide();
                					}else{
                						if(data.error_no===2){
                							alert(data.error_msg);
                	        				return;
                						}if(data.error_no===3){
                							alert(data.error_msg);
                	        				return;
                						}
                					}
                				}
                			});
                		}else{
                			$(this).next().trigger("click");
                		}
               		
                	});
                	
                	$(window).on("resize",function(){
              		  popupUpdate();
              	    });
        	});