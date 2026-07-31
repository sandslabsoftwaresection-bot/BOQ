<?php
session_start();
require ('../../model/common/common_functions.php');

class CategoryController
{
    var $varModelObj;
    public $actionevents,$category_id,$category_name,$category_status;
    function __construct()
    {
        $this->varModelObj = new CommonModel();
        $this->varDBConnection = $this->varModelObj->varDBConnection;
        $this->actionevents=$_POST['action'];
        $this->category_name=$this->varDBConnection->real_escape_string($_POST['category_name']);
        $this->category_id=$_POST['category_id'];
        $this->category_status=$_POST['category_status'];
    }
    function SQLArray()
    { 
        $array =  array();
      
        $array[0] = "SELECT category_id,category_name,category_status FROM category";
        $array[1] = "INSERT into category (category_name) VALUES ('".$this->category_name."')"; 
        $array[2] = "SELECT category_id,category_name,category_status FROM category  where category_id ='".$this->category_id."'";      
        $array[3] = "UPDATE category SET category_name='".$this->category_name."'  where category_id ='".$this->category_id."'";
        $array[4] = "SELECT category_id,category_name,category_status FROM category where category_name='".$this->category_name."' ";
        $array[5] = "UPDATE category SET category_status='".$this->category_status."'  where category_id ='".$this->category_id."'";
        $array[6] = "SELECT category_id,category_name,category_status FROM category where category_name='".$this->category_name."'   and category_id !='".$this->category_id."' ";
        
        
        
        return $array;
    }
    function RequestAccept($FunctionEvents)
    {
        $var =  $this->SQLArray();
      
        switch ($FunctionEvents)
        {
            
            case 'list_category': 
                //echo $var[0];
                $this->varModelObj->ListFromTable($var[0]);
                
            break;
            
            
            case 'add_category':
                
                
            if ($this->varModelObj->ReturnCountValue($var[4])==0)
            {    
               
                $this->varModelObj->AddToTable($var[1]);
            }
            else
            {
                echo "Category - ".$this->category_name."  Already Exist...!";
            }  
            
                
            break;
            
            
           
             
             case 'update_category_status':
                 
                
                 //echo $var[5];
                $this->varModelObj->UpdateTable($var[5]);
                
             break;
             

            
             case 'update_category':    
                
                
                  if ($this->varModelObj->ReturnCountValue($var[6])==0)
            {    
               
                 $this->varModelObj->UpdateTable($var[3]);
            }
            else
            {
                echo "Site/Project - ".$this->site_project_name." / ".$this->site_project_code."  Already Exist...!";
            }  
             
              break;
 

                 default:
                 echo 'No Action Found...!';
                 break;
                
        }

    }
}//end of class
$obj = new CategoryController();
$obj->RequestAccept($obj->actionevents);
?>