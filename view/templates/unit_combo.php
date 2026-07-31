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
<select class="chosen_select form-control form-control-sm" id="select_product_unit" name="select_product_unit">
 <option value="select">-Select Unit--</option>
<?PHP 
//echo "SELECT project_main_id,project_main_name FROM project_main_table  where company_id='".$_GET["company_id"]."' and project_status='Active'";
    $result = mysqli_query($con,"SELECT unit_id,trim(unit_name) as unit_name FROM unit_details where unit_status = 'Active'");
	while($row=mysqli_fetch_assoc($result)) {
    		   
    ?>
     <option value="<?PHP echo $row['unit_id']; ?>" ><?PHP echo $row['unit_name']; ?></option>

          
    <?PHP

	}

 ?> 
</select>
			
	<!--<script src="../js/jquery-3.2.1.min.js"></script>-->
 <!--   <script src="../vendor/chosen1.8/chosen.jquery.min.js"></script>-->
    
    <script>
        
        $('.chosen_select').chosen();
    </script>