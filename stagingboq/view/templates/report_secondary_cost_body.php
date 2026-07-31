
<style>
.advisorsExportButton
{
position: absolute;

-webkit-transform:translate(+150%, -145%); :)
   
}

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
                            <h5 class="time-title mb-0  text-white">Secondary Cost Reports</h5>
                           <!-- <p class="mb-0  text-white">Click right icon to get List of Projects<span class="status bg-success"> </span></p>-->
                        </div>
                       
                    </div>
                </div>
                <div class="card-body py-0">
                     
                   
                    <!--Company FORM-->
                    
                    
                    <div class="card-body">
                    <div class="row justify-content-center">
                        <div class="col-md-10 ">
                            <div class="form-group row">
                                <div class="col-lg-4 col-md-4">
                                    
                                    <label>Company/Client Name</label>
                                    <div id="div_company_select_seconadry">
                                    <select class="chosen_select form-control " id="select_company_seconadry" tabindex="1" >
                                               
                                               
                                             
                                     </select>
                                    </div>
                                    <input type="hidden" class="form-control form-control-sm" id="txt_product_company_id_seconadry">
                                    <!--<input type="hidden" class="form-control form-control-sm" id="txt_quotation_company_id"> -->
                                </div>
                                
                                <div class="col-lg-4 col-md-4">
                                    
                                         <label>Project</label>
                                
                                        <div id="div_project_select_seconadry">
                                    
                                    
                                          
                                  
                                           <select class="chosen_select form-control form-control-sm" id="select_project_name_seconadry" tabindex="-1" name="select_project_name" >
                                                
                                                    <option value="0">Select Project</option>
                                               
                                    </select>
                               </div>
                                </div>
                              <input type="hidden" class="form-control form-control-sm" id="txt_project_vat">
                              <input type="hidden" class="form-control form-control-sm" id="txt_total_amnt" name="txt_total_amnt"> 
                               <!--<div class="col-lg-2 col-md-2">-->
                               <!--     <label>VAT % <st style="color:red">*</st></label>-->
                               <!--     <div id="div_tax_select">-->
                               <!--     <select class="form-control form-control-sm" id="select_tax_name" data-live-search="true" tabindex="-1" aria-hidden="true">-->
                                                <!--<option value="1">Tax 1</option>-->
                                                <!--<option value="2">Tax 2</option>-->
                                                <!--<option value="3">Tax 3</option>-->
                                                <!--<option value="4">Tax 4</option>-->
                                               
                               <!--             </select>-->
                               <!--     </div>        -->
                               <!-- </div>-->
                                
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-top:29px">
                                        <button class="btn btn-info" id="btn_view_seconadry_cost"> <i class="material-icons">search</i> </button>
                                    </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    
                   
                  
                </div>
                
                
                
                 <hr>
                    <div class="col-sm-12 col-md-12 col-lg-12" style="padding:0px">
                    <div class="card rounded-0 border-0 mb-12">
                     <h5 class="m-0">Seconadry Cost Details</h5>
                     <br/>
                       <div class="form-group row">
                        <div class="col-lg-1 col-md-1">
                             <button class="btn btn-primary btn-xs" id="btn_secondary_cost_print"> <i class="material-icons md-22">print</i> </button>
                        </div> 
                        <div class="col-lg-10 col-md-10">
                           
                        </div>
                    </div>         
                        <div >
                        <!--Table-->
                            <table class="table table-striped table-bordered dt-responsive nowrap" id="seconadry_cost_product_report"  style="padding-top:5px;font-size:12px;width:100%">
                            <!--Table-->
                           
                                <thead>
                                    <tr >
                                        
                                        <th class="text-center" style="font-size:15px">Sl No </th>
                                         <th class="text-center" style="font-size:15px">Category</th>
                                        <th class="text-center" style="font-size:15px">Desc</th>
                                        
                                        <th class="text-center" style="font-size:15px">Qty</th>
                                        <th class="text-center" style="font-size:15px">Unit</th>
                                        <th class="text-center" style="font-size:15px">Tot. Wt</th>
                                        <th class="text-center" style="font-size:15px">m<sup>2</sup></th>
                                        
                                        <th class="text-center" style="font-size:15px">m<sup>3</th>
                                        
                                        
                                         <th class="text-center" style="font-size:15px">Rate</th>
                                        <th class="text-center" style="font-size:15px">Tot Amt</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                  <tfoot>
                                      <th></th>
                                      <th></th>
                                      <th></th>
                                      <th></th>
                                      <th></th>
                                      <th></th>
                                       <th></th>
                                      <th></th>
                                      <th></th>
                                      <th></th>
                                  </tfoot>  
                                </tbody>
                               
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
       


        
       