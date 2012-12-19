AJAX PayPal Cart JQuery Plugin v.1.0.0 Readme
========================
Copyright (c) 2011 DIGICRAFTS. All rights reserved.

Contents
=======
1.Release Notes
2.Requirements
3.Installation
4.Support

1. Release Notes
======================

< 10/4/2011 AJAX PayPal Cart JQuery Plugin 1.0.0>

    * First public release


2.Requirements
======================

    * Requires JQuery framework 1.4.x. www.jquery.com
    * Safari 4.x-5.x, Mobile Safari, Firefox 3.4+, IE 7+, Chrome 7+

4.Installation
======================

1. Unzip the product.
2. Copy the "lib" folder into your project directory.
3. Include the library by adding the following headers between <head> tag.

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js" type="text/javascript"></script>
    
    <!-- CSS for this product-->
    <link rel="stylesheet" type="text/css" href="lib/dc.core.1.0.0.min.css" />    
    <link rel="stylesheet" type="text/css" href="lib/dc.cart.css" />
    
    <!-- Javascript for this product-->
    <script src="lib/dc.core.1.0.0.min.js" type="text/javascript"></script>  
    <script src="lib/dc.cart.1.0.0.min.js" type="text/javascript"></script>      
    <script src="lib/dc.cart.lang.js" type="text/javascript"></script>    

4. Insert a <div id="cart"></div> tag in your html where you want to put the cart widget. 

5. Insert below script in between <head> tag.

<script type="text/javascript">
    $(function(){
        // Create a basic cart
        var cart = $('#cart').DCAJAXPaypalCart({
            width:600,
            height:400,
            paypalOptions:{
                business:'YOU_PAYPAL_EMAIL@email.com'
            }
        });

    });
</script> 


6. Now, you can test the cart by open the html in your browser.

7. To add a buy button. Insert a link in your html. 
	
	<a id="item_1">Buy this product</a>

8. Insert the follow script below the create cart script.

    $(function(){
		ии

        // Create a buy button from a link with id "buy_button_1"
        cart.addBuyButton("#buy_button_1",{
            id:'item_1',                        // Specify the unique id for this item
            name:'Item 1',                  	// Item name appear on the cart
            thumbnail:'product_thumbnail.jpg',  // Thumbnail path of the item (Optional)
            price:'10'                          // Cost of the item
            shipping:5         				// Shipping cost for the item (Optional)
        });
	});

9. You can test it in a browser. Click the link will add a product to cart.

4.Support
======================

You can refer to the examples in the following URL:
http://livedocs.digicrafts.com.hk/examples/JSAJAXPayPalCart

Also, you can visit our support site for more tutorials.
http://support.digicrafts.com.hk

========================
Copyright (c) 2011 DIGICRAFTS. All rights reserved.