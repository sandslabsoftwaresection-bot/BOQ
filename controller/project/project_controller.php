<?php

require ('../../model/common/common_functions.php');




class companyController
{
        var $varModelObj,$varDBConnection;
        public $actionevents,$v_ctrl_name,$project_id,$project_name,$company_id, $company_name,$reference_no,$signed_date, $contact_phone,$fax_number;
        public  $contact_person,$contact_address, $contract_value, $variations, $tax_id, $tax_name,$tax_value,  $project_description, $current_date;
        
    function __construct()
	{
	   
        
        $this->varModelObj = new CommonModel();
        $this->varDBConnection = $this->varModelObj->varDBConnection;
        $this->actionevents = $_POST['action'];
        $this->ctrl_name = $_POST['v_ctrl_name'];
        
        $this->company_id = $_POST['v_company_id'];
        $this->company_name = $_POST['v_company_name'];
        $this->company_name = $this->varDBConnection->real_escape_string(($this->company_name));
        $this->project_id = $_POST['v_project_id'];
        $this->project_name = $_POST['v_project_name'];
        $this->project_name = $this->varDBConnection->real_escape_string(($this->project_name));
        $this->reference_no = $_POST['v_reference_no'];
        $this->signed_date = $_POST['v_signed_date'];
        $this->signed_date= date("Y-m-d", strtotime($this->signed_date) );
        $this->contact_phone = $_POST['v_contact_phone'];
        $this->contact_person = $_POST['v_contact_person'];
        $this->contact_person = $this->varDBConnection->real_escape_string(($this->contact_person));
        
        $this->contact_address = $_POST['v_contact_address'];
        $this->contact_address = $this->varDBConnection->real_escape_string(($this->contact_address));
        $this->fax_number = $_POST['v_fax_number'];
        $this->contract_value = $_POST['v_contract_value'];
        $this->variations = $_POST['v_variations'];
        $this->tax_id = $_POST['v_tax_id'];
        $this->tax_name = $_POST['v_tax_name'];
        $this->tax_name = $this->varDBConnection->real_escape_string(($this->tax_name));
        $this->tax_percentage = $_POST['v_tax_value'];
        $this->tax_value=((floatval($this->contract_value)+floatval($this->variations))*(floatval($this->tax_percentage/100)));
        
        //$this->tax_value=($this->contract_value*($this->tax_percentage/100));
        
        $this->project_description= $_POST['v_project_description'];
        $this->project_description = $this->varDBConnection->real_escape_string(($this->project_description));
        date_default_timezone_set('Asia/Bahrain');
        $this->current_date = date("Y-m-d h:i:s");
        
        
        
       
        
        
    }
    
    
    
    function SQLArray()
    { 
        $array =  array();
      
       // $array[0] = "INSERT INTO `project_details`( `project_name`, `company_id`, `company_name`, `reference_no`, `contract_signed_date`, `phone_number`, `fax_number`, `contact_person`, `address`, `contract_value`, `variations`, `tax_id`, `tax_name`,`tax_value`,`project_description`, `default_date`) VALUES ('".$this->project_name."','".$this->company_id."','".$this->company_name."','".$this->reference_no."','".$this->signed_date."','".$this->contact_phone."','".$this->fax_number."','".$this->contact_person."','".$this->contact_address."','".$this->contract_value."','".$this->variations."','".$this->tax_id."','".$this->tax_name."','".$this->tax_value."','".$this->project_description."','".$this->current_date."')";
        
        $array[0] = "INSERT INTO `project_main_table`( `project_main_name`, `company_id`, `company_name`, `tax_id`, `tax_name`, `tax_value`,`default_date`) VALUES ('".$this->project_name."','".$this->company_id."','".$this->company_name."','".$this->tax_id."','".$this->tax_name."','".$this->tax_percentage."','".$this->current_date."')";
        
        
        $array[1] = "select *,date_format(default_date,'%d/%m/%Y') as default_date from project_main_table where project_status='Active' order by project_main_id desc";
        // $array[2] ="update project_details set `project_name`='".$this->project_name."',`company_id`='".$this->company_id."',`company_name`='".$this->company_name."',`reference_no`='".$this->reference_no."',`contract_signed_date`='".$this->signed_date."', `phone_number`='".$this->contact_phone."',`fax_number`='".$this->fax_number."',`contact_person`='".$this->contact_person."',`address`='".$this->contact_address."',`contract_value`='".$this->contract_value."',`variations`='".$this->variations."',`tax_id`='".$this->tax_id."',`tax_name`='".$this->tax_name."',`tax_value`='".$this->tax_value."',`project_description`='".$this->project_description."' where project_id='".$this->project_id."'";
        
        $array[2] ="update project_main_table set `project_main_name`='".$this->project_name."',`company_id`='".$this->company_id."',`company_name`='".$this->company_name."',`tax_id`='".$this->tax_id."',`tax_name`='".$this->tax_name."',`tax_value`='".$this->tax_percentage."' where project_main_id='".$this->project_id."'";
        
        $array[3] ="update project_main_table set `project_status`='DeActivate' where project_main_id='".$this->project_id."'";
        $array[4]= "SELECT company_id,company_name FROM company_details where status='Active' " ;
       
        $array[6]= "SELECT * FROM company_details where `company_id`='".$this->company_id."' and status='Active' " ;
       
       
        return $array;
    }
    function RequestAccept($FunctionEvents)
    {
        $var =  $this->SQLArray();
      
        switch ($FunctionEvents)
        {

            
            case 'add_project':
                //echo $var[0];
                $this->varModelObj->AddToTable($var[0]);
            break;
            
            
            
            case 'list_project':
            //  echo $var[1];
                $this->varModelObj->ListFromTable($var[1]);
            break;
            
            
            
             case 'edit_project':
               echo $var[2];
                $this->varModelObj->UpdateTable($var[2]);
            break;
            
             case 'cancel_project_entry':
               // echo $var[3];
                $this->varModelObj->UpdateTable($var[3]);
            break;
            
            case 'select_company_name': 
               
                $this->varModelObj->CreateDropDown($var[4],'company_id','company_name',$this->ctrl_name,'Select Company/Client');
            break;
            
            
             case 'display_company_details': 
               
                $this->varModelObj->ListFromTable($var[6]);
            break;
            
            
            case 'select_project_name': 
              // echo $var[4];
               // $this->varModelObj->CreateDropDown($var[4],'project_id','project_name',$this->ctrl_name,'Select Project');
                $this->varModelObj->CreateDropDown($var[7],'project_id','project_name',$this->ctrl_name,'Select Project');
            break;
           
            default:
             echo 'No Action Found...!';
             break;
            
        }

    }
}//end of class

$obj = new companyController();
$obj->RequestAccept($obj->actionevents);
?>