<!-- <link rel="stylesheet" href="../vendor/materializeicon/material-icons.css">-->

    <!-- aniamte CSS -->
<!--    <link rel="stylesheet" href="../vendor/animatecss/animate.css">-->

    <!-- swiper carousel CSS -->
<!--    <link rel="stylesheet" href="../vendor/swiper/css/swiper.min.css">-->
<!--<link rel="stylesheet" href="../vendor/chosen1.8/chosen.css">-->


 <?PHP 

$con = mysqli_connect("localhost","sapphire_admin","s@nds1@b","sapphire_boq");

      if (mysqli_connect_errno())
        {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }
    


?>
 <select  id="select_company_name" name="select_company_name" class="chosen_select form-control form-control-sm" data-live-search="true" tabindex="-1"  aria-hidden="true"  >
 <option value="0" >-Select company--</option>
<?PHP 
                                                            $result = mysqli_query($con,"SELECT company_id,company_name FROM company_details where status='Active'");
                                                    		while($row=mysqli_fetch_assoc($result)) {
                                                    		   
                                                    ?>
                                                     <option value="<?PHP echo $row['company_id']; ?>" >  <?PHP echo $row['company_name'] ?></option>
                             
                                                          
                                                    <?PHP
                    
                                            		}
                        
                                                 ?> 
</select>
			
	<!--<script src="../js/jquery-3.2.1.min.js"></script>-->
 <!--   <script src="../vendor/chosen1.8/chosen.jquery.min.js"></script>-->
    
    <script>
        
        $('.chosen_select').chosen();
    </script>