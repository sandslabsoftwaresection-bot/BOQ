$(document).ready(function(){
    
    var str_active_status ="";
    var btn_category_save=$('#btn_category_save').ladda();
    var category_list_table = $('#tbl_category_details').DataTable( {
        
    });
    $('#tbl_category_details').removeClass( 'display' ).addClass('table table-striped table-bordered');
    
    load_data_to_grid_category_list();
    
     function load_data_to_grid_category_list()
     {
        
 
        //  $("#tbl_site_project").LoadingOverlay("show", {
        //      background  : "rgba(255, 100, 58, 0.2)"
        //  });
         category_list_table.destroy();
            
             
         category_list_table = $('#tbl_category_details').DataTable( {
                
                 "ajax": {
                     'type': 'POST',
                     'url': '../controller/category/category_controller.php',
                     'data': {
                        action: 'list_category'
                     }
                 },
                "lengthChange": false,
                 "language": {
                     "zeroRecords": "No records available",
                     "infoEmpty": "No records available",
                  },
                 "order": [[ 0, "asc" ]],
                 "columns": [
                     
                     { 
                         "data": "category_id","visible":false
                     },
                     { 
                         "data": "category_name"
                     },
                     
                     { "data": "category_id",
                                 
                                     render: function ( data, type, rows, meta ) {
            						
            									str_active_status_view = ' <button type="button" class="btn btn-sm primary-gradient mr-1"  id="edit_category" name="edit_category" ><i class="material-icons ">remove_red_eye</i></button>';
            								
            								return str_active_status_view;
            
            							 },
                                     
                                 },
                     
                      { 
                         "data": "category_status",
                         
                          render: function ( data, type, rows, meta ) {
                             
                                if(rows['category_status']==='Active')
                                {
                                   str_active_status = '<button class="btn btn-outline-success btn-sm" id="status_active" name="status_active">Active</button>';
                                }
                                else
                                {
                                   str_active_status = '<button class="btn btn-outline-danger btn-sm" id="status_de_active" name="status_de_active">Deactive</button>';
                                
                                }
                             
                             return str_active_status;
 
                          }
                     }
 
                 ],
                
                 "initComplete": function( settings, json ) {
                  
                    // $("#tbl_site_project").LoadingOverlay("hide");
 
                  },
                  "fnDrawCallback": function() {
                     //$("#tbl_site_project").LoadingOverlay("hide");
 
                 }
 
                 
                 
             });
     
     }

     $('#tbl_category_details tbody').on('click', 'button', function(){
        if($(this).attr("name")=='status_active')
        {
            var $row = $(this).closest('tr');
            var data = category_list_table.row($row).data();
            v_category_id=data.category_id;
            v_category_status='Deactive';
         
            fun_category_status_edit(v_category_id,v_category_status);

        }
         if($(this).attr("name")=='status_de_active')
        {
            var $row = $(this).closest('tr');
            var data = category_list_table.row($row).data();
            v_category_id=data.category_id;
            v_category_status='Active';
         
             fun_category_status_edit(v_category_id,v_category_status);

        }
         if($(this).attr("name")=='edit_category')
        {
        
         var $row = $(this).closest('tr');
            var data = category_list_table.row($row).data();
            v_category_id=data.category_id;
            
            $('#txt_category_name').val(data.category_name);
            $('#txt_category_id').val(data.category_id);
        }
       
});



     function fun_category_status_edit(v_category_id,v_category_status)
        {
       
        $.post("../controller/category/category_controller.php",{action:'update_category_status',category_id:v_category_id,category_status:v_category_status }, function(result,status){
         
           if(result==1) 
           {
            // swal("Success"," Site/Project Status Updated Successfully", "success");  
             load_data_to_grid_category_list();
           }
           else
           {
              swal("Error","Some error occures....", "error");
              load_data_to_grid_category_list();
           }
         }); 
    }
    
    
    
   
    

      $('#txt_category_name').keypress(function (e) {
           
                var str = $(this).val();
                str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
                
                });
                $(this).val(str);
        

        }); 


       btn_category_save.click(function(){
        
                 btn_category_save.ladda( 'start' );
                 var v_category_name=$('#txt_category_name').val();
                
                if($('#txt_category_name').val() == "" )
                 {
                     btn_category_save.ladda( 'stop' );
                     swal("Warning","Please fill the category name", "warning");
                   
                 }
                
                else
                {
          
                       $.post("../controller/category/category_controller.php",{action:'add_category',category_name:v_category_name }, function(result,status){
        
                
                        if(result>=0)
                        {
                            btn_category_save.ladda( 'stop' );
                            swal("Success"," Category details added successfully", "success"); 
                            load_data_to_grid_category_list();
                            $('#txt_category_name').val('');
                        }
                        
                        else{
                            
                           btn_category_save.ladda( 'stop' );
                           swal("Warning",result, "warning");
                           $('#txt_category_name').val('');
                        }
                
                         $('#txt_category_name').val() == "" ;
                     });
              };
      });




    
     $('#btn_category_edit').click(function(){
         
            var v_category_name=$('#txt_category_name').val();
            var v_category_id=$('#txt_category_id').val();
     
       
           $.post("../../controller/category/category_controller.php",{action:'update_category',category_name:v_category_name,category_id:v_category_id}, function(result,status){
             if(result>=0)
             {
           // swal("Success","Site/Project details updated successfully", "success");
            load_data_to_grid_category_list();
           $('#txt_category_name').val('');
           $('#txt_category_id').val('');
             }
            else
            {
               swal("Warning","Some Error Occures", "warning");
                load_data_to_grid_category_list();
                $('#txt_category_name').val('');
                $('#txt_category_id').val('');
            }
        }); 

       
    });
});