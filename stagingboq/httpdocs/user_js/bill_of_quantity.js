$(document).ready(function(){
   
    var v_tax_amount;
    var com_profile_img, total_amount,vat_added_total_amnt,vat_amnt;
    var product_list_table = $('#list_of_product_report').DataTable({searching: false, paging: false, info: false,"ordering": false});
    $('#div_company_select').load('templates/company_combo.php');
    
    $('#div_project_select').change(function(){
    
        var project_id=$("#div_project_select option:selected").val();
        
         $.post("../controller/product/product_controller.php",{action:'find_vat_for_project',v_project_id:project_id}
            , function(result,status)
                {
                    //console.log('test'+result);
                  var obj= jQuery.parseJSON(result);              
                  var project_vat=obj.data[0].tax_value; 
                  $("#txt_project_vat").val(project_vat);
                });
        
    });
    
     $("#btn_boq_print").click(function(){
        
        var company_id=$("#div_company_select option:selected").val();
        var company_name=$("#div_company_select option:selected").text();
        var project_id=$("#div_project_select option:selected").val();
        var project_name=$("#div_project_select option:selected").text();
        v_tax_amount=$("#txt_project_vat").val();
         
        //window.open("../reports/bill_of_quantity_print.php?v_company_id="+company_id+"&v_company_name="+company_name+"&v_project_id="+project_id+"&v_project_name="+project_name+"&v_tax_amount="+v_tax_amount,"_blank");  
        window.open("../reports/pdf/print/bill_of_quantity_print.php?v_company_id="+company_id+"&v_company_name="+company_name+"&v_project_id="+project_id+"&v_project_name="+project_name+"&v_tax_amount="+v_tax_amount,"_blank");  
     })
    $('#btn_view_products').click(function(){
        
        var company_id=$("#div_company_select option:selected").val();
        var company_name=$("#div_company_select option:selected").text();
        var project_id=$("#div_project_select option:selected").val();
        var project_name=$("#div_project_select option:selected").text();
        v_tax_amount=$("#txt_project_vat").val();
        //var logo=$("#company_profile_img_name").val();
       // $("#txt_product_company_id").val(company_id);
        //$("#txt_product_project_id").val(project_id);
        $("#vat_prctg").html(v_tax_amount);
         $.post("../controller/product/product_controller.php",{action:'find_total_amnt_product',v_company_id:company_id,v_project_id:project_id}
            , function(result,status)
                {
                    //
               // console.log(result);
                  var obj= jQuery.parseJSON(result); 
                   var total_amnt=obj.data[0].prod_total_amnt; 
                  $("#txt_total_amnt").val(total_amnt);
                  var tot_amount=$("#txt_total_amnt").val();
                  vat_amnt=((parseFloat(tot_amount)*parseFloat(v_tax_amount))/100).toFixed(3);
                 total_amount=parseFloat(tot_amount).toFixed(3);
                vat_added_total_amnt=(parseFloat(total_amount)+((parseFloat(total_amount)*parseFloat(v_tax_amount))/100)).toFixed(3);
                
                if($.trim(company_id)=="0"||$.trim(company_name)==""||$.trim(project_id)=="select"||$.trim(project_name)=="")
                    
                    {
                        swal("Warning","Please provide all the details ....", "warning");
                
                        return false;
                    }
        
         //console.log(logo);
                console.log(total_amount+''+vat_added_total_amnt);
                load_data_to_grid_product_details_list(company_id,project_id,company_name,project_name,v_tax_amount,total_amount,vat_added_total_amnt,vat_amnt);
        
                
                
                
                });
        
        
        
    });
    
    
    $("#div_company_select").change(function() {
                      
                     
            $('#txt_product_company_id').val($('option:selected', this).val()) ;
            var company_id=$('option:selected', this).val() ;
                    
            $('#div_project_select').load('templates/project_combo.php?company_id='+company_id);
            // $.post("../controller/product/product_controller.php",{action:'find_company_profile_image',v_company_id:company_id}
            // , function(result,status)
            //     {
                    
            //         var obj= jQuery.parseJSON(result);
            //          com_profile_img=obj.data[0].profile_image;
            //         //console.log(com_profile_img);
            //          $("#company_profile_img_name").val(com_profile_img);
            //     });           
                      
                
    });
    
    
        // function getBase64Image(img) {
        //     var canvas = document.createElement("canvas");
        //     canvas.width = img.width;
        //     canvas.height = img.height;
        //     var ctx = canvas.getContext("2d");
        //     ctx.drawImage(img, 0, 0);
        //     return canvas.toDataURL("image/png");
        // }
                       
         
    
    function load_data_to_grid_product_details_list(company_id,project_id,company_name,project_name,v_tax_amount,total_amount,vat_added_total_amnt,vat_amnt)
                 {
                     product_list_table.destroy();
                     
                       
                     product_list_table = $('#list_of_product_report').DataTable( {
                         
                            
                             "ajax": {
                                 'type': 'POST',
                                 'url': '../controller/product/product_controller.php',
                                 'data': {
                                    action: 'list_product_report',
                                    v_company_id:company_id,
                                    v_project_id:project_id
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
            				
            				//dom: 'lBfrtip',
            				 dom: 'Bfrtip',
                             buttons: [
                            {
                                extend: 'excelHtml5',
                                filename:'Bill Of Quantity - '+project_name,
                                title: 'BILL OF QUANTITY',
                                className: 'advisorsExportButton' ,
                              //text: 'Export to excel',
                              text: '<i class="material-icons icon-lg">assignment_returned</i>',
                              
                                messageTop: 'Company Name : '+company_name+
                                '  Project Code : '+project_id+
                                '  Project Name : '+project_name,
                                 
                                messageBottom: 'Total Amount : '+total_amount+
                                '\nVAT ('+v_tax_amount+'%): '+vat_amnt+
                                '\nGrand Total : '+vat_added_total_amnt,
                        
                                exportOptions: {
                                columns: [ 0,1, 2, 3, 4, 5]
                                },
                                customize: function(doc) {
                                
                                console.log(doc);
                               
                                }
                            
                                
                            },
        //                     {
        //                         extend: 'pdfHtml5',
        //                       // footer:true,
        //                         className: 'btn-info',
                               
					   //        title: 'BILL OF QUANTITY',
                                
        //                         text: 'Export to PDF',
        //                         filename: 'Bill of Quantity - '+project_name,
        //                         messageTop:'Company Name : '+company_name+
        //                         '\r\nProject Code : '+project_id+
        //                         '\r\nProject Name : '+project_name,
                                
        //                          messageBottom: 'Total Amount : '+total_amount+
        //                         '\r\nVAT ('+v_tax_amount+'%): '+vat_amnt+
        //                         '\r\nGrand Total : '+vat_added_total_amnt,
                                
        //                         exportOptions: {
                                    
        //                             columns: [ 0,1, 2, 3, 4, 5],
                                    
        //                         },
        //                         customize: function(doc) {
        //                          doc.defaultStyle.fontSize = 12; //<-- set fontsize to 16 instead of 10
        //                             doc.styles.title.fontSize = 15;
        //                             doc.styles.title.alignment = 'right';
        //                             doc.styles.tableHeader.color = '#000000';
        //                             doc.styles.tableHeader.fillColor = '#ffffff';
        //                             doc.styles.tableBodyOdd.fillColor = '#ffffff';
        //                             doc.styles.tableFooter.color = '#000000';
        //                             doc.styles.tableFooter.fillColor = '#ffffff';
                                   
                                   
        //                         doc.pageMargins = [40,70,40,30];
                               
                                 
        //                             doc.content[2].table.widths = ['10%',  '34%', '14%', '14%', 
        //                                                   '14%', '14%'];
                                
        //                         var logo='data:image/png;base64,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';
                              
        //                             doc['header']=(function() {
							 //           return {
								//             columns: [
								// 	        {
								// 		        image: logo,
								// 		        width: 125,
								// 		        margin: [40,30]
										        
								// 	        },
									      
								//         ],
								//       // margin: 20
							 //           }
						  //          });
						  ////          doc['footer']=(function(total_amount, vat_amnt,vat_added_total_amnt) {
							 ////       return {
								// //     columns: [
									
								// // 	{
								// // 		alignment: 'left',
								// // 		text: ['Total Amount : ', { text: total_amount },	'\r\nVAT ('+v_tax_amount+'%)',	{ text: vat_amnt }]
								// // 	}
								// // ],
								// // //margin: 20
							 ////   }
						  ////  });
						  //          var objLayout = {};
						  //          objLayout['hLineWidth'] = function(i) { return .5; };
						  //          objLayout['vLineWidth'] = function(i) { return .5; };
						  //          objLayout['hLineColor'] = function(i) { return '#000000'; };
						  //          objLayout['vLineColor'] = function(i) { return '#000000'; };
						           
						  //          doc.content[2].layout = objLayout;
						  //          console.log( doc );
        //                         }
                            
        //                     }
                            ],
                            
                            initComplete: function () {
                                var btns = $('.dt-button');
                                btns.addClass('btn btn-success btn-sm');
                                btns.removeClass('dt-button');
                                  
                            },
                            
                            "columns": [
                                  
                                { "data": 'finished_product_id', defaultContent: '' ,className: "text-center"},
                                 
                                 
                                 { "data": "product_name" },
                                 { "data": "product_qty",className: "text-center"},
                                 { "data": "product_unit",className: "text-center"},
            					 { "data": "product_rate_per_unit_cost",className: "text-right"},
            					     
							           
            				
                                 { "data": "total_amt_report",className: "text-right"}
                                  
            				 	
                             ],
                             "footerCallback": function ( row, data, start, end, display ) {
                                            var api = this.api(), data;
                                 
                                           
                                            // Update footer
                                            // $( api.column( 5 ).footer() ).html(
                                            //         $.fn.dataTable.render.number(',', '.', 3, '').display( total_amount )
                                            //     );
                                                
                                                
                                               
                                                $('tr:eq(1) th:eq(1)', api.table().footer()).html(
                                                    $.fn.dataTable.render.number(',', '.', 3,'' ).display( total_amount )
                                                );
                                                $('tr:eq(2) th:eq(1)', api.table().footer()).html(
                                                    $.fn.dataTable.render.number(',', '.', 3, '').display( vat_amnt  )
                                                );
                                               
                                                // $('tr:eq(2) th:eq(1)', api.table().footer()).html(
                                                //     $.fn.dataTable.render.number(',', '.', 3, 'VAT ('+v_tax_amount+'%): ').display( vat_amnt )
                                                // );
                                                $('tr:eq(3) th:eq(1)', api.table().footer()).html(
                                                    $.fn.dataTable.render.number(',', '.', 3, '').display( vat_added_total_amnt )
                                                );
                                               
                            },
                            pageLength: 10,
            				searching: false,
                            responsive: true,
                            "aoColumnDefs": [
            					{ "bSortable": false, "aTargets": [  0,1,2,3,4,5] ,
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
                            
                            //     "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                            //      $("td:eq(0)", nRow).html(iDisplayIndex + 1);
                            //      return nRow;
                            //   },
                            
                                    
                     });  
                     
                        
                
                 }   
                product_list_table.on( 'order.dt search.dt', function () {
                product_list_table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1;
                product_list_table.cell(cell).invalidate('dom'); 
                } );
                } ).draw();
              
              
  
            
               
    });