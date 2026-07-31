
<?PHP 
require ('../model/db_connection/connection.php');
  $db_conn= new DBConnection();
  $con = $db_conn->ConnectToMYSQL();
  
?>


 <header class="main-header">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-auto pl-0">
                        <button class="btn pink-gradient btn-icon" id="left-menu"><i class="material-icons">widgets</i></button>
                        <a href="index.php" class="logo"><img src="../../httpdocs/images/company_profile_image/995847_236195_504913_logo_main.png" alt=""><span class="text-hide-xs"><b>Business</b>DECK</span></a>
                        <form class="search-header">
                            <div class="input-group">
                                <!--<input type="text" class="form-control" placeholder="Search...">-->
                                <!--<div class="input-group-append">-->
                                <!--    <button class="btn " type="button"><i class="material-icons">search</i></button>-->
                                <!--</div>-->
                            </div>

                        </form>
                    </div>
                    <div class="col text-center p-xs-0">
                        <ul class="time-day">
                            <li class="text-right">
                                <p class="header-color-primary"><span class="header-color-secondary"><?PHP date_default_timezone_set('Asia/Bahrain'); echo date("F");?></span><small><?PHP echo date("Y");?></small></p>
                                <h2><?PHP echo date("d");?></h2>
                            </li>
                            <li class="text-left">
                                <h2><?PHP echo round((int)($arr['main']['temp'])-273.15);?><span class="header-color-secondary font-weight-light"><sup>o</sup>C</span></h2>
                                <p class="header-color-primary text-hide-lg"><span class="header-color-secondary">Bahrain</span><small id="b_time"><?PHP echo date("h:i: a");?></small></p>
                            </li>
                        </ul>

                    </div>
                    <div class="col-auto pr-0" >
                        <button class="btn btn-link text-hide-md header-color-secondary font-small px-0" type="button"><i class="material-icons">text_format</i></button>
                        <button class="btn btn-link text-hide-md header-color-secondary font-big px-0 mr-3" type="button"><i class="material-icons">text_format</i></button>

                        <button class="btn btn-search btn-icon header-color-secondary" type="button"><i class="material-icons">search</i></button>

                        
          
                        <div class="dropdown d-inline-block">
                            <a class="btn header-color-secondary dropdown-toggle username" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <figure class="userpic"><img src="../../httpdocs/images/company_profile_image/995847_236195_504913_logo_main.png" alt=""></figure>
                                <h5 class="text-hide-xs">
                                    <small class="header-color-secondary">Welcome,</small>
                                    <span class="header-color-primary"><?PHP echo ucfirst($_COOKIE['user_name'])?></span>
                                </h5>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right profile-dropdown" aria-labelledby="dropdownMenuLink">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <a href="profile.html">
                                            <figure class="avatar avatar-120 mx-auto my-3">
                                                <img src="../../httpdocs/images/company_profile_image/995847_236195_504913_logo_main.png" alt="">
                                            </figure>
                                            <h5 class="card-title mb-2 header-color-primary"><?PHP echo ucfirst($_COOKIE['user_name'])?></h5>
                                            <h6 class="card-subtitle mb-3 header-color-secondary"><?PHP echo ucfirst($_COOKIE['user_type_name'])?></h6>
                                        </a>
                                        <!--<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>-->
                                        <!--<button class="btn btn-sm pink-gradient border-0 mb-3">Edit</button>-->
                                    </div>
                                </div>
                                <a class="dropdown-item pink-gradient-active" href="javascript:void(0);" id="open-right-sidebar">
                                    <div class="row align-items-center">
                                        <div class="col">
                                            Setting
                                        </div>

                                        <div class="col-auto">
                                            <div class="header-color-secondary ml-2"><i class="material-icons vm">settings</i></div>
                                        </div>
                                    </div>
                                </a>
                                <div class="dropdown-divider m-0"></div>
                                <!--<a class="dropdown-item pink-gradient-active" href="javascript:void(0);">-->
                                <!--    <div class="row align-items-center">-->
                                <!--        <div class="col">-->
                                <!--            5458 <small class="header-color-secondary font-italic">Points Collected</small>-->
                                <!--        </div>-->

                                <!--        <div class="col-auto">-->
                                <!--            <i class="header-color-secondary material-icons vm">local_play</i>-->
                                <!--        </div>-->
                                <!--    </div>-->
                                <!--</a>-->
                                <div class="dropdown-divider m-0"></div>
                                <a class="dropdown-item pink-gradient-active" href="signin.php">
                                    <div class="row align-items-center">
                                        <div class="col">
                                            Logout
                                        </div>

                                        <div class="col-auto">
                                            <div class="text-danger ml-2"><i class="material-icons vm">exit_to_app</i></div>
                                        </div>
                                    </div>
                                </a>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </header>