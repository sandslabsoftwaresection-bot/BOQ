$(document).ready(function(){
    
    var v_tax_amount, total_amount,vat_added_total_amnt;
    var primary_cost_product_list_table = $('#primary_cost_product_report').DataTable({searching: false, paging: false, info: false,"ordering": false});
    $('#div_company_select_primary').load('templates/company_combo.php');
    load_tax_select_box('div_tax_select','select_tax_name');
   // $("#primary_cost_product_report").css({"padding":"6px","border":"2px solid #ccc"});
    
    $('#primary_cost_product_report').removeClass( 'display' ).addClass('table table-striped table-bordered');
    function load_tax_select_box(div_name,ctrl_name)
                        
        { 
                          
             $("#"+div_name).load("../controller/store/store_controller.php",{action:'list_tax',v_ctrl_name:ctrl_name},function(result,status){});
        
        } 
    
    $('#div_project_select_primary').change(function(){
    
        var primary_cost_project_id=$("#div_project_select_primary option:selected").val();
        
         $.post("../controller/product/product_controller.php",{action:'find_vat_for_project',v_project_id:primary_cost_project_id}
            , function(result,status)
                {
                    //console.log('test'+result);
                  var obj= jQuery.parseJSON(result);              
                  var project_vat=obj.data[0].tax_value; 
                  $("#txt_project_vat").val(project_vat);
                });
        
    });
    
    $("#btn_report1_print").click(function(){
        
        var primary_cost_company_id=$("#div_company_select_primary option:selected").val();
        var primary_cost_company_name=$("#div_company_select_primary option:selected").text();
        var primary_cost_project_id=$("#div_project_select_primary option:selected").val();
        var primary_cost_project_name=$("#div_project_select_primary option:selected").text();
        v_tax_amount=$("#txt_project_vat").val();
            //window.open("../reports/report_1_print.php?v_company_id="+primary_cost_company_id+"&v_company_name="+primary_cost_company_name+"&v_project_id="+primary_cost_project_id+"&v_project_name="+primary_cost_project_name+"&v_tax_amount="+v_tax_amount,"_blank");  
            window.open("../reports/pdf/print/report_1_print.php?v_company_id="+primary_cost_company_id+"&v_company_name="+primary_cost_company_name+"&v_project_id="+primary_cost_project_id+"&v_project_name="+primary_cost_project_name+"&v_tax_amount="+v_tax_amount,"_blank");  
     })     
     
    $('#btn_view_primary_cost').click(function(){
        
        var primary_cost_company_id=$("#div_company_select_primary option:selected").val();
        var primary_cost_company_name=$("#div_company_select_primary option:selected").text();
        var primary_cost_project_id=$("#div_project_select_primary option:selected").val();
        var primary_cost_project_name=$("#div_project_select_primary option:selected").text();
        v_tax_amount=$("#txt_project_vat").val();
        
         $.post("../controller/product/product_controller.php",{action:'find_total_amnt_product',v_company_id:primary_cost_company_id,v_project_id:primary_cost_project_id}
            , function(result,status)
                {
                    //
                  var obj= jQuery.parseJSON(result);              
                  var total_amnt=obj.data[0].prod_total_amnt; 
                  $("#txt_total_amnt").val(total_amnt);
                  var tot_amount=$("#txt_total_amnt").val();
                 total_amount=parseFloat(tot_amount).toFixed(3);
                vat_added_total_amnt=(parseFloat(total_amount)+((parseFloat(total_amount)*parseFloat(v_tax_amount))/100)).toFixed(3);
                if($.trim(primary_cost_company_id)=="0"||$.trim(primary_cost_company_name)==""||$.trim(primary_cost_project_id)=="select"||$.trim(primary_cost_project_name)=="")
                    
            {
                swal("Warning","Please provide all the details ....", "warning");
                
                return false;
            }
           // console.log(v_tax_amount);
        primary_cost_load_data_to_grid_product_details_list(primary_cost_company_id,primary_cost_project_id,primary_cost_company_name,primary_cost_project_name,v_tax_amount,total_amount,vat_added_total_amnt);
    
                
                
                
                });
                  
        
        
    });
    
    
    $("#div_company_select_primary").change(function() {
                      
                     
            $('#txt_product_company_id_primary').val($('option:selected', this).val()) ;
            var company_id=$('option:selected', this).val() ;
                    
            $('#div_project_select_primary').load('templates/project_combo.php?company_id='+company_id);
                      
                      
                
    });
         
    
    function primary_cost_load_data_to_grid_product_details_list(primary_cost_company_id,primary_cost_project_id,primary_cost_company_name,primary_cost_project_name,v_tax_amount,total_amount,vat_added_total_amnt)
                 {
                     primary_cost_product_list_table.destroy();
                         
                     primary_cost_product_list_table = $('#primary_cost_product_report').DataTable( {
                            
                             "ajax": {
                                 'type': 'POST',
                                 'url': '../controller/product/product_controller.php',
                                 'data': {
                                    action: 'list_product_report_primary_cost',
                                    v_company_id:primary_cost_company_id,
                                    v_project_id:primary_cost_project_id
                                    
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
                                filename:'Data Sheet - '+primary_cost_project_name,
                              title: 'DATA SHEET',
                              className: 'advisorsExportButton' ,
                                //text:'Export to excel',
                                 text: '<i class="material-icons icon-lg">assignment_returned</i>',
                                 messageTop: 'Company Name : '+primary_cost_company_name+
                                '  Project Code : '+primary_cost_project_id+
                                '  Project Name : '+primary_cost_project_name,
                                messageBottom: 'Total Amount : '+total_amount,
                              // '\r\nVAT % : '+v_tax_amount+
                                //'\r\nGrand Total : '+vat_added_total_amnt,
                        //Columns to export
                                exportOptions: {
                                columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                                },
                                customize: function(doc) {
                                  // doc.content[2].layout = "Borders";
                                // doc.defaultStyle.fontSize = 16; //<-- set fontsize to 16 instead of 10
                                    //doc.styles.title.fontSize = 20;
                                  //doc.content[2].table.widths = ['3%',  '12%', '5%', '5%', 
                                                        //   '10%',  '10%', '10%', '10%',
                                                         //  '10%',  '10%', '5%', '10%']; 
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
                                 
                                 
                                 { "data": "product_name" },
                                 { "data": "product_qty",className: "text-center"},
                                 { "data": "product_unit",className: "text-center"},
                                  { "data": "product_primary_amt",className: "text-right"},
                                  
                                 
            					 { "data": "labour_cost_type",className: "text-right",
                                  render: function ( data, type, rows ) {
            						
            								if(rows['labour_cost_type']=='%')
            								{
            								return rows['labour_cost_amt'].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +'   (' +(parseFloat(rows['labour_cost'])).toFixed(2) + '%)';
            								}
            								else
            								{
            								return rows['labour_cost_amt'].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'   (' +(parseFloat(rows['labour_cost'])).toFixed(3) + ''+ rows['labour_cost_type']+')';
            								}
            
            							 },
                                 },
            				 	 { "data": "service_cost",className: "text-right",
            				 	 render: function ( data, type, rows ) {
            						
            									if(rows['service_cost_type']=='%')
            								{
            								return rows['service_cost_amt'].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +'   ('+(parseFloat(rows['service_cost'])).toFixed(2) +'%)';
            								}
            								else
            								{
            									return rows['service_cost_amt'].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'   ('+(parseFloat(rows['service_cost'])).toFixed(3) + ''+ rows['service_cost_type']+')';
            								}
            
            							 },
                                 },
            					 
            					 { "data": "equipment_cost",className: "text-right",
            					 render: function ( data, type, rows ) {
            						
            								if(rows['equipment_cost_type']=='%')
            								{
            								   //console.log(rows['product_item_primary_amt'] *rows['equipment_cost']/100);
            								return rows['equipment_cost_amt'].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +'   ('+(parseFloat(rows['equipment_cost'])).toFixed(2) + '%)';
            								}
            								else
            								{
            								return rows['equipment_cost_amt'].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'   ('+(parseFloat(rows['equipment_cost'])).toFixed(3) + ''+ rows['equipment_cost_type']+')';
            								}
            
            							 },
                                 },
            					 
            					 { "data": "other_cost",className: "text-right",
            					 render: function ( data, type, rows ) {
            						
            								if(rows['other_cost_type']=='%')
            								{
            								return rows['other_cost_amt'].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'    ('+(parseFloat(rows['other_cost'])).toFixed(2) +  '%)';
            								}
            								else
            								{
            									return rows['other_cost_amt'].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'    ('+(parseFloat(rows['other_cost'])).toFixed(3) + ''+ rows['other_cost_type']+ ')';
            								}
            
            							 },
                                 },
            					 
            					 { "data": "margin_cost",className: "text-right",
            					 render: function ( data, type, rows ) {
            						
            								if(rows['margin_cost_type']=='%')
            								{
            								return rows['margin_cost_amt'].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +'   ('+(parseFloat(rows['margin_cost'])).toFixed(2) + '%)';
            								}
            								else
            								{
            									return rows['margin_cost_amt'].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'   ('+(parseFloat(rows['margin_cost'])).toFixed(3) + ''+ rows['margin_cost_type']+')';
            								}
            
            							 },
                                 },
                                 
                               
                                    { "data": "product_rate_per_unit_cost",className: "text-right",
                                   render: function ( data, type, rows ) {
                                        var x= rows['product_rate_per_unit_cost'];
                                 return parseFloat(x).toFixed(3).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                                 
                                   }		
                                },		
                                { "data": "unit_price_after_tax",className: "text-right",
                                   render: function ( data, type, rows ) {
                                       var xy= rows['unit_price_after_tax'];
                                 return parseFloat(xy).toFixed(3).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                                      
                                   }		
                                },	
                                
                                { "data": "total_amt",className: "text-right",
                                   render: function ( data, type, rows ) {
                                       var xyz= rows['total_amt'];
                                 return parseFloat(xyz).toFixed(3).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                                       
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
                                                .column( 12 )
                                                .data()
                                                .reduce( function (a, b) {
                                                    return intVal(a) + intVal(b);
                                                }, 0 );
                                 
                                            // Total over this page
                                            pageTotal = api
                                                .column( 12, { page: 'current'} )
                                                .data()
                                                .reduce( function (a, b) {
                                                    return intVal(a) + intVal(b);
                                                }, 0 );
                                 
                                            // Update footer
                                                $( api.column( 12 ).footer() ).html(
                                                    $.fn.dataTable.render.number(',', '.', 3, '').display( pageTotal )
                                                );
                                                
                                                
                                                
                             },
                             
                             pageLength: 10,
            				 searching: false,
                            responsive: true,
                            
                             "aoColumnDefs": [
            					{ "bSortable": false, "aTargets": [  0,1,2,3,4,5,6,7,8,9,10,11,12],
            					
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
                 
                primary_cost_product_list_table.on( 'order.dt search.dt', function () {
                primary_cost_product_list_table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1;
                primary_cost_product_list_table.cell(cell).invalidate('dom'); 
                } );
                } ).draw();
});