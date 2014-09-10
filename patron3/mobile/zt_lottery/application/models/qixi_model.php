<?php
	class Qixi_model extends CI_Model{
		function __construct(){
			parent::__construct();
			$this->load->database();
		}
		//新增服务器端控制抽奖次数
		function get_info_by_ip($ip){
			$this->db->where("ip",$ip);
			$this->db->select('*');
			$query = $this->db->get('qixi_ip_info');
			$arr = $query->result();
			if($arr)
			{
				return $arr;
			}
			else{
				return false;
			}
		}
		function update_count_by_date($ip,$update_count_arr){
			$this->db->where("ip",$ip);
			$this->db->update("qixi_ip_info",$update_count_arr);
		}
		function init_count($init_count_arr)
		{
			$this->db->insert("qixi_ip_info",$init_count_arr);
		}
	}
?>