/*
@author   zuonan(baidu HI:azenusgogo)
@date:    2013-7-22
@info:    水平切换控件
@relay:   依赖 jquery
传入参数：
    playTime:间隔时间
    duration:延迟时间
    direction:滑动方向
    easing:自动播放时 easing 方式
    clickEasing: 点击时 easing 方式
    size:图片的数量
    time:动画时间
    ani:是否加动画效果
    isPlay:是否自动执行动画
*/
(function($) {	
	$.fn.UISlide = function(options) {
		var defaults = {
			playTime : 2000, 
			duration : 800, 
			direction : 'left', 
			easing : 'easeInOutQuad', 
			clickEasing : 'easeOutCubic' 
		};
		var opts = $.extend({}, defaults, options); // 参数扩展
		var slide = {
			// 播放调用及一些变量的初始化
			play : function(opts, me) {
				var that = this, isPlay;
				that.me = me;
				that.picList = me.find('.prizeList');
				that.oNum = $(".slide_num")//me.find('dl');
				that.lis = that.picList.find('li'); 
				that.size = that.lis.length; 
				that.lisWidth = that.lis.width();
				that.isPlay = isPlay; 
				for (var p in opts) { // opts 绑定到 slide
					that[p] = opts[p];
				}
				that.setNums().setTitle();;
				if (that.size > 1) { 
                   that.slideEvent();
                }
			},
			// 设置按钮
			setNums : function() {
				var that = this, links, // 图片的链接
				me = that.me, size = that.size, oNum = that.oNum; // 按钮对象			
				that.slideNum = oNum.find("li");
				that.numWidth = "245"; // 数字按钮宽度
				that.setTitle();
				return that;
			},
           
		    // 设置标题
            setTitle : function() {
                var that = this;
                that.oNum.width(980); // 设置数字按钮宽度that.numWidth + 2
                that.picList.width((that.lisWidth) * that.size); // 设置滑动容器总宽度
                that.slideNum.first().addClass('active');
                return that;
            },
			// 绑定数字按钮事件
			slideEvent : function() {
				var that = this, slideNum = that.slideNum;
				slideNum.on("click",function() {
					var thisNum = $(this).index();
					that.picList.stop().animate({
								"margin-left" : 0 - thisNum
										* (that.lisWidth)// ddddd
							}, {
								duration : that.duration,
								easing : that.clickEasing
							});					                            

				});				
              
				return that;
			}
		};
		return this.each(function() { // $(a,b) 方式调用
					slide.play(opts, $(this));
				});
	}
})(jQuery);