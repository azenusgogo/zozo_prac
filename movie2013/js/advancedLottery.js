(function($) {
	$.fn.Caesar = function(options) {
		var defaults = {
			index : 0, // 当前亮区位置
			prevIndex : 0, // 前一位置
			Speed : 300, // 初始速度
			Time : "", // 定义对象
			m : 3, // 行数
			n : 4, // 列数
			arr : [],
			EndIndex : 4, // 决定在哪一格变慢
			cycle : 0, // 转动圈数
			EndCycle : 5, // 计算圈数
			flag : false, // 结束转动标志
			quick : 0, // 加速
			btn : document.getElementById("rush_ticket")

		};
		var opts = $.extend({}, defaults, options);
		var caesar = {
			getSide : function(m, n) {

				var arr = [];
				for (var i = 0; i < m; i++) {
					arr.push([]);
					for (var j = 0; j < n; j++) {
						arr[i][j] = i * n + j;
					}
				}
				
				var resultArr = [];
				var tempX = 0, tempY = 0, direction = "Along", count = 0;
				while (tempX >= 0 && tempX < n && tempY >= 0 && tempY < m
						&& count < m * n) {
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
			},
			Star : function() {
				
				var that = this;
				var arr= this.getSide(opts.m,opts.n);
				if (that.flag == false) {
					
					if (that.quick == 4) {
						clearInterval(that.Time);
						that.Speed = 50;
						that.Time = setInterval(that.Star, that.Speed);
					}
		
					if (that.cycle == that.EndCycle + 1
							&& that.index == parseInt(that.EndIndex)) {
						clearInterval(that.Time);
						that.Speed = 300;
						that.flag = true; 
						that.Time = setInterval(that.Star, that.Speed);
					}
				}
				if (that.index >= arr.length) {
					that.index = 0;
					that.cycle++;
				}
				if (that.flag == true && that.index == Math.floor(Math.random() * 10) - 1) {// parseInt(Trim('6'))
					that.quick = 0;
					clearInterval(that.Time);
				}
				that.tb.rows[arr[that.index][0]].cells[arr[that.index][1]].className = "glow";
				if (that.index > 0)
					that.prevIndex = that.index - 1;
				else {
					that.prevIndex = arr.length - 1;
				}
				that.tb.rows[arr[that.prevIndex][0]].cells[arr[that.prevIndex][1]].className = "playnormal";
				that.index++;
				that.quick++;
			},
			startLottery : function(opts,me) {
				var that = this;
				for (var p in opts) { // opts 绑定到 caesar
					this[p] = opts[p];
				};
				that["tb"] = me[0];				
				that.Time = setInterval(that.Star, that.Speed);
				
			}
		};
		
		caesar.startLottery(opts,$(this));
			
	}
})(jQuery);