// JavaScript Document
(function($,window , undefined){
	//API的命名空间
    if(!window._API){window['_API'] = {}}

	/*
	 *获取是否中国 Gets whether Chinese
	 *@return code 0  yes
	 		  code 1  no
	 */
	function getPosition(){
		var position = {"code":0};
		if( position.code == "0"){
			return true;
		}
		return false;
	}
	
	window['_API']['getPosition'] = getPosition;
	
	
	/*
	 *获取是否中奖 Gets whether winning
	 *@return code 0  yes
	 		  code 1  no
	 */
	function getLottery(){
		var lottery = qqmenu.lottery();
		
		return lottery;
	}
	
	window['_API']['getLottery'] = getLottery;
	
	
	/*
	 *保存获奖信息 Save the prize information
	 *@return code 0 success
	          code 1 Mobile phone number repetition
			  code 2 Data format is not correct
			  code 3 Token is not correct
			  message 提示信息
	 */
	function saveProfile(name,mobile,sex,email,token){
		return qqmenu.saveProfile(name,mobile,sex,email,token);
	}
	
	window['_API']['saveProfile'] = saveProfile;
	

	/*
	 *获取倒计时 Gets the countdown
	 *@return day
	 */
	function countDown(){
		return {"num":100};
	}
	
	window["_API"]['countDown'] = countDown;

})(jQuery,window);