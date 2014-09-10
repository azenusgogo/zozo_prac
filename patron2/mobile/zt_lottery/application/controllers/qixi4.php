<?php
	class Qixi extends CI_Controller{
		function __construct()
	    {
	        parent::__construct();

	    }
	    function showIp1(){
	    	if ($HTTP_SERVER_VARS["HTTP_X_FORWARDED_FOR"]) 
			{ 
			$ip = $HTTP_SERVER_VARS["HTTP_X_FORWARDED_FOR"]; 
			} 
			elseif ($HTTP_SERVER_VARS["HTTP_CLIENT_IP"]) 
			{ 
			$ip = $HTTP_SERVER_VARS["HTTP_CLIENT_IP"]; 
			}
			elseif ($HTTP_SERVER_VARS["REMOTE_ADDR"]) 
			{ 
			$ip = $HTTP_SERVER_VARS["REMOTE_ADDR"]; 
			} 
			elseif (getenv("HTTP_X_FORWARDED_FOR")) 
			{ 
			$ip = getenv("HTTP_X_FORWARDED_FOR"); 
			} 
			elseif (getenv("HTTP_CLIENT_IP")) 
			{ 
			$ip = getenv("HTTP_CLIENT_IP"); 
			} 
			elseif (getenv("REMOTE_ADDR"))
			{ 
			$ip = getenv("REMOTE_ADDR"); 
			} 
			else 
			{ 
			$ip = "Unknown"; 
			}
			echo $ip;
	    }
	    function showIp(){
	    	if (getenv("HTTP_X_FORWARDED_FOR")){
			$ip = getenv("HTTP_X_FORWARDED_FOR");
			}
			elseif (getenv("HTTP_CLIENT_IP")){
			$ip = getenv("HTTP_CLIENT_IP");
			}
			elseif (getenv("REMOTE_ADDR")){
			$ip = getenv("REMOTE_ADDR");
			}
			else{
			$ip = "Unknown";
			}
			$arr = explode(",", $ip);
			echo $arr[0].'+'.$ip;
	    }
	    function getIp(){
	    	if (getenv("HTTP_X_FORWARDED_FOR")){
			$ip = getenv("HTTP_X_FORWARDED_FOR");
			}
			elseif (getenv("HTTP_CLIENT_IP")){
			$ip = getenv("HTTP_CLIENT_IP");
			}
			elseif (getenv("REMOTE_ADDR")){
			$ip = getenv("REMOTE_ADDR");
			}
			else{
			$ip = "Unknown";
			}
			$arr = explode(",", $ip);
			return $arr[0];
		} 
		function init(){
			date_default_timezone_set('PRC');
			$this->load->model("qixi_model");
			$cur_date = date("Y-m-d");
			$ip = $this->getIp();
			if($ip != 'unknown')
			{
				$rs = $this->qixi_model->get_info_by_ip($ip);
				if($rs)//已经存在ip
				{
					if($cur_date === $rs[0]->date)
					{
						$rt['count'] = (int)$rs[0]->count;
					}
					else{
						$update_count_arr['date'] = $cur_date;
						$update_count_arr['count'] = 3;
						$this->qixi_model->update_count_by_date($ip,$update_count_arr);
						$rt['count'] = 3;
					}
				}
				else{
					$init_count_arr['ip'] = $ip;
					$init_count_arr['date'] = $cur_date;
					$init_count_arr['count'] = 3;
					$init_count_arr['weibo'] = 0;
					$this->qixi_model->init_count($init_count_arr);
					$rt['count'] = 3;
				}
			}
			else{
				$rt['error'] = 'unknown';
			}
			return $rt;
		}
	    function lottery(){
	    	$para['zid'] = 3;
	        $this->load->library('Lottery_Engine',$para);
	    	$arr = $this->init();
	    	if($arr['count'] === 3)//第一次抽奖
	    	{
	    		$gid = 5;//group id
	    		$res = $this->lottery_engine->lottery_by_group_nocode($gid);
	    		$rt['output']['lottery'] = 1;//判断是否可以抽奖 1:能，0:不能
	    		$rt['output']['count'] = 1;//判断第几抽奖
	    		$rt['output']['status'] = 1;
	    		$rt['output']['prize_name'] = $res['prize_name'];
	    		$this->subChance();
	    	}
	    	else if($arr['count'] === 2)
	    	{
	    		$gid = 6;//group id
	    		$res = $this->lottery_engine->lottery_by_group_nocode($gid);
	    		$rt['output']['lottery'] = 1;
	    		$rt['output']['count'] = 2;
	    		$rt['output']['status'] = 1;
	    		$rt['output']['prize_name'] = $res['prize_name'];
	    		$this->subChance();
	    	}
	    	else if($arr['count'] === 0 )
	    	{
	    		$rt['output']['lottery'] = 0;//不能抽奖
	    	}
	    	else{
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
	    	}
            $cinema['output'] = $rt;
            $this->load->view('json',$cinema['output']);
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
	    	$ip = $this->getIp(); 
	    	$this->load->model("qixi_model");
	        $rs = $this->qixi_model->get_info_by_ip($ip);
	    	$update_count_arr['count'] = (int)$rs[0]->count - 1;
			$this->qixi_model->update_count_by_date($ip,$update_count_arr);
	    }
		function addChance(){
			date_default_timezone_set('PRC');
			$this->load->model("qixi_model");
			$cur_date = date("Y-m-d");
			$ip = $this->getIp();
			if($ip != 'unknown')
			{
				$rs = $this->qixi_model->get_info_by_ip($ip);
				if($rs)
				{
					if((int)$rs[0]->weibo === 0 )//未关注
					{
						$update_count_arr['count'] = (int)$rs[0]->count + 3;
						$update_count_arr['weibo'] = 1;
						$this->qixi_model->update_count_by_date($ip,$update_count_arr);
						$rt['output']['status'] = 0;//关注成功
					}
					else{
						$rt['output']['status'] = 1;//已经关注过
					}
				}
				else{//备用方案，防止初始化失败
					$init_count_arr['ip'] = $ip;
					$init_count_arr['date'] = $cur_date;
					$init_count_arr['count'] = 6;
					$init_count_arr['weibo'] = 1;
					$this->qixi_model->init_count($init_count_arr);
					$rt['output']['status'] = 0;
				}
			}
			else{
				$rt['output']['error'] = 'unknown';
			}
			$this->load->view('json',$rt);
		}
	}
?>

