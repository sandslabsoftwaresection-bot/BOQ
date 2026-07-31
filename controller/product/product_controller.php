<?php
session_start();
require ('../../model/common/common_functions.php');

class UnitController
{
    var $varModelObj,$product_code_cnt,$val,$finished_id;
    public $actionevents,$category_id;
    function __construct()
    {
        $this->varModelObj = new CommonModel();
        $this->varDBConnection = $this->varModelObj->varDBConnection;
        $this->actionevents=$_POST['action'];
        $this->category_id=$_POST['category_id'];
        $this->company_id=$_POST['v_company_id'];
        $this->store_id=$_POST['v_store_id'];
        
        
         $this->company_name=$_POST['v_company_name'];
        $this->project_id=$_POST['v_project_id'];
        $this->project_name=$_POST['v_project_name'];
        $this->product_type=$_POST['v_product_type'];
        $this->product_id=$_POST['v_product_id'];
         $this->product_code=$_POST['v_product_code'];
        $this->product_name=$_POST['v_product_name'];
         $this->product_code=$this->varDBConnection->real_escape_string(($this->product_code));;
        $this->product_name = $this->varDBConnection->real_escape_string(($this->product_name));
        $this->category_name=$_POST['v_category_name'];
        $this->item_id=$_POST['v_item_id'];
         $this->item_name=$_POST['v_item_name'];
        $this->required_qty=$_POST['v_required_qty'];
        $this->txt_length=$_POST['v_txt_length'];
        $this->txt_width=$_POST['v_txt_width'];
         $this->txt_height=$_POST['v_txt_height'];
        $this->txt_thickness=$_POST['v_txt_thickness'];
        $this->txt_weight=$_POST['v_txt_weight'];
        $this->total_weight=$_POST['v_total_weight'];
         $this->square_meter=$_POST['v_square_meter'];
        $this->cubic_meter=$_POST['v_cubic_meter'];
        $this->units_name=$_POST['v_units_name'];
        $this->units_id=$_POST['v_units_id'];
         $this->rate_per_unit=$_POST['v_rate_per_unit'];
         
          $this->finished_id=$_POST['v_finished_id'];
       $this->total_amt=$_POST['v_total_amt'];
       $this->labour_cost_type=$_POST['v_labour_cost_type'];
       $this->labour_cost=$_POST['v_labour_cost'];
       $this->service_cost_type=$_POST['v_service_cost_type'];
       $this->service_cost=$_POST['v_service_cost'];
       $this->euipment_cost_type=$_POST['v_euipment_cost_type'];
       $this->euipment_cost=$_POST['v_euipment_cost'];
       $this->other_cost_type=$_POST['v_other_cost_type'];
       $this->other_cost=$_POST['v_other_cost'];
       $this->margin_cost_type=$_POST['v_margin_cost_type'];
       $this->margin_cost=$_POST['v_margin_cost'];
       $this->finished_id_last=$_POST['v_finished_id_last'];
       $this->product_item_id=$_POST['v_product_item_id'];
       $this->product_mast_item_id=$_POST['v_master_product_id'];
        $this->v_item_idnew=$_POST['v_item_idnew'];
        $this->pdt_rate_per_cal=$_POST['v_pdt_rate_per_cal'];
       
       $this->labour_cost_amnt=$_POST['v_labour_cost_amnt'];
       $this->service_cost_amnt=$_POST['v_service_cost_amnt'];
       $this->euipment_cost_amnt=$_POST['v_euipment_cost_amnt'];
        $this->other_cost_amnt=$_POST['v_other_cost_amnt'];
        $this->margin_cost_amnt=$_POST['v_margin_cost_amnt']; 
        $this->txt_tot_amount=$_POST['txt_tot_amount'];
        
        $this->vat_percentage=$_POST['vat_percentage']; 
        $this->vat_amount=$_POST['vat_amount'];
        $this->vat_prct_amount=$_POST['vat_prct_amount'];
        $this->sec_unit_id=$_POST['sec_unit_id'];
        $this->sec_unit_name=$_POST['sec_unit_name'];
        $this->sec_rate_per_unit=$_POST['sec_rate_per_unit'];
        $this->sec_total_amt=$_POST['sec_total_amt'];
        $this->product_qty=$_POST['v_product_qty'];
        $this->product_unit_id=$_POST['v_product_unit_id'];
        $this->product_unit_name=$_POST['v_product_unit_name'];
        $this->quantity=$_POST['v_quantity'];
        $this->v_total_amount_report=$_POST['v_total_amount_report'];
        
        $this->primary_cost_project_id=$_POST['primary_cost_project_id'];
        $this->v_finished_product_id=$_POST['v_finished_product_id'];
		
		$this->v_product_name=$_POST['product_name'];
    }
    function SQLArray()
    { 
        $array =  array();
      
        $array[0] = "SELECT store_id,item_code,item_name,store_status FROM store_details_entry where category_id='".$_POST["category_id"]."'";
        $array[1]= "SELECT company_id,company_name FROM company_details where status='Active' " ;
        $array[2]= "SELECT project_main_id,project_main_name FROM project_main_table  where company_id='".$this->company_id."' and project_status='Active' " ;
        $array[3]="select * from store_details_entry where store_id='".$this->store_id."'";
        
        $array[4]= "call proc_add_master_prod_item_details(".$this->product_id.",'".$this->product_name."','".$this->category_id."','".$this->category_name."','".$this->item_id."','".$this->item_name."','".$this->required_qty."','".$this->txt_length."','".$this->txt_width."','".$this->txt_thickness."','".$this->txt_weight."','".$this->total_weight."','".$this->square_meter."','".$this->cubic_meter."','".$this->units_name."','".$this->total_amt."','".$this->units_id."','".$this->rate_per_unit."','".$this->store_id."','".$this->vat_percentage."','".$this->vat_amount."','".$this->vat_prct_amount."','".$this->sec_unit_id."','".$this->sec_unit_name."','".$this->sec_rate_per_unit."','".$this->sec_total_amt."',@msg)";
        
        $array[5]= "SELECT * FROM `product_item_details_entry` where finished_product_id='".$this->finished_id."' ";
        $array[6]="delete from master_product_item_details_entry where master_product_item_id='".$this->product_mast_item_id."'";
       
        $array[7]= "SELECT finished_product_id,product_name FROM  master_finished_product_table where product_code='". $this->product_code."'";
        
        $array[8]= "call proc_update_finished_product('".$this->finished_id."','".$this->labour_cost_type."','".$this->labour_cost."','".$this->service_cost_type."','".$this->service_cost."','".$this->euipment_cost_type."','".$this->euipment_cost."','".$this->other_cost_type."','".$this->other_cost."','".$this->margin_cost_type."','".$this->margin_cost."','".$this->company_id."','".$this->company_name."','".$this->project_id."','".$this->project_name."','".$this->product_code."','".$this->product_name."','".$this->product_qty."','".$this->product_unit_id."','".$this->product_unit_name."','".$this->txt_tot_amount."','".$this->pdt_rate_per_cal."','". $this->labour_cost_amnt."','".$this->service_cost_amnt."','".$this->euipment_cost_amnt."','".$this->other_cost_amnt."','".$this->margin_cost_amnt."','".$this->v_total_amount_report."')";
        
        $array[9]= "call proc_add_master_finished_product('".$this->finished_id."','".$this->product_code."')";
        
        $array[10]= "SELECT product_code,product_name FROM  master_finished_product_table where product_code='". $this->product_code."'";
        
        $array[11]= "call proc_add_after_change_product('".$this->company_id."','".$this->company_name."','".$this->project_id."','".$this->project_name."','".$this->product_code."','".$this->product_name."',@msg)";
           
        $array[12]= "call proc_add_existing_product('".$this->finished_id_last."','".$this->company_id."','".$this->company_name."','".$this->project_id."','".$this->project_name."','".$this->product_type."','".$this->product_id."','".$this->product_code."','".$this->product_name."','".$this->category_id."','".$this->category_name."','".$this->item_id."','".$this->item_name."','".$this->required_qty."','".$this->txt_length."','".$this->txt_width."','".$this->txt_height."','".$this->txt_thickness."','".$this->txt_weight."','".$this->total_weight."','".$this->square_meter."','".$this->cubic_meter."','".$this->units_name."','".$this->units_id."','".$this->rate_per_unit."','".$this->total_amt."','".$this->store_id."','".$this->vat_percentage."','".$this->vat_amount."','".$this->vat_prct_amount."','".$this->sec_unit_id."','".$this->sec_unit_name."','".$this->sec_rate_per_unit."','".$this->sec_total_amt."',@msg)";
        
        $array[13]= "call proc_add_to_master_item_details('".$this->product_item_id."','".$this->product_code."')";
        
        $array[14]= "SELECT * FROM `master_finished_products`";
        $array[15]= "SELECT * FROM `master_finished_products` where item_status='Confirmed' group by `product_code` order by `master_product_item_id`desc";
        $array[16]= "SELECT * FROM `master_product_item_details_entry` where product_code='".$this->product_code."'";
        $array[17]= "SELECT * FROM `master_product_item_details_entry` where master_finished_product_id=".$this->finished_id_last."";
        $array[18]= "call proc_update_finished_prod('".$this->labour_cost_type."','".$this->labour_cost."','".$this->service_cost_type."','".$this->service_cost."','".$this->euipment_cost_type."','".$this->euipment_cost."','".$this->other_cost_type."','".$this->other_cost."','".$this->margin_cost_type."','".$this->margin_cost."',".$this->product_id.",'".$this->pdt_rate_per_cal."','". $this->labour_cost_amnt."','".$this->service_cost_amnt."','".$this->euipment_cost_amnt."','".$this->other_cost_amnt."','".$this->margin_cost_amnt."','".$this->txt_tot_amount."')";
        $array[19]= "select * from store_details_entry where store_status='Pending' and item_code='".$this->item_id."'";
        
        $array[20]= "call proc_add_prod_item_details('".$this->company_id."','".$this->company_name."','".$this->project_id."','".$this->project_name."','".$this->product_id."','".$this->product_type."','".$this->product_code."','".$this->product_name."','".$this->category_id."','".$this->category_name."','".$this->item_id."','".$this->item_name."','".$this->required_qty."','".$this->txt_length."','".$this->txt_width."','".$this->txt_thickness."','".$this->txt_weight."','".$this->total_weight."','".$this->square_meter."','".$this->cubic_meter."','".$this->units_name."','".$this->total_amt."','".$this->units_id."','".$this->rate_per_unit."','".$this->store_id."','".$this->vat_percentage."','".$this->vat_amount."','".$this->vat_prct_amount."','".$this->sec_unit_id."','".$this->sec_unit_name."','".$this->sec_rate_per_unit."','".$this->sec_total_amt."',@msg)";
        
        $array[21]= "delete from product_item_details_entry where product_item_id='".$this->product_id."'";
        
        $array[22]= "SELECT *,CONCAT('Company  : ',company_name,', Project  : ',project_name) AS pjt_company FROM `finished_product_table` where finished_item_status='Confirmed' order by `finished_product_id`desc";
        
        $array[23]= "SELECT * FROM `product_item_details_entry` where product_name='".$this->product_name."' and company_id='".$this->company_id."' and finished_product_id='".$this->v_finished_product_id."'";
        $array[24]="select * from store_details_entry where store_id='".$this->store_id."'";
        //$array[25]= "select * from store_details_entry where store_status='Pending' and item_code='".$this->v_item_idnew."'";
        $array[25]= "UPDATE `product_item_details_entry` SET `quantity`='".$this->quantity."',`total_amount`='".$this->total_amt."',`total_weight`='". $this->total_weight."',`square_meter`='".$this->square_meter ."',`cubic_meter`='". $this->cubic_meter."' WHERE `product_item_id`='".$this->product_item_id."'";
        $array[26]= "select * from store_details_entry where store_status='Pending' and item_code='".$this->item_id."'";
        
        $array[27]="call proc_delete_product_details('".$this->product_id."')";
       
       $array[28]= "select * from finished_product_table where finished_item_status='Confirmed'and company_id='".$this->company_id."' and project_id='".$this->project_id."' group by finished_product_id";
        //$array[29]= "SELECT * FROM view_finished_product_details where finished_item_status='Confirmed'and company_id='".$this->company_id."' and project_id='".$this->project_id."' group by finished_product_id";
       $array[29]= "SELECT *,(product_rate_per_unit_cost*project_tax_value)/100 as vat_amt,((product_rate_per_unit_cost*project_tax_value)/100)+product_rate_per_unit_cost as unit_price_after_tax,product_qty*(((product_rate_per_unit_cost*project_tax_value)/100)+product_rate_per_unit_cost) as total_amt FROM view_finished_product_details_with_vat where finished_item_status='Confirmed'and company_id='".$this->company_id."' and project_id='".$this->project_id."' group by finished_product_id";
      
      
    //  $array[30]= "SELECT *,sum(total_weight)as prod_total_weight,sum(square_meter) as prod_square_meter,sum(cubic_meter) as prod_cubic_meter FROM view_finished_product_details where finished_item_status='Confirmed'and company_id='".$this->company_id."' and project_id='".$this->project_id."' group by finished_product_id";
       $array[30]= "SELECT finished_product_id,item_id,project_name,product_name,sec_rate_per_unit,sec_unit_name,item_name,category_name,sum(total_weight)as prod_total_weight,sum(square_meter) as prod_square_meter,sum(cubic_meter) as prod_cubic_meter, sum(quantity) as item_quntity,sum(sec_total_amt) as sec_total FROM view_finished_product_details where finished_item_status='Confirmed'and company_id='".$this->company_id."' and project_id='".$this->project_id."' group by item_id";
      
        $array[31]= "SELECT *,sum(quantity)as item_total_qty,(sum(quantity)*rate_per_unit) as item_total_amnt,sum(vat_prct_amount) as tot_vat_prct_amount,sum(quantity*vat_amount) as tot_item_total_amnt FROM view_finished_product_details where finished_item_status='Confirmed' and company_id='".$this->company_id."' and project_id='".$this->project_id."' group by item_name";
      
      $array[32]= "SELECT tax_value FROM project_main_table where project_main_id='".$this->project_id."'";
       $array[33]= "SELECT sum(total_amt_report) as prod_total_amnt FROM finished_product_table where finished_item_status='Confirmed'and company_id='".$this->company_id."' and project_id='".$this->project_id."'" ;
       $array[34]= "SELECT item_total_amnt, sum(item_total_amnt) AS item_total_total_amnt FROM (SELECT (sum(quantity)*vat_amount) AS item_total_amnt,finished_item_status,company_id,project_id,item_name FROM view_finished_product_details where finished_item_status='Confirmed'and company_id='".$this->company_id."' and project_id='".$this->project_id."' group by item_name) AS tot ;" ;
       $array[35]= "SELECT *,trim(product_unit) as product_unit FROM `view_finished_product_details_new` where finished_product_id='".$this->finished_id."' ";
       $array[36]= "call proc_update_finished_product_details('".$this->finished_id."','".$this->company_id."','".$this->company_name."','".$this->project_id."','".$this->project_name."','".$this->labour_cost_type."','".$this->labour_cost."','".$this->service_cost_type."','".$this->service_cost."','".$this->euipment_cost_type."','".$this->euipment_cost."','".$this->other_cost_type."','".$this->other_cost."','".$this->margin_cost_type."','".$this->margin_cost."','".$this->product_qty."','".$this->product_unit_id."','".$this->product_unit_name."','".$this->txt_tot_amount."','".$this->pdt_rate_per_cal."','". $this->labour_cost_amnt."','".$this->service_cost_amnt."','".$this->euipment_cost_amnt."','".$this->other_cost_amnt."','".$this->margin_cost_amnt."','".$this->v_total_amount_report."','".$this->product_name."')";
       $array[37]= "call proc_add_existing_product_new('".$this->finished_id_last."','".$this->company_id."','".$this->company_name."','".$this->project_id."','".$this->project_name."','".$this->product_type."','".$this->product_id."','".$this->product_code."','".$this->product_name."','".$this->category_id."','".$this->category_name."','".$this->item_id."','".$this->item_name."','".$this->required_qty."','".$this->txt_length."','".$this->txt_width."','".$this->txt_height."','".$this->txt_thickness."','".$this->txt_weight."','".$this->total_weight."','".$this->square_meter."','".$this->cubic_meter."','".$this->units_name."','".$this->units_id."','".$this->rate_per_unit."','".$this->total_amt."','".$this->store_id."','".$this->vat_percentage."','".$this->vat_amount."','".$this->vat_prct_amount."','".$this->sec_unit_id."','".$this->sec_unit_name."','".$this->sec_rate_per_unit."','".$this->sec_total_amt."')";
       
       $array[38] = "SELECT product_name FROM master_finished_product_table WHERE product_name LIKE '%" . $this->v_product_name . "%' ";
	   
	   $array[39] = "SELECT count(*) as count FROM  master_finished_product_table WHERE product_name='".$this->product_name."' ";
	   
	   $array[40]= "UPDATE `store_details_entry` SET `rate_per_unit`='".$this->rate_per_unit."',`vat_percentage`='".$this->vat_percentage."',`vat_amount`='". $this->vat_amount."',`amount`='".$this->txt_tot_amount ."' WHERE `store_id`='".$this->store_id."'";
       
        $array[41]= "SELECT *,CONCAT('Company  : ',company_name,', Project  : ',project_name) AS pjt_company FROM `finished_product_table` where finished_item_status='Confirmed' and project_id='".$this->project_id."' order by `finished_product_id`desc";
        


        return $array;
    }
	 
	 
	
	
    function RequestAccept($FunctionEvents)
    {
        $var =  $this->SQLArray();
      
        switch ($FunctionEvents)
        {
            
            case 'list_items': 
                
                $this->varModelObj->CreateDropDownForItem($var[0],'store_id','item_code','item_name',$this->ctrl_name,'Select Item');
                
            break;
            
            
             case 'select_company_name': 
               
                $this->varModelObj->CreateDropDown($var[1],'company_id','company_name',$this->ctrl_name,'Select Company');
                
            break;
          
             case 'display_project_details': 
               
                //echo $var[2];
                $this->varModelObj->CreateDropDown($var[2],'project_main_id','project_main_name',$this->ctrl_name,'Select Project');
                
            break;
            
            
            
            case 'list_secondary_details': 
               
               // echo $var[3];
                $this->varModelObj->ListFromTable($var[3]);
                
            break;
            
           
            case 'list_item_details':
            //   echo $var[5];
              
              $this->varModelObj->ListFromTable($var[5]);
            
            break;
             case 'cancel_product_details':
               //echo $var[6];
               
               $this->varModelObj->DeleteRow($var[6]);
            
            break;
            case 'add_to_finished_product':
              
                $this->varModelObj->ExecuteProcedure($var[4]);
			    //echo "id : ".$lastid;
				// $maxBatchCodeQuery = "SELECT MAX(CAST(product_code AS SIGNED)) as max_item_code FROM master_finished_product_table";
                // $result = $this->varModelObj->ExecuteSQLQuery($maxBatchCodeQuery);
                // $row = mysqli_fetch_assoc($result);
                // $maxBatchCode = $row['max_item_code'];
                //echo "code : ".$maxBatchCode;
                // $nextBatchCode = $maxBatchCode + 1;
				//echo "max :".$nextBatchCode;
                // $updateQuery = "UPDATE master_finished_product_table SET product_code = '".$nextBatchCode."' WHERE master_finished_product_id = '".$lastid."'";
                // $this->varModelObj->UpdateTable($updateQuery);
				
            break;
            
            case 'check_product_code':
              //echo $var[7];
              if($this->varModelObj->ReturnCountValue($var[10])==0)
              {
                  echo "not exist";
              }
              else
              {
            echo 1;
              }
            break;
             
            case 'add_to_product':
              // echo $var[8];
              
               $this->varModelObj->ExecuteProcedure($var[8]);
               
            break; 
            
            case 'add_to_master':
               //echo $var[9];
              
               $this->varModelObj->ExecuteProcedure($var[9]);
               
            break; 
            
           case 'add_existing_items_to_product':
              // echo $var[11];
              
              $this->varModelObj->ExecuteProcedure($var[11]);
              
            break;
            
            case 'add_to_finished_product_existing':
             //echo $var[12];
              
              $this->varModelObj->ExecuteProcedure($var[12]);
              
            break;
          
            case 'add_item_to_master':
             //echo $var[13];
              
              $this->varModelObj->ExecuteProcedure($var[13]);
              
            break;
            
            case 'list_product_details':
             //echo $var[14];
              
              $this->varModelObj->ListFromTable($var[14]);
              
            break;
            case 'list_product_details_display':
              //echo $var[17];
              
              $this->varModelObj->ListFromTable($var[17]);
              
            break;
            
            
            case 'list_all_product_details':
             //echo $var[15];
              
              $this->varModelObj->ListFromTable($var[15]);
               
            break;
            case 'list_all_product_item_details':
             //echo $var[16];
              
              $this->varModelObj->ListFromTable($var[16]);
              
            break;
            
            case 'add_to_master_master':
               //echo $var[18];
              
               $this->varModelObj->ExecuteProcedure($var[18]);
               
            break;
            
            case 'list_store_details': 
              //   echo $var[19];
                $this->varModelObj->ListFromTable($var[19]);
                
            break;
            case 'list_store_details_company_select': 
                 //echo $var[25];
                $this->varModelObj->ListFromTable($var[26]);
                
            break;
            case 'add_to_finished_product_new':
               //echo $var[20];
              
              $this->varModelObj->ExecuteProcedure($var[20]);
              //$this->val = $this->varModelObj->ListFromTable($var[7]);
              //echo $this->val;
            break;
            
            case 'cancel_product_item_details':
               //echo $var[21];
              
               $this->varModelObj->DeleteRow($var[21]);
            
            break;
            
            case 'list_all_finihed_product_details':
             //echo $var[22];
              
              $this->varModelObj->ListFromTable($var[22]);
              
            break;
            
            case 'list_all_finihed_product_item_details':
             //echo $var[23];
              
              $this->varModelObj->ListFromTable($var[23]);
              
            break;
            case 'list_secondary_details_company': 
               
            //   echo $var[24];
                $this->varModelObj->ListFromTable($var[24]);
                
            break;
            case 'update_item_qty': 
               
            //   echo $var[25];
                $this->varModelObj->UpdateTable($var[25]);
                
            break;
            case 'delete_product_details': 
               
            //   echo $var[27];
                $this->varModelObj->ExecuteProcedure($var[27]);
                
            break;
            case 'list_product_report': 
                 //echo $var[28];
                $this->varModelObj->ListFromTable($var[28]);
                
            break;
             case 'list_product_report_primary_cost': 
                // echo $var[29];
                $this->varModelObj->ListFromTable($var[29]);
                
            break;
            case 'list_product_report_secondary_cost': 
                // echo $var[30];
                $this->varModelObj->ListFromTable($var[30]);
                
            break;
            case 'list_product_report_material_list': 
                // echo $var[31];
                $this->varModelObj->ListFromTable($var[31]);
                
            break;
            
            case 'find_vat_for_project': 
                // echo $var[32];
                $this->varModelObj->ListFromTable($var[32]);
                
            break;
            case 'find_total_amnt_product': 
                // echo $var[33];
                $this->varModelObj->ListFromTable($var[33]);
                
            break;
            case 'find_total_amnt_item': 
                // echo $var[34];
                $this->varModelObj->ListFromTable($var[34]);
                
            break;
            case 'list_item_details_for_edit': 
                //  echo $var[35];
                $this->varModelObj->ListFromTable($var[35]);
                
            break;
            case 'finished_product_edit_details': 
                 //echo $var[36];
                $this->varModelObj->ExecuteProcedure($var[36]);
            break;
            case 'add_to_finished_product_existing_new':
             //echo $var[12];
              
              $this->varModelObj->ExecuteProcedure($var[37]);
                
            break;
			
			case 'fetch_product': 
                //echo $var[38];
				header("Content-Type: application/json"); // Specify JSON content type
                echo $this->varModelObj->ListFromTableWithOutData($var[38]);
				exit();
            break;
			
			 case 'check_product_name':
			 
                $this->varModelObj->check_user_count($var[39]);
             
            break;
			
			case 'edit_store_item_details': 
			
                $this->varModelObj->UpdateTable($var[40]);
                
            break;
            
            case 'list_all_finihed_product_details_project':
                // echo $var[41];
                 $this->varModelObj->ListFromTable($var[41]);
                
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