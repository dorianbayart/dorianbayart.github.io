
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
		
		// the different classes
		// Basics
		$('.basics').before('<div class="grid-sizer"></div><div class="gutter-sizer"></div>').prepend( '<div class="panel-heading"><h3 class="panel-title"><i class="fa fa-user fa-fw fa-lg"></i>&nbsp;Basics</h3></div>' ).addClass('grid-item panel panel-info panel-heading');
		$('.basics > *:not(.panel-heading):not(.panel-title)').addClass('panel-body');
		
		// Work Experience
		$('.work').prepend( '<div class="panel-heading"><h3 class="panel-title"><i class="fa fa-briefcase fa-fw fa-lg"></i>&nbsp;Work experience</h3></div>' ).addClass('grid-item grid-item--width2 panel panel-info panel-heading');
		$('.work > *:not(.panel-heading):not(.panel-title)').addClass('panel-body');
		
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
		$('.interests').prepend( '<div class="panel-heading"><h3 class="panel-title"><i class="fa fa-heart fa-fw fa-lg"></i>&nbsp;Interests</h3></div>' ).addClass('grid-item panel panel-info panel-heading');
		$('.interests > *:not(.panel-heading):not(.panel-title)').addClass('panel-body');
		
		
		// Replace some text
		$('[id^=summary]').each(function() {
			var text = $(this).text();
			$(this).html(text.replace(/\*/g, '<li>'));
		});
		$('[id^=endDate]').each(function() {
			var text = $(this).text();
			$(this).prepend('&nbsp;<i class="fa fa-angle-double-right fa-fw"></i>&nbsp;');
		});
		$('.work > .panel-body').each(function() {
			var websiteText = $(this).find('> #website').text();
			var companyText = $(this).find('> #company').text();
			$(this).find('> #company').html('<a href="' + websiteText + '" target="_blank">' + companyText + '</a>');
			$(this).find('> #website').remove();
		});
		
		
		// Dates
		$('.panel-body').each(function() {
			$(this).find('> #startDate, > #endDate').wrapAll('<div class="dates"></div>');
		});
		
		
		// Locations
		$('.location').each(function() {
			var address = $(this).find('> #address').text();
			var postalCode = $(this).find('> #postalCode').text();
			var city = $(this).find('> #city').text();
			var countryCode = $(this).find('> #countryCode').text();
			var region = $(this).find('> #region').text();
			if (city.length && countryCode) {
				$(this).find('> #city').text(city+',');
			}
			if (address.length || postalCode.length || city.length ) {
				$(this).find('> #address, > #postalCode, > #city, > #countryCode, > #region').wrapAll('<a href="' + 'https://www.google.fr/maps/place/'+(address.length?address+' ':'')+(postalCode.length?postalCode+' ':'')+(city.length?city:'') + '" target="_blank">');
			}
		});
		
		
		
		// Add icons to different Ids
		$('.location').prepend( '<i class="fa fa-map-marker fa-fw fa-lg"></i>&nbsp;' );
		$('.basics > #summary').prepend('<i class="fa fa-quote-left fa-lg fa-pull-left" aria-hidden="true"></i>');
		$('[id^=company]').prepend( '<i class="fa fa-building-o fa-fw"></i>&nbsp;' );
		$('[id^=institution]').prepend( '<i class="fa fa-university fa-fw"></i>&nbsp;' );
		$('[id^=email]').each(function() {
			var mail = this.textContent;
			this.innerHTML = '<i class="fa fa-envelope-o fa-fw fa-lg"></i>&nbsp;<a href="mailto:' + mail + '" target="_top">' + mail + '</a>';
		});
		$('[id^=phone]').prepend( '<i class="fa fa-phone fa-fw fa-lg"></i>&nbsp;' );
		$('[id^=website]').each(function() {
			var website = this.textContent;
			this.innerHTML = '<i class="fa fa-link fa-fw fa-lg"></i>&nbsp;<a href="' + website + '" target="_blank">' + website + '</a>';
		});
		
		// Add labels to some Ids
		$('.keywords > *').addClass( 'label label-warning' );
		$('.interests > * > .keywords > *').removeClass('label-warning').addClass( 'label-default' );
		$('.highlights > *').addClass( 'label label-info' );
		$('.courses > *').addClass( 'label label-success' );
		
		// Working on profiles
		$('.profiles > div').each(function() {
			var network = $(this).children( 'span#network' );
			var username = $(this).children( 'span#username' );
			var url = $(this).children( 'span#url' );
			username.wrapInner('<a href="' + url.text().toLowerCase() + '" target="_blank"></a>');
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
