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
<title>Primary Cost</title>
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
<table width="800" border="0" align="center" cellpadding="5" cellspacing="0" id="table_primary_cost">
  <tr>
        <?php
      
         $result_company_logo = mysqli_query($conns,"select * from company_primary_details");
          while($row_company_logo =mysqli_fetch_assoc($result_company_logo)) 
          {
          ?>
    <td colspan="13" ><img src="http://boq.sapphirebh.com/httpdocs/images/company_profile_image/<?php echo $row_company_logo['print_logo'];?>" width="285" height="60" alt=""/></td>
    <?php } ?>
    <!--<td colspan="13"><img src="http://boq.sapphirebh.com/httpdocs/images/company_profile_image/516136_844681_sapphire_logo.jpg"  alt=""/></td>-->
  </tr>
  <tr >
    <td colspan="13"> <div class="style1">PRIMARY COST SHEET</div></td>
  </tr>
  
  <tr>
    <td colspan="13">Company Name : <?php echo $company_name; ?></td>
  </tr>
  <tr>
    <td colspan="13">Project Code : <?php echo $project_id; ?></td>
  </tr>
  <tr>
    <td colspan="13">Project Name : <?php echo $project_name; ?></td>
  </tr>
  <tr>
    <td class="style2" style="text-align:center;"><strong>Sl No </strong></td>
    <td class="style2" style="text-align:center;"><strong>Desc</strong></td>
    <td class="style2" style="text-align:center;"><strong>Qty</strong></td>
    <td class="style2" style="text-align:center;"><strong>Unit</strong></td>
    <td class="style2" style="text-align:center;"><strong>M.Cost</strong></td>
    <td class="style2" style="text-align:center;"><strong>L.Cost</strong></td>
    <td class="style2" style="text-align:center;"><strong>S.Cost </strong></td>
    <td class="style2" style="text-align:center;"><strong>E.Cost</strong></td>
    <td class="style2" style="text-align:center;"><strong>O.Cost</strong></td>
    <td class="style2" style="text-align:center;"><strong>Margin</strong></td>
    <td class="style2" style="text-align:center;"><strong>Rate</strong></td>
    <td class="style2" style="text-align:center;"><strong>VAT1</strong></td>
    <td class="style2" style="text-align:center;"><strong>Tot. Amt</strong></td>
  </tr>
  <?php
          $result_primary_cost = mysqli_query($conns,"SELECT * FROM view_finished_product_details_with_vat where finished_item_status='Confirmed'and company_id='".$company_id."' and project_id='".$project_id."' group by finished_product_id");
        $count=1;
          while($row_primary_cost =mysqli_fetch_assoc($result_primary_cost)) 
          {
          ?>
  <tr>
    <td class="style2" style="text-align:center;"><?PHP echo $count;?></td>
    <td class="style2"><?PHP echo $row_primary_cost['product_name'];?></td>
    <td class="style2" style="text-align: center;"><?PHP echo $row_primary_cost['product_qty'];?></td>
    <td class="style2" style="text-align: center;"><?PHP echo $row_primary_cost['product_unit'];?></td>
    <td class="style2" style="text-align: right;"><?PHP echo number_format($row_primary_cost['product_primary_amt'],3,".",",");?></td>
    <td class="style2" style="text-align: right;"><?PHP if($row_primary_cost['labour_cost_type']=='BD'){ echo number_format(($row_primary_cost['product_primary_amt'] * $row_primary_cost['labour_cost']/100),3,".",","); }else{echo number_format($row_primary_cost['labour_cost_amt'],3,".",",");}?></td>
    <td class="style2" style="text-align: right;"><?PHP if($row_primary_cost['service_cost_type']=='BD'){ echo number_format(($row_primary_cost['product_primary_amt'] * $row_primary_cost['service_cost']/100),3,".",","); }else{echo number_format($row_primary_cost['service_cost_amt'],3,".",",");}?></td>
    <td class="style2" style="text-align: right;"><?PHP if($row_primary_cost['equipment_cost_type']=='BD'){ echo number_format(($row_primary_cost['product_primary_amt'] * $row_primary_cost['equipment_cost']/100),3,".",","); }else{echo number_format($row_primary_cost['equipment_cost_amt'],3,".",",");}?></td>
    <td class="style2" style="text-align: right;"><?PHP if($row_primary_cost['other_cost_type']=='BD'){ echo number_format(($row_primary_cost['product_primary_amt'] * $row_primary_cost['other_cost']/100),3,".",","); }else{echo number_format($row_primary_cost['other_cost_amt'],3,".",",");}?></td>
    <td class="style2" style="text-align: right;"><?PHP if($row_primary_cost['margin_cost_type']=='BD'){ echo number_format(($row_primary_cost['product_primary_amt'] * $row_primary_cost['margin_cost']/100),3,".",","); }else{echo number_format($row_primary_cost['margin_cost_amt'],3,".",",");}?></td>
    <td class="style2" style="text-align: right;"><?PHP echo number_format($row_primary_cost['product_rate_per_unit_cost'],3,".",",");?></td>
    
    <td class="style2" style="text-align: right;"><?PHP $res=$row_primary_cost['vat_amount'];echo number_format($res,3,".",",");?></td>
    
    <td class="style2" style="text-align: right;"><?PHP echo number_format($row_primary_cost['total_amnt_after_vat'],3,".",",");$tot_amnt_vat= $tot_amnt_vat+$row_primary_cost['total_amnt_after_vat'];?></td>
    
  </tr>
    <?php
          $count=$count+1;}
    ?>
     
  <tr>
    <td colspan="12" class="style2" style="text-align: right;">Total Amount</td>
    <!--<td class="style2" style="text-align: right;"><?PHP //echo number_format($total_amount,3,".",",");?></td>-->
      <td class="style2" style="text-align: right;"><?PHP echo number_format($tot_amnt_vat,3,".",",");?></td>
  </tr>
 
 
</table>
</body>
<footer>
    
	<div style="text-align:right;padding-right:30px;">
		<input type="button" value="Export To Excel" onclick="fnExcelReport()" id="export_excel_but">
        <input type="button" value="Print this page" id="print_but">
	</div>
</footer>
</html>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script> 

   $(document).ready(function(){ 
	   $('#print_but').click(function(){ 
		    var project_id = <?php echo $project_id; ?>;
		    var project_name = '<?php echo $project_name; ?>';
            var company_id = <?php echo $company_id; ?>;
            var company_name = '<?php echo $company_name; ?>';
            //alert(project_id + ' ' + company_id+ ','+company_name+','+project_name);
            window.open("pdf/print/primary_cost_print_main.php?v_company_id=" + company_id + "&v_project_id=" + project_id + "&v_company_name=" + company_name + "&v_project_name=" + project_name, "_blank");
	   });
    });  
	    
	   function fnExcelReport()
		{
			var no = "<?php //echo $finished_pdt_id; ?>";
			var filename = "PrimaryCost.xls";
			var tab_text="<table border='2px' ><tr bgcolor='#FFFFFF' style='border-bottom: 1px solid #FFFFFF;'>";
			var textRange; var j=0;
			tab = document.getElementById('table_primary_cost'); // id of table

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
