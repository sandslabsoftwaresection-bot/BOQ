


 <?PHP 

$con = mysqli_connect("localhost","sapphire_admin","s@nds1@b","sapphire_boq");

      if (mysqli_connect_errno())
        {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }
    


?>
<select class="chosen_select form-control form-control-sm" id="select_item_name" name="select_item_name">
 <option value='select'>Select Item</option>
<?PHP 
 $v_category_id = isset($_GET["v_category_id"]) ? (int)$_GET["v_category_id"] : 0;
//echo "SELECT store_id,item_code,item_name,store_status FROM store_details_entry where category_id='".$_GET["v_category_id"]."' and store_status='Pending'";

if ($v_category_id === 0) {
   $sql="SELECT store_id,item_code,item_name,store_status FROM store_details_entry where store_status='Pending'"; 
}
else
{
    $sql="SELECT store_id,item_code,item_name,store_status FROM store_details_entry where category_id='".$_GET["v_category_id"]."' and store_status='Pending'";
} 
    $result = mysqli_query($con,$sql);
	while($row=mysqli_fetch_assoc($result)) {
    		   
    ?>
     <option value="<?PHP echo $row['store_id']; ?>" >  <?PHP echo $row['item_code']."-".$row['item_name']; ?></option>

          
    <?PHP

	}

 ?> 
</select>
			

    
    <script>
        
        $('.chosen_select').chosen();
        
         $('#select_item_name').chosen(
            {
    width: "95%"
            });
              
    </script>