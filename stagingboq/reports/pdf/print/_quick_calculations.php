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
	
	public function Footer() {
        // Select Arial italic 8
        $this->SetFont('helvetica', 'I', 8);

        // Position at 15 mm from bottom
        $this->SetY(-15);

        $pageNumber = $this->getAliasNumPage();
        $totalPages = $this->getAliasNbPages();

        
        $this->Cell(350, 10, 'Page ' . $pageNumber . ' of ' . $totalPages, 0, false, 'C');

        // Increment page counter
        $this->pageCount++;
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
    
   $v_master_prod_id = $_GET['v_master_prod_id'];
   //$company_id = $_GET['v_company_id'];
   

	$result_product_details = mysqli_query($conns,"SELECT * FROM master_finished_quick_item_details_entry WHERE master_product_quick_id = ".$v_master_prod_id." ");
	  while($row_fetch_product =mysqli_fetch_assoc($result_product_details)) 
	  {
		  $product_name = $row_fetch_product['product_name'];
		  $project_name = $row_fetch_product['project_name'];
		  $product_qty = $row_fetch_product['product_qty'];
		  $company_name = $row_fetch_product['company_name'];
		  $product_rate_per_unit_cost = $row_fetch_product['product_rate_per_unit_cost'];
		  $a = $row_fetch_product[''];
	  }
   
// 	$result_company_details = mysqli_query($conns,"SELECT * FROM company_details WHERE company_id = ".$company_id." ");
// 	  while($row_fetch_company =mysqli_fetch_assoc($result_company_details)) 
// 	  {
// 		$contact_person = $row_fetch_company['contact_person'];  
// 		$contact_address = $row_fetch_company['contact_address_2'];  
// 	  }
                               

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
//$pdf->setPrintFooter(false);

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

						$color = "#09037f";
                        $border_bottom = "border-bottom: 1px solid #09037f;border-top: 1px solid #09037f;";
                        $border_bottom_line= "border-bottom: 1px solid #09037f;border-top: 1px solid #09037f;";
                        $border_left = "border-left: 1px solid #09037f";
                        $table_title_style = "text-align: center; color: #FFFFFF;font-size:12px;border: 1px solid #09037f;";
                        $table_title_bg = "#09037f";
                        $table_background = "background: transparent;"; 
                        $para_justify = "text-align: justify;text-justify: inter-word;display: inline-block;";
                        $valign_middle = "line-height: 40px;";
						$valign_middle1 = "line-height: 20px;";


// add a page
$pdf->AddPage();

  
            $result_material_list = mysqli_query($conns,"SELECT * FROM master_finished_quick_item_details_entry WHERE master_product_quick_id = ".$v_master_prod_id." ");
			$count=1;
			$tot_amount=0;
                    while($row_material_list =mysqli_fetch_assoc($result_material_list)) {
                     
                         
						 $rate = $row_material_list['rate_per_unit'];
					  $vat = $row_material_list['vat_percentage'];
					  $qty = $row_material_list['quantity'];
					  $tax = ($rate * $vat /100)+$rate;;
			            $amount = $tax * $qty;
					 
					  
					  
					  $tot_amount += $amount; 
                
                          $content = $content.'<tr nobr="true" style="'.$border_bottom.';">';
                          $content = $content.' <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.$count.'</td>';
                          $content = $content.'  <td style="text-align: left;'.$valign_middle1.$border_bottom.$border_left.';">'.trim($row_material_list['item_name']).'</td>';
                          $content = $content.'  <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.number_format($row_material_list['quantity'],2).'</td>';
                          $content = $content.'  <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.$row_material_list['units'].'</td>';
                          $content = $content.'  <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.number_format($row_material_list['rate_per_unit'],3).'</td>';
                          $content = $content.'  <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.number_format($tax,3).'</td>';
                          $content = $content.'  <td style="text-align: right;'.$valign_middle1.$border_bottom.$border_left.';">'.number_format($amount,3). '</td>'; //$amt=$amt+$row["amount"].
     
                          $amt=$amt+$row["net_amount"]; 
                          $tot_amt=$tot_amt+$row["net_amount"]; 
						  //$content = $content.$amt;   	  
                          $content = $content.'</tr>';
						  $count = $count + 1;
					  
	  }// Close of While 
	  
	            $content = $content.'<tr style="'.$border_bottom.';">';
					$content = $content.'    <td colspan="6" style="text-align: left;'.$valign_middle1.$border_bottom.$border_left.';"><strong>Material Amount</strong></td>';
					$content = $content.'    <td  style="text-align: right;'.$valign_middle1.$border_bottom.$border_left.';"><strong>'.number_format($tot_amount,3).'</strong></td>';
				$content = $content.'  </tr>';
				
				// $content = $content.'<tr style="border-bottom: 1px solid gray;">';
					// $content = $content.'    <td colspan="6" style="text-align: left">Tax</td>';
					// $content = $content.'    <td style="text-align: right">'.number_format($a,3).'</td>';
				// $content = $content.'  </tr>';
				
				// $content = $content.'<tr style="border-bottom: 1px solid gray;">';
					// $content = $content.'    <td colspan="6" style="text-align: left">Total Amount </td>';
					// $content = $content.'    <td style="text-align: right">'.number_format($tot_amount,3).'</td>';
				// $content = $content.'  </tr>';
				
		  $result_product_details = mysqli_query($conns,"SELECT * FROM `master_finished_quick_product_table` WHERE `master_finished_quick_id` = ".$v_master_prod_id." ");
        
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
			
	//------------------------------------------------------------  Content two table ---------------------------------------------------------\\			
				$content_two = $content_two.'<tr nobr="true" style="'.$border_bottom.';">';
					$content_two = $content_two.'<td style="text-align: left;'.$valign_middle1.$border_bottom.$border_left.';">Material Cost</td>';
					$content_two = $content_two.'<td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.$a.'</td>';
					$content_two = $content_two.'<td colspan="1" style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';"></td>';
					$content_two = $content_two.'<td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.number_format($tot_amount,3).'</td>';
				$content_two = $content_two.'  </tr>';
				
				$content_two = $content_two.'<tr nobr="true" style="'.$border_bottom.';">';
					$content_two = $content_two.'    <td style="text-align: left;'.$valign_middle1.$border_bottom.$border_left.';">Labour</td>';
					$content_two = $content_two.'    <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.$labour_cost_value.'</td>';
					$content_two = $content_two.'    <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.number_format($labour_rate,3).'</td>';
					$content_two = $content_two.'    <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.number_format($labour_cost_amt,3).'</td>';
				$content_two = $content_two.'  </tr>';
				
				$content_two = $content_two.'<tr nobr="true" style="'.$border_bottom.';">';
					$content_two = $content_two.'    <td style="text-align: left;'.$valign_middle1.$border_bottom.$border_left.';">Eq</td>';
					$content_two = $content_two.'    <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.$equipment_cost_value.'</td>';
					$content_two = $content_two.'    <td colspan="1" style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.number_format($equipment_rate,3).'</td>';
					$content_two = $content_two.'    <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.number_format($equipment_cost_amt,3).'</td>';
				$content_two = $content_two.'  </tr>';
				
				$content_two = $content_two.'<tr nobr="true" style="'.$border_bottom.';">';
					$content_two = $content_two.'    <td style="text-align: left;'.$valign_middle1.$border_bottom.$border_left.';">Service</td>';
					$content_two = $content_two.'    <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.$service_cost_value.'</td>';
					$content_two = $content_two.'    <td colspan="1" style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.number_format($service_rate,3).'</td>';
					$content_two = $content_two.'    <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.number_format($service_cost_amt,3).'</td>';
				$content_two = $content_two.'  </tr>';
				
				$content_two = $content_two.'<tr nobr="true" style="'.$border_bottom.';">';
					$content_two = $content_two.'    <td style="text-align: left;'.$valign_middle1.$border_bottom.$border_left.';">Otherwise</td>';
					$content_two = $content_two.'    <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.$other_cost_value.'</td>';
					$content_two = $content_two.'    <td colspan="1" style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.number_format($other_rate,3).'</td>';
					$content_two = $content_two.'    <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.number_format($other_cost_amt,3).'</td>';
				$content_two = $content_two.'  </tr>';
				
				$content_two = $content_two.'<tr nobr="true" style="'.$border_bottom.';">';
					$content_two = $content_two.'    <td style="text-align: left;'.$valign_middle1.$border_bottom.$border_left.';">Margin</td>';
					$content_two = $content_two.'    <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.$margin_cost_value.'</td>';
					$content_two = $content_two.'    <td colspan="1" style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.number_format($margin_rate,3).'</td>';
					$content_two = $content_two.'    <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.number_format($margin_cost_amt,3).'</td>';
				$content_two = $content_two.'  </tr>';
				   
				    
					
					  
					
				$tot_cost = number_format($margin_cost_amt,3);
               
//$pdf->Ln(5);
$html = <<<EOD

<table width="100%" border="0" cellspacing="0" id="main_table" style="$table_background">
 
 
  <tbody>
    <tr >
      <td style="padding-left: 10px;padding-right: 10px">
          
         <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding-bottom:10px;$table_background">
        <tbody>
         <tr >
		   <td width="49%" align="left" valign="top" style="padding-bottom: 0px;"></td>
				<td align="left" valign="top" >
					<table width="100%"  cellspacing="0" cellpadding="5">
						<tbody>
							<tr >
							  <td style="text-align: center; color: #FFFFFF; font-size: 26px; " bgcolor="$table_title_bg">PRIMARY COST </td>
							</tr>
						
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
      <td align="left" valign="top" style="padding-top: 0px;">
		<table border="0" cellspacing="0" cellpadding="6">
		  <tbody>
		  <tr><td align="left"  style="font-weight:bold;text-align: right;">
			<br>Project : $project_name
			
			<br>
		   </td></tr>    
		  <tr><td align="left"  style="font-weight:bold;text-align: right;">
			<br>Product : $product_name
			
			<br>
		   </td></tr>      
		  </tbody> 
		</table>
	  </td>
	</tr>
    <tr >  
      <td> 
         
         <table width="100%"  cellspacing="0" cellpadding="3"  style="border-collapse: collapse;border: .7em solid $color;$table_background">
        <tbody>
          <tr>
            <td bgcolor="$table_title_bg" style="width:5%;$table_title_style"><strong>S/N</strong></td>
			<td bgcolor="$table_title_bg" style="width:40%;$table_title_style"><strong>DESCRIPTION</strong></td>
			<td bgcolor="$table_title_bg" style="width:10%;$table_title_style"><strong>QTY</strong></td>
			<td bgcolor="$table_title_bg" style="width:10%;$table_title_style"><strong>UNIT</strong></td>
			<td bgcolor="$table_title_bg" style="width:10%;$table_title_style"><strong>RATE</strong></td>  
			<td bgcolor="$table_title_bg" style="width:12%;$table_title_style"><strong>VAT</strong></td>
			<td bgcolor="$table_title_bg" style="width:12%;$table_title_style"><strong>AMOUNT</strong></td> 
          </tr>  
           
		$content
		        
		</tbody>
	    </table>
	  </td>
    </tr>
	<br><br>
	<tr >
      <td>
         
         <table width="100%"  cellspacing="0" cellpadding="3"  style="border-collapse: collapse;border: .7em solid $color;$table_background">
        <tbody>
          <tr>
            <td bgcolor="$table_title_bg" style="width:39%;$table_title_style"><strong>ITEM </strong></td>
			<td bgcolor="$table_title_bg" style="width:20%;$table_title_style"><strong>PERCENTAGE</strong></td>
			<td bgcolor="$table_title_bg" style="width:20%;$table_title_style"><strong>RATE</strong></td>
			<td bgcolor="$table_title_bg" style="width:20%;$table_title_style"><strong>TOTAL COST</strong></td>
          </tr>  
          
		$content_two
		        
		</tbody>
	    </table>
	  </td>
    </tr>
	
	<tr >
      <td align="left" valign="top" style="padding-top: 0px;">
		<table border="0" cellspacing="0" cellpadding="6">
		  <tbody>
		  <tr><td align="left"  style="font-weight:bold;text-align: right;">
			<!--<br>Product Name : $product_name
			<br>Product Qty : $product_qty
			<br>Total Cost Amount : $tot_cost
			<br>Per Pices : $product_rate_per_unit_cost-->
		   </td></tr>  
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
