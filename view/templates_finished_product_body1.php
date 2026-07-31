<style>
    .disabledbutton {
    pointer-events: none;
    opacity: 0.4;
}
.disable-div {
  pointer-events: none;
}

/*.list_of_all_product_item_details {*/
/*max-width: 600px;*/
/*margin: 0 auto;*/
/*}*/
/*#list_of_all_product_item_details th, td {*/
/*white-space: nowrap;*/
/*}*/

/*table.dataTable thead .sorting:after,*/
/*table.dataTable thead .sorting:before,*/
/*table.dataTable thead .sorting_asc:after,*/
/*table.dataTable thead .sorting_asc:before,*/
/*table.dataTable thead .sorting_asc_disabled:after,*/
/*table.dataTable thead .sorting_asc_disabled:before,*/
/*table.dataTable thead .sorting_desc:after,*/
/*table.dataTable thead .sorting_desc:before,*/
/*table.dataTable thead .sorting_desc_disabled:after,*/
/*table.dataTable thead .sorting_desc_disabled:before {*/
/*bottom: .5em;*/
/*}*/

</style>

<!-- content page -->
       <!--<form method="GET">-->
        <div class="container mt-2 main-container" id="mainContainer" >
            
            
            
            
            <div class="card">
                <div class="card-header text-white col-sm-12" style="background: linear-gradient(90deg, rgba(10,87,173,1) 0%, rgba(23,148,255,1) 13%, rgba(0,44,215,0.9780287114845938) 100%);">
                    <div class="media w-100 ">
                        <figure class="avatar avatar-40 rounded-circle align-self-start ">
                           <img src="../../httpdocs/images/company_profile_image/995847_236195_504913_logo_main.png" alt="Generic placeholder image">
                        </figure>
                        <div class="media-body">
                            <h5 class="time-title mb-0  text-white">New Estimation Details</h5>
                            <p class="mb-0  text-white">Click right icon to get List of Estimation Details<span class="status bg-success"> </span></p>
                        </div>
                        
                        <button style="position:relative;bottom:-5px;" class="btn btn-sm btn-outline-light" onclick="openNavR1()" id="btn_view_list_of_products1" >List of Estimation Details</button>
                                
                            <!--</div>-->
                        <!--</div>-->
                    </div>
                </div>
                <div class="card-body py-0">
                     
                   
                    <!--Company FORM-->
                    
                    
                    <div class="card-body">
                    <div class="row ">
                        <div class="col-lg-6">
                             <h5 class="m-0"> Product Details</h5>
                            <hr>
                           
                            <div class="form-group row">
                                
                                
                                
                                <input type="hidden" id="txt_product_company_name" class="form-control form-control-sm" placeholder="">
                                 <input type="hidden" id="txt_product_company_id" class="form-control form-control-sm" placeholder="">
                                <input type="hidden" id="txt_pro_id" class="form-control form-control-sm" placeholder="">
                                  <div class="col-lg-12" style="padding-bottom:10px;">
                                            <label>Company <st style="color:red">*</st></label>
                                            <div id="div_company_select" tabindex="1">
                                            
                                            </div>
                                </div>
                                
                                
                                <div class="col-lg-12" style="padding-bottom:10px;">
                                            <label>Project <st style="color:red">*</st></label>
                                            <div id="div_project_select" tabindex="2">
                                            <select class="chosen_select form-control form-control-sm" id="select_project_name" tabindex="-1" name="select_project_name" >
                                                
                                                    <option value="0">Select Project</option>
                                                
                                                 
                                               
                                            </select>
                                            </div>
                                </div>
                                <div class="col-lg-12" tabindex="3" id="div_main_type_select" style="padding-bottom:10px;">
                                            <label>Existing / New</label>
                                            <div id="div_type_select">
                                                <select class="form-control form-control-sm" data-live-search="true" tabindex="-1" id="select_type" aria-hidden="true">
                                                    <option value="New">New</option>
                                                    <option value="Existing">Existing</option>
                                                </select>
                                            </div>
                                        </div> 
                                   
                                          <div class="col-lg-12 " id="existing_product" style="display:none;" style="padding-bottom:10px;"> 
                                            <label>Product</label>
                                  
                                            <select id="select_product_type" class=" form-control form-control-sm" data-live-search="true" tabindex="-1" aria-hidden="true">
                                         
                                                <option value="0">Select Product</option>
                                                    <?PHP 
                                                            $result = mysqli_query($con,"SELECT product_code,product_name FROM master_finished_product_table");
                                                    		while($row=mysqli_fetch_assoc($result)) {
                                                    		   
                                                    ?>
                                                     <option value="<?PHP echo $row['product_code']; ?>" >  <?PHP echo $row['product_code'].'---'.$row['product_name'] ?></option>
                             
                                                          
                                                    <?PHP
                    
                                            		}
                        
                                                 ?>  
                                            
                                               
                                    </select>
                                </div>
                                       <!--Start-->
                                       <!-- <div class="col-lg-3 col-md-3" id="new_product_code" tabindex="4">
                                            <label>Product Code <st style="color:red">*</st></label>
                                            <input type="text" id="txt_product_code" class="form-control form-control-sm" placeholder="">
                                            <span id="error_prdt_code" style="color:red;font-size:90%" ></span>
                                        
                                        </div>-->
                                            <input type="hidden" id="txt_finished_prd_id" class="form-control form-control-sm" placeholder="">
                                            <input type="hidden" id="txt_finished_prd_new_id" class="form-control form-control-sm" placeholder="">
                                         <div class="col-lg-12 col-md-12" id="new_product_name">
                                        
                                            <label>Product Name <st style="color:red">*</st></label>
                                            <textarea id="txt_product_name" class="form-control form-control-sm" placeholder="" rows="1"></textarea>
                                        
                                        </div>
                                         
                                         <div class="col-lg-12 col-md-12" style="padding-top:10px;">
                                        
                                            <label>Product Qty <st style="color:red">*</st></label>
                                            <input type="number" id="txt_product_qty" class="form-control form-control-sm" placeholder="" rows="1">
                                        
                                        </div>
                                        <div class="col-lg-12 col-md-12" style="padding-bottom:10px;">
                                                
                                                    <label>Product Unit <st style="color:red">*</st></label>
                                                     <div id="div_product_unit_select">
                                                    <select class="chosen_select form-control form-control-sm" id="select_product_unit" data-live-search="true" tabindex="-1" aria-hidden="true">
                                                    </select>
                                                    </div>
                                        </div>
                                        
                                        
                                    </div>
                           </div>
                            
                            <div class="col-lg-6">
                                 <h5 class="m-0"> Item Details</h5>
                            <hr>
                              <div class="form-group row">
                                 
                                 <div class="col-lg-12" style="padding-bottom:10px;">
                                            <label>Category <st style="color:red">*</st></label>
                                            <div id="div_category_select">
                                            <select class="chosen_select form-control form-control-sm" id="select_category_name" name="select_category_name" data-live-search="true" tabindex="-1" aria-hidden="true">
                                                
                                                <option value="0">Select Category</option>
                                                  <?PHP 
                                                            $result = mysqli_query($con,"SELECT category_id,category_name FROM category where category_status = 'Active'");
                                                    		while($row=mysqli_fetch_assoc($result)) {
                                                    		   
                                                    ?>
                                                     <option value="<?PHP echo $row['category_id']; ?>" >  <?PHP echo $row['category_name'] ?></option>
                             
                                                          
                                                    <?PHP
                    
                                            		}
                        
                                                 ?> 
                                               
                                            </select>
                                            </div>
                                </div>
                                
                                 <div class="col-lg-12" style="padding-bottom:10px;">
                                            <label>Item <st style="color:red">*</st></label>
                                            <div id="div_item_select">
                                            <select class="chosen_select form-control form-control-sm" id="select_item_name" name="select_item_name" data-live-search="true" tabindex="-1" aria-hidden="true">
                                                  <option value='select'>Select Item</option>
                                              
                                            </select>
                                            </div>
                                           <input type="hidden" id="txt_store_id" class="form-control form-control-sm" placeholder=""> 
                                            <button type="button" class="btn btn-link p-0 chat-close vm header-color-secondary" id="btn_view_list_of_store" onclick="openNavR()"> 
                                <span class="material-icons">view_list</span>
                                </button>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <label>Item Quantity <st style="color:red">*</st></label>
                                    <input type="number" id="txt_required_qty" class="form-control form-control-sm"  min="1" placeholder="">
                                </div>
                                 <div class="col-lg-12 col-md-12"> 
                                    <label>Rate/Unit </label>
                                    <input type="number" id="txt_rate_per" class="form-control form-control-sm"  min="1" placeholder="" disabled>
                                </div>
								<div class="col-lg-12 col-md-12">
                                    <label>Unit Rate After VAT <span id="txt_vat_label_est" style></span> % </label>
                                    <input type="number" id="txt_vat_tot_amount" class="form-control form-control-sm"  min="1" placeholder="" disabled>
                                </div>
                                 
								<div class="col-lg-12 col-md-12">
                                    <label>Amount</label>
                                    <input type="number" id="txt_qty_amount_est" value="0" class="form-control form-control-sm"  min="1" placeholder="" disabled>
                                </div>
                                
                            </div>
                            </div>
                          
                             <div class="col-lg-6" id="div_secondary_details">
                             <h5 class="m-0"> Secondary Details</h5>
                            <hr>
                              <div class="form-group row"> 
                                  <div class="col-lg-12 col-md-12" id="div_length">
                                    <label>Length of the Material </label>
                                    <input type="number" id="txt_length" value="0" class="form-control form-control-sm" placeholder="" readonly>
                                    
                                </div>
                                <div class="col-lg-12 col-md-12" id="div_width">
                                    <label>Width of the Material</label>
                                    <input type="number" id="txt_width" value="0" class="form-control form-control-sm" placeholder="" readonly>
                                   
                                </div>
                                 <div class="col-lg-12 col-md-12" id="div_height" style="display:none">
                                    <label>Height of the Material</label>
                                    <input type="number" id="txt_height" value="0" class="form-control form-control-sm" placeholder="" readonly>
                                   
                                </div>
                                 <div class="col-lg-12 col-md-12" id="div_thickness">
                                    <label>Height of the Material</label>
                                    <input type="number" id="txt_thickness" value="0" class="form-control form-control-sm" placeholder="" readonly>
                                    
                            
                                </div>
                                <div class="col-lg-12 col-md-12" id="div_weight">
                                    <label>Weight of the Material</label>
                                    <input type="number" id="txt_weight" value="0" class="form-control form-control-sm" placeholder="" readonly>
                                    
                                </div>
                                <div class="col-lg-12 col-md-12" id="div_square_meter">
                                    <label>Total Value of M2 </label>
                                    <input type="number" id="txt_square_meter" value="0" class="form-control form-control-sm" placeholder="" readonly>
                                    
                                </div>
                                
                                <div class="col-lg-12 col-md-12" id="div_cubic_meter">
                                    <label>Total Value of M3 </label>
                                    <input type="number" id="txt_cubic_meter" value="0" class="form-control form-control-sm" placeholder="" readonly>
                                    
                                </div>
                                <div class="col-lg-12 col-md-12" id="div_total_weight">
                                    <label>Total Value Weight </label>
                                    <input type="number" id="txt_total_weight" value="0" class="form-control form-control-sm" placeholder="" readonly>
                                    
                                </div>
                               <!-- <input type="hidden" id="txt_total_weight" value="0" class="form-control form-control-sm" placeholder="" readonly="" >-->
                               <!--<input type="hidden" id="txt_square_meter" value="0" class="form-control form-control-sm" placeholder="" readonly="">-->
                               <!--<input type="hidden" id="txt_cubic_meter" value="0" class="form-control form-control-sm" placeholder="" readonly="">-->
                               
                                 <input type="hidden" id="txt_units_name"  class="form-control form-control-sm" placeholder="" readonly="">
                               <input type="hidden" id="txt_units_id"  class="form-control form-control-sm" placeholder="" readonly="">
                               <input type="hidden" id="txt_secondary_rate_per_unit" class="form-control form-control-sm" placeholder="" readonly="">
                               
                                <input type="hidden" id="txt_vat_percentage"  class="form-control form-control-sm" placeholder="" readonly="">
                                <input type="hidden" id="txt_vat_prct_amount"  class="form-control form-control-sm" placeholder="" readonly="">
                               <input type="hidden" id="txt_vat_amount"  class="form-control form-control-sm" placeholder="" readonly="">
                               
                                <input type="hidden" id="txt_sec_unit_id"  class="form-control form-control-sm" placeholder="" readonly="">
                               <input type="hidden" id="txt_sec_unit_name"  class="form-control form-control-sm" placeholder="" readonly="">
                              <input type="hidden" id="txt_primay_rate_per_unit"  class="form-control form-control-sm" placeholder="" readonly=""> 
                              
                                  <div class="col-lg-12" style="display:none">
                                            <label>Units <st style="color:red">*</st></label>
                                            <div id="div_unit_select">
                                            <select class="form-control form-control-sm" id="select_primary_unit" data-live-search="true" tabindex="-1" aria-hidden="true">
                                                
                                               
                                            </select>
                                            </div>
                                </div>
                                
                               
                                
                            
                            
                            </div>  
								 
							</div>	
							   
						</div>
						<div class="form-group row">        
                           <div class="col-lg-1 col-md-1"  >
                            <button class="btn btn-success " id="btn_product_add">Save</button>
                            <button class="btn btn-warning text-white float-right ladda-button" id="btn_edit_product" data-style="expand-right" style=""><span class="ladda-label">Save</span><span class="ladda-spinner"></span></button>
                             </div>
                             
                             <div class="col-lg-3 col-md-3" >
                             <button  class="btn btn-secondary" id="estimation_cancel">Cancel</button>
                            </div>
                          </div>
                          
                           
                           
                           
                               
                               
                    
                            <hr>
                           <div class="col-sm-12 col-md-12 col-lg-12 " style="padding:0px; overflow:auto;">
                               
                               
                    <!--<div class="card rounded-0 border-0 mb-12">-->
                       <h5 class="m-0">Item Details</h5>
                        
                        <div  >
                             
                        
                        <!--Table-->
                            <table class="table table-striped table-bordered  nowrap" id="list_of_product"  style="padding-top:5px;font-size:12px;width:100%">
                            <!--Table-->
                           
                                <thead>
                                    <tr >
                                        <th>Details </th>
                                        <th>SlNo </th>
                                        
                                        <th>Category </th>
                                        <th>Item </th>
                                        <th>Qty</th>
                                        <th>Units</th>
                                        <th>Rates/Unit</th>
                                        <th>Tot. Weight</th>
                                        <th>m<sup>2</sup></th>
                                        <th>m<sup>3</sup></th>
                                         <th>VAT %</th>
                                        <th>Tot. Amount</th>
                                        <th>Delete</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                                <tfoot>
                                    <tr>
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
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        
                                    </tr>
                                </tfoot>
                            </table>
                            <!-- /.table-responsive -->
                        
                        
                        
                        
                        <!--</div>-->
                        <!--<div class="card-footer">-->
                        <!--    <button class="btn btn-primary"> View</button>-->
                        <!--</div>-->
                    </div>
                   <!-- /.table-responsive -->
                            
                            
               <!-- <div class="card-body pt-0">
                    <table class="table mb-0 table-bordered footable" id="list_of_requisition_list" style="font-size:12px;">
                        <thead>
                            <tr>
                                
                                <th data-breakpoints="xs sm">Purpose</th>
                                <th data-breakpoints="xs sm md">Req Qty</th>
                                <th data-breakpoints="xs sm md">Deliv Qty</th>
                                <th data-breakpoints="xs sm md">Unit</th>
                                <th data-breakpoints="xs sm md">Ref BOQ</th>
                                <th data-breakpoints="xs sm md">Qty BOQ</th>
                                <th data-breakpoints="xs sm md">Date Req</th>
                                <th data-breakpoints="xs">Status</th>
                                <th data-breakpoints="xs sm md lg">Description</th>
                                <th data-breakpoints="xs sm md lg">Ref Appr MAC</th>
                                <th data-breakpoints="xs sm md lg">Sup Details</th>
                                <th data-breakpoints="xs sm md lg">PC</th>
                                <th data-breakpoints="xs sm md lg">Remarks</th>
                                <th data-breakpoints="xs sm" class="text-right">Action</th>
                            </tr>
                        </thead>
                    <tbody>
                            
                           
                        </tbody>
                    </table>

                </div> --> 
                    
                <!--</div>-->
                          
                        <br>  
                        <hr>  
                          
                     <div class="form-group row"> 
                             <div class="col-lg-2 col-md-2">
                                    <div class="form-group">
                                       <label>Labour Cost</label>
                                        
                                        <div class="input-group mb-1" id="div_labour_cost">
                                            <div class="input-group-prepend" id="div_labour_cost_type_select">
                                                <!--<span class="input-group-text form-control-sm" id="basic-addon3">BD</span>-->
                                                <select >
                                                    
                                                    <option>%</option>
                                                    <option>BD</option>
                                                </select>
                                            </div>
                                            <input type="number" id="txt_labour_cost" class="form-control form-control-sm" value="35" placeholder="" style="text-align:right;">
                                            
                                           
                                        </div>
                                    </div>
                                </div>
                                  <div class="col-lg-2 col-md-2">
                                    <div class="form-group">
                                       <label>Equipment Cost</label>
                                        
                                       <div class="input-group mb-1" id="div_equipment_cost">
                                            <div class="input-group-prepend" id="div_euipment_cost_type_select" >
                                                <!--<span class="input-group-text form-control-sm" id="basic-addon3">BD</span>-->
                                                <select >
                                                    <option>BD</option>
                                                    <option>%</option>
                                                </select>
                                            </div>
                                            <input type="number" id="txt_euipment_cost" value="0" class="form-control form-control-sm" placeholder="" style="text-align:right;">
                                            
                                           
                                        </div>
                                    </div>
                                </div>
                                 <div class="col-lg-2 col-md-2">
                                    <div class="form-group">
                                       <label>Service Cost</label>
                                        
                                       <div class="input-group mb-1" id="div_service_cost">
                                            <div class="input-group-prepend" id="div_service_cost_type_select" >
                                                <!--<span class="input-group-text form-control-sm" id="basic-addon3">BD</span>-->
                                                <select >
                                                    <option>%</option>
                                                    <option>BD</option>
                                                    
                                                </select>
                                            </div>
                                            <input type="number" id="txt_service_cost" value="5" class="form-control form-control-sm" placeholder="" style="text-align:right;">
                                            
                                           
                                        </div>
                                    </div>
                                </div>
                               
                                 <div class="col-lg-2 col-md-2">
                                    <div class="form-group">
                                       <label>Other Cost</label>
                                        
                                       <div class="input-group mb-1" id="div_other_cost">
                                            <div class="input-group-prepend" id="div_other_cost_type_select" >
                                                <!--<span class="input-group-text form-control-sm" id="basic-addon3">BD</span>-->
                                                <select >
                                                   
                                                    <option>%</option>
                                                    <option>BD</option>
                                                </select>
                                            </div>
                                            <input type="number" id="txt_other_cost" value="10" class="form-control form-control-sm" placeholder="" style="text-align:right;">
                                            
                                           
                                        </div>
                                    </div>
                                </div>
                                 <div class="col-lg-2 col-md-2">
                                    <div class="form-group">
                                       <label>Margin</label>
                                        
                                        <div class="input-group mb-1" id="div_margin_cost">
                                            <div class="input-group-prepend" id="div_margin_cost_type_select" >
                                                <!--<span class="input-group-text form-control-sm" id="basic-addon3">BD</span>-->
                                                <select >
                                                    
                                                    <option>%</option>
                                                    <option>BD</option>
                                                </select>
                                            </div>
                                            <input type="number" id="txt_margin_cost" value="25" class="form-control form-control-sm" placeholder="" style="text-align:right;">
                                            
                                           <!--<input type="hidden" id="txt_total">-->
                                           <!--<input type="hidden" id="cal_value">-->
                                        </div>
                                    </div>
                                </div>
                            
                            <div class="col-lg-2 col-md-2">
                                    <div class="form-group">
                                       <label></label>
                                        
                                        <div class="input-group mb-1">
                                             <i class="fa fa-calculator fa_custom fa-2x" id="btn_calculate" style="color: #0099CC; padding-top:6px;"></i>
                                            
                                            <input type="hidden" id="txt_total">
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                        
                          
                            </div>        
                            
                    </div>
                    
                    <div class="form-group row"> 
                        <div class="col-lg-8 col-md-8">
                        </div>
                                 
                            <div class="col-lg-4 col-md-4">
                                 
                                <div class="alert alert-success drop_shadow" role="alert" id="figures_show">
                                    <span> Product Rate/Unit is:</span>
                                    <span class="badge badge-info" id="cal_value" style="font-size: 100%"></span>
                                </div>
                                 
                            </div>
                        </div> 
                            
                </div>
                 </div>
                </div>
                <div class="card-footer">
                    <div class="row">
                    <div class="col-lg-6 col-md-6" >
                            <button class="btn btn-secondary" id="btn_cancel">Cancel</button>
                     </div>
                     <div class="col-lg-6 col-md-6" >
                    <div class="row"  >
                    <div style="padding-left:400px;">
                    <button class="btn btn-success float-right" id="btn_finished_product_add">Confirm Estimate</button>
                    </div >
                    
                    <div style="padding-left:400px;">
                    <button class="btn btn-warning float-right" id="btn_finished_product_edit">Update Estimate</button>
                    </div >
                     <!--<div style="padding-left:5px;">-->
                    <!--<button type="button" class="btn btn-warning text-white float-right" id="btn_product_to_master">Add to Master</button>-->
                    <!--</div>-->
                    </div>
                        </div>
                    
                    
                    <!--Company FORM End-->
                      
                    
                </div>
            </div>
            
            
        </div>
        
 

 </div>
 
 
 </div>
<!-- content page ends -->
        
<div id="mySidenavR" class="sidenavR " height="100%" style="background-color:white;padding-top:70px;box-shadow: -10px 0px 10px #e3e3e3;">
    
   
                <div class="col-sm-12 col-md-12 col-lg-12" style="padding:0px">
                    <div class="card rounded-0 border-0 mb-12">
                        <div class="card-header">
                            
                           
                                <div class="row ">
                                    <div class="col-sm-6 col-md-6 col-lg-6">
                                        <h5 class="mb-0">List of Store</h5>
                                    </div>
                                    <div class="col-sm-6 col-md-6 col-lg-6" style="text-align:right">
                                        
                                        <!--<button type="button" class="mb-2 btn btn-sm btn-primary" onclick="closeNavR()">X</button>-->
                                        <button class="btn btn-link p-0 chat-close vm header-color-secondary" onclick="closeNavR()"><span class="material-icons icon-sm">close</span></button>
                                    </div>
                                  
                                </div>
                            
                            
                        </div>
                        <div class="card-body ">
                             
                        
                        <!--Table-->
                            <table class="table table-striped table-bordered dt-responsive" id="list_of_stores"  style="padding-top:5px;font-size:12px;width:100%">
                                <thead>
                                    <tr >
                                        <th style="width:5px">Details</th>
                                        <th>Sl No </th>
                                        <th>ID </th>
                                        <th>Category </th>
                                        <th>Item Code</th>
                                        <th>Item </th>
                                        <th>Units </th>
                                        <th>Rates / Unit </th>
                                        <th>VAT % </th>
                                        <th>VAT Amt </th>
                                        <th>Amount </th>
                                        <th>Action </th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                            <!-- /.table-responsive -->
                        
                        
                        
                        
                        </div>
                        <!--<div class="card-footer">-->
                        <!--    <button class="btn btn-primary"> View</button>-->
                        <!--</div>-->
                    </div>
                </div>

   
</div>

<div id="mySidenavR1" class="sidenavR1 " height="100%" style="background-color:white;padding-top:70px;box-shadow: -10px 0px 10px #e3e3e3;">
    
   
                <div class="col-sm-12 col-md-12 col-lg-12" style="padding:0px">
                    <div class="card rounded-0 border-0 mb-12">
                        <div class="card-header">
                            
                           
                                <div class="row ">
                                    <div class="col-sm-6 col-md-6 col-lg-6">
                                        <h5 class="mb-0">List of Estimation</h5>
                                    </div>
                                    <div class="col-sm-6 col-md-6 col-lg-6" style="text-align:right">
                                        
                                        <!--<button type="button" class="mb-2 btn btn-sm btn-primary" onclick="closeNavR()">X</button>-->
                                        <button class="btn btn-link p-0 chat-close vm header-color-secondary" onclick="closeNavR1()" id="btn_close_list_of_products1" ><span class="material-icons icon-sm">close</span></button>
                                    </div>
                                  
                                </div>
                            
                            
                        </div>
                        <!--<div class="col-sm-1 col-md-1 col-lg-1" style="padding-top:29px;padding-leftt:5px;">-->
                        <!--                <button class="btn  btn-sm gridbutton  success-gradient" id="btn_search_print" style="color:white;"><i class="material-icons">print</i></button>-->
                                        <!--<button class="btn btn-primary " id="btn_print_collection"> <i class="material-icons">print</i> </button>-->
                        <!--            </div>-->
                        <div class="card-body ">
                             
                        
                        <!--Table-->
                            <table class="table table-striped table-bordered" id="list_of_all_product"  style="padding-top:5px;font-size:12px;width:100%">
                                <thead>
                                    <tr >
                                      
                                        <th class="text-center">Sl. No</th>
                                        <!--<th class="text-center;">Company</th>-->
                                        <th class="text-center">Project</th>
                                        <!--<th class="text-center">code</th>-->
                                        <th class="text-center">Product Name</th>
                                        <th class="text-center">Unit</th>
                                       <th class="text-center">Qty</th>
                                      
                                        <th class="text-center">Mt. Cost</th>
                                        <th class="text-center">Lab. Cost</th>
                                        
                                        
                                        
                                        <th class="text-center">Equ. Cost </th>
                                        <th class="text-center">Service Cost </th>
                                        <th class="text-center">Other Cost</th>
                                        
                                        <th class="text-center">Margin Cost </th>
                                        <th class="text-center">Total Cost </th>
                                         <th class="text-center">Rate/Unit</th>
                                         <th class="text-center">Delete</th>
                                        <th class="text-center">Pri. Details</th>
                                        <th class="text-center">Sec. Details</th>
                                         
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                            <!-- /.table-responsive -->
                        
                        
                        
                        
                        </div>
                        <!--<div class="card-footer">-->
                        <!--    <button class="btn btn-primary"> View</button>-->
                        <!--</div>-->
                    </div>
                </div>

   
</div>

<!--</form>-->

<div id="mySidenavR2" class="sidenavR2 " height="100%" style="background-color:white;padding-top:70px;box-shadow: -10px 0px 10px #e3e3e3;">
    
   
                <div class="col-sm-12 col-md-12 col-lg-12" style="padding:0px">
                    <div class="card rounded-0 border-0 mb-12">
                        <div class="card-header">
                            
                           
                                <div class="row ">
                                    <div class="col-sm-6 col-md-6 col-lg-6">
                                        <h5 class="mb-0">Material List -<span style="color:#F20580" id="pjt_name"></span>- Secondary Details</h5>
                                        
                                    </div>
                                    <div class="col-sm-6 col-md-6 col-lg-6" style="text-align:right">
                                        
                                        <!--<button type="button" class="mb-2 btn btn-sm btn-primary" onclick="closeNavR()">X</button>-->
                                        <button class="btn btn-link p-0 chat-close vm header-color-secondary" onclick="closeNavR2()"><span class="material-icons icon-sm">close</span></button>
                                    </div>
                                  
                                </div>
                            
                            
                        </div>
                        <div class="card-body ">
                             
                        
                        <!--Table-->
                            <table class="table table-striped table-bordered nowrap" id="list_of_all_product_item_details"  cellspacing="0"  style="padding-top:5px;font-size:12px;width:100%">
                                <thead>
                                    <tr >
                                        <th class="text-center">Details</th>
                                        <th class="text-center">Sl No</th>
                                        <th class="text-center">Category</th>
                                        <th class="text-center">Item</th>
                                        <th class="text-center">Quantity</th>
                                        <th class="text-center">Unit</th>
                                        
                                        <th class="text-center">Tot. Weight</th>
                                        <th class="text-center">m<sup>2</sup></th>
                                        <th class="text-center">m<sup>3</sup></th>
                                        <th class="text-center">Rate/Unit</th>
                                        <th class="text-center">Tot. Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                                 <tfoot>
                                    <tr>
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
                                        <th></th>
                                        
                                    </tr>
                                </tfoot>
                            </table>
                            <!-- /.table-responsive -->
                        
                        
                        
                        
                        </div>
                        <!--<div class="card-footer">-->
                        <!--    <button class="btn btn-primary"> View</button>-->
                        <!--</div>-->
                    </div>
                </div>

   
</div>

<div id="mySidenavR3" class="sidenavR3" height="100%" style="background-color:white;padding-top:70px;box-shadow: -10px 0px 10px #e3e3e3;">
    
   
                <div class="col-sm-12 col-md-12 col-lg-12" style="padding:0px">
                    <div class="card rounded-0 border-0 mb-12">
                        <div class="card-header">
                            
                           
                                <div class="row ">
                                    <div class="col-sm-6 col-md-6 col-lg-6">
                                        <h5 class="mb-0">Material List - <span style="color:#F20580" id="pjt_prim_name"></span>- Primary Details</h5>
                                         
                                    </div>
                                    <div class="col-sm-6 col-md-6 col-lg-6" style="text-align:right">
                                        
                                        <!--<button type="button" class="mb-2 btn btn-sm btn-primary" onclick="closeNavR()">X</button>-->
                                        <button class="btn btn-link p-0 chat-close vm header-color-secondary" onclick="closeNavR3()"><span class="material-icons icon-sm">close</span></button>
                                    </div>
                                  
                                </div>
                            
                            
                        </div>
                        <div class="card-body ">
                             
                        
                          <!--Table-->
                            <table class="table table-striped table-bordered nowrap" id="list_of_all_product_item_details_primary"  style="padding-top:5px;font-size:12px;width:100%">
                                <thead>
                                    <tr >
                                        
                                        <th class="text-center">Sl No </th>
                                        <th class="text-center">Category</th>
                                        <th class="text-center">Item</th>
                                        
                                        <th class="text-center">Quantity</th>
                                    
                                        <th class="text-center">Unit</th>
                                       
                                        <th class="text-center">Rate / Unit</th>
                                       
                                        <th class="text-center">VAT</th>
                                       
                                        <th class="text-center">Total Amount</th>
                                     </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                       
                                    </tr>
                                </tfoot>
                            </table>
                             <!--/.table-responsive -->
                        
                        
                        
                        </div>
                        <!--<div class="card-footer">-->
                        <!--    <button class="btn btn-primary"> View</button>-->
                        <!--</div>-->
                    </div>
                </div>

   
</div>


      <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modal_quantity_change">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Change Quantity</h5>
                            <button type="button" class="close" data-dismiss="modal" id="btn_top_reissue_close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                           
                           <div class="row ">
                               <div class="col-sm-6 col-md-6 col-lg-1">
                                   
                                   </div>
                                    <div class="col-sm-6 col-md-6 col-lg-2">
                                        
                                        <input type="hidden" class="form-control" placeholder="" id="txt_rate_per_unit" >
                                       <input type="hidden" class="form-control" placeholder="" id="txt_pdt_item_id" >
                                         <input type="hidden" class="form-control" placeholder="" id="txt_pdt_finished_id" >
                                       <input type="hidden" class="form-control" placeholder="" id="txt_finished_product_id_for_edit" >
                                       <input type="hidden" class="form-control" placeholder="" id="txt_product_code_for_edit" >
                                       <input type="hidden" class="form-control" placeholder="" id="txt_product_id_for_edit" >
                                    </div>
                                   
                                    <div class="col-sm-6 col-md-6 col-lg-6">
                                        <label>Required Qty </label>
                                        <input type="text" class="form-control" placeholder="" id="txt_reissue_qty" >
                                    </div>
                                     <div class="col-sm-6 col-md-6 col-lg-3">
                                    </div>
                           </div>
                           
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btn_qty_close">Close</button>
                            <button type="button" class="btn btn-primary" id="btn_update_item_qty">Update Qty</button>
                        </div>
                    </div>
                </div>
            </div>
            
      <!--Modal OPEN for Remarks-->


      <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modal_add_remarks">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            
                            <button type="button" class="close" data-dismiss="modal" id="btn_top_reissue_close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                           
                           <div class="row ">
                                   
                                    
                                    
                           
                           </div>
                           
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btn_remarks_close">Close</button>
                            <button type="button" class="btn btn-primary" id="btn_remarks_save">Save</button>
                        </div>
                    </div>
                </div>
            </div>

<!-- Modal -->
<div class="modal fade" id="estimate_edit_item_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Edit</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="modal_close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
			<div class="col-lg-6 col-md-6">
				<label>Rates / Unit </label>
				<input type="number" id="txt_rate"  class="form-control form-control-sm" placeholder="0.000">
			</div>
			<div class="col-lg-6 col-md-6">
				<label>VAT % </label>
				<input type="number" id="txt_vat"  class="form-control form-control-sm" placeholder="0.000">
			</div>
      </div>
      <div class="modal-footer">
        <!--<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>-->
        <button type="button" class="btn btn-primary" id = "btn_save_change">Save changes</button>
      </div>
    </div>
  </div>
</div>
<!-- /Modal -->
