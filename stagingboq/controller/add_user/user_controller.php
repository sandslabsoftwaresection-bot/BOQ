<?php
session_start();
require ('../../model/common/common_functions.php');

class UserController
{
    var $varModelObj, $varDBConnection;
    public $actionevents;
    public $names, $user_name, $password, $current_password, $new_password;
    public $user_id, $new_status;

    function __construct()
    {
        $this->varModelObj = new CommonModel();
        $this->varDBConnection = $this->varModelObj->varDBConnection;

        $this->actionevents = $_POST['action'] ?? null;
        $this->names = $_POST['names'] ?? null;
        $this->user_name = $_POST['user_name'] ?? null;
        $this->password = $_POST['password'] ?? null;
        $this->user_id = $_POST['user_id'] ?? null;
        $this->new_status = $_POST['new_status'] ?? null;
        $this->current_password = $_POST['current_password'] ?? null;
        $this->new_password = $_POST['new_password'] ?? null;
    }

    function SQLArray()
    {
        $array = array();
    
        $array['add_user'] = "INSERT INTO users (names, user_name, user_password)
            VALUES (
                '{$this->names}',
                '{$this->user_name}',
                '{$this->password}'
            )";
    
        $array['get_users'] = "SELECT user_id, names, user_name, user_status 
                               FROM users 
                               ORDER BY user_id ASC";
        
        $array['toggle_status'] = "UPDATE users SET user_status = '{$this->new_status}' 
                                  WHERE user_id = '{$this->user_id}'";
    
        $array['delete_user'] = "DELETE FROM users WHERE user_id = '{$this->user_id}'";
    
        $array['update_password'] = "UPDATE users SET user_password = '{$this->new_password}' 
                                    WHERE user_id = '{$this->user_id}' 
                                    AND user_password = '{$this->current_password}'";
    
        return $array;
    }

    function RequestAccept($FunctionEvents)
    {
        header('Content-Type: application/json');

        $var = $this->SQLArray();

        switch ($FunctionEvents) {
            case 'add_user':
                $response = ['success' => false, 'message' => 'Failed to add user.'];
                $affectedRows = $this->varModelObj->AddToTables($var['add_user']);
                
                if ($affectedRows > 0) {
                    $response['success'] = true;
                    $response['message'] = 'User added successfully.';
                } else {
                    $response['message'] = 'Failed to add user. Please try again.';
                }
                
                echo json_encode($response);
                break;

            case 'get_users':
                $data = $this->varModelObj->ListFromTables($var['get_users']);
                echo json_encode(['data' => $data]);
                break;

            case 'toggle_status':
                $response = ['success' => false, 'message' => 'Failed to update status.'];
                
                $this->varModelObj->UpdateTables($var['toggle_status']);
                
                if ($this->varDBConnection->affected_rows > 0) {
                    $response['success'] = true;
                    $response['message'] = 'User status updated successfully.';
                } else {
                    $response['message'] = 'No changes made or user not found.';
                }
                
                echo json_encode($response);
                break;
    
            case 'delete_user':
                $response = ['success' => false, 'message' => 'Failed to delete user.'];
                
                $this->varModelObj->DeleteRows($var['delete_user']);
                
                if ($this->varDBConnection->affected_rows > 0) {
                    $response['success'] = true;
                    $response['message'] = 'User deleted successfully.';
                } else {
                    $response['message'] = 'User not found.';
                }
                
                echo json_encode($response);
                break;

            case 'update_password':
                $response = ['success' => false, 'message' => 'Failed to update password.'];
                
                $this->varModelObj->UpdateTables($var['update_password']);
                
                if ($this->varDBConnection->affected_rows > 0) {
                    $response['success'] = true;
                    $response['message'] = 'Password updated successfully.';
                } else {
                    $response['message'] = 'Current password incorrect or user not found.';
                }
                
                echo json_encode($response);
                break;

            default:
                echo json_encode(['success' => false, 'message' => 'No Action Found in the Controller']);
                break;
        }

        exit;
    }
}

$obj = new UserController();
$obj->RequestAccept($obj->actionevents);
?>