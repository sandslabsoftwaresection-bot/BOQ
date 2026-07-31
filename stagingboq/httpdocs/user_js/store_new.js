$(document).ready(function(){
    
                 
   
                var v_btn_store_add = $( '#btn_store_add' ).ladda();
                var v_btn_store_edit = $( '#btn_store_edit' ).ladda();
                
                //var company_list_table = $('#list_of_companies').DataTable({});
                
                var store_list_table = $('#list_of_stores').DataTable({ info: false,"ordering": false});
                $('#list_of_stores').addClass('pagination-sm');
                
                //var invoice_view_list_table = $('#list_of_invoices').DataTable( {searching: false, paging: false, info: false,"ordering": false});
                 $('#list_of_stores').removeClass( 'display' ).addClass('table table-striped table-bordered');
                 //$('#list_of_invoices').removeClass( 'display' ).addClass('table table-striped table-bordered');
                  $('#list_of_stores tbody').on( 'click', 'tr', function () {
                        if ( $(this).hasClass('selected') ) { $(this).removeClass('selected'); } else { store_list_table.$('tr.selected').removeClass('selected'); $(this).addClass('selected'); }
                  }); 
                //  $('#list_of_invoices tbody').on( 'click', 'tr', function () {
                //     if ( $(this).hasClass('selected') ) { $(this).removeClass('selected'); } else { invoice_view_list_table.$('tr.selected').removeClass('selected'); $(this).addClass('selected'); }
                //  }); 
                 
                 $( '#btn_store_edit' ).hide();
                 //$('#btn_edit_invoice' ).hide();
              // load_data_to_grid_company_list();
               function formatDate(date) {
                     var d = new Date(date),
                         month = '' + (d.getMonth() + 1),
                         day = '' + d.getDate(),
                         year = d.getFullYear();
                
                     if (month.length < 2) month = '0' + month;
                     if (day.length < 2) day = '0' + day;
                
                     return [year, month, day].join('-');
                }
                
 
            
      $('#txt_length,#txt_width,#txt_thickness,#txt_weight,#txt_height').blur(function (e) {
           
            var current_length=$('#txt_length').val();
            var current_width=$('#txt_width').val();
            var current_thickness=$('#txt_thickness').val();
            var current_weight=$('#txt_weight').val();
            var current_height=$('#txt_height').val();
     
            if(current_length == "")
            {
                $('#txt_length').val(0);
            }
            if(current_width == "")
            {
                $('#txt_width').val(0);
            }
            if(current_thickness == "")
            {
                $('#txt_thickness').val(0);
            }
            if(current_weight == "")
            {
                $('#txt_weight').val(0);
            }
            if(current_height == "")
            {
                $('#txt_height').val(0);
            }
           
      });
       
       $('#txt_length,#txt_width,#txt_thickness,#txt_weight,#txt_height').change(function (e) {
           
           calculate_total_weight();
           
        
       });
       
       
       
       function calculate_total_weight()
       {
            var current_length=$('#txt_length').val();
            var current_width=$('#txt_width').val();
            var current_thickness=$('#txt_thickness').val();
            var current_weight=$('#txt_weight').val();
            var current_height=$('#txt_height').val();
           console.log("Value:"+isNaN(current_length));
            if( parseFloat(current_length)=="0" || current_length=="")
            {
                current_length=1;
                
            }
            else
            {
                current_length=current_length;
            }
            
            if(parseFloat(current_width)=="0" || current_width=="" )
            {
                current_width=1;
                
            }
            else
            {
                current_width=current_width;
            }
            
            if(parseFloat(current_thickness)=="0" || current_thickness==""  )
            {
                current_thickness=1;
            }
            else
            {
                
                current_thickness=current_thickness;
            }
            
            if(parseFloat(current_weight)=="0" || current_weight=="")
            {
                current_weight=1;
                
            }
            else
            {
                current_weight=current_weight;
            }
            
            if(parseFloat(current_height)=="0" || current_height=="")
            {
                current_height=1;
                
            }
            else
            {
                current_height=current_height;
            }
            
            console.log("L:"+current_length+"W:"+current_width+"TH:"+current_thickness+"Wt:"+current_weight);
            console.log("parse"+parseFloat($('#txt_length').val())+"parse:"+parseFloat($('#txt_width').val()));
             if( parseFloat($('#txt_length').val()) > "0"  || parseFloat($('#txt_width').val()) > "0"  || parseFloat($('#txt_thickness').val())> "0"  || parseFloat($('#txt_weight').val()) > "0"  ) 
            {
                
                 var tot_weight=parseFloat(current_length)*parseFloat(current_width)*parseFloat(current_thickness)*parseFloat(current_weight);
                console.log(tot_weight);
                $('#txt_total_weight').val(tot_weight);
            }
            else
            {
                $('#txt_total_weight').val(0);
            }
            
            if( parseFloat($('#txt_length').val()) > "0"  || parseFloat($('#txt_width').val())>"0" ) 
            {
            var square_meter=parseFloat(current_length)*parseFloat(current_width);
            console.log(square_meter);
            $('#txt_square_meter').val(square_meter);
               
            }
            else
            {
             $('#txt_square_meter').val(0);
            }
            
            
            if( parseFloat($('#txt_length').val()) > "0"  || parseFloat($('#txt_width').val())>"0" || parseFloat($('#txt_height').val())>"0" ) 
            {
            var cubic_meter=parseFloat(current_length)*parseFloat(current_width)*parseFloat(current_height);
            console.log(cubic_meter);
            $('#txt_cubic_meter').val(cubic_meter);
               
            }
            else
            {
             $('#txt_cubic_meter').val(0);
            }
            
            
       }
       
       
                
                $('#txt_rate_per_unit').change(function (e) {
           
                   load_tax_select_box('div_tax_select','select_tax_name');
                    $('#txt_vat_amount').val("");
                    $("#txt_amount").val("");

              });
               
               load_category_select_box('div_category_select','select_category_name');
               
               load_unit_select_box('div_unit_select','select_primary_unit');
               
               load_tax_select_box('div_tax_select','select_tax_name');
                           
               load_secondary_unit_select_box('div_secondary_unit_select','select_seconadry_unit');
                
                function load_category_select_box(div_name,ctrl_name)
                        
                        { 
                          
                   $("#"+div_name).load("../controller/store/store_controller.php",{action:'list_category',v_ctrl_name:ctrl_name},function(result,status){});
        
                        }
                        
                function load_unit_select_box(div_name,ctrl_name)
                        
                        { 
                          
                   $("#"+div_name).load("../controller/store/store_controller.php",{action:'list_units',v_ctrl_name:ctrl_name},function(result,status){});
        
                        } 
                        
                function load_tax_select_box(div_name,ctrl_name)
                        
                        { 
                          
                   $("#"+div_name).load("../controller/store/store_controller.php",{action:'list_tax',v_ctrl_name:ctrl_name},function(result,status){});
        
                        } 
                           
                  function load_secondary_unit_select_box(div_name,ctrl_name)
                        
                        { 
                          
                   $("#"+div_name).load("../controller/store/store_controller.php",{action:'list_secondary_unit',v_ctrl_name:ctrl_name},function(result,status){});
        
                        }          
                
                 $("#div_tax_select").change(function() {
                      
                    $('#div_tax_select').val($('option:selected', this).text()) ;
                    
                     var v_tax_details=$("#div_tax_select option:selected").text();
                    v_tax_details=v_tax_details.split("-");
                    v_tax_name=v_tax_details[0];
                    v_tax_amount=v_tax_details[1];
                    v_primary_rate_per_unit=$("#txt_rate_per_unit").val();
                   // alert(v_tax_amount);
                    txt_vat_amount=v_primary_rate_per_unit * (v_tax_amount/100);
                    $('#txt_vat_amount').val(txt_vat_amount);
                    var total_amount=(parseFloat($('#txt_vat_amount').val())+parseFloat($("#txt_rate_per_unit").val()));
                    $("#txt_amount").val(total_amount);
                    
                 });
                
              
    
    
                v_btn_store_add.click(function(){
                    
                    v_btn_store_add.ladda( 'start' );
                    
                    var v_category_id=$("#div_category_select option:selected").val();
                    var v_category_name=$("#div_category_select option:selected").text();
                    var v_item_code=$("#txt_item_code").val();
                    var v_item_name=$("#txt_item_name").val();
                    var v_unit_id=$("#div_unit_select option:selected").val();
                    var v_unit_name=$("#div_unit_select option:selected").text();
                    var v_primary_rate_per_unit=$("#txt_rate_per_unit").val();
                    var v_tax_id=$("#div_tax_select option:selected").val();
                    var v_tax_details=$("#div_tax_select option:selected").text();
                    v_tax_details=v_tax_details.split("-");
                    v_tax_name=v_tax_details[0];
                    v_tax_percentage=v_tax_details[1];
                    var v_vat_amount=$("#txt_vat_amount").val();
                    var v_txt_amount=$("#txt_amount").val();
                    var v_txt_precision=$("#txt_precision").val();
                    var v_txt_length=$("#txt_length").val();
                    var v_txt_width=$("#txt_width").val();
                    var v_txt_height=$("#txt_height").val();
                    var v_txt_thickness=$("#txt_thickness").val();
                    var v_txt_weight=$("#txt_weight").val();
                    var v_sec_unit_id=$("#div_secondary_unit_select option:selected").val();
                    var v_sec_unit_name=$("#div_secondary_unit_select option:selected").text();
                    var v_total_weight=$("#txt_total_weight").val();
                    var v_square_meter=$("#txt_square_meter").val();
                    var v_cubic_meter=$("#txt_cubic_meter").val();
                    var v_txt_secondary_rate_per_unit=$("#txt_secondary_rate_per_unit").val();
                    // var v_session_image=$('#my-dropzone').val();
                    
                    // var v_session_image='user.png'; 
                    
                    var v_session_image = $("#session_image").val();
                    var randomNum = Math.ceil(Math.random() * 999999);   
                    
                    
                   
                     if(v_session_image=="")
                        {
                            v_session_image="default.jpg";
                        }
                        else
                        {
                            var doc_file_obj = $("#session_image")[0].files[0];
                            var upload = new ns.Upload(doc_file_obj);
                            doc_file1= doc_file_obj.name;
                            upload.doUpload("../httpdocs/session_upload/session_image_upload.php?random_no="+randomNum);
                            v_session_image=randomNum+'_'+doc_file1;
                        }             
        
                	  
                	  //alert(v_session_image);
                	  
                	  if($.trim(v_sec_unit_id)=="0")
                	  {
                	      v_sec_unit_name="NA";
                	  }
                	  else
                	  {
                	      v_sec_unit_name=v_sec_unit_name;
                	  }
                   
                    console.log("v_category_id:"+v_category_id+"v_category_name:"+v_category_name+",v_item_code:"+v_item_code+",v_item_name:"+v_item_name+",v_unit_id:"+v_unit_id+",v_unit_name:"+v_unit_name+",v_primary_rate_per_unit:"+v_primary_rate_per_unit+",v_tax_id:"+v_tax_id+",v_tax_name:"+v_tax_name+",v_tax_percentage:"+v_tax_percentage+",v_vat_amount:"+v_vat_amount+",v_txt_amount:"+v_txt_amount+",v_txt_precision:"+v_txt_precision+",v_txt_length:"+v_txt_length+",v_txt_width:"+v_txt_width+",v_txt_height:"+v_txt_height+",v_txt_thickness:"+v_txt_thickness+",v_txt_weight:"+v_txt_weight+",v_sec_unit_id:"+v_sec_unit_id+",v_sec_unit_name:"+v_sec_unit_name+",v_total_weight:"+v_total_weight+",v_txt_secondary_rate_per_unit:"+v_txt_secondary_rate_per_unit+",upload_item_image:"+v_session_image);
                    
                   
                  
            
                    if($.trim(v_category_id)=="0"||$.trim(v_category_name)=="Select Category"||$.trim(v_item_code)==""||$.trim(v_item_name)==""||$.trim(v_unit_id)=="0"||$.trim(v_primary_rate_per_unit)==""||$.trim(v_tax_id)=="0"||$.trim(v_tax_percentage)==""||$.trim(txt_precision)=="")
                    
                    {
                        swal("Warning","Please provide all the details ....", "warning");
                        v_btn_store_add.ladda( 'stop' );
                        return false;
                    }
                   
                    else
                    {         
                         $.post("../controller/store/store_controller.php",{action:'add_store_details',category_id:v_category_id,category_name:v_category_name,v_item_code:v_item_code,v_item_name:v_item_name,v_unit_id:v_unit_id,v_unit_name:v_unit_name,v_primary_rate_per_unit:v_primary_rate_per_unit,v_tax_id:v_tax_id,v_tax_name:v_tax_name,v_tax_percentage:v_tax_percentage,v_vat_amount:v_vat_amount,v_txt_amount:v_txt_amount,v_txt_precision:v_txt_precision,v_txt_length:v_txt_length,v_txt_width:v_txt_width,v_txt_height:v_txt_height,v_txt_thickness:v_txt_thickness,v_txt_weight:v_txt_weight,v_sec_unit_id:v_sec_unit_id,v_sec_unit_name:v_sec_unit_name,v_total_weight:v_total_weight,v_txt_secondary_rate_per_unit:v_txt_secondary_rate_per_unit,upload_item_image:v_session_image,square_meter:v_square_meter,cubic_meter:v_cubic_meter }
                                , function(result,status)
                                {
                                   
                                result = $.trim(result);
                               
                                if(result.charAt(0)=='U')
                                {
                                    v_btn_store_add.ladda( 'stop' );
                                    swal("Error", result, "error");
                                    //load_data_to_grid_invoice_list()
                                    clear_text();
                                   

                                
                                }
                                else 
                                {
                                     v_btn_store_add.ladda( 'stop' );
                                    
                                     //swal("Success"," Invoice added Successfully", "success");
                                     $.toast({
                                        heading: 'Success',
                                        text: 'New store details added successfully..!',
                                        showHideTransition: 'slide',
                                        icon: 'success'
                                    });
                                    
                                   
                                    
                                     
                                    
                                    
                                    
                                    
                                     clear_text();
                                    
                                }
                                
                                 
                            
                        });
                        
                       
                        
                     }
                  
                });
            
                
               var drEvent = $('.dropify').dropify();

                drEvent.on('dropify.afterClear', function(event, element){
                    // $("#image_edit").val("");
                });
                      
                 function clear_text()
                 {
                     
                    
                    
                //   $("input:text"). val("") ;
               
                
               load_category_select_box('div_category_select','select_category_name');
               
               load_unit_select_box('div_unit_select','select_primary_unit');
               
               load_tax_select_box('div_tax_select','select_tax_name');
                           
               load_secondary_unit_select_box('div_secondary_unit_select','select_seconadry_unit');
                                     
                

                var imagenUrl = ""; 
                    var drEvent = $('#session_image').dropify(
                    {
                      defaultFile: imagenUrl
                    });
                    drEvent = drEvent.data('dropify');
                    drEvent.resetPreview();
                    drEvent.clearElement();
                    drEvent.settings.defaultFile = imagenUrl;
                    drEvent.destroy();
                    drEvent.init();
                    
                $("#txt_item_name").val("");
                
                $('#mainContainer').find(':input').each(function () {
                    
                  switch (this.type) {
                   
                    case 'text':
                    case 'file':
                        
                    case 'number':
                        $(this).val('');
                        break;
                   
                }
                
                
            });
            
            $('#txt_length,#txt_width,#txt_thickness,#txt_weight,#txt_height,#txt_total_weight,#txt_square_meter,#txt_cubic_meter').val(0);
                   // location.reload(true);
                   
                 }
            
            
               
            $('#list_of_stores tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = store_list_table.row( tr );
         
                if ( row.child.isShown() ) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    // Open this row
                    row.child( format(row.data()) ).show();
                    tr.addClass('shown');
                }
            } );	
                
                
        function format(d)
		{
		
			return '<table style="table-layout: fixed; width: 100%; word-wrap: break-word;">'+
			 '<tr style="background: #989898;color:#ffffff;">'+
			    '<td ><div align="center">Precision % </div></td>'+
				'<td ><div align="center">Length </div></td>'+
				'<td ><div align="center">Width </div></td>'+
				'<td ><div align="center">Height </div></td>'+
				'<td ><div align="center">Thickness </div></td>'+
				'<td ><div align="center">Weight </div></td>'+
				'<td ><div align="center">Units </div></td>'+
				'<td ><div align="center">Total Weight </div></td>'+
				'<td ><div align="center">m<sup>2</sup> </div></td>'+
				'<td ><div align="center">m<sup>3</sup> </div></td>'+
				'<td ><div align="center">Secondary Rate/Unit</div></td>'+
			  '</tr>'+
			  '<tr>'+
				'<td ><div align="center">'+d.precision_percentage+'</div></td>'+
				'<td><div align="center">'+d.length+'</div></td>'+
				'<td><div align="center">'+d.width+' </div></td>'+
				'<td ><div align="center">'+d.height+'</div></td>'+
				'<td><div align="center">'+d.thickness+'</div></td>'+
				'<td><div align="center">'+d.weight+'</div></td>'+
				'<td ><div align="center">'+d.sec_unit_name+'</div></td>'+
				'<td><div align="center">'+d.total_weight+'</div></td>'+
				'<td><div align="center">'+d.square_meter+'</div></td>'+
				'<td><div align="center">'+d.cubic_meter+'</div></td>'+
				'<td ><div align="center">'+d.sec_rate_per_unit+'</div></td>'+
			  '</tr>'+
			 '<tr style="background: #989898;color:#ffffff;">'+
			    
			    '<td colspan="11"><div align="center">Session Image </div></td>'+
			  '</tr>'+
			  '<tr>'+
				
				
				'<td colspan="11"><div align="center"><img src=../../httpdocs/images/session_image/'+$.trim(d.session_image)+' height="200px" width="250px"/></div></td>'+
			  '</tr>'+
			  
			
			  
			'</table>' ;
			
		
		
		}
           
            
            
                function load_data_to_grid_store_details_list()
                 {
                     store_list_table.destroy();
                         
                     store_list_table = $('#list_of_stores').DataTable( {
                            
                             "ajax": {
                                 'type': 'POST',
                                 'url': '../controller/store/store_controller.php',
                                 'data': {
                                    action: 'list_store_details'
                                 }
                             },
                             "language": {
                                 "zeroRecords": "No records available",
                                 "infoEmpty": "No records available",
                              },
                            "order": [[ 0, "desc" ]],
            				"Paginate": true,
            				"bLengthChange": false,
            				"bFilter": false,
            				"bInfo": false,
            				"autoWidth": false,
                            "columns": [
                                  {
                                    "className":  'details-control',
                                    "orderable":  false,
                                    "data":        null,
                                    "defaultContent": '',
                                    "width":'10px'
                                 },
                                 { "data": null},
                                 { "data": "category_id","visible":false },
                                 { "data": "category_name" },
                                 { "data": "item_code"},
                                 { "data": "item_name"},
                                 { "data": "unit_name"},
                                 { "data": "rate_per_unit",className: "text-right"},
                                 { "data": "vat_percentage",className: "text-right"},
                                 { "data": "vat_amount",className: "text-right"},
                                 { "data": "amount",className: "text-right"},
                                 { "data": "category_id",
                                 
                                     render: function ( data, type, rows, meta ) {
            						
            									str_active_status_view = ' <button type="button" class="btn btn-sm primary-gradient mr-1"  id="edit_store" name="edit_store" ><i class="material-icons ">remove_red_eye</i></button>';
            								
            								return str_active_status_view;
            
            							 },
                                     
                                 },
                                 
                                 { "data": "category_id",
                                 
                                     render: function ( data, type, rows, meta ) {
            						
            									str_active_status_delete = ' <button type="button" class="btn btn-sm btn-danger mr-1"  id="delete_store" name="delete_store" ><i class="material-icons ">delete</i></button>';
            								
            								return str_active_status_delete;
            
            							 },
                                     
                                 },
                                
            				// 	 { "data": "contact_address_2"},
                //                  { "data": "state"},
            				// 	 { "data": "city"},
            				// 	 { "data": "fax"},
            				// 	 { "data": "description"},
             
                             ],
                             pageLength: 10,
            				 searching: true,
                             responsive: true,
                             "aoColumnDefs": [
            					{ "bSortable": false, "aTargets": [  0,1,2,3,4,5,6,7] }, 
            					
            				],
                            
            				
                             "initComplete": function( settings, json ) {
                                    
                               
             
                              },
                                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                 $("td:eq(1)", nRow).html(iDisplayIndex + 1);
                                 return nRow;
                              },
                              "drawCallback": function () {
                                    $('.dataTables_paginate > .pagination').addClass('pagination-sm');
                                }
                            
                     });  
                
                 }
                 
            
              
                 
                
                 $('#btn_create_new_store').click(function(){
                     
                  location.reload(true);
                  
                 });
                 
               
                  
                 
                                 
                 $('#list_of_stores tbody').on('click', 'td button', function(){
                     
                        var $row = $(this).closest('tr');
                        var data = store_list_table.row($row).data();
                        
                        v_store_id  = data.store_id;
                    //     $("#div_category_select option:selected").val();
                    // var v_category_name=$("#div_category_select option:selected").text();
                   $("#txt_item_code").val("");
                    $("#txt_item_name").val("");
                    // $("#div_unit_select option:selected").val();
                    // $("#div_unit_select option:selected").text();
                    $("#txt_rate_per_unit").val("");
                    // $("#div_tax_select option:selected").val();
                    // $("#div_tax_select option:selected").text();
                    // v_tax_details.split("-");
                    // v_tax_name=v_tax_details[0];
                    // v_tax_percentage=v_tax_details[1];
                    $("#txt_vat_amount").val("");
                    $("#txt_amount").val("");
                    $("#txt_precision").val("");
                    $("#txt_length").val("");
                    $("#txt_width").val("");
                    $("#txt_height").val("");
                    $("#txt_thickness").val("");
                    $("#txt_weight").val("");
                    // var v_sec_unit_id=$("#div_secondary_unit_select option:selected").val();
                    // var v_sec_unit_name=$("#div_secondary_unit_select option:selected").text();
                    $("#txt_total_weight").val("");
                    $("#txt_secondary_rate_per_unit").val("");
                    
                   
                        $( '#btn_store_add' ).hide();
                        $( '#btn_store_edit' ).show();
                        
                         if($(this).attr("name")=='edit_store')
                         {
                             
            			   edit_data(v_store_id);
                           closeNavR(); 
            			
            			 }
                        
                         if($(this).attr("name")=='delete_store')
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
                                        						
                                        						       delete_store(v_store_id);
                                                     						 
                                        							} else {
                                        							    
                                        							   
                                        							 
                                        							}
                                        						 });
                         }
                         
                         
                       
                     function  edit_data(v_store_id) 
                       {
                           
                        // $("#txt_company_name,#txt_contact_person,#txt_city_name,#txt_state_name,#txt_contact_address_1,#txt_contact_address_2,#txt_company_description,#txt_contact_email,#txt_contact_phone,#txt_fax_number").prop("readonly",false);
                                     
                                     
                        
                     $("#div_category_select").find('option').removeAttr("selected");
                         $('#div_category_select option').map(function () {
                        if ($(this).text() == data.category_name) return this;
                        }).attr('selected', 'selected');
                        
                   $("#txt_item_code").val(data.item_code);
                    $("#txt_item_name").val(data.item_name);
                    
                    $("#div_unit_select").find('option').removeAttr("selected");
                         $('#div_unit_select option').map(function () {
                        if ($(this).text() == data.unit_name) return this;
                        }).attr('selected', 'selected');
                        
                    $("#txt_rate_per_unit").val(data.rate_per_unit);
                    
                     $("#div_tax_select").find('option').removeAttr("selected");
                         $('#div_tax_select option').map(function () {
                        if ($(this).val() == data.vat_id) return this;
                        }).attr('selected', 'selected');
                        
                    
                    $("#txt_vat_amount").val(data.vat_amount);
                    $("#txt_amount").val(data.amount);
                    $("#txt_precision").val(data.precision_percentage);
                    $("#txt_length").val(data.length);
                    $("#txt_width").val(data.width);
                    $("#txt_height").val(data.height);
                    $("#txt_thickness").val(data.thickness);
                    $("#txt_weight").val(data.weight);
                    
                     $("#div_secondary_unit_select").find('option').removeAttr("selected");
                         $('#div_secondary_unit_select option').map(function () {
                        if ($(this).text() == data.sec_unit_name) return this;
                        }).attr('selected', 'selected');
                        
                    $("#txt_total_weight").val(data.total_weight);
                    $("#txt_square_meter").val(data.square_meter);
                    $("#txt_cubic_meter").val(data.cubic_meter);
                    $("#txt_secondary_rate_per_unit").val(data.sec_rate_per_unit);
                    
                     $("#image_name").val(data.session_image);
                     $("#image_edit").val(data.session_image);
             
                    var imagenUrl = "../../httpdocs/images/session_image/"+$.trim(data.session_image); 
                    var drEvent = $('#session_image').dropify(
                    {
                      defaultFile: imagenUrl
                    });
                    drEvent = drEvent.data('dropify');
                    drEvent.resetPreview();
                    drEvent.clearElement();
                    drEvent.settings.defaultFile = imagenUrl;
                    drEvent.destroy();
                    drEvent.init();
                    
                         $('#btn_store_edit' ).show();
                         
                        
                        closeNavR();
                       }  
                        
                 });
                 
                function delete_store(v_store_id)
                    {
                        
                        $.post("../controller/store/store_controller.php",{action:'cancel_store_details',v_store_id:v_store_id}
                                                , function(result,status)
                                                {
                                            //         swal("System is deactivated the company", {
                                    								// title: 'Warning',
                                    								// icon: "warning",
                                    							 // });
                                    							 load_data_to_grid_store_details_list();
                                                    
                         });
                         
                         
                       
                    }
                 
             $('#session_image').change(function(){
                 
                 var doc_file_obj = $("#session_image")[0].files[0];
                            var upload = new ns.Upload(doc_file_obj);
                            doc_file1= doc_file_obj.name;
                            $("#image_edit").val(doc_file1);
                            //alert();
             });
                  
                 
                  v_btn_store_edit.click(function(){
                      
                 
                    var v_category_id=$("#div_category_select option:selected").val();
                    var v_category_name=$("#div_category_select option:selected").text();
                    var v_item_code=$("#txt_item_code").val();
                    var v_item_name=$("#txt_item_name").val();
                    var v_unit_id=$("#div_unit_select option:selected").val();
                    var v_unit_name=$("#div_unit_select option:selected").text();
                    var v_primary_rate_per_unit=$("#txt_rate_per_unit").val();
                    var v_tax_id=$("#div_tax_select option:selected").val();
                    var v_tax_details=$("#div_tax_select option:selected").text();
                    v_tax_details=v_tax_details.split("-");
                    v_tax_name=v_tax_details[0];
                    v_tax_percentage=v_tax_details[1];
                    var v_vat_amount=$("#txt_vat_amount").val();
                    var v_txt_amount=$("#txt_amount").val();
                    var v_txt_precision=$("#txt_precision").val();
                    var v_txt_length=$("#txt_length").val();
                    var v_txt_width=$("#txt_width").val();
                    var v_txt_height=$("#txt_height").val();
                    var v_txt_thickness=$("#txt_thickness").val();
                    var v_txt_weight=$("#txt_weight").val();
                    var v_square_meter=$("#txt_square_meter").val();
                    var v_cubic_meter=$("#txt_cubic_meter").val();
                    var v_sec_unit_id=$("#div_secondary_unit_select option:selected").val();
                    var v_sec_unit_name=$("#div_secondary_unit_select option:selected").text();
                    var v_total_weight=$("#txt_total_weight").val();
                    
                    var v_txt_secondary_rate_per_unit=$("#txt_secondary_rate_per_unit").val();
                    // var v_session_image=$('#my-dropzone').val();
                    
                    // var v_session_image='user.png'; 
                    
                    var image_from_db= $("#image_name").val();
                    
                    var v_session_image = $("#image_edit").val();
                    
                    // var doc_file_obj = $("#session_image")[0].files[0];
                   
                            
                    var randomNum = Math.ceil(Math.random() * 999999);  
                    
                    console.log(v_session_image+"out");
                    
                    
                      if($.trim(v_session_image)!=$.trim(image_from_db))
                    {
                            var doc_file_obj = $("#session_image")[0].files[0];
                            var upload = new ns.Upload(doc_file_obj);
                            doc_file1= doc_file_obj.name;
                            
                            upload.doUpload("../httpdocs/session_upload/session_image_upload.php?random_no="+randomNum);
                            v_session_image=randomNum+'_'+doc_file1;
                    }
                    
                    
                   
                     
                	  
                	  console.log("image_from_db:"+image_from_db+"v_session_image:"+v_session_image);
                	  
                	  if($.trim(v_sec_unit_id)=="0")
                	  {
                	      v_sec_unit_name="NA";
                	  }
                	  else
                	  {
                	      v_sec_unit_name=v_sec_unit_name;
                	  }
                   
                    
                     
                  
            
                    console.log("v_category_id:"+v_category_id+"v_category_name:"+v_category_name+",v_item_code:"+v_item_code+",v_item_name:"+v_item_name+",v_unit_id:"+v_unit_id+",v_unit_name:"+v_unit_name+",v_primary_rate_per_unit:"+v_primary_rate_per_unit+",v_tax_id:"+v_tax_id+",v_tax_name:"+v_tax_name+",v_tax_percentage:"+v_tax_percentage+",v_vat_amount:"+v_vat_amount+",v_txt_amount:"+v_txt_amount+",v_txt_precision:"+v_txt_precision+",v_txt_length:"+v_txt_length+",v_txt_width:"+v_txt_width+",v_txt_height:"+v_txt_height+",v_txt_thickness:"+v_txt_thickness+",v_txt_weight:"+v_txt_weight+",v_sec_unit_id:"+v_sec_unit_id+",v_sec_unit_name:"+v_sec_unit_name+",v_total_weight:"+v_total_weight+",v_txt_secondary_rate_per_unit:"+v_txt_secondary_rate_per_unit+",upload_item_image:"+v_session_image);
                    
                   
                  
            
                    if($.trim(v_category_id)=="0"||$.trim(v_category_name)=="Select Category"||$.trim(v_item_code)==""||$.trim(v_item_name)==""||$.trim(v_unit_id)=="0"||$.trim(v_primary_rate_per_unit)==""||$.trim(v_tax_id)=="0"||$.trim(v_tax_percentage)==""||$.trim(txt_precision)=="")
                    
                    {
                        swal("Warning","Please provide all the details ....", "warning");
                        v_btn_store_edit.ladda( 'stop' );
                        return false;
                    }
                   
                    else
                    {         
                         $.post("../controller/store/store_controller.php",{action:'update_store_details',category_id:v_category_id,category_name:v_category_name,v_item_code:v_item_code,v_item_name:v_item_name,v_unit_id:v_unit_id,v_unit_name:v_unit_name,v_primary_rate_per_unit:v_primary_rate_per_unit,v_tax_id:v_tax_id,v_tax_name:v_tax_name,v_tax_percentage:v_tax_percentage,v_vat_amount:v_vat_amount,v_txt_amount:v_txt_amount,v_txt_precision:v_txt_precision,v_txt_length:v_txt_length,v_txt_width:v_txt_width,v_txt_height:v_txt_height,v_txt_thickness:v_txt_thickness,v_txt_weight:v_txt_weight,v_sec_unit_id:v_sec_unit_id,v_sec_unit_name:v_sec_unit_name,v_total_weight:v_total_weight,v_txt_secondary_rate_per_unit:v_txt_secondary_rate_per_unit,upload_item_image:v_session_image ,v_store_id:v_store_id,square_meter:v_square_meter,cubic_meter:v_cubic_meter }
                                , function(result,status)
                                {
                                   
                                result = $.trim(result);
                               
                                if(result.charAt(0)=='U')
                                {
                                    v_btn_store_edit.ladda( 'stop' );
                                    swal("Error", result, "error");
                                    //load_data_to_grid_invoice_list()
                                    clear_text();
                                   

                                
                                }
                                else 
                                {
                                     v_btn_store_edit.ladda( 'stop' );
                                    
                                     //swal("Success"," Invoice added Successfully", "success");
                                     $.toast({
                                        heading: 'Success',
                                        text: 'Store details updated successfully..!',
                                        showHideTransition: 'slide',
                                        icon: 'success'
                                    });
                                    
                                   
                                    
                                     
                                    
                                    
                                    
                                    
                                     clear_text();
                                    
                                }
                                
                                 
                            
                        });
                        
                       
                        
                     }
                   
                });
                
              
                  
                 
               
                
                  
                 $('#btn_view_list_of_store').click(function(){
                     
                    load_data_to_grid_store_details_list(); 
                     
                 });
                 
                 $('#btn_cancel').click(function(){
                     
                     clear_text();
                     
                 });  
                 
                 
                  

});