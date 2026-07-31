$(document).ready(function(){
    $('#figures_show').hide();
    $('#figures_show_items').hide();
    $('#vat_div_for_calculation').hide();
    $('#div_calculation_for_per_item').hide();
    var product_item_list_table; // Declare it globally
    var v_btn_product_add = $( '#btn_product_add' ).ladda();
    var v_btn_product_to_master = $( '#btn_product_to_master' ).ladda();
    var txt_total_amount_cal,flag;
    var labour_cost_amnt,service_cost_amnt,euipment_cost_amnt,other_cost_amnt,margin_cost_amnt,v_lab_per;
    // var product_item_list_table = $('#list_of_product').DataTable({searching: false, paging: false, info: false,"ordering": false});
    
    v_btn_product_add.click(function() {
        // Start loading animation
        v_btn_product_add.ladda('start');
    
        // Get values from the input fields
        var projectName = $('#txt_project_name').val().trim();
        var productName = $('#txt_product_name').val().trim();
        var itemName = $('#txt_item_name').val().trim();
        var quantity = $('#txt_required_qtyy').val().trim();
        var units = $('#txt_units').val().trim();
        var unitPerRate = $('#txt_rate_unit').val().trim();
        var amount = $('#txt_qty_amount').val().trim();
        var item_qty = $('#txt_item_qty').val().trim();
    
        // Validate if all fields have values
        if (!projectName || !productName || !itemName || !quantity || !units || !unitPerRate || !amount || !item_qty) {
            swal("Warning", "Please fill in all the fields", "warning");
            v_btn_product_add.ladda('stop');
            return false;
        } else {
            // Add success message
            swal("Success", "Item added successfully to table", "success");
    
            // Dynamically add the new row to the table
            load_data_to_grid_product_details_list(
                projectName,
                productName,
                itemName,
                parseFloat(quantity),
                units,
                parseFloat(unitPerRate),
                parseFloat(amount),
                parseFloat(item_qty)
            );
    
            // Disable project and product name fields after first entry
            $('#txt_project_name').prop('disabled', true);
            $('#txt_product_name').prop('disabled', true);
            $('#txt_item_qty').prop('disabled', true);
            // Clear other input fields for new entry
            $('#txt_item_name').val('');
            $('#txt_required_qtyy').val('');
            $('#txt_units').val('');
            $('#txt_rate_unit').val('');
            $('#txt_qty_amount').val('');
            // $('#vat_percentage').val('');
            $('#vat_div_for_calculation').show();
            $('#div_calculation_for_per_item').show();
            // Stop loading animation
            v_btn_product_add.ladda('stop');
        }
    });
    
    function load_data_to_grid_product_details_list(projectName,productName,itemName,quantity,units,unitPerRate,amount,item_qty) {
        if (!$.fn.DataTable.isDataTable('#list_of_product')) {
            product_item_list_table = $('#list_of_product').DataTable({
                "columns": [
                    { "data": null }, 
                    { "data": "project_name", "visible": false }, 
                    { "data": "product_name","visible": false  },
                    { "data": "item_name" },
                    { "data": "item_qty", "className": "text-center","visible": false }, 
                    { "data": "quantity", "className": "text-center" },
                    { "data": "units", "className": "text-center" },
                    { "data": "rate_unit", "className": "text-right" },
                    { "data": "amount", "className": "text-right" },
                    {
                        "data": "ids",
                        "render": function(data, type, row, meta) {
                            return '<button type="button" class="btn btn-sm btn-danger delete-row" data-id="' + row.ids + '"><i class="material-icons">delete</i></button>';
                        }
                    }
                ],
                "footerCallback": function(row, data, start, end, display) {
                    var api = this.api();

                    var totalAmount = api
                        .column(8)
                        .data()
                        .reduce(function(a, b) {
                            return a + parseFloat(b) || 0;
                        }, 0);
    
                    // Update footer with total amount
                    $(api.column(8).footer()).html(totalAmount.toFixed(2));
                    $('#total_text').val(totalAmount.toFixed(2));
                    // Calculate VAT and update related fields
                    var amount = parseFloat($('#total_text').val()) || 0; // Convert to number, default to 0 if empty or invalid
                    var vatPercentage = parseFloat($('#vat_percentage').val()) || 0; // Convert to number, default to 0 if empty or invalid
                    var vatPercentageAmount = (amount * (vatPercentage / 100)).toFixed(3); // Calculate VAT amount
                    var totalWithVat = (amount + parseFloat(vatPercentageAmount)).toFixed(3); // Add VAT amount to total
                    var item_total = parseFloat($('#txt_item_qty').val());
                    var per_item =amount/item_total;
                    var after_vat_per_item =totalWithVat/item_total;

                    $('#per_item_val').text(per_item.toFixed(3));
                    $('#after_vat_item_val').text(after_vat_per_item.toFixed(3));
                    // Update respective fields with calculated values
                    $('#vat_amount').val(vatPercentageAmount); // Display VAT amount
                    $('#total_vat_amount').val(totalWithVat); // Display total amount including VAT
                    
                    product_rate_per_unit_cal();
                },
                "searching": false,
                "paging": false,
                "info": false,
                "ordering": false,
                "pageLength": 50,
                "aoColumnDefs": [
                    { "bSortable": false, "aTargets": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }
                ],
                "fnRowCallback": function(nRow, aData, iDisplayIndex) {
                    $("td:eq(0)", nRow).html(iDisplayIndex + 1); // Update index column
                    return nRow;
                }
            });
        }
    
        // Add a new row dynamically to the DataTable
        product_item_list_table.row
            .add({
                "project_name": projectName,
                "product_name": productName,
                "item_name": itemName,
                "quantity": quantity,
                "units": units,
                "rate_unit": unitPerRate,
                "amount": amount,
                "item_qty": item_qty,
                "ids": Date.now() // Unique ID for row
            })
            .draw(false);
    
        // Delete row functionality
        $('#list_of_product').off('click', '.delete-row').on('click', '.delete-row', function() {
            var rowId = $(this).data('id'); // Get the ID of the row to delete
            var row = product_item_list_table.row($(this).parents('tr')); // Get the row
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this data.",
                icon: "warning",
                buttons: {
                    cancel: "Cancel",
                    confirm: "Delete"
                },
                dangerMode: true
            }).then((willDelete) => {
                if (willDelete) {
                    row.remove().draw(false); // Remove the row from the table
                    swal("Deleted!", "Your item has been deleted.", "success");
                } else {
                    swal("Cancelled", "Your item is safe.", "success");
                }
            });
        });
    }

    $('#btn_item_cancel').click(function() {
        // Check if the txt_project_name field is disabled
        if ($('#txt_project_name').prop('disabled')) {
            // Clear the values of the fields
            $('#txt_item_name').val('');
            // $('#txt_product_name').val('');
            $('#txt_units').val('');
            $('#txt_rate_unit').val('');
            $('#txt_required_qtyy').val('');
            $('#txt_qty_amount').val('');
            $('#vat_amount').val('');
        }else{
            $('#txt_project_name').val('');
            $('#txt_item_name').val('');
            $('#txt_item_qty').val('');
            $('#txt_product_name').val('');
            $('#txt_units').val('');
            $('#txt_rate_unit').val('');
            $('#txt_required_qtyy').val('');
            $('#txt_qty_amount').val('');
            $('#vat_amount').val('');
        }
         
    });
    
    $('#vat_percentage').keyup(function () {
        
        var amount = parseFloat($('#total_text').val()) || 0; // Convert to number, default to 0 if empty or invalid
        var vatPercentage = parseFloat($('#vat_percentage').val()) || 0; // Convert to number, default to 0 if empty or invalid
        var vatPercentageAmount = (amount * (vatPercentage / 100)).toFixed(3); // Calculate VAT amount
        var total_amount = (amount + parseFloat(vatPercentageAmount)).toFixed(3); // Add and ensure proper number addition
        var item_total = parseFloat($('#txt_item_qty').val());
        var per_item =amount/item_total;
        var after_vat_per_item =total_amount/item_total;

        $('#per_item_val').text(per_item.toFixed(3));
        $('#after_vat_item_val').text(after_vat_per_item.toFixed(3));
        $('#vat_amount').val(vatPercentageAmount); // Display VAT amount
        $('#total_vat_amount').val(total_amount); // Display total amount
        product_rate_per_unit_cal();
    });

    $('#txt_rate_unit').click(function() {
        var quantity = $('#txt_required_qtyy').val().trim(); // Get value of txt_rate_unit

        // Check if txt_rate_unit is empty
        if (quantity === "") {
            swal("Warning","Please enter a Quantity!", "warning");
             return false;
        }
    });
    
    $('#txt_required_qtyy').keyup(function () {
        $('#txt_rate_unit').val('');
        $('#txt_qty_amount').val('');
        // $('#vat_amount').val('');
        
    });
    
    $('#txt_rate_unit').keyup(function () {
        $('#txt_qty_amount').val('');
        // $('#vat_amount').val('');
        const quantity = parseFloat($('#txt_required_qtyy').val());
        const unitRate = parseFloat($('#txt_rate_unit').val());

        const missingFields = [];
    
        // Validate fields
        if (isNaN(quantity) || quantity <= 0) {
            missingFields.push('Quantity');
        }

        // Alert for missing fields
        if (missingFields.length > 0) {
            swal({
                title: 'Warning',
                text: `Please fill the ${missingFields.join(', ')}`,
                icon: "warning",
            });
            $('#txt_rate_unit').val(''); // Reset quantity
            return false;
        }
    
        // Proceed to calculation if fields are valid
        if (!isNaN(quantity) && quantity > 0) {
            calculate_values(quantity, unitRate);
        } 
    });
    
    function calculate_values(quantity, unitRate) {
        const amount = quantity * unitRate; // Adjusted to include VAT in the calculation
        $('#txt_qty_amount').val(amount.toFixed(3)); // Display with 3 decimal places
    }
    
    $('#btn_calculate').click(function(){
       flag=1;
          $('#figures_show').show(1000);
          $('#figures_show_items').show(1000);
          
          product_rate_per_unit_cal();
         if(isNaN(txt_total_amount_cal))
         {
            product_div_value();
         }
         else
         {
            $('#cal_value').text(txt_total_amount_cal);
            var cal_value = parseFloat($('#cal_value').text());
            var item_qty = parseFloat($('#txt_item_qty').val()); 
            var result = cal_value / item_qty; 
            $('#cal_value_per_item').text(result.toFixed(3));
         }
    });
    
    function product_rate_per_unit_cal(){
        
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
        txt_tot_amount=$('#total_vat_amount').val();

        if(v_labour_cost_type=='%'){
            v_labour_cost_amount= parseFloat(txt_tot_amount)*parseFloat(v_labour_cost)/100; 
            txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_labour_cost_amount);
        }
        else{
            txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_labour_cost);
            v_labour_cost_amount=parseFloat(v_labour_cost);
        }
      
        labour_cost_amnt=parseFloat(v_labour_cost_amount);

        if(v_euipment_cost_type=='%'){
            v_euipment_cost_amount= parseFloat(txt_tot_amount)*parseFloat(v_euipment_cost)/100; 
            txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_euipment_cost_amount);
        }
        else{
            txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_euipment_cost);
            v_euipment_cost_amount=parseFloat(v_euipment_cost);
        }
        
        euipment_cost_amnt=parseFloat(v_euipment_cost_amount);
       
        if(v_service_cost_type=='%'){
            v_service_cost_amount= parseFloat(txt_tot_amount)*parseFloat(v_service_cost)/100; 
            txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_service_cost_amount);
        }
        else{
            txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_service_cost);
            v_service_cost_amount=parseFloat(v_service_cost);
        }
        
        service_cost_amnt=parseFloat(v_service_cost_amount);
        
        if(v_other_cost_type=='%'){
            v_other_cost_amount= parseFloat(txt_tot_amount)*parseFloat(v_other_cost)/100; 
            txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_other_cost_amount);
        }
        else{
            txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_other_cost);
            v_other_cost_amount=parseFloat(v_other_cost);
        }
        
        other_cost_amnt=parseFloat(v_other_cost_amount);
      
        if(v_margin_cost_type=='%'){
            v_margin_cost_amount= parseFloat(txt_tot_amount)*parseFloat(v_margin_cost)/100;
            txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_margin_cost_amount);
        }
        else{
            txt_tot_amount=parseFloat(txt_tot_amount)+parseFloat(v_margin_cost);
            v_margin_cost_amount=parseFloat(v_margin_cost);
        }
        
        margin_cost_amnt=parseFloat(v_margin_cost_amount);
     
        txt_total_amount_cal = parseFloat(txt_tot_amount,10).toFixed(3);
    
        $('#cal_value').text(txt_total_amount_cal);
        var cal_value = parseFloat($('#cal_value').text());
        var item_qty = parseFloat($('#txt_item_qty').val()); 
        var result = cal_value / item_qty; 
        $('#cal_value_per_item').text(result.toFixed(3));
    }
    
    function product_div_value(){
           prod_rate_unit=$('#cal_value').val();
           item_value = $('#cal_value_per_item').val();
        if(prod_rate_unit==='')
        {
           $('#cal_value').text("0.00"); 
        } 
        if(item_value==='')
        {
           $('#cal_value_per_item').text("0.00"); 
        } 
     }
     
    $('#btn_go_to_store').click(function(){
                      
        var go_to_url="primary_store.php?m=7&sm=1";
        window.open(go_to_url, '_blank');
    }); 
    
    $('#btn_cancel').click(function(){
        clear_text();
    });  
                 
    function clear_text(){
        location.reload();
    }
    
    // v_btn_product_to_master.click(function(){

    //     if (!product_item_list_table || !product_item_list_table.data().any()) {
    //         swal("Warning", "Please add at least one item to the project.", "warning");
    //         return false;
    //     }

    //     if(flag!=1){
    //         swal("Warning","Please calculate the Amount ....", "warning");
    //         v_btn_product_to_master.ladda( 'stop' );
    //         return false;
    //     }
        
    //     var v_vat_percentage = $('#vat_percentage').val();
    //     if (v_vat_percentage === '' || v_vat_percentage === null) {
    //         e.preventDefault(); // Prevents default action if needed
    
    //         swal({
    //             title: "Are you sure?",
    //             text: "Do you want to continue without VAT (%)?",
    //             icon: "warning",
    //             buttons: {
    //                 cancel: "Cancel",
    //                 confirm: "Continue"
    //             },
    //             dangerMode: true
    //         }).then((willContinue) => {
    //             if (willContinue) {
    //                 $('#vat_percentage').val(0);
    //                 // If you need to trigger form submission or another action, do it here
    //             } else {
    //                 swal("Cancelled", "You can add VAT (%)", "info");
    //                 return false; // Stops execution
    //             }
    //         });
    //     } else {
    //         // Proceed with the next steps if VAT is already set
    //     }
    //     v_btn_product_to_master.ladda( 'start' );
        
    //     var v_project_name=$("#txt_project_name").val();
    //     var v_product_name=$("#txt_product_name").val();
    //     var v_total_item=$("#txt_item_qty").val();
    //     v_labour_cost_type=$("#div_labour_cost_type_select option:selected").text();
    //     v_labour_cost=$("#txt_labour_cost").val(); 
    //     v_service_cost_type=$("#div_service_cost_type_select option:selected").text();
    //     v_service_cost=$("#txt_service_cost").val();
    //     v_euipment_cost_type=$("#div_euipment_cost_type_select option:selected").text();
    //     v_euipment_cost=$("#txt_euipment_cost").val();
    //     v_other_cost_type=$("#div_other_cost_type_select option:selected").text();
    //     v_other_cost=$("#txt_other_cost").val();
    //     v_margin_cost_type=$("#div_margin_cost_type_select option:selected").text();
    //     v_margin_cost=$("#txt_margin_cost").val();
    //     product_rate_per_unit_cal();
    //     v_pdt_rate_per_cal=txt_total_amount_cal;
    //     txt_tot_amount=$('#total_text').val();
        
	   // var v_product_id = $('#txt_finished_prd_id').val();
	   // var vat_prct_amount = $('#vat_amount').val();
	   // var v_vat_total_amount = $('#total_vat_amount').val();
	   // var rate_per_item = $('#cal_value_per_item').text();
        
    //     var productDetails = [];
    //     product_item_list_table.rows().every(function() {
    //         var data = this.data();
    //         productDetails.push({
    //             project_name: data.project_name,
    //             item_name: data.item_name,
    //             quantity: data.quantity,
    //             units: data.units,
    //             rate_unit: data.rate_unit,
    //             amount: data.amount,
    //         });
    //     });

    //     $.post("../controller/quick_calculator/quick_calculator_controller.php",{action:'add_to_master_master',
    //             v_project_name:v_project_name,
    //             v_product_name,v_product_name,
    //             v_total_item:v_total_item,
    //             v_labour_cost_type:v_labour_cost_type,
    //             v_labour_cost:v_labour_cost,
    //             v_service_cost_type:v_service_cost_type,
    //             v_service_cost:v_service_cost,
    //             v_euipment_cost_type:v_euipment_cost_type,
    //             v_euipment_cost:v_euipment_cost,
    //             v_other_cost_type:v_other_cost_type,
    //             v_other_cost:v_other_cost,
    //             v_margin_cost_type:v_margin_cost_type
    //             ,v_margin_cost:v_margin_cost,
    //             v_pdt_rate_per_cal:v_pdt_rate_per_cal,
    //             v_labour_cost_amnt:labour_cost_amnt,
    //             v_service_cost_amnt:service_cost_amnt,
    //             v_euipment_cost_amnt:euipment_cost_amnt,
    //             v_other_cost_amnt:other_cost_amnt,
    //             v_margin_cost_amnt:margin_cost_amnt,
    //             txt_tot_amount:txt_tot_amount,
    //             v_vat_percentage:v_vat_percentage,
    //             vat_prct_amount:vat_prct_amount,
    //             v_vat_total_amount:v_vat_total_amount,
    //             rate_per_item:rate_per_item,
    //             product_details: JSON.stringify(productDetails)
    //     },
    //     function(result,status){
    //         console.log(result);
    //         result = $.trim(result);
    //         if(result.charAt(0)=='U'){
    //             v_btn_product_to_master.ladda( 'stop' );
    //             swal("Error", result, "error");
    //         }
    //         else{
    //             v_btn_product_to_master.ladda( 'stop' );
    //             swal("Success"," Product added Successfully to Master", "success");  
    //             clear_text();
    //         }     
    //     });
    // });
    
    v_btn_product_to_master.click(function (e) {
        e.preventDefault(); // Prevent default form submission
    
        // Check if at least one item is in the project
        if (!product_item_list_table || !product_item_list_table.data().any()) {
            swal("Warning", "Please add at least one item to the project.", "warning");
            return false;
        }
    
        // Check if flag is set correctly
        if (flag != 1) {
            swal("Warning", "Please calculate the Amount ....", "warning");
            v_btn_product_to_master.ladda('stop');
            return false;
        }
    
        // Check if VAT is provided
        var v_vat_percentage = $('#vat_percentage').val();
        if (v_vat_percentage === '' || v_vat_percentage === null) {
            swal({
                title: "Are you sure?",
                text: "Do you want to continue without VAT (%)?",
                icon: "warning",
                buttons: {
                    cancel: "Cancel",
                    confirm: "Continue"
                },
                dangerMode: true
            }).then((willContinue) => {
                if (willContinue) {
                    $('#vat_percentage').val(0);
                    proceedWithMaster();
                } else {
                    swal("Cancelled", "You can add VAT (%)", "info");
                }
            });
            return; // Stop execution here and wait for confirmation
        }
    
        // Proceed if VAT is already set
        proceedWithMaster();
    });
    
    function proceedWithMaster() {
        v_btn_product_to_master.ladda('start');
    
        var v_project_name = $("#txt_project_name").val();
        var v_product_name = $("#txt_product_name").val();
        var v_total_item = $("#txt_item_qty").val();
        var v_labour_cost_type = $("#div_labour_cost_type_select option:selected").text();
        var v_labour_cost = $("#txt_labour_cost").val();
        var v_service_cost_type = $("#div_service_cost_type_select option:selected").text();
        var v_service_cost = $("#txt_service_cost").val();
        var v_euipment_cost_type = $("#div_euipment_cost_type_select option:selected").text();
        var v_euipment_cost = $("#txt_euipment_cost").val();
        var v_other_cost_type = $("#div_other_cost_type_select option:selected").text();
        var v_other_cost = $("#txt_other_cost").val();
        var v_margin_cost_type = $("#div_margin_cost_type_select option:selected").text();
        var v_margin_cost = $("#txt_margin_cost").val();
    
        product_rate_per_unit_cal();
        v_pdt_rate_per_cal = txt_total_amount_cal;
        txt_tot_amount = $('#total_text').val();
    
        var v_product_id = $('#txt_finished_prd_id').val();
        var vat_prct_amount = $('#vat_amount').val();
        var v_vat_total_amount = $('#total_vat_amount').val();
        var rate_per_item = $('#cal_value_per_item').text();
    
        var productDetails = [];
        product_item_list_table.rows().every(function () {
            var data = this.data();
            productDetails.push({
                project_name: data.project_name,
                item_name: data.item_name,
                quantity: data.quantity,
                units: data.units,
                rate_unit: data.rate_unit,
                amount: data.amount,
            });
        });
    
        $.post("../controller/quick_calculator/quick_calculator_controller.php", {
            action: 'add_to_master_master',
            v_project_name: v_project_name,
            v_product_name: v_product_name,
            v_total_item: v_total_item,
            v_labour_cost_type: v_labour_cost_type,
            v_labour_cost: v_labour_cost,
            v_service_cost_type: v_service_cost_type,
            v_service_cost: v_service_cost,
            v_euipment_cost_type: v_euipment_cost_type,
            v_euipment_cost: v_euipment_cost,
            v_other_cost_type: v_other_cost_type,
            v_other_cost: v_other_cost,
            v_margin_cost_type: v_margin_cost_type,
            v_margin_cost: v_margin_cost,
            v_pdt_rate_per_cal: v_pdt_rate_per_cal,
            v_labour_cost_amnt: labour_cost_amnt,
            v_service_cost_amnt: service_cost_amnt,
            v_euipment_cost_amnt: euipment_cost_amnt,
            v_other_cost_amnt: other_cost_amnt,
            v_margin_cost_amnt: margin_cost_amnt,
            txt_tot_amount: txt_tot_amount,
            v_vat_percentage: $('#vat_percentage').val(),
            vat_prct_amount: vat_prct_amount,
            v_vat_total_amount: v_vat_total_amount,
            rate_per_item: rate_per_item,
            product_details: JSON.stringify(productDetails)
        }, function (result, status) {
            console.log(result);
            result = $.trim(result);
            v_btn_product_to_master.ladda('stop');
    
            if (result.charAt(0) == 'U') {
                swal("Error", result, "error");
            } else {
                swal("Success", "Product added Successfully to Master", "success");
                clear_text();
            }
        });
    }

    $('#btn_view_list_of_project').click(function(){
        load_data_to_grid_all_product_details_list();
    });
                 
    function load_data_to_grid_all_product_details_list(){
        if ($.fn.DataTable.isDataTable('#list_of_master_products')) {
            $('#list_of_master_products').DataTable().destroy();
        }     
        master_product_list_table = $('#list_of_master_products').DataTable({
        "ajax": {
                 'type': 'POST',
                 'url': '../controller/quick_calculator/quick_calculator_controller.php',
                 'data': {
                    action: 'list_all_project_details'
                   
                 },
                  "dataSrc": function (json) {
                    // Make sure json is not undefined or null
                    if (!json || !json.data) {
                        return [];
                    }
                    return json.data;
                }
            },"select": {
                style: 'multi'
            },"language": {
                 "zeroRecords": "No records available",
                 "infoEmpty": "No records available",
            },"order": [[ 0, "" ]],
			"bPaginate": true,
			"bLengthChange": false,
			"bFilter": false,
			"bInfo": false,
			"autoWidth": false,
            "columns": [
                { "data": null },
                { "data": "project_code" },
                { "data": "project_name", width:"10%"},
                { "data": "product_name", width:"10%"},
                { "data": "total_item", width:"5%",className: "text-right"},
                { "data": "project_item_primary_amt",className: "text-right",
                    render: function ( data, type, rows ) {
							return '<span style="font-weight:bold;color:#000000">'+rows['project_item_primary_amt']+ '</span>';
					},
                },
                { "data": "vat_percentage", width:"5%",className: "text-right"},
                { "data": "vat_amount", width:"5%",className: "text-right"},
                { "data": "labour_cost_type",className: "text-right",
                    render: function (data, type, rows) {
                        if (rows['labour_cost_type'] == '%') {
                            return '<span style="font-weight:bold;color:#000000">' + (parseFloat(rows['labour_cost_amt'])).toFixed(3) + '</span>' + 
                                '<br>' + // line break to place on a new line
                                ' (' + (parseFloat(rows['labour_cost'])).toFixed(2) + '%)';
                        } else {
                            return '<span style="font-weight:bold;color:#000000">' + (parseFloat(rows['labour_cost_amt'])).toFixed(3) + '</span>' + 
                                '<br>' + // line break to place on a new line
                                ' (' + rows['labour_cost'] + '' + rows['labour_cost_type'] + ')';
                        }
                    },
                },

    		    { "data": "equipment_cost",className: "text-right",
				    render: function ( data, type, rows ) {
    					if (rows['equipment_cost_type'] == '%') {
                          var calculatedValue = rows['product_item_primary_amt'] * rows['equipment_cost'] / 100;
                          var formattedValue = calculatedValue.toFixed(3);
                          return '<span style="font-weight:bold;color:#000000">' + (parseFloat(rows['equipment_cost_amt'])).toFixed(3) + '</span>' +  
                            '<br>' + // line break to place on a new line
                            '(' + (parseFloat(rows['equipment_cost'])).toFixed(2) + '%)';
                        } else {
                          var formattedAmt = parseFloat(rows['equipment_cost_amt']).toFixed(3);
                          return '<span style="font-weight:bold;color:#000000">' + formattedAmt + '</span>' + 
                            '<br>' + // line break to place on a new line
                            '(' + rows['equipment_cost'] + ' ' + rows['equipment_cost_type'] + ')';
                        }
    				},
                },
			    { "data": "service_cost",className: "text-right",
			 	    render: function ( data, type, rows ) {
					    if(rows['service_cost_type']=='%'){
						    return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['service_cost_amt'])).toFixed(3) +'</span>'+
						    '<br>' + // line break to place on a new line
						    '('+(parseFloat(rows['service_cost'])).toFixed(2)+'%)';
						}
						else{
							return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['service_cost_amt'])).toFixed(3)+'</span>'+
							'<br>' + // line break to place on a new line
							'('+rows['service_cost'] + ''+ rows['service_cost_type']+')';
						}
					},
                },
				{ "data": "other_cost",className: "text-right",
				    render: function ( data, type, rows ) {
    					if(rows['other_cost_type']=='%'){
    					    return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['other_cost_amt'])).toFixed(3)+'</span>'+
    					    '<br>' + // line break to place on a new line
    					    '('+(parseFloat(rows['other_cost'])).toFixed(2) +  '%)';
    					}
    					else{
    						return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['other_cost_amt'])).toFixed(3)+'</span>'+
    						'<br>' + // line break to place on a new line
    						'('+rows['other_cost'] + ''+ rows['other_cost_type']+ ')';
    					}
				    },
                },
				{ "data": "margin_cost",className: "text-right",
				    render: function ( data, type, rows ) {
					    if(rows['margin_cost_type']=='%'){
							return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['margin_cost_amt'])).toFixed(3) +'</span>'+
							'<br>' + // line break to place on a new line
							'('+(parseFloat(rows['margin_cost'])).toFixed(2) + '%)';
						}
						else{
							return '<span style="font-weight:bold;color:#000000">'+(parseFloat(rows['margin_cost_amt'])).toFixed(3)+'</span>'+
							'<br>' + // line break to place on a new line
							'('+rows['margin_cost'] + ''+ rows['margin_cost_type']+')';
						}
                    },
                },
                { "data": "project_rate_per_unit_cost",width:"3%",className: "text-right",
                    render: function ( data, type, rows ) {
					    return '<span style="font-weight:bold;color:#000000">'+rows['project_rate_per_unit_cost']+ '</span>';
					},
                },
                { "data": "item_per_rate", width:"3%",className: "text-right"},
				{ "data": "master_finished_quick_id",className: "text-center",
                     render: function ( data, type, rows, meta ) {
						str_product_item_list = '<button class="btn btn-sm btn-primary mr-1" onclick="openNavR2()"  id="btn_product_item_details_list" name="btn_product_item_details_list"><i class="material-icons ">forward</i></button>';
						return str_product_item_list;
                    },
                },
                { "data": "master_finished_quick_id",className: "text-center",
                 
                     render: function ( data, type, rows, meta ) {
					
								str_product_item_secondary_list = '<button class="btn btn-sm btn-success mr-1" onclick=""  id="btn_product_item_details_print" name="btn_product_item_details_print" ><i class="material-icons">print</i></button>';
							
							return str_product_item_secondary_list;

						 },
                 },
             ],
            
            pageLength: 10,
			searching: true,
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

        var $row = $(this).closest('tr');
        var data = master_product_list_table.row($row).data();
        console.log('data',data);
        v_master_finished_quick_id = data.master_finished_quick_id;
        v_project_code  = data.project_code;

        if ($(this).attr('name') === 'btn_product_item_details_print') {
            print(v_master_finished_quick_id);      
        }
        if ($(this).attr('name') === 'btn_product_item_details_list') {
            load_data_to_grid_all_product_details_item_list(v_project_code);      
        }
    });
    
    function load_data_to_grid_all_product_details_item_list(v_proj_code) {
        // Destroy DataTable if it exists
        if ($.fn.DataTable.isDataTable('#list_of_all_product_item_details')) {
            $('#list_of_all_product_item_details').DataTable().destroy();
        }

        // Initialize DataTable
        $('#list_of_all_product_item_details').DataTable({
            "ajax": {
                "type": "POST",
                "url": "../controller/quick_calculator/quick_calculator_controller.php",
                "data": {
                    action: "list_all_project_item_details",
                    v_project_code: v_proj_code
                },
                "dataSrc": function (json) {
                    if (!json || !json.data) return [];
                    return json.data;
                }
            },
            "select": {
                "style": "multi"
            },
            "language": {
                "zeroRecords": "No records available",
                "infoEmpty": "No records available"
            },
            "order": [[1, "desc"]],
            "paging": false,
            "lengthChange": false,
            "searching": false,
            "info": false,
            "autoWidth": false,
            "columns": [
                { "data": null },
                { "data": "project_name" },
                { "data": "item_name" },
                { "data": "quantity", "className": "text-center" },
                { "data": "units" },
                { "data": "rate_per_unit", "className": "text-right" },
                { "data": "total_amount", "className": "text-right" }
            ],
            "footerCallback": function (row, data, start, end, display) {
                var api = this.api();

                // Function to parse data into integers
                var intVal = function (i) {
                    return typeof i === "string" ? i.replace(/[\$,]/g, "") * 1 : typeof i === "number" ? i : 0;
                };

                // Calculate total for column 6 (Total Amount)
                var total = api
                    .column(6)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                var pageTotal = api
                    .column(6, { page: "current" })
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                // Update the footer for column 6
                $(api.column(6).footer()).html(
                    $.fn.dataTable.render.number(',', '.', 2, '').display(pageTotal)
                );
            },
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                $("td:eq(0)", nRow).html(iDisplayIndex + 1);
                return nRow;
            }
        });
    }
    
    function print(v_master_proj_id){
        window.open("../reports/quick_calculation.php?v_master_proj_id="+v_master_proj_id,"_blank");
    }
});