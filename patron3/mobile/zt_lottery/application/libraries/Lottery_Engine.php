<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Lottery
 * @package 抽奖引擎前台接口
 * @author songci
 **/
 
class Lottery_Engine{
	
    /**
     * 初始化构造函数
     * @param array->[$para] [$para为引擎配置参数，必须包含专题zid] 
     * @author songci
     **/
    function __construct($para)
    {
        $this->CI =& get_instance();
        
        date_default_timezone_set('PRC');
        
        //init model
        $this->CI->load->model('map_zt_info_model');
        $this->CI->load->model('map_zt_group_model');
        $this->CI->load->model('map_zt_prize_model');
        $this->CI->load->model('map_zt_user_model');
        
        //init zt data
        $this->data = array();
        $this->data['error'] = 0;
        if(!isset($para['zid'])){
            $this->data['error'] = 1;
            $this->data['error_msg'] = '参数错误：引擎初始化缺少专题id->zid！';
        }else{
            $this->zid = $para['zid'];
            try{
                $this->zt_info = $this->CI->map_zt_info_model->get_zt_info($this->zid);
                if(!$this->zt_info){
                    $this->data['error_msg'] = '参数错误：专题id！';
                    throw new Exception('para error: zt not exsit!');
                }
                if($this->zt_info['is_delete'] == 1){
                    $this->data['error_msg'] = '配置错误：专题已被删除！';
                    throw new Exception('config error: zt already delete!');
                }
                if($this->zt_info['active'] == 0){
                    $this->data['error_msg'] = '配置错误：专题未激活！';
                    throw new Exception('config error: zt not active!');
                }
                if($this->zt_info['start_date'] > date('Y-m-d H:i:s')){
                    $this->data['error_msg'] = '配置错误：专题未开始！';
                    throw new Exception('config error: zt not start!');
                }
                if($this->zt_info['end_date'] < date('Y-m-d H:i:s')){
                    $this->data['error_msg'] = '配置错误：专题已结束！';
                    throw new Exception('config error: zt already end!');
                }
                $this->group_list = $this->CI->map_zt_group_model->get_group_listbyzt($this->zid);
                if(!$this->group_list){
                    $this->data['error_msg'] = '配置错误：该专题没有可用分组！';
                    throw new Exception('para error: zt not exsit! || config error: zt has no group');
                }
                $this->prize_info = $this->CI->map_zt_prize_model->get_valideprizelist_byzt($this->zid);
                if(!$this->prize_info){
                    $this->data['error_msg'] = '配置错误：该专题没有可用奖品！';
                    throw new Exception('para error: zt not exsit! || config error: zt has no prize');
                }
            }catch (Exception $e){
                $this->data['error'] = 1;
                $this->data['error_no'] = 0;
                log_message('error', $e->getMessage());
            }
        }
    }
    
    /**
     * 抽奖接口(直接抽奖，不通过组别抽奖)
     * @param string->[$vcode,$code] [$vcode为验证码校验字符串，$code为用户输入字符串] 
     * @author songci
     **/
    public function lottery_by_zt($vcode,$code){
        if(!$this->valid_zt()){
            return $this->data;
        }
        $data = array();
        if(!$this->verify($vcode,$code)){
            $data['error'] = 1;
            $data['error_no'] = 1;
            $data['error_msg'] = '验证码错误：验证码校验失败！';
            return $data;
        }
        try{
            $rate = floatval($this->zt_info['rate']) * 1000;
            $random = rand(1, 100000);
            if($rate < $random){
                //未中奖
                $data['status'] = 0;
            }else{
                //中奖
                $prize = $this->get_prize($this->prize_info);
                if($prize == false){
                    //当日已经没有奖品
                    $data['status'] = 1;
                }else{
                    $prize['total'] = intval($prize['total']) - 1;
                    if($prize['total'] == 0){
                        $prize['status'] = 1;
                    }
                    $prize['get_time'] = time();
                    if($prize['prize_key'] == ''){
                        $prize['prize_key'] = md5(time()+rand(1, 10000000));
                    }
                    $res = $this->CI->map_zt_prize_model->update_prize_status($prize);
                    if($res){
                        //更新数据成功
                        $data['status'] = 2;
                        $data['pid'] = $prize['id'];
                        $data['prize_name'] = $prize['prize_name'];
                        $data['code'] = $prize['code'];
                        $data['prize_key'] = $prize['prize_key'];
                        $data['sms_content'] = $this->get_sms_content($prize);
                    }else{
                        //更新数据失败
                        $data['error_no'] = 2;
                        $data['error_msg'] = '数据库错误：更新奖品状态失败！';
                        throw new Exception('db error: prize update fail!');
                    }
                }
            }
        }catch (Exception $e){
            $data['error'] = 1;
            log_message('error', $e->getMessage());
        }
        return $data; 
    }

    /**
     * 抽奖接口(通过组别抽奖)
     * @param string->[$gid,$vcode,$code] [$gid为组别id,$vcode为验证码校验字符串，$code为用户输入字符串] 
     * @author songci
     **/
    public function lottery_by_group($gid,$vcode,$code){
        if(!$this->valid_zt()){
            return $this->data;
        }
        $data = array();
        if(!$this->verify($vcode,$code)){
            $data['error'] = 1;
            $data['error_no'] = 1;
            $data['error_msg'] = '验证码错误：验证码校验失败！';
            return $data;
        }
        try{
            $group_info = $this->CI->map_zt_group_model->get_group_info($gid);
            if($group_info){
                $rate = floatval($group_info['rate']) * 1000;
                $random = rand(1, 100000);
                if($rate < $random){
                    //未中奖
                    $data['status'] = 0;
                }else{
                    //中奖
                    $prizelist = $this->CI->map_zt_prize_model->get_valideprizelist_bygroup($gid);
                    if($prizelist){
                        $prize = $this->get_prize($prizelist);
                        if($prize == false){
                            //当日已经没有奖品
                            $data['status'] = 1;
                        }else{
                            $prize['total'] = intval($prize['total']) - 1;
                            if($prize['total'] == 0){
                                $prize['status'] = 1;
                            }
                            $prize['get_time'] = time();
                            if($prize['prize_key'] == ''){
                                $prize['prize_key'] = md5(time()+rand(1, 10000000));
                            }
                            $res = $this->CI->map_zt_prize_model->update_prize_status($prize);
                            if($res){
                                //更新数据成功
                                $data['status'] = 2;
                                $data['pid'] = $prize['id'];
                                $data['prize_name'] = $prize['prize_name'];
                                $data['code'] = $prize['code'];
                                $data['prize_key'] = $prize['prize_key'];
                                $data['sms_content'] = $this->get_sms_content($prize);
                            }else{
                                //更新数据失败
                                $data['error_no'] = 2;
                                $data['error_msg'] = '数据库错误：更新奖品状态失败！';
                                throw new Exception('db error: prize update fail!');
                            }
                        }
                    }else{
                        $data['status'] = 1;
                    }
                }
            }
            else{
                //获取组别详情失败
                $data['error_msg'] = '参数错误：组别id错误，获取组别详情失败！';
                throw new Exception('db error: prize update fail!');
            }
        }catch (Exception $e){
            $data['error'] = 1;
            log_message('error', $e->getMessage());
        }
        return $data; 
    }
    
    /**
     * 抽奖接口(通过组别抽奖)(无验证码)
     * @param string->[$gid] [$gid为组别id] 
     * @author wanghaipeng update
     **/
    public function lottery_by_group_nocode($gid){
        if(!$this->valid_zt()){
            return $this->data;
        }
        $data = array();
        try{
            $group_info = $this->CI->map_zt_group_model->get_group_info($gid);
            if($group_info){
                $rate = floatval($group_info['rate']) * 1000;
                $random = rand(1, 100000);
                if($rate < $random){
                    //未中奖
                    $data['status'] = 0;
                }else{
                    //中奖
                    $prizelist = $this->CI->map_zt_prize_model->get_valideprizelist_bygroup($gid);
                        
                    if($prizelist){
                        $prize = $this->get_prize($prizelist);
                        if($prize == false){
                            //当日已经没有奖品
                            $data['status'] = 1;
                        }else{
                            $prize['total'] = intval($prize['total']) - 1;
                            if($prize['total'] == 0){
                                $prize['status'] = 1;
                            }
                            $prize['get_time'] = time();
                            if($prize['prize_key'] == ''){
                                $prize['prize_key'] = md5(time()+rand(1, 10000000));
                            }
                            $res = $this->CI->map_zt_prize_model->update_prize_status($prize);
                            if($res){
                                //更新数据成功
                                $data['status'] = 2;
                                $data['pid'] = $prize['id'];
                                $data['prize_name'] = $prize['prize_name'];
                                $data['code'] = $prize['code'];
                                $data['prize_key'] = $prize['prize_key'];
                                $data['sms_content'] = $this->get_sms_content($prize);
                            }else{
                                //更新数据失败
                                $data['error_no'] = 2;
                                $data['error_msg'] = '数据库错误：更新奖品状态失败！';
                                throw new Exception('db error: prize update fail!');
                            }
                        }
                    }else{
                        $data['status'] = 1;
                    }
                }
            }
            else{
                //获取组别详情失败
                $data['error_msg'] = '参数错误：组别id错误，获取组别详情失败！';
                throw new Exception('db error: prize update fail!');
            }
        }catch (Exception $e){
            $data['error'] = 1;
            log_message('error', $e->getMessage());
        }
        return $data; 
    }
    
    /**
     * 返回抽中的奖品实例
     * @author songci
     **/
    private function get_prize($prize_list){
        $prio_list = array();
        $valide_list = array();
        foreach($prize_list as $prize){
            if(!in_array($prize['prio'], $prio_list)){
                array_push($prio_list,$prize['prio']);
            }
        }
        array_multisort($prio_list,SORT_ASC);
        $sum = array_sum($prio_list);
        $random = rand(1, $sum);
        for($i = 0 ; $i < count($prio_list) ; $i ++){
            if($random >= array_sum(array_slice($prio_list,0,$i)) && $random <= array_sum(array_slice($prio_list,0,$i+1))){
                $prio = $prio_list[$i];
                $i = count($prio_list);
            }
        }
        foreach($prize_list as $prize){
            if($prize['prio'] == $prio){
                array_push($valide_list,$prize);
            }
        }
        $random = rand(0, count($valide_list)-1);
        return $valide_list[$random];
    }
    
    /**
     * 生成短信内容
     * @param string->[$sms_content] [$sms_content为奖品短信内容] 
     * @author songci
     **/
    private function get_sms_content($prize){
		$zt_info = $this->zt_info;
        $sms_tpl = $zt_info['sms_tpl'];
        if($prize['code']!=''){
            $sms_tpl = str_replace('#sms_code', '奖品验证码：'.$prize['code'].'。', $sms_tpl);
        }
        return str_replace('#sms_content', $prize['sms_content'], $sms_tpl);
    }
    
    /**
     * 校验专题是否可用
     * @author songci
     **/
    private function valid_zt(){
        if($this->data['error'] == 1){
            return false;
        }else{
            return true;
        }
    }
    
    /**
     * 获取中奖用户列表
     * @param int->[$count] [$count为需要返回的数据条数] 
     * @author songci
     **/
    public function get_prize_userlist($count)
    {
        if(!$this->valid_zt()){
            return $this->data;
        }
        $this->user_prize = $this->CI->map_zt_user_model->get_prize_userlist($this->zid,$count);
        if($this->user_prize){
            return $this->user_prize;
        }else{
            return false;
        }
    }
    
    /**
     * 保存中奖用户信息
     * @param array->[$para] [$para数组中需包含需要保存的信息以及奖品pid和prize_key] 
     * @author songci
     **/
    public function save_user($para)
    {
        if(!$this->valid_zt()){
            return $this->data;
        }
        $zt_info = $this->zt_info;
        $data = array();
        $data['error'] = 0;
        if(!isset($para['phone'])){
            $data['error'] = 1;
            $data['error_no'] = 1;
            $data['error_msg'] = '手机号码不能为空！';
            return $data;
        }
        $key_check = $this->CI->map_zt_prize_model->check_prize($para);
        if(!$key_check){
            $data['error'] = 1;
            $data['error_no'] = 2;
            $data['error_msg'] = '奖品key校验错误或奖品已发出！';
            return $data;
        }
        if($key_check['total'] == 0){
            $prize_check = $this->CI->map_zt_user_model->check_prize($para['pid']);
            if(!$prize_check){
                $data['error'] = 1;
                $data['error_no'] = 3;
                $data['error_msg'] = '该奖品已被认领！';
                return $data;
            }
        }
        if($zt_info['get_more'] == 1){
            $res = $this->CI->map_zt_user_model->add_user($para);
        }else{
            if($this->CI->map_zt_user_model->check_user_byphone($para['phone'],$this->zid)){
                $res = $this->CI->map_zt_user_model->add_user($para);
            }else{
                $data['error'] = 1;
                $data['error_no'] = 4;
                $data['error_msg'] = '该手机号码已经存在！';
                return $data;
            }
        }
        if($res){
            return $data;
        }else{
            $data['error'] = 1;
            $data['error_no'] = 5;
            $data['error_msg'] = '保存用户信息失败！';
            return $data;
        }
    }
	
	/**
     * 保存中奖用户信息并发送短信
     * @param array->[$para] [$para数组中需包含需要保存的信息以及奖品pid和prize_key] 
     * @author songci
     **/
	 public function saveUser_and_sendSms($para)
    {
        if(!$this->valid_zt()){
            return $this->data;
        }
        $zt_info = $this->zt_info;
        $data = array();
        $data['error'] = 0;
        if(!isset($para['phone'])){
            $data['error'] = 1;
            $data['error_no'] = 1;
            $data['error_msg'] = '手机号码不能为空！';
            return $data;
        }
        $key_check = $this->CI->map_zt_prize_model->check_prize($para);
        if(!$key_check){
            $data['error'] = 1;
            $data['error_no'] = 2;
            $data['error_msg'] = '奖品key校验错误或奖品已发出！';
            return $data;
        }
        if($key_check['total'] == 0){
            $prize_check = $this->CI->map_zt_user_model->check_prize($para['pid']);
            if(!$prize_check){
                $data['error'] = 1;
                $data['error_no'] = 3;
                $data['error_msg'] = '该奖品已被认领！';
                return $data;
            }
        }
        if($zt_info['get_more'] == 0){
			$phone_check = $this->CI->map_zt_user_model->check_user_byphone($para['phone'],$this->zid);
			if(!$phone_check){
				$data['error'] = 1;
                $data['error_no'] = 4;
                $data['error_msg'] = '该手机号码已经存在！';
                return $data;
			}
		}
		$sms = $this->sendSms($para['sms_content'],$para['phone'],$para['vcode'],$para['code']);
		if($sms['error'] == 1 && $sms['error_no'] == 2){
			$data['error'] = 1; 
			$data['error_no'] = 5;
            $data['error_msg'] = '验证码错误';
		}elseif($sms['error'] == 0){
			$res = $this->CI->map_zt_user_model->add_user($para);
			if(!$res){
			    log_message('error','Save Fail zid:'. $this->zid .' phone:'.$para['phone'].' pid:'.$para['pid'].' sms_code:'.$para['sms_code'].' prize_key:'.$para['prize_key']);
				$data['error'] = 1;
				$data['error_no'] = 7;
				$data['error_msg'] = '保存用户信息失败！';
			}
		}else{
			$data['error'] = 1;                
			$data['error_no'] = 6;
            $data['error_msg'] = '发送短信失败';
		}
        return $data;
    }
    
    /**
     * 验证码校验接口
     * @param string->[$vcode，$code] [$vcode为验证码校验字符串，$code为用户输入字符串] 
     * @author songci
     **/
    public function verify($vcode, $code)
    {       
        $ret = file_get_contents('http://map.baidu.com/maps/services/captcha/verify?code='.$code.'&vcode='.$vcode);   

        if ($ret === false)        
        {            
            return false;        
        }
        else
        {
            $ret = json_decode($ret, true);
            $error = isset($ret['result']['error']) ? intval($ret['result']['error']) : -1;
            if($error === 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
    
    /**
     * 短信发送接口
     * @param string->[$smsContent, $phone] [$smsContent为短信内容，$phone为用户手机]
     * @param string->[$vcode, $codeInput] [$vcode为验证码校验字符串，$codeInput为用户输入字符串 ]
     * @author songci
     **/
    public function sendSms($smsContent, $phone, $vcode, $codeInput){
        $data = array();
        $sig = md5($smsContent."ce802b493e6765a3a2f5a23d161686b3");

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'http://map.baidu.com/ag/sms/send_sms');
        curl_setopt($ch, CURLOPT_HEADER, 0);//设置header
        curl_setopt($ch, CURLOPT_POST, 1);//post提交方式
        curl_setopt($ch, CURLOPT_POSTFIELDS, "phone[0]=$phone&vcode=$vcode&code_input=$codeInput&content=$smsContent&tn=fullcontent&sig=$sig");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $ret = curl_exec($ch);
        curl_close($ch);
        if ($ret === false){
            $data['error'] = 1;
            $data['error_no'] = 1;
            $data['error_msg'] = '请求服务器错误！';
            return $data;
        }

        $sms =  json_decode($ret, true);
        if($sms["type"] == "VCODE_VERITY_FAIL"){
            $data['error'] = 1;
            $data['error_no'] = 2;
            $data['error_msg'] = '验证码错误！';
        }else if($sms["type"] == "SMS_SEND_SUCCESS"){
            $data['error'] = 0;
        }else{
            $data['error'] = 1;
            $data['error_no'] = 3;
            $data['error_msg'] = '发送短信失败！';
        }
        return $data;
    }
}
