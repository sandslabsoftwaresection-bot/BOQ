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
 
  
      $company_id = $_GET['v_company_id'];
      $company_name = $_GET['v_company_name'];
      $project_id = $_GET['v_project_id'];
      $project_name = $_GET['v_project_name'];
      $tax_amount = $_GET['v_tax_amount'];


// create new PDF document
$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->setCreator(PDF_CREATOR);
$pdf->setAuthor('SaNDS Lab');
$pdf->setTitle('Bill of Quantity');
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

  
           $result_primary_cost = mysqli_query($conns,"select * from finished_product_table where finished_item_status='Confirmed'and company_id='".$company_id."' and project_id='".$project_id."' group by finished_product_id order by finished_product_id asc");
			$count=1;
			$tot_amount=0;
			
                    while($row_material_list =mysqli_fetch_assoc($result_primary_cost)) {
                        
                        $res=$row_material_list['vat_amount'];
                    
					  $tot_amount += $amount; 
                
                          $content = $content.'<tr nobr="true" style="'.$border_bottom.';">';
                          $content = $content.' <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.$count.'</td>';
                          $content = $content.' <td style="text-align: left;'.$valign_middle1.$border_bottom.$border_left.';">'.trim($row_material_list['product_name']).'</td>';
                          $content = $content.' <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.number_format($row_material_list['product_qty'],2).'</td>';
                          $content = $content.' <td style="text-align: center;'.$valign_middle1.$border_bottom.$border_left.';">'.$row_material_list['product_unit'].'</td>';
                          $content = $content.' <td style="text-align: right;'.$valign_middle1.$border_bottom.$border_left.';">'.number_format($row_material_list['product_rate_per_unit_cost'],3,".",",").'</td>';
                          $content = $content.' <td style="text-align: right;'.$valign_middle1.$border_bottom.$border_left.';">'.number_format($row_material_list['total_amt_report'],3,".",",").'</td>';
     
                          $tot_amnt_vat= $tot_amnt_vat+$row_material_list['total_amnt_after_vat'];
     
                          $amt=$amt+$row["net_amount"]; 
                          $tot_amt=$tot_amt+$row["net_amount"]; 
						  //$content = $content.$amt;   	  
                          $content = $content.'</tr>';
						  $count = $count + 1;
					  
	  }// Close of While 
	
	  $result_bill_of_qty_total = mysqli_query($conns,"SELECT sum(total_amt_report) as prod_total_amnt FROM finished_product_table where finished_item_status='Confirmed'and company_id='".$company_id."' and project_id='".$project_id."'");
        
          while($row_bill_of_qty_total =mysqli_fetch_assoc($result_bill_of_qty_total)) 
          {
               $total_amount=$row_bill_of_qty_total['prod_total_amnt'];
              $vat_amnt=round((($row_bill_of_qty_total['prod_total_amnt']*$tax_amount)/100),2);
                
                $vat_added_total_amnt=round($row_bill_of_qty_total['prod_total_amnt']+$vat_amnt,2);
       
          
			$content = $content.'<tr style="'.$border_bottom.';">';
				$content = $content.'    <td colspan="5" style="text-align: left;'.$valign_middle1.$border_bottom.$border_left.';"><strong>Total Amount </strong></td>';
				$content = $content.'    <td style="text-align: right;'.$valign_middle1.$border_bottom.$border_left.';"><strong>'.number_format($total_amount,3).'</strong></td>';
			$content = $content.'  </tr>';
			
			$content = $content.'<tr style="'.$border_bottom.';">';
				$content = $content.'<td colspan="5" style="text-align: left;' . $valign_middle1 . $border_bottom . $border_left . ';"><strong>VAT (' . number_format($tax_amount,2) . '%)</strong></td>';
				$content = $content.'<td style="text-align: right;'.$valign_middle1.$border_bottom.$border_left.';"><strong>'.number_format($vat_amnt,3).'</strong></td>';
			$content = $content.'  </tr>';
			
			$content = $content.'<tr style="'.$border_bottom.';">';
				$content = $content.'    <td colspan="5" style="text-align: left;'.$valign_middle1.$border_bottom.$border_left.';"><strong>Grand Total </strong></td>';
				$content = $content.'    <td style="text-align: right;'.$valign_middle1.$border_bottom.$border_left.';"><strong>'.number_format($vat_added_total_amnt,3).'</strong></td>';
			$content = $content.'  </tr>';
			
          }		
		 
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
							  <td style="text-align: center; color: #FFFFFF; font-size: 26px; " bgcolor="$table_title_bg">BILL OF QUANTITY</td>
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
			<br>Company : $company_name
			<br>Project Code : $project_id
			<br>Project Name : $project_name
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
			<td bgcolor="$table_title_bg" style="width:45%;$table_title_style"><strong>DESCRIPTION</strong></td>
			<td bgcolor="$table_title_bg" style="width:10%;$table_title_style"><strong>QTY</strong></td>
			<td bgcolor="$table_title_bg" style="width:10%;$table_title_style"><strong>UNIT</strong></td>
			<td bgcolor="$table_title_bg" style="width:13%;$table_title_style"><strong>RATE</strong></td>  
			<td bgcolor="$table_title_bg" style="width:15%;$table_title_style"><strong>AMOUNT</strong></td>
          </tr>  
           
		$content
		        
		</tbody>
	    </table>
	  </td>
    </tr>
	<br><br>
</tbody>
</table>



EOD;


$pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);



//Close and output PDF document
$pdf->Output($finished_pdt_id.'.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
