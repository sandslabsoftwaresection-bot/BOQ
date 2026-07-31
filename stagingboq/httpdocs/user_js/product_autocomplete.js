"use strict";
$(document).ready(function () {
	var options = {
        data: [
    		{product_name:"Item 1"},
            {product_name:"Item 2"},
    		{product_name:"Item 3"},
            // Add more items as needed
        ],
        getValue: "product_name",
        list: {
            match: {
                enabled: true,
            },
        },
    };
    // $("#txt_product_name").easyAutocomplete(options);
	$("#txt_product_name").on("keyup", function () {
        var inputText = $(this).val();
        //alert(inputText);
        // Send an AJAX request to fetch data 
        $.post("../controller/product/product_controller.php", { action: 'fetch_product', product_name: inputText }, function (result, status) {
            //console.log(options);
            // Update the data property of your easyAutocomplete instance
            options.data = result;
            // Refresh the easyAutocomplete dropdown with new data
            $("#txt_product_name").easyAutocomplete(options);
            $("#txt_product_name").focus();
        });
    });
});