<!-- content page -->
<style>
.responsive_image {
    max-width: 100vw;
    height: auto;
    width: auto;
    max-height: 100vh;
}
</style>
<div class="container mt-2 main-container">
    <div class="card">
        <div class="card-header text-white" style="background: linear-gradient(90deg, rgba(10,87,173,1) 0%, rgba(23,148,255,1) 13%, rgba(0,44,215,0.9780287114845938) 100%);">
            <div class="media w-100">
                <figure class="avatar avatar-40 rounded-circle align-self-start">
                    <!-- Optional logo -->
                </figure>
                <div class="media-body">
                    <h5 class="time-title mb-0 text-white">Add User</h5>
                    <p class="mb-0 text-white">Manage User Accounts<span class="status bg-success"></span></p>
                </div>
                <div class="dropdown d-inline-block">
                    <a href="#" class="text-white ml-3 mt-1 dropdown-toggle caret-none" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="btn_view_users">
                        View Users
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <button class="dropdown-item" onclick="openNavR()" id="btn_view_list_of_users">View Users</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body py-0">
            <div class="card-body">
                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <div class="col-lg-6">
                                <label>Name</label>
                                <input type="text" id="txt_names" class="form-control" placeholder="Enter Name">
                            </div>
                            <div class="col-lg-6">
                                <label>Username</label>
                                <input type="text" id="txt_user_name" class="form-control" placeholder="Enter Username">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-lg-6">
                                <label>Password</label>
                                <input type="password" id="txt_password" class="form-control" placeholder="Enter Password">
                            </div>
                            <div class="col-lg-6">
                                <label>Confirm Password</label>
                                <input type="password" id="txt_confirm_password" class="form-control" placeholder="Confirm Password">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="row">
                    <div class="col-lg-6 col-md-12">
                        <button class="btn btn-secondary" id="btn_cancel">Cancel</button>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <button type="button" class="btn btn-success float-right" id="btn_add_user">Add User</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Sidebar for View Users -->
<div id="mySidenavR" class="sidenavR" style="background-color:white;padding-top:70px;">
    <div class="col-sm-12 col-md-12 col-lg-12" style="padding:0px">
        <div class="card rounded-0 border-0 mb-12">
            <div class="card-header" style="background: linear-gradient(90deg, rgba(10,87,173,1) 0%, rgba(23,148,255,1) 13%, rgba(0,44,215,0.9780287114845938) 100%);">
                <div class="row">
                    <div class="col-sm-6 col-md-6 col-lg-6">
                        <h5 class="mb-0 text-white">User List</h5>
                    </div>
                    <div class="col-sm-6 col-md-6 col-lg-6" style="text-align:right">
                        <button class="btn btn-link p-0 chat-close vm text-white" onclick="closeNavR()">
                            <span class="material-icons icon-sm">close</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <table id="userDataTable" class="table table-striped table-bordered nowrap">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<!-- content page ends -->