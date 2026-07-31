<!-- content page -->
        <div class="container mt-2 main-container" id="mainContainer" >
            
            
            
            
            <div class="card">
                <div class="card-header text-white" style="background: linear-gradient(90deg, rgba(10,87,173,1) 0%, rgba(23,148,255,1) 13%, rgba(0,44,215,0.9780287114845938) 100%);">
                    <div class="media w-100 ">
                        <figure class="avatar avatar-40 rounded-circle align-self-start ">
                           <img src="../../httpdocs/images/company_profile_image/995847_236195_504913_logo_main.png" alt="Generic placeholder image">
                        </figure>
                        <div class="media-body">
                            <h5 class="time-title mb-0  text-white">New Store Details</h5>
                            <p class="mb-0  text-white">Click right icon to get List of Store Details<span class="status bg-success"> </span></p>
                        </div>
                        <div class="dropdown d-inline-block">
                            <!--<a href="#" class="icon-circle icon-30 text-white ml-3 mt-1 dropdown-toggle caret-none" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
                            <!--    <i class="material-icons ">more_vertical</i>-->
                            <!--</a>-->
                            
                            <!--<div class="dropdown-menu dropdown-menu-right">-->
                            <!--    <a href="" class="dropdown-item">New</a>-->
                                <button  style="position:relative;bottom:-5px;" class="btn btn-sm btn-outline-light" onclick="openNavR()" id="btn_view_list_of_store">List of Store Details</button>
                                
                            <!--</div>-->
                        </div>
                    </div>
                </div>
                <div class="card-body py-0">
                     
                   
                    <!--Company FORM-->
                    
                    
                    <div class="card-body">
                    <div class="row ">
                        <div class="col-lg-6 ">
                             <h5 class="m-0">Primary Details For Store</h5>
                            <hr>
                            <div class="form-group row">
                                 <div class="col-lg-12">
                                            <label>Category <st style="color:red">*</st></label>
                                            <div id="div_category_select">
                                            <select class="form-control " id="select_category_name" name="select_category_name" data-live-search="true" tabindex="-1" aria-hidden="true">
                                                <option value="1">Category 1</option>
                                                <option value="2">Category 2</option>
                                                <option value="3">Category 3</option>
                                                <option value="4">Category 4</option>
                                                
                                            </select>
                                            </div>
                                        </div>
                              
                                <div class="col-lg-12 col-md-12" style="padding-top:10px">
                                        
                                            <label>Item Name <st style="color:red">*</st></label>
											<input  type="text" class="form-control form-control-sm" id="txt_item_name">
                                           
                                </div>
                              <div class="col-lg-12">
                                            <label>Unit<st style="color:red">*</st></label>
                                            <div id="div_unit_select">
                                            <select class="form-control form-control-sm" id="select_primary_unit" data-live-search="true" tabindex="-1" aria-hidden="true">
                                                <option value="1">Unit 1</option>
                                                <option value="2">Unit 2</option>
                                                <option value="3">Unit 3</option>
                                                <option value="4">Unit 4</option>
                                               
                                            </select>
                                            </div>
                                </div>
                                
                                 
                                <div class="col-lg-12 col-md-12" style="padding-top:10px">
                                    <label>Rate Per Unit <st style="color:red">*</st></label>
                                    <input type="number" id="txt_rate_per_unit" class="form-control form-control-sm" placeholder="">
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <label>VAT % <st style="color:red">*</st></label>
									<input type="text" id="txt_vat_perc" value="0.000" class="form-control form-control-sm" placeholder="">
                                  
                                </div>
                                  <div class="col-lg-12 col-md-12">
                                    <label>Precision %<st style="color:red">*</st></label>
                                    <input type="number" id="txt_precision" class="form-control form-control-sm" placeholder="">
                                </div> 
                                    <div class="col-lg-12 col-md-12">
                                    <label>VAT Amount <st style="color:red">*</st></label>
                                    <input type="number" id="txt_vat_amount" class="form-control form-control-sm"   placeholder="" readonly>
                                   </div>
                                        
                                    <div class="col-lg-12 col-md-12">
                                    <label>Amount <st style="color:red">*</st></label>
                                    <input type="number" id="txt_amount" class="form-control form-control-sm" placeholder="" readonly>
                                   </div>
                                     
                                
                            </div>
                           
                            
                            <br>
                        </div>
                         <div class="col-lg-6 ">
                             <h5 class="m-0">Secondary Details For Store</h5>
                            <hr>
                             <div class="form-group row">
                                 
                                  <div class="col-lg-12 col-md-12" style="padding-bottom:10px">
                                            <label>Unit </label>
                                            <div id="div_secondary_unit_select">
                                            <select class="form-control form-control-sm" id="select_seconadry_unit" data-live-search="true" tabindex="-1" aria-hidden="true">
                                               
                                               
                                            </select>
                                            </div>
                                </div> 
                                
                                <div class="col-lg-12 col-md-12"  id="div_length">
                                    <label>Length of the Material</label>
                                    <input type="number" id="txt_length" value="0" class="form-control form-control-sm" min="0" placeholder="">
                                </div>
                                <div class="col-lg-12 col-md-12" id="div_width">
                                    <label>Width of the Material</label>
                                    <input type="number" id="txt_width" value="0" class="form-control form-control-sm" placeholder="">
                                </div>
                                
                                
                            <div class="col-lg-12 col-md-12" id="div_thickness">
                                    <label>Height of the Material  </label>
                                    <input type="number" id="txt_thickness" value="0" class="form-control form-control-sm" placeholder="">
                            
                          </div>
                          <div class="col-lg-12 col-md-12" id="div_weight">
                                    <label>Weight of the Material (meter/ Kg)  </label>
                                    <input type="number" id="txt_weight" value="0" class="form-control form-control-sm" placeholder="">
                          </div>
                          
                           
                           
                           
                                   <div class="col-lg-12 col-md-12" id="div_height" style="display:none">
                                    <input type="hidden" id="txt_height" value="0" class="form-control form-control-sm" placeholder="">
                               </div>
                              
                              
                               <div class="col-lg-12 col-md-12" id="div_square_meter">
                                    <label>Square Meter </label>
                                    <input type="number" id="txt_square_meter" value="0" class="form-control form-control-sm" placeholder="" readonly>
                                </div>
                                 <div class="col-lg-12 col-md-12" id="div_cubic_meter">
                                    <label>Cubic Meter </label>
                                    <input type="number" id="txt_cubic_meter" value="0" class="form-control form-control-sm" placeholder="" readonly>
                                </div>
                                 <div class="col-lg-12 col-md-12" id="div_total_weight">
                                    <label>Total Weight of the Material</label>
                                    <input type="number" id="txt_total_weight" value="0" class="form-control form-control-sm" placeholder="" readonly>
                                </div> 
                                  <div class="col-lg-12 col-md-12" >
                                    <label>Rate Per Unit Category Base</label>
                                    <input type="number" id="txt_secondary_rate_per_unit" class="form-control form-control-sm" placeholder="">
                            
                          </div> 
                                <div class="col-lg-12 col-md-12">
                                    <label>Amount</label>
                                    <input type="number" id="txt_secondary_amount" value="0.000" class="form-control form-control-sm" placeholder="" readonly>
                                </div> 
                          </div>  
                          
                       
                          <div class="form-group row" style="display:none;"> 
                              
                                <div class="input-field col s6" id="session_image_add">
                                               <label for="session_image">Session Image</label></p>
                                               <input type="hidden" id="image_name" >
                                               <input type="hidden" id="image_edit" >
                                              <input name="session_image" type="file" id="session_image" class="dropify" data-height="200" data-allowed-file-extensions="jpg png jpeg" data-show-remove="false"  />
                                              
                                              
                                            </div>
                                            
                               
                            </div>
                        </div>   
                   
                            
                </div>
                 </div>
                </div>
                <div class="card-footer">
                    <div class="row">
                    <div class="col-lg-6 col-md-12" >
                            <button class="btn btn-secondary" id="btn_cancel">Cancel</button>
                     </div>
                     <div class="col-lg-6 col-md-12">
                    
                    <button class="btn btn-success float-right" id="btn_store_add">Save</button>
                    <button type="button" class="btn btn-warning text-white float-right" id="btn_store_edit">Save</button>
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
                                    <div class="col-sm-6 col-md-6 col-lg-6" style="text-align:right;">
                                        
                                        <!--<button type="button" class="mb-2 btn btn-sm btn-primary" onclick="closeNavR()">X</button>-->
                                        <button class="btn btn-link p-0 chat-close vm header-color-secondary" onclick="closeNavR()"><span class="material-icons icon-sm">close</span></button>
                                    </div>
                                  
                                </div>
                            
                            
                        </div>
                        <div class="card-body " style="overflow:auto;">
                             
                        
                        <!--Table-->
                            <table class="table table-striped table-bordered" id="list_of_stores" style="padding-top:5px;font-size:12px;width:100%">
                                <thead >
                                    <tr >
                                        <th style="width:5px">Details</th>
                                        <th>Sl No</th>
                                        <th>ID </th>
                                        <th>Category</th>
                                        <th>Item Code</th>
                                        <th>Item</th>
                                        <th>Units</th>
                                        <th>Rates/Unit</th>
                                        <th>VAT %</th>
                                        <th>VAT Amt</th>
                                        <th>Amount</th>
                                        <th>View</th>
                                        <th>Delete</th>
                                        
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