var Brickmove =  (function(){
  var Lottery = function(opt){
  	var Me = arguments.callee;
	if(typeof Me.instance === "object"){
		return Me.instance;
		}
	if(!(this instanceof Me)){
		return new Me(opt);
	   }
	  var d = document,locked=false;      
	  this.fast = opt.fast || 50;
	  this.slow = opt.slow || 300;
	  this.arr  = periphery(opt.row, opt.col)||periphery(3, 4);
	  this.endCycle = opt.endCycle >0? opt.endCycle : 4; 
	  this.accelerateCell = (opt.accelerateCell&&opt.accelerateCell>0&&opt.accelerateCell<this.arr.length)?opt.accelerateCell:3;// 在第几格加速         
      this.tb = (opt.containerId&&d.getElementById(opt.containerId).innerHTML===""?Me.buildTable(opt) : d.getElementById(opt.tableId) )|| d.getElementById(opt.tableId); // 获取table对象 
      this.isLocked = function(){return locked;};
      this.enLock = function(state){locked = state;};
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
							direction = "negative"
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
		      timeId,
		      cycle, 
		      flag, 
		      lottery_index=0,
		      prevIndex = 0,
		      accelerateCell,
		      endIndex,
		      dropNagtive =function(arr,nativeArr){
		      	var nlen = nativeArr.length;
		      	 if(Object.prototype.toString.call(arr).slice(8,-1)==="Array"){
		      	 	 for(var i=0;i<arr.length;i++){
		      	 	 	 if(arr[i]<0||arr[i]>nlen){
		      	 	 	 	 arr.splice(i,1);
		      	 	 	 	}
		      	 	 	}
		      	 	 	return arr;
		      	 	}
		      	};	      
		 return {
		constructor : Lottery,
		startLottery : function(cfg){
			var me = this;
			if(timeId){clearInterval(timeId);}
			cycle = 0;
			flag = false;	
			me.enLock(true); 
			accelerateCell = 0;
			endIndex = Math.ceil(Math.random()*(me.arr.length-1)); 
			me.hitCallback = cfg.hitCallback;
			timeId = setInterval(function(){me.start.call(me,cfg)}, me.slow);
			},
	   start : function(cfg){	   	
				var fn = arguments.callee,
				      brickcn = cfg.brickcn,
				      me = this;				      
	if (!flag) {
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
	me.tb.rows[me.arr[lottery_index][0]].cells[me.arr[lottery_index][1]].className = (brickcn||"glow");		
	if (lottery_index > 0)
		prevIndex = lottery_index - 1;
	else {
		prevIndex = me.arr.length - 1;
	}
	me.tb.rows[me.arr[prevIndex][0]].cells[me.arr[prevIndex][1]].className = "normal";	
	if (flag == true && lottery_index == (me.prizeHandler(cfg) ) ) { 
		accelerateCell = 0;
		me.enLock(false);
		if(timeId) {clearInterval(timeId);}
		if (me.hitCallback) {
			me.hitCallback.call(null,cfg.data);
		}	
	}
	lottery_index++;
    accelerateCell++;       	           
				},
	prizeHandler:function(cfg){
			return  this.getIndex.call(this,cfg);		  					
		},
	getIndex : function (cfg){
		var m = cfg.mapping,me=this;		      
			 if(m&&Object.prototype.toString.call(m).slice(8,-1) ==="Object"){			 	 
					 if(m.mapKey&&m.relations){
					 	  var t = m.relations[String(cfg.data[m.mapKey])];
					 	  return t;
					 	}else if(m.index&&Object.prototype.toString.call(m.index).slice(8,-1)==="Array"){			    
					 	 var newarr = dropNagtive.call(null,m.index,me.arr),len = newarr.length;			 	      
					 	      if(len===1){
					 	      	 return newarr[0];
					 	      	}else if(len>1){
					 	      	var t = newarr[Math.floor(parseInt(len * Math.random()))];
					 	           return t;
					 	      	}else{
					 	      		return Infinity;
					 	      	}
						 	}else {
						 	 	 return Infinity;
					 	 	}
			 	 }else {
			 	 	 return Infinity;
			 	 }	
		       }
		}
		}())
    Lottery.buildTable  = function(opt){
    	 var str = '<table  id="'+String(opt.tableId||"")+'" cellpadding="0" cellspacing="1" style="position:absolute;"><tbody>',d=document,
    	       rlen=Number(opt.row),clen=Number(opt.col),isIE6 = /msie 6/i.test(navigator.userAgent);
    	      for(var i=0;i<rlen;i++){ 
    	          var tr = "<tr>" ;  	      	  
    	      	  for(var k=0;k<clen;k++){
    	      	  	 tr += "<td></td>";
    	      	  	}
    	      	  	tr += "</tr>";
    	      	  	str +=tr;
    	      	}
    	      	str +='</tbody></table><style type="text/css">.glow {background:url(img/glow.png) no-repeat 50% 50% transparent;background-size:100% 100%;_border:2px solid red;_background-image:none;}</style>';
    	      	var pngfix = "",imgarr=opt.imgsrc,imgurl="",ie6imgsrc="";
    	      	for(var k=0;k<imgarr.length;k++){
   	      	
    	      		if(imgarr[k].indexOf("png")>-1){
    	      			imgurl = imgarr[k];
    	      		}
    	      		if(imgarr[k].indexOf("gif")>-1){
    	      			ie6imgsrc = imgarr[k];
    	      		}
    	      	}
    	      	
    	      	if(isIE6 && ie6imgsrc===""){ 
    	      		pngfix = "pngfix";
    	      		}
    	      	if(isIE6 && ie6imgsrc!==""){
    	      		imgurl = ie6imgsrc;
    	      		}
    	      	var img =  '<img style="display:block;width:100%;" src="'+imgurl+'" class="'+pngfix+'"/>',container = d.getElementById(opt.containerId);    	  //class="'+pngfix+'" 
    	              container.innerHTML =str+img;container.style.position = "relative";
    	              var _table = d.getElementById(String(opt.tableId||""))|| container.children[0];
    	       function getTableSize(){    	              	 
    	       		box = container.getBoundingClientRect(),   	       		
    	       		w=box.width||(box.right-box.left),
    	       		h=box.height||(box.bottom-box.top); 
    	       		_table.style.cssText = "width:"+w+"px;height:"+h+"px;top:0;left:0;position:absolute;" ;     	    
    	       	    var td_w = w/opt.col,td_h = h/opt.row,td_list = _table.getElementsByTagName( "td"),tdNum = td_list.length;
    	       	           for(var i=0;i<tdNum;i++){
    	       	           	td_list[i].style.cssText = "width:"+td_w+"px;height:"+td_h+"px;";
    	       	           	}
    	              	}
    	           setTimeout(function(){
    	           	  getTableSize();
    	           	},100);
    	           window.onresize = getTableSize;  
    	           return  _table; 	       	    
    	};
    return Lottery;
	}())
