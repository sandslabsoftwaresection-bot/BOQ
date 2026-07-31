<?PHP 

require ('../model/db_connection/connection.php');
   
   
   
   $db_con = new DBConnection();
   $conns = $db_con->ConnectToMYSQL();
   
 ?>

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title> <?PHP //echo $s1_date;?>  <?PHP //echo $e1_date;?> <?PHP //echo $bank_name;?> </title>
	
	<style type="text/css">
body,td,th {
    font-family: Consolas, "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", Monaco, "Courier New", monospace;
    font-style: normal;
    font-size: 14px;
    color: #000000;
    border-bottom: 0px solid #7F7F7F;
}
tr td img {
    text-align: center;
}


footer {
    position: fixed;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
    padding-right: 10px;
    padding-left: 10px;
    width: 100%;
}
footer {
  bottom: 0;
  color: none;
  padding-top: 10px;
  padding-bottom: 10px;
}
    </style>

</head>
<body>
<table width="1000" border="0" align="center" cellpadding="0" cellspacing="0" id="main_table">
  <tbody>
    <tr>
      <td width="100" rowspan="2"><img src="http://boq.sianlab.com/httpdocs/images/company_profile_image/logonew.png" width="285" height="60" alt=""/></td>
      
     
    </tr>
    <tr></tr>
    <tr></tr>
    
    <tr>
      <td colspan="3" style="text-align: left; font-size: 10px; color: #FFFFFF;">
        <?PHP  $result_project_name = mysqli_query($conns,"SELECT * FROM `finished_product_table` where finished_item_status='Confirmed' order by `finished_product_id`desc");
            while($row_project_name=mysqli_fetch_assoc($result_project_name)) {   $ctr = 1; ?>
          <table width="1000" border="0" cellspacing="0" cellpadding="0">
        <tbody>
        <tr bgcolor="#FFA658">
           <td colspan="11" bgcolor="#60BDF8" style="font-size: 20px; text-align: center; color: #FFFFFF;"><?PHP echo $row_project_name['project_name'];?></td> 
            </tr> 
          <tr>
            
            <td bgcolor="#004E7A" style="font-size: 12px; width: 14%; text-align: center; color: #FFFFFF;padding:5px"><strong>Product Name</strong></td> 
            <td bgcolor="#004E7A" style="font-size: 12px; width: 5%; text-align: center; color: #FFFFFF;"><strong>Unit</strong></td>
            <td bgcolor="#004E7A" style="font-size: 12px; width: 5%; text-align: center; color: #FFFFFF;padding:5px"><strong>Qty</strong></td>
            <td bgcolor="#004E7A" style="text-align: center; width: 10%; font-size: 12px; color:#FFFFFF;"><strong>Mt. Cost</strong></td>
            <td bgcolor="#004E7A" style="text-align: center; width: 10%; font-size: 12px; color:#FFFFFF;"><strong>Lab. Cost</strong></td>
            <td bgcolor="#004E7A" style="text-align: center; width: 10%; font-size: 12px; color:#FFFFFF;"><strong>Service Cost</strong></td>
            <td bgcolor="#004E7A" style="text-align: center; width: 10%; font-size: 12px; color:#FFFFFF;padding:5px"><strong>Equ. Cost</strong></td>
            <td bgcolor="#004E7A" style="text-align: center; width: 10%; font-size: 12px; color:#FFFFFF;padding:5px"><strong>Other Cost</strong></td>
            <td bgcolor="#004E7A" style="text-align: center; width: 10%; font-size: 12px; color:#FFFFFF;padding:5px"><strong>Margin Cost</strong></td>
            <td bgcolor="#004E7A" style="text-align: center; width: 8%; font-size: 12px; color:#FFFFFF;padding:5px"><strong>Total Cost</strong></td>
            <td bgcolor="#004E7A" style="text-align: center; width: 8%; font-size: 12px; color:#FFFFFF;padding:5px"><strong>Rate/Unit</strong></td>
          
          </tr>
          <?php
           $result_list_of_estimation = mysqli_query($conns,"SELECT * FROM `finished_product_table` where finished_item_status='Confirmed' order by `finished_product_id`desc");
         
          while($row_list_of_estimation =mysqli_fetch_assoc($result_list_of_estimation)) 
          {
          ?>
          <?PHP if (($ctr % 2) == 0) {?>
          <tr >
             
             <td style="padding: 5px;border-bottom: 1px solid #7F7F7F ; text-align: center; width: 14%;"><?PHP echo $row_list_of_estimation['product_name']  ?></td>
            <td style="text-align: left; width: 5%; border-bottom: 1px solid #7F7F7F"><?PHP echo $row_list_of_estimation['product_unit'];?></td>
            <td style="padding: 5px;border-bottom: 1px solid #7F7F7F ; text-align: center; width: 5%;"><?PHP echo $row_list_of_estimation['product_qty']  ?></td>
            <td style="text-align: center; width: 10%; border-bottom: 1px solid #7F7F7F"><?PHP echo $row_list_of_estimation['product_primary_amt'];?></td>
            <td style="text-align: right; width: 10%; border-bottom: 1px solid #7F7F7F"><?PHP if($row_list_of_estimation['labour_cost_type']=='BD') { $labour_cost=($row_list_of_estimation['product_primary_amt']*$row_list_of_estimation['labour_cost'])/100; echo $labour_cost.' ('.($row_list_of_estimation['labour_cost']/100).'%)';} else{ echo $row_list_of_estimation['labour_cost_amt'].' ('.$row_list_of_estimation['labour_cost'].' '.$row_list_of_estimation['labour_cost_type'].')' ;}?></td>
            <td style="text-align: right; width: 10%; border-bottom: 1px solid #7F7F7F"><?PHP if($row_list_of_estimation['service_cost_type']=='BD') { $service_cost=($row_list_of_estimation['product_primary_amt']*$row_list_of_estimation['service_cost'])/100; echo $service_cost.' ('.($row_list_of_estimation['service_cost']/100).'%)';} else{ echo $row_list_of_estimation['service_cost_amt'].' ('.$row_list_of_estimation['service_cost'].' '.$row_list_of_estimation['service_cost_type'].')' ;}?></td>
            <td style="text-align: right; width: 10%; border-bottom: 1px solid #7F7F7F"><?PHP if($row_list_of_estimation['equipment_cost_type']=='BD') { $labour_cost=($row_list_of_estimation['product_primary_amt']*$row_list_of_estimation['equipment_cost'])/100; echo $labour_cost.' ('.($row_list_of_estimation['equipment_cost']/100).'%)';} else{ echo $row_list_of_estimation['equipment_cost_amt'].' ('.$row_list_of_estimation['equipment_cost'].' '.$row_list_of_estimation['equipment_cost_type'].')' ;}?></td>
            <td style="text-align: center; width: 10%; border-bottom: 1px solid #7F7F7F"><?PHP if($row_list_of_estimation['other_cost_type']=='BD') { $labour_cost=($row_list_of_estimation['product_primary_amt']*$row_list_of_estimation['other_cost'])/100; echo $labour_cost.' ('.($row_list_of_estimation['other_cost']/100).'%)';} else{ echo $row_list_of_estimation['other_cost_amt'].' ('.$row_list_of_estimation['other_cost'].' '.$row_list_of_estimation['other_cost_type'].')' ;}?></td>
            <td style="text-align: left; width: 10%; border-bottom: 1px solid #7F7F7F"><?PHP if($row_list_of_estimation['margin_cost_type']=='BD') { $labour_cost=($row_list_of_estimation['product_primary_amt']*$row_list_of_estimation['margin_cost'])/100; echo $labour_cost.' ('.($row_list_of_estimation['margin_cost']/100).'%)';} else{ echo $row_list_of_estimation['margin_cost_amt'].' ('.$row_list_of_estimation['margin_cost'].' '.$row_list_of_estimation['margin_cost_type'].')' ;}?></td>
            <td style="text-align: center; width: 8%; border-bottom: 1px solid #7F7F7F"><?PHP echo $row_list_of_estimation['total_amt_report'];?></td>
            <td style="text-align: left; width: 8%; border-bottom: 1px solid #7F7F7F"><?PHP echo $row_list_of_estimation['product_rate_per_unit_cost'];?></td>
       
        </tr>
          <?PHP } else {?>
			<tr >
			   
			<td bgcolor="#E8E8E8" style="padding: 5px;border-bottom: 1px solid #7F7F7F ; text-align: center; width: 14%;"><?PHP echo $row_list_of_estimation['product_name'];?></td>
            <td bgcolor="#E8E8E8" style="text-align: left; width: 5%; border-bottom: 1px solid #7F7F7F"><?PHP  echo $row_list_of_estimation['product_unit'];?></td>
            <td bgcolor="#E8E8E8" style="padding: 5px;border-bottom: 1px solid #7F7F7F ; text-align: center; width: 5%;"><?PHP echo $row_list_of_estimation['product_qty'];?></td>
            <td bgcolor="#E8E8E8" style="text-align: center; width: 10%; border-bottom: 1px solid #7F7F7F"><?PHP  echo $row_list_of_estimation['product_primary_amt'];?></td>
            <td bgcolor="#E8E8E8" style="text-align: right; width: 10%; border-bottom: 1px solid #7F7F7F"><?PHP if($row_list_of_estimation['labour_cost_type']=='BD') { $labour_cost=($row_list_of_estimation['product_primary_amt']*$row_list_of_estimation['labour_cost'])/100; echo $labour_cost.' ('.($row_list_of_estimation['labour_cost']/100).'%)';} else{ echo $row_list_of_estimation['labour_cost_amt'].' ('.$row_list_of_estimation['labour_cost'].' '.$row_list_of_estimation['labour_cost_type'].')' ;}?></td>
            <td bgcolor="#E8E8E8" style="text-align: right; width: 10%; border-bottom: 1px solid #7F7F7F"><?PHP if($row_list_of_estimation['service_cost_type']=='BD') { $service_cost=($row_list_of_estimation['product_primary_amt']*$row_list_of_estimation['service_cost'])/100; echo $service_cost.' ('.($row_list_of_estimation['service_cost']/100).'%)';} else{ echo $row_list_of_estimation['service_cost_amt'].' ('.$row_list_of_estimation['service_cost'].' '.$row_list_of_estimation['service_cost_type'].')' ;}?></td>
            <td bgcolor="#E8E8E8" style="text-align: right; width: 10%; border-bottom: 1px solid #7F7F7F"><?PHP if($row_list_of_estimation['equipment_cost_type']=='BD') { $labour_cost=($row_list_of_estimation['product_primary_amt']*$row_list_of_estimation['equipment_cost'])/100; echo $labour_cost.' ('.($row_list_of_estimation['equipment_cost']/100).'%)';} else{ echo $row_list_of_estimation['equipment_cost_amt'].' ('.$row_list_of_estimation['equipment_cost'].' '.$row_list_of_estimation['equipment_cost_type'].')' ;}?></td>
            <td bgcolor="#E8E8E8" style="text-align: center; width: 10%; border-bottom: 1px solid #7F7F7F"><?PHP if($row_list_of_estimation['other_cost_type']=='BD') { $labour_cost=($row_list_of_estimation['product_primary_amt']*$row_list_of_estimation['other_cost'])/100; echo $labour_cost.' ('.($row_list_of_estimation['other_cost']/100).'%)';} else{ echo $row_list_of_estimation['other_cost_amt'].' ('.$row_list_of_estimation['other_cost'].' '.$row_list_of_estimation['other_cost_type'].')' ;}?></td>
            <td bgcolor="#E8E8E8" style="text-align: left; width: 10%; border-bottom: 1px solid #7F7F7F"><?PHP if($row_list_of_estimation['margin_cost_type']=='BD') { $labour_cost=($row_list_of_estimation['product_primary_amt']*$row_list_of_estimation['margin_cost'])/100; echo $labour_cost.' ('.($row_list_of_estimation['margin_cost']/100).'%)';} else{ echo $row_list_of_estimation['margin_cost_amt'].' ('.$row_list_of_estimation['margin_cost'].' '.$row_list_of_estimation['margin_cost_type'].')' ;}?></td>
            <td bgcolor="#E8E8E8" style="text-align: center; width: 8%; border-bottom: 1px solid #7F7F7F"><?PHP echo $row_list_of_estimation['total_amt_report'];?></td>
            <td bgcolor="#E8E8E8" style="text-align: left; width: 8%; border-bottom: 1px solid #7F7F7F"><?PHP echo $row_list_of_estimation['product_rate_per_unit_cost'];?></td>
         
          </tr>
          <?PHP 
          }
           
          ?>
         
      
      
      
      <?PHP   } $ctr = $ctr +1;}?>
       <!--<tr>-->
       <!--     <td>&nbsp;</td>-->
       <!--     <td>Total</td>-->
       <!--     <td></td>-->
       <!--     <td style="text-align: right;"><?PHP //echo number_format($withdrawls,3,".",","); ?></td>-->
       <!--     <td style="text-align: right;"><?PHP //echo number_format($deposits,3,".",","); ?></td>-->
           
       <!--   </tr>-->
        </tbody>
      </table>
      
    <?php // } ?>
      
      
      </td>
    </tr>
    <tr>
      <td colspan="3" style=" text-align: left;">&nbsp;</td>
    </tr>
  </tbody>
</table>
</body>
	<footer>
    
    <div style="text-align:right;padding-right:30px;">
       <!--<input type="button" value="Export To Excel" onclick="fnExcelReport();" id="export_excel_but">-->
       <input type="button" value="Print this page" onClick="window.print()" id="print_but">
        
    </div>
</footer>
</html>









