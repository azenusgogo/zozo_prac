<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * 
 *
 * @package zt_lottery
 *
 **/
class Map_zt_user_model extends CI_Model {

	private $prize_table_name = 'map_zt_prize';
    
    private $user_table_name = 'map_zt_user';
    
    private $group_table_name = 'map_zt_group';
	/**
	 * 构造函数
	 *
	 * @return void
	 * 
	 **/
	
	function __construct()
	{
		parent::__construct();

		$this->load->database();
        date_default_timezone_set('PRC');
	}

	function add_user($user)
	{
		$data = array(
			'pid' => $user['pid'],
			'phone' => $user['phone'],
			'name' => isset($user['name'])?$user['name']:'',
			'address' => isset($user['address'])?$user['address']:'',
			'update_time' => time()
		);
		$this->db->insert($this->user_table_name, $data);
		if($this->db->insert_id())
		{
			return true;
		}
		else
		{
			return false;
		}
	}
    
    function check_prize($pid)
    {
        $this->db->select('*')
                 ->from($this->user_table_name)
                 ->where('pid', $pid);
        $query = $this->db->get();
        if ($query->num_rows() > 0){
            return false;
        }else{
            return true;
        }
    }
    
    function check_user_byphone($phone,$zid)
    {
        $this->db->select('*')
                 ->from($this->user_table_name)
                 ->join($this->prize_table_name,$this->prize_table_name.'.id='.$this->user_table_name.'.pid')
                 ->join($this->group_table_name,$this->group_table_name.'.id='.$this->prize_table_name.'.gid')
                 ->where($this->user_table_name.'.phone', $phone)
                 ->where($this->group_table_name.'.zid', $zid);
        $query = $this->db->get();
        if ($query->num_rows() > 0){
            return false;
        }else{
            return true;
        }
    }
	
    function get_prize_userlist($zid,$count)
    {
        $this->db->select($this->user_table_name.'.*,'.$this->prize_table_name.'.prize_name')
                 ->from($this->user_table_name)
                 ->join($this->prize_table_name,$this->prize_table_name.'.id='.$this->user_table_name.'.pid')
                 ->join($this->group_table_name,$this->group_table_name.'.id='.$this->prize_table_name.'.gid')
                 ->where($this->user_table_name.'.name !=', '')
                 ->where($this->group_table_name.'.zid', $zid)
                 ->limit($count);
        $query = $this->db->get();
        if ($query->num_rows() == $count){
            $result = $query->result_array();

            return $result;
        }else{
            return false;
        }
    }
    
    function get_userlist_byzt($data)
    {
        $this->db->select($this->user_table_name.'.*,'.$this->prize_table_name.'.prize_name')
                 ->from($this->user_table_name)
                 ->join($this->prize_table_name,$this->prize_table_name.'.id='.$this->user_table_name.'.pid')
                 ->join($this->group_table_name,$this->group_table_name.'.id='.$this->prize_table_name.'.gid and '
                        .$this->group_table_name.'.zid='.$data['zid']);
        if(isset($data['query'])){
            $this->db->or_like($this->prize_table_name.'.prize_name', $data['query'],'none')
                     ->or_like($this->user_table_name.'.id', $data['query'],'none')
                     ->or_like($this->user_table_name.'.name', $data['query'],'none')
                     ->or_like($this->user_table_name.'.phone', $data['query'],'none')
                     ->or_like($this->user_table_name.'.address', $data['query'],'none')
                     ->or_like($this->user_table_name.'.update_time', $data['query'],'none');
        }
        $query = $this->db->get();
        if ($query->num_rows() > 0){
            $result = $query->result_array();

            return $result;
        }else{
            return false;
        }
    }
    
    function get_userlist_bygroup($gid)
    {
        $this->db->select('*')
                 ->from($this->user_table_name)
                 ->join($this->prize_table_name,$this->prize_table_name.'.id='.$this->user_table_name.'.pid')
                 ->where($this->prize_table_name.'.gid', $gid);
        $query = $this->db->get();
        if ($query->num_rows() > 0){
            $result = $query->result_array();

            return $result;
        }else{
            return false;
        }
    }
    
    function get_userinfo($id)
    {
        $this->db->select('*')
                 ->from($this->user_table_name)
                 ->where('id', $id);
        $query = $this->db->get();
        if ($query->num_rows() > 0){
            $row = $query->row_array();
            return $row;
        }else{
            return false;
        }
    }
}