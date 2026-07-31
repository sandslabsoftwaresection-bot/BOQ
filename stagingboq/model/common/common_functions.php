<?php //session_start();?>
<?php 

include "../../model/db_connection/connection.php" ;
abstract class FunctionDefinitions
{
	abstract public function ListFromTable($SQL); 
	abstract public function ListFromTables($SQL); 
	abstract public function ListFromTableWithOutData($SQL);
	
    abstract public function AddToTable($SQL);
    abstract public function AddToTables($SQL);
    abstract public function ReturnCountValue($SQL);
	abstract public function CreateDropDown($SQL,$value,$text,$controlName,$title);
	abstract public function returnValuefromDB($SQL,$item);
	abstract public function UpdateTable($SQL);
	abstract public function UpdateTables($SQL);
	abstract public function DeleteRow($SQL);
	abstract public function DeleteRows($SQL);
    abstract public function userAuthentication($SQL,$SQL1,$password);
    abstract public function userAuthenticationforcheck($SQL,$password);
	abstract public function SignOut();
	abstract public function ExecuteProcedure($SQL);
	abstract public function CreateDropDownForSite($SQL,$value,$value1,$value2,$text,$controlName,$title);
	abstract public function ExecuteProcedureForReturnTableFormat($SQL);
	abstract public function ListFromAcntsTable($SQL);
	abstract public function CreateDropDownforProject($SQL,$value,$value1,$value2,$text,$controlName,$title);
	abstract public function CreateDropDownforSubject($SQL,$value,$value1,$text,$controlName,$title);
	abstract public function CreateDropDownfortax($SQL,$value,$text1,$text2,$controlName);
	abstract public function CreateDropDownForItem($SQL,$value,$text1,$text2,$controlName,$title);
	
	abstract public function check_user_count($SQL);
	abstract public function check_count($SQL);
	
	abstract public function ExecuteSQLQuery($SQL);

	
}

class CommonModel extends FunctionDefinitions
{
	public $varDBConnection,$varAcntConnection;
	var $result;
	var $flag=0;
	

	function __construct()
	{
		$DBConn = new DBConnection();
		$this->varDBConnection = $DBConn->ConnectToMYSQL();
   //	$ACNTConn= new AcntConnection();
	//	$this->varAcntConnection=$ACNTConn->ConnectToMYSQLAcnts();
	}

	public function ListFromTable($SQL)
	{
		//echo $SQL;
		$temp = array();
		$this->result = mysqli_query($this->varDBConnection,$SQL);
		while($row=mysqli_fetch_assoc($this->result)) {
			$temp['data'][] = $row;
		}
		$this->flag=1;
		echo json_encode($temp);
		
	}
	public function ListFromTables($SQL)
    {
        $temp = [];
        $this->result = mysqli_query($this->varDBConnection, $SQL);
        
        if ($this->result && mysqli_num_rows($this->result) > 0) {
            while ($row = mysqli_fetch_assoc($this->result)) {
                $temp[] = $row;
            }
        }
        
        $this->flag = 1;
        return $temp;
    }
	public function ListFromTableWithOutData($SQL)
	{
		//echo $SQL;
		$temp = array();
		$this->result = mysqli_query($this->varDBConnection,$SQL);
		while($row=mysqli_fetch_assoc($this->result)) {
			$temp[] = $row;
		}
		$this->flag=1; 
		echo json_encode($temp);
		
	}
	
	
	public function ReturnProductId($SQL)
	{
		//echo $SQL;
		$temp = array();
		
		$this->result = mysqli_query($this->varDBConnection,$SQL);
		while($row=mysqli_fetch_assoc($this->result)) {
		    $product_code=$row['finished_product_id'];
		    if($product_code!='')
		    {
		        $temp[data]= $row;
		    }
		    else
		    {
		        $temp[data]= null;
		    }
		}
		$this->flag=1;
		//echo $x;
        echo json_encode($temp);
	}
	
		public function ListFromAcntsTable($SQL)
	{
		//echo $SQL;
		$temp = array();
		$this->result = mysqli_query($this->varAcntConnection,$SQL);
		while($row=mysqli_fetch_assoc($this->result)) {
			$temp['data'][] = $row;
		}
		$this->flag=1;
		echo json_encode($temp);
		
	}
	
	public function ExecuteSQLQuery($SQL) {
        // Execute the SQL query
        $this->result = mysqli_query($this->varDBConnection,$SQL);

        // Check if the query was successful
        if (!$this->result) {
            die("Query failed: " . $this->varDBConnection->error);
        }

        return $this->result;
    }
  

    function ReturnCountValue($SQL)
	{
			$this->result = mysqli_query($this->varDBConnection,$SQL);
			$affected_status = mysqli_num_rows($this->result);
			$this->flag=0;
			return $affected_status;
	}
	

// 	public function CreateDropDown($SQL,$value,$text,$controlName,$title)
// 	{
		
// 		$str = "<select class='form-control form-control-sm'  id='".$controlName."' name='".$controlName."'><option value=0>".$title."</option>";
// 		$this->result = mysqli_query($this->varDBConnection,$SQL);
// 		while($row=mysqli_fetch_assoc($this->result)) {
// 			$str=$str."<option value='".$row[$value]."'>".$row[$text]."</option>";
// 		}

// 		$str = $str .'</select>';

// 		$this->flag=1;
// 		echo $str;
		
// 	}
	
	public function CreateDropDown($SQL,$value,$text,$controlName,$title)
	{
		
		$str = "<select class='chosen_select form-control form-control-sm'  id='".$controlName."' name='".$controlName."'>
		<option value='0'>".$title."</option>";
		$this->result = mysqli_query($this->varDBConnection,$SQL);
		while($row=mysqli_fetch_assoc($this->result)) {
			$str=$str."<option value='".$row[$value]."'>".$row[$text]."</option>";
		}

		$str = $str .'</select>';

		$this->flag=1;
		echo $str;
		
		
		
// 		$str = "<option value='0'>".$title."</option>";
// 		$this->result = mysqli_query($this->varDBConnection,$SQL);
// 		while($row=mysqli_fetch_assoc($this->result)) {
// 			$str=$str."<option value='".$row[$value]."'>".$row[$text]."</option>";
// 		}

// 		$str = $str;

// 		$this->flag=1;
// 		echo $str;
	}
	
	
	
	
	public function CreateDropDownForSite($SQL,$value,$value1,$value2,$text,$controlName,$title)
	{
	
		$str = "<select class='chosen_select form-control'  id='".$controlName."' name='".$controlName."'><option value='0'>".$title."</option>";
		$this->result = mysqli_query($this->varDBConnection,$SQL);
		while($row=mysqli_fetch_assoc($this->result)) {
		   
			//$str=$str."<option value=".$row[$value]."-".$row[$value1]."-".$row[$value2].">".$row[$text]."</option>";
			$str=$str."<option value=".$row[$value].">".$row[$text]."</option>";	
		}

		$str = $str .'</select>';

		$this->flag=1;
		echo $str;
		
	}
	
	
	public function CreateDropDownForSubject($SQL,$value,$value1,$text,$controlName,$title)
	{
	
		$str = "<select class='form-control'  id='".$controlName."' name='".$controlName."'><option value='0'>".$title."</option>";
	
		$this->result = mysqli_query($this->varDBConnection,$SQL);
		while($row=mysqli_fetch_assoc($this->result)) {
		   
		$str=$str."<option value=".$row[$value]."-".$row[$value1].">".$row[$text]."</option>";
			//$str=$str."<option value=".$row[$value].">".$row[$text]."</option>";	
		}

		$str = $str .'</select>';

		$this->flag=1;
		echo $str;
		
	}

		public function CreateDropDownforProject($SQL,$value,$value1,$value2,$text,$controlName,$title)
	{
	
		$str = "<select class='form-control form-control-sm'  id='".$controlName."' name='".$controlName."'><option value='0'>".$title."</option>";
		$this->result = mysqli_query($this->varAcntConnection,$SQL);
		while($row=mysqli_fetch_assoc($this->result)) {
		   
			$str=$str."<option value=".$row[$value]."/".$row[$value1].">".$row[$text]." ( ".$row[$value1]." )"."</option>";
			//$str=$str."<option value=".$row[$value].">".$row[$text]."</option>";	
		}

		$str = $str .'</select>';

		$this->flag=1;
		echo $str;
		
	}
	
	
	public function returnValuefromDB($SQL,$item)
	{
		
		$res=0;
		$this->result = mysqli_query($this->varDBConnection,$SQL);
		while($row=mysqli_fetch_assoc($this->result)) {
			$res=$row[$item];
		}

		$this->flag=0;
		echo $res;
		return $res;
		
	}
    
    	public function check_user_count($SQL)
	{
		
		$this->result = mysqli_query($this->varDBConnection,$SQL);
		
		while($row=mysqli_fetch_assoc($this->result)) {
			$card_count=$row['count'];
		}
		
		echo $card_count;
			
		
	}
	
		public function check_count($SQL)
	{
		
		$this->result = mysqli_query($this->varDBConnection,$SQL);
		
		while($row=mysqli_fetch_assoc($this->result)) {
			$card_count=$row['count'];
		}
		
		echo $card_count;
			
		
	}
   	public function userAuthenticationforcheck($SQL,$password)
	{
	
		$user_name; 
	
		$user_password;
		$user_image;
        $user_status;
        
           

      // echo $SQL;
        
        $return_string="";
		$this->result = mysqli_query($this->varDBConnection,$SQL);
		$row_count = mysqli_num_rows($this->result);
		
		if($row_count>=1)
		{

            while($row=mysqli_fetch_assoc($this->result))
             {
			
				$user_id =$row['user_id'];
			    $user_name =$row['user_name'];
        		$user_password =$row['user_password'];
        // 		$user_image =$row['user_image'];
                $user_status =$row['user_status'];
				}
			
			if($user_status=='Active')
			{
				if($password==$user_password)
				{
					session_start();
					
					               
									
									// Store data in session variables
									
									
									$_SESSION["loggedin"] = "true";
									$_SESSION["user_id"] = $user_id;
									$_SESSION["user_name"] = $user_name; 
								
									$_SESSION["user_status"] = $user_status;
									$_SESSION['LOGINSTATUS']='true';
									
									
								
										$return_string="index.php";
									
									
									
									
									
									
									return 'true'.'#'.$return_string;
				}
				else
				{
					return 'Please provide correct password...!';
				}

			}
			else
			{
				return 'Your Login is not active, Please contact your administrator..!';
			}
			
		
		}
		else
		{
			return 'Username does not Exists...!';
		}
		
		
		
		$this->flag=1;
		
		
	}
	
  
	public function userAuthentication($SQL,$SQL1,$password)
	{
	
		$user_name; 
		$user_contact_number ;
		$user_address;
		$user_whatsapp_no;
		$user_email_id;
		$user_type_id;
        $user_type_name;
        $user_username;
		$user_password;
		$user_image;
        $user_status;
        
        
        $privilege;
        
           

       
        
        $return_string="";
		$this->result = mysqli_query($this->varDBConnection,$SQL);
		$row_count = mysqli_num_rows($this->result);
		
		if($row_count>=1)
		{

            while($row=mysqli_fetch_assoc($this->result))
             {
			
				$user_id =$row['users_id'];
			 
                $user_username =$row['user_username'];
        		$user_password =$row['user_password'];
        	
                $user_status =$row['status'];
				}
			
			if($user_status=='Active')
			{
				if($password==$user_password)
				{
					session_start();
					
					                $this->result = mysqli_query($this->varDBConnection,$SQL1);
                            		$row_count = mysqli_num_rows($this->result);
                            		
                            		if($row_count>=1)
                            		{
                                    $temp = array();
                            	
                            		while($row=mysqli_fetch_assoc($this->result)) {
                            			$temp['data'][] = $row;
                            		}
                            		
                                     $_SESSION['privilege']  = json_encode($temp);
                                         
                            		}  
					              
									
									// Store data in session variables
									
									
									$_SESSION["loggedin"] = "true";
									$_SESSION["user_id"] = $user_id;
									$_SESSION["user_name"] = $user_name; 
								 
									$_SESSION["user_username"] = $user_username;
									$_SESSION["user_password"] = $user_password; 
									
									$_SESSION["user_status"] = $user_status;
									$_SESSION['LOGINSTATUS']='true';
									
									
								
										$return_string="common.php";
									
									
									
									
									
									
									return 'true'.'#'.$return_string;
				}
				else
				{
					return 'Please provide correct password...!';
				}

			}
			else
			{
				return 'Your Login is not active, Please contact your administrator..!';
			}
			
		
		}
		else
		{
			return 'Username does not Exists...!';
		}
		
		
		
		$this->flag=1;
		
		
	}


	
	
	function AddToTable($SQL)
	{
		try { 
				mysqli_query($this->varDBConnection, $SQL);
				$inserted_id = mysqli_insert_id($this->varDBConnection);
				$this->flag=0;
				echo $inserted_id;
				return $inserted_id;
		}
		catch (mysqli_sql_exception $e) { 
			return $e->errorMessage(); 
		} 
		//exit();
		
	}
	function AddToTables($SQL)
	{
		try { 
				mysqli_query($this->varDBConnection, $SQL);
				$inserted_id = mysqli_insert_id($this->varDBConnection);
				$this->flag=0;
				// echo $inserted_id;
				return $inserted_id;
		}
		catch (mysqli_sql_exception $e) { 
			return $e->errorMessage(); 
		} 
		//exit();
		
	}

	function UpdateTable($SQL)
	{
			$retval = mysqli_query($this->varDBConnection, $SQL);
			$affected_status = mysqli_affected_rows($this->varDBConnection);
			$this->flag=0;
			echo $affected_status;
	}

    function UpdateTables($SQL)
	{
			$retval = mysqli_query($this->varDBConnection, $SQL);
			$affected_status = mysqli_affected_rows($this->varDBConnection);
			$this->flag=0;
// 			echo $affected_status;
            return $affected_status;
	}



	function DeleteRow($SQL)
	{
			$retval = mysqli_query($this->varDBConnection, $SQL);
			$affected_status = mysqli_affected_rows($this->varDBConnection);
			$this->flag=0;
			echo $affected_status;
	}
	function DeleteRows($SQL)
	{
			$retval = mysqli_query($this->varDBConnection, $SQL);
			$affected_status = mysqli_affected_rows($this->varDBConnection);
			$this->flag=0;
// 			echo $affected_status;
            return $affected_status;
	}
	

	
    
	public function SignOut()
	{
	
		session_start();
		$_SESSION = array();
		session_destroy();
	}

   public function ExecuteProcedure($SQL)
	{
			$retval = mysqli_query($this->varDBConnection, $SQL);
			if (!($res = $this->varDBConnection->query("SELECT @msg as _p_out"))) {
				echo "Fetch failed: (" . $this->varDBConnection->errno . ") " . $this->varDBConnection->error;
			}
			$row = $res->fetch_assoc();
			$this->flag=0;
			
			echo $row['_p_out'];
		    return $row['_p_out'];
			
	}
	
	
	function ExecuteProcedureForReturnTableFormat($SQL) 
	{	
			$temp = array();
			$this->result = mysqli_query($this->varDBConnection,$SQL);
			while($row=mysqli_fetch_assoc($this->result)) {
			
				$temp['data'][] = $row;
			}
	
			$this->flag=1;
			
			echo json_encode($temp);

	}
	
		public function CreateDropDownfortax($SQL,$value,$text1,$text2,$controlName)
	{
		
		$str = "<select class='form-control form-control-sm'  id='".$controlName."' name='".$controlName."'>";
		$this->result = mysqli_query($this->varDBConnection,$SQL);
		while($row=mysqli_fetch_assoc($this->result)) {
			$str=$str."<option value='".$row[$value]."'>".$row[$text1]."-".$row[$text2]."</option>";
		}

		$str = $str .'</select>';

		$this->flag=1;
		echo $str;
		
	}
	
		public function CreateDropDownForItem($SQL,$value,$text1,$text2,$controlName,$title)
	{
		
		$str = "<select class='chosen_select form-control form-control-sm'  id='".$controlName."' name='".$controlName."'><option value='0'>".$title."</option>";
		$this->result = mysqli_query($this->varDBConnection,$SQL);
		while($row=mysqli_fetch_assoc($this->result)) {
			$str=$str."<option value='".$row[$value]."'>".$row[$text1]."-".$row[$text2]."</option>";
		}

		$str = $str .'</select>';

		$this->flag=1;
		echo $str;
		
	}

	function __destruct() {
		if($this->flag==1)
		{
			mysqli_free_result($this->result);
		}
		
		mysqli_close($this->varDBConnection);
		mysqli_close($this->varAcntConnection);
		//print "Destroying " . __CLASS__ . "\n";
		
    }
	
	

}

?>