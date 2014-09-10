var Oyeah =  (function(){
  var Lottery = function(opt){
  	var Me = arguments.callee;
	if(typeof Me.instance === "object"){
		return Me.instance;
		}
	if(!(this instanceof Me)){
		return new Me(opt);
	   }
	  var d = document;      
	  this.fast = opt.fast || 50;
	  this.slow = opt.slow || 300;
	  this.arr  = periphery(opt.row, opt.col)||periphery(3, 4);
	  this.endCycle = opt.endCycle || 4; // 转第几圈结束
	  this.accelerateCell = opt.accelerateCell||3;// 在第几格加速
      this.triggerBtnId =  opt.triggerBtnId || "";          
      this.tb = opt.containerId&&d.getElementById(opt.containerId).innerHTML===""?Me.buildTable(opt) : d.getElementById(opt.tableId); // 获取table对象 
	  Me.instance = this;	
	    
	  function periphery(m, n) {
				var arr = [];
				for (var i = 0; i < m; i++) {
					arr.push([]);
					for (var j = 0; j < n; j++) {
						arr[i][j] = i * n + j;
					}
				}
				var tempArr = [],a = 0, b = 0, direction = "positive", count = 0;
				while (a >= 0 && a < n && b >= 0 && b < m && count < m * n) {
					count++;
					tempArr.push([b, a]);
					if (direction == "positive") {
						if (a == n - 1)
							b++;
						else
							a++;
						if (a == n - 1 && b == m - 1)
							direction = "negative";
					} else {
						if (a == 0)
							b--;
						else
							a--;
						if (a == 0 && b == 0)
							break;
					}
				}
				return tempArr;
          }
	};
	Lottery.prototype = (function(){
		var d = document,
		      timeId = "",
		      cycle, // 转动圈数
		      flag, // 结束转动标志
		      lottery_index=0,
		      prevIndex = 0,
		      accelerateCell,
		      endIndex;
		 return {
		constructor : Lottery,
		startLottery : function(cfg){
			var me = this;
			if(timeId){clearInterval(timeId);}
			cycle = 0;
			flag = false;		
			accelerateCell = 0;
			endIndex = Math.ceil(Math.random()*(me.arr.length-1)); // 决定在哪一格变慢
			me.hitCallback = cfg.hitCallback;
			if(me.triggerBtnId){d.getElementById(me.triggerBtnId).setAttribute("canClick","0");}
			timeId = setInterval(function(){me.start.call(me,cfg)}, me.slow);
			},
	   start : function(cfg){	   	
				var fn = arguments.callee,
				      brickcn = cfg.brickcn,
				      me = this;				      
	if (flag === false) {
		if (accelerateCell === me.accelerateCell) {
			if(timeId){clearInterval(timeId);}
			timeId = setInterval(function(){fn.call(me,cfg)}, me.fast);
		}

		if (cycle == me.endCycle && lottery_index == parseInt(endIndex)) {
			if(timeId){clearInterval(timeId);} 
			flag = true;
			timeId = setInterval(function(){fn.call(me,cfg)}, me.slow);
		}
	}
	if (lottery_index >= me.arr.length) {				
		cycle++;
		lottery_index = 0;
	}
	if (flag == true && lottery_index == (me.prizeHandler(cfg) ) ) { 
		accelerateCell = 0;
		if(me.triggerBtnId){
			d.getElementById(me.triggerBtnId).setAttribute("canClick","1");
			}
		if(timeId) {clearInterval(timeId);}
		if (me.hitCallback) {
			me.hitCallback.call(null,cfg.data);
		}	
	}
	me.tb.rows[me.arr[lottery_index][0]].cells[me.arr[lottery_index][1]].className = (brickcn||"glow");
	if (lottery_index > 0)
		prevIndex = lottery_index - 1;
	else {
		prevIndex = me.arr.length - 1;
	}
	me.tb.rows[me.arr[prevIndex][0]].cells[me.arr[prevIndex][1]].className = "normal";
	       lottery_index++;
	           accelerateCell ++;
				},
	prizeHandler:function(cfg){
			return  this.getIndex.call(this,cfg);		  					
		},
	getIndex : function (cfg){
		var m = cfg.mapping;
			 if(m){
			 	 if(m.mapKey){
			 	  var t = m.relations[String(cfg.data[m.mapKey])];
			 	  return t;
			 	}
			 else if(m.index){
			 	var len = m.index.length;
			 	      if(len===1){
			 	      	 return m.index[0];
			 	      	}else{
			 	      	var t = m.index[Math.floor(parseInt(len * Math.random()))];
			 	           return t;
			 	      	}
			 	}
			 	 }else {
			 	 	 return Infinity;
			 	 	}	
		       }
		}
		}());
    Lottery.buildTable  = function(opt){
    	 var str = '<style type="text/css">.glow {background:url(img/glow.png) no-repeat 50% 0 transparent;_border:2px solid red;_background-image:none;}</style><table  id="'+String(opt.tableId)+'" cellpadding="0" cellspacing="1" style="position:absolute;"><tbody>',d=document,
    	       rlen=Number(opt.row),clen=Number(opt.col);
    	      for(var i=0;i<rlen;i++){ 
    	          var tr = "<tr>" ;  	      	  
    	      	  for(var k=0;k<clen;k++){
    	      	  	 tr += "<td></td>";
    	      	  	}
    	      	  	tr += "</tr>";
    	      	  	str +=tr;
    	      	}
    	      	str +="</tbody></table>";
    	      	var img =  '<img style="display:block;width:100%;" src="'+opt.imgsrc+'" class="pngfix"/>',container = d.getElementById(opt.containerId);    	   
    	              container.innerHTML = img+str, _table = d.getElementById(String(opt.tableId)),s=_table.style;
    	       function getTableSize(){    	              	 
    	       		box = container.getBoundingClientRect(),   	       		
    	       		w=box.width||(box.right-box.left),
    	       		h=box.height||(box.bottom-box.top);       	    
    	           s.width = w+"px";
    	       	    s.height = h+"px";
    	       	    s.top = 0;s.left=0; 
    	       	    var td_w = w/opt.col,td_h = h/opt.row,td_list = d.getElementsByTagName( "td"),tdNum = td_list.length;
    	       	           for(var i=0;i<tdNum;i++){
    	       	           	td_list[i].style.width = td_w+"px";
    	       	           	td_list[i].style.height = td_h+"px";
    	       	           	}
    	              	}
    	           setTimeout(function(){
    	           	  getTableSize();
    	           	},200);
    	           window.onresize = getTableSize;  
    	           return  _table; 	       	    
    	};
    return Lottery;
	}());
