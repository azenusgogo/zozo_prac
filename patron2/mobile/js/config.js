
/**
 * @fileoverview 专题配置文件
 * @create-date 2013-04-20
 * @author v_zuonan
 */

/*code统计*/



	var main_ios_pv = 300100,//首页ios平台pv
	    main_android_pv = 300101,//首页安卓平台pv        
        invest_ios_pv = 300102,//调研页ios平台pv
        invest_android_pv = 300103,//调研页安卓平台pv
        start_survey      = 300104,//参与调研点击量
        start_lottery     = 300105,//抽奖点击量
        win_prize_user    = 300106,//中奖用户量
	    GLOBAL_URL = "http://map.baidu.com/zt/";
	
	
    
function addStat(code, opts){
  if (!code){
    return;
  }
  // 组装参数
  opts = opts || {};
  var extq = "";
  for (var i in opts){
    extq = extq + "&" + i + "=" + encodeURIComponent(opts[i]);
  }
  // 内部函数定义 - 发送统计请求
  var sendStat = function(q){
    if (!q){
      return;
    }
    addStat._sending = true;
    setTimeout(function(){$("#statImg").attr('src',"http://map.baidu.com/img/transparent.gif?newmap=1" + q.src)}, 50);
  }
  // 内部函数定义 - 发送队列中下一个统计请求
  var reqNext = function (){
    var nq = addStat._reqQueue.shift()
    if (nq){
      sendStat(nq);
    }
  }
  var ts = (Math.random() * 100000000).toFixed(0);
  if (addStat._sending){
    // 将本次请求加入队列
    addStat._reqQueue.push({src: "&code=" + code + extq+"&t=" + ts});
  }
  else{
    // 直接发送请求
    sendStat({src: "&code=" + code + extq + "&t=" + ts});
  }
  // 绑定事件
  if (!addStat._binded){
    $("#statImg").on("load", function(){
      addStat._sending = false;
      reqNext();
    });
    $("#statImg").on("error", function(){
      addStat._sending = false;
      reqNext();
    });
    addStat._binded = true;
  }
}

// 初始化请求队列
addStat._reqQueue = [];