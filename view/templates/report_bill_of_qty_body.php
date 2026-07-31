<?PHP 
//require ('../model/db_connection/connection.php');
 // $db_conn= new DBConnection();
 //$con = $db_conn->ConnectToMYSQL();
  
?>
<style>
.advisorsExportButton
{
position: absolute;

-webkit-transform:translate(+150%, -145%); :)
   
}

/*@media only screen and (max-width: 600px) {*/
  /* For mobile phones: */
/* table {*/
/*     background-color: lightblue;*/
/*     float: none;*/
/*    position:relative;*/
/*    bottom:50vw;*/
/*    left:100vw;*/
/*  }*/
/*}*/

.material-icons.md-22{font-size:22px;}
</style>
 <!-- content page -->
        <div class="container mt-2 main-container" >
            
            
            
            
            <div class="card">
                <div class="card-header text-white" style="background: linear-gradient(90deg, rgba(10,87,173,1) 0%, rgba(23,148,255,1) 13%, rgba(0,44,215,0.9780287114845938) 100%);">
                    <div class="media w-100 ">
                        <figure class="avatar avatar-40 rounded-circle align-self-start ">
                           <img src="../../httpdocs/images/company_profile_image/995847_236195_504913_logo_main.png" alt="Generic placeholder image">
                        </figure>
                        <div class="media-body">
                            <h5 class="time-title mb-0  text-white">Bill of Quantity Reports</h5>
                           <!-- <p class="mb-0  text-white">Click right icon to get List of Projects<span class="status bg-success"> </span></p>-->
                        </div>
                        <!--<div class="dropdown d-inline-block">-->
                        <!--    <a href="#" class="icon-circle icon-30 text-white ml-3 mt-1 dropdown-toggle caret-none" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
                        <!--        <i class="material-icons ">more_vertical</i>-->
                        <!--    </a>-->
                        <!--    <div class="dropdown-menu dropdown-menu-right">-->
                        <!--        <a href="" class="dropdown-item">New</a>-->
                               <!-- <button style="position:relative;bottom:-5px;" class="btn btn-sm btn-outline-light" onclick="openNavR()" id="btn_view_list_of_project">List of Projects</button>-->
                                
                        <!--    </div>-->
                        <!--</div>-->
                    </div>
                </div>
                <div class="card-body py-0">
                     
                   
                    <!--Company FORM-->
                    
                    
                    <div class="card-body">
                    <div class="row justify-content-center">
                        <div class="col-md-10 col-sm-10">
                            <div class="form-group row">
                                <div class="col-lg-4 col-md-4 col-sm-4">
                                    
                                    <label>Company/Client Name</label>
                                    <div id="div_company_select">
                                    <select class="chosen_select form-control " id="select_company" tabindex="1" >
                                               
                                               
                                             
                                     </select>
                                    </div>
                                    <input type="hidden" class="form-control form-control-sm" id="txt_product_company_id">
                                    <!--<input type="hidden" class="form-control form-control-sm" id="txt_quotation_company_id"> -->
                                </div>
                                
                                <div class="col-lg-4 col-md-4 col-sm-4">
                                    
                                         <label>Project</label>
                                
                                        <div id="div_project_select">
                                    
                                    
                                          
                                  
                                           <select class="chosen_select form-control form-control-sm" id="select_project_name" tabindex="-1" name="select_project_name" >
                                                
                                                    <option value="0">Select Project</option>
                                               
                                            </select>
                                        </div>
                                </div>
                                <input type="hidden" class="form-control form-control-sm" id="txt_product_project_id" name="txt_product_project_id">
                                
                                <?PHP 
                                  // $result = mysqli_query($con,"SELECT profile_image FROM company_details where company_id=".$_GET["txt_product_project_id"]);
                                   // while($row=mysqli_fetch_assoc($result)) {
                                ?>
                                
                                
                               <input type="hidden" class="form-control form-control-sm" id="company_profile_img_name" name="company_profile_img_name">
                               <input type="hidden" class="form-control form-control-sm" id="txt_project_vat" name="txt_project_vat"> 
                               <input type="hidden" class="form-control form-control-sm" id="txt_total_amnt" name="txt_total_amnt"> 
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-top:29px">
                                        <button class="btn btn-info" id="btn_view_products"> <i class="material-icons">search</i> </button>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    
                   
                  
                </div>
                
                
                
                 <hr>
                    <div class="col-sm-12 col-md-12 col-lg-12" style="padding:0px" id="tbl_list_device">
                    <div class="card rounded-0 border-0 mb-11">
                     <h5 class="m-0">   Product Details</h5>
                     <br/>
                     <div class="form-group row">
                        <div class="col-lg-1 col-md-1 col-sm-1">
                           <button class="btn btn-primary btn-xs" id="btn_boq_print"> <i class="material-icons md-22">print</i> </button> 
                        </div> 
                        <!--<div class="dis_button" id="export_to_excel" >
                           
                        </div>-->
                         <div class="col-lg-10 col-md-10 col-sm-10">
                            
                        </div>
                    </div>
                        <div id="example_wrapper" class="dataTables_wrapper">
                           
                        
                        <!--Table-->
                            <table class="table table-striped table-bordered dt-responsive nowrap" id="list_of_product_report"  style="padding-top:5px;font-size:12px;width:100%">
                            <!--Table-->
                            
                                <thead>
                                    <tr >
                                        
                                        <th class="text-center" style="font-size:15px">Sl No </th>
                                        
                                        <th class="text-center" style="font-size:15px">Desc</th>
                                        
                                        <th class="text-center" style="font-size:15px">Qty</th>
                                        <th class="text-center" style="font-size:15px">Unit</th>
                                        <th class="text-center" style="font-size:15px">Rates/Unit</th>
                                        
                                        <th class="text-center" style="font-size:15px">Tot Amt</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                   
                                </tbody>
                                <tfoot>
                                        
                                        <tr>
                                            <th colspan="6"></th>
                                        </tr>
                                        
                                        <tr>
                                            <th  class="text-right" colspan="5">Total Amount </th>
                                            <th class="text-right"></th>
                                        </tr>
                                        <tr>
                                            <th  class="text-right" colspan="5">VAT (<span id="vat_prctg"></span>% )</th>
                                            <th class="text-right"></th>
                                        </tr>
                                        <tr>
                                            <th  class="text-right" colspan="5">Grand Total  </th>
                                            <th class="text-right"></th>
                                        </tr>
                                    </tfoot>
                            </table>
                            <!-- /.table-responsive -->
                        
                        
                        
                        
                        <!--</div>-->
                        <!--<div class="card-footer">-->
                        <!--    <button class="btn btn-primary"> View</button>-->
                        <!--</div>-->
                    </div>
                    
         </div>
         
        </div>
       
<!-- content page ends -->
    <br>
        
          
            <hr>
                   
                    <!--Company FORM End-->
                  
            </div>
            

            </div>
             
            
        </div>
       


        
       