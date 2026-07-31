<?PHP 

require ('../model/db_connection/connection.php');
   
   
   
   $db_con = new DBConnection();
   $conns = $db_con->ConnectToMYSQL();
   
	$finished_pdt_id = $_GET['v_finished_pdt_id'];
	$company_id = $_GET['v_company_id'];
	 
	
	$result_company_details = mysqli_query($conns,"SELECT * FROM company_details WHERE company_id = ".$company_id." ");
	  while($row_fetch_company =mysqli_fetch_assoc($result_company_details)) 
	  {
		$contact_person = $row_fetch_company['contact_person'];  
	  }
   
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
    <td colspan="7"> <div class="style1">ITEM LIST</div></td>
  </tr>
   
  <?php
      
	 $result_product_details = mysqli_query($conns,"SELECT * FROM finished_product_table WHERE finished_product_id = ".$finished_pdt_id." ");
	  while($row_fetch_product =mysqli_fetch_assoc($result_product_details)) 
	  {
  ?>
  <tr>
    <td colspan="6">Product : <?php echo $row_fetch_product['product_name']; ?></td>
	<td colspan="6">Project : <?php echo $row_fetch_product['project_name']; ?></td>
  </tr>
  <tr>
    <td colspan="6">Qty : <?php echo $row_fetch_product['product_qty']; ?></td>
	<td colspan="6">Client : <?php echo $row_fetch_product['company_name']; ?></td>
  </tr>
  <tr>
    <td colspan="6">Per /Pcs : <?php echo $row_fetch_product['product_rate_per_unit_cost']; ?></td>
	<?php } ?> 
	<td colspan="6">Att : <?php echo $contact_person; ?></td>
  </tr>
   
  <tr>
    <td class="style2" style="text-align:center; color: #FFFFFF;" bgcolor="#0079DD"><strong>Sl No </strong></td>
    <td class="style2" style="text-align:center; color: #FFFFFF;" bgcolor="#0079DD"><strong>Item</strong></td>
    <td class="style2" style="text-align:center; color: #FFFFFF;" bgcolor="#0079DD"><strong>Qty</strong></td>
    <td class="style2" style="text-align:center; color: #FFFFFF;" bgcolor="#0079DD"><strong>Unit</strong></td>
    <td class="style2" style="text-align:center; color: #FFFFFF;" bgcolor="#0079DD"><strong>Rate</strong></td>
    <td class="style2" style="text-align:center; color: #FFFFFF;" bgcolor="#0079DD"><strong>Tax(VAT)</strong></td>
    <td class="style2" style="text-align:center; color: #FFFFFF;" bgcolor="#0079DD"><strong>Amount</strong></td>
  </tr>
  <?php
          $result_material_list = mysqli_query($conns,"SELECT * FROM product_item_details_entry WHERE finished_product_id = ".$finished_pdt_id ." ");
			$count=1;
			$tot_amount=0;
          while($row_material_list =mysqli_fetch_assoc($result_material_list)) 
          {
			  $rate = $row_material_list['rate_per_unit'];
			  $vat = $row_material_list['vat_percentage'];
			  $qty = $row_material_list['quantity'];
			  $tax = ($rate * $vat /100)+$rate;;
			  $amount = $tax * $qty;
			  
			  
			  $tot_amount += $amount;
          ?>
  <tr>
    <td class="style2" style="text-align:center;"><?PHP echo $count;?></td>
    <td class="style2" style="text-align: center;"><?PHP echo $row_material_list['item_name'];?></td>
    <td class="style2" style="text-align: center;"><?PHP echo $row_material_list['quantity'];?></td>
    <td class="style2" style="text-align: center;"><?PHP echo $row_material_list['units'];?></td>
    <td class="style2" style="text-align: center;"><?PHP echo number_format($row_material_list['rate_per_unit'],3,".",",");?></td>
    <td class="style2" style="text-align: center;"><?PHP echo number_format($tax,3,".",",");?></td>
    <!--<td class="style2" style="text-align: right;"><?PHP //echo  number_format($row_material_list['item_total_amnt'],3,".",",");?></td>-->
    <td class="style2" style="text-align: right;"><?php echo number_format($amount, 3, ".", ","); ?></td>
    
  </tr>    
  
     <?php
	    
        $count=$count+1;
		  
		  }
    ?> 
		  
		
  <tr>
    <td colspan="2" class="style2" style="text-align: left;" bgcolor="#85C1E9"><b>Total</td>
	<td class="style2" style="text-align: right;" bgcolor="#85C1E9"></td>
	<td class="style2" style="text-align: right;" bgcolor="#85C1E9"></td>
	<td class="style2" style="text-align: right;" bgcolor="#85C1E9"></td>
	<td class="style2" style="text-align: right;" bgcolor="#85C1E9"></td>
	<td class="style2" style="text-align: right;" bgcolor="#85C1E9"><b><?PHP echo number_format($tot_amount,3,".",",");   ?></td>
  </tr>
  
  <tr>
    <td colspan="2" class="style2" style="text-align: left;">Material</td>
    <td class="style2" style="text-align: right;"></td>
	<td class="style2" style="text-align: right;"></td> 
	<td class="style2" style="text-align: right;"></td>
	<td class="style2" style="text-align: right;"></td>
	<td class="style2" style="text-align: right;"><?PHP echo number_format($tot_amount,3,".",",");?></td>
  </tr>
 
  
  <?php
          
		 $result_product_details = mysqli_query($conns,"SELECT * FROM `finished_product_table` WHERE `finished_product_id` = ".$finished_pdt_id." ");
        
          while($row_material_list1 =mysqli_fetch_assoc($result_product_details)) 
          {
              //$total_amount=$row_material_list1['item_total_amnt'];
              $labour_cost = $row_material_list1['labour_cost'];
			  $labour_cost_type = $row_material_list1['labour_cost_type'];
			  $labour_cost_value = $labour_cost . ' '.$labour_cost_type;
			  
			  
			  $equipment_cost_type = $row_material_list1['equipment_cost_type'];
			  $equipment_cost = $row_material_list1['equipment_cost']; 
			  $equipment_cost_value = $equipment_cost . ' '.$equipment_cost_type;
			  
			  $service_cost = $row_material_list1['service_cost'];
			  $service_cost_type = $row_material_list1['service_cost_type'];
			  $service_cost_value = $service_cost . ' '.$service_cost_type;
			  
			  $other_cost = $row_material_list1['other_cost'];
			  $other_cost_type = $row_material_list1['other_cost_type'];
			  $other_cost_value = $other_cost . ' '.$other_cost_type;
			  
			  $margin_cost = $row_material_list1['margin_cost'];
			  $margin_cost_type = $row_material_list1['margin_cost_type'];
			  $margin_cost_value = $margin_cost . ' '.$margin_cost_type;
			  
			  if($labour_cost_type == 'BD')
			  {
				$labour_rate =  $labour_cost;  
			  }
			  else{ 
				 $labour_rate = $tot_amount * ($labour_cost/100) ; 
			  }
			  $labour_cost_amt = $tot_amount + $labour_rate ;
			  
			  
			  if($equipment_cost_type == 'BD')
			  {
				$equipment_rate =  $equipment_cost; 
			  }
			  else{
				 $equipment_rate = $labour_cost_amt * ($equipment_cost/100) ;
			  }
			  $equipment_cost_amt = $equipment_rate + $labour_cost_amt;
			  
			  
			  if($service_cost_type == 'BD')
			  {
				$service_rate =  $service_cost; 
			  }
			  else{
				 $service_rate = $equipment_cost_amt * ($service_cost/100) ;
			  }
			  $service_cost_amt = $service_rate + $equipment_cost_amt; 
			  
			  
			   if($other_cost_type == 'BD')
			  {
				$other_rate =  $other_cost; 
			  }
			  else{
				 $other_rate = $service_cost_amt * ($other_cost/100) ;
			  }
			  $other_cost_amt = $other_rate + $service_cost_amt; 
			  
			  
			  if($margin_cost_type == 'BD')
			  {
				$margin_rate =  $margin_cost; 
			  }
			  else{
				 $margin_rate = $other_cost_amt * ($margin_cost/100);
			  }
			  $margin_cost_amt = $margin_rate + $other_cost_amt;
          }?>
  <tr>
    <td colspan="2" class="style2" style="text-align: left;">Labour</td>
    <td class="style2" style="text-align: right;"><?PHP echo $labour_cost_value ;?></td>
	<td class="style2" style="text-align: left;"></td>
	<td class="style2" style="text-align: right;"><?PHP echo number_format($labour_rate,3,".",",");?></td> 
	<td class="style2" style="text-align: right;"></td>
	<td class="style2" style="text-align: right;"><?PHP echo number_format($labour_cost_amt,3,".",",");?></td>
  </tr>
  <tr>
    <td colspan="2" class="style2" style="text-align: left;">Equipment</td>
    <td class="style2" style="text-align: right;"><?PHP echo $equipment_cost_value ;?></td>
	<td class="style2" style="text-align: left;"></td>
	<td class="style2" style="text-align: right;"><?PHP echo number_format($equipment_rate,3,".",",");?></td>
	<td class="style2" style="text-align: right;"></td>
	<td class="style2" style="text-align: right;"><?PHP echo number_format($equipment_cost_amt,3,".",",");?></td>
  </tr>
  <tr>
    <td colspan="2" class="style2" style="text-align: left;">Service</td>
    <td class="style2" style="text-align: right;"><?PHP echo $service_cost_value ;?></td>
	<td class="style2" style="text-align: left;"></td>
	<td class="style2" style="text-align: right;"><?PHP echo number_format($service_rate,3,".",",");?></td>
	<td class="style2" style="text-align: right;"></td>
	<td class="style2" style="text-align: right;"><?PHP echo number_format($service_cost_amt,3,".",",");?></td>
  </tr>
  <tr>
    <td colspan="2" class="style2" style="text-align: left;">Other</td>
    <td class="style2" style="text-align: right;"><?PHP echo $other_cost_value ;?></td>
	<td class="style2" style="text-align: left;"></td>
	<td class="style2" style="text-align: right;"><?PHP echo number_format($other_rate,3,".",",");?></td>
	<td class="style2" style="text-align: right;"></td>
	<td class="style2" style="text-align: right;"><?PHP echo number_format($other_cost_amt,3,".",",");?></td>
  </tr>
  <tr>
    <td colspan="2" class="style2" style="text-align: left;" bgcolor="#85C1E9"><b>Margin</td>
    <td class="style2" style="text-align: right;" bgcolor="#85C1E9"><b><?PHP echo $margin_cost_value ;?></td>
	<td class="style2" style="text-align: left;" bgcolor="#85C1E9"><b></td>
	<td class="style2" style="text-align: right;" bgcolor="#85C1E9"><b><?PHP echo number_format($margin_rate,3,".",",");?></td>
	<td class="style2" style="text-align: right;" bgcolor="#85C1E9"></td>
	<td class="style2" style="text-align: right;" bgcolor="#85C1E9"><b><?PHP echo number_format($margin_cost_amt,3,".",",");?></td>
  </tr>
  <?php  ?>


</table>
</body>
<footer>
    
<div style="text-align:right;padding-right:30px;">
	<input type="button" value="Export To Excel" onclick="fnExcelReport();" id="export_excel_but">
	<input type="button" value="Print this page" id="print_but">
</div>
</footer>
</html>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>

   $(document).ready(function(){
	   $('#print_but').click(function(){
		   
		   
		   var finished_pdt_id = <?php echo $finished_pdt_id; ?>;
		   var company_id = <?php echo $company_id; ?>;
		   //alert(finished_pdt_id + ' '+company_id);
		   window.open("pdf/print/primary_cost_print.php?v_finished_pdt_id="+finished_pdt_id+"&v_company_id="+company_id,"_blank");  
	   });
	   });  
	    
	   function fnExcelReport()
		{
			var no = "<?php //echo $finished_pdt_id; ?>";
			var filename = "PrimaryCost.xls";
			var tab_text="<table border='2px' ><tr bgcolor='#FFFFFF' style='border-bottom: 1px solid #FFFFFF;'>";
			var textRange; var j=0;
			tab = document.getElementById('table_material_list'); // id of table

			for(j = 0 ; j < tab.rows.length ; j++) 
			{     
				tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
				//tab_text=tab_text+"</tr>";
			}

			tab_text=tab_text+"</table>";
			tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
		  // tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
			tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

			var ua = window.navigator.userAgent;
			var msie = ua.indexOf("MSIE"); 

			if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
			{
				txtArea1.document.open("txt/html","replace");
				txtArea1.document.write(tab_text);
				txtArea1.document.close();
				txtArea1.focus(); 
				sa=txtArea1.document.execCommand("SaveAs",true,"quotation.xlsx");
			}  
			else                 //other browser not tested on IE 11
			  var link = document.createElement('a');
			  link.href = 'data:application/vnd.ms-excel,' + encodeURIComponent(tab_text);
			  link.download = filename;
			  link.click();
			  return (link);
		}
  
</script>