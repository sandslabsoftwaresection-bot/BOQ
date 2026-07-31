$(document).ready(function(){
     $('#figures_show').hide();
     hide_sec_details();
          var cubic_meter, square_meter,current_length,current_width,current_thickness,finished_id,v_margin_cost_type,v_margin_cost,prod_rate_unit;
          var  v_labour_cost_type,v_labour_cost,v_service_cost_type,v_service_cost,v_euipment_cost_type,v_euipment_cost,v_other_cost_type,v_other_cost,txt_total_amount_cal,txt_tot_amount;
          var labour_cost_amnt,service_cost_amnt,euipment_cost_amnt,other_cost_amnt,margin_cost_amnt,v_lab_per;
var v_labour_cost_amount,v_service_cost_amount,v_euipment_cost_amount,v_other_cost_amount,v_margin_cost_amount,flag;
         
                var v_btn_item_add = $( '#btn_item_save' ).ladda();
                 var v_btn_product_add = $( '#btn_product_add' ).ladda();

                 var v_btn_product_to_master = $( '#btn_product_to_master' ).ladda();
                  $('#list_of_master_products').addClass('pagination-sm');
                 var master_product_list_table = $('#list_of_master_products').DataTable({searching: false, paging: false, info: false,"ordering": false,"autoWidth": true});
                //  load_data_to_grid_product_details_list();
                //$('#list_of_master_products').removeClass( 'display' ).addClass('table table-striped table-bordered');
                 var master_product_list_table_display = $('#list_of_all_product_item_details').DataTable({searching: false, paging: false, info: false,"ordering": false});
                 var master_product_list_table_secondary = $('#list_of_all_product_item_details_secondary').DataTable({searching: false, paging: false, info: false,"ordering": false});
                
                 var product_item_list_table = $('#list_of_product').DataTable({searching: false, paging: false, info: false,"ordering": false});
                 $('#list_of_stores').addClass('pagination-sm');
                
                var store_list_table = $('#list_of_stores').DataTable( {searching: false, paging: false, info: false,"ordering": false});
                  $('#list_of_stores').removeClass( 'display' ).addClass('table table-striped table-bordered');
                
               
                $('#btn_item_cancel').click(function(){
                
                    clear_text_item();
					$('#txt_rate_unit').val('');
					$('#txt_vat_tot_amount').val('');
					$('#txt_qty_amount').val('');
                    $("#txt_product_code").val("");
                    $("#txt_product_name").val("");
                    $('#select_item_name').children('option').first().prop('selected', true)
                    $('#select_item_name').trigger("chosen:updated");
                                    
                    $('#select_category_name').children('option').first().prop('selected', true)
                    $('#select_category_name').trigger("chosen:updated");
                                    
                });
 
 
                $('#btn_go_to_store').click(function(){
                      
                    var go_to_url="primary_store.php?m=7&sm=1";
                    window.open(go_to_url, '_blank');
                });
 
					$('#txt_required_qty').blur(function(){
                      //alert("blur");
                       var pdt_qty= $("#txt_required_qty").val();
                       //alert(pdt_qty);
                       if(pdt_qty<0)
                       {
                           swal("Value should be greater than 0", {
                                    								title: 'Warning',
                                    								icon: "warning",
                                    							  });
                       }
                        
                  });
				 $("#txt_finished_prd_id").val(0);
				v_btn_product_add.click(function(){
                    
                    v_btn_product_add.ladda( 'start' );
					
					var v_product_name=$("#txt_product_name").val();
					var v_product_ids = $("#txt_finished_prd_id").val();
					
					if(v_product_ids == '0')
					{
					$.post("../controller/product/product_controller.php",{action:'check_product_name',v_product_name:v_product_name}, function(result,status){
	         
							 if($.trim(result)=='1')
							 
							 {
								 $('#txt_product_name').val("");
								 $.toast({
										heading: 'Error,',
										text: 'Invalid Attempt..! This product already exist...',
										position: 'top-center',
										stack: false,
										hideAfter: 6000,
										icon: 'error'
									});
									v_btn_product_add.ladda( 'stop' );
							 }
							 
							 
						
                    else
					{
                    var v_store_id=$("#txt_store_id").val();
                    
                    //var v_product_code=$("#txt_product_code").val();
                    
                    var v_category_id=$("#div_category_select option:selected").val();
                    var v_category_name=$("#div_category_select option:selected").text();
                    
                    var v_item_id=$("#select_item_name").val();
                    var v_item_name=$("#div_item_select option:selected").text();
                    var v_required_qty=$("#txt_required_qty").val();
                    var v_txt_length=$("#txt_length").val();
                    var v_txt_width=$("#txt_width").val();
                    //var v_txt_height=$("#txt_height").val();
                    var v_txt_thickness=$("#txt_thickness").val();
                    var v_txt_weight=$("#txt_weight").val();
                    var v_total_weight=$("#txt_total_weight").val();
                    var v_square_meter=$("#txt_square_meter").val();
                    var v_cubic_meter=$("#txt_cubic_meter").val();
                    var v_units_name=$("#txt_units_name").val();
                    var v_units_id=$("#txt_units_id").val();
                    var v_rate_per_unit=$("#txt_rate_unit").val();
                    var vat_percentage= $("#txt_vat_label").text();
                    var vat_amount= $("#txt_vat_amount").val();              
                    var vat_prct_amount=$("#txt_vat_prct_amount").val();  
                    var sec_unit_id=$("#txt_sec_unit_id").val();
                    var sec_unit_name=$("#txt_sec_unit_name").val();
                    
                    var sec_rate_per_unit=$("#txt_sec_rate_per_unit").val();
                    var total_amt=$("#txt_qty_amount").val();
                    
                   // var v_finished_id=$("#txt_finished_prd_id").val();
                   
                   var sec_total_amt=parseFloat(sec_rate_per_unit)*parseFloat(v_total_weight)+parseFloat(sec_rate_per_unit)*parseFloat(v_square_meter)+parseFloat(sec_rate_per_unit)*parseFloat(v_cubic_meter);
              
                     
                    //var total_amt=(parseFloat(v_rate_per_unit)*parseFloat(v_required_qty))+parseFloat(vat_prct_amount);
                  //  var total_amt=parseFloat(vat_amount)*parseFloat(v_required_qty)+parseFloat(vat_prct_amount);
                    //alert(v_item_id);
                    //console.log("v_company_id:"+v_company_id+"v_company_name:"+v_company_name+",v_project_id:"+v_project_id+",v_project_name:"+v_project_name+",v_product_type:"+v_product_type+",v_product_code:"+v_product_code+",v_product_name:"+v_product_name+",v_category_id:"+v_category_id+",v_category_id:"+v_category_name+",v_item_id:"+v_item_id+",v_item_name:"+v_item_name+",v_required_qty:"+v_required_qty+",v_txt_length:"+v_txt_length+",v_txt_width:"+v_txt_width+",v_txt_height:"+v_txt_height+",v_txt_thickness:"+v_txt_thickness+",v_txt_weight:"+v_txt_weight+",,v_total_weight:"+v_total_weight+",v_square_meter:"+v_square_meter+",v_cubic_meter:"+v_cubic_meter);

					
                    if($.trim(v_product_name)==""||$.trim(v_category_id)=="0"||$.trim(v_category_name)==""||$.trim(v_item_id)=="select"||$.trim(v_item_name)==""||$.trim(v_required_qty)==""||$.trim(total_amt)=="")
                    
                    {
                        swal("Warning","Please provide all the details ....", "warning");
                        v_btn_product_add.ladda( 'stop' );
                        return false;
                    }
					 
                    // else if(v_product_type=="New")
                    // {         
                        
                        $.post("../controller/product/product_controller.php",{action:'add_to_finished_product',v_product_id:v_product_ids,v_product_name:v_product_name,category_id:v_category_id,v_category_name:v_category_name,v_item_id:v_item_id,v_item_name:v_item_name,v_required_qty:v_required_qty,v_txt_length:v_txt_length,v_txt_width:v_txt_width,v_txt_thickness:v_txt_thickness,v_txt_weight:v_txt_weight,v_total_weight:v_total_weight,v_square_meter:v_square_meter,v_cubic_meter:v_cubic_meter,v_units_name:v_units_name,v_units_id:v_units_id,v_rate_per_unit:v_rate_per_unit,v_total_amt:total_amt,v_store_id:v_store_id,vat_percentage:vat_percentage,vat_amount:vat_amount,vat_prct_amount:vat_prct_amount,sec_unit_id:sec_unit_id,sec_unit_name:sec_unit_name,sec_rate_per_unit:sec_rate_per_unit,sec_total_amt:sec_total_amt}
                        , function(result,status)
                                {
                               result = $.trim(result);
								
                                finished_id=result;
                                if(result.charAt(0)=='U')
                                {
                                    v_btn_product_add.ladda( 'stop' );
                                    swal("Error", result, "error");
                                    
                                  // clear_text();
                                   
 
                                
                                }
                                else 
                                {
									
									$("#txt_finished_prd_id").val(finished_id);
                                    v_btn_product_add.ladda( 'stop' );
                                    swal("Success"," Item added Successfully", "success");
                                     clear_text_item();
                                     load_data_to_grid_product_details_list_display(finished_id);
                                     
									 $('#txt_rate_unit').val('');
									 $('#txt_vat_tot_amount').val('');
									 $('#txt_qty_amount').val('');
                                    //alert(finished_id);
                                    
                                    $('#txt_product_code').addClass("disabledbutton");
                                    $('#txt_product_name').addClass("disabledbutton");
                                   
                                    
                                    $('#select_item_name').children('option').first().prop('selected', true)
                                    $('#select_item_name').trigger("chosen:updated");
                                    
                                    $('#select_category_name').children('option').first().prop('selected', true)
                                    $('#select_category_name').trigger("chosen:updated");
                                    
                                   
                                    

                                }
                                
                                 
                            
                        });
					}
					
					});
				} 
					else
					{
						 var v_store_id=$("#txt_store_id").val();
                    
                    //var v_product_code=$("#txt_product_code").val();
                    
                    var v_category_id=$("#div_category_select option:selected").val();
                    var v_category_name=$("#div_category_select option:selected").text();
                    
                    var v_item_id=$("#select_item_name").val();
                    var v_item_name=$("#div_item_select option:selected").text();
                    var v_required_qty=$("#txt_required_qty").val();
                    var v_txt_length=$("#txt_length").val();
                    var v_txt_width=$("#txt_width").val();
                    //var v_txt_height=$("#txt_height").val();
                    var v_txt_thickness=$("#txt_thickness").val();
                    var v_txt_weight=$("#txt_weight").val();
                    var v_total_weight=$("#txt_total_weight").val();
                    var v_square_meter=$("#txt_square_meter").val();
                    var v_cubic_meter=$("#txt_cubic_meter").val();
                    var v_units_name=$("#txt_units_name").val();
                    var v_units_id=$("#txt_units_id").val();
                    var v_rate_per_unit=$("#txt_rate_unit").val();
                    //var vat_percentage= $("#txt_vat_percentage").val();
                    var vat_percentage= $("#txt_vat_label").text();
                    var vat_amount= $("#txt_vat_amount").val();              
                    var vat_prct_amount=$("#txt_vat_prct_amount").val();  
                    var sec_unit_id=$("#txt_sec_unit_id").val();
                    var sec_unit_name=$("#txt_sec_unit_name").val();
                    
                    var sec_rate_per_unit=$("#txt_sec_rate_per_unit").val();
                   // var v_finished_id=$("#txt_finished_prd_id").val();
                   
                   var sec_total_amt=parseFloat(sec_rate_per_unit)*parseFloat(v_total_weight)+parseFloat(sec_rate_per_unit)*parseFloat(v_square_meter)+parseFloat(sec_rate_per_unit)*parseFloat(v_cubic_meter);
              var total_amt=$("#txt_qty_amount").val();
                     
                    //var total_amt=(parseFloat(v_rate_per_unit)*parseFloat(v_required_qty))+parseFloat(vat_prct_amount);
                   // var total_amt=parseFloat(vat_amount)*parseFloat(v_required_qty)+parseFloat(vat_prct_amount);
                    //alert(v_item_id);
                    //console.log("v_company_id:"+v_company_id+"v_company_name:"+v_company_name+",v_project_id:"+v_project_id+",v_project_name:"+v_project_name+",v_product_type:"+v_product_type+",v_product_code:"+v_product_code+",v_product_name:"+v_product_name+",v_category_id:"+v_category_id+",v_category_id:"+v_category_name+",v_item_id:"+v_item_id+",v_item_name:"+v_item_name+",v_required_qty:"+v_required_qty+",v_txt_length:"+v_txt_length+",v_txt_width:"+v_txt_width+",v_txt_height:"+v_txt_height+",v_txt_thickness:"+v_txt_thickness+",v_txt_weight:"+v_txt_weight+",,v_total_weight:"+v_total_weight+",v_square_meter:"+v_square_meter+",v_cubic_meter:"+v_cubic_meter);

					
                    if($.trim(v_product_name)==""||$.trim(v_category_id)=="0"||$.trim(v_category_name)==""||$.trim(v_item_id)=="select"||$.trim(v_item_name)==""||$.trim(v_required_qty)==""||$.trim(total_amt)=="")
                    
                    {
                        swal("Warning","Please provide all the details ....", "warning");
                        v_btn_product_add.ladda( 'stop' );
                        return false;
                    }
					 
                    // else if(v_product_type=="New")
                    // {         
                        
                        $.post("../controller/product/product_controller.php",{action:'add_to_finished_product',v_product_id:v_product_ids,v_product_name:v_product_name,category_id:v_category_id,v_category_name:v_category_name,v_item_id:v_item_id,v_item_name:v_item_name,v_required_qty:v_required_qty,v_txt_length:v_txt_length,v_txt_width:v_txt_width,v_txt_thickness:v_txt_thickness,v_txt_weight:v_txt_weight,v_total_weight:v_total_weight,v_square_meter:v_square_meter,v_cubic_meter:v_cubic_meter,v_units_name:v_units_name,v_units_id:v_units_id,v_rate_per_unit:v_rate_per_unit,v_total_amt:total_amt,v_store_id:v_store_id,vat_percentage:vat_percentage,vat_amount:vat_amount,vat_prct_amount:vat_prct_amount,sec_unit_id:sec_unit_id,sec_unit_name:sec_unit_name,sec_rate_per_unit:sec_rate_per_unit,sec_total_amt:sec_total_amt}
                        , function(result,status)
                                {
                                  // console.log(result); 
                                 // alert(result); 
                                 // var obj= jQuery.parseJSON(result);

                                // finished_id=obj.data[0].finished_product_id;
                             
                                result = $.trim(result);
								
                                finished_id=result;
                                if(result.charAt(0)=='U')
                                {
                                    v_btn_product_add.ladda( 'stop' );
                                    swal("Error", result, "error");
                                    
                                  // clear_text();
                                   

                                
                                }
                                else 
                                {
									//alert(finished_id);
									$("#txt_finished_prd_id").val(finished_id);
                                    v_btn_product_add.ladda( 'stop' );
                                    swal("Success"," Item added Successfully", "success");
                                     clear_text_item();
                                     load_data_to_grid_product_details_list_display(finished_id);
                                     
									 $('#txt_rate_unit').val('');
									 $('#txt_vat_tot_amount').val('');
									 $('#txt_qty_amount').val('');
                                    //alert(finished_id);
                                    
                                    $('#txt_product_code').addClass("disabledbutton");
                                    $('#txt_product_name').addClass("disabledbutton");
                                //   $("#div_company_select").addClass("disabledbutton");
                                //     $("#select_project_name_chosen").addClass("disabledbutton");
                                //     $("#div_type_select").addClass("disabledbutton");
                                    
                                    
                                    $('#select_item_name').children('option').first().prop('selected', true)
                                    $('#select_item_name').trigger("chosen:updated");
                                    
                                    $('#select_category_name').children('option').first().prop('selected', true)
                                    $('#select_category_name').trigger("chosen:updated");
                                    
                                   
                                    

                                }
                                
                                 
                            
                        });
					}					
             });  
				 
				   
                      
        function reinitialize_to_zero(){
          var current_length=$('#text_length').val();
          var current_width=$('#text_width').val();
          var current_thickness=$('#text_thickness').val();
          var current_weight=$('#text_weight').val();
          var current_height=$('#text_height').val();
         if(current_length == "")
            {
                $('#text_length').val(0);
            }
            if(current_width == "")
            {
                $('#text_width').val(0);
            }
            if(current_thickness == "")
            {
                $('#text_thickness').val(0);
            }
            if(current_weight == "")
            {
                $('#text_weight').val(0);
            }
            if(current_height == "")
            {
                $('#text_height').val(0);
            } 
      }

        function change_length() {
           reinitialize_to_zero();
            if($("#div_secondary_unit_select option:selected").text()=='Kg' )
            {
                var tot_weight=parseFloat($('#text_length').val())*parseFloat($('#text_weight').val());
                
                $('#div_total_weight_modal').show();
                $('#text_total_weight').val(tot_weight.toFixed(3));
                
                var secamount=parseFloat(tot_weight)*parseFloat($('#text_secondary_rate_per_unit').val());
                $('#text_secondary_amount').val(secamount.toFixed(3));
            }
            else if ($("#div_secondary_unit_select option:selected").text()=='M2')
            {
                var square_meter=parseFloat($('#text_length').val())*parseFloat($('#text_width').val());
                 $('#div_square_meter_modal').show();
                 $('#text_square_meter').val(square_meter.toFixed(3));
                 var secamount=parseFloat(square_meter)*parseFloat($('#text_secondary_rate_per_unit').val());
                $('#text_secondary_amount').val(secamount.toFixed(3));
            }
            else if ($("#div_secondary_unit_select option:selected").text()=='M3')
            {
                var cubic_meter=parseFloat($('#text_length').val())*parseFloat($('#text_width').val())*parseFloat($('#text_thickness').val());
                $('#div_cubic_meter_modal').show();
                 $('#text_cubic_meter').val(cubic_meter.toFixed(3));
                  var secamount=parseFloat(cubic_meter)*parseFloat($('#text_secondary_rate_per_unit').val());
                $('#text_secondary_amount').val(secamount.toFixed(3));
            }
            
            else
            {
                $('#text_total_weight').val(0);
                $('#text_square_meter').val(0);
                $('#text_cubic_meter').val(0);
                 $('#div_total_weight_modal, #div_square_meter_modal, #div_cubic_meter_modal').hide();
            }
       }
       
        function change_width() {
           reinitialize_to_zero();
            if($("#div_secondary_unit_select option:selected").text()=='M2' )
            {
               var square_meter=parseFloat($('#text_length').val())*parseFloat($('#text_width').val());
               $('#div_square_meter_modal').show();
                $('#text_square_meter').val(square_meter.toFixed(3));
                var secamount=parseFloat(square_meter)*parseFloat($('#text_secondary_rate_per_unit').val());
                $('#text_secondary_amount').val(secamount.toFixed(3));
                
            }
          else  if( $("#div_secondary_unit_select option:selected").text()=='M3')
            {
              
                var cubic_meter=parseFloat($('#text_length').val())*parseFloat($('#text_width').val())*parseFloat($('#text_thickness').val());
                $('#div_cubic_meter_modal').show();
                $('#text_cubic_meter').val(cubic_meter.toFixed(3)); 
                var secamount=parseFloat(cubic_meter)*parseFloat($('#text_secondary_rate_per_unit').val());
                $('#text_secondary_amount').val(secamount.toFixed(3));
            }
            else
            {
                $('#div_cubic_meter_modal').hide();
                $('#text_cubic_meter').val(0);
            }
           
            
       }
       
        function change_thickness() {
           reinitialize_to_zero();
          if($("#div_secondary_unit_select option:selected").text()=='M3' )
            {
            var cubic_meter=parseFloat($('#text_length').val())*parseFloat($('#text_width').val())*parseFloat($('#text_thickness').val());
            $('#div_cubic_meter_modal').show();
            $('#text_cubic_meter').val(cubic_meter);
            
            var secamount=parseFloat(cubic_meter)*parseFloat($('#text_secondary_rate_per_unit').val());
            $('#text_secondary_amount').val(secamount.toFixed(3));
            
            }
            else
            {
                $('#div_cubic_meter_modal').hide();
                 $('#text_cubic_meter').val(0);
            }
       }
       
        function change_weight(){
           reinitialize_to_zero();
           if($("#div_secondary_unit_select option:selected").text()=='Kg' )
            {
           var tot_weight=parseFloat($('#text_length').val())*parseFloat($('#text_weight').val());
           $('#div_total_weight_modal').show();
            $('#text_total_weight').val(tot_weight);
            
            var secamount=parseFloat(tot_weight)*parseFloat($('#txt_secondary_rate_per_unit').val());
                $('#text_secondary_amount').val(secamount.toFixed(3));
            }
       }
        
        $('#text_length').change(function (e) {
               reinitialize_to_zero();
               change_length();
           });
        $('#text_width').change(function (e) {
               reinitialize_to_zero();
               change_width();
           });
        $('#text_thickness').change(function (e) {
               reinitialize_to_zero();
               change_thickness();
           });
        $('#text_weight').change(function (e) {
               reinitialize_to_zero();
               change_weight();
           });
        $('#text_secondary_rate_per_unit').change(function (e) {
              if($('#text_secondary_rate_per_unit').val()=='')
              {
                  $('#text_secondary_rate_per_unit').val(0.000);
                  $('#text_secondary_amount').val(0.000);
              }
              else
              {
                    var v_sec_unit_id=$("#div_secondary_unit_select option:selected").val();
                    var v_sec_unit_name=$("#div_secondary_unit_select option:selected").text();
                switch(v_sec_unit_name)
                {
                    case 'Kg':
                        
                        var secamount=parseFloat($('#text_total_weight').val())*parseFloat($('#text_secondary_rate_per_unit').val());
                        $('#text_secondary_amount').val(secamount.toFixed(3));
                       
                    break;
                    case 'M2':
                        
                       var secamount=parseFloat($('#text_square_meter').val())*parseFloat($('#text_secondary_rate_per_unit').val());
                        $('#text_secondary_amount').val(secamount.toFixed(3));
                        
                    break;
                    case 'M3':
                       
                        var secamount=parseFloat($('#text_cubic_meter').val())*parseFloat($('#text_secondary_rate_per_unit').val());
                        $('#text_secondary_amount').val(secamount.toFixed(3));
                       
                    break;
                    default:
                     $('#text_secondary_amount').val(0.000);
                    break;
                }
              }
           });
        
        function calculate_total_weight() {
             current_length=$('#txt_length').val();
             current_width=$('#txt_width').val();
             current_thickness=$('#txt_thickness').val();
            var current_weight=$('#txt_weight').val();
            var current_height=$('#txt_height').val();
           console.log("Value:"+isNaN(current_length));
          
            
            console.log("L:"+current_length+"W:"+current_width+"TH:"+current_thickness+"Wt:"+current_weight);
            console.log("parse"+parseFloat($('#txt_length').val())+"parse:"+parseFloat($('#txt_width').val()));
             if( parseFloat($('#txt_length').val()) > "0"  || parseFloat($('#txt_width').val()) > "0"  || parseFloat($('#txt_thickness').val())> "0"  || parseFloat($('#txt_weight').val()) > "0"  ) 
            {
                
                // var tot_weight=parseFloat(current_length)*parseFloat(current_width)*parseFloat(current_thickness)*parseFloat(current_weight);
                var tot_weight=parseFloat(current_length)*parseFloat(current_weight);
                console.log(tot_weight);
                $('#txt_total_weight').val(tot_weight);
            }
            else
            {
                $('#txt_total_weight').val(0);
            }
            
            if( parseFloat($('#txt_length').val()) > "0"  && parseFloat($('#txt_width').val())>"0" && parseFloat($('#txt_thickness').val())=="0") 
            {
             square_meter=parseFloat(current_length)*parseFloat(current_width);
           
            console.log(square_meter);
            
            $('#txt_square_meter').val(square_meter);
               
            }
            else
            {
             $('#txt_square_meter').val(0);
             
            }
            
            
            if( parseFloat($('#txt_length').val()) > "0"  || parseFloat($('#txt_width').val())>"0" || parseFloat($('#txt_height').val())>"0" ) 
            {
            //var cubic_meter=parseFloat(current_length)*parseFloat(current_width)*parseFloat(current_height);
            cubic_meter=parseFloat(current_length)*parseFloat(current_width)*parseFloat(current_thickness);
            console.log(cubic_meter);
            $('#txt_cubic_meter').val(cubic_meter);
               
            }
            else
            {
             $('#txt_cubic_meter').val(0);
            }
            
            
       }

              
        $('#txt_thickness1').change(function (e) {
           
                    current_length=$('#txt_length').val();
                    current_width=$('#txt_width').val();
                    current_thickness=$('#txt_thickness').val();
                    if(parseFloat($('#txt_length').val()) > "0"  && parseFloat($('#txt_width').val())>"0" && parseFloat($('#txt_thickness').val())>"0")
                   
                   {
                       cubic_meter=parseFloat(current_length)*parseFloat(current_width)*parseFloat(current_thickness);
                    $("#txt_cubic_meter").val(cubic_meter);
                     $('#txt_square_meter').val(0);
                   }
                   else
                    {
                         $('#txt_cubic_meter').val(0);
                    }

              });
              
        $('#txt_item_code').change(function (e) {
           
                  var v_item_code=$("#txt_item_code").val(); 
                  $.post("../controller/store/store_controller.php",{action:'item_code_check',v_item_code:v_item_code}
                    , function(result,status)
                            {
                                    //alert(result);
                                if(result==1)
                                {
                                    swal("Warning","Item code already exist ....", "warning");
                                    $("#txt_item_code").val("");
                                }
                        
                    });
              }); 
        
        $('#txt_rate_per_unitt').change(function (e) {
                    $('#txt_vat_amountt').val("");
                    $("#txt_amount").val("");
                });
                
        var vat,v_primary_rate_per_unit,txt_vat_amount;
        $("#txt_rate_per_unitt").change(function() {
                    v_primary_rate_per_unit=$("#txt_rate_per_unitt").val();
				    vat = $("#txt_vat_perc").val();
				
                    txt_vat_amount=v_primary_rate_per_unit * (parseFloat(vat)/100);
                    $('#txt_vat_amountt').val((txt_vat_amount.toFixed(3)));
                    var total_amount=(parseFloat($('#txt_vat_amountt').val())+parseFloat($("#txt_rate_per_unitt").val()));
                    $("#txt_amount").val((total_amount.toFixed(3)));
                
                });
                
        $("#txt_vat_perc").change(function() { 
				  vat = $(this).val(); 
				  v_primary_rate_per_unit=$("#txt_rate_per_unitt").val();
					txt_vat_amount=v_primary_rate_per_unit * (parseFloat(vat)/100);
                    $('#txt_vat_amountt').val((txt_vat_amount.toFixed(3)));
                    var total_amount=(parseFloat($('#txt_vat_amountt').val())+parseFloat($("#txt_rate_per_unitt").val()));
                    $("#txt_amount").val((total_amount.toFixed(3)));
			    }); 
                

        $("#btn_add_item").click(function(){ 
                    var category = $('#select_category_name').val();
                    var categoryname = $('#select_category_name option:selected').text();
                    console.log(categoryname);
                    
                    if(category === '0'){
                        swal("Warning","Please select Category....", "warning");
                        return false;
                    }else
                    {
                        $('#modal_add_item').modal('show'); 
                        $('#txt_category_name').val(categoryname).prop('disabled', true);
                        $('#txt_category_name').css('font-weight', 'bold');
                        $('#txt_category_val').val(category);
                        load_category_select_box('div_categoryy_select','select_category_name');
                        load_unit_select_box('div_primary_unit_select','select_primary_unit');
                        load_secondary_unit_select_box('div_secondary_unit_select','select_seconadry_unit');
                        $('#div_length_modal, #div_width_modal, #div_thickness_modal, #div_weight_modal, #div_height, #div_total_weight_modal, #div_square_meter_modal, #div_cubic_meter_modal').hide();
                        $('#txt_secondary_rate_per_unit').val(0.000);
                        $('#txt_secondary_amount').val(0.000);
                    }
                });
                
        function load_category_select_box(div_name,ctrl_name){ 
                    $("#"+div_name).load("../controller/store/store_controller.php",{action:'list_category',v_ctrl_name:ctrl_name},function(result,status){});
                }
                        
        function load_unit_select_box(div_name,ctrl_name){ 
                    $("#"+div_name).load("../controller/store/store_controller.php",{action:'list_units',v_ctrl_name:ctrl_name},function(result,status){});
                } 
                
        function load_secondary_unit_select_box(div_name,ctrl_name){ 
                    $("#"+div_name).load("../controller/store/store_controller.php",{action:'list_secondary_unit',v_ctrl_name:ctrl_name},function(result,status){});
                }  
                
        $('#div_secondary_unit_select').change(function (e) {
                    var v_sec_unit_id=$("#div_secondary_unit_select option:selected").val();
                    var v_sec_unit_name=$("#div_secondary_unit_select option:selected").text();
                    var sec_unit_rate=$('#txt_secondary_rate_per_unit').val();
                    if(sec_unit_rate=='')
                    {
                       sec_unit_rate=0; 
                    }
                   
                    switch(v_sec_unit_name)
                    {
                        case 'Kg':
                            $('#txt_width, #txt_thickness, #txt_height, #txt_square_meter, #txt_cubic_meter').val(0);
                            var tot_weight=parseFloat($('#txt_length').val())*parseFloat($('#txt_weight').val());
                            $('#txt_total_weight').val(tot_weight.toFixed(3));
                            $('#div_width_modal, #div_thickness_modal, #div_height, #div_square_meter_modal, #div_cubic_meter_modal').hide();
                            $('#div_length_modal, #div_weight_modal, #div_total_weight_modal').show();
                            
                            var secamount=parseFloat(tot_weight)*parseFloat(sec_unit_rate);
                            $('#txt_secondary_amount').val(secamount.toFixed(3));
                        break;
                        case 'M2':
                            $('#txt_thickness, #txt_weight, #txt_height, #txt_total_weight, #txt_cubic_meter').val(0);
                           var square_meter=parseFloat($('#txt_length').val())*parseFloat($('#txt_width').val());
                            $('#txt_square_meter').val(square_meter.toFixed(3));
                            $('#div_thickness_modal, #div_weight_modal, #div_height, #div_total_weight_modal, #div_cubic_meter_modal').hide();
                            $('#div_width_modal, #div_length_modal, #div_square_meter_modal').show();
                            
                            var secamount=parseFloat(square_meter)*parseFloat(sec_unit_rate);
                            $('#txt_secondary_amount').val(secamount.toFixed(3));
                        break;
                        case 'M3':
                            $('#txt_weight, #txt_height, #txt_total_weight, #txt_square_meter').val(0);
                            var cubic_meter=parseFloat($('#txt_length').val())*parseFloat($('#txt_width').val())*parseFloat($('#txt_thickness').val());
                            $('#txt_cubic_meter').val(cubic_meter.toFixed(3));
                            $('#div_weight_modal, #div_height, #div_total_weight_modal, #div_square_meter_modal').hide();
                            $('#div_length_modal, #div_width_modal, #div_thickness_modal, #div_cubic_meter_modal').show();
                            
                            var secamount=parseFloat(cubic_meter)*parseFloat(sec_unit_rate);
                            $('#txt_secondary_amount').val(secamount.toFixed(3));
                        break;
                        default:
                         $('#txt_length, #txt_width, #txt_thickness, #txt_weight, #txt_height, #txt_total_weight, #txt_square_meter, #txt_cubic_meter').val(0);
                         $('#div_length_modal, #div_width_modal, #div_thickness_modal, #div_weight_modal, #div_height, #div_total_weight_modal, #div_square_meter_modal, #div_cubic_meter_modal').hide();
                         $('#txt_secondary_amount').val(0.000);
                        break;
                    }
                  
                });
                
        v_btn_item_add.click(function(){
                    v_btn_item_add.ladda( 'start' );
                    var v_item_name=$("#txt_item_name").val();
					$.post("../controller/store/store_controller.php",{action:'check_item_name',item_name:v_item_name}, function(result,status){
	                    if($.trim(result)=='1'){
						    $('#txt_item_name').val("");
							$.toast({
									heading: 'Error,',
									text: 'Invalid Attempt..! This item already exist...',
									position: 'top-center',
									stack: false,
									hideAfter: 6000,
									icon: 'error'
							});
							v_btn_item_add.ladda( 'stop' ); 
						}
						else {
                            var v_category_id=$("#txt_category_val").val();
                            var v_category_name=$("#txt_category_name").val();
                            var v_unit_id=$("#div_primary_unit_select option:selected").val();
                            var v_unit_name=$("#div_primary_unit_select option:selected").text();
                            var v_primary_rate_per_unit=$("#txt_rate_per_unitt").val();
        					var v_tax_percentage = $("#txt_vat_perc").val();
                            var v_vat_amount=$("#txt_vat_amountt").val();
                            var v_txt_amount=$("#txt_amount").val();
                            var v_txt_precision=$("#txt_precision").val();
                            var v_txt_length=$("#text_length").val();
                            var v_txt_width=$("#text_width").val();
                            var v_txt_height=$("#text_height").val();
                            var v_txt_thickness=$("#text_thickness").val();
                            var v_txt_weight=$("#text_weight").val();
                            var v_sec_unit_id=$("#div_secondary_unit_select option:selected").val();
                            var v_sec_unit_name=$("#div_secondary_unit_select option:selected").text();
                            var v_total_weight=$("#text_total_weight").val();
                            var v_square_meter=$("#text_square_meter").val();
                            var v_cubic_meter=$("#text_cubic_meter").val();
                            var v_txt_secondary_rate_per_unit=$("#text_secondary_rate_per_unit").val();
                            var v_session_image = $("#session_image").val();
                            var randomNum = Math.ceil(Math.random() * 999999); 
                            
                            console.log('v_category_id',v_category_id);
                            console.log('v_category_name',v_category_name);
                            console.log('v_unit_id',v_unit_id);
                            console.log('v_unit_name',v_unit_name);
                            console.log('v_primary_rate_per_unit',v_primary_rate_per_unit);
                            console.log('v_tax_percentage',v_tax_percentage);
                            console.log('v_vat_amount',v_vat_amount);
                            console.log('v_txt_precision',v_txt_precision);
                            console.log('v_txt_length',v_txt_length);
                            console.log('v_txt_width',v_txt_width);
                            console.log('v_txt_height',v_txt_height);
                            console.log('v_txt_thickness',v_txt_thickness);
                            console.log('v_txt_weight',v_txt_weight);
                            console.log('v_sec_unit_id',v_sec_unit_id);
                            console.log('v_sec_unit_name',v_sec_unit_name);
                            console.log('v_total_weight',v_total_weight);
                            console.log('v_square_meter',v_square_meter);
                            console.log('v_cubic_meter',v_cubic_meter);
                            console.log('v_txt_secondary_rate_per_unit',v_txt_secondary_rate_per_unit);
                            console.log('v_session_image',v_session_image);
                            console.log('randomNum',randomNum);
       
                            
                            if(v_session_image=="") 
                                {
                                    v_session_image="default.jpg";
                                }
                                else
                                {
        							v_session_image="default.jpg";
                                }             
                        	  
                        	if($.trim(v_sec_unit_id)=="0")
                        	  {
                        	      v_sec_unit_name="NA";
                        	  }
                        	  else
                        	  {
                        	      v_sec_unit_name=v_sec_unit_name;
                        	  }
        
                            if($.trim(v_category_id)=="0"||$.trim(v_category_name)=="Select Category"||$.trim(v_item_name)==""||$.trim(v_unit_id)=="0"||$.trim(v_primary_rate_per_unit)==""||$.trim(txt_precision)=="")
                            {
                                swal("Warning","Please provide all the details ....", "warning");
                                v_btn_item_add.ladda( 'stop' );
                                return false;
                            }
                            else
                            {         
                                $.post("../controller/store/store_controller.php",{action:'add_store_details',category_id:v_category_id,category_name:v_category_name,v_item_name:v_item_name,v_unit_id:v_unit_id,v_unit_name:v_unit_name,v_primary_rate_per_unit:v_primary_rate_per_unit,v_tax_percentage:v_tax_percentage,v_vat_amount:v_vat_amount,v_txt_amount:v_txt_amount,v_txt_precision:v_txt_precision,v_txt_length:v_txt_length,v_txt_width:v_txt_width,v_txt_height:v_txt_height,v_txt_thickness:v_txt_thickness,v_txt_weight:v_txt_weight,v_sec_unit_id:v_sec_unit_id,v_sec_unit_name:v_sec_unit_name,v_total_weight:v_total_weight,v_txt_secondary_rate_per_unit:v_txt_secondary_rate_per_unit,upload_item_image:v_session_image,square_meter:v_square_meter,cubic_meter:v_cubic_meter }, 
                                function(result,status)
                                    {
                                       
                                    result = $.trim(result);
                                   
                                    if(result.charAt(0)=='U')
                                    {
                                        v_btn_item_add.ladda( 'stop' );
                                        swal("Error", result, "error");
                                        clear_text();
                                    }
                                    else 
                                    {
                                        v_btn_item_add.ladda( 'stop' );
                                        $.toast({
                                            heading: 'Success',
                                            text: 'New Item added successfully..!',
                                            showHideTransition: 'slide',
                                            icon: 'success'
                                        });
                                        $('#modal_add_item').modal('hide'); 
                                        clearModalFields();
                                        var v_category_id=$("#div_category_select option:selected").val();
                                        $('#div_item_select').load('templates/item_combo.php?v_category_id='+v_category_id);
                                        //  clear_text();
                                    }
                                });
                            }
				        }
			        });
                });
                
        function clearModalFields() {
                    // Clear all text inputs
                    $('#modal_add_item input[type="text"], #modal_add_item input[type="number"]').val('');
                    
                    // Clear all select elements
                    $('#modal_add_item select').prop('selectedIndex', 0);
                    
                    // Clear hidden fields
                    $('#modal_add_item input[type="hidden"]').val('');
                }
                
             
                
                
                
                
                
                
                
                
                function load_data_to_grid_product_details_list_display(finished_id)
                 {
                    
                     product_item_list_table.destroy();
                         
                     product_item_list_table = $('#list_of_product').DataTable( {
                            
                             "ajax": {
                                 'type': 'POST',
                                 'url': '../controller/product/product_controller.php',
                                 'data': {
                                    action: 'list_product_details_display',
                                    v_finished_id_last:finished_id
                                    
                                 }
                                 
                             },
                              "select": {
                                style: 'multi'
                             },
                             "language": {
                                 "zeroRecords": "No records available",
                                 "infoEmpty": "No records available",
                              },
                            "order": [[ 1, "desc" ]],
            				"bPaginate": false,
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
                                { "data": null },
                                 
                                
                                 { "data": "category_name"},
                                 { "data": "item_name"},
            					 { "data": "quantity",className: "text-center"},
                                 { "data": "units",className: "text-center"},
            					 { "data": "rate_per_unit",className: "text-right"},
            					 { "data": "vat_percentage",className: "text-center"},
            				 	 { "data": "total_weight",className: "text-right"},
            					 { "data": "square_meter",className: "text-right"},
            					 { "data": "cubic_meter",className: "text-right"},
            					 { "data": "total_amount",className: "text-right"},
            					 
            					 { "data": "master_finished_product_id",
                                 
                                     render: function ( data, type, rows, meta ) {
            						
            									str_active_status_delete = ' <button type="button" class="btn btn-sm btn-danger mr-1"  id="delete_product" name="delete_product" ><i class="material-icons ">delete</i></button>';
            								
            								return str_active_status_delete;
            
            							 }
                                     
                                 },
                                 
                             ],
                              "footerCallback": function ( row, data, start, end, display ) {
                                            var api = this.api(), data;
                                 
                                            // Remove the formatting to get integer data for summation
                                            var intVal = function ( i ) {
                                                return typeof i === 'string' ?
                                                    i.replace(/[\$,]/g, '')*1 :
                                                    typeof i === 'number' ?
                                                        i : 0;
                                            };
                                 
                                            // Total over all pages
                                            total = api
                                                .column( 8 )
                                                .data()
                                                .reduce( function (a, b) {
                                                    return intVal(a) + intVal(b);
                                                }, 0 );
                                 
                                            // Total over this page
                                            pageTotal = api
                                                .column( 8, { page: 'current'} )
                                                .data()
                                                .reduce( function (a, b) {
                                                    return intVal(a) + intVal(b);
                                                }, 0 );
                                 
                                            // Update footer
                                                $( api.column( 8 ).footer() ).html(
                                                    $.fn.dataTable.render.number(',', '.', 3, '').display( pageTotal )
                                                );
                                                
                                                // Total over all pages
                                            total = api
                                                .column( 9 )
                                                .data()
                                                .reduce( function (a, b) {
                                                    return intVal(a) + intVal(b);
                                                }, 0 );
                                 
                                            // Total over this page
                                            pageTotal = api
                                                .column( 9, { page: 'current'} )
                                                .data()
                                                .reduce( function (a, b) {
                                                    return intVal(a) + intVal(b);
                                                }, 0 );
                                 
                                            // Update footer
                                                $( api.column( 9 ).footer() ).html(
                                                    $.fn.dataTable.render.number(',', '.', 3, '').display( pageTotal )
                                                );
                                                // Total over all pages
                                            total = api
                                                .column( 10 )
                                                .data()
                                                .reduce( function (a, b) {
                                                    return intVal(a) + intVal(b);
                                                }, 0 );
                                 
                                            // Total over this page
                                            pageTotal = api
                                                .column( 10, { page: 'current'} )
                                                .data()
                                                .reduce( function (a, b) {
                                                    return intVal(a) + intVal(b);
                                                }, 0 );
                                 
                                            // Update footer
                                                $( api.column( 10 ).footer() ).html(
                                                    $.fn.dataTable.render.number(',', '.', 3, '').display( pageTotal )
                                                );
                                                // Total over all pages
                                            total = api
                                                .column( 11 )
                                                .data()
                                                .reduce( function (a, b) {
                                                    return intVal(a) + intVal(b);
                                                }, 0 );
                                 
                                            // Total over this page
                                            pageTotal = api
                                                .column( 11, { page: 'current'} )
                                                .data()
                                                .reduce( function (a, b) {
                                                    return intVal(a) + intVal(b);
                                                }, 0 );
                                            $('#txt_total').val(pageTotal);
                                            // Update footer
                                                $( api.column( 11 ).footer() ).html(
                                                    $.fn.dataTable.render.number(',', '.', 3, '').display( pageTotal )
                                                  
                                                );
                                                            },
                             
                             pageLength: 50,
            				 searching: false,
                            
                             "aoColumnDefs": [
            					{ "bSortable": false, "aTargets": [  0,1,2,3,4,5,6,7,8,9] }, 
            					
            				],
                            
                                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                 $("td:eq(1)", nRow).html(iDisplayIndex + 1);
                                 return nRow;
                              },
                            
                                    
                     });  
                
                 }
                 
             $('#list_of_product tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = product_item_list_table.row( tr );
         
                if ( row.child.isShown() ) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    // Open this row
                    row.child( format_prod(row.data()) ).show();
                    tr.addClass('shown');
                }
            });	
            
            
            function format_prod(d)
		{
		
			return '<table style="table-layout: fixed; width: 100%; word-wrap: break-word;">'+
			 '<tr style="background: #989898;color:#ffffff;">'+
			    
				'<td ><div align="center">Length </div></td>'+
				'<td ><div align="center">Width </div></td>'+
				
				'<td ><div align="center">Thickness </div></td>'+
				'<td ><div align="center">Weight </div></td>'+
				
			  '</tr>'+
			  '<tr>'+
				
				'<td><div align="center">'+d.length+'</div></td>'+
				'<td><div align="center">'+d.width+' </div></td>'+
			
				'<td><div align="center">'+d.thickness+'</div></td>'+
				'<td><div align="center">'+d.weight+'</div></td>'+
				
			  '</tr>'+
			'</table>' ;
			
		
		
	}
                  $('#list_of_product tbody').on('click', 'td button', function(){
                     
                        var $row = $(this).closest('tr');
                        var data = product_item_list_table.row($row).data();
                        
                        v_product_id  = data.master_product_item_id;
        
                         if($(this).attr("name")=='delete_product')
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
                                        						
                                        						       delete_product(v_product_id);
                                                     						 
                                        							} else {
                                        							    
                                        							   
                                        							 
                                        							}
                                        						 });
                         }
                         
                         
                       
                   
                 
                function delete_product(v_product_id)
                    {
                        
                        $.post("../controller/product/product_controller.php",{action:'cancel_product_details',v_master_product_id:v_product_id}
                                                , function(result,status)
                                                {
                                                   // alert(result);
                                                    //console.log(result);
                                    							 load_data_to_grid_product_details_list_display(finished_id);
                                                    
                         });
                         
                         
                       
                    }
                 
                 }); 
                 
                        
  

           
                
                
                 $("#div_category_select").change(function() {
                     
                        var v_category_id=$("#div_category_select option:selected").val();
                        
                    
                     $('#div_item_select').load('templates/item_combo.php?v_category_id='+v_category_id);
                     
                        // $("#div_item_select").load("../controller/product/product_controller.php",{action:'list_items',v_ctrl_name:"select_item_name",category_id:v_category_id},function(result,status){});
                
                });
                
              
              
              $("#div_item_select").change(function() {
                   
                  var store_id=$("#div_item_select option:selected").val();
                    $("#txt_store_id").val(store_id);
                   
                  $.post("../controller/product/product_controller.php",{action:'list_secondary_details',v_store_id:store_id }
                                , function(result,status)
                                {
                                    //alert(result);
                                    var obj= jQuery.parseJSON(result);
                                    $("#txt_length").val(obj.data[0].length);
                                    len=obj.data[0].length;
                                    $("#txt_width").val(obj.data[0].width);
                                    wid=obj.data[0].width;
                                    $("#txt_height").val(obj.data[0].height);
                                    hght=obj.data[0].height;
                                    $("#txt_thickness").val(obj.data[0].thickness);
                                    thick=obj.data[0].thickness;
                                    $("#txt_weight").val(obj.data[0].weight);
                                    wght=obj.data[0].weight;
                                     $("#txt_square_meter").val(obj.data[0].square_meter);
                                      $("#txt_cubic_meter").val(obj.data[0].cubic_meter);
                                       $("#txt_total_weight").val(obj.data[0].total_weight);
                                     $("#txt_units_name").val(obj.data[0].unit_name);
                                    
                                     $("#txt_units_id").val(obj.data[0].unit_id);
                                    
                                     
                                     var rt=parseFloat(obj.data[0].rate_per_unit);
									 $("#txt_rate_unit").val(rt.toFixed(3));
									 var vattotamt=parseFloat(obj.data[0].amount);
                                     $("#txt_vat_tot_amount").val(vattotamt.toFixed(3));
									 
									 var vatPercentage = parseFloat(obj.data[0].vat_percentage); // Convert to a floating-point number
									 var vatPercentageAsInt = parseInt(vatPercentage, 10); // Convert to an integer with base 10
									 $('#txt_vat_label').html(vatPercentageAsInt);
									 var vtamt=parseFloat(obj.data[0].amount);
                                     $("#txt_vat_amount").val(vtamt.toFixed(3));
                                     var vtptamt=parseFloat(obj.data[0].vat_amount);
                                     $("#txt_vat_prct_amount").val(vtptamt.toFixed(3));
                                     //alert(obj.data[0].sec_unit_id);
                                     $("#txt_sec_unit_id").val(obj.data[0].sec_unit_id);
                                     $("#txt_sec_unit_name").val(obj.data[0].sec_unit_name);
                                     var secrateperunit=parseFloat(obj.data[0].sec_rate_per_unit);
                                     $("#txt_sec_rate_per_unit").val(secrateperunit.toFixed(3));
                                    switch(obj.data[0].sec_unit_name)
                                    {
                                       case 'M2':
                                            $('#div_secondary_details').show();
                                           
                                            $('#txt_thickness, #txt_weight, #txt_height, #txt_total_weight, #txt_cubic_meter').val(0);
                                           var square_meter=parseFloat($('#txt_length').val())*parseFloat($('#txt_width').val());
                                            $('#txt_square_meter').val(square_meter.toFixed(3));
                                            $('#div_thickness, #div_weight, #div_height, #div_total_weight, #div_cubic_meter').hide();
                                            $('#div_width, #div_length, #div_square_meter').show();
                                       break;
                                       case 'M3':
                                           $('#div_secondary_details').show();
                                           $('#txt_weight, #txt_height, #txt_total_weight, #txt_square_meter').val(0);
                                            var cubic_meter=parseFloat($('#txt_length').val())*parseFloat($('#txt_width').val())*parseFloat($('#txt_thickness').val());
                                            $('#txt_cubic_meter').val(cubic_meter.toFixed(3));
                                            $('#div_weight, #div_height, #div_total_weight, #div_square_meter').hide();
                                            $('#div_length, #div_width, #div_thickness, #div_cubic_meter').show();
                                       break;
                                       case 'Kg':
                                           $('#div_secondary_details').show();
                                            $('#txt_width, #txt_thickness, #txt_height, #txt_square_meter, #txt_cubic_meter').val(0);
                                            var tot_weight=parseFloat($('#txt_length').val())*parseFloat($('#txt_weight').val());
                                            $('#txt_total_weight').val(tot_weight.toFixed(3));
                                            $('#div_width, #div_thickness, #div_height, #div_square_meter, #div_cubic_meter').hide();
                                            $('#div_length, #div_weight, #div_total_weight').show();
                                       break;
                                       default:
                                       $('#div_secondary_details').hide();
                                        $('#txt_length, #txt_width, #txt_thickness, #txt_weight, #txt_height, #txt_total_weight, #txt_square_meter, #txt_cubic_meter').val(0);
                                         $('#div_length, #div_width, #div_thickness, #div_weight, #div_height, #div_total_weight, #div_square_meter, #div_cubic_meter').hide();
                                         //$('#txt_secondary_amount').val(0.000);
                                       break;
                                    }
									var amount = (parseFloat($('#txt_required_qty').val())) * (parseFloat($("#txt_vat_tot_amount").val()));
									$('#txt_qty_amount').val(amount.toFixed(3));
                                    
                                 // calculate_total_weight(); 
                                    
                                });
                   
                   
                   
              });
              function hide_sec_details()
              {
                  $('#div_secondary_details').hide();
                  $('#div_thickness, #div_weight, #div_height, #div_total_weight, #div_cubic_meter, #div_width, #div_length, #div_square_meter').hide();
                                            
                  
              }
               $('#txt_required_qty').change(function(){
                 
                 	
                  //calculate_total_weight();
                 calculate_values();
                
                 });
                
               function calculate_values()
               {
                   var store_id=$("#div_item_select option:selected").val();
                      if(store_id=='select')
                      {
                          $('#txt_required_qty').val(0);
                           swal("Please select an item", {
								title: 'Warning',
								icon: "warning",
							  });
                            return false;
                      }
                      else
                      {
                          var amount = (parseFloat($('#txt_required_qty').val())) * (parseFloat($("#txt_vat_tot_amount").val()));
					        $('#txt_qty_amount').val(amount.toFixed(3));
                           var current_length=$('#txt_length').val();
                            var current_width=$('#txt_width').val();
                            var current_thickness=$('#txt_thickness').val();
                            var current_weight=$('#txt_weight').val();
                            var current_height=$('#txt_height').val();
                           var current_qty=$('#txt_required_qty').val();
                           if( parseFloat(current_qty)=="0" || current_qty=="")
                            {
                                current_qty=1;
                                
                            }
                            else
                            {
                                current_qty=current_qty;
                            }
                            switch($('#txt_sec_unit_name').val())
                                    {
                                       case 'M2':
                                           
                                           var square_meter=parseFloat($('#txt_length').val())*parseFloat($('#txt_width').val())*parseFloat(current_qty);
                                            $('#txt_square_meter').val(square_meter.toFixed(3));
                                           
                                       break;
                                       case 'M3':
                                           
                                            var cubic_meter=parseFloat($('#txt_length').val())*parseFloat($('#txt_width').val())*parseFloat($('#txt_thickness').val())*parseFloat(current_qty);
                                            $('#txt_cubic_meter').val(cubic_meter.toFixed(3));
                                           
                                       break;
                                       case 'Kg':
                                           
                                            var tot_weight=parseFloat($('#txt_length').val())*parseFloat($('#txt_weight').val())*parseFloat(current_qty);
                                            $('#txt_total_weight').val(tot_weight.toFixed(3));
                                       break;
                                       default:
                                      
                                       break;
                                    }
                      }
                   
                      
               }





		
		

                 $('#btn_view_list_of_products1').click(function(){
                     
                    load_data_to_grid_all_product_details_list();
                     $("#btn_product_to_master").attr("disabled", true);
                     
                 });
                 
        

                 
                $('#txt_length').change(function(){
                 
                 var v_txt_length=$("#txt_length").val();
                 calculate_total_weight();
                 if(parseFloat(v_txt_length) > parseFloat(len))
                 {
                            //$("#error_len").text("Should be less than "+parseFloat(len));
                            swal("Should be less than "+parseFloat(len), {
                                    								title: 'Warning',
                                    								icon: "warning",
                                    							  });
                            $("#txt_length").val(len);
                         
                 }
                 else
                 {
                     $("#error_len").text("");
                 }
                 
                
                });
                $('#txt_width').change(function(){
                 
                 var v_txt_width=$("#txt_width").val();
                  calculate_total_weight();
                 if(parseFloat(v_txt_width) > parseFloat(wid))
                 {
                          
                            swal("Should be less than "+parseFloat(wid), {
                                    								title: 'Warning',
                                    								icon: "warning",
                                    							  });
                            $("#txt_width").val(wid);
                         
                 }
                
                });

                 $('#txt_thickness').change(function(){
                 
                 var v_txt_thickness=$("#txt_thickness").val();
                  calculate_total_weight();
                 if(parseFloat(v_txt_thickness) > parseFloat(thick))
                 {
                         
                            swal("Should be less than "+parseFloat(thick), {
                                    								title: 'Warning',
                                    								icon: "warning",
                                    							  });
                            $("#txt_thickness").val(thick);
                           
                 }
                
                });
                $('#txt_weight').change(function(){
                 
                 var v_txt_weight=$("#txt_weight").val();
                  calculate_total_weight();
                 if(parseFloat(v_txt_weight) > parseFloat(wght))
                 {
                          
                            swal("Should be less than "+parseFloat(wght), {
                                    								title: 'Warning',
                                    								icon: "warning",
                                    							  });
                            $("#txt_weight").val(wght);
                          
                            
                 }
                
                });
               
                
                 $('#txt_product_code').blur(function(){
                 //alert("inside");
                 var v_txt_product_code=$("#txt_product_code").val();
                  $.post("../controller/product/product_controller.php",{action:'check_product_code',v_product_code:v_txt_product_code}
                                                , function(result,status)
                                                {
                                             // alert(result);
                                              if(result=="not exist")
                                              {
                                                 $("#error_prdt_code").text(""); 
                                                  $("#txt_product_name").val('');
                                                  $("#txt_finished_prd_id").val('');
                                                    $("#btn_product_add").attr("disabled", false);
                                                    $('#txt_product_name').attr('readonly', false);
                                              }
                                                else
                                                {
                                                   swal("Product Code Already Exist", {
                                    								title: 'Warning',
                                    								icon: "warning",
                                    							  });
                                                  $("#txt_product_name").val('');
                                                  
                                                    $('#txt_product_code').val('');
                                                    
                                              }
                                                  
                                                
                         });

                });
                

function calculate_total_weight()
       {
             current_length=$('#txt_length').val();
             current_width=$('#txt_width').val();
             current_thickness=$('#txt_thickness').val();
            var current_weight=$('#txt_weight').val();
            var current_height=$('#txt_height').val();
           console.log("Value:"+isNaN(current_length));
           var current_qty=$('#txt_required_qty').val();
           if( parseFloat(current_qty)=="0" || current_qty=="")
            {
                current_qty=1;
                
            }
            else
            {
                current_qty=current_qty;
            }
            
            console.log("L:"+current_length+"W:"+current_width+"TH:"+current_thickness+"Wt:"+current_weight);
            console.log("parse"+parseFloat($('#txt_length').val())+"parse:"+parseFloat($('#txt_width').val()));
             if( parseFloat($('#txt_length').val()) > "0"  || parseFloat($('#txt_width').val()) > "0"  || parseFloat($('#txt_thickness').val())> "0"  || parseFloat($('#txt_weight').val()) > "0"  ) 
            {
                
                // var tot_weight=parseFloat(current_length)*parseFloat(current_width)*parseFloat(current_thickness)*parseFloat(current_weight);
                var tot_weight=parseFloat(current_length)*parseFloat(current_weight)*parseFloat(current_qty);
                console.log(tot_weight);
                $('#txt_total_weight').val(tot_weight);
            }
            else
            {
                $('#txt_total_weight').val(0);
            }
            
            if( parseFloat($('#txt_length').val()) > "0"  && parseFloat($('#txt_width').val())>"0" && parseFloat($('#txt_thickness').val())=="0") 
            {
             square_meter=parseFloat(current_length)*parseFloat(current_width)*parseFloat(current_qty);
           
            console.log(square_meter);
            
            $('#txt_square_meter').val(square_meter);
               
            }
            else
            {
             $('#txt_square_meter').val(0);
             
            }
            
            
            if( parseFloat($('#txt_length').val()) > "0"  || parseFloat($('#txt_width').val())>"0" || parseFloat($('#txt_height').val())>"0" ) 
            {
            //var cubic_meter=parseFloat(current_length)*parseFloat(current_width)*parseFloat(current_height);
            cubic_meter=parseFloat(current_length)*parseFloat(current_width)*parseFloat(current_thickness)*parseFloat(current_qty);
            console.log(cubic_meter);
            $('#txt_cubic_meter').val(cubic_meter);
               
            }
            else
            {
             $('#txt_cubic_meter').val(0);
            }
            
            
       }
       
       
      function clear_text_item()
        {
            $("#txt_length").val(0);
            $("#txt_width").val(0);
            $("#txt_height").val(0);
            $("#txt_thickness").val(0);
            $("#txt_weight").val(0);
            $("#txt_required_qty").val('');
             hide_sec_details();
            
        }
         $('#btn_cancel').click(function(){
                     
                     clear_text();
                     
                 });  
                 
       
      function clear_text()
        {
            location.reload();
       
            
        }     
        

                                 
                                 
                function load_data_to_grid_all_product_details_list()
                 {
                     master_product_list_table.destroy();
                         
                     master_product_list_table = $('#list_of_master_products').DataTable( {
                            
                            
                             "ajax": {
                                 'type': 'POST',
                                 'url': '../controller/product/product_controller.php',
                                 'data': {
                                    action: 'list_all_product_details'
                                   
                                 }
                             },
                              "select": {
                                style: 'multi'
                             },
                             "language": {
                                 "zeroRecords": "No records available",
                                 "infoEmpty": "No records available",
                              },
                            "order": [[ 0, "" ]],
            				"bPaginate": true,
            				"bLengthChange": false,
            				"bFilter": false,
            				"bInfo": false,
            				"autoWidth": false,
            				 //"scrollX": true,
            				
                            "columns": [
                                  
                                { "data": null },
                                 
                              { "data": "product_code" },
                                 { "data": "product_name", width:"30%"
                                 },
                                 { "data": "product_item_primary_amt",className: "text-right",
                                  render: function ( data, type, rows ) {
            						
            								return '<span style="font-weight:bold;color:#000000">'+rows['product_item_primary_amt']+ '</span>';
            								
            							 },
                                 },
            					
            				
                                 { "data": "labour_cost_type",className: "text-right",
                                  render: function ( data, type, rows ) {
            						
            								if(rows['labour_cost_type']=='%')
            								{
            								return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['labour_cost_amt'])).toFixed(3) + '</span>'+'   (' +(parseFloat(rows['labour_cost'])).toFixed(2) + '%)';
            								}
            								else
            								{
            								return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['labour_cost_amt'])).toFixed(3)+'</span>'+'   (' +rows['labour_cost'] + ''+ rows['labour_cost_type']+')';
            								}
            
            							 },
                                 },
            					 
            				 	
            					
            					 { "data": "equipment_cost",className: "text-right",
            					 render: function ( data, type, rows ) {
            						
            								if (rows['equipment_cost_type'] == '%') {
                                              var calculatedValue = rows['product_item_primary_amt'] * rows['equipment_cost'] / 100;
                                              var formattedValue = calculatedValue.toFixed(3);
                                              return '<span style="font-weight:bold;color:#000000">' + (parseFloat(rows['equipment_cost_amt'])).toFixed(3) + '</span>' + '   (' + (parseFloat(rows['equipment_cost'])).toFixed(2) + '%)';
                                            } else {
                                              var formattedAmt = parseFloat(rows['equipment_cost_amt']).toFixed(3);
                                              return '<span style="font-weight:bold;color:#000000">' + formattedAmt + '</span>' + '   (' + rows['equipment_cost'] + ' ' + rows['equipment_cost_type'] + ')';
                                            }
            
            							 },
                                 },
            				 { "data": "service_cost",className: "text-right",
            				 	 render: function ( data, type, rows ) {
            						
            									if(rows['service_cost_type']=='%')
            								{
            								return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['service_cost_amt'])).toFixed(3) +'</span>'+'   ('+(parseFloat(rows['service_cost'])).toFixed(2)+'%)';
            								}
            								else
            								{
            									return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['service_cost_amt'])).toFixed(3)+'</span>'+'   ('+rows['service_cost'] + ''+ rows['service_cost_type']+')';
            								}
            
            							 },
                                 },
            					 { "data": "other_cost",className: "text-right",
            					 render: function ( data, type, rows ) {
            						
            								if(rows['other_cost_type']=='%')
            								{
            								return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['other_cost_amt'])).toFixed(3)+'</span>'+'    ('+(parseFloat(rows['other_cost'])).toFixed(2) +  '%)';
            								}
            								else
            								{
            									return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['other_cost_amt'])).toFixed(3)+'</span>'+'    ('+rows['other_cost'] + ''+ rows['other_cost_type']+ ')';
            								}
            
            							 },
                                 },
            				
            					 { "data": "margin_cost",className: "text-right",
            					 render: function ( data, type, rows ) {
            						
            								if(rows['margin_cost_type']=='%')
            								{
            								return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['margin_cost_amt'])).toFixed(3) +'</span>'+'   ('+(parseFloat(rows['margin_cost'])).toFixed(2) + '%)';
            								}
            								else
            								{
            									return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['margin_cost_amt'])).toFixed(3)+'</span>'+'   ('+rows['margin_cost'] + ''+ rows['margin_cost_type']+')';
            								}
            
            							 },
                                 },
                                 { "data": "product_rate_per_unit_cost",className: "text-right",
                                 render: function ( data, type, rows ) {
            						
            								return '<span style="font-weight:bold;color:#000000">'+rows['product_rate_per_unit_cost']+ '</span>';
            								
            							 },
                                 },
            					 { "data": "master_product_item_id",
                                 
                                     render: function ( data, type, rows, meta ) {
            						
            									str_product_item_list = '<button class="btn btn-sm btn-primary mr-1" onclick="openNavR2()"  id="btn_product_item_details_list" ><i class="material-icons ">forward</i></button>';
            								
            								return str_product_item_list;
            
            							 },
                                     
                                 },
                                  { "data": "master_product_item_id",
                                 
                                     render: function ( data, type, rows, meta ) {
            						
            									str_product_item_secondary_list = '<button class="btn btn-sm btn-info mr-1" onclick="openNavR3()"  id="btn_product_item_details_secondary_list" ><i class="material-icons ">fast_forward</i></button>';
            								
            								return str_product_item_secondary_list;
            
            							 },
                                     
                                 }, 
                                  { "data": "master_product_item_id",
                                 
                                     render: function ( data, type, rows, meta ) {
            						
            									str_product_item_secondary_list = '<button class="btn btn-sm btn-success mr-1" onclick=""  id="btn_product_item_details_print" name="btn_product_item_details_print" ><i class="material-icons">print</i></button>';
            								
            								return str_product_item_secondary_list;
            
            							 },
                                     
                                 },
            					 
            					 
                                 
                                 
                             ],
                            
                             pageLength: 10,
            				 searching: true,
                             //responsive: true,
                             "aoColumnDefs": [
            					{ "bSortable": false, "aTargets": [  0,1,2,3,4,5,6,7,8,9,10,11] }, 
            					
            				],
                            
                                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                 $("td:eq(0)", nRow).html(iDisplayIndex + 1);
                                 return nRow;
                              },
                              "drawCallback": function () {
                                    $('.dataTables_paginate > .pagination').addClass('pagination-sm');
                                }
                            
                                    
                     });  
                     
                
         }          
                                 
                                 
                                 
               $('#list_of_master_products tbody').on('click', 'td button', function(){
            
       // alert("inside click");
                    //openNavR1();
                    var $row = $(this).closest('tr');
                     if ( $row.hasClass('child') ) {
                         var  $row = $row.prev();
                     }
                        var data = master_product_list_table.row($row).data();
                        
                        v_master_finished_product_id = data.master_finished_product_id;
                        v_prod_code  = data.product_code;
                        //alert(v_master_finished_product_id);
        
                
                
                if ($(this).attr('name') === 'btn_product_item_details_print') {
                    // Do something specific for this button
                    print(v_master_finished_product_id);      
                }
                else
                {
                    load_data_to_grid_all_product_details_item_list(v_prod_code); 
                    load_data_to_grid_all_product_details_item_list_secondary(v_prod_code); 
                }
                
        });
        
         function print(v_master_prod_id)
         {
            window.open("../reports/master_product_print.php?v_master_prod_id="+v_master_prod_id,"_blank");
         }
        
         function load_data_to_grid_all_product_details_item_list(v_prod_code)
                 {
                     master_product_list_table_display.destroy();
                         
                     master_product_list_table_display = $('#list_of_all_product_item_details').DataTable( {
                            
                             "ajax": {
                                 'type': 'POST',
                                 'url': '../controller/product/product_controller.php',
                                 'data': {
                                    action: 'list_all_product_item_details',
                                    
                                    v_product_code:v_prod_code
                                   
                                 }
                             },
                              "select": {
                                style: 'multi'
                             },
                             "language": {
                                 "zeroRecords": "No records available",
                                 "infoEmpty": "No records available",
                              },
                            "order": [[ 1, "desc" ]],
            				"bPaginate": false,
            				"bLengthChange": false,
            				"bFilter": false,
            				"bInfo": false,
            				"bautoWidth": false,
            			     //"scrollX": true,
                    //         "sScrollXInner": "110%",
            				
                            "columns": [
                                
                                 
                                { "data": null},
                                 
                                 
                                 { "data": "category_name"},
                                 { "data": "item_name"},
            					 { "data": "quantity",className: "text-center"},
                                 { "data": "units"},
            					 { "data": "rate_per_unit",className: "text-right"},
            				
            					 { "data": "vat_percentage",className: "text-right",
            					 render: function ( data, type, rows ) {
            						
            								
            								return '<span style="font-weight:bold;color:#000000">'+rows['vat_prct_amount']+'</span>'+'   (' +rows['vat_percentage']+'%)';
            
            							 },
            							 
                     },
            					 
            					 { "data": "total_amount",className: "text-right"
            			
            							 
                     },
                     
            					 
                             ],
                    "footerCallback": function ( row, data, start, end, display ) {
                                            var api = this.api(), data;
                                 
                                            // Remove the formatting to get integer data for summation
                                            var intVal = function ( i ) {
                                                return typeof i === 'string' ?
                                                    i.replace(/[\$,]/g, '')*1 :
                                                    typeof i === 'number' ?
                                                        i : 0;
                                            };
                                 
                                            // Total over all pages
                                            total = api
                                                .column( 7 )
                                                .data()
                                                .reduce( function (a, b) {
                                                    return intVal(a) + intVal(b);
                                                }, 0 );
                                 
                                            // Total over this page
                                            pageTotal = api
                                                .column( 7, { page: 'current'} )
                                                .data()
                                                .reduce( function (a, b) {
                                                    return intVal(a) + intVal(b);
                                                }, 0 );
                                 
                                            // Update footer
                                                $( api.column( 7 ).footer() ).html(
                                                    $.fn.dataTable.render.number(',', '.', 3, '').display( pageTotal )
                                                );
                                                
                                               
                                           
                                 },
                             
                            
                             pageLength: 10,
            				 searching: false,
                            
                             
                            
                                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                 $("td:eq(0)", nRow).html(iDisplayIndex + 1);
                                 return nRow;
                              },
                            
                                    
                     });  
                
         }         
         
         
         function load_data_to_grid_all_product_details_item_list_secondary(v_prod_code)
                 {
                     master_product_list_table_secondary.destroy();
                         
                     master_product_list_table_secondary = $('#list_of_all_product_item_details_secondary').DataTable( {
                            
                             "ajax": {
                                 'type': 'POST',
                                 'url': '../controller/product/product_controller.php',
                                 'data': {
                                    action: 'list_all_product_item_details',
                                    
                                    v_product_code:v_prod_code
                                   
                                 }
                             },
                              "select": {
                                style: 'multi'
                             },
                             "language": {
                                 "zeroRecords": "No records available",
                                 "infoEmpty": "No records available",
                              },
                            "order": [[ 1, "desc" ]],
            				"bPaginate": false,
            				"bLengthChange": false,
            				"bFilter": false,
            				"bInfo": false,
            				"bautoWidth": false,
            			 
                            "columns": [
                                {
                                    "className":  'details-control',
                                    "orderable":  false,
                                    "data":        null,
                                    "defaultContent": '',
                                    "width":'10px'
                                 },
                                
                                 
                                { "data": null},
                                 
                                 
                                 { "data": "category_name"},
                                 { "data": "item_name"},
            					 { "data": "quantity",className: "text-center"},
                                 { "data": "sec_unit_name"},
            					 
            					 { "data": "total_weight",className: "text-right"},
            					 { "data": "square_meter",className: "text-right"},
            					 
            					 { "data": "cubic_meter",className: "text-right"},
            					 { "data": "sec_rate_per_unit",className: "text-right"},
            					 { "data": "sec_total_amt",className: "text-right"}
            					 
                             ],
                             
                             "footerCallback": function ( row, data, start, end, display ) {
                                            var api = this.api(), data;
                                 
                                            // Remove the formatting to get integer data for summation
                                            var intVal = function ( i ) {
                                                return typeof i === 'string' ?
                                                    i.replace(/[\$,]/g, '')*1 :
                                                    typeof i === 'number' ?
                                                        i : 0;
                                            };
                                 
                                           
                                            // Total over all pages
                                            total = api
                                                .column( 6 )
                                                .data()
                                                .reduce( function (a, b) {
                                                    return intVal(a) + intVal(b);
                                                }, 0 );
                                 
                                            // Total over this page
                                            pageTotal = api
                                                .column( 6, { page: 'current'} )
                                                .data()
                                                .reduce( function (a, b) {
                                                    return intVal(a) + intVal(b);
                                                }, 0 );
                                 
                                            // Update footer
                                                $( api.column( 6 ).footer() ).html(
                                                    $.fn.dataTable.render.number(',', '.', 3, '').display( pageTotal )
                                                );
                                                
                                            // Total over all pages
                                            total = api
                                                .column( 7 )
                                                .data()
                                                .reduce( function (a, b) {
                                                    return intVal(a) + intVal(b);
                                                }, 0 );
                                 
                                            // Total over this page
                                            pageTotal = api
                                                .column( 7, { page: 'current'} )
                                                .data()
                                                .reduce( function (a, b) {
                                                    return intVal(a) + intVal(b);
                                                }, 0 );
                                 
                                            // Update footer
                                                $( api.column( 7 ).footer() ).html(
                                                    $.fn.dataTable.render.number(',', '.', 3, '').display( pageTotal )
                                                );   
                                           
                                            // Total over all pages
                                            total = api
                                                .column( 8 )
                                                .data()
                                                .reduce( function (a, b) {
                                                    return intVal(a) + intVal(b);
                                                }, 0 );
                                 
                                            // Total over this page
                                            pageTotal = api
                                                .column( 8, { page: 'current'} )
                                                .data()
                                                .reduce( function (a, b) {
                                                    return intVal(a) + intVal(b);
                                                }, 0 );
                                 
                                            // Update footer
                                                $( api.column( 8 ).footer() ).html(
                                                    $.fn.dataTable.render.number(',', '.', 3, '').display( pageTotal )
                                                );   
                                           
                                 },
                            
                            
                             pageLength: 50,
            				 searching: true,
                             
                             "aoColumnDefs": [
            					{ "bSortable": false, "aTargets": [  0,1,2,3,4,5,6,7,8,9,10] }, 
            					
            				],
                            
                                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                 $("td:eq(1)", nRow).html(iDisplayIndex + 1);
                                 return nRow;
                              },
                            
                                    
                     });  
                
         }           
         
         
         
                $('#list_of_all_product_item_details_secondary tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = master_product_list_table_secondary.row( tr );
         
                if ( row.child.isShown() ) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    // Open this row
                    row.child( formatitemproduct(row.data()) ).show();
                    tr.addClass('shown');
                }
            } );       
                 
                 
         function formatitemproduct(d)
    		{
    		
			return '<table style="table-layout: fixed; width: 100%; word-wrap: break-word;">'+
			 '<tr style="background: #9A3CEC;color:#ffffff;">'+
			    
				'<td ><div align="center">Length</div></td>'+
				'<td ><div align="center">Width</div></td>'+
				'<td ><div align="center">Thickness</div></td>'+
				'<td ><div align="center">Weight</div></td>'+
			
			
				
				
			  '</tr>'+
			  '<tr>'+
			
				'<td><div align="right">'+d.length+' </div></td>'+
				'<td><div align="right">'+d.width+' </div></td>'+
				'<td><div align="right">'+d.thickness+'</div></td>'+
				'<td><div align="right">'+d.weight+' </div></td>'+
			
				
			  '</tr>'+
			 
			'</table>' ;
			
		
		
		}
		
		
		
		
		  
                 
           $('#list_of_master_products tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = master_product_list_table.row( tr );
         
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
			 '<tr style="background: #9A3CEC;color:#ffffff;">'+
			    '<td ><div align="center">Category Name</div></td>'+
				'<td ><div align="center">Item Name</div></td>'+
				'<td ><div align="center">Quantity</div></td>'+
				'<td ><div align="center">Length</div></td>'+
				'<td ><div align="center">Width</div></td>'+
				'<td ><div align="center">Height</div></td>'+
				'<td ><div align="center">Thickness</div></td>'+
				'<td ><div align="center">Weight</div></td>'+
				'<td ><div align="center">Total weight</div></td>'+
				'<td ><div align="center">Square meter</div></td>'+
				'<td ><div align="center">Cubic Meter</div></td>'+
				'<td ><div align="center">Units</div></td>'+
				'<td ><div align="center">Total Amount</div></td>'+
				'<td ><div align="center">Rate/Unit</div></td>'+
			
				
				
			  '</tr>'+
			  '<tr>'+
				'<td ><div align="center">'+d.category_name+'</div></td>'+
				'<td><div align="center">'+d.item_name+'</div></td>'+
				'<td><div align="center">'+d.quantity+' </div></td>'+
				'<td><div align="center">'+d.length+' </div></td>'+
				'<td><div align="center">'+d.width+' </div></td>'+
				'<td ><div align="center">'+d.height+'</div></td>'+
				'<td><div align="center">'+d.thickness+'</div></td>'+
				'<td><div align="center">'+d.weight+' </div></td>'+
				'<td><div align="center">'+d.total_weight+' </div></td>'+
				'<td><div align="center">'+d.square_meter+' </div></td>'+
				'<td><div align="center">'+d.cubic_meter+'</div></td>'+
				'<td><div align="center">'+d.units+' </div></td>'+
				'<td><div align="center">'+d.total_amount+' </div></td>'+
				'<td><div align="center">'+d.rate_per_unit+' </div></td>'+
				
			  '</tr>'+
			 
			'</table>' ;
			
		
		
		}

        $('#btn_view_list_of_store').click(function(){
            var v_item_code=$("#div_item_select option:selected").text();
            var v_item_code = v_item_code.split("-");
            var item_code=$.trim(v_item_code[0]);
            load_data_to_grid_store_details_list(item_code);
        });
		
		function load_data_to_grid_store_details_list(item_code)
                 {
                     store_list_table.destroy();
                         
                     store_list_table = $('#list_of_stores').DataTable( {
                            
                             "ajax": {
                                 'type': 'POST',
                                 'url': '../controller/product/product_controller.php',
                                 'data': {
                                    action: 'list_store_details',
                                    v_item_id:item_code
                                 }
                             },
                             "language": {
                                 "zeroRecords": "No records available",
                                 "infoEmpty": "No records available",
                              },
                            "order": [[ 0, "desc" ]],
            				"bPaginate": false,
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
								 { "data": "category_id",className: "text-center",
									 render: function ( data, type, rows, meta ) {
            						
            									str_active_status_delete = ' <button type="button" class="btn btn-sm btn-info mr-1"  id="edit_item" name="edit_item" ><i class="material-icons ">border_color</i></button>';
            								
            								return str_active_status_delete;
            
            							 },
								 },
                             ],
                             pageLength: 50,
            				 searching: false,
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
                                },
                                
                                
                               
                            
                     });  
                
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
                    row.child( format_item(row.data()) ).show();
                    tr.addClass('shown');
                }
            });	
            
			var v_item_code;
			$('#list_of_stores tbody').on('click', 'td button', function(){
                     
                        var $row = $(this).closest('tr');
                        var data = store_list_table.row($row).data();
                        
                        v_store_id  = data.store_id;
						v_item_code = data.item_code;
						
						if($(this).attr("name")=='edit_item')
                         {
							$("#txt_rate").val(data.rate_per_unit);
				            $("#txt_vat").val(data.vat_percentage); 
                            $("#product_edit_item_modal").modal('show');
            			
            			 }
						
						
			});
			
			
			$("#btn_save_change").click(function(){
				var txt_rate = parseFloat($("#txt_rate").val());
				var txt_vat = parseFloat($("#txt_vat").val());
				if(txt_vat == ''){
				  txt_vat=0;  
				}
				if(txt_rate == ''){
				  txt_rate=0;  
				}
                var txt_vat_amount=txt_rate * (txt_vat)/100;
                    
                var total_amount=parseFloat(txt_vat_amount)+parseFloat(txt_rate);
                
				// if(txt_rate == '' || txt_vat == '')
				// {
    //               swal("Warning","Please provide all the details ....", "warning");
    //               return false;
    //             }
				// else
				// {
					$.post("../controller/product/product_controller.php",{action:'edit_store_item_details',v_store_id:v_store_id,v_rate_per_unit:txt_rate,vat_percentage:txt_vat,vat_amount:txt_vat_amount,txt_tot_amount:total_amount}
						, function(result,status)
						{
						  // if(result == '1')
						  // {
							   swal("Success","Edited successfully ....", "success");
							   load_data_to_grid_store_details_list(v_item_code);
							   $("#product_edit_item_modal").modal('hide');
							   $("#txt_rate").val('');
							   $("#txt_vat").val('');
							   $("#txt_rate_unit").val(txt_rate);
							   $('#txt_vat_label').html(txt_vat);
                               $("#txt_vat_tot_amount").val(total_amount);
							   var amount = (parseFloat($('#txt_required_qty').val())) * (parseFloat($("#txt_vat_tot_amount").val()));
							   $('#txt_qty_amount').val(amount);
						   //}
                    });
			//	}
			});
			
			$('#close_modal').click(function(){
				$("#txt_rate").val('');
				$("#txt_vat").val('');
			});	
            
             function format_item(d)
		{
		
			return '<table style="table-layout: fixed; width: 100%; word-wrap: break-word;">'+
			 '<tr style="background: #989898;color:#ffffff;">'+
			    '<td ><div align="center">Precision % </div></td>'+
				'<td ><div align="center">Length </div></td>'+
				'<td ><div align="center">Width </div></td>'+
				
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
				
				'<td><div align="center">'+d.thickness+'</div></td>'+
				'<td><div align="center">'+d.weight+'</div></td>'+
				'<td ><div align="center">'+d.sec_unit_name+'</div></td>'+
				'<td><div align="center">'+d.total_weight+'</div></td>'+
				'<td><div align="center">'+d.square_meter+'</div></td>'+
				'<td><div align="center">'+d.cubic_meter+'</div></td>'+
				'<td ><div align="center">'+d.sec_rate_per_unit+'</div></td>'+
			  '</tr>'+
			 
			  
			'</table>' ;
			
		
		
	}      
                 
                
                 

        
        
        v_btn_product_to_master.click(function(){
            //alert(flag);
         if(flag!=1)
         {
          swal("Warning","Please calculate the Amount ....", "warning");
                        v_btn_product_to_master.ladda( 'stop' );
                        return false;
        }
        if ( ! product_item_list_table.data().any() ) {
            swal("Warning","Please add items to product ....", "warning");
             return false;
        }
        
            v_btn_product_to_master.ladda( 'start' );
            var v_product_code=$("#txt_product_code").val();
            var v_product_name=$("#txt_product_name").val();
             v_labour_cost_type=$("#div_labour_cost_type_select option:selected").text();
             v_labour_cost=$("#txt_labour_cost").val(); 
             v_service_cost_type=$("#div_service_cost_type_select option:selected").text();
             v_service_cost=$("#txt_service_cost").val();
             v_euipment_cost_type=$("#div_euipment_cost_type_select option:selected").text();
             v_euipment_cost=$("#txt_euipment_cost").val();
             v_other_cost_type=$("#div_other_cost_type_select option:selected").text();
             v_other_cost=$("#txt_other_cost").val();
             v_margin_cost_type=$("#div_margin_cost_type_select option:selected").text();
             v_margin_cost=$("#txt_margin_cost").val();
              product_rate_per_unit_cal();
             v_pdt_rate_per_cal=txt_total_amount_cal;
             //alert(v_pdt_rate_per_cal);
             txt_tot_amount=$('#txt_total').val();
			 var v_product_id = $('#txt_finished_prd_id').val();
             //alert(labour_cost_amnt);
            // product_div_value();
            
            
             $.post("../controller/product/product_controller.php",{action:'add_to_master_master',v_product_id:v_product_id,v_product_name:v_product_name,v_labour_cost_type:v_labour_cost_type,v_labour_cost:v_labour_cost,v_service_cost_type:v_service_cost_type,v_service_cost:v_service_cost,v_euipment_cost_type:v_euipment_cost_type,v_euipment_cost:v_euipment_cost,v_other_cost_type:v_other_cost_type,v_other_cost:v_other_cost,v_margin_cost_type:v_margin_cost_type,v_margin_cost:v_margin_cost,v_pdt_rate_per_cal:v_pdt_rate_per_cal,v_labour_cost_amnt:labour_cost_amnt,v_service_cost_amnt:service_cost_amnt,v_euipment_cost_amnt:euipment_cost_amnt,v_other_cost_amnt:other_cost_amnt,v_margin_cost_amnt:margin_cost_amnt,txt_tot_amount:txt_tot_amount}
              , function(result,status)
                {
                    console.log(result);
                    result = $.trim(result);
                    if(result.charAt(0)=='U')
                        {
                            v_btn_product_to_master.ladda( 'stop' );
                            swal("Error", result, "error");
                             
                        }
                    else 
                        {
                            v_btn_product_to_master.ladda( 'stop' );
                            swal("Success"," Product added Successfully to Master", "success");   
                            location.reload();
                        }     
                });
             
             
             
             
        
        }); 
        
        
        
 $('#btn_calculate').click(function(){
   flag=1;
      $('#figures_show').show(1000);
      product_rate_per_unit_cal();
    // alert(txt_total_amount_cal);
      //product_div_value();
     if(isNaN(txt_total_amount_cal))
     {
         product_div_value();
     }
     else
     {
          $('#cal_value').text(txt_total_amount_cal); 
     }
     
   
 }); 
 function product_div_value()
 {
       prod_rate_unit=$('#cal_value').val();
      // alert(prod_rate_unit);
    if(prod_rate_unit=='')
    {
       $('#cal_value').text("0.00"); 
    } 
 }
 function product_rate_per_unit_cal()
 {
    
   
  v_labour_cost_type=$("#div_labour_cost_type_select option:selected").text();
             v_labour_cost=$("#txt_labour_cost").val(); 
             v_service_cost_type=$("#div_service_cost_type_select option:selected").text();
             v_service_cost=$("#txt_service_cost").val();
             v_euipment_cost_type=$("#div_euipment_cost_type_select option:selected").text();
             v_euipment_cost=$("#txt_euipment_cost").val();
             v_other_cost_type=$("#div_other_cost_type_select option:selected").text();
             v_other_cost=$("#txt_other_cost").val();
             v_margin_cost_type=$("#div_margin_cost_type_select option:selected").text();
             v_margin_cost=$("#txt_margin_cost").val();
            
       txt_tot_amount=$('#txt_total').val();
      
      if(v_labour_cost_type=='%')
      {
        v_labour_cost_amount= parseFloat(txt_tot_amount)*parseFloat(v_labour_cost)/100; 
       
        txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_labour_cost_amount);
      }
      else
      {
          
        txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_labour_cost);
        v_labour_cost_amount=parseFloat(v_labour_cost);
        
      }
      labour_cost_amnt=parseFloat(v_labour_cost_amount);
     
      
    
      if(v_euipment_cost_type=='%')
      {
        v_euipment_cost_amount= parseFloat(txt_tot_amount)*parseFloat(v_euipment_cost)/100; 
       
        txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_euipment_cost_amount);
      }
      else
      {
      txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_euipment_cost);
      v_euipment_cost_amount=parseFloat(v_euipment_cost);
      }
       euipment_cost_amnt=parseFloat(v_euipment_cost_amount);
    if(v_service_cost_type=='%')
      {
        v_service_cost_amount= parseFloat(txt_tot_amount)*parseFloat(v_service_cost)/100; 
        
        txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_service_cost_amount);
      }
      else
      {
      txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_service_cost);
      v_service_cost_amount=parseFloat(v_service_cost);
      }
       service_cost_amnt=parseFloat(v_service_cost_amount);
      if(v_other_cost_type=='%')
      {
       v_other_cost_amount= parseFloat(txt_tot_amount)*parseFloat(v_other_cost)/100; 
       
        txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_other_cost_amount);
      }
      else
      {
          txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_other_cost);
          v_other_cost_amount=parseFloat(v_other_cost);
      }
       other_cost_amnt=parseFloat(v_other_cost_amount);
      
      if(v_margin_cost_type=='%')
      {
        v_margin_cost_amount= parseFloat(txt_tot_amount)*parseFloat(v_margin_cost)/100;
       
        txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_margin_cost_amount);
      }
      else
      {
          txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_margin_cost);
          v_margin_cost_amount=parseFloat(v_margin_cost);
      }
       margin_cost_amnt=parseFloat(v_margin_cost_amount);
     
     txt_total_amount_cal = parseFloat(txt_tot_amount,10).toFixed(3);
    
      $('#cal_value').text(txt_total_amount_cal);
      
     
      
 }
    $('#div_labour_cost').change(function (e) {
     
        v_labour_cost=$("#txt_labour_cost").val(); 
          if(v_labour_cost=='')
           {
                $('#txt_labour_cost').val(0);
           } 
           product_div_value();
           product_rate_per_unit_cal();
          
         
    });
    
     $('#div_service_cost').change(function (e) {
         
        v_service_cost=$("#txt_service_cost").val();
         if(v_service_cost=='')
           {
                $('#txt_service_cost').val(0);
           }
           product_div_value();
           product_rate_per_unit_cal();
           
     });  
     
      $('#div_equipment_cost').change(function (e) {
         
        v_euipment_cost=$("#txt_euipment_cost").val();
         if(v_euipment_cost=='')
           {
                $('#txt_euipment_cost').val(0);
           }
             product_div_value();
           product_rate_per_unit_cal();
         
     });       
        
     $('#div_other_cost').change(function (e) {
         
        v_other_cost=$("#txt_other_cost").val();
         if(v_other_cost=='')
           {
                $('#txt_other_cost').val(0);
           }
            product_div_value();
           product_rate_per_unit_cal();
          
     });  
     
     $('#div_margin_cost').change(function (e) {
         
         v_margin_cost=$("#txt_margin_cost").val();
         if(v_margin_cost=='')
           {
                $('#txt_margin_cost').val(0);
           }
           product_div_value();
           product_rate_per_unit_cal();
           
     });
});