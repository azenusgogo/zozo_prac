/*
@author   zuonan(baidu HI:azenusgogo)
@date:    2013-7-20
@info:    轮播图
@relay:   依赖 jquery
传入参数：
	width:总宽度
	height:总高度
	li_width:li宽度
	left_bt:左移按钮
	right_bt:右移按钮
	step:一次移动几个图片
	time:动画时间
	ani:是否加动画效果
	auto:是否自动执行动画
*/
(function($){
	$.fn.vslide = function(options){
		var defaults = {
			width:$(this).width(),
			height:$(this).find("li").eq(0).height(),
			li_width:$(this).find("li").eq(0).width(),
            box:".outer",
			left_bt:"",
			right_bt:"",
			step:1,
			time:1000,
			ani:true,
			auto:false
		};
		var options = $.extend(defaults, options);
		this.each(function(){
			jQuery.extend( jQuery.easing,{
				bt: function (x, t, b, c, d) {return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;}
			});
            var width = $(this).width();
            var height = $(this).height();
            var li_width =$(this).find("li").eq(0).width();
			var ul=$(this).find("ul"),
				ul_width=li_width*$(this).find("li").length,
				ani=options.ani?"bt":"",
				left=0;
			ul.css({width:ul_width,marginLeft:0});
			var doAni=function(d,target){
				if(target.is(":animated")){return;}
				d=d||'left';
				if(d=='left'){
					if(left == 0){left = width-ul_width;}
					else{left=left+options.step*li_width<0?left+options.step*li_width:0;}
				}
				else{
					if(left == width-ul_width){left = 0;}
					else{left=left-options.step*li_width>width-ul_width?left-options.step*li_width:width-ul_width;}
				}
				target.animate({marginLeft:left},options.time,ani);
			};
			if(options.left_bt){
				$(options.box).find("#"+options.left_bt).click(function(){doAni('left',$(this).parent(options.box).find("ul"));});
			}
			if(options.right_bt){
				$(options.box).find("#"+options.right_bt).click(function(){doAni('right',$(this).parent(options.box).find("ul"));});
			}
			if(options.auto){var t=setInterval(function(){
	             doAni("left",ul);
	            },5000);
			//clearInterval(t);
			}
			
		});
	};
})(jQuery);

