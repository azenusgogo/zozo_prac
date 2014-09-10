var Oyeah =  (function(){
  var Lottery = function(opt){
  	var Me = arguments.callee;
	if(typeof Me.instance === "object"){
		return Me.instance;
		}
	if(!(this instanceof Me)){
		return new Me(opt);
	   }
	var  tb = document.getElementById(opt.tableId||"tb"); // 获取table对象           
	  this.lottery_index = opt.lottery_index || 0;
	  this.prevIndex = opt.prevIndex || 0;
	  this.speed = opt.speed || 300; 
	  this.arr  = getSide(opt.row, opt.col)||getSide(3, 4);
	  this.endIndex = opt.endIndex || 5; // 决定在哪一格变慢
	  this.cycle = opt.cycle || 0; // 转动圈数
	  this.endCycle = opt.endCycle || 5; // 转第几圈结束
	  this.flag  = false;   // 结束转动标志
	  this.accelerateCell = 0;// 在第几格加速
	  this.lock = opt.lock || false;
	  this.timeId = "";
	  this.mapping = opt.mapping;
	  this.hitCallback = opt.hitCallback ;
	  this.missCallback = opt.missCallback ;
	  Me.instance = this;	  
	  function getSide(m, n) {
				var arr = [];
				for (var i = 0; i < m; i++) {
					arr.push([]);
					for (var j = 0; j < n; j++) {
						arr[i][j] = i * n + j;
					}
				}
				var tempArr = [];
				var tempX = 0, tempY = 0, direction = "Along", count = 0;
				while (tempX >= 0 && tempX < n && tempY >= 0 && tempY < m && count < m * n) {
					count++;
					tempArr.push([tempY, tempX]);
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
				return tempArr;
          }
	};
	Lottery.prototype = {
		constructor : Lottery,
		startLottery : function(data){
			var me = this;
			me.lock = true;
			if(me.timeId){clearInterval(me.timeId);}
			me.cycle = 0;
			me.flag = false;
			me.accelerateCell = 0;
			// endCycle=Math.floor(Math.random()*4);
			me.timeId = setInterval(function(){me.start.call(me,data)}, me.speed);
			},
	   start : function(args){	   	
				var fn = arguments.callee,
				      data = args,
				      me = this;				      
	if (me.flag === false) {
		if ( 4 == me.accelerateCell) {
			if(me.timeId){clearInterval(me.timeId);}
			me.speed = 50;
			me.timeId = setInterval(function(){fn.call(me,data)}, me.speed);
		}

		if (me.cycle == me.endCycle && me.lottery_index == parseInt(me.endIndex)) {
			if(me.timeId){clearInterval(me.timeId);}
			me.speed = 300;
			me.flag = true; 
			me.timeId = setInterval(function(){fn.call(me,data)}, me.speed);
		}
	}
	if (me.lottery_index >= me.arr.length) {		
		me.lottery_index = 0;
		me.cycle++;
	}
	if (me.flag == true && me.lottery_index == (me.prizeHandler(data) ) ) { 
		me.accelerateCell = 0;
		if(me.timeId) {clearInterval(me.timeId);}
		me.lock = false;
		if (me.hitCallback) {
			me.hitCallback.call(null,data);
		}
		 if (me.missCallback) {
		   me.missCallback.call(null,data); //没中奖
		}		
	}
	tb.rows[me.arr[me.lottery_index][0]].cells[me.arr[me.lottery_index][1]].style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACHCAYAAACYjfLZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5MjA0MTFGQzJDMjA2ODExODIyQTkyMzlERUZFRDg2NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NTI0Q0NGNDcwNkUxMUUzOEFEOUY3MzI1QzVCRkEwOSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NTI0Q0NGMzcwNkUxMUUzOEFEOUY3MzI1QzVCRkEwOSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0E3Q0ZGOTIzMzIwNjgxMTgyMkE5MjM5REVGRUQ4NjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTIwNDExRkMyQzIwNjgxMTgyMkE5MjM5REVGRUQ4NjYiLz4gPC9yZGY6RGVzY3Jp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) no-repeat 50% 0 transparent";
	if (me.lottery_index > 0)
		me.prevIndex = me.lottery_index - 1;
	else {
		me.prevIndex = me.arr.length - 1;
	}
	tb.rows[me.arr[me.prevIndex][0]].cells[me.arr[me.prevIndex][1]].style.background = "none";
	me.lottery_index++;
	me.accelerateCell++;
				},
	prizeHandler:function(data){
		if(this.hitCallback){
			return this.getPrizeIndex.call(this,data);
			}
		if(this.missCallback){
			return this.missPrizeIndex.call(this,data);
			}
		},
	getPrizeIndex : function (data){
		var m = this.mapping;
		if(m){
			 if(m.mapKey){
			 	  var t = m.relations[String(data[m.mapKey])];
			 	  return t
			 	}
			 else{
			 	var len = m.index.length;
			 	      if(len===1){
			 	      	 return m.index[0];
			 	      	}else{
			 	      	var t = m.index[Math.floor(parseInt(len * Math.random()))];
			 	           return t
			 	      	}
			 	}
			}
	
		       },
    missPrizeIndex : function(data){
    	var m = this.mapping;
    	      if(m){
    	      	   var len = m.index.length;    	 
		    	      	    if(len===1){
					 	      	 return m.index[0];
					 	      	}else{
							 	      	var t = m.index[Math.floor(parseInt(len * Math.random()))];
							 	      	 console.log(t);
							 	         return t
			 	      	        }
					 	     
    	      	 }
    	       } 
		}
    return Lottery;
	}())
