<?php
	class Movie extends CI_Controller{
		private $zid = 3;//七夕专题ID=3
		function __construct()
	    {
	        parent::__construct();

	    }
		function getIp(){ 
			if (getenv("HTTP_CLIENT_IP") && strcasecmp(getenv("HTTP_CLIENT_IP"), "unknown")) 
			{
				$ip = getenv("HTTP_CLIENT_IP");
			} 
			else if (getenv("HTTP_X_FORWARDED_FOR") && strcasecmp(getenv("HTTP_X_FORWARDED_FOR"), "unknown")) 
			{
				$ip = getenv("HTTP_X_FORWARDED_FOR"); 
			}
			else if (getenv("REMOTE_ADDR") && strcasecmp(getenv("REMOTE_ADDR"), "unknown")) 
			{
				$ip = getenv("REMOTE_ADDR"); 
			}
			else if (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown")) 
			{
				$ip = $_SERVER['REMOTE_ADDR']; 
			}
			else 
			{
				$ip = "unknown"; 
			}
			return $ip;
		} 
		function init(){
			date_default_timezone_set('PRC');
			$this->load->model("movie_model");
			$cur_date = date("Y-m-d");
			$ip = $this->getIp();
			if($ip != 'unknown')
			{
				$rs = $this->movie_model->get_info_by_ip($ip);
				if($rs)//已经存在ip
				{
					if($cur_date === $rs[0]->date)
					{
						$rt['output']['count'] = (int)$rs[0]->count;
					}
					else{
						$update_count_arr['date'] = $cur_date;
						$update_count_arr['count'] = 3;
						$this->movie_model->update_count_by_date($ip,$update_count_arr);
						$rt['output']['count'] = 3;
					}
				}
				else{
					$init_count_arr['ip'] = $ip;
					$init_count_arr['date'] = $cur_date;
					$init_count_arr['count'] = 3;
					$init_count_arr['weibo'] = 0;
					$this->movie_model->init_count($init_count_arr);
					$rt['output']['count'] = 3;
				}
			}
			else{
				$rt['output']['error'] = 'unknown';
			}
			$this->load->view('json',$rt);
		}
		function addChance(){
			date_default_timezone_set('PRC');
			$this->load->model("movie_model");
			$cur_date = date("Y-m-d");
			$ip = $this->getIp();
			if($ip != 'unknown')
			{
				$rs = $this->movie_model->get_info_by_ip($ip);
				if($rs)
				{
					if((int)$rs[0]->weibo === 0 )//未关注
					{
						$update_count_arr['count'] = (int)$rs[0]->count + 3;
						$update_count_arr['weibo'] = 1;
						$this->movie_model->update_count_by_date($ip,$update_count_arr);
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
					$this->movie_model->init_count($init_count_arr);
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

