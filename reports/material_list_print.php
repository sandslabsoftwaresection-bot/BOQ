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
<title>Material List</title>
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
	text-align:right;
}
.style2 {
	border: 1px solid black;
	
	
}
</style>
<body>
<table width="800" border="0" align="center" cellpadding="5" cellspacing="0" id="table_material_list">
  <tr>
       <?php
      
         $result_company_logo = mysqli_query($conns,"select * from company_primary_details");
          while($row_company_logo =mysqli_fetch_assoc($result_company_logo)) 
          {
          ?>
    <td colspan="7" ><img src="http://boq.sapphirebh.com/httpdocs/images/company_profile_image/<?php echo $row_company_logo['print_logo'];?>" width="285" height="60" alt=""/></td>
    <?php } ?>
    <!--<td colspan="7"><img src="http://boq.sapphirebh.com/httpdocs/images/company_profile_image/516136_844681_sapphire_logo.jpg"  alt=""/></td>-->
  </tr>
  <tr >
    <td colspan="7"> <div class="style1">MATERIAL LIST</div></td>
  </tr>
  
  <tr>
    <td colspan="7">Company Name : <?php echo $company_name; ?></td>
  </tr>
  <tr>
    <td colspan="7">Project Code : <?php echo $project_id; ?></td>
  </tr>
  <tr>
    <td colspan="7">Project Name : <?php echo $project_name; ?></td>
  </tr>
  <tr>
    <td class="style2" style="text-align:center;"><strong>Sl No </strong></td>
    <td class="style2" style="text-align:center;"><strong>Desc</strong></td>
    <td class="style2" style="text-align:center;" ><strong>Qty</strong></td>
    <td class="style2" style="text-align:center;"><strong>Unit</strong></td>
    <td class="style2" style="text-align:center;"><strong>Rate</strong></td>
    <td class="style2" style="text-align:center;"><strong>VAT</strong></td>
    <td class="style2" style="text-align:center;"><strong>Tot. Amt</strong></td>
  </tr>
  <?php
          $result_material_list = mysqli_query($conns,"SELECT *,sum(quantity)as item_total_qty,(sum(quantity)*rate_per_unit) as item_total_amnt FROM view_finished_product_details where finished_item_status='Confirmed'and company_id='".$company_id."' and project_id='".$project_id."' group by item_name");
        $count=1;
          while($row_material_list =mysqli_fetch_assoc($result_material_list)) 
          {
          ?>
  <tr>
    <td class="style2" style="text-align:center;"><?PHP echo $count;?></td>
    <td class="style2"><?PHP echo $row_material_list['item_name'];?></td>
    <td class="style2" style="text-align: center;"><?PHP echo $row_material_list['item_total_qty'];?></td>
    <td class="style2" style="text-align: center;"><?PHP echo $row_material_list['units'];?></td>
    <td class="style2" style="text-align: right;"><?PHP echo number_format($row_material_list['rate_per_unit'],3,".",",");?></td>
    <td class="style2" style="text-align: right;"><?PHP $res=round((($row_material_list['vat_percentage']*$row_material_list['rate_per_unit'])/100)*$row_material_list['item_total_qty'],3);echo number_format($res,3,".",",");?></td>
    <!--<td class="style2" style="text-align: right;"><?PHP //echo  number_format($row_material_list['item_total_amnt'],3,".",",");?></td>-->
    <td class="style2" style="text-align: right;"><?PHP $res_item_tot=round((((($row_material_list['vat_percentage']*$row_material_list['rate_per_unit'])/100)*$row_material_list['item_total_qty'])+$row_material_list['item_total_amnt']),3); echo  number_format($res_item_tot,3,".",",");?></td>
    
  </tr>
    <?php
          $count=$count+1;}
    ?>
     <?php
          $result_material_list_total = mysqli_query($conns,"SELECT item_total_amnt, sum(item_total_amnt) AS item_total_total_amnt FROM (SELECT (sum(quantity)*rate_per_unit) AS item_total_amnt,finished_item_status,company_id,project_id,item_name FROM view_finished_product_details where finished_item_status='Confirmed'and company_id='".$company_id."' and project_id='".$project_id."' group by item_name) AS tot ;");
        
          while($row_material_list1 =mysqli_fetch_assoc($result_material_list_total)) 
          {
              $total_amount=$row_material_list1['item_total_total_amnt'];
              $vat_amnt=round((($row_material_list1['item_total_total_amnt']*$tax_amount)/100),3);
                
                $vat_added_total_amnt=round($row_material_list1['item_total_total_amnt']+$vat_amnt,3);
          }?>
  <tr>
    <td colspan="6" class="style2" style="text-align: right;">Total Amount</td>
    <td class="style2" style="text-align: right;"><?PHP echo number_format($total_amount,3,".",",");?></td>
  </tr>
  <tr>
    <td colspan="6" class="style2" style="text-align: right;">VAT ( <?php echo $tax_amount; ?>%)</td>
    <td class="style2" style="text-align: right;"><?PHP echo number_format($vat_amnt,3,".",",");?></td>
  </tr>
  <tr>
    <td colspan="6" class="style2" style="text-align: right;">Grand Total</td>
    <td class="style2" style="text-align: right;"><?PHP echo number_format($vat_added_total_amnt,3,".",",");?></td>
  </tr>
 <?php  ?>
</table>
</body>
<!--<footer>-->
    
<!--    <div style="text-align:right;padding-right:30px;">-->
<!--       <input type="button" value="Export To Excel" onclick="fnExcelReport();" id="export_excel_but">-->
<!--       <input type="button" value="Print this page" onClick="window.print()" id="print_but">-->
        
<!--    </div>-->
<!--</footer>-->
</html>

