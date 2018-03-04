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
            return (parseInt(a[prop]) > parseInt(b[prop])) ? 1 : (parseInt((a[prop]) < parseInt(b[prop])) ? -1 : 0);
        } else {
            return (parseInt(b[prop]) > parseInt(a[prop])) ? 1 : (parseInt((b[prop]) < parseInt(a[prop])) ? -1 : 0);
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


	//var jsonParsed = JSON.parse(data);
  var jsonParsed = data;

	var text = $(readJson( sortStreams(jsonParsed, "rank", true) ));
  $( '#json' ).append( data );
	$( '#json_ul' ).html("").append( text );

	$('#json_ul > div').each(function() {

    $(this).find('> #id, > #24h_volume_usd, > #market_cap_usd, > #available_supply, > #total_supply, > #max_supply, > #percent_change_7d, > #last_updated, > #24h_volume_eur, > #market_cap_eur').hide();

		var title = $(this).children( 'span#name' );
		var country = $(this).children( 'span#country' );
		var flag = $(this).children( 'span#flag' );
		var url = $(this).children( 'span#url' );
		var slogan = $(this).children( 'span#slogan' );

		var uniqID = $(this).children( 'span#id' ).text();

		$(this).addClass('panel panel-info');

		//title.wrap('<div class="panel-heading" data-toggle="collapse" data-target="#'+uniqID+'" aria-expanded="false" aria-controls="'+uniqID+'">');
    $(this).find('> #rank, > #name, > #symbol, > #price_eur').wrapAll('<div class="panel-heading" data-toggle="collapse" data-target="#'+uniqID+'" aria-expanded="false" aria-controls="'+uniqID+'">').wrapAll('<div class="row">');
		$(this).find('> #price_usd, > #price_btc, > #percent_change_1h, > #percent_change_24h').wrapAll('<div class="panel-collapse collapse" id="'+uniqID+'">').wrapAll('<div class="panel-body">').wrapAll('<div class="row">');

		$(this).find('#rank, #name, #symbol, #price_eur').each(function() {
      $(this).wrap('<div class="col-xs-3">');
    });
    $(this).find('#price_usd, #price_btc, #percent_change_1h, #percent_change_24h').each(function() {
      $(this).wrap('<div class="col-xs-3">');
    });

    // Montants
    var euros = $(this).find('#price_eur').text();
    if(euros > 1) {
      euros = Math.round(euros * 100) / 100;
    } else {
      euros = Math.round(euros * 10000) / 10000;
    }
    $(this).find('#price_eur').text(euros);

    $(this).find('#rank').prepend('#');
    $(this).find('#price_eur').append('€');
    $(this).find('#price_usd').prepend('$');
    $(this).find('#price_btc').append(' BTC');
    $(this).find('#percent_change_1h').append('% (1h)');
    $(this).find('#percent_change_24h').append('% (24h)');

		/*slogan.wrap('<blockquote class="blockquote">');

		$('#'+uniqID).on('show.bs.collapse', function () { // show the audio tag
			if(url.text().toLowerCase().includes('http'))
				url.html( '<audio controls preload="metadata"><source src="' + url.text().toLowerCase() + '">Your browser does not support the audio element.</audio>' );
		})
		$('#'+uniqID).on('hidden.bs.collapse', function () { // destroy the audio tag

		});

    */
	});

	/*$( '.streams #flag' ).each(function() {
		var codeISO = $(this).text();
		$(this).html('<figure><img src="https://lipis.github.io/flag-icon-css/flags/4x3/'+ codeISO +'.svg" /></figure>');
	});
	$('.tags > *').addClass( 'label label-info' );*/
}

$(document).ready(function() {

  $.ajax({
    url: "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=25",
    dataType: 'json',
    success: function(data) {
      generateList(data);
    },
    error: function(e) {
      alert(e);
    }
  });

		//generateList();

		$( '#filterSelectLanguage' ).on("change", function() {
			generateList();
		});

		$( '#filterInputName' ).on("change keyup", function() {
			generateList();
		});

});
