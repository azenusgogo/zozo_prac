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
	class Movie extends CI_Controller{
		function get_cinema_info(){
			$cinema['output'] = array();
			$city = urldecode($_GET['city']);
			$this->load->model("movie_model");
			$cinema['output'] = $this->movie_model->get_cinema_info($city);
			$this->load->view('json',$cinema);
		}
		function get_wap_cinema_info(){
			//获取10元参数
			date_default_timezone_set('PRC');
			$hour = (int)date("H");
			$acttime = time();
			$key="acttime=".$acttime.'&actid=1001baidumapmovie201306';
			$actsign = md5($key);
			$url = "&acttime=".$acttime."&actsign=".$actsign."&actid=1001";
			$cinema['output'] = array();
			$city = urldecode($_GET['city']);
			$this->load->model("movie_model");
			$rs = $this->movie_model->get_cinema_info($city);
			$n = count($rs);
			for($i=0;$i<$n;$i++)
			{
				$rs[$i]->href = $url;
			}
			$cinema['output'] =$rs;
			$this->load->view('json',$cinema);
		}
		function get_cinema_detail(){
			$detail['output'] = array();
			$lonlat = $_GET['lonlat'];
			$this->load->model("movie_model");
			$rs = $this->movie_model->get_cinema_detail($lonlat);
			//获取10元url参数
			date_default_timezone_set('PRC');
			$hour = (int)date("H");
			$acttime = time();
			$key="acttime=".$acttime.'&actid=1001baidumapmovie201306';
			$actsign = md5($key);
			$rs[0]->href = $rs[0]->href."&acttime=".$acttime."&actsign=".$actsign."&actid=1001";
			$detail['output'] = $rs;
			$this->load->view('json',$detail);
		}
		function getTenPara(){
			date_default_timezone_set('PRC');
			$url['output'] = array();
			$acttime = time();
			$key="acttime=".$acttime.'&actid=1001baidumapmovie201306';
			$actsign = md5($key);
			$result = "&acttime=".$acttime."&actsign=".$actsign."&actid=1001";
			$url['output']['result'] = $result;
			$this->load->view('json',$url);
		}
		function md5test(){
			date_default_timezone_set('PRC');
			$url['output'] = array();
			$acttime = time();
			$key="acttime=".$acttime.'&actid=1001baidumapmovie201306';
			$actsign = md5($key);
			$result = "&acttime=".$acttime."&actsign=".$actsign."&actid=1001";
			$url['output']['value'] = $key;
			$url['output']['result'] = $result;
			$this->load->view('json',$url);
		}
		function get_count(){
			$this->load->model("movie_model");
			$rs = $this->movie_model->get_count();
			var_dump($rs);
		}
		function getTime(){
			date_default_timezone_set('PRC');
			$time = date("H:i:s");
			$hour = (int)date("H");
			$date = date("w");//获取星期几
			var_dump($date);
		}
		function init(){
			//设置抽奖次数
			date_default_timezone_set('PRC');
			$cur_date = date("Y-m-d");
			$date = $this->getCookie('movie_date');
			if(!isset($date))
			{
				$this->setCookied('movie_date',$cur_date);
				$this->setCookied('movie_count',5);
			}
			else if($date != $cur_date)
			{
				$this->setCookied('movie_date',$cur_date);
				$this->setCookied('movie_count',5);
			}else{}
			//获取每日减10元个数
			$init['output'] = array();
			$date = "date".date("w");//获取日期
			$this->load->model("movie_model");
			$rs = $this->movie_model->get_total($date);
			$init['output']['total'] = $rs;
			//是否可以抽奖
			date_default_timezone_set('PRC');
			$hour = (int)date("H");
			if(($hour >=11 && $hour< 17) || ($hour >=20 && $hour<23))
			{
				$init['output']['time'] = 0;
			}
			else{
				$init['output']['time'] = 1;//未到抽奖时间
			}
			$this->load->view('json',$init);
		}
		function setCount(){
			date_default_timezone_set('PRC');
			$cur_date = date("Y-m-d");
			$date = $this->getCookie('movie_date');
			if(!isset($date))
			{
				$this->setCookied('movie_date',$cur_date);
				$this->setCookied('movie_count',5);
			}
			else if($date != $cur_date)
			{
				$this->setCookied('movie_date',$cur_date);
				$this->setCookied('movie_count',5);
			}
			else{}
		}
		function lottery(){
			$lottery['output'] = array();
			//开始抽奖
			$count = $this->getCookie('movie_count');
			if($count == 0)
			{
				$lottery['output']['count'] = 0;//抽奖次数用完
			}
			else{
				$lottery['output']['count'] = 1;//可以抽奖
				$this->setCookied('movie_count',$count-1);//抽奖次数-1
				//获取当日中奖个数
				$this->load->model("movie_model");
				$count = $this->movie_model->get_count();
				//抽奖
				date_default_timezone_set('PRC');
				$hour = (int)date("H");
				$this->load->model("movie_model");
				$rs = $this->movie_model->get_rate();
				$rate = (float)$rs[0]->rate;//获取中奖率
				$ran = rand(1,10000);
				$max = round($rate * 10000);
				if($hour >=11 && $hour< 17)
				{
					if($count < 60)
					{
						if($ran < $max)//中奖
						{
							date_default_timezone_set('PRC');
							$acttime = time();
							$key="acttime=".$acttime.'&actid=1002baidumapmovie201306';
							$actsign = md5($key);
							//获取mtoken
							$url = 'http://map.baidu.com/detail?qt=movie&act=getmtoken&actid=1002&actsign='.$actsign.'&acttime='.$acttime.'';
							$rs = file_get_contents($url);
							$arr = json_decode($rs,true);
							$errorNo = $arr['errorNo'];
							if(!$errorNo)//mtoken
							{
								$mtoken = $arr['mtoken'];
								//存入mtoken
								$info = array();
								$time = date('Y-m-d');
								$hour = date('H:i:s');
								$info['mtoken'] = $mtoken;
								$info['time'] = $time;
								$info['hour'] = $hour;
								$this->load->model("movie_model");
								$this->movie_model->insert_info($info);
								//返回url
								$result = "&mtoken=".$mtoken."&acttime=".$acttime."&actsign=".$actsign."&actid=1002";
								$lottery['output']['code'] = 1;//中奖
								$lottery['output']['url'] = $result;//中奖
							}
							else
							{
								$lottery['output']['code'] = 0;//未中奖
							}
						}
						else{
							$lottery['output']['code'] = 0;//未中奖
						}
					}
					else{
						$lottery['output']['code'] = 0;//超过60个
					}
				}
				else{
					if($ran < $max)//中奖
					{
						date_default_timezone_set('PRC');
						$acttime = time();
						$key="acttime=".$acttime.'&actid=1002baidumapmovie201306';
						$actsign = md5($key);
						//获取mtoken
						$url = 'http://map.baidu.com/detail?qt=movie&act=getmtoken&actid=1002&actsign='.$actsign.'&acttime='.$acttime.'';
						$rs = file_get_contents($url);
						$arr = json_decode($rs,true);
						$errorNo = $arr['errorNo'];
						if(!$errorNo)//mtoken
						{
							$mtoken = $arr['mtoken'];
							//存入mtoken
							$info = array();
							$time = date('Y-m-d');
							$hour = date('H:i:s');
							$info['mtoken'] = $mtoken;
							$info['time'] = $time;
							$info['hour'] = $hour;
							$this->load->model("movie_model");
							$this->movie_model->insert_info($info);
							//返回url
							$result = "&mtoken=".$mtoken."&acttime=".$acttime."&actsign=".$actsign."&actid=1002";
							$lottery['output']['code'] = 1;//中奖
							$lottery['output']['url'] = $result;//中奖
						}
						else
						{
							$lottery['output']['code'] = 0;//未中奖
						}
					}
					else{
						$lottery['output']['code'] = 0;//未中奖
					}
				}
			}
			$this->load->view('json',$lottery);
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

