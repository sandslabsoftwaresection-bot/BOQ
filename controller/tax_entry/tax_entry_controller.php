<?php

require ('../../model/common/common_functions.php');




class tax_entry_controller
{
        var $varModelObj,$varDBConnection;
        public $actionevents,$v_ctrl_name,$tax_id, $tax_name, $tax_value,$tax_from_date,$tax_to_date,$current_date;
        
       
        
    function __construct()
	{
	    
        
        $this->varModelObj = new CommonModel();
        $this->varDBConnection = $this->varModelObj->varDBConnection;
        $this->actionevents = $_POST['action'];
        $this->ctrl_name = $_POST['v_ctrl_name'];
        
        $this->tax_id = $_POST['v_tax_id'];
        $this->tax_name = $_POST['v_tax_name'];
        $this->tax_value = $_POST['v_tax_value'];
        $this->tax_from_date = $_POST['v_from_date'];
        $this->tax_to_date = $_POST['v_to_date'];
        $this->tax_name = $this->varDBConnection->real_escape_string(($this->tax_name));
       
        date_default_timezone_set('Asia/Bahrain');
        $this->current_date = date("Y-m-d h:i:s");
        $this->tax_from_date= date("Y-m-d", strtotime($this->tax_from_date) );
        $this->tax_to_date= date("Y-m-d", strtotime($this->tax_to_date) );
        
        
        
       
        
        
    }
    
    
    
    function SQLArray()
    { 
        $array =  array();
      
        $array[0] = "INSERT INTO `tax_details`(  `tax_name`, `tax_value`, `valid_from`, `valid_to`, `default_date`) VALUES ( '".$this->tax_name."','".$this->tax_value."','".$this->tax_from_date."','".$this->tax_to_date."','".$this->current_date."')";
        $array[1] = "select *,date_format(valid_from,'%m/%d/%Y') as valid_from,date_format(valid_to,'%m/%d/%Y') as valid_to from tax_details where status='Active' order by tax_id desc";
        $array[2] ="update tax_details set `tax_name`='".$this->tax_name."',`tax_value`='".$this->tax_value."',`valid_from`='".$this->tax_from_date."',`valid_to`='".$this->tax_to_date."' where tax_id='".$this->tax_id."'";
        $array[3] ="update tax_details set `status`='DeActive' where tax_id='".$this->tax_id."'";
       
        return $array;
    }
    function RequestAccept($FunctionEvents)
    {
        $var =  $this->SQLArray();
      
        switch ($FunctionEvents)
        {

            
            case 'add_tax_entry':
                 echo $var[0];
                $this->varModelObj->AddToTable($var[0]);
            break;
            
            
            
            case 'list_tax_entry':
                //echo $var[1];
                $this->varModelObj->ListFromTable($var[1]);
            break;
            
            
            
             case 'edit_tax_entry':
                echo $var[2];
                $this->varModelObj->UpdateTable($var[2]);
            break;
            
             case 'cancel_tax_entry':
                echo $var[3];
                $this->varModelObj->UpdateTable($var[3]);
            break;
            
           
            default:
             echo 'No Action Found...!';
             break;
            
        }

    }
}//end of class

$obj = new tax_entry_controller();
$obj->RequestAccept($obj->actionevents);
?>