<?php
	class Movie_model extends CI_Model{
		function __construct(){
			parent::__construct();
			$this->load->database();
		}
		function get_cinema_detail($lonlat)
		{
			$this->db->where("lonlat",$lonlat);
			$this->db->select('*');
			$query = $this->db->get('movie_cinema_info');
			$arr = $query->result();
			return $arr;
		}
		function get_cinema_info($city){
			$this->db->where("city",$city);
			$this->db->select('*');
			$query = $this->db->get('movie_cinema_info');
			$arr = $query->result();
			$n = count($arr);
			//$name = iconv("GBK", "UTF-8", $arr[0]->name);
			//$arr[0]->name = mb_convert_encoding($arr[0]->name, "GBK", "UTF-8");
			//$arr[0]->address = mb_convert_encoding($arr[0]->address, "GBK", "UTF-8");
			//$arr[0]->city = mb_convert_encoding($arr[0]->city, "GBK", "UTF-8");
			/*
			for($i=0;$i<$n;$i++)
			{
				$arr[$i]->name = mb_convert_encoding($arr[$i]->name, "GBK", "UTF-8");
				$arr[$i]->address = mb_convert_encoding($arr[$i]->address, "GBK", "UTF-8");
				$arr[$i]->city = mb_convert_encoding($arr[$i]->city, "GBK", "UTF-8");
			}
			*/
			return $arr;
		}
		function insert_info($arr)
		{
			$this->db->insert("movie_info",$arr);
		}
		function get_count(){//获取当日中奖个数
			date_default_timezone_set('PRC');
			$cur_date = date("Y-m-d");
			$this->db->where("time",$cur_date);
			$this->db->select('*');
			$result_n=$this->db->get('movie_info');
			$result=$result_n->num_rows();
			return $result;
			/*
			date_default_timezone_set('PRC');
			$cur_date = date("Y-m-d");
			$sql = "SELECT * FROM `movie_info` WHERE time = ".$cur_date."";
			$query = $this->db->query($sql);
			$rs = $query->result_array();
			//$n = count($rs);
			return $rs;
			*/
		}
		function get_rate(){//获取中奖率
			$this->db->select('rate');
			$query = $this->db->get('movie_prize_info');
			$arr = $query->result();
			return $arr;
		}
		function get_total($date){//获取每日个数
			$this->db->select($date);
			$query = $this->db->get('movie_prize_info');
			$arr = $query->result();
			$rs = $arr[0]->$date;
			return $rs;
		}
	}
?>