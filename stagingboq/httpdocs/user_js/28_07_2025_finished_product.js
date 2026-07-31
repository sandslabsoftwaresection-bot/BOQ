$(document).ready(function(){
    var len,wid,hght,thick,wght,txt_status,strobj,finished_id,finished_id_last,txt_tot_amount,txt_total_amount_cal,cubic_meter, square_meter,tot_weight, total_weight;
    var v_labour_cost_amount,v_service_cost_amount,v_euipment_cost_amount,v_other_cost_amount,v_margin_cost_amount,flag;
    var  v_labour_cost_type,v_labour_cost,v_service_cost_type,v_service_cost,v_euipment_cost_type,v_euipment_cost,v_other_cost_type,v_other_cost,txt_total_amount_cal,txt_tot_amount,v_product_qty,v_product_unit_id,v_product_unit_name;
    
    var v_btn_item_add = $( '#btn_item_save' ).ladda();
     
         $('#figures_show').hide(); 
    var labour_cost_amnt,service_cost_amnt,euipment_cost_amnt,other_cost_amnt,margin_cost_amnt,v_lab_per;
    $('#div_company_select').load('templates/company_combo.php');
    $("#btn_product_to_master").attr("disabled", false);
    //$('#div_company_select').load('templates/company_combo.php');
   $(":input:not(:hidden)").each(function (i) { $(this).attr('tabindex', i + 1); });
                var v_btn_product_add = $( '#btn_product_add' ).ladda();
                var v_btn_store_edit = $( '#btn_store_edit' ).ladda();
                var v_btn_finished_product_add = $( '#btn_finished_product_add' ).ladda();
                var v_btn_product_to_master = $( '#btn_product_to_master' ).ladda();
                var v_btn_finished_product_edit = $( '#btn_finished_product_edit' ).ladda();
                var v_btn_edit_product = $( '#btn_edit_product' ).ladda();
                var product_list_table = $('#list_of_product').DataTable({searching: false, paging: false, info: false,"ordering": false,scrollX: true,"bAutoWidth": false});
                var product_all_list_table = $('#list_of_all_product').DataTable({searching: true, paging: true, info: false,"ordering": false});
                var product_item_list_table = $('#list_of_product_details_list').DataTable({searching: false, paging: false, info: false,"ordering": false,scrollX: true,"bAutoWidth": false,});
                $('#list_of_stores').addClass('pagination-sm');
                var list_product_item_details = $('#list_of_all_product_item_details').DataTable({searching: false, paging: false, info: false,"ordering": false});
                var store_list_table = $('#list_of_stores').DataTable( {searching: false, paging: false, info: false,"ordering": false});
                 $('#list_of_stores').removeClass( 'display' ).addClass('table table-striped table-bordered');
                 var product_list_table_display_primary = $('#list_of_all_product_item_details_primary').DataTable({searching: false, paging: false, info: false,"ordering": false});
                
                  $('#list_of_stores tbody').on( 'click', 'tr', function () {
                        if ( $(this).hasClass('selected') ) { $(this).removeClass('selected'); } else { store_list_table.$('tr.selected').removeClass('selected'); $(this).addClass('selected'); }
                  }); 
               
                 $( '#btn_store_edit' ).hide();
                 
                 $( '#btn_edit_product' ).hide();
                 // $( '#estimation_cancel' ).show();
                 $( '#btn_finished_product_edit' ).hide();
                 
                 
               function formatDate(date) {
                     var d = new Date(date),
                         month = '' + (d.getMonth() + 1),
                         day = '' + d.getDate(),
                         year = d.getFullYear();
                
                     if (month.length < 2) month = '0' + month;
                
                     return [year, month, day].join('-');
                }
                
           
            
            $('#div_product_unit_select').load('templates/unit_combo.php');
            
             function load_product_unit_select_box(div_name,ctrl_name)
                        
            { 
                          
                   $("#"+div_name).load("../controller/store/store_controller.php",{action:'list_units',v_ctrl_name:ctrl_name},function(result,status){});
        
            } 
             
            
            $("#btn_search_print").click(function(){
                
      
           })
            
             v_btn_product_add.click(function(){
                    
                    v_btn_product_add.ladda( 'start' );
                    var v_company_id=$("#div_company_select option:selected").val();
                   
                    var v_company_name=$("#div_company_select option:selected").text();
                    var v_project_id=$("#div_project_select option:selected").val();
                    var v_project_name=$("#div_project_select option:selected").text();
                    
                    
                   
                    
                    var v_product_type=$("#div_type_select option:selected").val();
                    var v_store_id=$("#txt_store_id").val();
                    if(v_product_type=="New")
                    {
                        //var v_product_code=$("#txt_product_code").val();
                        var v_product_code='New';
                        var v_product_name_new=$("#txt_product_name").val();
                    }
                    else
                    {
                        var v_product_id=$("#existing_product option:selected").val();
                        var v_product_code=$("#existing_product option:selected").val();
                        //alert(v_product_code)
                        var v_product_name=$("#existing_product option:selected").text();
                         var ret = v_product_name.split("---");
                        var str1 = ret[0];
                        var v_product_name_new = ret[1];
                        //alert(v_product_name_new);
                    }
                    if(v_product_id==0)
                    {
                        v_product_id=0;
                    }
                    
                    
                    var v_category_id=$("#div_category_select option:selected").val();
                    var v_category_name=$("#div_category_select option:selected").text();
                    
                    var v_item_id=$("#select_item_name").val();
                    var v_item_name=$("#div_item_select option:selected").text();
                    var v_required_qty=$("#txt_required_qty").val();
                    
                   
                    var v_txt_length=$("#txt_length").val();
                    var v_txt_width=$("#txt_width").val();
                    var v_txt_height=$("#txt_height").val();
                    var v_txt_thickness=$("#txt_thickness").val();
                    var v_txt_weight=$("#txt_weight").val();
                    var v_total_weight=$("#txt_total_weight").val();
                    var v_square_meter=$("#txt_square_meter").val();
                    var v_cubic_meter=$("#txt_cubic_meter").val();
                    var v_units_name=$("#txt_units_name").val();
                    var v_units_id=$("#txt_units_id").val();
                    var v_rate_per_unit=$("#txt_rate_per").val();
                    var v_finished_id=$("#txt_finished_prd_id").val();
                     
                       //var total_amt=parseFloat(v_rate_per_unit)*parseFloat(v_required_qty);
                    var vat_percentage= $("#txt_vat_percentage").val();
				
                    var vat_amount= $("#txt_vat_tot_amount").val();              
                    var vat_prct_amount=parseFloat(v_rate_per_unit)*parseFloat(vat_percentage)/100;  
                    var sec_unit_id=$("#txt_sec_unit_id").val();
                    var sec_unit_name=$("#txt_sec_unit_name").val();
                    
                    var sec_rate_per_unit=$("#txt_secondary_rate_per_unit").val();
                   // var v_finished_id=$("#txt_finished_prd_id").val();
                   
                    v_product_qty=$("#txt_product_qty").val();
                    v_product_unit_id=$("#div_product_unit_select option:selected").val();
                     v_product_unit_name=$("#div_product_unit_select option:selected").text();
                   
                   var sec_total_amt=parseFloat(sec_rate_per_unit)*parseFloat(v_total_weight)+parseFloat(sec_rate_per_unit)*parseFloat(v_square_meter)+parseFloat(sec_rate_per_unit)*parseFloat(v_cubic_meter);
              
                     var total_amt=$("#txt_qty_amount_est").val();
                   // var total_amt=parseFloat(vat_amount)*parseFloat(v_required_qty);



                    if($.trim(v_company_id)=="0"||$.trim(v_company_name)==""||$.trim(v_project_id)=="select"||$.trim(v_project_name)==""||$.trim(v_category_id)=="0"||$.trim(v_category_name)==""||$.trim(v_item_id)=="select"||$.trim(v_item_name)==""||$.trim(v_required_qty)==""||$.trim(v_product_qty)==""||$.trim(v_product_unit_name)=="")
                    
                    {
                        swal("Warning","Please provide all the details ....", "warning");
                        v_btn_product_add.ladda( 'stop' );
                        return false;
                    }
                   
                    else if(v_product_type=="New")
                    {         
                        if($.trim(v_product_name_new)=="")
                        {
                            swal("Warning","Please provide all the details ....", "warning");
                            v_btn_product_add.ladda( 'stop' );
                            return false;
                        }
                        $.post("../controller/product/product_controller.php",{action:'add_to_finished_product_new',v_company_id:v_company_id,v_company_name:v_company_name,v_project_id:v_project_id,v_project_name:v_project_name,v_product_type:v_product_type,v_product_code:v_product_code,v_product_id:v_product_id,v_product_name:v_product_name_new,category_id:v_category_id,v_category_name:v_category_name,v_item_id:v_item_id,v_item_name:v_item_name,v_required_qty:v_required_qty,v_txt_length:v_txt_length,v_txt_width:v_txt_width,v_txt_height:v_txt_height,v_txt_thickness:v_txt_thickness,v_txt_weight:v_txt_weight,v_total_weight:v_total_weight,v_square_meter:v_square_meter,v_cubic_meter:v_cubic_meter,v_units_name:v_units_name,v_units_id:v_units_id,v_rate_per_unit:v_rate_per_unit,v_total_amt:total_amt,v_store_id:v_store_id,vat_percentage:vat_percentage,vat_amount:vat_amount,vat_prct_amount:vat_prct_amount,sec_unit_id:sec_unit_id,sec_unit_name:sec_unit_name,sec_rate_per_unit:sec_rate_per_unit,sec_total_amt:sec_total_amt}, function(result,status){
                             //alert(result); 
                             // console.log(result);
                             //var obj= jQuery.parseJSON(result);
                            finished_id=result;
                             //finished_id=obj.data[0].finished_product_id;
                          console.log(result); 
                          //alert(finished_id+'Add new');
                          $("#txt_finished_prd_new_id").val(finished_id);
                            result = $.trim(result);
                            if(result.charAt(0)=='U'){
                                v_btn_product_add.ladda( 'stop' );
                                swal("Error", result, "error");
                               // clear_text();
                            }
                            else 
                            {
                                v_btn_product_add.ladda( 'stop' );
                                swal("Success"," Item added Successfully", "success");
                                clear_text_item();
                                load_data_to_grid_product_details_list(finished_id);
								$('#txt_rate_per').val('');
								$('#txt_vat_tot_amount').val('');
								$('#txt_qty_amount_est').val(''); 
                               // $('#txt_product_code').addClass("disabledbutton");
                                $('#txt_product_name').addClass("disabledbutton");
                               $("#div_company_select").addClass("disabledbutton");
                                $("#select_project_name_chosen").addClass("disabledbutton");
                                $("#div_type_select").addClass("disabledbutton");
                                
                                
                                $('#select_item_name').children('option').first().prop('selected', true)
                                $('#select_item_name').trigger("chosen:updated");
                                
                                $('#select_category_name').children('option').first().prop('selected', true)
                                $('#select_category_name').trigger("chosen:updated");
                                
                                 $('#txt_product_qty').addClass("disabledbutton");
                                $('#div_product_unit_select').addClass("disabledbutton");
                            }
                        });
                    }
                    else
                    {
                        if($.trim(v_product_code)=="0")
                            {
                                v_btn_product_add.ladda( 'stop' );
                                swal("Warning","Please select a Product ....", "warning");
                                return false;
                            }
                        // alert("else");
                        else
                        {
                            $.post("../controller/product/product_controller.php",{action:'add_to_finished_product_existing',v_finished_id_last:finished_id_last,v_company_id:v_company_id,v_company_name:v_company_name,v_project_id:v_project_id,v_project_name:v_project_name,v_product_type:v_product_type,v_product_code:v_product_code,v_product_id:v_product_id,v_product_name:v_product_name_new,category_id:v_category_id,v_category_name:v_category_name,v_item_id:v_item_id,v_item_name:v_item_name,v_required_qty:v_required_qty,v_txt_length:v_txt_length,v_txt_width:v_txt_width,v_txt_height:v_txt_height,v_txt_thickness:v_txt_thickness,v_txt_weight:v_txt_weight,v_total_weight:v_total_weight,v_square_meter:v_square_meter,v_cubic_meter:v_cubic_meter,v_units_name:v_units_name,v_units_id:v_units_id,v_rate_per_unit:v_rate_per_unit,v_total_amt:total_amt,v_store_id:v_store_id,vat_percentage:vat_percentage,vat_amount:vat_amount,vat_prct_amount:vat_prct_amount,sec_unit_id:sec_unit_id,sec_unit_name:sec_unit_name,sec_rate_per_unit:sec_rate_per_unit,sec_total_amt:sec_total_amt}, function(result,status)
                            {
                                 //alert(result); 
                                 // var obj= jQuery.parseJSON(result);
                                  finished_id=result;  
                                // finished_id=obj.data[0].finished_product_id;
                               console.log(result); 
                               //alert(finished_id+'add to existing');
                               $("#txt_finished_prd_new_id").val(finished_id);
                                result = $.trim(result);
                                if(result=="")
                                {
                                    v_btn_product_add.ladda( 'stop' );
                                    swal("Error", result, "error");
                                }
                                else 
                                {
                                    v_btn_product_add.ladda( 'stop' );
                                    swal("Success"," Item added Successfully", "success");
                                    clear_text_item();
									$('#txt_rate_per').val('');
									$('#txt_vat_tot_amount').val('');
									$('#txt_qty_amount_est').val(''); 
                                    load_data_to_grid_product_details_list(finished_id);
              
                                    $('#txt_product_name').addClass("disabledbutton");
                                    $("#div_company_select").addClass("disabledbutton");
                                    $("#select_project_name_chosen").addClass("disabledbutton");
                                    $("#div_type_select").addClass("disabledbutton");
                                }
                            });
                        }
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
                
                
                
                  $("#div_company_select").change(function() {
                      
                    var pro_id=$("#txt_pro_id").val(); 
                    $('#txt_product_company_id').val($('option:selected', this).val()) ;
                    var company_id=$('option:selected', this).val() ;
                    
                    // $('#div_project_select').load('templates/project_combo.php?company_id='+company_id);
                   
                
                        $.ajax({
                    		type: "POST",
                    		url: "templates/project_combo_new.php",
                    		data: { company_id : company_id } 
                    		 }).done(function(data){
                    			console.log(data);
                    			
                    			$("#div_project_select").html(data);
                    			if(pro_id!=''){
                            
                                      // console.log("not null"+pro_id);
                                    $('#div_project_select option').map(function () {
                                    if ($(this).val() == $.trim(pro_id)) return this;
                                    }).attr('selected', 'selected');
                                    $("#select_project_name").trigger("chosen:updated");
                                    }
                    		
                    		 });
                
                 });

           
                
                
                 $("#div_category_select").change(function() {
                     
                        var v_category_id=$("#div_category_select option:selected").val();
                        
                    
                     $('#div_item_select').load('templates/item_combo.php?v_category_id='+v_category_id);
                     
                        // $("#div_item_select").load("../controller/product/product_controller.php",{action:'list_items',v_ctrl_name:"select_item_name",category_id:v_category_id},function(result,status){});
                
                });
                
              
              
               $("#div_item_select").change(function() {
                   
                   var store_id=$("#div_item_select option:selected").val();
                    $("#txt_store_id").val(store_id);
                   //alert(store_id);
                   
                   $.post("../controller/product/product_controller.php",{action:'list_secondary_details',v_store_id:store_id }
                                , function(result,status)
                                {
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
									 $("#txt_rate_per").val(rt.toFixed(3));
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
                                     $("#txt_secondary_rate_per_unit").val(secrateperunit.toFixed(3));
                                     $("#txt_vat_percentage").val(vatPercentageAsInt);
                                      
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
									$('#txt_qty_amount_est').val(amount.toFixed(3));
                                    
                                    
                                  // calculate_total_weight(); 
                                    
                                });
                   
                   
                   
               });
               hide_sec_details();
                function hide_sec_details()
              {
                  $('#div_secondary_details').hide();
                  $('#div_thickness, #div_weight, #div_height, #div_total_weight, #div_cubic_meter, #div_width, #div_length, #div_square_meter').hide();
                    $('#txt_length, #txt_width, #txt_thickness, #txt_weight, #txt_height, #txt_total_weight, #txt_square_meter, #txt_cubic_meter').val(0);                         
                  
              }
               $("#select_product_type").change(function() {
                   
                   
                   var v_company_id=$("#div_company_select option:selected").val();
                   
                    var v_company_name=$("#div_company_select option:selected").text();
                    var v_project_id=$("#div_project_select option:selected").val();
                    var v_project_name=$("#div_project_select option:selected").text();
                    var v_product_type=$("#div_type_select option:selected").val();
                   // var v_product_code=$("#existing_product option:selected").val();
                    var product_code=$("#select_product_type option:selected").val();
                    var v_product_name=$("#existing_product option:selected").text();
                    
                    var ret = v_product_name.split("---");
                        var str1 = ret[0];
                        var v_product_name_new = ret[1];
                        //alert(v_product_name_new);
                //   if($.trim(v_product_code)=="0")
                //   {
                //         swal("Warning","Please select a Product ....", "warning");
                //   }
                   
                   
                    $.post("../controller/product/product_controller.php",{action:'add_existing_items_to_product',v_company_id:v_company_id,v_company_name:v_company_name,v_project_id:v_project_id,v_project_name:v_project_name,v_product_type:v_product_type,v_product_code:product_code,v_product_name:v_product_name_new}
                                , function(result,status)
                                {
                                   alert(result);
                                  
                                // finished_id=obj.data[0].finished_product_id;
                               console.log(result); 
                               $("#txt_finished_prd_new_id").val(result);
                                finished_id_last=result;
                               // alert(finished_id_last+ 'change');
                                   
                                   load_data_to_grid_product_details_list(finished_id_last);
                                });
                   
                   if(v_product_type=="Existing")
                   {
                        $("#btn_product_to_master").attr("disabled", true);
                   }
                   else
                   {
                    $("#btn_product_to_master").attr("disabled", false);
                   }
                  
                  
               });
               
               $("#select_type").change(function() {
                     
                        
                         
                         var v_product_type=$("#select_type option:selected").val();
                         var v_product_id=$("#div_company_select option:selected").val();
                         
                         if($.trim(v_product_type)=="New")
                         {
                             $("#new_product_code").show();
                             $("#new_product_name").show();
                             $("#existing_product").hide();
                             $("#txt_product_code").val('');
                             $("#txt_product_name").val('');
                             $("#error_prdt_code").text("");
                             $('#txt_product_name').attr('readonly', false);
                              
                         }
                         else
                         {
                             $("#existing_product").show();
                             $("#new_product_code").hide();
                             $("#new_product_name").hide();
                            //  load_product_select_box('div_product_select','select_product',v__id);
                         }
                         
                });//close of type select

               
            $('#list_of_product tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = product_list_table.row( tr );
         
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
            } );	
			var v_item_code;
                 $('#list_of_stores tbody').on('click', 'td button', function(){
                     
                        var $row = $(this).closest('tr');
                        var data = store_list_table.row($row).data();
                        
                        v_store_id  = data.store_id;
						v_item_code = data.item_code;
					
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
                        
                         if($(this).attr("name")=='edit_item')
                         {
                            $("#txt_rate").val(data.rate_per_unit);
				            $("#txt_vat").val(data.vat_percentage); 
            			    $('#estimate_edit_item_modal').modal('show');
            			
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
						 
		    
            $("#btn_save_change").click(function(){
				var txt_rate = parseFloat($("#txt_rate").val());
				var txt_vat = parseFloat($("#txt_vat").val());
				if(txt_vat == ''){
				  txt_vat=0;  
				}
				if(txt_rate == ''){
				  txt_rate=0;  
				}
                var txt_vat_amount=txt_rate * (txt_vat/100);
                    
                var total_amount=parseFloat(txt_vat_amount)+parseFloat(txt_rate);
              
					$.post("../controller/product/product_controller.php",{action:'edit_store_item_details',v_store_id:v_store_id,v_rate_per_unit:txt_rate,vat_percentage:txt_vat,vat_amount:txt_vat_amount,txt_tot_amount:total_amount}
						, function(result,status)
						{
						   if(result == '1')
						   {
							   swal("Success","Edited successfully ....", "success");
							   load_data_to_grid_store_details_list(v_item_code);
							   $('#estimate_edit_item_modal').modal('hide');
							   $("#txt_rate").val('');
							   $("#txt_vat").val('');
							   $("#txt_rate_per").val((txt_rate.toFixed(3)));
							   $('#txt_vat_label_est').html(txt_vat);
                               $("#txt_vat_tot_amount").val((total_amount.toFixed(3)));
							   var amount = (parseFloat($('#txt_required_qty').val())) * (parseFloat($("#txt_vat_tot_amount").val()));
							   $('#txt_qty_amount_est').val((amount.toFixed(3)));
						   }
                    });
			
			});   

			$('#modal_close').click(function(){
				$("#txt_rate").val('');
				$("#txt_vat").val('');
			});		
                       
            function  edit_data(v_store_id) 
                       {
                           
                       
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
                        
                    
                     $("#txt_vat_label_est").html((parseFloat(data.vat_percentage)).toFixed(2));
                    
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
                   $("#txt_vat_percentage").val(data.vat_percentage);
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
                 $('#btn_view_list_of_store').click(function(){
                     var v_item_code=$("#div_item_select option:selected").text();
                     var v_item_code = v_item_code.split("-");
                     var item_code=$.trim(v_item_code[0]);
                   // var item_name=$.trim(v_item_code[1]);
                    //alert(item_code);
                    load_data_to_grid_store_details_list(item_code); 
                     
                 });
                 
                 
                  $('#btn_go_to_store').click(function(){
                      
                      var go_to_url="primary_store.php";
                      window.open(go_to_url, '_blank');
                  });
                 
                  $('#btn_create_new_product').click(function(){
                     location.reload();
                     
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
                            //$("#error_wid").text("Should be less than "+parseFloat(wid));
                            swal("Should be less than "+parseFloat(wid), {
                                    								title: 'Warning',
                                    								icon: "warning",
                                    							  });
                            $("#txt_width").val(wid);
                         
                 }
                
                });
                $('#txt_height').change(function(){
                 
                 var v_txt_height=$("#txt_height").val();
                   calculate_total_weight();
                 if(parseFloat(v_txt_height) > parseFloat(hght))
                 {
                            //$("#error_hght").text("Should be less than "+parseFloat(hght));
                            swal("Should be less than "+parseFloat(hght), {
                                    								title: 'Warning',
                                    								icon: "warning",
                                    							  });
                            $("#txt_height").val(hght);
                            
                 }
                
                });
                 $('#txt_thickness').change(function(){
                 
                 var v_txt_thickness=$("#txt_thickness").val();
                  calculate_total_weight();
                 if(parseFloat(v_txt_thickness) > parseFloat(thick))
                 {
                           // $("#error_thick").text("Should be less than "+parseFloat(thick));
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
                            //$("#error_wght").text("Should be less than "+parseFloat(wght));
                            swal("Should be less than "+parseFloat(wght), {
                                    								title: 'Warning',
                                    								icon: "warning",
                                    							  });
                            $("#txt_weight").val(wght);
                          
                            
                 }
                
                });
				
				
                $('#txt_required_qty').change(function(){
                 
                 var qty =$(this).val();
				 var tot_amount = $("#txt_vat_tot_amount").val();
				 
				 
				 var amount = qty * (parseFloat(tot_amount));
                  $('#txt_qty_amount_est').val((amount.toFixed(3)));
                  calculate_total_weight();
                 
                
                });
                
                
                  $('#txt_product_qty').blur(function(){
                      //alert("blur");
                       var pdt_qty= $("#txt_product_qty").val();
                       //alert(pdt_qty);
                       if(pdt_qty<0)
                       {
                           swal("Value should be greater than 0", {
                                    								title: 'Warning',
                                    								icon: "warning",
                                    							  });
                       }
                        
                  });
                   $('#txt_required_qty').blur(function(){
                     
                       var pdt_qty= $("#txt_required_qty").val();
                    
                       if(pdt_qty<0)
                       {
                           swal("Value should be greater than 0", {
                                    								title: 'Warning',
                                    								icon: "warning",
                                    							  });
                       }
                       else
                       {
                           calculate_values();
                       }
                        
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
                                       $('#txt_length, #txt_width, #txt_thickness, #txt_weight, #txt_height, #txt_total_weight, #txt_square_meter, #txt_cubic_meter').val(0);
                                       break;
                                    }
                      }
                   
                      
               }



                  
                 $('#txt_product_code').blur(function(){
                 
                 var v_txt_product_code=$("#txt_product_code").val();
                  $.post("../controller/product/product_controller.php",{action:'check_product_code',v_product_code:v_txt_product_code}
                                                , function(result,status)
                                                {
                                              //alert(result);
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
                                                   $("#txt_finished_prd_id").val('');
                                                  
                                                    $('#txt_product_code').val('');
                                                    
                                              }
                                                  
                                                
                         });

                });
                
          
        function calculate_total_weight()
        {
            var current_length=$('#txt_length').val();
            var current_width=$('#txt_width').val();
            var current_thickness=$('#txt_thickness').val();
            var current_weight=$('#txt_weight').val();
            var current_height=$('#txt_height').val();
           console.log("Value:"+isNaN(current_length));
           var current_qty=$('#txt_required_qty').val();
            var current_qty=$('#txt_required_qty').val();
           
             if( parseFloat($('#txt_length').val()) > "0"  || parseFloat($('#txt_width').val()) > "0"  || parseFloat($('#txt_thickness').val())> "0"  || parseFloat($('#txt_weight').val()) > "0"  ) 
            {
                
                // var tot_weight=parseFloat(current_length)*parseFloat(current_width)*parseFloat(current_thickness)*parseFloat(current_weight)*parseFloat(current_qty);
                 tot_weight=parseFloat(current_length)*parseFloat(current_weight)*parseFloat(current_qty);
               // console.log(tot_weight);
                $('#txt_total_weight').val(tot_weight);
            }
            else
            {
                $('#txt_total_weight').val(0);
            }
            
            if( parseFloat($('#txt_length').val()) > "0"  || parseFloat($('#txt_width').val())>"0" ) 
            {
           // var square_meter=parseFloat(current_length)*parseFloat(current_width)*parseFloat(current_qty);
           square_meter=parseFloat(current_length)*parseFloat(current_width)*parseFloat(current_qty);
            //console.log(square_meter);
            $('#txt_square_meter').val(square_meter);
               
            }
            else
            {
             $('#txt_square_meter').val(0);
            }
            
            
            if( parseFloat($('#txt_length').val()) > "0"  || parseFloat($('#txt_width').val())>"0" || parseFloat($('#txt_height').val())>"0" ) 
            {
            //var cubic_meter=parseFloat(current_length)*parseFloat(current_width)*parseFloat(current_height)*parseFloat(current_qty);
               cubic_meter=parseFloat(current_length)*parseFloat(current_width)*parseFloat(current_thickness)*parseFloat(current_qty);
           // console.log(cubic_meter);
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
       
       function clear_text()
        {
          
                  hide_sec_details();
                    $("#txt_product_code").val('');
                    $("#txt_product_name").val("");
                    $("#error_prdt_code").text(""); 
                  
                   
                   
                    $("#select_item_name").val('');
                    $("#select_item_name").val('');
                    $("#txt_required_qty").val('');
                    $("#txt_product_code").val('');
                    $("#txt_product_name").val('');
                    
                    $("#txt_length").val(0);
                    $("#txt_width").val(0);
                    $("#txt_height").val(0);
                    $("#txt_thickness").val(0);
                    $("#txt_weight").val(0);
                    $("#txt_total_weight").val('');
                    $("#txt_square_meter").val('');
                    $("#txt_cubic_meter").val('');
                    $("#txt_units_name").val('');
                    $("#txt_units_id").val('');
                    $("#txt_secondary_rate_per_unit").val('');
                    
                    $("#txt_product_qty").val('');
                  
                     $("#cal_value").text('');
                      //$('#select_type option:selected').text('New');
                       //$('#select_product_unit').children('option').first().prop('selected', true)
                    //$('#select_product_unit').trigger("chosen:updated");
                   
                      $('#select_product_type').children('option').first().prop('selected', true)
                    $('#select_product_type').trigger("chosen:updated");
                    $('#select_type').children('option').first().prop('selected', true)
                    $('#select_type').trigger("chosen:updated");
                    $('#select_category_name').children('option').first().prop('selected', true)
                    $('#select_category_name').trigger("chosen:updated");
                    //  $('#select_company_name').children('option').first().prop('selected', true)
                    // $('#select_company_name').trigger("chosen:updated");
                    //  $('#select_project_name').children('option').first().prop('selected', true)
                    // $('#select_project_name').trigger("chosen:updated");
                    //$('#div_product_unit_select').children('option').first().prop('selected', true)
                   // $('#div_product_unit_select').trigger("chosen:updated");
                     $('#select_item_name').children('option').first().prop('selected', true)
                    $('#select_item_name').trigger("chosen:updated");
                    
                // load_product_unit_select_box('div_product_unit_select','select_product_unit'); 
                 
                 $('#div_product_unit_select').load('templates/unit_combo.php');
            
            //   load_category_select_box('div_category_select','select_category_name');
               
            //   load_company_select_box('div_company_select','select_company_name');
               
            //   load_project_select_box('div_project_select','select_project_name');
                           
            //   load_item_select_box('div_item_select','select_item_name');

            
        }     
        
       
        function load_data_to_grid_product_details_list(finished_id)
                 {
                    
                     product_list_table.destroy();
                         
                     product_list_table = $('#list_of_product').DataTable( {
                            
                             "ajax": {
                                 'type': 'POST',
                                 'url': '../controller/product/product_controller.php',
                                 'data': {
                                    action: 'list_item_details',
                                    v_finished_id:finished_id
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
            				  scrollX: true,
            				 "bAutoWidth": false,
            				 
            				
                            "columns": [
                                  {
                                    "className":  'details-control',
                                    "orderable":  false,
                                    "data":        null,
                                    "defaultContent": '',
                                    "width":'10px'
                                 },
                                { "data": null },
                                 
                                 
                                 { "data": "category_name" },
                                 { "data": "item_name"},
            					 { "data": "quantity"},
            					     
							           
            				
                                 { "data": "units"},
            					 { "data": "rate_per_unit",className: "text-right"},
            				 	 { "data": "total_weight",className: "text-right"},
            					 { "data": "square_meter",className: "text-right"},
            					 { "data": "cubic_meter",className: "text-right"},
            					  { "data": "vat_percentage",className: "text-right"},
                                 
            					  
            					  { "data": "total_amount",className: "text-right"},
            					
                                     { "data": "product_item_id",
                                 
                                     render: function ( data, type, rows, meta ) {
            						
            									str_active_status_delete = ' <button type="button" class="btn btn-sm btn-danger mr-1"  id="delete_product" name="delete_product" ><i class="material-icons ">delete</i></button>';
            								
            								return str_active_status_delete;
            
            							 },
                                     
                                 },
                                 
                                { "data": "product_item_id",
                                     
                                      render: function ( data, type, rows, meta ) {
                                                                    
                                          	    //str_active_statu = '<a class="col-3 col-sm-2 col-xl-1 mb-3 btn-floating" id="update_qty_'+rows['requisition_note_entries_id']+'" name="update_qty"><i class="material-icons icon-circle icon-50 primary-gradient">check_circle</i></a>';
                								
                							str_active_statu ='<button type="button"  class="btn btn-sm btn-primary mr-1" id="edit_qty" name="edit_qty" ><i class="material-icons">check_circle</i></button>';
                						
                					            
                								return str_active_statu;
                                         
                                        
                                         }
                                 }
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
                             pageLength: 1000,
            				 searching: false,
                            
                             "aoColumnDefs": [
            					{ "bSortable": false, "aTargets": [  0,1,2,3,4,5,6,7,8,9,10,11,12,13] }, 
            					{ width: '10px', targets: 3 },
            					
            				],
                            
                                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                 $("td:eq(1)", nRow).html(iDisplayIndex + 1);
                                 return nRow;
                              },
                            
                                    
                     });  
                
                 }
                 
                 
                // $('#list_of_product').on('click', 'input[type="button"]', function(){
                    
                //     //alert("inside");
                    
                //     var $row = $(this).closest('tr');
                //     var data = product_list_table.row($row).data();
                //     product_item_id=data.product_item_id;
                //     quantity  = data.quantity;
                //     rate_per_unit=data.rate_per_unit;
                //     //if($(this).prop("checked") == false){
                    
                //         $('#deli_qty_'+quantity).attr('readonly', false);
                //         $('#deli_qty_'+quantity).css('background-color' , '#FFFFFF');  
                //     //}
                //      //else if($(this).prop("checked") == true){
                         
                //       var req_qty=$('#deli_qty_'+quantity).val();
                //       var total_amnt=parseFloat(req_qty)*parseFloat(rate_per_unit);
                //         //$('#deli_qty_'+quantity).attr('readonly', true);
                //         //$('#deli_qty_'+quantity).css('background-color' , '#DEDEDE'); 
                //         $.post("../controller/product/product_controller.php",{action:'update_item_qty',v_product_item_id:product_item_id,v_quantity:req_qty,v_total_amt:total_amnt}
                        
                //             , function(result,status)
                //                 {
                //                     console.log(result);
                //         }); 
                //   // }
                // });
                 
                 
         function format(d)
    		{
    		
			return '<table style="table-layout: fixed; width: 100%; word-wrap: break-word;">'+
			 '<tr style="background: #9A3CEC;color:#ffffff;">'+
			    '<td ><div align="center">Length</div></td>'+
				'<td ><div align="center">Width</div></td>'+
				// '<td ><div align="center">Height</div></td>'+
				'<td ><div align="center">Thickness</div></td>'+
				'<td ><div align="center">Weight</div></td>'+
				
				
			  '</tr>'+
			  '<tr>'+
				'<td><div align="right">'+d.length+'</div></td>'+
				'<td><div align="right">'+d.width+'</div></td>'+
				// '<td><div align="right">'+d.height+' </div></td>'+
				'<td><div align="right">'+d.thickness+' </div></td>'+
				'<td><div align="right">'+d.weight+' </div></td>'+
				
				
			  '</tr>'+
			 
			'</table>' ;
			
		
		
		}
		

		 function format_item(d)
		{
		
			return '<table style="table-layout: fixed; width: 100%; word-wrap: break-word;">'+
			 '<tr style="background: #989898;color:#ffffff;">'+
			    '<td ><div align="center">Precision % </div></td>'+
				'<td ><div align="center">Length </div></td>'+
				'<td ><div align="center">Width </div></td>'+
				// '<td ><div align="center">Height </div></td>'+
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
				// '<td ><div align="center">'+d.height+'</div></td>'+
				'<td><div align="center">'+d.thickness+'</div></td>'+
				'<td><div align="center">'+d.weight+'</div></td>'+
				'<td ><div align="center">'+d.sec_unit_name+'</div></td>'+
				'<td><div align="center">'+d.total_weight+'</div></td>'+
				'<td><div align="center">'+d.square_meter+'</div></td>'+
				'<td><div align="center">'+d.cubic_meter+'</div></td>'+
				'<td ><div align="center">'+d.sec_rate_per_unit+'</div></td>'+
			  '</tr>'+
			 '<tr style="background: #989898;color:#ffffff;">'+
			    
			    '<td colspan="10"><div align="center">Session Image </div></td>'+
			  '</tr>'+
			  '<tr>'+
				
				
				'<td colspan="10"><div align="center"><img src=../../httpdocs/images/session_image/'+$.trim(d.session_image)+' height="200px" width="250px"/></div></td>'+
			  '</tr>'+
			  
			
			  
			'</table>' ;
			
		
		
		}
		function load_data_to_grid_store_details_list(item_code)
                 {
                     store_list_table.destroy();
                         
                     store_list_table = $('#list_of_stores').DataTable( {
                            
                             "ajax": {
                                 'type': 'POST',
                                 'url': '../controller/product/product_controller.php',
                                 'data': {
                                    action: 'list_store_details_company_select',
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
                             pageLength: 20,
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
                 
                 
                 
                 
                 $('#list_of_product tbody').on('click', 'td button', function(){
                     
                        var $row = $(this).closest('tr');
                        var data = product_list_table.row($row).data();
                        
                        v_product_id  = data.product_item_id;
                        v_finished_product_id  = data.finished_product_id;
                        
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
                                        						
                                        						       delete_product(v_product_id,v_finished_product_id);
                                                     						 
                                        							} else {
                                        							    
                                        							   
                                        							 
                                        							}
                                        						 });
                         }
                         
          
                 
                function delete_product(v_product_id,v_finished_product_id)
                    {
                        
                        $.post("../controller/product/product_controller.php",{action:'cancel_product_item_details',v_product_id:v_product_id}
                                                , function(result,status)
                                                {
                                            
                                    							 load_data_to_grid_product_details_list(v_finished_product_id);
                                                    
                         });
                         
                         
                       
                    }
                    
                     if($(this).attr("name")=='edit_qty')
                         { 
                             $('#modal_quantity_change').modal('show');
                             var $row = $(this).closest('tr');
                               var data = product_list_table.row($row).data();
                             
                            
                             $('#txt_reissue_qty').val(data.quantity);
                              $('#txt_rate_per_unit').val(data.vat_amount);
                               $('#txt_pdt_item_id').val(data.product_item_id);
                                $('#txt_pdt_finished_id').val(data.finished_product_id);
                              
                              $('#txt_width').val(data.width);
                              $('#txt_length').val(data.length);
                               $('#txt_thickness').val(data.thickness);
                                $('#txt_weight').val(data.weight);
                             
                            
                         }
                 
                 }); 
                 
                   $('#btn_update_item_qty').click(function(){
                   var v_qty_new=$("#txt_reissue_qty").val();
                   var v_rate_per_unit=$("#txt_rate_per_unit").val();
                   var v_length=$("#txt_length").val();
                   var v_width=$("#txt_width").val();
                   var v_thickness=$("#txt_thickness").val();
                   var v_weight=$("#txt_weight").val();
                   
                    var total_amnt=parseFloat(v_qty_new)*parseFloat(v_rate_per_unit);
                    total_weight=parseFloat(v_length)*parseFloat(v_weight)*parseFloat(v_qty_new);
                    square_meter=parseFloat(v_length)*parseFloat(v_width)*parseFloat(v_qty_new);
                    cubic_meter=parseFloat(v_length)*parseFloat(v_width)*parseFloat(v_thickness)*parseFloat(v_qty_new);
                    var finish_id= $('#txt_pdt_finished_id').val();
                     var product_item_id= $('#txt_pdt_item_id').val();
                     if($.trim(v_qty_new)=='')
                     {
                                                    swal("Please Provide Quantity", {
                                    					title: 'Warning',
                                    					icon: "warning",
                                    				  }); 
                         
                     }
                     else
                     {
                     $.post("../controller/product/product_controller.php",{action:'update_item_qty',v_product_item_id:product_item_id,v_quantity:v_qty_new,v_total_amt:total_amnt,v_total_weight:total_weight,v_square_meter:square_meter,v_cubic_meter:cubic_meter}
                                    
                                        , function(result,status)
                                            {
                                                console.log(result);
                                                console.log(status);
                                                
                                                if(status=='success')
                                                {
                                                    swal("Quantity Changed", {
                                    					title: 'Success',
                                    					icon: "success",
                                    				  }); 
                                                    // v_btn_reissue_qnty.ladda( 'stop' );
                                                     $('#modal_quantity_change').modal('hide');
                                                     load_data_to_grid_product_details_list(finish_id);
                                                      product_div_value();
                                                      product_rate_per_unit_cal();
                                                     $('#btn_issue').hide();
                                                 } 
                                                  else
                                                  {
                                                     // v_btn_reissue_qnty.ladda( 'stop' ); 
                                                  }
                                    }); 
                     }           
                   
                 
                   }); 
        v_btn_finished_product_add.click(function(){
        
        if(flag!=1)
         {
          swal("Warning","Please calculate the Amount ....", "warning");
                        v_btn_finished_product_add.ladda( 'stop' );
                        return false;
        }
        else
        {
              v_btn_finished_product_add.ladda( 'start' );
            var v_finished_id_new=$("#txt_finished_prd_new_id").val();
           // alert(v_finished_id_new+'last button');
            var v_company_id=$("#div_company_select option:selected").val();
                   
            var v_company_name=$("#div_company_select option:selected").text();
            var v_project_id=$("#div_project_select option:selected").val();
            var v_project_name=$("#div_project_select option:selected").text();
            var v_product_type=$("#div_type_select option:selected").val();
            var v_store_id=$("#txt_store_id").val();
                    if(v_product_type=="New")
                    {
                        var v_product_code=$("#txt_product_code").val();
                        var v_product_name_new=$("#txt_product_name").val();
                        
                    }
                    else
                    {
                        var v_product_id=$("#existing_product option:selected").val();
                        var v_product_code=$("#existing_product option:selected").val();
                        //alert(v_product_code)
                        var v_product_name=$("#existing_product option:selected").text();
                         var ret = v_product_name.split("---");
                        var str1 = ret[0];
                        var v_product_name_new = ret[1];
                        var finished_id=finished_id_last;
                    }
                    if(v_product_id==0)
                    {
                        v_product_id=0;
                    }
            var v_labour_cost_type=$("#div_labour_cost_type_select option:selected").text();
                   
            var v_labour_cost=$("#txt_labour_cost").val(); 
            var v_service_cost_type=$("#div_service_cost_type_select option:selected").text();
            var v_service_cost=$("#txt_service_cost").val();
            var v_euipment_cost_type=$("#div_euipment_cost_type_select option:selected").text();
            var v_euipment_cost=$("#txt_euipment_cost").val();
            var v_other_cost_type=$("#div_other_cost_type_select option:selected").text();
            var v_other_cost=$("#txt_other_cost").val();
            var v_margin_cost_type=$("#div_margin_cost_type_select option:selected").text();
            var v_margin_cost=$("#txt_margin_cost").val();
            
             v_product_qty=$("#txt_product_qty").val();
            var v_product_unit_id=$("#div_product_unit_select option:selected").val();
            var v_product_unit_name=$("#div_product_unit_select option:selected").text();
            product_rate_per_unit_cal();
            v_pdt_rate_per_cal=txt_total_amount_cal;
            txt_tot_amount=$('#txt_total').val();
            var total_amount_report=parseFloat(v_pdt_rate_per_cal)*parseFloat(v_product_qty);
           // alert(total_amount_report);
            
            if($.trim(v_company_id)=="0"||$.trim(v_company_name)==""||$.trim(v_project_id)=="select"||$.trim(v_project_name)==""||$.trim(v_product_qty)==""||$.trim(v_product_unit_id)=="0")
                    
                {
                    swal("Warning","Please provide all the details ....", "warning");
                    v_btn_finished_product_add.ladda( 'stop' );
                    return false;
                }
            else
                {
        
             //alert(finished_id);   
                    $.post("../controller/product/product_controller.php",{action:'add_to_product',v_finished_id:v_finished_id_new,v_labour_cost_type:v_labour_cost_type,v_labour_cost:v_labour_cost,v_service_cost_type:v_service_cost_type,v_service_cost:v_service_cost,v_euipment_cost_type:v_euipment_cost_type,v_euipment_cost:v_euipment_cost,v_other_cost_type:v_other_cost_type,v_other_cost:v_other_cost,v_margin_cost_type:v_margin_cost_type,v_margin_cost:v_margin_cost,v_company_id:v_company_id,v_company_name:v_company_name,v_project_id:v_project_id,v_project_name:v_project_name,v_product_code:v_product_code,v_product_name:v_product_name_new,v_product_qty:v_product_qty,v_product_unit_id:v_product_unit_id,v_product_unit_name:v_product_unit_name,txt_tot_amount:txt_tot_amount,v_pdt_rate_per_cal:v_pdt_rate_per_cal,v_labour_cost_amnt:labour_cost_amnt,v_service_cost_amnt:service_cost_amnt,v_euipment_cost_amnt:euipment_cost_amnt,v_other_cost_amnt:other_cost_amnt,v_margin_cost_amnt:margin_cost_amnt,v_total_amount_report:total_amount_report}
                     , function(result,status)
                                {
                                    
                               console.log(result); 
                                result = $.trim(result);
                                 
                                if(result.charAt(0)=='U')
                                {
                                    v_btn_finished_product_add.ladda( 'stop' );
                                    swal("Error", result, "error");
                                    
                                    clear_text();
                                    $('#select_company_name').children('option').first().prop('selected', true)
                                    $('#select_company_name').trigger("chosen:updated");
                                    $('#select_project_name').children('option').first().prop('selected', true)
                                    $('#select_project_name').trigger("chosen:updated");

                                
                                }
                                else 
                                {
                                     v_btn_finished_product_add.ladda( 'stop' );
                                    
                                     swal("Success"," Estimation added Successfully", "success");
                                    
                                    $('#txt_product_code').removeClass("disabledbutton");
                                    $('#txt_product_name').removeClass("disabledbutton");
                                    $("#div_company_select").removeClass("disabledbutton");
                                    $("#select_project_name_chosen").removeClass("disabledbutton");
                                    $("#div_type_select").removeClass("disabledbutton");
                                    
                                     $('#txt_product_qty').removeClass("disabledbutton");
                                    $('#div_product_unit_select').removeClass("disabledbutton");
                                   //location.reload();
                                   //$("#txt_finished_prd_new_id").val('');
                                   clear_text();
                                   load_data_to_grid_product_details_list();
                                }
                                
                                 
                            
                        });  
                }
             
        }
        
         
        });
        
        
        
        $('#btn_calculate').click(function(){
             flag=1;
             $('#figures_show').show(1000);
             v_product_qty=$("#txt_product_qty").val();
             if($.trim(v_product_qty)=="")
             {
                    swal("Warning","Please provide product quantity ....", "warning");
                    
                   
             }
             product_rate_per_unit_cal();
    //       alert(txt_total_amount_cal);
      //     product_div_value();
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
    
     v_product_qty=$("#txt_product_qty").val();
     txt_total_amount_calnew = parseFloat(txt_tot_amount)/ parseFloat(v_product_qty);
     txt_total_amount_cal=parseFloat(txt_total_amount_calnew,10).toFixed(3);
     
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
       
        
        $('#btn_view_list_of_products1').click(function(){
            
           //alert("inside click");
                    //openNavR1();
            load_data_to_grid_all_product_details_list(); 
             $("#btn_product_add").attr("disabled", true);
             $("#btn_finished_product_add").attr("disabled", true);
                     
        });
        
         $('#btn_close_list_of_products1').click(function(){
            
           
             $("#btn_product_add").attr("disabled", false);
             $("#btn_finished_product_add").attr("disabled", false);
                     
        });
        
         $('#estimation_cancel').click(function(){
            
			
			$('#txt_rate_per').val('');
			$('#txt_vat_tot_amount').val('');
			$('#txt_qty_amount_est').val('');
          clear_text_item();
            
                     
        });
        
        
        
        
         function load_data_to_grid_all_product_details_list()
                 {
                     product_all_list_table.destroy();
                         
                     product_all_list_table = $('#list_of_all_product').DataTable( {
                            
                             "ajax": {
                                 'type': 'POST',
                                 'url': '../controller/product/product_controller.php',
                                 'data': {
                                    action: 'list_all_finihed_product_details'
                                   
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
                                  
                                { "data": null },
                                 
                                 
                                //  { "data": "company_name" , visible:"false"},
                                 { "data": "pjt_company", "visible":false},
            					 //{ "data": "product_code"},
                                 { "data": "product_name"},
                                 { "data": "product_unit"},
            					 { "data": "product_qty"},
            					
                                 { "data": "product_primary_amt",className: "text-right",
                                  render: function ( data, type, rows ) {
            						
            								return '<span style="font-weight:bold;color:#000000">'+rows['product_primary_amt']+ '</span>';
            								
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
            								return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['labour_cost_amt'])).toFixed(3)+'</span>'+'   (' +(parseFloat(rows['labour_cost'])).toFixed(3) + ''+ rows['labour_cost_type']+')';
            								}
            
            							 },
                                 },
            				 
            					 
            					 { "data": "equipment_cost",className: "text-right",
            					 render: function ( data, type, rows ) {
            						
            								if(rows['equipment_cost_type']=='%')
            								{
            								  
            								return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['equipment_cost_amt'])).toFixed(3) +'</span>'+'   ('+(parseFloat(rows['equipment_cost'])).toFixed(2)+ '%)';
            								}
            								else
            								{
            								return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['equipment_cost_amt'])).toFixed(3) +'</span>'+'   ('+(parseFloat(rows['equipment_cost'])).toFixed(3) + ''+ rows['equipment_cost_type']+')';
            								}
            
            							 },
                                 },
            					 	 { "data": "service_cost",className: "text-right",
            				 	 render: function ( data, type, rows ) {
            						
            									if(rows['service_cost_type']=='%')
            								{
            								return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['service_cost_amt'])).toFixed(3)+'</span>'+'   ('+(parseFloat(rows['service_cost'])).toFixed(2) +'%)';
            								}
            								else
            								{
            									return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['service_cost_amt'])).toFixed(3)+'</span>'+'   ('+(parseFloat(rows['service_cost'])).toFixed(3) + ''+ rows['service_cost_type']+')';
            								}
            
            							 },
                                 },
            					 { "data": "other_cost",className: "text-right",
            					 render: function ( data, type, rows ) {
            						
            								if(rows['other_cost_type']=='%')
            								{
            								return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['other_cost_amt'])).toFixed(3)+'</span>'+'    ('+(parseFloat(rows['other_cost'])).toFixed(2)+  '%)';
            								}
            								else
            								{
            									return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['other_cost_amt'])).toFixed(3)+'</span>'+'    ('+(parseFloat(rows['other_cost'])).toFixed(3) + ''+ rows['other_cost_type']+ ')';
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
            									return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['margin_cost_amt'])).toFixed(3)+'</span>'+'   ('+(parseFloat(rows['margin_cost'])).toFixed(3) + ''+ rows['margin_cost_type']+')';
            								}
            
            							 },
                                 },
                                 { "data": "total_amt_report",
                                   render: function ( data, type, rows ) {
                                    return '<span style="font-weight:bold;color:#000000">'+rows['total_amt_report'] +'</span>';
                                   }		
                                  },
                                  { "data": "product_rate_per_unit_cost",
                                   render: function ( data, type, rows ) {
                                    return '<span style="font-weight:bold;color:#000000">'+rows['product_rate_per_unit_cost'] +'</span>';
                                   }		
                                  },
                                  { "data": "company_id",
                                 
                                     render: function ( data, type, rows, meta ) {
            						
            									str_active_status_delete = ' <button type="button" class="btn btn-sm btn-danger mr-1"  id="delete_product_details" name="delete_product_details" ><i class="material-icons ">delete</i></button>';
            								
            								return str_active_status_delete;
            
            							 },
                                     
                                 },
            					 { "data": "company_id",
                                 
                                     render: function ( data, type, rows, meta ) {
            						
            									str_product_item_list = '<button class="btn btn-sm btn-success mr-1" onclick="openNavR3()"  id="btn_product_item_details_list_prmry" ><i class="material-icons ">arrow_forward</i></button>';
            								
            								return str_product_item_list;
            
            							 },
                                     
                                 },
            					 
            					 { "data": "company_id",
                                 
                                     render: function ( data, type, rows, meta ) {
            						
            									str_product_item_list = '<button class="btn btn-sm btn-info mr-1" onclick="openNavR2()"  id="btn_product_item_details_list" ><i class="material-icons ">fast_forward</i></button>';
            								
            								return str_product_item_list;
            
            							 },
                                     
                                 },

                                 
                             ],
                            
                             pageLength: 1000,
            				 searching: true,
                            //responsive: true,
                             "aoColumnDefs": [
            					{ "bSortable": false, "aTargets": [  0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] }, 
            					
            				],
            				
            				 "order": [
                                  [1, 'asc']
                                ],
                                
                                //  "drawCallback": function (settings) {
                                       
                                //         var api = this.api();
                                    
                                //       var rows = api.rows({
                                //         page: 'current'
                                //       }).nodes();
                                //       var last = null;
                            
                                //       api.column(1, {
                                //         page: 'current'
                                //       }).data().each(function (group, i) {
                                //         if (last !== group) {
                                //           $(rows).eq(i).before(
                                           
                                //             '<tr class="group" style="background-color:#3399ff;font-size: 16px;color:white;font-weight: bold; "><td colspan="15">' + group + '</td></tr>'
                                //           );
                                          
                                //             last = group;
                                //       }
                                //       });
                                //       $('.dataTables_paginate > .pagination').addClass('pagination-sm');
                                //  },
                                 "drawCallback": function (settings) {
                                    var api = this.api();
                                    var rows = api.rows({ page: 'current' }).nodes();
                                    var last = null;
                                
                                    api.column(1, { page: 'current' }).data().each(function (group, i) {
                                        if (last !== group) {
                                             console.log(group);
                                            // Separate the Company and Project parts
                                            var parts = group.split(",");
                                            var company = parts[0]; 
                  
                                            var project = parts[1]; 
                                
                                            // Create the formatted HTML
                                            var html = '<span style="font-size: 16px;">' + company + '</span>';
                                            if (project) {
                                                html += '<span style="font-size: 12px;"> , ' + project + '</span>';
                                            }
                                
                                            // Insert the new HTML
                                            $(rows).eq(i).before(
                                                '<tr class="group" style="background-color:#3399ff;color:white;font-weight: bold;"><td colspan="15">' + html + '</td></tr>'
                                            );
                                
                                            last = group;
                                        }
                                    });
                                },


                                
                                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                 $("td:eq(0)", nRow).html(iDisplayIndex + 1);
                                 return nRow;
                              },
                            
                                    
                     }); 
                     
                               
                
         }

     $('#list_of_all_product tbody').on('dblclick', 'tr', function(){
                        var $row = $(this).closest('tr');
                        var data = product_all_list_table.row($row).data();
                        
                        v_edit_finished_product_id  = data.finished_product_id;
                        v_product_id  = data.product_id;
                        v_product_code  = data.product_code;
                        v_product_type = data.product_code;
                    flag=0;
                    $("#project_name").val('');
                    $("#reference_no").val('');
                    $("#signed_date").val('');
                    $("#txt_phone_number").val('');
                    $("#txt_contact_person").val('');
                    $("#txt_address").val('');
                    $("#txt_fax_number").val('');
                    $("#txt_contact_value").val('');
                    $("#txt_variations").val('');
                    //load_company_select_box('div_company_select','select_company');
                        
                    //load_tax_select_box('div_tax_select','select_tax');
                    $("#txt_description").val('');
                    
                        $( '#btn_product_add' ).hide();
                        $( '#btn_edit_product' ).show();
                        
                        
                       
                       swal("Confirm","Do you want to Edit ?", {
                                      buttons: {
                                        cancel: "Cancel",
                                        catch: {
                                          text: "Edit",
                                          value: "catch",
                                        }
                                      },
                                      icon:"warning",
                                    })
                                    .then((value) => {
                                      switch (value) {
                                     
                                       
                                     
                                          case "catch":
                                          
                                          //swal("Edit!", "Please Edit your data", "success");
                                          edit_product_data(v_edit_finished_product_id,v_product_id,v_product_code);
                                          closeNavR1();
                                          
                                          break;
                                     
                                        default:
                                         
                                      }
                            
                       });    
                        
                        
                     function  edit_product_data(v_edit_product_id,v_product_id,v_product_code) 
                       {
                        $('#btn_finished_product_add').hide();       
                        $('#btn_finished_product_edit').show();
                        $('#estimation_cancel').hide();
                       // $('#div_main_type_select').hide();
                       
                            $("#existing_product").hide();
                            $("#new_product_code").show();
                            $("#new_product_name").show();
                        $("#txt_finished_product_id_for_edit").val(v_edit_product_id);
                        $("#txt_product_code_for_edit").val(v_product_code);
                        $("#txt_product_id_for_edit").val(v_product_id);
                     
                    $.post("../controller/product/product_controller.php",{action:'list_item_details_for_edit',v_finished_id:v_edit_product_id}
                            , function(result,status)
                                {
                                            
                              //alert(result)  ;    		
                                    		
                              var obj= jQuery.parseJSON(result);
                      
                              $("#txt_pro_id").val(obj.data[0].project_id);   
                     
                         $("#select_company_name").val(obj.data[0].company_id).trigger("change");
                        $("#select_company_name").trigger("chosen:updated");
                        
                        
                    $('#txt_product_name').val(obj.data[0].product_name);
                    
                    $("#select_type").find('option').removeAttr("selected");
                         $('#select_type option').map(function () {
                        if ($(this).text() == obj.data[0].product_type) return this;
                        }).attr('selected', 'selected');
                        
                    
                    $('#txt_product_qty').val(obj.data[0].product_qty);
                    
                    
                     $("#select_product_unit").find('option').removeAttr("selected");
                         $('#select_product_unit option').map(function () {
                        if ($(this).val() == obj.data[0].product_unit_id) return this;
                        }).attr('selected', 'selected');
                   
                     
                     $("#select_product_unit").trigger("chosen:updated");
                     var v_product_type=obj.data[0].product_type;
                      if(v_product_type=="Existing")
                    {
                        //var v_product_code=$("#txt_product_code").val();
                         $('#txt_product_name').addClass("disabledbutton");
                          $('#select_type').addClass("disabledbutton");
                     
                    }
                    else
                    {
                        $('#txt_product_name').removeClass("disabledbutton");
                          $('#select_type').addClass("disabledbutton");
                    }
                     
                     load_data_to_grid_product_details_list(v_edit_product_id);
                     
            
            
           
            $("#div_labour_cost_type_select").find('option').removeAttr("selected");
                         $('#div_labour_cost_type_select option').map(function () {
                        if ($(this).text() == obj.data[0].labour_cost_type) return this;
                        }).attr('selected', 'selected');
            
            $("#txt_labour_cost").val(obj.data[0].labour_cost);
            
            $("#div_service_cost_type_select").find('option').removeAttr("selected");
                         $('#div_service_cost_type_select option').map(function () {
                        if ($(this).text() == obj.data[0].service_cost_type) return this;
                        }).attr('selected', 'selected');
            
            $("#txt_service_cost").val(obj.data[0].service_cost);
            
            $("#div_euipment_cost_type_select").find('option').removeAttr("selected");
                         $('#div_euipment_cost_type_select option').map(function () {
                        if ($(this).text() == obj.data[0].equipment_cost_type) return this;
                        }).attr('selected', 'selected');
            
            $("#txt_euipment_cost").val(obj.data[0].equipment_cost);
            
            $("#div_other_cost_type_select").find('option').removeAttr("selected");
                         $('#div_other_cost_type_select option').map(function () {
                        if ($(this).text() == obj.data[0].other_cost_type) return this;
                        }).attr('selected', 'selected');
            
            $("#txt_other_cost").val(obj.data[0].other_cost);
                     
            $("#div_other_cost_type_select").find('option').removeAttr("selected");
                         $('#div_other_cost_type_select option').map(function () {
                        if ($(this).text() == obj.data[0].other_cost_type) return this;
                        }).attr('selected', 'selected');
            
            $("#txt_other_cost").val(obj.data[0].other_cost);    
            
            $("#div_margin_cost_type_select").find('option').removeAttr("selected");
                         $('#div_margin_cost_type_select option').map(function () {
                        if ($(this).text() == obj.data[0].margin_cost_type) return this;
                        }).attr('selected', 'selected');
            
            $("#txt_margin_cost").val(obj.data[0].margin_cost);  
            
            $('#figures_show').show(1000);
            $("#cal_value").text(obj.data[0].product_rate_per_unit_cost);
            
            
                                });
                   
                       }  
                        
                 });
       
         v_btn_edit_product.click(function(){
        
            v_btn_edit_product.ladda( 'start' );
                    var v_company_id=$("#div_company_select option:selected").val();
                    var v_company_name=$("#div_company_select option:selected").text();
                    var v_project_id=$("#div_project_select option:selected").val();
                    var v_project_name=$("#div_project_select option:selected").text();
                    var v_product_type=$("#div_type_select option:selected").val();
                    var v_store_id=$("#txt_store_id").val();
                    var v_finished_id=$("#txt_finished_product_id_for_edit").val();
                    var v_product_name_new=$("#txt_product_name").val();
                    var v_product_id= $("#txt_product_id_for_edit").val();
                    var v_product_code=$("#txt_product_code_for_edit").val();
                    var v_category_id=$("#div_category_select option:selected").val();
                    var v_category_name=$("#div_category_select option:selected").text();
                    var v_item_id=$("#select_item_name").val();
                    var v_item_name=$("#div_item_select option:selected").text();
                    var v_required_qty=$("#txt_required_qty").val();
                    var v_txt_length=$("#txt_length").val();
                    var v_txt_width=$("#txt_width").val();
                    var v_txt_height=$("#txt_height").val();
                    var v_txt_thickness=$("#txt_thickness").val();
                    var v_txt_weight=$("#txt_weight").val();
                    var v_total_weight=$("#txt_total_weight").val();
                    var v_square_meter=$("#txt_square_meter").val();
                    var v_cubic_meter=$("#txt_cubic_meter").val();
                    var v_units_name=$("#txt_units_name").val();
                    var v_units_id=$("#txt_units_id").val();
                   // var v_rate_per_unit=$("#txt_primay_rate_per_unit").val();
                     var v_rate_per_unit=$("#txt_rate_per").val(); 
                    
                    var vat_percentage= $("#txt_vat_percentage").val();
                    var vat_prct_amount=parseFloat(v_rate_per_unit)*parseFloat(vat_percentage)/100;  
                    var vat_amount= $("#txt_vat_amount").val();              
                    var vat_prct_amount=$("#txt_vat_prct_amount").val();  
                    var sec_unit_id=$("#txt_sec_unit_id").val();
                    var sec_unit_name=$("#txt_sec_unit_name").val();
                    var sec_rate_per_unit=$("#txt_secondary_rate_per_unit").val();
                    
                    var sec_total_amt=parseFloat(sec_rate_per_unit)*parseFloat(v_total_weight)+parseFloat(sec_rate_per_unit)*parseFloat(v_square_meter)+parseFloat(sec_rate_per_unit)*parseFloat(v_cubic_meter);
                    var total_amt=parseFloat(vat_amount)*parseFloat(v_required_qty);
                    
                   // if($.trim(v_company_id)=="0"||$.trim(v_project_id)=="select"||$.trim(v_category_id)=="0"||$.trim(v_item_id)=="select"||$.trim(v_product_qty)==""||$.trim(v_product_unit_name)==""||$.trim(v_required_qty)=="")
                    if($.trim(v_company_id)=="0"||$.trim(v_project_id)=="select"||$.trim(v_category_id)=="0"||$.trim(v_item_id)=="select"||$.trim(v_required_qty)=="")
                    {
                        swal("Warning","Please provide all the details ....", "warning");
                        v_btn_edit_product.ladda( 'stop' );
                        return false;
                    }
                    
                 $.post("../controller/product/product_controller.php",{action:'add_to_finished_product_existing_new',v_finished_id_last:v_finished_id,v_company_id:v_company_id,v_company_name:v_company_name,v_project_id:v_project_id,v_project_name:v_project_name,v_product_type:v_product_type,v_product_code:v_product_code,v_product_id:v_product_id,v_product_name:v_product_name_new,category_id:v_category_id,v_category_name:v_category_name,v_item_id:v_item_id,v_item_name:v_item_name,v_required_qty:v_required_qty,v_txt_length:v_txt_length,v_txt_width:v_txt_width,v_txt_height:v_txt_height,v_txt_thickness:v_txt_thickness,v_txt_weight:v_txt_weight,v_total_weight:v_total_weight,v_square_meter:v_square_meter,v_cubic_meter:v_cubic_meter,v_units_name:v_units_name,v_units_id:v_units_id,v_rate_per_unit:v_rate_per_unit,v_total_amt:total_amt,v_store_id:v_store_id,vat_percentage:vat_percentage,vat_amount:vat_amount,vat_prct_amount:vat_prct_amount,sec_unit_id:sec_unit_id,sec_unit_name:sec_unit_name,sec_rate_per_unit:sec_rate_per_unit,sec_total_amt:sec_total_amt}
                        , function(result,status)
                                {
                                
                                if(status!="success")
                                {
                                    v_btn_edit_product.ladda( 'stop' );
                                    swal("Error", result, "error");
                                }
                                else 
                                {
                                    v_btn_edit_product.ladda( 'stop' );
                                    swal("Success"," Item added Successfully", "success");
                                    clear_text_item();
                                    load_data_to_grid_product_details_list(v_finished_id);
                   
                                }
                     
                  
                });
            
            
         });
         
         v_btn_finished_product_edit.click(function(){
                    
                    v_btn_finished_product_edit.ladda( 'start' );
                    if(flag!=1)
         {
          swal("Warning","Please calculate the Amount ....", "warning");
                        v_btn_finished_product_edit.ladda( 'stop' );
                        return false;
        }
        else
        {
              var v_finished_id=$("#txt_finished_product_id_for_edit").val();
                    var v_company_id=$("#div_company_select option:selected").val();
                    var v_company_name=$("#div_company_select option:selected").text();
                    var v_project_id=$("#div_project_select option:selected").val();
                    var v_project_name=$("#div_project_select option:selected").text();
                    var v_product_name_new=$("#txt_product_name").val();
                    var v_labour_cost_type=$("#div_labour_cost_type_select option:selected").text();
                    var v_labour_cost=$("#txt_labour_cost").val(); 
                    var v_service_cost_type=$("#div_service_cost_type_select option:selected").text();
                    var v_service_cost=$("#txt_service_cost").val();
                    var v_euipment_cost_type=$("#div_euipment_cost_type_select option:selected").text();
                    var v_euipment_cost=$("#txt_euipment_cost").val();
                    var v_other_cost_type=$("#div_other_cost_type_select option:selected").text();
                    var v_other_cost=$("#txt_other_cost").val();
                    var v_margin_cost_type=$("#div_margin_cost_type_select option:selected").text();
                    var v_margin_cost=$("#txt_margin_cost").val();
                    product_rate_per_unit_cal();
                    v_pdt_rate_per_cal=txt_total_amount_cal;
                    txt_tot_amount=$('#txt_total').val();
                    var total_amount_report=parseFloat(v_pdt_rate_per_cal)*parseFloat(v_product_qty);
                  
                    v_product_qty=$("#txt_product_qty").val();
                    v_product_unit_id=$("#div_product_unit_select option:selected").val();
                    v_product_unit_name=$("#div_product_unit_select option:selected").text();
                   
                    

                    if($.trim(v_company_id)=="0"||$.trim(v_company_name)==""||$.trim(v_project_id)=="select"||$.trim(v_project_name)==""||$.trim(v_product_qty)==""||$.trim(v_product_unit_id)=="0")
                    
                    {
                        swal("Warning","Please provide all the details ....", "warning");
                        v_btn_finished_product_edit.ladda( 'stop' );
                        return false;
                    }
                  
                     $.post("../controller/product/product_controller.php",{action:'finished_product_edit_details',v_finished_id:v_finished_id,v_company_id:v_company_id,v_company_name:v_company_name,v_project_id:v_project_id,v_project_name:v_project_name,v_product_name:v_product_name_new,v_labour_cost_type:v_labour_cost_type,v_labour_cost:v_labour_cost,v_service_cost_type:v_service_cost_type,v_service_cost:v_service_cost,v_euipment_cost_type:v_euipment_cost_type,v_euipment_cost:v_euipment_cost,v_other_cost_type:v_other_cost_type,v_other_cost:v_other_cost,v_margin_cost_type:v_margin_cost_type,v_margin_cost:v_margin_cost,v_product_qty:v_product_qty,v_product_unit_id:v_product_unit_id,v_product_unit_name:v_product_unit_name,txt_tot_amount:txt_tot_amount,v_pdt_rate_per_cal:v_pdt_rate_per_cal,v_labour_cost_amnt:labour_cost_amnt,v_service_cost_amnt:service_cost_amnt,v_euipment_cost_amnt:euipment_cost_amnt,v_other_cost_amnt:other_cost_amnt,v_margin_cost_amnt:margin_cost_amnt,v_total_amount_report:total_amount_report}
                        , function(result,status)
                                {
                                
                                if(status!="success")
                                {
                                    v_btn_finished_product_edit.ladda( 'stop' );
                                    swal("Error", result, "error");
                                 
                                }
                                else 
                                {
                                    v_btn_finished_product_edit.ladda( 'stop' );
                                    swal("Success"," Estimation Updated Successfully", "success");
                                    //clear_text_item();
                                    //load_data_to_grid_product_details_list(finished_id);
                                    location.reload();
                  
                                 }
                     
                });  
        }
                  
         });

    $('#list_of_all_product tbody').on('click', 'td button', function(){
            
       // alert("inside click");
                    //openNavR1();
                     var $row = $(this).closest('tr');
                        var data = product_all_list_table.row($row).data();
                        
                        v_com_id  = data.company_id;
                        v_prod_name  = data.product_name;
                      // alert(v_prod_name);
                     var  v_pjt_name=data.project_name;
            var  v_finished_product_id=data.finished_product_id;
            $("#pjt_name").text(v_pjt_name);
            $("#pjt_prim_name").text(v_pjt_name);
            
            load_data_to_grid_all_product_details_item_list(v_com_id,v_prod_name,v_finished_product_id); 
            load_data_to_grid_all_product_details_item_list_primary(v_com_id,v_prod_name,v_finished_product_id);
            
            
            
            if($(this).attr("name")=='delete_product_details')
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
                                        						
                                        						       delete_product(v_finished_product_id);
                                                     						 
                                        							} else {
                                        							    
                                        							   
                                        							 
                                        							}
                                        						 });
                         }
                         
                         
                       
                   
                 
                function delete_product(v_finished_product_id)
                    {
                        
                        $.post("../controller/product/product_controller.php",{action:'delete_product_details',v_product_id:v_finished_product_id}
                            , function(result,status)
                                {
                                            
                                    							 //load_data_to_grid_product_details_list(finished_id_last);
                                        load_data_to_grid_all_product_details_list();
                                });
                         
                         
                       
                    }
                     
        });
        
        
         function load_data_to_grid_all_product_details_item_list(v_com_id,v_prod_name,v_finished_product_id)
                 {
                     list_product_item_details.destroy();
                         
                     list_product_item_details = $('#list_of_all_product_item_details').DataTable( {
                            
                             "ajax": {
                                 'type': 'POST',
                                 'url': '../controller/product/product_controller.php',
                                 'data': {
                                    action: 'list_all_finihed_product_item_details',
                                    v_company_id:v_com_id,
                                    v_product_name:v_prod_name,
                                    v_finished_product_id:v_finished_product_id
                                   
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
                                
                                {
                                    "className":  'details-control',
                                    "orderable":  false,
                                    "data":        null,
                                    "defaultContent": '',
                                    "width":'10px'
                                }, 
                                { "data": null},
                                 
                                 
                                 { "data": "category_name",width:"2%"},
                                 { "data": "item_name",width:"2%"},
            					 { "data": "quantity",width:"2%"},
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
            				 searching: false,
                            
                             
                            
                                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                 $("td:eq(1)", nRow).html(iDisplayIndex + 1);
                                 return nRow;
                              },
                            
                                    
                     });  
                
         }

         $('#list_of_all_product_item_details tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = list_product_item_details.row( tr );
         
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
		
		 function load_data_to_grid_all_product_details_item_list_primary(v_com_id,v_prod_name,v_finished_product_id)
                 {
                     product_list_table_display_primary.destroy();
                         
                     product_list_table_display_primary = $('#list_of_all_product_item_details_primary').DataTable( {
                            
                             "ajax": {
                                 'type': 'POST',
                                 'url': '../controller/product/product_controller.php',
                                 'data': {
                                    action: 'list_all_finihed_product_item_details',
                                    
                                    v_product_name:v_prod_name,
                                   v_company_id:v_com_id,
                                   v_finished_product_id:v_finished_product_id
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
            					 { "data": "total_amount",className: "text-right"},
            					 
                     
            					 
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
                             
                            
                             pageLength: 50,
            				 searching: false,
                            
                             
                            
                                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                 $("td:eq(0)", nRow).html(iDisplayIndex + 1);
                                 return nRow;
                              },
                            
                                    
                     });  
                
         }         
         
                     
});