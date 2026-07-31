<?php
session_start();
require ('../../model/common/common_functions.php');

class QuickController {
    var $varModelObj, $varDBConnection;
    public $actionevents, $project_name,$product_name,$total_item, $labour_cost_type, $labour_cost, $service_cost_type, $service_cost, $euipment_cost_type, $euipment_cost, $other_cost_type, $other_cost, $margin_cost_type, $margin_cost, $pdt_rate_per_cal, $labour_cost_amnt, $service_cost_amnt, $euipment_cost_amnt, $other_cost_amnt, $margin_cost_amnt, $txt_tot_amount,$vat_percentage,$vat_prct_amount,$vat_amount,$rate_per_item, $project_code;

    function __construct() {
        $this->varModelObj = new CommonModel();
        $this->varDBConnection = $this->varModelObj->varDBConnection;
        
        $this->actionevents = $_POST['action'];
        $this->project_name = $_POST['v_project_name'];
        $this->product_name = $_POST['v_product_name'];
        $this->total_item = $_POST['v_total_item'];
        $this->labour_cost_type = $_POST['v_labour_cost_type'];
        $this->labour_cost = $_POST['v_labour_cost'];
        $this->service_cost_type = $_POST['v_service_cost_type'];
        $this->service_cost = $_POST['v_service_cost'];
        $this->euipment_cost_type = $_POST['v_euipment_cost_type'];
        $this->euipment_cost = $_POST['v_euipment_cost'];
        $this->other_cost_type = $_POST['v_other_cost_type'];
        $this->other_cost = $_POST['v_other_cost'];
        $this->margin_cost_type = $_POST['v_margin_cost_type'];
        $this->margin_cost = $_POST['v_margin_cost'];
        $this->pdt_rate_per_cal = $_POST['v_pdt_rate_per_cal'];
        $this->labour_cost_amnt = $_POST['v_labour_cost_amnt'];
        $this->service_cost_amnt = $_POST['v_service_cost_amnt'];
        $this->euipment_cost_amnt = $_POST['v_euipment_cost_amnt'];
        $this->other_cost_amnt = $_POST['v_other_cost_amnt'];
        $this->margin_cost_amnt = $_POST['v_margin_cost_amnt'];
        $this->txt_tot_amount = $_POST['txt_tot_amount'];
        $this->vat_percentage = $_POST['v_vat_percentage'];
        $this->vat_prct_amount = $_POST['vat_prct_amount'];
        $this->vat_amount = $_POST['v_vat_total_amount'];
        $this->rate_per_item = $_POST['rate_per_item'];
        
        $this->project_code = $_POST['v_project_code'];
    }
    
    function SQLArray() { 
        // The stored procedure call and SELECT statement
        $array =  array();
        $array[0] = "INSERT INTO `master_finished_quick_product_table`( `project_name`, `product_name`, `total_item`, `vat_percentage`, `vat_prct_amount`, `vat_amount`, `labour_cost_type`, `labour_cost`, `service_cost_type`, `service_cost`, `equipment_cost_type`, `equipment_cost`, `other_cost_type`, `other_cost`, `margin_cost_type`, `margin_cost`, `project_rate_per_unit_cost`, `labour_cost_amt`, `service_cost_amt`, `equipment_cost_amt`, `other_cost_amt`, `margin_cost_amt`, `project_item_primary_amt`,`item_per_rate`) VALUES ('".$this->project_name."','".$this->product_name."','".$this->total_item."','".$this->vat_percentage."','".$this->vat_prct_amount."','".$this->vat_amount."','".$this->labour_cost_type."','".$this->labour_cost."','".$this->service_cost_type."','".$this->service_cost."','".$this->euipment_cost_type."','".$this->euipment_cost."','".$this->other_cost_type."','".$this->other_cost."','".$this->margin_cost_type."','".$this->margin_cost."','".$this->pdt_rate_per_cal."','".$this->labour_cost_amnt."','".$this->service_cost_amnt."','".$this->euipment_cost_amnt."','".$this->other_cost_amnt."','".$this->margin_cost_amnt."','".$this->txt_tot_amount."','".$this->rate_per_item."')";
        $array[1]= "SELECT * FROM `master_finished_quick_product_table` where project_status='Confirmed' group by `project_code` order by `master_finished_quick_id`desc";
        $array[2]= "SELECT * FROM `master_finished_quick_item_details_entry` where project_id='".$this->project_code."'";
        return $array;
    }

    function RequestAccept($FunctionEvents) {
        $var = $this->SQLArray();
        
        switch ($FunctionEvents) {
            case 'add_to_master_master':
                // Call the model's method to add to the table
                $res = $this->varModelObj->AddToTable($var[0]);
            
                if ($res != 0) {
                    // Update the `master_finished_quick_product_table`
                    $sql = "UPDATE `master_finished_quick_product_table` SET `project_code` = '$res' WHERE `master_finished_quick_id` = '$res'";
                    $this->varModelObj->UpdateTable($sql);
            
                    // Decode the product details from POST
                    $productDetails = json_decode($_POST['product_details'], true);
            
                    // Check if $productDetails is valid
                    if (!is_array($productDetails)) {
                        echo "Error: Invalid product details data.";
                        break;
                    }
            
                    // Start building the query
                    $insertQuery = "INSERT INTO `master_finished_quick_item_details_entry`(`master_product_quick_id`, `project_id`, `project_name`, `item_name`, `quantity`, `units`, `rate_per_unit`, `total_amount`) VALUES ";
                    $valuesArray = [];
            
                    // Iterate through each product detail and construct values for the query
                    foreach ($productDetails as $product) {
                        // Ensure to sanitize the inputs
                        $projectName = $this->project_name;
                        $itemName =$product['item_name'];
                        $quantity = (int)$product['quantity'];
                        $units =  $product['units'];
                        $ratePerUnit = (float)$product['rate_unit'];
                        $totalAmount = (float)$product['amount'];
            
                        // Add the sanitized values to the array
                        $valuesArray[] = "('$res', '$res', '$projectName', '$itemName', $quantity, '$units', $ratePerUnit, $totalAmount)";
                    }
            
                    // Join the values and complete the query
                    $insertQuery .= implode(", ", $valuesArray);
                    // Execute the query
                    $insertResult = $this->varModelObj->UpdateTable($insertQuery);
                } else {
                    echo "Error: Failed to add to master table.";
                }
            break;
            case 'list_all_project_details':
                $this->varModelObj->ListFromTable($var[1]);
            break;
            case 'list_all_project_item_details':
                $this->varModelObj->ListFromTable($var[2]);
            break;

            default:
                echo 'No Action Found...!';
            break;
        }
    }
}

$obj = new QuickController();
$obj->RequestAccept($obj->actionevents);
?>