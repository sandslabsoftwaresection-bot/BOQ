<?php
session_start();
require ('../../model/common/common_functions.php');

class StoreController
{
    var $varModelObj;
    public $actionevents,$category_id,$category_name,$category_status,$vat_amount,$txt_amount,$item_code;
    function __construct()
    {
        $this->varModelObj = new CommonModel();
        $this->varDBConnection = $this->varModelObj->varDBConnection;
        $this->actionevents=$_POST['action'];
        $this->category_name=$this->varDBConnection->real_escape_string($_POST['category_name']);
        $this->category_id=$_POST['category_id'];
        $this->category_status=$_POST['category_status'];
        $this->v_item_code=$this->varDBConnection->real_escape_string($_POST['v_item_code']);
        $this->v_item_name=$this->varDBConnection->real_escape_string($_POST['v_item_name']);
        $this->v_unit_id=$this->varDBConnection->real_escape_string($_POST['v_unit_id']);
        $this->v_unit_name=$this->varDBConnection->real_escape_string($_POST['v_unit_name']);
        $this->v_primary_rate_per_unit=$this->varDBConnection->real_escape_string($_POST['v_primary_rate_per_unit']);
        $this->v_tax_id=$this->varDBConnection->real_escape_string($_POST['v_tax_id']);
        $this->v_tax_name=$this->varDBConnection->real_escape_string($_POST['v_tax_name']);
        $this->v_tax_percentage=$this->varDBConnection->real_escape_string($_POST['v_tax_percentage']);
            
            
        $this->v_vat_amount=$this->varDBConnection->real_escape_string($_POST['v_vat_amount']);
            
        $this->v_txt_amount=$this->varDBConnection->real_escape_string($_POST['v_txt_amount']);
            
        $this->v_txt_precision=$this->varDBConnection->real_escape_string($_POST['v_txt_precision']);
        $this->v_txt_length=$this->varDBConnection->real_escape_string($_POST['v_txt_length']);
        $this->v_txt_width=$this->varDBConnection->real_escape_string($_POST['v_txt_width']);
        $this->v_txt_height=$this->varDBConnection->real_escape_string($_POST['v_txt_height']);
        $this->v_txt_thickness=$this->varDBConnection->real_escape_string($_POST['v_txt_thickness']);
        $this->v_txt_weight=$this->varDBConnection->real_escape_string($_POST['v_txt_weight']);
        $this->v_sec_unit_id=$this->varDBConnection->real_escape_string($_POST['v_sec_unit_id']);
        $this->v_sec_unit_name=$this->varDBConnection->real_escape_string($_POST['v_sec_unit_name']);
        $this->v_total_weight=$this->varDBConnection->real_escape_string($_POST['v_total_weight']);
        $this->v_txt_secondary_rate_per_unit=$this->varDBConnection->real_escape_string($_POST['v_txt_secondary_rate_per_unit']);
        $this->upload_item_image=$this->varDBConnection->real_escape_string($_POST['upload_item_image']);
        $this->v_square_meter=$this->varDBConnection->real_escape_string($_POST['square_meter']);
        $this->v_cubic_meter=$this->varDBConnection->real_escape_string($_POST['cubic_meter']);
        $this->store_id=$_POST['v_store_id'];
		
		$this->item_name=$_POST['item_name'];
        
        date_default_timezone_set('Asia/Bahrain');
        $this->current_date = date("Y-m-d h:i:s");
       
        
    }
    function SQLArray()
    {  
        $array =  array();
      
        $array[0] = "SELECT category_id,category_name FROM category where category_status = 'Active' ";
        $array[1] = "SELECT unit_id,unit_name FROM unit_details where unit_status = 'Active' ";
        $array[2]= "SELECT tax_id,tax_name,tax_value FROM tax_details where status='Active' ORDER BY (`tax_value` = '5') DESC, `tax_value`" ;
        $array[3]="INSERT INTO `store_details_entry`( `category_id`, `category_name`, `item_code`, `item_name`, `unit_id`, `unit_name`, `rate_per_unit`, `vat_id`, `vat_name`, `vat_percentage`, `vat_amount`, `amount`, `precision_percentage`, `length`, `width`, `height`, `thickness`, `weight`, `sec_unit_id`, `sec_unit_name`, `total_weight`, `sec_rate_per_unit`, `session_image`, `default_date`,`square_meter`,`cubic_meter`) VALUES ('".$this->category_id."','".$this->category_name."','".$this->v_item_code."','".$this->v_item_name."','".$this->v_unit_id."','".$this->v_unit_name."','".$this->v_primary_rate_per_unit."','0','VAT','".$this->v_tax_percentage."','".$this->v_vat_amount."','".$this->v_txt_amount."','".$this->v_txt_precision."','".$this->v_txt_length."','".$this->v_txt_width."','".$this->v_txt_height."','".$this->v_txt_thickness."','".$this->v_txt_weight."','".$this->v_sec_unit_id."','".$this->v_sec_unit_name."','".$this->v_total_weight."','".$this->v_txt_secondary_rate_per_unit."','".$this->upload_item_image."','".$this->current_date."','".$this->v_square_meter."','".$this->v_cubic_meter."')";
        
        $array[4]="select * from store_details_entry where store_status='Pending' order by store_id desc";
        
        $array[5] ="update store_details_entry set `category_id`='".$this->category_id."',`category_name`='".$this->category_name."',`item_name`='".$this->v_item_name."',`unit_id`='".$this->v_unit_id."',`unit_name`='".$this->v_unit_name."',`rate_per_unit`='".$this->v_primary_rate_per_unit."',`vat_id`='".$this->v_tax_id."',`vat_name`='".$this->v_tax_name."',`vat_percentage`='".$this->v_tax_percentage."',`vat_amount`='".$this->v_vat_amount."',`amount`='".$this->v_txt_amount."',`precision_percentage`='".$this->v_txt_precision."',`length`='".$this->v_txt_length."',`width`='".$this->v_txt_width."',`height`='".$this->v_txt_height."',`thickness`='".$this->v_txt_thickness."',`weight`='".$this->v_txt_weight."',`sec_unit_id`='".$this->v_sec_unit_id."',`sec_unit_name`='".$this->v_sec_unit_name."',`total_weight`='".$this->v_total_weight."',`sec_rate_per_unit`='".$this->v_txt_secondary_rate_per_unit."',`session_image`='".$this->upload_item_image."',`square_meter`='".$this->v_square_meter."',`cubic_meter`='".$this->v_cubic_meter."' where store_id='".$this->store_id."'";
        $array[6] ="update store_details_entry set `store_status`='DeActive' where store_id='".$this->store_id."'";
        
        $array[7] = "SELECT item_name FROM store_details_entry where item_name LIKE '%" . $this->item_name . "%' ";
		
		$array[8] = "SELECT count(*) as count FROM  store_details_entry WHERE item_name='".$this->item_name."' ";
        // $array[7] = "SELECT item_code,item_name FROM store_details_entry where item_code = '".$this->v_item_code."' ";
        
        $array[9]="SELECT * FROM tax_details WHERE status = 'Active' LIMIT 1";
        $array[10] = "SELECT unit_id,unit_name FROM unit_details where unit_status = 'Active' and unit_id  in (6,10,11)";
        
        return $array;
    }
    function RequestAccept($FunctionEvents)
    {
        $var =  $this->SQLArray();
      
        switch ($FunctionEvents)
        {
            
            case 'list_category': 
                
                $this->varModelObj->CreateDropDown($var[0],'category_id','category_name',$this->ctrl_name,'Select Category');
                
            break;
            
            
            
            case 'list_units': 
                //echo $var[1];
                $this->varModelObj->CreateDropDown($var[1],'unit_id','unit_name',$this->ctrl_name,'Select Unit');
                
            break;
             
             case 'list_tax': 
               
                $this->varModelObj->CreateDropDownfortax($var[2],'tax_id','tax_name','tax_value',$this->ctrl_name);
            break;
            
            
            case 'list_secondary_unit': 
                //echo $var[1];
                $this->varModelObj->CreateDropDown($var[10],'unit_id','unit_name',$this->ctrl_name,'Select Unit');
                
            break;
            
            case 'add_store_details':
                $last_id = $this->varModelObj->AddToTable($var[3]);
				echo "id : ".$last_id;
				$maxBatchCodeQuery = "SELECT MAX(CAST(item_code AS SIGNED)) as max_item_code FROM store_details_entry";
                $result = $this->varModelObj->ExecuteSQLQuery($maxBatchCodeQuery);
                $row = mysqli_fetch_assoc($result);
                $maxBatchCode = $row['max_item_code'];
                echo "code : ".$maxBatchCode;
                $nextBatchCode = $maxBatchCode + 1;
                
                $updateQuery = "UPDATE store_details_entry SET item_code = '".$nextBatchCode."' WHERE store_id = '".$last_id ."'";
                $this->varModelObj->UpdateTable($updateQuery);
			break;
            
            
            case 'list_store_details': 
                //  echo $var[4];
                $this->varModelObj->ListFromTable($var[4]);
                
            break;
             
            case 'cancel_store_details':
                 
                
                 echo $var[6];
                $this->varModelObj->UpdateTable($var[6]);
                
            break;
             

            
            case 'update_store_details':    
                
                 echo $var[5];
               
                 $this->varModelObj->UpdateTable($var[5]);
           
             
            break;
              
            // case 'item_code_check':    
             
            //     if($this->varModelObj->ReturnCountValue($var[7])==0)
            //     {
            //         echo "not exist";
            //     }
            //     else
            //     {
            // //$this->item_code= $this->varModelObj->ListFromTable($var[7]);
            //     echo  1;
            //  //  if($this->product_code_cnt)
            //     }
            // break; 
 
			case 'fetch_item': 
                //echo $var[7];
				header("Content-Type: application/json"); // Specify JSON content type
                echo $this->varModelObj->ListFromTableWithOutData($var[7]);
				exit();
            break;
			
			case 'check_item_name': 
			  
                $this->varModelObj->check_user_count($var[8]);
             
            break;
			
			case 'fetch_tax': 
                $this->varModelObj->ListFromTable($var[9]);
            break;
			
			 default:
			 echo 'No Action Found...!';
			 break;
                
        }

    }
}//end of class
$obj = new StoreController();
$obj->RequestAccept($obj->actionevents);
?>