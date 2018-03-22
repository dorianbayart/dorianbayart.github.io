function readJson( data ) {
	var text = "";
	$.each( data, function( key, val ) {
		if (typeof val == 'object') {
			text += "<div class='" + key + "'>" + readJson(val) + "</div>";
		} else {
			if ( val !== null && val != "" )
				text += "<span id='" + key + "'>" + val + "</span>";
		}
	});
	return text;
}

function sortStreams(json, prop, asc) {
	json = json.sort(function(a, b) {
        if (asc) {
		return parseInt(a[prop]) > parseInt(b[prop]) ? 1 : -1;
        } else {
            return parseInt(b[prop]) > parseInt(a[prop]) ? 1 : -1;
        }
    });
    return json;
}

function filtering(json, criteria){
  json = json.filter(function(obj) {
    return Object.keys(criteria).every(function(c) {
      return obj[c].toLowerCase().includes(criteria[c].toLowerCase());
    });
  });
	return json;
}

function generateList(data) {
	var jsonParsed = data;
	var text = $(readJson( sortStreams(jsonParsed, "rank", true) ));
  $( '#json' ).append( data );
	$( '#json_ul' ).html("").append( text );

	$('#json_ul > div').each(function() {

		var id = $(this).children( 'span#id' ).text();
		var name = $(this).children( 'span#name' ).text();
		var symbol = $(this).children( 'span#symbol' ).text();
		var rank = $(this).children( 'span#rank' ).text();

		var price_eur = $(this).children( 'span#price_eur' ).text();
		var price_usd = $(this).children( 'span#price_usd' ).text();

		var percent_change_1h = $(this).children( 'span#percent_change_1h' ).text();
		var percent_change_24h = $(this).children( 'span#percent_change_24h' ).text();
		var percent_change_7d = $(this).children( 'span#percent_change_7d' ).text();

		$(this).addClass('row');
		$(this).attr('id', id);
		$(this).find('span').remove();

		var text = "";
		text += "<div class='col-xs-2 col-sm-1'><span id='rank'>" + rank + "</span></div>";
		text += "<div class='hidden-xs col-sm-1'><span id='symbol'>" + symbol + "</span></div>";
		text += "<div class='col-xs-6 col-sm-4'><span id='name'>" + name + "</span></div>";
		text += "<div class='col-xs-4 col-sm-2'><span id='price_eur'> " + price_eur + "</span></div>";
		text += "<div class='hidden-xs col-sm-4'><div class='row'>";
			text += "<div class='col-xs-4'><span id='percent_change_1h'>" + percent_change_1h + "</span></div>";
			text += "<div class='col-xs-4'><span id='percent_change_24h'>" + percent_change_24h + "</span></div>";
			text += "<div class='col-xs-4'><span id='percent_change_7d'>" + percent_change_7d + "</span></div>";
		text += "</div></div>";

		$(this).append(text);

		updateSymbols($(this));

	});
}

function updateSymbols(doc) {
	var euros = $(doc).find('#price_eur').text();
	if(euros > 1) {
		euros = Math.round(euros * 100) / 100;
	} else {
		euros = Math.round(euros * 10000) / 10000;
	}
	$(doc).find('#price_eur').text(euros);

	$(doc).find('#rank').prepend('#');
	$(doc).find('#price_eur').append('€');
	$(doc).find('#price_usd').prepend('$');
	$(doc).find('#price_btc').append(' BTC');
	
	changeTextColor(doc, '#percent_change_1h');
	changeTextColor(doc, '#percent_change_24h');
	changeTextColor(doc, '#percent_change_7d');
}

function changeTextColor(doc, id) {
	var object = $(doc).find(id);
	var value = parseFloat(object.text());
	if (value > 0) {
		object.css('color','green');
	} else if (value < 0) {
		object.css('color','red');
	}
}

function updateList() {

	$.ajax({
    url: "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=25",
    dataType: 'json',
    success: function(data) {
			$.each( data, function( number, line ) {
				var id = line.id;
				$.each( line, function( key, val ) {
					$("#"+id+" #"+key).text(val);
				});
				updateSymbols($("#"+id));
			});

    },
    error: function(e) {
      console.log(e);
    }
  });

}

$(document).ready(function() {
  $.ajax({
    url: "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=25",
    dataType: 'json',
    success: function(data) {
      generateList(data);
    },
    error: function(e) {
      console.log(e);
    }
  });

	var updateTimer = setInterval(function(){ updateList() }, 15000);

		$( '#filterSelectLanguage' ).on("change", function() {
			generateList();
		});

		$( '#filterInputName' ).on("change keyup", function() {
			generateList();
		});

});
