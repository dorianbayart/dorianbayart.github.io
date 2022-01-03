let url_request = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250"
let url_categories = "https://api.coingecko.com/api/v3/coins/categories/list"
let categorySelected = ""

function readJson(data) {
	var text = "";
	$.each(data, function (key, val) {
		if (typeof val == 'object') {
			text += "<div class='" + key + "'>" + readJson(val) + "</div>";
		} else {
			if (val !== null && val != "") text += "<span id='" + key + "'>" + val + "</span>";
		}
	});
	return text;
}

function sortStreams(json, prop, asc) {
	json = json.sort(function (a, b) {
		if (asc) {
			return parseInt(a[prop]) > parseInt(b[prop]) ? 1 : -1;
		} else {
			return parseInt(b[prop]) > parseInt(a[prop]) ? 1 : -1;
		}
	});
	return json;
}

function filtering(json, criteria) {
	json = json.filter(function (obj) {
		return Object.keys(criteria).every(function (c) {
			return obj[c].toLowerCase().includes(criteria[c].toLowerCase());
		});
	});
	return json;
}

function generateCategories(list) {
	/* Traitement des données */
	$('#categories').html("");
	
	$('#categories').append("<li id='all' value=''>None</li>");
	list.forEach(category => {
		$('#categories').append(`<li id='${category.category_id}' data-value='&${category.category_id}'>${category.name}</li>`);
	});
}

function generateList(data) {
	/* Traitement des données */
	var jsonParsed = data;
	var text = $(readJson(sortStreams(jsonParsed, "market_cap_rank", true)));
	$('#json').append(data);
	$('#json_ul').html("").append(text);
	$('#json_ul > div').each(function () {
		var id = $(this).children('span#id').text();
		var name = $(this).children('span#name').text();
		var symbol = $(this).children('span#symbol').text();
		var rank = $(this).children('span#market_cap_rank').text();
		var image = $(this).children('span#image').text();
		// var price_eur = $(this).children('span#price_eur').text();
		var current_price = $(this).children('span#current_price').text();
		// var percent_change_1h = $(this).children('span#percent_change_1h').text();
		var percent_change_24h = $(this).children('span#price_change_percentage_24h').text();
		// var percent_change_7d = $(this).children('span#percent_change_7d').text();
		$(this).addClass('row');
		$(this).attr('id', id);
		$(this).find('span').remove();
		var text = "";
		text += "<div class='hidden-xs col-sm-2'><span id='market_cap_rank'>" + rank + "</span></div>";
		text += "<div class='col-xs-2 col-sm-2'><span id='symbol'>" + symbol + "</span></div>";
		text += "<div class='col-xs-2 col-sm-1'><img id='image' height='18px' width='18px' src='"+ image +"'></div>";
		text += "<div class='hidden-xs col-sm-3'><span id='name'>" + name + "</span></div>";
		text += "<div class='col-xs-4 col-sm-2'><span id='current_price'> " + current_price + "</span></div>";
		text += "<div class='col-xs-4 col-sm-2'><div class='row'>";
		// text += "<div class='col-xs-4'><span id='percent_change_1h'>" + percent_change_1h + "</span></div>";
		text += "<div class='col-xs-12'><span id='price_change_percentage_24h'>" + percent_change_24h + "</span></div>";
		// text += "<div class='col-xs-4'><span id='percent_change_7d'>" + percent_change_7d + "</span></div>";
		text += "</div></div>";
		$(this).append(text);
		updateSymbols($(this));
	});
}

function updateSymbols(doc) {
	// Price
	var price = $(doc).find('#current_price').text();
	if (price > 1) {
		price = Math.round(price * 100) / 100;
	} else {
		price = Math.round(price * 10000) / 10000;
	}
	$(doc).find('#current_price').text(price);

	// Percentage
	var percentage = $(doc).find('#price_change_percentage_24h').text();
	percentage = Math.round(parseFloat(percentage)*100)/100;
	$(doc).find('#price_change_percentage_24h').text(percentage);
	changeTextColor(doc, '#price_change_percentage_24h');

	/* Petite mise en page */
	var mq = window.matchMedia('screen and (min-width: 768px)');
	if (mq.matches) { // the width of browser is more then 768px
		$(doc).find('#current_price').parent().css('text-align', 'inherit');
	} else { // the width of browser is less then 768px
		$(doc).find('#current_price').parent().css('text-align', 'right');
	}
}

function changeTextColor(doc, id) {
	var object = $(doc).find(id);
	var value = parseFloat(object.text());
	if (value > 0) {
		object.css('color', 'green');
	} else if (value < 0) {
		object.css('color', 'red');
	}
}

function updateList() {
	$.ajax({
		url: url_request + categorySelected,
		dataType: 'json',
		success: function (data) {
			$.each(data, function (number, line) {
				var id = line.id;
				$.each(line, function (key, val) {
					$("#" + id + " #" + key).text(val);
				});
				updateSymbols($("#" + id));
			});
		},
		error: function (e) {
			console.log(e);
		}
	});
}

$(document).ready(function () {
	$.ajax({
		url: url_categories,
		dataType: 'json',
		success: function (data) {
			generateCategories(data);
		},
		error: function (e) {
			console.log(e);
		}
	});
	$.ajax({
		url: url_request + categorySelected,
		dataType: 'json',
		success: function (data) {
			generateList(data);
		},
		error: function (e) {
			console.log(e);
		}
	});
	var updateTimer = setInterval(function () {
		updateList()
	}, 15000);
	$('#filterSelectLanguage').on("change", function () {
		generateList();
	});
	$('#filterInputName').on("change keyup", function () {
		generateList();
	});
	$('#categories').on("click", function (e) {
		categoryClick(e.target);
	});
});

function categoryClick(item) {
	if(item.id && item.id !== "categories") {
		categorySelected = item.getAttribute("data-value");
		console.log(item);
		
		$.ajax({
			url: url_request + categorySelected,
			dataType: 'json',
			success: function (data) {
				generateList(data);
			},
			error: function (e) {
				console.log(e);
			}
		});
	}
}
