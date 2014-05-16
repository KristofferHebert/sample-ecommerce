	function queryProducts(param) {
	    var request = {
	        url: 'http://hirekris.com/sample-e-commerce/Database.json',
	        dataType: 'json',
	        error: displayError
	    };
	    if (param) {
	        request.success = updateIndividualPage;
	    } else {
	        request.success = updateSearchPage;
	    }
	    $.ajax(request);
	}

	function searchJson(query, param) {
	    for (var i = 0; i < query.length; i++) {
	        if (query[i].style_id == param) {
	            return query[i];
	        }
	    }
	};

	function updateSearchPage(query) {
	    console.log(query);
	    var thumbBaseUrl = 'http://g.nordstromimage.com/imagegallery/store/product/medium/';
	    var content = $('#main-content');

	    var products = $.map(query, function (key, val) {
	        var product = '<div class="product column left">';
	        product += '<a href="product-page.html?id=' + key.style_id + '">';
	        product += '<img src="' + thumbBaseUrl + key.image_url + '.jpg"/></a>';
	        product += '<div class="productMeta"><p>';
	        product += key.formatted_regular_price + '<br />';
	        product += key.name + '<br />';
	        product += key.brand + '<br />';
	        product += '</p></div>';
	        product += '</div>';
	        return product;
	    });

	    $(content).html(products);
	}

	function updateIndividualPage(query) {
	    var single = searchJson(query, getUrlParam('id'));
	    var largeBaseUrl = 'http://g.nordstromimage.com/imagegallery/store/product/large/';
	    var content = $('#main-content');
	    var product = '<nav class="clear"><span class="right"><a href="index.html">Back To Search Results:</a></span></nav>';
	    product += '<section id="productLargeImageContainer" class="left column">';
	    product += '<img src="' + largeBaseUrl + single.image_url + '.jpg"/></section>';
	    product += '<section id="productLargeImageContainer" class="left column">';
	    product += '<table class="productMeta">';
	    product += '<tr><td>Brand: </td><td>' + single.brand + '</td></tr>';
	    product += '<tr><td>Description: </td><td>' + single.name + '</td></tr>';
	    product += '<tr><td>Product Id: </td><td>' + single.style_id + '</td></tr>';
	    product += '<tr><td>Price: </td><td>' + single.formatted_regular_price + '</td></tr>';
	    product += '</table>';
	    product += '<p><a href="#" class="button">Add to cart</a></p>';
	    product += '</section>';
	    $(content).html(product);

	}

	function displayError(req, err) {
	    console.log(err);
	    var content = $('#main-content');
	    $(content).empty().html('<h2> 404 product missing</h2>');
	}

	function getUrlParam(value) {
	    var results = new RegExp('[\\?&amp;]' + value + '=([^&amp;#]*)').exec(window.location.href);
	    return results[1] || 0;
	}