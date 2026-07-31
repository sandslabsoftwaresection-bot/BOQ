<?PHP 

require ('../model/db_connection/connection.php');
   
   
   
   $db_con = new DBConnection();
   $conns = $db_con->ConnectToMYSQL();
   
   
    $company_id = $_GET['v_company_id'];    
    $company_name = $_GET['v_company_name'];
    $project_id = $_GET['v_project_id'];
    $project_name = $_GET['v_project_name'];
	$tax_amount = $_GET['v_tax_amount'];
   
 ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Bill Of Quantity</title>
</head>
<style>
	body,td,th {
    font-family: Segoe, "Segoe UI", "DejaVu Sans", "Trebuchet MS", Verdana, sans-serif;
    font-style: normal;
    font-size: 14px;
    color: #000000;
    text-align: left;
}
	page {
  position: relative;
  background: white;
  display: block;
  margin: 0 auto;
  margin-bottom: 0.5cm;
  box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
}
page[size="A4"] {  
  width: 21cm;
  height: 29.7cm; 
}
page[size="A4"][layout="portrait"] {
  width: 29.7cm;
  height: 21cm;  
}
page[size="A3"] {
  width: 29.7cm;
  height: 42cm;
}
page[size="A3"][layout="portrait"] {
  width: 42cm;
  height: 29.7cm;  
}
page[size="A5"] {
  width: 14.8cm;
  height: 21cm;
}
page[size="A5"][layout="portrait"] {
  width: 21cm;
  height: 14.8cm;  
}

header,
footer {
    position: absolute;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
    padding-right: 10px;
    padding-left: 10px;
    width: 774px;
}
header:after{
  content: "Header";
}
footer:after{
  /*content: "Footer";*/
}

header {
  top: 0;
  padding-top: 5mm;
  padding-bottom: 3mm;
}
footer {
  bottom: 0;
  color: #000;
  padding-top: 10px;
  padding-bottom: 10px;
}

@media print {
  body, page {
    margin: 0;
    box-shadow: 0;
  }
  header,
  footer {
    position: fixed;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
    padding-right: 10px;
    padding-left: 10px;
  }
}


    .style1 {
	font-size: 16px;
	font-weight: bold;
	padding-right:20px;
}
.style2 {
	border: 1px solid black;
	border-collapse: collapse;
}
</style>
<body>
    
<table width="800" border="0" align="center" cellpadding="5" cellspacing="0" id="table_bill_of_quantity">
  <tr>
       <?php
      // echo "select *,date_format (default_date,'%m/%d/%Y') as default_date from company_primary_details";
          // $result_company_logo = mysqli_query($conns,"select *,date_format (default_date,'%m/%d/%Y') as default_date from company_primary_details");
         $result_company_logo = mysqli_query($conns,"select * from company_primary_details");
          while($row_company_logo =mysqli_fetch_assoc($result_company_logo)) 
          {
          ?>
    <td width="100" rowspan="2" colspan="6" ><img src="http://boq.sapphirebh.com/httpdocs/images/company_profile_image/<?php echo $row_company_logo['print_logo'];?>" width="285" height="60" alt=""/></td>
    <?php } ?>
  </tr>
  <tr></tr>
   <tr></tr>
  <tr >
    <td colspan="6" > <div align="right" class="style1">BILL OF QUANTITY</div></td>
  </tr>
  
  <tr>
    <td colspan="6">Company Name : <?php echo $company_name; ?></td>
  </tr>
  <tr>
    <td colspan="6">Project Code : <?php echo $project_id; ?></td>
  </tr>
  <tr>
    <td colspan="6">Project Name : <?php echo $project_name; ?></td>
  </tr>
  <tr>
    <td class="style2" style="text-align:center;"><strong>Sl No </strong></td>
    <td class="style2" style="text-align:center;"><strong>Desc</strong></td>
    <td class="style2" style="text-align:center;"><strong>Qty</strong></td>
    <td class="style2" style="text-align:center;"><strong>Unit</strong></td>
    <td class="style2" style="text-align:center;"><strong>Rate</strong></td>
    <td class="style2" style="text-align:center;"><strong>Amount</strong></td>
  </tr>
  <?php
           $result_bill_of_qty = mysqli_query($conns,"select * from finished_product_table where finished_item_status='Confirmed'and company_id='".$company_id."' and project_id='".$project_id."' group by finished_product_id");
        $count=1;
          while($row_bill_of_qty =mysqli_fetch_assoc($result_bill_of_qty)) 
          {
          ?>
          
  <tr>
    <td class="style2" style="text-align:center;"><?PHP echo $count;?></td>
    <td class="style2"><?PHP echo $row_bill_of_qty['product_name'];?></td>
    <td class="style2" style="text-align: center;"><?PHP echo $row_bill_of_qty['product_qty'];?></td>
    <td class="style2" style="text-align: center;"><?PHP echo $row_bill_of_qty['product_unit'];?></td>
    <td class="style2" style="text-align: right;"><?PHP echo number_format($row_bill_of_qty['product_rate_per_unit_cost'],3,".",",");?></td>
    <td class="style2" style="text-align: right;"><?PHP echo number_format($row_bill_of_qty['total_amt_report'],3,".",",");?></td>
  </tr>
    <?php
          $count=$count+1;}
    ?>
     <?php
           $result_bill_of_qty_total = mysqli_query($conns,"SELECT sum(total_amt_report) as prod_total_amnt FROM finished_product_table where finished_item_status='Confirmed'and company_id='".$company_id."' and project_id='".$project_id."'");
        
          while($row_bill_of_qty_total =mysqli_fetch_assoc($result_bill_of_qty_total)) 
          {
               $total_amount=$row_bill_of_qty_total['prod_total_amnt'];
              $vat_amnt=round((($row_bill_of_qty_total['prod_total_amnt']*$tax_amount)/100),2);
                
                $vat_added_total_amnt=round($row_bill_of_qty_total['prod_total_amnt']+$vat_amnt,2);
          }?>
  <tr>
    <td colspan="5" class="style2" style="text-align: right;">Total Amount</td>
    <td class="style2" style="text-align: right;"><?PHP echo number_format($total_amount,3,".",",");?></td>
  </tr>
  <tr>
    <td colspan="5" class="style2" style="text-align: right;">VAT ( <?php echo $tax_amount; ?>%)</td>
    <td class="style2" style="text-align: right;"><?PHP echo number_format($vat_amnt,3,".",",");?></td>
  </tr>
  <tr>
    <td colspan="5" class="style2" style="text-align: right;">Grand Total</td>
    <td class="style2" style="text-align: right;"><?PHP echo number_format($vat_added_total_amnt,3,".",",");?></td>
  </tr>
 
</table>
</body>
<!--<footer>
    
    <div style="text-align:right;padding-right:30px;">
       <input type="button" value="Export To Excel" onclick="fnExcelReport();" id="export_excel_but">
       <input type="button" value="Print this page" id="print_but">
        
    </div>
</footer>-->
</html>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script> 

   $(document).ready(function(){ 
	   $('#print_but').click(function(){ 
		    var project_id = <?php echo $project_id; ?>;
		    var project_name = '<?php echo $project_name; ?>';
            var company_id = <?php echo $company_id; ?>;
            var company_name = '<?php echo $company_name; ?>';
            var tax_amount = <?php echo $tax_amount; ?>;
            //alert(tax_amount + ' ' + company_id+ ','+company_name+','+project_name);
            window.open("pdf/print/bill_of_quantity_print.php?v_company_id=" + company_id + "&v_project_id=" + project_id + "&v_company_name=" + company_name + "&v_project_name=" + project_name + "&v_tax_amount=" +tax_amount, "_blank");
	   });
    });  
	
</script>

