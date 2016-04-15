

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




$(document).ready(function() {
	
	$.getJSON('http://dbayart.github.io/cv/cv_dbayart.json', function( data ) {
		var text = $(readJson( data ));
		$( '#json_ul' ).append( text );
		
		// the different classes
		// Basics
		$('.basics').before('<div class="grid-sizer"></div><div class="gutter-sizer"></div>').prepend( '<div class="panel-heading"><h3 class="panel-title"><i class="fa fa-user fa-fw fa-lg"></i>&nbsp;Basics</h3></div>' ).addClass('grid-item panel panel-info panel-heading');
		$('.basics > *:not(.panel-heading):not(.panel-title)').addClass('panel-body');
		
		// Work Experience
		$('.work').prepend( '<div class="panel-heading"><h3 class="panel-title"><i class="fa fa-briefcase fa-fw fa-lg"></i>&nbsp;Work experience</h3></div>' ).addClass('grid-item grid-item--width2 panel panel-info panel-heading');
		$('.work > *:not(.panel-heading):not(.panel-title)').addClass('panel-body');
		$('[id^=summary]').html().replace(/\*/g, '<li>');
		
		// Education
		$('.education').prepend( '<div class="panel-heading"><h3 class="panel-title"><i class="fa fa-graduation-cap fa-fw fa-lg"></i>&nbsp;Education</h3></div>' ).addClass('grid-item grid-item--width2 panel panel-info panel-heading');
		$('.education > *:not(.panel-heading):not(.panel-title)').addClass('panel-body');
		
		// Languages
		$('.languages').prepend( '<div class="panel-heading"><h3 class="panel-title"><i class="fa fa-language fa-fw fa-lg"></i>&nbsp;Languages</h3></div>' ).addClass('grid-item panel panel-info panel-heading');
		$('.languages > *:not(.panel-heading):not(.panel-title)').addClass('panel-body');
		
		// Skills
		$('.skills').prepend( '<div class="panel-heading"><h3 class="panel-title"><i class="fa fa-star fa-fw fa-lg"></i>&nbsp;Skills</h3></div>' ).addClass('grid-item panel panel-info panel-heading');
		$('.skills > *:not(.panel-heading):not(.panel-title)').addClass('panel-body');
		
		// Interests
		$('.interests').prepend( '<div class="panel-heading"><h3 class="panel-title"><i class="fa fa-user fa-fw fa-lg"></i>&nbsp;Interests</h3></div>' ).addClass('grid-item panel panel-info panel-heading');
		$('.interests > *:not(.panel-heading):not(.panel-title)').addClass('panel-body');
		
		// Add icons to different Ids
		$('[id^=location]').prepend( '<i class="fa fa-map-marker fa-fw"></i>&nbsp;' );
		$('[id^=company]').prepend( '<i class="fa fa-building-o fa-fw"></i>&nbsp;' );
		$('[id^=institution]').prepend( '<i class="fa fa-university fa-fw"></i>&nbsp;' );
		$('[id^=email]').each(function() {
			var mail = this.textContent;
			this.innerHTML = '<i class="fa fa-envelope-o fa-fw fa-lg"></i>&nbsp;<a href="mailto:' + mail + '" target="_top">' + mail + '</a>';
		});
		$('[id^=phone]').prepend( '<i class="fa fa-phone fa-fw fa-lg"></i>&nbsp;' );
		$('[id^=website]').each(function() {
			var website = this.textContent;
			this.innerHTML = '<i class="fa fa-link fa-fw fa-lg"></i>&nbsp;<a href="' + website + '" target="_top">' + website + '</a>';
		});
		
		// Add labels to some Ids
		$('.keywords > *').addClass( 'label label-warning' );
		$('.interests > .keywords > *').addClass( 'label label-success' );
		$('.highlights > *').addClass( 'label label-info' );
		$('.courses > *').addClass( 'label label-default' );
		
		// Working on profiles
		$('.profiles > div').each(function() {
			var network = $(this).children( 'span#network' );
			var username = $(this).children( 'span#username' );
			var url = $(this).children( 'span#url' );
			username.wrapInner('<a href="' + url.text().toLowerCase() + '" target="_top"></a>');
			username.prepend('<i class="fa fa-'+network.text().toLowerCase()+' fa-fw fa-lg"></i>&nbsp;');
			network.remove();
			url.remove();
		});
		
		$('.grid').masonry({
			// options
			columnWidth: '.grid-sizer',
			itemSelector: '.grid-item',
			gutter: '.gutter-sizer',
			transitionDuration: '0.8s',
			percentPosition: true
		});
	});

});

