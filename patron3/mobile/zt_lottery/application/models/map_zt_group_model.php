<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * 
 *
 * @package zt_lottery
 *
 **/
class Map_zt_group_model extends CI_Model {

	private $table_name = 'map_zt_group';
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

	function add_group($req)
	{
		$data = array(
		    'zid' => $req['zid'],
			'group_name' => $req['group_name'],
			'rate' => $req['rate'],
			'active' => $req['active']
		);
		$this->db->insert($this->table_name, $data);
		if($this->db->insert_id())
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
    function add_grouplist_byzt($list)
    {
        $this->db->insert_batch($this->table_name, $list); 
        if($this->db->insert_id())
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    function update_group_info($req)
    {
        $data = array(
            'group_name' => $req['group_name'],
            'rate' => $req['rate'],
            'active' => $req['active']
        );
        $this->db->where('id', $req['id']);
        $this->db->update($this->table_name,$data);
        if($this->db->affected_rows() >= 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    function get_group_listbyzt($zid)
    {
        $this->db->select('*')
                 ->from($this->table_name)
                 ->where('zid', $zid);
        $query = $this->db->get();
        if ($query->num_rows() > 0){
            $result = $query->result_array();

            return $result;
        }else{
            return false;
        }
    }
    
    function get_group_info($id)
    {
        $this->db->select('*')
                 ->from($this->table_name)
                 ->where('id', $id);
        $query = $this->db->get();
        if ($query->num_rows() > 0){
            $row = $query->row_array();
            return $row;
        }else{
            return false;
        }
    }
    
    function delete_group($id)
    {
        $this->load->model('map_zt_prize_model');
        $res = $this->map_zt_prize_model->delete_prize_bygroup($id);
        if($res){
            $this->db->where('id', $id);
            $this->db->delete($this->table_name);
            if($this->db->affected_rows() >= 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }else{
            return false;
        }
    }
}
