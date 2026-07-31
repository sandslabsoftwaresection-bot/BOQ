$(document).ready(function(){
    
    var str_active_status ="";
    var btn_unit_save=$('#btn_unit_save').ladda();
    var unit_list_table = $('#tbl_unit_details').DataTable( {
        
    });
    $('#tbl_unit_details').removeClass( 'display' ).addClass('table table-striped table-bordered');
    
    load_data_to_grid_unit_list();
    
     function load_data_to_grid_unit_list()
     {
        
 
        //  $("#tbl_site_project").LoadingOverlay("show", {
        //      background  : "rgba(255, 100, 58, 0.2)"
        //  });
         unit_list_table.destroy();
            
             
         unit_list_table = $('#tbl_unit_details').DataTable( {
                
                 "ajax": {
                     'type': 'POST',
                     'url': '../controller/unit/unit_controller.php',
                     'data': {
                        action: 'list_unit'
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
                         "data": "unit_id","visible":false
                     },
                     { 
                         "data": "unit_name"
                     },
                     { "data": "unit_id",
                                 
                                     render: function ( data, type, rows, meta ) {
            						
            									str_active_status_view = ' <button type="button" class="btn btn-sm primary-gradient mr-1"  id="edit_unit" name="edit_unit" ><i class="material-icons ">remove_red_eye</i></button>';
            								
            								return str_active_status_view;
            
            							 },
                                     
                                 },
                     
                      { 
                         "data": "unit_status",
                         
                          render: function ( data, type, rows, meta ) {
                             
                                if(rows['unit_status']==='Active')
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

     $('#tbl_unit_details tbody').on('click', 'button', function(){
        if($(this).attr("name")=='status_active')
        {
            var $row = $(this).closest('tr');
            var data = unit_list_table.row($row).data();
            v_unit_id=data.unit_id;
            v_unit_status='Deactive';
         
            fun_unit_status_edit(v_unit_id,v_unit_status);

        }
         if($(this).attr("name")=='status_de_active')
        {
            var $row = $(this).closest('tr');
            var data = unit_list_table.row($row).data();
            v_unit_id=data.unit_id;
            v_unit_status='Active';
         
             fun_unit_status_edit(v_unit_id,v_unit_status);

        }
         if($(this).attr("name")=='edit_unit')
        {
        
         var $row = $(this).closest('tr');
            var data = unit_list_table.row($row).data();
            v_unit_id=data.unit_id;
            
            $('#txt_unit_name').val(data.unit_name);
            $('#txt_unit_id').val(data.unit_id);
        } 
        
       
});



     function fun_unit_status_edit(v_unit_id,v_unit_status)
        {
       
        $.post("../controller/unit/unit_controller.php",{action:'update_unit_status',unit_id:v_unit_id,unit_status:v_unit_status }, function(result,status){
         //alert(result);
           if(result==1) 
           {
           // swal("Success"," Unit Status Updated Successfully", "success");  
             load_data_to_grid_unit_list();
           }
           else
           {
              swal("Error","Some error occures....", "error");
              load_data_to_grid_unit_list();
           }
         }); 
    }
    
    
    
    

      $('#txt_unit_name').keypress(function (e) {
           
                var str = $(this).val();
                str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
                
                });
                $(this).val(str);
        

        }); 


       btn_unit_save.click(function(){
        
                 btn_unit_save.ladda( 'start' );
                 var v_unit_name=$('#txt_unit_name').val();
                
                if($('#txt_unit_name').val() == "" )
                 {
                     btn_unit_save.ladda( 'stop' );
                     swal("Warning","Please fill the unit name", "warning");
                   
                 }
                
                else
                {
          
                       $.post("../controller/unit/unit_controller.php",{action:'add_unit',unit_name:v_unit_name }, function(result,status){
        
                
                        if(result>=0)
                        {
                            btn_unit_save.ladda( 'stop' );
                            // swal("Success"," unit details added successfully", "success"); 
                            load_data_to_grid_unit_list();
                            $('#txt_unit_name').val('');
                        }
                        
                        else{
                            
                           btn_unit_save.ladda( 'stop' );
                           swal("Warning",result, "warning");
                           $('#txt_unit_name').val('');
                        }
                
                         $('#txt_unit_name').val() == "" ;
                     });
              };
      });




    
     $('#btn_unit_edit').click(function(){
         
            var v_unit_name=$('#txt_unit_name').val();
            var v_unit_id=$('#txt_unit_id').val();
     
       
           $.post("../../controller/unit/unit_controller.php",{action:'update_unit',unit_name:v_unit_name,unit_id:v_unit_id}, function(result,status){
               //alert(result);
             if(result>=0)
             {
           // swal("Success","Site/Project details updated successfully", "success");
            load_data_to_grid_unit_list();
           $('#txt_unit_name').val('');
           $('#txt_unit_id').val('');
             }
            else
            {
               swal("Warning","Some Error Occures", "warning");
                load_data_to_grid_unit_list();
                $('#txt_unit_name').val('');
                $('#txt_unit_id').val('');
            }
        }); 

       
    });
});