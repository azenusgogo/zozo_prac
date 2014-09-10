<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * TAG模型
 *
 * @package chunjie2013
 *
 **/
class Map_zt_admin_model extends CI_Model {

	private $table_name = 'map_zt_admin';
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

	function verify_user($email, $password){  
        $res = $this->db 
            ->from($this->table_name) 
            ->where('email', $email)  
            ->where('password', sha1($password))
            ->limit(1)->get();  
              
        if($res->num_rows > 0){  
            return $res->row();  
        }  
        return false;  
    }
    
    function check_passport_un($un){  
        $res = $this->db 
            ->from($this->table_name) 
            ->where('hi_name', $un)
            ->limit(1)->get();  
              
        if($res->num_rows > 0){  
            return true;  
        }  
        return false;  
    }
    
    function add_user($email, $password, $un){
        $data = array(
            'email' => $email,
            'password' => sha1($password),
            'hi_name' => $un,
            'create_time' => date('Y-m-d')
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
}


// END TAG模型

/* End of file tag_model.php */
/* Location: ./application/models/tag_model.php */