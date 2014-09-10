<?php
	function passport_encrypt($txt){
		return _passport_encrypt($txt . '$$$' . time());
	}
	function passport_decrypt($txt){
		$str = _passport_decrypt($txt);
		$arr =  explode('$$$',$str);
		return $arr[0];
	}
	function _passport_encrypt($txt) { 
		$key = 'dfsy74yt9fayp34htoayw98rth4oeuto8p4e';
		
		srand((double)microtime() * 1000000); 
		$encrypt_key = md5(rand(0, 32000)); 
		$ctr = 0; 
		$tmp = ''; 
		for($i = 0;$i < strlen($txt); $i++) { 
			$ctr = $ctr == strlen($encrypt_key) ? 0 : $ctr; 
			$tmp .= $encrypt_key[$ctr].($txt[$i] ^ $encrypt_key[$ctr++]); 
		} 
		return base64_encode(passport_key($tmp, $key));
	}

	function _passport_decrypt($txt) { 
		$key = 'dfsy74yt9fayp34htoayw98rth4oeuto8p4e';
		$txt = passport_key(base64_decode($txt), $key); 
		$tmp = ''; 
		for($i = 0;$i < strlen($txt); $i++) { 
			$md5 = $txt[$i]; 
			$tmp .= $txt[++$i] ^ $md5; 
		} 
		return $tmp; 
	} 

	function passport_key($txt, $encrypt_key) { 
		$encrypt_key = md5($encrypt_key); 
		$ctr = 0; 
		$tmp = ''; 
		for($i = 0; $i < strlen($txt); $i++) { 
			$ctr = $ctr == strlen($encrypt_key) ? 0 : $ctr; 
			$tmp .= $txt[$i] ^ $encrypt_key[$ctr++]; 
		} 
		return $tmp; 
	} 
	class Qixi extends CI_Controller{
		function __construct()
	    {
	        parent::__construct();
	    }
	    function init(){
	    	//设置抽奖次数
			date_default_timezone_set('PRC');
			$cur_date = date("Y-m-d");
			$date = $this->getCookie('qixi_date');
			if(!isset($date))
			{
				$this->setCookied('qixi_date',$cur_date);
				$this->setCookied('qixi_count',3);
			}
			else if($date != $cur_date)
			{
				$this->setCookied('qixi_date',$cur_date);
				$this->setCookied('qixi_count',3);
			}else{}
	    }
	    function lottery(){
	    	$para['zid'] = 3;
	        $this->load->library('Lottery_Engine',$para);
    		$count = $this->getCookie('qixi_count');
    		switch ($count) {
    			case 3:
    				$gid = 5;//group id
		    		$res = $this->lottery_engine->lottery_by_group_nocode($gid);
		    		$rt['output']['lottery'] = 1;//判断是否可以抽奖 1:能，0:不能
		    		$rt['output']['count'] = 1;//判断第几抽奖
		    		$rt['output']['status'] = 1;
		    		$rt['output']['prize_name'] = $res['prize_name'];
		    		$this->subChance();
    				break;
    			case 2:
    				$gid = 6;//group id
		    		$res = $this->lottery_engine->lottery_by_group_nocode($gid);
		    		$rt['output']['lottery'] = 1;
		    		$rt['output']['count'] = 2;
		    		$rt['output']['status'] = 1;
		    		$rt['output']['prize_name'] = $res['prize_name'];
		    		$this->subChance();
    				break;
    			case 1:
    				$gid = 7;//group id
		    		$res = $this->lottery_engine->lottery_by_group_nocode($gid);
		    		$rt['output']['lottery'] = 1;
		    		$rt['output']['count'] = 3;
		    		if($res['status'] === 0 || $res['status'] === 1)//未中奖或奖品没有
		    		{
		    			$rt['output']['status'] = 0;
		    		}
		    		else{
		    			$rt['output']['status'] = 1;
		    			$rt['output']['prize_name'] = $res['prize_name'];
		    			$rt['output']['pid'] = $res['pid'];
		    			$rt['output']['prize_key'] = $res['prize_key'];
		    		}
		    		$this->subChance();
    				break;
    			case 0:
    				$rt['output']['lottery'] = 0;//不能抽奖
    				break;
    			default:
    				$gid = 7;//group id
		    		$res = $this->lottery_engine->lottery_by_group_nocode($gid);
		    		$rt['output']['lottery'] = 1;
		    		$rt['output']['count'] = 3;
		    		if($res['status'] === 0 || $res['status'] === 1)//未中奖或奖品没有
		    		{
		    			$rt['output']['status'] = 0;
		    		}
		    		else{
		    			$rt['output']['status'] = 1;
		    			$rt['output']['prize_name'] = $res['prize_name'];
		    			$rt['output']['pid'] = $res['pid'];
		    			$rt['output']['prize_key'] = $res['prize_key'];
		    		}
		    		$this->subChance();
    				break;
    		}
            $this->load->view('json',$rt);
	    }
	    function save_user(){
	    	//preg_match("/^[a-z\d]*$/i",$ccode)
	        $para['zid'] = 3;
	        $this->load->library('Lottery_Engine',$para);
	        $arr['pid'] = $_GET['pid'];
	        $arr['phone'] = $_GET['phone'];
	        $arr['prize_key'] = $_GET['prize_key'];
	        $res['output'] = $this->lottery_engine->save_user($arr);
	        $this->load->view('json',$res['output']);
	    }
	    function sendMsg(){
	        $para['zid'] = 3;
	        $this->load->library('Lottery_Engine',$para);
	       	$smsContent = "10月1日前凭此短信至【西堤牛排】消费178元套餐享9折特惠，且当桌每人赠送鸡尾酒一支。优惠不同享，每条短信每桌限用一次，转发无效。";
	       	$phone = $_GET['phone'];
	       	$vcode = $_GET['vcode'];
	       	$codeInput = $_GET['code'];
	        $res = $this->lottery_engine->sendSms($smsContent, $phone, $vcode, $codeInput);
            echo json_encode($res);
	    }
	    function subChance(){
	    	//抽奖次数减1
	    	$count = (int)$this->getCookie('qixi_count');
	    	$this->setCookied('qixi_count',$count-1);//抽奖次数-1
	    }
		function addChance(){
			$weibo = $this->getCookie('qixi_weibo');
			if(isset($weibo))
			{
				$rt['output']['status'] = 1;//已经关注过
			}
			else{
				$this->setCookied('qixi_weibo',1);//抽奖次数+3
				$count = (int)$this->getCookie('qixi_count');
				if(isset($count)){
					$this->setCookied('qixi_count',$count+3);//抽奖次数+3
				}
				else{
					$this->setCookied('qixi_count',6);
				}
				$rt['output']['status'] = 0;
			}
			$this->load->view('json',$rt);
		}
		private function getCookie($name){
			if(isset($_COOKIE[$name])){
				return passport_decrypt($_COOKIE[$name]);
			}else{
				return null;
			}
		}
		private function setCookied($name, $value){
			setcookie($name, passport_encrypt($value), time()+3600, "/");
		}
	}
?>

