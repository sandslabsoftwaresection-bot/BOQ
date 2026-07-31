<!-- content page -->
        <div class="container mt-4 main-container ">
            <div class="card mb-4">
                <div class="card-header border-bottom col-sm-12">
                    <div class="row ">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <h5 class="content-color-primary mb-0">Category/Unit Information</h5>
                        </div>
                        <!--<div class="col-lg-6 col-md-6" style="text-align:right">-->
                        <!--    <button class="btn btn-link p-0 chat-close vm header-color-secondary" onclick="openNavR()"><span class="material-icons">flip_to_front</span></button>-->
                            
                        <!--</div>-->
                    </div>
                    
                </div>
                <div class="card-body">
                    <div class="row ">
                        
                    <div class="col-md-5 mb-5" style="align:left;padding-right:2px">
                        <!--<label for="validationTooltipUsername">Site/Project Name</label>-->
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="validationTooltipUsernamePrepend">C</span>
                            </div>
                            <input type="text" class="form-control" id="txt_category_name" placeholder="Category Name" aria-describedby="validationTooltipUsernamePrepend" required>
                           <input type="hidden" class="form-control" id="txt_category_id"  aria-describedby="validationTooltipUsernamePrepend">
                        </div>
                    </div>
                    
                    <div class="col-md-1 mb-1" style="align:right;padding-left:2px">
                        <div class="dropdown">
                            <button class="btn btn-primary dropdown-toggle mb-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Action
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#" id="btn_category_save">Add</a>
                                <a class="dropdown-item" href="#" id="btn_category_edit">Update</a>
                                
                            </div>
                        </div>
                        
                        
                    </div>
                    
                        <div class="col-md-4 mb-4" style="align:left;padding-right:2px">
                        <!--<label for="validationTooltipUsername">Site/Project Name</label>-->
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="validationTooltipUsernamePrepend">U</span>
                            </div>
                            <input type="text" class="form-control" id="txt_unit_name" placeholder="Unit Name" aria-describedby="validationTooltipUsernamePrepend" required>
                            <input type="hidden" class="form-control" id="txt_unit_id"  aria-describedby="validationTooltipUsernamePrepend">
                           
                        </div>
                    </div>
                    
                    <div class="col-md-1 mb-1" style="align:right;padding-left:2px">
                        <div class="dropdown">
                            <button class="btn btn-primary dropdown-toggle mb-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Action
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#" id="btn_unit_save">Add</a>
                                <a class="dropdown-item" href="#" id="btn_unit_edit">Update</a>
                                
                            </div>
                        </div>
                        
                        
                    </div>
                    
                   
                    </div>
                     <div class="row ">
                         <div class="col-md-6 mb-3" style="align:left">
                         <table class="table no-footer table-striped table-bordered dataTable"  id="tbl_category_details">
                                <thead>
                                    <tr>
                                        <th>Category ID</th>
                                        <th>Category Name</th>
                                        <th>View</th>
                                        <th>Status</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                   
                                </tbody>
                            </table>
                         </div>
                         
                         
                         
                         <div class="col-md-6 mb-3" style="align:left">
                         <table class="table no-footer table-striped table-bordered dataTable" id="tbl_unit_details">
                                <thead>
                                    <tr>
                                        <th>Unit ID</th>
                                        <th>Unit Name</th>
                                        <th>View</th>
                                        <th >Status</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                  
                                </tbody>
                        </table>
                         </div>
                         
                     </div>
                    
                     </div>
                    
                    
                </div>
                <!--<div class="card-footer">-->
                <!--    <button class="btn btn-secondary">Cancel</button>-->
                <!--    <button class="btn btn-success float-right" id="btn_user_save">Save</button>-->
                <!--    <button class="btn btn-warning float-right" id="btn_user_edit"  >Edit</button>-->
                <!--</div>-->
            </div>
        </div>
        </div>
        
       <!-- content page ends -->
