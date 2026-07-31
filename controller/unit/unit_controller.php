<?php
session_start();
require ('../../model/common/common_functions.php');

class UnitController
{
    var $varModelObj;
    public $actionevents,$unit_id,$unit_name,$unit_status;
    function __construct()
    {
        $this->varModelObj = new CommonModel();
        $this->varDBConnection = $this->varModelObj->varDBConnection;
        $this->actionevents=$_POST['action'];
        $this->unit_name=$this->varDBConnection->real_escape_string($_POST['unit_name']);
        $this->unit_id=$_POST['unit_id'];
        $this->unit_status=$_POST['unit_status'];
    }
    function SQLArray()
    { 
        $array =  array();
      
        $array[0] = "SELECT unit_id,unit_name,unit_status FROM unit_details";
        $array[1] = "INSERT into unit_details (unit_name) VALUES ('".$this->unit_name."')"; 
        $array[2] = "SELECT unit_id,unit_name,unit_status FROM unit_details  where unit_id ='".$this->unit_id."'";      
        $array[3] = "UPDATE unit_details SET unit_name='".$this->unit_name."'  where unit_id ='".$this->unit_id."'";
        $array[4] = "SELECT unit_id,unit_name,unit_status FROM unit_details where unit_name='".$this->unit_name."' ";
        $array[5] = "UPDATE unit_details SET unit_status='".$this->unit_status."'  where unit_id ='".$this->unit_id."'";
        $array[6] = "SELECT unit_id,unit_name,unit_status FROM unit_details where unit_name='".$this->unit_name."' and unit_id !='".$this->unit_id."' ";
        
        
        
        return $array;
    }
    function RequestAccept($FunctionEvents)
    {
        $var =  $this->SQLArray();
      
        switch ($FunctionEvents)
        {
            
            case 'list_unit': 
                //echo $var[0];
                $this->varModelObj->ListFromTable($var[0]);
                
            break;
            
            
            case 'add_unit':
                
                
            if ($this->varModelObj->ReturnCountValue($var[4])==0)
            {    
               
                $this->varModelObj->AddToTable($var[1]);
            }
            else
            {
                echo "Unit - ".$this->unit_name."  Already Exist...!";
            }  
            
                
            break;
            
            
           
             
             case 'update_unit_status':
                 
                
                 //echo $var[5];
                $this->varModelObj->UpdateTable($var[5]);
                
             break;
             

            
             case 'update_unit':    
                
                
                
                  if ($this->varModelObj->ReturnCountValue($var[6])==0)
            {    
               
                 $this->varModelObj->UpdateTable($var[3]);
            }
            else
            {
                echo "unit - ".$this->unit_name."  Already Exist...!";
            }  
             
              break;
 

                 default:
                 echo 'No Action Found...!';
                 break;
                
        }

    }
}//end of class
$obj = new UnitController();
$obj->RequestAccept($obj->actionevents);
?>