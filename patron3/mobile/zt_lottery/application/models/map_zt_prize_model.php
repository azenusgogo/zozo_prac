<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * 
 *
 * @package zt_lottery
 *
 **/
class Map_zt_prize_model extends CI_Model {

	private $prize_table_name = 'map_zt_prize';
    
    private $zt_table_name = 'map_zt_info';
    
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

	function add_prize_bygroup($req)
	{
		$data = array(
			'prize_name' => $req['prize_name'],
			'sms_content' => $req['sms_content'],
			'gid' => $req['gid'],
			'code' => $req['code'],
			'start_date' => $req['start_date'],
			'total' => $req['total'],
			'status' => $req['status'],
			'prio' => $req['prio']
		);
		$this->db->insert($this->prize_table_name, $data);
		if($this->db->insert_id())
		{
			return true;
		}
		else
		{
			return false;
		}
	}
    
    function add_prizelist_bygroup($list)
    {
        $this->db->insert_batch($this->prize_table_name, $list); 
        if($this->db->insert_id())
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    function update_prize_info($req)
    {
        $data = array(
            'prize_name' => $req['prize_name'],
            'sms_content' => $req['sms_content'],
            'code' => $req['code'],
            'start_date' => $req['start_date'],
            'total' => $req['total'],
            'status' => $req['status'],
            'prio' => $req['prio']
        );
        $this->db->where('id', $req['id']);
        $this->db->update($this->prize_table_name,$data);
        if($this->db->affected_rows() >= 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    function update_prize_status($prize)
    {
        $data = array(
            'prize_key' => $prize['prize_key'],
            'total' => $prize['total'],
            'status' => $prize['status'],
            'get_time' => $prize['get_time']
        );
        $this->db->where('id', $prize['id']);
        $this->db->update($this->prize_table_name,$data);
        if($this->db->affected_rows() >= 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    function reset_notget_prize($zid)
    { 
        $query = $this->db->select('id')
                          ->from($this->group_table_name)
                          ->where('zid', $zid)->get();
        if ($query->num_rows() > 0){
            $ids = array();
            $result = $query->result_array();
            foreach($result as $rec){
                array_push($ids,$rec['id']);
            }

            $this->db->set('status', 0)
                     ->set('total', 'total+1', FALSE)
                     ->set('prize_key', '')
                     ->set('get_time', 0)
                     ->where('get_time < ', time()-3600)
                     ->where('status', 1)
                     ->where_in('gid', $ids)
                     ->update($this->prize_table_name);
                     
            if($this->db->affected_rows() >= 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        return true;
    }
    
    function get_prizelist_bygroup($gid)
    {
        $this->db->select('*')
                 ->from($this->prize_table_name)
                 ->where('gid', $gid);
        $query = $this->db->get();
        if ($query->num_rows() > 0){
            $result = $query->result_array();

            return $result;
        }else{
            return false;
        }
    }

    function get_valideprizelist_bygroup($gid)
    {
        $this->db->select($this->prize_table_name.'.*')
                 ->from($this->prize_table_name)
                 ->join($this->group_table_name, $this->group_table_name.'.id='.$this->prize_table_name.'.gid')
                 ->where($this->prize_table_name.'.start_date <= ', date('Y-m-d'))
                 ->where($this->prize_table_name.'.status', 0)
                 ->where($this->prize_table_name.'.gid', $gid)
                 ->where($this->group_table_name.'.active', 1);
        $query = $this->db->get();
        if ($query->num_rows() > 0){
            $result = $query->result_array();

            return $result;
        }else{
            return false;
        }
    }
    
    function get_prizelist_byzt($data)
    {
        $this->db->select($this->prize_table_name.'.*')
                 ->from($this->prize_table_name);
        if(($data['status'])!='-1'){
            $this->db->join($this->group_table_name, $this->group_table_name.'.id='.$this->prize_table_name.'.gid and '
                        .$this->group_table_name.'.zid='.$data['zid'].' and '
                        .$this->prize_table_name.'.status='.$data['status']);
        }else{
            $this->db->join($this->group_table_name, $this->group_table_name.'.id='.$this->prize_table_name.'.gid and '
                        .$this->group_table_name.'.zid='.$data['zid']);
        }
                 
        if(isset($data['query'])){
            $this->db->or_like($this->prize_table_name.'.id', $data['query'],'none')
                     ->or_like($this->prize_table_name.'.prize_name', $data['query'],'none')
                     ->or_like($this->prize_table_name.'.sms_content', $data['query'],'none')
                     ->or_like($this->prize_table_name.'.code', $data['query'],'none')
                     ->or_like($this->prize_table_name.'.start_date', $data['query'],'none')
                     ->or_like($this->prize_table_name.'.total', $data['query'],'none')
                     ->or_like($this->prize_table_name.'.prio', $data['query'],'none');
        }   
        if(($data['status'])!='-1'){
            $this->db->where($this->prize_table_name.'.status', $data['status']);
        } 
        $query = $this->db->get();
        if ($query->num_rows() > 0){
            $result = $query->result_array();

            return $result;
        }else{
            return false;
        }
    }

    function get_valideprizelist_byzt($zid)
    {
        $this->db->select($this->prize_table_name.'.*')
                 ->from($this->prize_table_name)
                 ->join($this->group_table_name, $this->group_table_name.'.id='.$this->prize_table_name.'.gid')
                 ->where($this->prize_table_name.'.status', 0)
                 ->where($this->prize_table_name.'.total > ', 0)
                 ->where($this->prize_table_name.'.start_date <= ', date('Y-m-d'))
                 ->where($this->group_table_name.'.active', 1)
                 ->where($this->group_table_name.'.zid', $zid);
        $query = $this->db->get();
        if ($query->num_rows() > 0){
            $result = $query->result_array();

            return $result;
        }else{
            return false;
        }
    }
    
    function get_prizelist_bystatus($status)
    {
        $this->db->select('*')
                 ->from($this->prize_table_name)
                 ->where('status', $status);
        $query = $this->db->get();
        if ($query->num_rows() > 0){
            $result = $query->result_array();

            return $result;
        }else{
            return false;
        }
    }
    
    function get_prizeinfo($id)
    {
        $this->db->select('*')
                 ->from($this->prize_table_name)
                 ->where('id', $id);
        $query = $this->db->get();
        if ($query->num_rows() > 0){
            $row = $query->row_array();
            return $row;
        }else{
            return false;
        }
    }
    
    function check_prize($prize)
    {
        $this->db->select('*')
                 ->from($this->prize_table_name)
                 ->where('id', $prize['pid']);
        $query = $this->db->get();
        if ($query->num_rows() > 0){
            $row = $query->row_array();
            if($row['prize_key'] != $prize['prize_key']){
                return false;
            }
            if($row['total'] == 0){
                $this->db->set('status', 2)
                     ->where('id', $prize['pid'])
                     ->update($this->prize_table_name);
                     
                if($this->db->affected_rows() >= 1)
                {
                    return $row;
                }
                else
                {
                    return false;
                }
            }
            return $row;
        }else{
            return false;
        }
    }
    
    function delete_prize($id)
    {
        $this->db->where('id', $id);
        $this->db->delete($this->prize_table_name);
        if($this->db->affected_rows() >= 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    function delete_prize_bygroup($gid)
    {
        $query = $this->db->select('*')
                          ->from($this->prize_table_name)
                          ->where('gid', $gid)->get();
        if($query->num_rows() == 0){
            return true;
        }
        $this->db->where('gid', $gid);
        $this->db->delete($this->prize_table_name);
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