<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * TAG模型
 *
 * @package chunjie2013
 *
 **/
class Map_zt_info_model extends CI_Model {

	private $table_name = 'map_zt_info';
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

	function add_zt_info($req)
	{
		$data = array(
			'zt_name' => $req['zt_name'],
			'detail' => $req['detail'],
			'start_date' => $req['start_date'],
			'end_date' => $req['end_date'],
			'sms_tpl' => $req['sms_tpl'],
			'rate' => $req['rate'],
			'get_more' => $req['get_more'],
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
    
    function update_zt_info($req)
    {
        $data = array(
            'zt_name' => $req['zt_name'],
            'detail' => $req['detail'],
            'start_date' => $req['start_date'],
            'end_date' => $req['end_date'],
            'sms_tpl' => $req['sms_tpl'],
            'rate' => $req['rate'],
            'get_more' => $req['get_more'],
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
    
    function get_zt_list()
    {
        $this->db->select('*')
                 ->from($this->table_name)
                 ->where('is_delete', 0);
        $query = $this->db->get();
        if ($query->num_rows() > 0){
            $result = $query->result_array();

            return $result;
        }else{
            return false;
        }
    }
    
    function get_zt_info($id)
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
    
    function delete_zt($id)
    {
        $this->db->set('is_delete', 1);
        $this->db->where('id', $id);
        $this->db->update($this->table_name);
        if($this->db->affected_rows() >= 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    

}