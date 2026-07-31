<?

require ('../../model/common/common_functions.php');
   
   // var	$invoice_number,$invoice_date,$company_name,$po_box,$telephone_no,$fax,$address,$attn,$quotation_reference,$LPO_no;
   
   $db_con = new DBConnection();
   $conns = $db_con->ConnectToMYSQL();

    
    $result = mysqli_query($conns,"select * from receipts where	receipts_no = '".$_GET['receipts_no']."'");
    while($row=mysqli_fetch_assoc($result)) {
        $receipts_no = $row['receipts_no'];
        $receipts_date = date("m-d-Y H:i:s A", strtotime($row['receipts_date']));
        $receipts_method = $row['receipts_method'];
        $received_from = $row['received_from'];
        $sum_of_amount = $row['sum_of_amount'];
        $cheque_no = $row['cheque_no'];
        $bank = $row['bank'];
        $cheque_date = date("m-d-Y", strtotime($row['cheque_date'])); 
        $invoice_id = $row['invoice_id']; 
        $received_by = $row['received_by'] ;
        $verified_by = $row['verified_by'] ;
        $total_amount = $row['total_amount'] ;
       
        
        
    } 
    
    
     $result_company = mysqli_query($conns,"select * from company_primary_details");
    while($row_company=mysqli_fetch_assoc($result_company)) {
        $print_companynamne = $row_company['company_name'];
        $print_address = $row_company['address'];
        $print_tele = $row_company['phone_no'];
        $print_fax = $row_company['fax'];
        $print_email = $row_company['email'];
        $print_po = $row_company['pobox'];
        $print_logo = $row_company['print_logo'];
    }
         
      function getCurrency($number)
    {
     
    $decimal = round($number - ($no = floor($number)), 3) * 1000;
    $hundred = null;
    $digits_length = strlen($no);
    $i = 0;
    $str = array();
    $words = array(0 => '', 1 => 'one', 2 => 'two',
        3 => 'three', 4 => 'four', 5 => 'five', 6 => 'six',
        7 => 'seven', 8 => 'eight', 9 => 'nine',
        10 => 'ten', 11 => 'eleven', 12 => 'twelve',
        13 => 'thirteen', 14 => 'fourteen', 15 => 'fifteen',
        16 => 'sixteen', 17 => 'seventeen', 18 => 'eighteen',
        19 => 'nineteen', 20 => 'twenty', 30 => 'thirty',
        40 => 'forty', 50 => 'fifty', 60 => 'sixty',
        70 => 'seventy', 80 => 'eighty', 90 => 'ninety');
    $digits = array('', 'hundred','thousand','lakh', 'crore');
    while( $i < $digits_length ) {
        $divider = ($i == 2) ? 10 : 100;
        $number = floor($no % $divider);
        $no = floor($no / $divider);
        $i += $divider == 10 ? 1 : 2;
        if ($number) {
            $plural = (($counter = count($str)) && $number > 9) ? 's' : null;
            $hundred = ($counter == 1 && $str[0]) ? ' and ' : null;
            $str [] = ($number < 21) ? $words[$number].' '. $digits[$counter]. $plural.' '.$hundred:$words[floor($number / 10) * 10].' '.$words[$number % 10]. ' '.$digits[$counter].$plural.' '.$hundred;
        } else $str[] = null;
    }
    $Rupees = implode('', array_reverse($str));
   
    $paise = ($decimal > 0) ? ". " . ($words[$decimal / 100] . " " . $words[substr($decimal, 1) / 10]. " " . $words[$decimal % 10]) . ' ' : '';
    return ucwords(($Rupees ? $Rupees . ' ' : ' ') . $paise);
}                             
?>

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Receipts</title>
<style>
	
/* Styles go here */

.page-header, .page-header-space {
  height: 60px;
}

.page-footer, .page-footer-space {
  height: 50px;

}

.page-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid black; /* for demo */
  background: white; /* for demo */
 

}

.page-header {
  position: fixed;
  top: 0mm;
  width: 100%;
  /*border-bottom: 1px solid black;  for demo */
  background: white; /* for demo */
  
}

.page {
  page-break-after: always;
  text-align: center;
}

@page {
  margin: 15mm
}

@media print {
   thead {display: table-header-group;} 
   tfoot {display: table-footer-group;}
   
   button {display: none;}
   
   body {margin: 0;}
}	
 
</style>
</head>

<body>
    <div class="page-header" style="text-align: center" align="center">
   
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tbody>
                        <tr style="text-align:left;">
                          <td width="25%" align="right" valign="top"><img src="../../httpdocs/images/company_profile_image/<?PHP echo $print_logo;?>" width="238" height="49" alt=""/></td>
                          <td width="75%" align="left" valign="top">&nbsp;
                          </td>
                        </tr>
                        <tr>
                          <td><br>
                          
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
	
</div>	
<div class="page-footer" align="center">
    
	
	
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                     <tbody>
                        <tr style="text-align:middle; border-bottom:">
                          <td colspan="2" align="center" valign="middle" style="padding-top:5px;">
						
							<?PHP echo $print_companynamne;?>,
                            <?PHP echo $print_address;?>,
                            <?PHP echo " , Tele : ".$print_tele." , FAX : ".$print_fax." , Email : ".$print_email;?><br>      
							
							</td>
                        </tr>
                        <tr>
                          <td width="50%"><br>
                          
                          </td>
                          <td width="50%"></td>
                        </tr>
                      </tbody>
                    </table>
           
           
	
	
</div>	

<page size="A4">
     
<table width="800" border="0" cellspacing="0" cellpadding="15" align="center">
    
    <thead>
      <tr>
        <td>
          <!--place holder for the fixed-position header-->
          <div class="page-header-space"></div>
        </td>
      </tr>
    </thead>
    
  <tbody>
    <tr>
      <td width="190" valign="middle" style="text-align: right;">&nbsp;</td>
      <td width="570" align="right">
          <table width="370px"  cellspacing="0" cellpadding="5" align="right">
        <tbody>
          <tr >
            <td align="right" valign="top" bgcolor="#0079DD" style="text-align: center; color: #FFFFFF; font-size: 26px; font-family: 'Century Gothic';">RECEIPTS </td>
          </tr>
        </tbody>
      </table></td>
      </tr>
    <tr >
        <td colspan="2" align="left" valign="middle" style="text-align: center">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tbody>
            <tr style="border-bottom:1pt solid black;">
              <td style="text-align: left;border-bottom:1pt solid black;">Receipt No : <strong><?PHP echo $receipts_no; ?></td>
              <td style="text-align: center;border-bottom:1pt solid black;">Cash</td>
              <td style="text-align: center;border-bottom:1pt solid black;"><input type="checkbox" name="checkbox" id="checkbox" <?PHP if(trim($receipts_method)=='Cash'){echo 'checked';}else {echo 'disabled';}?>></td>
              <td style="text-align: right;border-bottom:1pt solid black;">Cheque </td>
              <td style="text-align: center;border-bottom:1pt solid black;"><input type="checkbox" name="checkbox2" id="checkbox2" <?PHP if(trim($receipts_method)=='Cheque'){echo 'checked';}else {echo 'disabled';}?>></td>
              <td style="text-align: right;border-bottom:1pt solid black;">Transfer </td>
              <td style="text-align: center;border-bottom:1pt solid black;"><input type="checkbox" name="checkbox3" id="checkbox3" <?PHP if(trim($receipts_method)=='Transfer'){echo 'checked';}else {echo 'disabled';}?>></td>
              <td style="text-align: right;border-bottom:1pt solid black;">
				Date : <strong><?PHP echo $receipts_date; ?>
				</td>
            </tr>
          </tbody>
        </table></td>
      </tr>
          <tr>
            <td align="left" valign="left" >
		    Received with thanks from :</td>
            <td align="left" valign="left" style="text-align: left;border-bottom:1pt solid black;"><strong><?PHP echo $received_from;?></strong></td>
          </tr>
          <tr>
            <td align="left" valign="left" >
			  
		    The Sum of BD.</td>
            <td align="left" valign="left" style="text-align: left;border-bottom:1pt solid black;"><strong><?PHP echo getCurrency($sum_of_amount);?> Only</strong></td>
          </tr>
          <tr>
            <td colspan="2" align="left" valign="left" style="text-align: left;padding-left:0px;padding-right:0px;border-bottom:1pt solid black;"><table width="100%" border="0" cellspacing="10" cellpadding="5">
              <tbody>
                <tr>
                  <td width="17%" >By Cheque No/ TRF : </td>
                  <td width="20%" style="border-bottom:1pt solid black;"><?PHP echo $cheque_no;?></td>
                  <td width="14%" >Bank :</td>
                  <td width="21%" style="border-bottom:1pt solid black;"><?PHP echo $bank;?></td>
                  <td width="12%">Date : </td>
                  <td width="16%" style="border-bottom:1pt solid black;"><?PHP echo $cheque_date;?></td>
                </tr>
                <tr >
                  <td colspan="6"><table width="100%" border="0" cellspacing="0" cellpadding="5" >
                    <tbody>
                      <tr>
                        <td width="24%" style="padding-left:0px;">The Sum of BD.</td>
                        <td width="76%" style="border-bottom:1pt solid black;"><strong><?PHP echo getCurrency($sum_of_amount);?> Only</strong></td>
                      </tr>
                    </tbody>
                  </table>
                 </td>
                </tr>
                <tr style="border-bottom:1pt solid black;">
                  <td colspan="6"></td>
                </tr>
                <tr>
                  <td>Received : </td>
                  <td style="border-bottom:1pt solid black;"><?PHP echo $received_by;?></td>
                  <td>Verified : </td>
                  <td style="border-bottom:1pt solid black;"><?PHP echo $verified_by;?></td>
                  <td>Amount BD :</td>
                  <td style="border-bottom:1pt solid black;"><strong><?PHP echo number_format($total_amount,3);?></strong></td>
                </tr>
                <!--<tr>
                  <td colspan="6">Inwords : <b><?PHP //echo getCurrency($total_amount);?></b> Only</td>
                </tr>-->
                <tr >
                  <td colspan="6" style="padding-top:20px;" >Cheque Payment: This is Valid on realization of Cheque.</td>
                </tr>
              </tbody>
            </table></td>
          </tr>
         
    </tbody>
  </table>
		
		
		
		
	  </td>
    </tr>
  <tr >
      <td style="padding-left: 10px;padding-right: 10px">&nbsp;</td>
  </tr>

  <!--<div style="break-after:page"></div>-->
<table width="800" border="0" cellspacing="0" cellpadding="5" align="center">
  <tbody>
    
  </tbody>
</table>

</page>

</body>

</html>
