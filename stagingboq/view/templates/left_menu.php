<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
?>
    <div class="sidebar sidebar-left">
        <ul class="nav flex-column">
            <li class="nav-item <?if($_GET['sm']==1){echo 'active';}?>">
                <a href="javascript:void(0);" class="nav-link dropdwown-toggle"><i class="material-icons icon">computer</i> <span>Masters</span><i class="material-icons icon arrow">expand_more</i></a>
                <ul class="nav flex-column">
                    <li class="nav-item <?if($_GET['m']==2){echo 'active';}?>">
                        <a href="company_profile.php?m=2&sm=1" class="nav-link pink-gradient-<?if($_GET['m']==2){echo 'active';}?>"><i class="material-icons icon"></i> <span>Company Profile</span></a>
                    </li>
                     <li class="nav-item <?if($_GET['m']==2){echo 'active';}?>">
                        <a href="add_user.php?m=2&sm=1" class="nav-link pink-gradient-<?if($_GET['m']==2){echo 'active';}?>"><i class="material-icons icon"></i> <span>Add User</span></a>
                    </li>
                    <li class="nav-item <?if($_GET['m']==6){echo 'active';}?>">
                        <a href="tax.php?m=6&sm=1" class="nav-link pink-gradient-<?if($_GET['m']==6){echo 'active';}?>"><i class="material-icons icon"></i> <span>Tax</span></a>
                    </li>
                    <li class="nav-item <?if($_GET['m']==1){echo 'active';}?>">
                        <a href="company.php?m=1&sm=1" class="nav-link pink-gradient-<?if($_GET['m']==1){echo 'active';}?>"><i class="material-icons icon"></i> <span>Clients</span></a>
                    </li>
                    <li class="nav-item <?if($_GET['m']==4){echo 'active';}?>">
                        <a href="projects.php?m=4&sm=1" class="nav-link pink-gradient-<?if($_GET['m']==4){echo 'active';}?>"><i class="material-icons icon"></i> <span>Projects</span></a>
                    </li>
                     <li class="nav-item <?if($_GET['m']==5){echo 'active';}?>">
                        <a href="category.php?m=5&sm=1" class="nav-link pink-gradient-<?if($_GET['m']==5){echo 'active';}?>"><i class="material-icons icon"></i> <span>Category / Units</span></a>
                    </li>
                     <li class="nav-item <?if($_GET['m']==7){echo 'active';}?>">
                        <a href="primary_store.php?m=7&sm=1" class="nav-link pink-gradient-<?if($_GET['m']==7){echo 'active';}?>"><i class="material-icons icon"></i> <span>Store</span></a>
                    </li>
                    <li class="nav-item <?if($_GET['m']==9){echo 'active';}?>">
                        <a href="master_product.php?m=9&sm=1" class="nav-link pink-gradient-<?if($_GET['m']==9){echo 'active';}?>"><i class="material-icons icon"></i> <span>Product</span></a>
                    </li>
                </ul>
            </li>
            <li class="nav-item <?if($_GET['m']==10){echo 'active';}?>">
                <a href="finished_product.php?m=10&sm=1" class="nav-link pink-gradient-<?if($_GET['m']==10){echo 'active';}?>"><i class="material-icons icon">subtitles</i> <span>Estimation</span></a>
            </li>
            <li class="nav-item">
                <a href="javascript:void(0);" class="nav-link dropdwown-toggle"> <i class="material-icons icon">view_headline</i><span>Reports</span><i class="material-icons icon arrow">expand_more</i></a>
                <ul class="nav flex-column">
                    <li class="nav-item <?if($_GET['m']==11){echo 'active';}?>">
                        <a href="report_bill_of_qty.php?m=11&sm=1" class="nav-link pink-gradient-<?if($_GET['m']==11){echo 'active';}?>"><i class="material-icons icon"></i> <span>Bill Of Quantity</span></a>
                    </li>
                    <li class="nav-item <?if($_GET['m']==12){echo 'active';}?>">
                        <a href="report_primary_cost.php?m=12&sm=1" class="nav-link pink-gradient-<?if($_GET['m']==12){echo 'active';}?>"><i class="material-icons icon"></i> <span>Primary Cost</span></a>
                    </li>
                    <li class="nav-item <?if($_GET['m']==13){echo 'active';}?>">
                        <a href="report_secondary_cost.php?m=13&sm=1" class="nav-link pink-gradient-<?if($_GET['m']==13){echo 'active';}?>"><i class="material-icons icon"></i> <span>Secondary Cost</span></a>
                    </li>
                    <li class="nav-item <?if($_GET['m']==14){echo 'active';}?>">
                        <a href="report_material_list.php?m=14&sm=1" class="nav-link pink-gradient-<?if($_GET['m']==14){echo 'active';}?>"><i class="material-icons icon"></i> <span>Material List</span></a>
                    </li>
                    <li class="nav-item <?if($_GET['m']==15){echo 'active';}?>">
                        <a href="report_primary_cost_report1.php?m=15&sm=1" class="nav-link pink-gradient-<?if($_GET['m']==15){echo 'active';}?>"><i class="material-icons icon"></i> <span>Data Sheet</span></a>
                    </li>
                </ul>
            </li>
            <li class="nav-item <?php if($_GET['m']==10){echo 'active';} ?>">
                <a href="quick_calculation.php?m=10&sm=1" class="nav-link pink-gradient-<?php if($_GET['m']==10){echo 'active';} ?>"><i class="material-icons icon">Q</i><span>Quick Calculation</span></a>
            </li>
        </ul>
    </div>