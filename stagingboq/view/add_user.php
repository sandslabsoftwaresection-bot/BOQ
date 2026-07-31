<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "api.openweathermap.org/data/2.5/weather?q=bahrain,manama&appid=b3073171c40282ef72ccfc65faec0db0",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    $arr = json_decode($response, true);
}
?>
<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover">

    <!-- favicons -->
    <link rel="apple-touch-icon" href="../../httpdocs/images/company_profile_image/995847_236195_504913_logo_main.png">
    <link rel="icon" href="../../httpdocs/images/company_profile_image/995847_236195_504913_logo_main.png">

    <!-- Material design icons CSS -->
    <link rel="stylesheet" href="vendor/materializeicon/material-icons.css">

    <!-- animate CSS -->
    <link rel="stylesheet" href="vendor/animatecss/animate.css">

    <!-- swiper carousel CSS -->
    <link rel="stylesheet" href="vendor/swiper/css/swiper.min.css">

    <!-- daterange CSS -->
    <link rel="stylesheet" href="vendor/bootstrap-daterangepicker-master/daterangepicker.css">

    <!-- footable CSS -->
    <link rel="stylesheet" href="vendor/footable-bootstrap/css/footable.bootstrap.min.css">

    <!-- jvector map CSS -->
    <link rel="stylesheet" href="vendor/jquery-jvectormap/jquery-jvectormap-2.0.3.css">

    <!-- dataTable CSS -->
    <link rel="stylesheet" href="vendor/DataTables-1.10.18/css/dataTables.bootstrap4.min.css">

    <!-- ladda CSS -->
    <link rel="stylesheet" href="css/ladda/ladda-themeless.min.css">

    <!-- app CSS -->
    <link id="theme" rel="stylesheet" href="css/purplesidebar.css" type="text/css">

    <link rel="stylesheet" type="text/css" href="js/sweetalert/sweetalert.css">

    <style>
        /* Sidenav and SidenavR */
        .sidenav {
            background-color: #111;
            height: 100%;
            left: 0;
            overflow-x: hidden;
            padding-top: 60px;
            position: fixed;
            top: 0;
            transition: .5s;
            width: 0;
            z-index: 1;
        }
        
        .sidenavR {
            background-color: #d9d9d9;
            height: 100%;
            overflow-x: hidden;
            padding-top: 70px;
            position: fixed;
            right: 0;
            top: 0;
            transition: .5s;
            width: 0;
            z-index: 1000;
        }
        
        .sidenav a, .sidenavR a {
            color: #818181;
            display: block;
            font-size: 25px;
            padding: 8px 8px 8px 32px;
            text-decoration: none;
            transition: .3s;
        }
        
        .sidenav a:hover, .sidenavR a:hover, .offcanvas a:focus {
            color: #f1f1f1;
        }
        
        .sidenav .closebtn, .sidenavR .closebtn {
            font-size: 36px;
            margin-left: 55px;
            position: absolute;
            right: 25px;
            top: 55px;
        }
        
        /* Main container */
        .main-container {
            transition: margin-right 0.5s;
        }
        
        .sidenavR-open {
            margin-right: 85%;
        }
        
        /* Compact DataTable styling */
        #userDataTable_wrapper {
            padding: 0 10px;
        }
        
        #userDataTable {
            width: 100% !important;
        }
        
        /* Reduce row height */
        #userDataTable tbody tr {
            height: 35px;
        }
        
        #userDataTable td, #userDataTable th {
            padding: 4px 8px !important;
            font-size: 12px !important;
            line-height: 1.2 !important;
        }
        
        /* Reduce icon size */
        #userDataTable .material-icons {
            font-size: 16px !important;
            vertical-align: middle;
        }
        
        /* Action buttons styling */
        .btn-action, .btn-link {
            padding: 2px 6px !important;
            font-size: 10px !important;
            margin: 2px;
        }
        
        .status-badge {
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
        }
        
        .badge-active, .badge-success {
            background-color: #28a745;
            color: white;
        }
        
        .badge-inactive, .badge-danger {
            background-color: #dc3545;
            color: white;
        }
        
        .badge {
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
        }
        
        /* Compact toggle switch */
        .switch {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 20px;
        }
        
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 20px;
        }
        
        .slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 2px;
            bottom: 2px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        
        input:checked + .slider {
            background-color: #2196F3;
        }
        
        input:checked + .slider:before {
            transform: translateX(20px);
        }
        
        /* Status label */
        .status-label {
            font-size: 11px !important;
        }
        
        /* Compact pagination */
        .dataTables_paginate .paginate_button {
            padding: 0.2rem 0.4rem !important;
            font-size: 0.7rem !important;
            line-height: 1.2 !important;
            margin: 0 2px !important;
        }
        
        .dataTables_paginate {
            margin-top: 5px !important;
        }
        
        .dataTables_info, .dataTables_length {
            font-size: 11px !important;
            padding: 5px 0 !important;
        }
        
        /* Password update form styling */
        .password-update-form {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1001;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
            width: 90%;
            max-width: 500px;
        }
        
        .password-update-form .form-group {
            margin-bottom: 15px;
        }
        
        .password-update-form .form-control {
            width: 100%;
        }
        
        /* Custom switch for older styles */
        .custom-switch {
            padding-left: 2.25rem !important;
        }
        
        .custom-control-label::before,
        .custom-control-label::after {
            top: 0.25rem !important;
            left: -2.25rem !important;
            width: 1.5rem !important;
            height: 0.75rem !important;
        }
        
        .custom-control-input:checked ~ .custom-control-label::before {
            background-color: #28a745 !important;
            border-color: #28a745 !important;
        }
        
        .custom-switch .custom-control-label::after {
            top: calc(0.25rem + 2px) !important;
            left: calc(-2.25rem + 2px) !important;
            width: calc(0.75rem - 4px) !important;
            height: calc(0.75rem - 4px) !important;
        }
        
        .custom-switch .custom-control-input:checked ~ .custom-control-label::after {
            transform: translateX(0.75rem) !important;
        }
        
        /* Custom font */
        .custom-font {
            font-size: 13px;
        }
        
        /* Responsive design */
        @media screen and (max-width: 768px) {
            .sidenavR {
                width: 100% !important;
            }
            .sidenavR-open {
                margin-right: 0 !important;
            }
            #userDataTable td, #userDataTable th {
                padding: 3px 6px !important;
                font-size: 11px !important;
            }
            #userDataTable .material-icons {
                font-size: 14px !important;
            }
            .switch {
                width: 36px !important;
                height: 18px !important;
            }
            .slider:before {
                height: 14px !important;
                width: 14px !important;
                left: 2px !important;
                bottom: 2px !important;
            }
            input:checked + .slider:before {
                transform: translateX(18px) !important;
            }
        }

    </style>

    <?php include('templates/page_title.php') ?>
</head>

<body class="fixed-header sidebar-right-close">
    <!-- page loader -->
    <?php include('templates/page_loader.php') ?>
    <!-- page loader ends -->

    <div class="wrapper">
        <!-- main header -->
        <?php include('templates/head.php') ?>
        <!-- main header ends -->

        <!-- sidebar left -->
        <?php include('templates/left_menu.php') ?>
        <!-- sidebar left ends -->

        <!-- sidebar right -->
        <?php include('templates/side_right.php') ?>
        <!-- sidebar right ends -->

        <!-- content page title -->
        <?php include('templates/add_user_head.php') ?>
        <!-- content page title ends -->

        <!-- content page -->
        <?php include('templates/add_user_body.php') ?>
        <!-- content page ends -->

    </div>

    <!-- Password Update Form -->
    <div id="passwordUpdateForm" class="password-update-form">
        <div class="card">
            <div class="card-header" style="background: linear-gradient(90deg, rgba(10,87,173,1) 0%, rgba(23,148,255,1) 13%, rgba(0,44,215,0.9780287114845938) 100%);">
                <h5 class="mb-0 text-white">Update Password</h5>
            </div>
            <div class="card-body">
                <form id="updatePasswordForm">
                    <input type="hidden" id="update_user_id">
                    <div class="form-group">
                        <label>Current Password</label>
                        <input type="password" id="current_password" class="form-control" placeholder="Enter Current Password">
                    </div>
                    <div class="form-group">
                        <label>New Password</label>
                        <input type="password" id="new_password" class="form-control" placeholder="Enter New Password">
                    </div>
                    <div class="form-group">
                        <label>Confirm New Password</label>
                        <input type="password" id="confirm_new_password" class="form-control" placeholder="Confirm New Password">
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-secondary" onclick="$('#passwordUpdateForm').hide()">Cancel</button>
                        <button type="button" class="btn btn-success float-right" id="btn_update_password">Update Password</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <?php include('templates/footer.php') ?>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="vendor/bootstrap-4.1.3/js/bootstrap.min.js"></script>

    <!-- Cookie jquery file -->
    <script src="vendor/cookie/jquery.cookie.js"></script>

    <!-- sparklines chart jquery file -->
    <script src="vendor/sparklines/jquery.sparkline.min.js"></script>

    <!-- Circular progress gauge jquery file -->
    <script src="vendor/circle-progress/circle-progress.min.js"></script>

    <!-- Swiper carousel jquery file -->
    <script src="vendor/swiper/js/swiper.min.js"></script>

    <!-- Chart js jquery file -->
    <script src="vendor/chartjs/Chart.bundle.min.js"></script>
    <script src="vendor/chartjs/utils.js"></script>

    <!-- Footable jquery file -->
    <script src="vendor/footable-bootstrap/js/footable.min.js"></script>

    <!-- datepicker jquery file -->
    <script src="vendor/bootstrap-daterangepicker-master/moment.js"></script>
    <script src="vendor/bootstrap-daterangepicker-master/daterangepicker.js"></script>

    <!-- jVector map jquery file -->
    <script src="vendor/jquery-jvectormap/jquery-jvectormap.js"></script>
    <script src="vendor/jquery-jvectormap/jquery-jvectormap-world-mill-en.js"></script>

    <!-- DataTable jquery file -->
    <script src="vendor/DataTables-1.10.18/js/jquery.dataTables.min.js"></script>
    <script src="vendor/DataTables-1.10.18/js/dataTables.bootstrap4.min.js"></script>

    <!-- circular progress file -->
    <script src="vendor/circle-progress/circle-progress.min.js"></script>

    <!-- Dropzone jquery file -->
    <script src="vendor/dropzone-master/dropzone.js"></script>

    <!-- swiper slider jquery file -->
    <script src="js/ladda/spin.min.js" type="text/javascript"></script>
    <script src="js/ladda/ladda.min.js" type="text/javascript"></script>
    <script src="js/ladda/ladda.jquery.min.js" type="text/javascript"></script>

    <!-- jquery toast message file -->
    <script src="vendor/jquery-toast-plugin-master/dist/jquery.toast.min.js"></script>

    <!-- sweet alert -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>

    <!-- Application main common jquery file -->
    <script src="js/fileupload_ns.js"></script>
    <script src="js/timezone.js"></script>
    <script src="js/main-with-style-switcher.js"></script>
    <script src="../httpdocs/login_js/reset_password.js"></script>

    <!-- page specific script -->
    <script>
        $(document).ready(function() {
            var interval = setInterval(function() {
                var momentNow = moment();
                $('#b_time').html(momentNow.tz('Asia/Bahrain').format('hh:mm:ss a'));
            }, 100);

            var session = '<?php echo $_SESSION["loggedin"]; ?>';

            if (session === 'true') {
                $.cookie("user_id", "<?php echo $_SESSION["user_id"]; ?>", { expires: 365 });
                $.cookie("user_name", "<?php echo $_SESSION["user_name"]; ?>", { expires: 365 });
                $.cookie("user_contact_number", "<?php echo $_SESSION["user_contact_number"]; ?>", { expires: 365 });
                $.cookie("user_address", "<?php echo $_SESSION["user_address"]; ?>", { expires: 365 });
                $.cookie("user_whatsapp_no", "<?php echo $_SESSION["user_whatsapp_no"]; ?>", { expires: 365 });
                $.cookie("user_email_id", "<?php echo $_SESSION["user_email_id"]; ?>", { expires: 365 });
                $.cookie("user_type_id", "<?php echo $_SESSION["user_type_id"]; ?>", { expires: 365 });
                $.cookie("user_type_name", "<?php echo $_SESSION["user_type_name"]; ?>", { expires: 365 });
                $.cookie("user_username", "<?php echo $_SESSION["user_username"]; ?>", { expires: 365 });
                $.cookie("user_image", "<?php echo $_SESSION["user_image"]; ?>", { expires: 365 });
                $.cookie("user_status", "<?php echo $_SESSION["user_status"]; ?>", { expires: 365 });
            }

            $("#my-dropzone").dropzone({
                url: "../file-upload",
                addRemoveLinks: "dictRemoveFile"
            });

            $('.datepicker').daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                minYear: 1901
            }, function(start, end, label) { });

            // Initialize DataTable for View Users
            var userDataTable = $('#userDataTable').DataTable({
                ajax: {
                    url: '../controller/add_user/user_controller.php',
                    type: 'POST',
                    data: { action: 'get_users' },
                    dataSrc: 'data'
                },
                columns: [
                    { 
                        data: null,
                        render: function(data, type, row, meta) {
                            return meta.row + 1; // Auto-generated serial number
                        }
                    },
                    { data: 'names' },
                    { data: 'user_name' },
                    {
                        data: 'user_status',
                        render: function(data, type, row) {
                            var isChecked = data === 'Active' ? 'checked' : '';
                            return `
                                <label class="switch">
                                    <input type="checkbox" class="toggle-status" data-user-id="${row.user_id}" ${isChecked}>
                                    <span class="slider round"></span>
                                </label>
                                <span class="ml-2 status-label ${data === 'Active' ? 'text-success' : 'text-danger'}">
                                    ${data}
                                </span>`;
                        }
                    },
                    {
                        data: null,
                        render: function(data, type, row) {
                            return '<button class="btn btn-link p-0 update-password" data-user-id="' + row.user_id + '" title="Update Password">' +
                                   '<i class="material-icons text-primary">vpn_key</i>' +
                                   '</button>' +
                                   '<button class="btn btn-link p-0 delete-user" data-user-id="' + row.user_id + '" title="Delete User">' +
                                   '<i class="material-icons text-danger">delete</i>' +
                                   '</button>';
                        },
                        orderable: false,
                        searchable: false
                    }
                ],
                order: [[0, 'asc']],
                responsive: true,
                language: {
                    emptyTable: "No users found"
                },
                paging: false,  // 🚀 disables pagination
                dom: '<"top"f>rt<"bottom"lip><"clear">'
            });

            
            // Status toggle functionality
            $('#userDataTable').on('change', '.toggle-status', function() {
                var userId = $(this).data('user-id');
                var newStatus = this.checked ? 'Active' : 'Inactive';
            
                // ✅ Update text immediately
                var label = $(this).closest('td').find('.status-label');
                if (newStatus === 'Active') {
                    label.text('Active').removeClass('text-danger').addClass('text-success');
                } else {
                    label.text('Inactive').removeClass('text-success').addClass('text-danger');
                }
            
                // Confirmation popup
                swal({
                    title: "Change Status?",
                    text: "Are you sure you want to change the user status to " + newStatus + "?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willChange) => {
                    if (willChange) {
                        toggleUserStatus(userId, newStatus);
                    } else {
                        // Revert if cancelled
                        $(this).prop('checked', !this.checked);
                        var revertStatus = this.checked ? 'Active' : 'Inactive';
                        if (revertStatus === 'Active') {
                            label.text('Active').removeClass('text-danger').addClass('text-success');
                        } else {
                            label.text('Inactive').removeClass('text-success').addClass('text-danger');
                        }
                    }
                });
            });

            
            // Update password button click
            $('#userDataTable').on('click', '.update-password', function() {
                var userId = $(this).data('user-id');
                $('#update_user_id').val(userId);
                $('#current_password').val('');
                $('#new_password').val('');
                $('#confirm_new_password').val('');
                $('#passwordUpdateForm').show();
            });

            // Update password submission
            $('#btn_update_password').on('click', function() {
                var userId = $('#update_user_id').val();
                var currentPassword = $('#current_password').val();
                var newPassword = $('#new_password').val();
                var confirmNewPassword = $('#confirm_new_password').val();

                if (!currentPassword || !newPassword || !confirmNewPassword) {
                    swal("Error", "All password fields are required!", "error");
                    return;
                }

                if (newPassword !== confirmNewPassword) {
                    swal("Error", "New passwords do not match!", "error");
                    return;
                }

                $.ajax({
                    url: '../controller/add_user/user_controller.php',
                    type: 'POST',
                    data: {
                        action: 'update_password',
                        user_id: userId,
                        current_password: currentPassword,
                        new_password: newPassword
                    },
                    dataType: 'json',
                    success: function(res) {
                        if (res.success) {
                            swal("Success", res.message, "success").then(function() {
                                $('#passwordUpdateForm').hide();
                                userDataTable.ajax.reload(); // Refresh DataTable only
                            });
                        } else {
                            swal("Error", res.message, "error");
                        }
                    },
                    error: function() {
                        swal("Error", "Failed to update password. Please try again.", "error");
                    }
                });
            });
            
            $('#userDataTable').on('click', '.delete-user', function() {
                var userId = $(this).data('user-id');
                
                swal({
                    title: "Delete User?",
                    text: "Are you sure you want to delete this user?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        deleteUser(userId);
                    }
                });
            });
            
            function deleteUser(userId) {
                $.ajax({
                    url: '../controller/add_user/user_controller.php',
                    type: 'POST',
                    data: {
                        action: 'delete_user',
                        user_id: userId
                    },
                    dataType: 'json',
                    success: function(res) {
                        if (res.success) {
                            swal("Success", res.message, "success").then(function() {
                                userDataTable.ajax.reload(); // Refresh DataTable
                            });
                        } else {
                            swal("Error", res.message, "error");
                        }
                    },
                    error: function() {
                        swal("Error", "Failed to delete user. Please try again.", "error");
                    }
                });
            }
            
            // Function to toggle user status
            function toggleUserStatus(userId, newStatus) {
                $.ajax({
                    url: '../controller/add_user/user_controller.php',
                    type: 'POST',
                    data: {
                        action: 'toggle_status',
                        user_id: userId,
                        new_status: newStatus
                    },
                    dataType: 'json',
                    success: function(res) {
                        if (res.success) {
                            swal("Success", res.message, "success");
                            // No need to reload as the toggle already shows the correct state
                        } else {
                            swal("Error", res.message, "error");
                            // Revert the toggle on error
                            userDataTable.ajax.reload();
                        }
                    },
                    error: function() {
                        swal("Error", "Failed to update user status. Please try again.", "error");
                        // Revert the toggle on error
                        userDataTable.ajax.reload();
                    }
                });
            }
            
            $('#btn_view_list_of_users').on('click', function() {
                document.getElementById("mySidenavR").style.width = "85%";
                $('.main-container').addClass('sidenavR-open');
                // Refresh DataTable when sidebar opens
                userDataTable.ajax.reload();
            });
            
            // View Users button to open sidebar
            $('#btn_view_users').on('click', function() {
                document.getElementById("my SimultaneouslySidenavR").style.width = "70%";
                $('.main-container').addClass('sidenavR-open');
                
                // Refresh DataTable when sidebar opens
                userDataTable.ajax.reload();
            });
            
            // Close sidebar
            function closeNavR() {
                document.getElementById("mySidenavR").style.width = "0";
                $('.main-container').removeClass('sidenavR-open');
                $('#passwordUpdateForm').hide();
            }
            
            // Close sidebar when clicking outside
            $(document).on('click', function(e) {
                var sidenav = document.getElementById("mySidenavR");
                var viewUsersBtn = document.getElementById("btn_view_users");
                
                if (sidenav.style.width === "70%" && 
                    !$(e.target).closest('.sidenavR').length && 
                    !$(e.target).closest('#btn_view_users').length &&
                    !$(e.target).closest('.password-update-form').length &&
                    e.target !== viewUsersBtn) {
                    closeNavR();
                }
            });
            
            // Prevent closing when clicking inside sidebar
            $('.sidenavR').on('click', function(e) {
                e.stopPropagation();
            });

            // Add User button click event
            $('#btn_add_user').on('click', function(e) {
                e.preventDefault();
                var names = $('#txt_names').val();
                var user_name = $('#txt_user_name').val();
                var password = $('#txt_password').val();
                var confirm_password = $('#txt_confirm_password').val();
            
                if (!names || !user_name || !password || !confirm_password) {
                    swal("Error", "All fields are required!", "error");
                    return;
                }
            
                if (password !== confirm_password) {
                    swal("Error", "Passwords do not match!", "error");
                    return;
                }
            
                var formData = new FormData();
                formData.append('action', 'add_user');
                formData.append('names', names);
                formData.append('user_name', user_name);
                formData.append('password', password);
            
                $.ajax({
                    url: '../controller/add_user/user_controller.php',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    success: function(res) {
                        if (res.success) {
                            swal("Success", res.message, "success").then(function() {
                                // reset fields
                                $('#txt_names').val('');
                                $('#txt_user_name').val('');
                                $('#txt_password').val('');
                                $('#txt_confirm_password').val('');
                            });
                        } else {
                            swal("Error", res.message, "error");
                        }
                    },
                    error: function() {
                        swal("Error", "Failed to add user. Please try again.", "error");
                    }
                });
            });
            window.closeNavR = closeNavR;
        });
    </script>
</body>

</html>