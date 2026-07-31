$(document).ready(function(){
    
    var v_tax_amount;
    var seconadry_cost_product_list_table = $('#seconadry_cost_product_report').DataTable({searching: false, paging: false, info: false,"ordering": false});
    $('#div_company_select_seconadry').load('templates/company_combo.php');
    load_tax_select_box('div_tax_select','select_tax_name');
    function load_tax_select_box(div_name,ctrl_name)
                        
        { 
                          
             $("#"+div_name).load("../controller/store/store_controller.php",{action:'list_tax',v_ctrl_name:ctrl_name},function(result,status){});
        
        } 
    
    $('#div_project_select_seconadry').change(function(){
    
        var seconadry_cost_project_id=$("#div_project_select_seconadry option:selected").val();
        
         $.post("../controller/product/product_controller.php",{action:'find_vat_for_project',v_project_id:seconadry_cost_project_id}
            , function(result,status)
                {
                    //console.log('test'+result);
                  var obj= jQuery.parseJSON(result);              
                  var project_vat=obj.data[0].tax_value; 
                  $("#txt_project_vat").val(project_vat);
                });
        
    });
    
    $("#btn_secondary_cost_print").click(function(){
        
        var seconadry_cost_company_id=$("#div_company_select_seconadry option:selected").val();
        var seconadry_cost_company_name=$("#div_company_select_seconadry option:selected").text();
        var seconadry_cost_project_id=$("#div_project_select_seconadry option:selected").val();
        var seconadry_cost_project_name=$("#div_project_select_seconadry option:selected").text();
        v_tax_amount=$("#txt_project_vat").val();
            //window.open("../reports/secondary_cost_print.php?v_company_id="+seconadry_cost_company_id+"&v_company_name="+seconadry_cost_company_name+"&v_project_id="+seconadry_cost_project_id+"&v_project_name="+seconadry_cost_project_name+"&v_tax_amount="+v_tax_amount,"_blank");
            window.open("../reports/pdf/print/secondary_cost_print.php?v_company_id="+seconadry_cost_company_id+"&v_company_name="+seconadry_cost_company_name+"&v_project_id="+seconadry_cost_project_id+"&v_project_name="+seconadry_cost_project_name+"&v_tax_amount="+v_tax_amount,"_blank");  
     })
    
    $('#btn_view_seconadry_cost').click(function(){
        
        var seconadry_cost_company_id=$("#div_company_select_seconadry option:selected").val();
        var seconadry_cost_company_name=$("#div_company_select_seconadry option:selected").text();
        var seconadry_cost_project_id=$("#div_project_select_seconadry option:selected").val();
        var seconadry_cost_project_name=$("#div_project_select_seconadry option:selected").text();
        v_tax_amount=$("#txt_project_vat").val();
        
        if($.trim(seconadry_cost_company_id)=="0"||$.trim(seconadry_cost_company_name)==""||$.trim(seconadry_cost_project_id)=="select"||$.trim(seconadry_cost_project_name)=="")
                    
            {
                swal("Warning","Please provide all the details ....", "warning");
                
                return false;
            }
        seconadry_cost_project_name_cost_load_data_to_grid_product_details_list(seconadry_cost_company_id,seconadry_cost_project_id,seconadry_cost_company_name,seconadry_cost_project_name,v_tax_amount);
    
        
    });
    
    
    $("#div_company_select_seconadry").change(function() {
                      
                     
            $('#txt_product_company_id_seconadry').val($('option:selected', this).val()) ;
            var company_id=$('option:selected', this).val() ;
                    
            $('#div_project_select_seconadry').load('templates/project_combo.php?company_id='+company_id);
                      
                      
                
    });
         
    
    function seconadry_cost_project_name_cost_load_data_to_grid_product_details_list(seconadry_cost_company_id,seconadry_cost_project_id,seconadry_cost_company_name,seconadry_cost_project_name,v_tax_amount)
                 {
                     seconadry_cost_product_list_table.destroy();
                         
                     seconadry_cost_product_list_table = $('#seconadry_cost_product_report').DataTable( {
                            
                             "ajax": {
                                 'type': 'POST',
                                 'url': '../controller/product/product_controller.php',
                                 'data': {
                                    action: 'list_product_report_secondary_cost',
                                    v_company_id:seconadry_cost_company_id,
                                    v_project_id:seconadry_cost_project_id
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
            				 dom: 'Bfrtip',
                            buttons: [
                            {
                                extend: 'excelHtml5',
                                filename:'Secondary Cost - '+seconadry_cost_project_name,
                                title: 'SECONDARY COST SHEET',
                                className: 'advisorsExportButton' ,
                                //text:'Export to excel',
                                 text: '<i class="material-icons icon-lg">assignment_returned</i>',
                                messageTop: 'Company Name : '+seconadry_cost_company_name+
                                '  Project Code : '+seconadry_cost_project_id+
                                '  Project Name : '+seconadry_cost_project_name,
                                 messageBottom: null,
                        //Columns to export
                                exportOptions: {
                                columns: [ 0, 1, 2, 3, 4, 5,6,7,8,9]
                                },
                                customize: function(doc) {
                               
                                 }
                                 
                            },
                
                            ],
            				initComplete: function () {
                                var btns = $('.dt-button');
                                btns.addClass('btn btn-success btn-sm');
                                btns.removeClass('dt-button');

                            },
                            "columns": [
                                  
                                { "data": 'finished_product_id', defaultContent: '',className: "text-center" },
                                 { "data": "category_name" },
                                 
                                 { "data": "item_name" },
                                 { "data": "item_quntity",className: "text-center"},
                                 { "data": "sec_unit_name",className: "text-center"},
                                 
                                  { "data": "prod_total_weight",className: "text-center"},
                                 
            					 { "data": "prod_square_meter",className: "text-center"},
                                 
                                 
            				 	 { "data": "prod_cubic_meter",className: "text-center"},
            				 	 
            					 { "data": "sec_rate_per_unit",className: "text-right"},
            					 
                                 { "data": "sec_total",className: "text-right"},
                                 
                              
            				 	
                             ],
                            
                             
                             pageLength: 100,
            				 searching: false,
                            responsive: true,
                            
                             "aoColumnDefs": [
            					{ "bSortable": false, "aTargets": [  0,1,2,3,4,5,6,7,8,9],
            				         "mRender": function (data, type, full) {
                                     var formmatedvalue=data.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                                         return formmatedvalue;
                                    }
            					}, 
            					
            				],
            				
                            
                            drawCallback: function() {
                              var hasRows = this.api().rows({ filter: 'applied' }).data().length > 0;
                              $('.buttons-excel')[0].style.visibility = hasRows ? 'visible' : 'hidden'
                            }
                                    
                     });  
                
                 }  
                 
                seconadry_cost_product_list_table.on( 'order.dt search.dt', function () {
                seconadry_cost_product_list_table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1;
                seconadry_cost_product_list_table.cell(cell).invalidate('dom'); 
                } );
                } ).draw();
});