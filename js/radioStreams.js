
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
		var flag = $(this).children( 'span#flag' );
		var codec = $(this).children( 'span#codec' );
		var sampling = $(this).children( 'span#sampling' );
		var bitrate = $(this).children( 'span#bitrate' );
		var url = $(this).children( 'span#url' );
		var slogan = $(this).children( 'span#slogan' );
		
		var uniqID = "id" + Date.now() + "_" + title.text().replace(/[^a-zA-Z0-9_-]+/g, '');
		
		$(this).addClass('panel panel-info');
		
		title.wrap('<button class="panel-heading" data-toggle="collapse" data-target="#'+uniqID+'" aria-expanded="false" aria-controls="'+uniqID+'">');
		$(this).find('> #country, > #url, > #flag, > #slogan, > .tags').wrapAll('<div class="panel-collapse collapse" id="'+uniqID+'">').wrapAll('<div class="panel-body">').wrapAll('<div class="row">');
		
		$(this).find('#country, #flag, .tags, #codec, #sampling, #bitrate').wrapAll('<div class="col-sm-6">');
		$(this).find('#url, #slogan').wrapAll('<div class="col-sm-6">');
		
		slogan.wrap('<blockquote class="blockquote">');
		
		$('#'+uniqID).on('show.bs.collapse', function () { // show the audio tag
			if(url.text().toLowerCase().includes('http'))
				url.html( '<audio controls preload="metadata"><source src="' + url.text().toLowerCase() + '">Your browser does not support the audio element.</audio>' );
		})
		$('#'+uniqID).on('hidden.bs.collapse', function () { // destroy the audio tag
			
		});
		
		$(this).find('#codec').addClass('label label-primary');
		$(this).find('#sampling').addClass('label label-success').append(' Hz');
		$(this).find('#bitrate').addClass('label label-warning').append(' kbit/s');
	});
	
	$( '.streams #flag' ).each(function() {
		var codeISO = $(this).text();
		$(this).html('<figure><img src="https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/'+ codeISO +'.svg" /></figure>');
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
