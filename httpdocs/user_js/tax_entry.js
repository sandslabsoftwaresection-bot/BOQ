$(document).ready(function(){
   
                var v_btn_add_tax = $( '#btn_add_tax' ).ladda();
                var v_btn_edit_tax = $( '#btn_edit_tax' ).ladda();
                
                //var company_list_table = $('#list_of_companies').DataTable({});
                
                var tax_list_table = $('#list_of_tax').DataTable({searching: true, paging: true, info: false,"ordering": false});
                
                //var invoice_view_list_table = $('#list_of_invoices').DataTable( {searching: false, paging: false, info: false,"ordering": false});
                 $('#list_of_tax').removeClass( 'display' ).addClass('table table-striped table-bordered');
                 //$('#list_of_invoices').removeClass( 'display' ).addClass('table table-striped table-bordered');
                  $('#list_of_tax tbody').on( 'click', 'tr', function () {
                        if ( $(this).hasClass('selected') ) { $(this).removeClass('selected'); } else { tax_list_table.$('tr.selected').removeClass('selected'); $(this).addClass('selected'); }
                  }); 
                //  $('#list_of_invoices tbody').on( 'click', 'tr', function () {
                //     if ( $(this).hasClass('selected') ) { $(this).removeClass('selected'); } else { invoice_view_list_table.$('tr.selected').removeClass('selected'); $(this).addClass('selected'); }
                //  }); 
                 
                 $( '#btn_edit_tax' ).hide();
                
               function formatDate(date) {
                     var d = new Date(date),
                         month = '' + (d.getMonth() + 1),
                         day = '' + d.getDate(),
                         year = d.getFullYear();
                
                     if (month.length < 2) month = '0' + month;
                     if (day.length < 2) day = '0' + day;
                
                     return [year, month, day].join('-');
                }
                
         
   
                $('#txt_tax_value').on("keypress", function (e) {
               
                if (e.which != 8 && e.which != 0 && ((e.which < 48 || e.which > 57) && e.which != 46)) {
                    e.preventDefault();
                }
               });
                
           
    
                v_btn_add_tax.click(function(){
                    
                    v_btn_add_tax.ladda( 'start' );
                    
                    var v_tax_name=$("#txt_tax_name").val();
                    var v_tax_value=$("#txt_tax_value").val();
                    var v_from_date=$("#from_date").val();
                    var v_to_date=$("#to_date").val();
                    // alert(v_from_date);
                   
                   
                  
            
                    if($.trim(v_tax_name)==""||$.trim(v_tax_value)==""||$.trim(v_from_date)==""||$.trim(v_to_date)=="")
                    
                    {
                        swal("Warning","Please provide all the details ....", "warning");
                        v_btn_add_tax.ladda( 'stop' );
                        return false;
                    }
                   
                    else
                    {         
                         $.post("../controller/tax_entry/tax_entry_controller.php",{action:'add_tax_entry',v_tax_name:v_tax_name,v_tax_value:v_tax_value,v_from_date:v_from_date,v_to_date:v_to_date }
                                , function(result,status)
                                {
                                   
                                result = $.trim(result);
                               
                                if(result.charAt(0)=='U')
                                {
                                    v_btn_add_tax.ladda( 'stop' );
                                    swal("Error", result, "error");
                                    //load_data_to_grid_invoice_list()
                                    clear_text();
                                   

                                
                                }
                                else 
                                {
                                     v_btn_add_tax.ladda( 'stop' );
                                    
                                     //swal("Success"," Invoice added Successfully", "success");
                                     $.toast({
                                        heading: 'Success',
                                        text: 'New tax details added successfully..!',
                                        showHideTransition: 'slide',
                                        icon: 'success'
                                    });
                                    
                                   
                                    //  $("#txt_tax_name,#txt_tax_value").prop("readonly",true);
                                     
                                     
                                    
                                    
                                    
                                    
                                     clear_text();
                                    
                                }
                                
                                 
                            
                        });
                        
                       
                        
                     }
                  
                });
            
                
               
                      
                 function clear_text()
                 {
                     
                    
                   $("#txt_tax_name").val('');
                   $("#txt_tax_value").val('');
                   $("#from_date").val('');
                   $("#to_date").val('');
                    
                   
                 }
            
            
               
          
                function load_data_to_grid_tax_list()
                 {
                    // company_list_table.destroy();
                         
                     tax_list_table = $('#list_of_tax').DataTable( {
                         
                            
                             "ajax": {
                                 'type': 'POST',
                                 'url': '../controller/tax_entry/tax_entry_controller.php',
                                 'data': {
                                    action: 'list_tax_entry'
                                 }
                             },
                             "language": {
                                 "zeroRecords": "No records available",
                                 "infoEmpty": "No records available",
                              },
                            "order": [[ 0, "desc" ]],
            				"bPaginate": true,
            				"bLengthChange": false,
            				"bFilter": false,
            				"bInfo": false,
            				"autoWidth": false,
            				
            				
                            "columns": [
                                //   {
                                //     "className":  'details-control',
                                //     "orderable":  false,
                                //     "data":        null,
                                //     "defaultContent": ''
                                //  },
                                 { "data": null,"width":'20px'},
                                 { "data": "tax_id","visible":false },
                                 { "data": "tax_name" },
                                 { "data": "tax_value",className: "text-right"},
                                 { "data": "valid_from"},
                                 { "data": "valid_to"},
                                { "data": "tax_id",
                                 
                                     render: function ( data, type, rows, meta ) {
            						
            									str_active_status_view = ' <button type="button" class="btn btn-sm primary-gradient mr-1"  id="edit_company" name="edit_tax" ><i class="material-icons ">remove_red_eye</i></button>';
            								
            								return str_active_status_view;
            
            							 },
                                     
                                 },
                                 
                                 { "data": "tax_id",
                                 
                                     render: function ( data, type, rows, meta ) {
            						
            									str_active_status_delete = ' <button type="button" class="btn btn-sm btn-danger mr-1"  id="delete_company" name="delete_tax" ><i class="material-icons ">delete</i></button>';
            								
            								return str_active_status_delete;
            
            							 },
                                     
                                 },
             
                             ],
                             pageLength: 25,
            				 searching: true,
                             responsive: true,
                             destroy: true,
            				
                            	"aoColumnDefs": [
            					{ "bSortable": false, "aTargets": [  0,1,2,3,4,5] }, 
            					
            				],
                            
                             "initComplete": function( settings, json ) {
                                    
                               
             
                              },
                              "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                     $("td:eq(0)", nRow).html(iDisplayIndex + 1);
                     return nRow;
                  },
                  "drawCallback": function () {
                                    $('.dataTables_paginate > .pagination').addClass('pagination-sm');
                                }
                            
                     });  
                
                 }
                 
            
              
                 
                
                 $('#btn_create_new_tax').click(function(){
                    location.reload(true);
                 
                 });
                 
               
                  
                 
                                 
                 $('#list_of_tax tbody').on('click', 'td button', function(){
                        var $row = $(this).closest('tr');
                        if ( $row.hasClass('child') ) {
                            var  $row = $row.prev();
                        }
                        var data = tax_list_table.row($row).data();
                        
                        v_tax_id  = data.tax_id;
                        $("#txt_tax_name").val('');
                        $("#txt_tax_value").val('');
                        $("#from_date").val('');
                        $("#to_date").val('');
                    
                        $( '#btn_add_tax' ).hide();
                        $( '#btn_edit_tax' ).show();
                        
                        
                       
                       if($(this).attr("name")=='delete_tax')
                         {
                                                                 swal({
                                                                    
                                        							title: "Are you sure?",
                                        							text: "Do you want to delete the entry?",
                                        							icon: 'warning',
                                        							dangerMode: true,
                                        							allowOutsideClick: false,
                                                                    closeOnClickOutside: false,
                                        							buttons: {
                                        							  cancel: 'No Cancel !',
                                        							  delete: 'Yes Please Delete'
                                        							}
                                        							}).then(function (willDelete) {
                                        							if (willDelete) {
                                        						
                                        						       delete_tax_entry(v_tax_id);
                                                     						 
                                        							} else {
                                        							    
                                        							   
                                        							 
                                        							}
                                        						 });
                         }
                                     
                                          if($(this).attr("name")=='edit_tax')
                         {
                                          edit_data(v_tax_id);
                                          closeNavR();
                         }
                                         
                                         
                                    
                            
                        
                        
                     function  edit_data(v_tax_id) 
                       {
                        //alert(data.account_name);
                        // $("#txt_tax_name,#txt_tax_value").prop("readonly",false);
                        $("#txt_tax_id").val(v_tax_id);   
                       
                        $("#txt_tax_name").val(data.tax_name);
                        $("#txt_tax_value").val(data.tax_value);
                        $("#from_date").val(data.valid_from);
                        $("#to_date").val(data.valid_to);
                        
                        $('#btn_edit_tax' ).show();
                         
                        
                        closeNavR();
                       }  
                        
                 });
                 
                function delete_tax_entry(v_tax_id)
                    {
                        
                        $.post("../controller/tax_entry/tax_entry_controller.php",{action:'cancel_tax_entry',v_tax_id:v_tax_id}
                                                , function(result,status)
                                                {
                                            //         swal("System is deactivated the tax entry", {
                                    								// title: 'Warning',
                                    								// icon: "warning",
                                    							 // });
                                                    
                         });
                         
                         load_data_to_grid_tax_list();
                       
                    }
                 
             
                  
                 
                  v_btn_edit_tax.click(function(){
                      
                 
                    v_btn_edit_tax.ladda( 'start' );
                    var v_tax_id=$("#txt_tax_id").val();
                    var v_tax_name=$("#txt_tax_name").val();
                    var v_tax_value=$("#txt_tax_value").val();
                    var v_from_date=$("#from_date").val();
                    var v_to_date=$("#to_date").val();
                  
            
                    if($.trim(v_tax_name)==""||$.trim(v_tax_value)==""||$.trim(v_from_date)==""||$.trim(v_to_date)=="")
                    
                    {
                        swal("Warning","Please provide all the details ....", "warning");
                        v_btn_edit_tax.ladda( 'stop' );
                        return false;
                    }
                    
                    
                   
                    else
                    {         
                         $.post("../controller/tax_entry/tax_entry_controller.php",{action:'edit_tax_entry',v_tax_id:v_tax_id,v_tax_name:v_tax_name,v_tax_value:v_tax_value,v_from_date:v_from_date,v_to_date:v_to_date }
                                , function(result,status)
                               
                                {
                                   
                                result = $.trim(result);
                               
                                if(result.charAt(0)=='U')
                                {
                                    v_btn_edit_tax.ladda( 'stop' );
                                    swal("Error", result, "error");
                                    //load_data_to_grid_invoice_list()
                                    clear_text();
                                   
                                   

                                
                                }
                                else
                                {
                                     v_btn_edit_tax.ladda( 'stop' );
                                    
                                     //swal("Success"," Invoice added Successfully", "success");
                                     $.toast({
                                        heading: 'Success',
                                        text: 'Tax details edited successfully..!',
                                        showHideTransition: 'slide',
                                        icon: 'success'
                                    });
                                     $( '#btn_add_tax' ).show();
                                     $( '#btn_edit_tax' ).hide();
                                     //$("#txt_invoice_no").val(result);
                                    
                                     
                                    load_data_to_grid_tax_list();
                                     clear_text();
                                    
                                }
                            
                        }); 
                     }
            
                   
                });
                
              
                  
                 
               
                
                  
                 $('#btn_view_list_of_tax').click(function(){
                     
                    load_data_to_grid_tax_list(); 
                     
                 });     
                  
                  
                  
                  $('#btn_cancel').click(function(){
                     
                     clear_text(); 
                     
                 }); 

});