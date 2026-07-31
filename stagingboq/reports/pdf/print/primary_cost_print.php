<?php
//============================================================+
// File name   : example_051.php
// Begin       : 2009-04-16
// Last Update : 2013-05-14
//
// Description : Example 051 for TCPDF class
//               Full page background
//
// Author: Nicola Asuni
//
// (c) Copyright:
//               Nicola Asuni
//               Tecnick.com LTD
//               www.tecnick.com
//               info@tecnick.com
//============================================================+

/**
 * Creates an example PDF TEST document using TCPDF
 * @package com.tecnick.tcpdf
 * @abstract TCPDF - Example: Full page background
 * @author Nicola Asuni
 * @since 2009-04-16
 * @group background
 * @group page
 * @group pdf
 */

// Include the main TCPDF library (search for installation path).
require_once('tcpdf_include.php');


// Extend the TCPDF class to create custom Header and Footer
class MYPDF extends TCPDF {
	//Page header
	public function Header() {
		// get the current page break margin
		$bMargin = $this->getBreakMargin();
		// get current auto-page-break mode
		$auto_page_break = $this->AutoPageBreak;
		// disable auto-page-break
		$this->setAutoPageBreak(false, 0);
		// set bacground image
		//$img_file = K_PATH_IMAGES.'webinar_python_blank_without_qr.jpg';
		if($_GET['x']==0)
		{
		    $img_file = K_PATH_IMAGES.'sapphirebh_letterhead.jpg';
		}
		else
		{
		    $img_file = K_PATH_IMAGES;  
		}
		$this->Image($img_file, null, 0, 210, 297, '', '', '', false, 300, 'C', false, false, 0);
		// restore auto-page-break status
		$this->setAutoPageBreak($auto_page_break, $bMargin);
		// set the starting point for the page content
		$this->setPageMark();
		$this->SetTopMargin($this->GetY()+30);
	}
	
	

  
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
   $certificate_code= $_GET['quotation_number'];
} else {
   $certificate_code=  $_POST['quotation_number'];
}


// Create connection

  require ('../../../model/db_connection/connection.php');
   
   $db_con = new DBConnection();
   $conns = $db_con->ConnectToMYSQL();
    
   $finished_pdt_id = $_GET['v_finished_pdt_id'];
   $company_id = $_GET['v_company_id'];
   

	$result_product_details = mysqli_query($conns,"SELECT * FROM finished_product_table WHERE finished_product_id = ".$finished_pdt_id." ");
	  while($row_fetch_product =mysqli_fetch_assoc($result_product_details)) 
	  {
		  $product_name = $row_fetch_product['product_name'];
		  $project_name = $row_fetch_product['project_name'];
		  $product_qty = $row_fetch_product['product_qty'];
		  $company_name = $row_fetch_product['company_name'];
		  $product_rate_per_unit_cost = $row_fetch_product['product_rate_per_unit_cost'];
		  $a = $row_fetch_product[''];
	  }
   
	$result_company_details = mysqli_query($conns,"SELECT * FROM company_details WHERE company_id = ".$company_id." ");
	  while($row_fetch_company =mysqli_fetch_assoc($result_company_details)) 
	  {
		$contact_person = $row_fetch_company['contact_person'];  
	  }
                               

// create new PDF document
$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->setCreator(PDF_CREATOR);
$pdf->setAuthor('SaNDS Lab');
$pdf->setTitle('Primary Cost');
$pdf->setSubject('SAPPHIER');
$pdf->setKeywords('SAPPHIER');

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));

// set default monospaced font
$pdf->setDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->setMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->setHeaderMargin(PDF_MARGIN_HEADER);
$pdf->setFooterMargin(PDF_MARGIN_FOOTER);

// remove default footer
$pdf->setPrintFooter(false);

// set auto page breaks
$pdf->setAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
//$pdf->setAutoPageBreak(TRUE, 0);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
	require_once(dirname(__FILE__).'/lang/eng.php');
	$pdf->setLanguageArray($l);
}

// ---------------------------------------------------------

// set font
$pdf->setFont('times', '', 10);

// ---------------------------------------------------------
// set default font subsetting mode
// Set font
// dejavusans is a UTF-8 Unicode font, if you only need to
// print standard ASCII chars, you can use core fonts like
// helvetica or times to reduce file size.



// add a page
$pdf->AddPage();

  
            $result_material_list = mysqli_query($conns,"SELECT * FROM product_item_details_entry WHERE finished_product_id = ".$finished_pdt_id ." ");
			$count=1;
			$tot_amount=0;
                    while($row_material_list =mysqli_fetch_assoc($result_material_list)) {
                     
                         
						 $rate = $row_material_list['rate_per_unit'];
					  $vat = $row_material_list['vat_percentage'];
					  $qty = $row_material_list['quantity'];
					  $tax = ($rate * $vat /100)+$rate;;
			            $amount = $tax * $qty;
					 
					  
					  
					  $tot_amount += $amount; 
                
                          $content = $content.'<tr nobr="true" style="border-bottom: 1px solid gray;">';
                          $content = $content.' <td bgcolor="#f2f2f2" style="vertical-align: top;">'.$count.'</td>';
                          $content = $content.'  <td bgcolor="#f2f2f2" style="text-align: left"><strong>'.trim($row_material_list['item_name']).'</strong></td>';
                          $content = $content.'  <td bgcolor="#f2f2f2" style="text-align: center">'.number_format($row_material_list['quantity'],2).'</td>';
                          $content = $content.'  <td bgcolor="#f2f2f2" style="text-align: center">'.$row_material_list['units'].'</td>';
                          $content = $content.'  <td bgcolor="#f2f2f2" style="text-align: center">'.number_format($row_material_list['rate_per_unit'],3).'</td>';
                          $content = $content.'  <td bgcolor="#f2f2f2" style="text-align: center">'.number_format($tax,3).'</td>';
                          $content = $content.'  <td bgcolor="#f2f2f2" style="text-align: right">'.number_format($amount,3). '</td>'; //$amt=$amt+$row["amount"].
    
                          $amt=$amt+$row["net_amount"]; 
                          $tot_amt=$tot_amt+$row["net_amount"]; 
						  //$content = $content.$amt;   	  
                          $content = $content.'</tr>';
						  $count = $count + 1;
					  
	  }// Close of While 
	  
	            $content = $content.'<tr style="border-bottom: 1px solid gray;" bgcolor="#85C1E9">';
					$content = $content.'    <td style="text-align: center">&nbsp;</td>';
					$content = $content.'    <td colspan="1" style="text-align: left"><strong>Total</strong></td>';
					$content = $content.'    <td style="text-align: right"></td>';
					$content = $content.'    <td style="text-align: center"></td>';
					$content = $content.'    <td style="text-align: center"></td>';
					$content = $content.'    <td style="text-align: center"></td>';
					$content = $content.'    <td style="text-align: right"><strong>'.number_format($tot_amount,3).'</strong></td>';
				$content = $content.'  </tr>';
				
				$content = $content.'<tr style="border-bottom: 1px solid gray;">';
					$content = $content.'    <td style="text-align: center">&nbsp;</td>';
					$content = $content.'    <td colspan="1" style="text-align: left">Material</td>';
					$content = $content.'    <td style="text-align: right"></td>';
					$content = $content.'    <td style="text-align: center"></td>';
					$content = $content.'    <td style="text-align: center"></td>';
					$content = $content.'    <td style="text-align: center"></td>';
					$content = $content.'    <td style="text-align: right">'.number_format($tot_amount,3).'</td>';
				$content = $content.'  </tr>';
				
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
			  
		  }
				
				$content = $content.'<tr style="border-bottom: 1px solid gray;">';
					$content = $content.'    <td style="text-align: center">&nbsp;</td>';
					$content = $content.'    <td colspan="1" style="text-align: left">Labour</td>';
					$content = $content.'    <td style="text-align: right">'.$labour_cost_value.'</td>';
					$content = $content.'    <td style="text-align: center"></td>';
					$content = $content.'    <td style="text-align: right">'.number_format($labour_rate,3).'</td>';
					$content = $content.'    <td style="text-align: right"></td>';
					$content = $content.'    <td style="text-align: right">'.number_format($labour_cost_amt,3).'</td>';
				$content = $content.'  </tr>';
				
				$content = $content.'<tr style="border-bottom: 1px solid gray;">';
					$content = $content.'    <td style="text-align: center">&nbsp;</td>';
					$content = $content.'    <td colspan="1" style="text-align: left">Equipment</td>';
					$content = $content.'    <td style="text-align: right">'.$equipment_cost_value.'</td>';
					$content = $content.'    <td style="text-align: center"></td>';
					$content = $content.'    <td style="text-align: right">'.number_format($equipment_rate,3).'</td>';
					$content = $content.'    <td style="text-align: right"></td>';
					$content = $content.'    <td style="text-align: right">'.number_format($equipment_cost_amt,3).'</td>';
				$content = $content.'  </tr>';
				
				$content = $content.'<tr style="border-bottom: 1px solid gray;">';
					$content = $content.'    <td style="text-align: center">&nbsp;</td>';
					$content = $content.'    <td colspan="1" style="text-align: left">Service</td>';
					$content = $content.'    <td style="text-align: right">'.$service_cost_value.'</td>';
					$content = $content.'    <td style="text-align: center"></td>';
					$content = $content.'    <td style="text-align: right">'.number_format($service_rate,3).'</td>';
					$content = $content.'    <td style="text-align: right"></td>';
					$content = $content.'    <td style="text-align: right">'.number_format($service_cost_amt,3).'</td>';
				$content = $content.'  </tr>';
				
				$content = $content.'<tr style="border-bottom: 1px solid gray;">';
					$content = $content.'    <td style="text-align: center">&nbsp;</td>';
					$content = $content.'    <td colspan="1" style="text-align: left">Other</td>';
					$content = $content.'    <td style="text-align: right">'.$other_cost_value.'</td>';
					$content = $content.'    <td style="text-align: center"></td>';
					$content = $content.'    <td style="text-align: right">'.number_format($other_rate,3).'</td>';
					$content = $content.'    <td style="text-align: right"></td>';
					$content = $content.'    <td style="text-align: right">'.number_format($other_cost_amt,3).'</td>';
				$content = $content.'  </tr>';
				
				$content = $content.'<tr style="border-bottom: 1px solid gray;" bgcolor="#85C1E9">';
					$content = $content.'    <td style="text-align: center">&nbsp;</td>';
					$content = $content.'    <td colspan="1" style="text-align: left"><strong>Margin</strong></td>';
					$content = $content.'    <td style="text-align: right">'.$margin_cost_value.'</td>';
					$content = $content.'    <td style="text-align: center"></td>';
					$content = $content.'    <td style="text-align: right">'.number_format($margin_rate,3).'</td>';
					$content = $content.'    <td style="text-align: right"></td>';
					$content = $content.'    <td style="text-align: right">'.number_format($margin_cost_amt,3).'</td>';
				$content = $content.'  </tr>';
				
               
//$pdf->Ln(5);
$html = <<<EOD

<table width="100%" border="0" cellspacing="0" cellpadding="5" align="center" id="main_table">
 
 
  <tbody>
    <tr >
      <td style="padding-left: 10px;padding-right: 10px">
          
          <table width="100%" border="0" cellspacing="0" cellpadding="5">
        <tbody>
         <tr >
      <td style="padding-left: 10px;padding-right: 10px">
          
          <table width="100%" border="0" cellspacing="0" cellpadding="5">
        <tbody>
          <tr>
           <td width="50%" align="left" valign="top" style="padding-bottom: 0px;"></td>
           <td align="left" valign="top" >
				<table width="100%"  cellspacing="0" cellpadding="5">
					<tbody>
						<tr >
						  <td style="text-align: center; color: #FFFFFF; font-size: 20px; font-family: 'Century Gothic';" bgcolor="#0079DD">Primary Cost - Item List</td>
						</tr>
					
					</tbody>
				</table>
			</td>
          </tr>
          <tr>
            <td align="left" valign="top" style="padding-top: 0px;">
				<table border="0" cellspacing="0" cellpadding="6">
				  <tbody>
				  <tr><td>
					<strong>Product : $product_name </strong><br>
                    <strong>Qty : $product_qty </strong> <br>
                    <strong>Per /Pcs : $product_rate_per_unit_cost </strong><br>
                   </td></tr>
				  </tbody>
				</table>
              </td>
            <td  align="right" valign="top">
			  <table width="100%"  cellspacing="0" cellpadding="6">
              <tbody>
                <tr><td>
					<strong>Project : $project_name </strong><br>
                    <strong>Client : $company_name </strong> <br>
                    <strong>Att : $contact_person </strong><br>
                </td></tr>
                
              </tbody>
            </table>
			  </td>
          </tr>
        </tbody>
      </table>
	  </td>
    </tr>
         
        </tbody>
      </table>
		
	  </td>
    </tr>
    <tr >
      <td style="padding-left: 10px;padding-right: 10px">
         
         <table width="100%" border="1px" cellspacing="0" cellpadding="5"  style="border-collapse: collapse;">
        <tbody>
          <tr>
            <td class="style2" style="text-align:center; color: #FFFFFF; width:10%;" bgcolor="#0079DD"><strong>Sl No </strong></td>
			<td class="style2" style="text-align:center; color: #FFFFFF; width:25%;" bgcolor="#0079DD"><strong>Item</strong></td>
			<td class="style2" style="text-align:center; color: #FFFFFF;" bgcolor="#0079DD"><strong>Qty</strong></td>
			<td class="style2" style="text-align:center; color: #FFFFFF;" bgcolor="#0079DD"><strong>Unit</strong></td>
			<td class="style2" style="text-align:center; color: #FFFFFF; width:10%;" bgcolor="#0079DD"><strong>Rate</strong></td>
			<td class="style2" style="text-align:center; color: #FFFFFF; width:12%;" bgcolor="#0079DD"><strong>Tax(VAT)</strong></td>
			<td class="style2" style="text-align:center; color: #FFFFFF; width:12%;" bgcolor="#0079DD"><strong>Amount</strong></td>
          </tr>  
          
		$content
		        
		</tbody>
	    </table>
	  </td>
    </tr>
</tbody>
</table>



EOD;


$pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);



//Close and output PDF document
$pdf->Output($finished_pdt_id.'.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
