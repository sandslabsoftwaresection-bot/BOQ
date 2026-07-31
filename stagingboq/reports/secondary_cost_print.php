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
<title>Secondary Cost</title>
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
<table width="800" border="0" align="center" cellpadding="5" cellspacing="0" id="table_secondary_cost">
  <tr>
        <?php
      
         $result_company_logo = mysqli_query($conns,"select * from company_primary_details");
          while($row_company_logo =mysqli_fetch_assoc($result_company_logo)) 
          {
          ?>
    <td colspan="10" ><img src="http://boq.sapphirebh.com/httpdocs/images/company_profile_image/<?php echo $row_company_logo['print_logo'];?>" width="285" height="60" alt=""/></td>
    <?php } ?>
    <!--<td colspan="10"><img src="http://boq.sapphirebh.com/httpdocs/images/company_profile_image/516136_844681_sapphire_logo.jpg"  alt=""/></td>-->
  </tr>
  <tr >
    <td colspan="10" > <div align="right" class="style1">SECONDARY COST SHEET</div></td>
  </tr>
  
  <tr>
    <td colspan="10">Company Name : <?php echo $company_name; ?></td>
  </tr>
  <tr>
    <td colspan="10">Project Code : <?php echo $project_id; ?></td>
  </tr>
  <tr>
    <td colspan="10">Project Name : <?php echo $project_name; ?></td>
  </tr>
  <tr>
    <td class="style2" style="text-align:center;"><strong>Sl No </strong></td>
    <td class="style2" style="text-align:center;"><strong>Desc</strong></td>
    <td class="style2" style="text-align:center;"><strong>Qty</strong></td>
    <td class="style2" style="text-align:center;"><strong>Unit</strong></td>
    <td class="style2" style="text-align:center;"><strong>Tot. Wght</strong></td>
    <td class="style2" style="text-align:center;"><strong>m<sup>2</sup></strong></td>
    <td class="style2" style="text-align:center;"><strong>m<sup>3</sup></strong></td>
    <td class="style2" style="text-align:center;"><strong>Rate</strong></td>
    <td class="style2" style="text-align:center;"><strong>VAT</strong></td>
    <td class="style2" style="text-align:center;"><strong>Tot. Amt</strong></td>
  </tr>
  <?php
           $result_secondary_cost = mysqli_query($conns,"SELECT *,sum(total_weight)as prod_total_weight,sum(square_meter) as prod_square_meter,sum(cubic_meter) as prod_cubic_meter FROM view_finished_product_details where finished_item_status='Confirmed'and company_id='".$company_id."' and project_id='".$project_id."' group by finished_product_id");
        $count=1;
          while($row_secondary_cost =mysqli_fetch_assoc($result_secondary_cost)) 
          {
          ?>
  <tr>
    <td class="style2" style="text-align:center;"><?PHP echo $count;?></td>
    <td class="style2"><?PHP echo $row_secondary_cost['product_name'];?></td>
    <td class="style2" style="text-align: center;"><?PHP echo $row_secondary_cost['product_qty'];?></td>
    <td class="style2" style="text-align: center;"><?PHP echo $row_secondary_cost['product_unit'];?></td>
    <td class="style2" style="text-align: right;"><?PHP echo number_format($row_secondary_cost['prod_total_weight'],3,".",",");?></td>
    <td class="style2" style="text-align: right;"><?PHP echo number_format($row_secondary_cost['prod_square_meter'],3,".",",");?></td>
    <td class="style2" style="text-align: right;"><?PHP echo number_format($row_secondary_cost['prod_cubic_meter'],3,".",",");?></td>
    <td class="style2" style="text-align: right;"><?PHP echo number_format($row_secondary_cost['product_rate_per_unit_cost'],3,".",",");?></td>
    <td class="style2" style="text-align: right;"><?PHP $res=round((($tax_amount*$row_secondary_cost['product_rate_per_unit_cost'])/100)*$row_secondary_cost['product_qty'],3);  echo number_format($res,3,".",",");?></td>
    <!--<td class="style2" style="text-align: right;"><?PHP //echo number_format($row_secondary_cost['total_amt_report'],3,".",",");?></td>-->
    <td class="style2" style="text-align: right;"><?PHP $res_tot_amnt=round(((($tax_amount*$row_secondary_cost['product_rate_per_unit_cost'])/100)*$row_secondary_cost['product_qty'])+$row_secondary_cost['total_amt_report'],3);  echo number_format($res_tot_amnt,3,".",",");?></td>
 
  </tr>
    <?php
          $count=$count+1;}
    ?>
     <?php
        //   $result_secondary_cost_total = mysqli_query($conns,"SELECT sum(total_amt_report) as prod_total_amnt FROM finished_product_table where finished_item_status='Confirmed'and company_id='".$company_id."' and project_id='".$project_id."' group by finished_product_id");
        
        //   while($row_secondary_cost_total =mysqli_fetch_assoc($result_secondary_cost_total)) 
        //   {
        //       //$total_amount=(tot_amount);
        //       $vat_amnt=round((($row_secondary_cost_total['prod_total_amnt']*$tax_amount)/100),2);
                
        //         $vat_added_total_amnt=round($row_secondary_cost_total['prod_total_amnt']+$vat_amnt,2);
          ?>
  <!--<tr>-->
  <!--  <td colspan="9" class="style2">Total Amount</td>-->
  <!--  <td class="style2"><?PHP //echo $row_secondary_cost_total['prod_total_amnt'];?></td>-->
  <!--</tr>-->
  <!--<tr>-->
  <!--  <td colspan="9" class="style2">VAT %</td>-->
  <!--  <td class="style2"><?PHP //echo $vat_amnt;?></td>-->
  <!--</tr>-->
  <!--<tr>-->
  <!--  <td colspan="9" class="style2">Grand Total</td>-->
  <!--  <td class="style2"><?PHP //echo $vat_added_total_amnt;?></td>-->
  <!--</tr>-->
 <?php// } ?>
</table>
</body>
<!--<footer>-->
    
<!--    <div style="text-align:right;padding-right:30px;">-->
<!--       <input type="button" value="Export To Excel" onclick="fnExcelReport();" id="export_excel_but">-->
<!--       <input type="button" value="Print this page" onClick="window.print()" id="print_but">-->
        
<!--    </div>-->
<!--</footer>-->
</html>

