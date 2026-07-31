<style>
    .disabledbutton {
    pointer-events: none;
    opacity: 0.4;
}
.disable-div {
  pointer-events: none;
}
</style>
<!-- content page -->
    <!--<form method="GET">-->
    <div class="container mt-2 main-container" id="mainContainer"  >
        <div class="card">
            <div class="card-header text-white col-sm-12"  style="background: linear-gradient(90deg, rgba(10,87,173,1) 0%, rgba(23,148,255,1) 13%, rgba(0,44,215,0.9780287114845938) 100%);">
                <div class="media w-100">
                    <figure class="avatar avatar-40 rounded-circle align-self-start ">
                       <img src="../../httpdocs/images/company_profile_image/995847_236195_504913_logo_main.png" alt="Generic placeholder image">
                    </figure>
                    <div class="media-body">
                        <h5 class="time-title mb-0  text-white">New Quick Calculation</h5>
                        <p class="mb-0  text-white">Click right icon to get List of Quick Calculation Details<span class="status bg-success"> </span></p>
                    </div>
                    <button style="position:relative;bottom:-5px;" class="btn btn-sm btn-outline-light" onclick="openNavR()" id="btn_view_list_of_project">List of Quick Calculation Details</button>
                </div>
            </div>
            <div class="card-body py-0">
                <!--Company FORM-->
                <div class="card-body">
                    <div class="row justify-content-center">
                    <div class="col-md-10">
                    <div class="form-group row">
                        <div class="col-lg-12">
                            <h5 class="m-0"> Product Details</h5>
                            <hr>
                            <div class="row"> 
                                <div class="col-lg-4 col-md-12" id="new_product_name">
                                    <label>Project Name <st style="color:red">*</st></label>  
    								<input  type="text" class="form-control form-control-sm" id="txt_project_name">
                                </div>
                                <div class="col-lg-4 col-md-12" id="new_product_name">
                                    <label>Product Name <st style="color:red">*</st></label>  
    								<input  type="text" class="form-control form-control-sm" id="txt_product_name">
                                </div>
                                <div class="col-lg-4" style="padding-bottom: 10px;">
                                    <label>Total Items<span style="color: red;">*</span></label>
                                    <input type="text" id="txt_item_qty" class="form-control form-control-sm" placeholder="">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3" style="padding-bottom: 10px;">
                                    <label>Item <span style="color: red;">*</span></label>
                                    <input type="text" id="txt_item_name" class="form-control form-control-sm" placeholder="">
                                </div>
                                 <div class="col-lg-2 col-md-12">
                                    <label>Quantity <span style="color: red;">*</span></label>
                                    <input type="number" id="txt_required_qtyy" class="form-control form-control-sm" min="1" placeholder="">
                                </div>
                                <div class="col-lg-2 col-md-12">
                                    <label>Units <span style="color: red;">*</span></label>
                                    <input type="text" id="txt_units" class="form-control form-control-sm" min="1" placeholder="">
                                </div>
                                <div class="col-lg-3 col-md-12">
                                    <label>Rate/Unit <span style="color: red;">*</span></label>
                                    <input type="text" id="txt_rate_unit" class="form-control form-control-sm" min="1" placeholder="">
                                </div>
                                <div class="col-lg-2 col-md-12">
                                    <label>Amount </label>
                                    <input type="number" id="txt_qty_amount" value="0" class="form-control form-control-sm" min="1" placeholder="" disabled>
                                </div>
                            </div>
                            <div class="row">
                                
                            </div>
                        </div>
                           <!--Start-->
                          <!--End-->   
                    </div>
                    <div class="form-group row">        
                        <div class="col-lg-1 col-md-1" style="padding-top:28px;" >
							<button class="btn btn-success " id="btn_product_add">Save</button>
                        </div>
                        <div class="col-lg-3 col-md-3" style="padding-top:28px;">
							<button  class="btn btn-secondary" id="btn_item_cancel">Cancel</button>
						</div>
					</div>	
                        <!--</div>    -->
                        <hr>
                       <div class="col-sm-12 col-md-12 col-lg-12" style="padding:0px; overflow:auto;">
                <!--<div class="card rounded-0 border-0 mb-12">-->
                   <h5 class="m-0">Item Details</h5>
                <div>
                    <!--Table-->
                        <table class="table table-striped table-bordered  nowrap" id="list_of_product"  style="padding-top:5px;font-size:12px;width:100%">
                        <!--Table-->
                            <thead>
                                <tr >
                                    <th class="text-center">SlNo </th>
                                    <th class="text-center">Project</th>
                                    <th class="text-center">Product</th>
                                    <th class="text-center">Item</th>
                                    <th class="text-center">Total Items</th>
                                    <th class="text-center">Quantity</th>
                                    <th class="text-center">Units</th>
                                    <th class="text-center">Rates/Unit</th>
                                    <th class="text-center">Total Amt</th>
                                    <!--<th class="text-center">Vat(%) Amt</th>-->
                                    <!--<th class="text-center">Vat Amt</th>-->
                                    <th class="text-center">Delete</th>
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
                                    <!--<th></th>-->
                                    <!--<th></th>-->
                                </tr>
                            </tfoot>
                        </table>
                        <div class="row" id="vat_div_for_calculation">
                            <div class="col-lg-4" style="padding-bottom: 10px;">
                            </div>
                            <div class="col-lg-2" style="padding-bottom: 10px;">
                                <label>Total</label>
                                <input type="text" id="total_text" class="form-control form-control-sm" disabled>
                            </div>
                            <div class="col-lg-2" style="padding-bottom: 10px;">
                                <label>Vat(%) <span style="color: red;">*</span></label>
                                <input type="text" id="vat_percentage" class="form-control form-control-sm">
                            </div>
                            <div class="col-lg-2" style="padding-bottom: 10px;">
                                <label>Vat(%) Amt</label>
                               <input type="text" id="vat_amount" class="form-control form-control-sm" disabled>
                            </div>
                            <div class="col-lg-2" style="padding-bottom: 10px;">
                                <label>Vat Amt</label>
                                <input type="text" id="total_vat_amount" class="form-control form-control-sm" disabled>
                            </div>
                        </div>
                        <div class="row" id="div_calculation_for_per_item">
                            <div class="col-lg-4" style="padding-bottom: 0px;">
                            </div>
                            <div class="col-lg-4" style="padding-bottom: 0px;">
                                <h6 style="font-size: 14px;">Before VAT Per Item :<span style="margin-left: 5px; color: blue;" id="per_item_val"></span></h6>
                            </div>
                            <div class="col-lg-4" style="padding-bottom: 0px;">
                                <h6 style="font-size: 14px;">After VAT Per Item :<span  style="margin-left: 5px; color: blue;" id="after_vat_item_val"></span></h6>
                            </div>
                        </div>

                </div>
               <!-- /.table-responsive -->
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
                    <div class="row mt-2 w-100">
                        <!-- Left Column (Optional content, can be customized or left empty) -->
                        <div class="col-lg-4 col-md-8">
                            <!-- Add content here if needed -->
                        </div>
                
                        <!-- Center Column: Product Rate/Unit -->
                        <div class="col-lg-4 col-md-4">
                            <div class="alert alert-success drop_shadow text-center" role="alert" id="figures_show">
                                <span>Total Cost :</span><br>
                                <span class="badge badge-info" id="cal_value" style="font-size: 100%"></span>
                            </div>
                        </div>
                
                        <!-- Right Column: Product Rate/Item -->
                        <div class="col-lg-4 col-md-4">
                            <div class="alert alert-success drop_shadow text-center" role="alert" id="figures_show_items">
                                <span>Product Rate/ Per Item is:</span><br>
                                <span class="badge badge-info" id="cal_value_per_item" style="font-size: 100%"></span>
                            </div>
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
                <!--<div style="padding-left:200px;">-->
                <!--<button class="btn btn-success float-right" id="btn_finished_product_add">Add Product</button>-->
                <!--</div >-->
                 <div style="padding-left:55%;">
                <button type="button" class="btn btn-warning text-white float-right" id="btn_product_to_master">Add to Master</button>
                </div>
                </div>
                    </div>
                
                
                <!--Company FORM End-->
                  
                
            </div>
        </div>
            </div>
        </div>
    </div>
    <!-- content page ends -->
    <div id="mySidenavR1" class="sidenavR1" height="100%" style="background-color:white;padding-top:70px;box-shadow: -10px 0px 10px #e3e3e3;">
        <div class="col-sm-12 col-md-12 col-lg-12" style="padding:0px">
            <div class="card rounded-0 border-0 mb-12">
                <div class="card-header">
                    <div class="row ">
                        <div class="col-sm-6 col-md-6 col-lg-6">
                            <h5 class="mb-0">List of Store</h5>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-6" style="text-align:right">
                            <button class="btn btn-link p-0 chat-close vm header-color-secondary" onclick="closeNavR1()"><span class="material-icons icon-sm">close</span></button>
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
                                <th>VAT(%)</th>
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
    <div id="mySidenavR" class="sidenavR" height="100%" style="background-color:white;padding-top:70px;box-shadow: -10px 0px 10px #e3e3e3;">
            <div class="col-sm-12 col-md-12 col-lg-12" style="padding:0px">
                <div class="card rounded-0 border-0 mb-12">
                    <div class="card-header">
                        <div class="row ">
                            <div class="col-sm-6 col-md-6 col-lg-6">
                                <h5 class="mb-0">List of Quick Calculations</h5>
                            </div>
                            <div class="col-sm-6 col-md-6 col-lg-6" style="text-align:right">
                                
                                <!--<button type="button" class="mb-2 btn btn-sm btn-primary" onclick="closeNavR()">X</button>-->
                                <button class="btn btn-link p-0 chat-close vm header-color-secondary" onclick="closeNavR()"><span class="material-icons icon-sm">close</span></button>
                            </div>
                        </div>
                    </div>
                <div class="card-body ">
                    <!--Table-->
                    <table class="table table-striped table-bordered" id="list_of_master_products"  style="padding-top:5px;font-size:12px;width:100%">
                        <thead>
                            <tr>
                                
                                <th>Sl No </th>
                                <th class="text-center">Code</th>
                                <th class="text-center">Project Name</th>
                                <th class="text-center">Product Name</th>
                                <th class="text-center">Total item</th>
                                <th class="text-center">Mt. Cost</th>
                                <th class="text-center">VAT(%)</th>
                                <th class="text-center">Total VAT Amount</th>
                                <th class="text-center">Labour Cost </th>
                                <th class="text-center">Equ. Cost </th>
                                <th class="text-center">Service Cost</th>
                                <th class="text-center">Other Cost</th>
                                <th class="text-center">Margin Cost </th>
                                <th class="text-center">Rate/Unit</th>
                                <th class="text-center">Item/Rate</th>
                                <th class="text-center">Primary</th>
                                <th class="text-center">Print</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                       
                    </table>
                    <!--/.table-responsive -->
                </div>
            </div>
        </div>
    </div>
    <div id="mySidenavR2" class="sidenavR2" height="100%" style="background-color:white;padding-top:70px;box-shadow: -10px 0px 10px #e3e3e3;">
            <div class="col-sm-12 col-md-12 col-lg-12" style="padding:0px">
                <div class="card rounded-0 border-0 mb-12">
                    <div class="card-header">

                            <div class="row ">
                                <div class="col-sm-6 col-md-6 col-lg-6">
                                    <h5 class="mb-0">Material List - Primary Details</h5>
                                </div>
                                <div class="col-sm-6 col-md-6 col-lg-6" style="text-align:right">
                                    
                                    <!--<button type="button" class="mb-2 btn btn-sm btn-primary" onclick="closeNavR()">X</button>-->
                                    <button class="btn btn-link p-0 chat-close vm header-color-secondary" onclick="closeNavR2()"><span class="material-icons icon-sm">close</span></button>
                                </div>
                              
                            </div>
                        
                        
                    </div>
                    <div class="card-body ">
                         
                    
                      <!--Table-->
                        <table class="table table-striped table-bordered nowrap responsive" id="list_of_all_product_item_details" style="padding-top:5px;font-size:12px;width:100%">
                            <thead>
                                <tr>
                                    <th class="text-center">Sl No</th>
                                    <th class="text-center">Project</th>
                                    <th class="text-center">Item</th>
                                    <th class="text-center">Quantity</th>
                                    <th class="text-center">Units</th>
                                    <th class="text-center">Rates/Unit</th>
                                    <th class="text-center">Total Amount</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                            <tfoot>
                                <tr>
                                    <th colspan="6" class="text-right">Total:</th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
                        <!--<table class="table table-striped table-bordered nowrap responsive" id="list_of_all_product_item_details"  style="padding-top:5px;font-size:12px;width:100%">-->
                        <!--    <thead>-->
                        <!--        <tr >-->
                        <!--            <th class="text-center">Sl No </th>-->
                        <!--            <th class="text-center">Project</th>-->
                        <!--            <th class="text-center">Item</th>-->
                        <!--            <th class="text-center">Quantity</th>-->
                        <!--            <th class="text-center">Units</th>-->
                        <!--            <th class="text-center">Rates/ Unit</th>-->
                        <!--            <th class="text-center">Total Amount</th>-->
                        <!--         </tr>-->
                        <!--    </thead>-->
                        <!--    <tbody>-->
                                
                        <!--    </tbody>-->
                        <!--    <tfoot>-->
                        <!--        <tr>-->
                        <!--            <th></th>-->
                        <!--            <th></th>-->
                        <!--            <th></th>-->
                        <!--            <th></th>-->
                        <!--            <th></th>-->
                        <!--            <th></th>-->
                        <!--            <th></th>-->
                        <!--        </tr>-->
                        <!--    </tfoot>-->
                        <!--</table>-->
                         <!--/.table-responsive -->
                    
                    
                    
                    </div>
                    <!--<div class="card-footer">-->
                    <!--    <button class="btn btn-primary"> View</button>-->
                    <!--</div>-->
                </div>
            </div>


</div>
    <div id="mySidenavR3" class="sidenavR2" height="100%" style="background-color:white;padding-top:70px;box-shadow: -10px 0px 10px #e3e3e3;">
    
   
                <div class="col-sm-12 col-md-12 col-lg-12" style="padding:0px">
                    <div class="card rounded-0 border-0 mb-12">
                        <div class="card-header">
                            
                           
                                <div class="row ">
                                    <div class="col-sm-6 col-md-6 col-lg-6">
                                        <h5 class="mb-0">Material List - Secondary Details</h5>
                                    </div>
                                    <div class="col-sm-6 col-md-6 col-lg-6" style="text-align:right">
                                        
                                        <!--<button type="button" class="mb-2 btn btn-sm btn-primary" onclick="closeNavR()">X</button>-->
                                        <button class="btn btn-link p-0 chat-close vm header-color-secondary" onclick="closeNavR3()"><span class="material-icons icon-sm">close</span></button>
                                    </div>
                                  
                                </div>
                            
                            
                        </div>
                        <div class="card-body ">
                             
                        
                          <!--Table-->
                            <table class="table table-striped table-bordered nowrap responsive" id="list_of_all_product_item_details_secondary"  style="padding-top:5px;font-size:12px;width:100%">
                                <thead>
                                    <tr >
                                        <th class="text-center">Details</th>
                                        <th class="text-center">Sl No</th>
                                        <th class="text-center">Category</th>
                                        <th class="text-center">Item</th>
                                        <th class="text-center">Quantity</th>
                                        <th class="text-center">Unit</th>
                                        
                                        <th class="text-center">Tot.Weight</th>
                                        <th class="text-center">m<sup>2</sup></th>
                                        <th class="text-center">m<sup>3</sup></th>
                                        <th class="text-center">Rate/Unit</th>
                                        <th class="text-center">Tot.Amount</th>
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
                             <!--/.table-responsive -->
                        
                        
                        
                        </div>
                        <!--<div class="card-footer">-->
                        <!--    <button class="btn btn-primary"> View</button>-->
                        <!--</div>-->
                    </div>
                </div>

   
</div>

<!--</form>-->
<style>
    .modal-xl {
        max-width: 1000px; /* Adjust the width as needed */
    }
</style>