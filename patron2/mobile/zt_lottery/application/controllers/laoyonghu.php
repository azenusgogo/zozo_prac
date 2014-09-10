<?php
	class Laoyonghu extends CI_Controller{
		function __construct()
	    {
	        parent::__construct();

	    }
	    function lottery(){
	    	//保存信息
	    	$this->load->model("laoyonghu_model");
	    	$data = $this->laoyonghu_model->get_data_info();
	    	$single = $_GET['single']?$_GET['single']:"";
	    	$multi = $_GET['multi']?$_GET['multi']:"";
	    	$multi_arr = explode(",",substr($multi,1,strlen($multi)-2));
	    	switch ($single) {
	    		case '1':
	    			$arr['single1'] = (int)$data[0]->single1+1;
	    			break;
	    		case '2':
	    			$arr['single2'] = (int)$data[0]->single2+1;
	    			break;
	    		case '3':
	    			$arr['single3'] = (int)$data[0]->single3+1;
	    			break;
	    		default:
	    			break;
	    	}
	    	$n = count($multi_arr);
	    	for($i=1;$i<=$n;$i++)
	    	{
	    		$mult = 'mult'.substr($multi_arr[$i-1],1,1);
	    		$arr[$mult] = $data[0]->$mult + 1;
	    	}
	    	$rs = $this->laoyonghu_model->update_data_info($arr);
	    	//抽奖
	    	if($rs)//更新成功
	    	{
	    		$para['zid'] = 4;
		    	$this->load->library('Lottery_Engine',$para);
		    	$gid = rand(8,10);
		    	$res = $this->lottery_engine->lottery_by_group_nocode($gid);
		    	if($res['status'] === 2)//中奖
		    	{
		    		$rt['output']['status'] = 1;
		    		$rt['output']['pid'] = $res['pid'];
		    		$rt['output']['prize_name'] = $res['prize_name'];
		    		$rt['output']['prize_key'] = $res['prize_key'];
		    	}
		    	else{
		    		$rt['output']['status'] = 0;
		    	}
	    	}
	    	else{
	    		$rt['output']['status'] = 0;
	    	}
	    	$this->load->view('json',$rt);
	    }
	    function save_user(){
	    	$para['zid'] = 4;
	        $this->load->library('Lottery_Engine',$para);
	        $arr['pid'] = $_GET['pid'];
	        $arr['phone'] = $_GET['phone'];
	        $arr['name'] = $_GET['name']?$_GET['name']:'';
	        $arr['address'] = $_GET['address']?$_GET['address']:'';
	        $arr['prize_key'] = $_GET['prize_key'];
	        $res = $this->lottery_engine->save_user($arr);
	        if($res['error'] ===0)
	        {
	        	$rt['output']['error'] = 0;//保存成功
	        }
	        else if($res['error'] ===1 && $res['error_no']===4){
	        	$rt['output']['error'] = 2;//手机已经认领
	        }
	        else{
	        	$rt['output']['error'] = 1;//保存失败
	        }
	        $this->load->view('json',$rt);
	    }
	}
?>

