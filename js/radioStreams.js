
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

$("#showButton").click(function(){
    $("#json").toggle(1000);
});

function sortStreams(json, prop, asc) {
	json.streams = json.streams.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
    return json;
}

function filtering(json, criteria){
  json.streams = json.streams.filter(function(obj) {
    return Object.keys(criteria).every(function(c) {
      return obj[c].toLowerCase().includes(criteria[c].toLowerCase());
    });
  });
	return json;
}

function hideAudio() {
	
	$(this).hide();
	console.log(e);
	
}

function generateList() {

	var filterSelectLanguage = $( '#filterSelectLanguage' ).val();
	var filterInputName = $( '#filterInputName' ).val();
	
	var jsonParsed = JSON.parse($('#json').text());
	var jsonfilteredByLanguage = filtering( jsonParsed, {flag: filterSelectLanguage});
	var jsonfilteredByName = filterInputName!= "" ? filtering( jsonfilteredByLanguage, {title: filterInputName}) : jsonfilteredByLanguage;

	var text = $(readJson( sortStreams(jsonfilteredByName, "title", true) ));
	$( '#json' ).hide();
	$( '#json_ul' ).html("").append( text );
	
	$('.streams > div').each(function() {
		var title = $(this).children( 'span#title' );
		var country = $(this).children( 'span#country' );
		var url = $(this).children( 'span#url' );
		
		$(this).addClass('panel panel-info');
		
		title.wrap('<div class="panel-heading">');
		$(this).find('> #country, > #url, > #flag, > .tags').wrapAll('<div class="panel-body">').wrapAll('<div class="row">');
		$(this).find('#country, #flag, .tags').wrapAll('<div class="col-sm-6">');
		
		url.html( '<audio controls><source src="' + url.text().toLowerCase() + '">Your browser does not support the audio element.</audio>' ).wrap('<div class="col-sm-6">');
		
	});
	
	$( '.streams #flag' ).each(function() {
		var codeISO = $(this).text();
		$(this).html('<figure><img src="https://lipis.github.io/flag-icon-css/flags/4x3/'+ codeISO +'.svg" /></figure>');
	});
	$('.tags > *').addClass( 'label label-info' );
}

$(document).ready(function() {
		
		generateList();
		
		$( '#filterSelectLanguage' ).on("change", function() {
			generateList();
		});
		
		$( '#filterInputName' ).on("change keyup", function() {
			generateList();
		});
		
});
