
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
	// console.log( text );
	return text;
}

$("#showButton").click(function(){
    $("#json").toggle(1000);
});

$(document).ready(function() {
	
		var text = $(readJson( JSON.parse($('#json').text()) ));
		$( '#json' ).hide();
		$( '#json_ul' ).append( text );
		
		
		
		
		$('.streams > div').each(function() {
			var title = $(this).children( 'span#title' );
			var country = $(this).children( 'span#country' );
			var url = $(this).children( 'span#url' );
			
			$(this).addClass('panel panel-info');
			
			title.wrap('<div class="panel-heading">');
			$(this).find('> #country, > #url').wrapAll('<div class="panel-body">');
			
			url.html( '<audio controls><source src="' + url.text().toLowerCase() + '" type="audio">Your browser does not support the audio element.</audio>' );
			
		});
		
		
});
