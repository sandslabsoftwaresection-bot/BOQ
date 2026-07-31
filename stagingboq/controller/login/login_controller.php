<?php
require ('../../model/common/common_functions.php');
class loginController 
{
    var $varModelObj;
    public $actionevents,$username,$password,$login_result,$type,$old_password,$new_password;

  
    function __construct()
	{
        
        $this->varModelObj = new CommonModel();
        $this->actionevents = $_POST['action'];
        $this->username = $_POST['username'];
        $this->password = $_POST['password'];
        $this->old_password=$_POST['old_password'];
        $this->new_password=$_POST['new_password'];
        


    }
    function SQLArray()
    {
        $array =  array();
        
        $array[0] = "SELECT * FROM  users where user_name='".$this->username."' and user_password='".$this->password."' ";
        
        $array[1] = "SELECT count(*) as count FROM  users where user_password='".$this->old_password."' ";
        
        $array[2] = "UPDATE users set user_password='".$this->new_password."'  where user_id='1'";
        
        return $array;
    }

    function RequestAccept($FunctionEvents)
    {
        $var =  $this->SQLArray();

        switch ($FunctionEvents)
        {
            
            case 'login':
                
                $this->login_result = $this->varModelObj->userAuthenticationforcheck($var[0],$this->password);
               //echo $var[0];
                if (trim($this->login_result)=="Success")
                {
                    echo "success";
                  
                }
                else
                {
                    echo $this->login_result;
                }
               
            break;
           
            case 'signout':
                $this->varModelObj->SignOut();
             
            break;
            
            
            
            case 'check_old_password':
                $this->varModelObj->check_user_count($var[1]);
             
            break;
            
            
            case 'password_update':
                $this->varModelObj->UpdateTable($var[2]);
             
            break;
            
        }
    }


}

$obj = new loginController();
$obj->RequestAccept($obj->actionevents);