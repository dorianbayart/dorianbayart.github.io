
/* Variables */
var userId = '100151962@N07';
var apiKey = '826f4d15aeb395c5566805a0c87ed1ab';
var loaded = 0;

/* Main method */
$(document).ready(function() {
	$(configureTabs(  ));
	
});

function configureTabs (  ) {
	var textTabs = "";
	var contentTabs = "";
	var getPhotosetsURL = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key='+apiKey+'&user_id='+userId+'&format=json&nojsoncallback=1';
	
	$.getJSON(getPhotosetsURL, function( data ) {
		var photosets = data.photosets.photoset;
		$.each( photosets, function( key, val ) {
			
			var id = val.id;
			var title = val.title._content;
			var description = val.description._content;
			var number = val.photos;
			var primary = val.primary;
			var secret = val.secret;
			var server = val.server;
			
			textTabs += '<li role="presentation"><a href="#'+id+'" aria-controls="'+id+'" role="tab" data-toggle="tab"><div class="id">'+id+'</div><div class="primary">'+primary+'</div><div class="secret">'+secret+'</div><div class="server">'+server+'</div><div class="number">'+number+'</div><div class="loaded">'+0+'</div>'+title+'</a></li>';
			contentTabs += '<div role="tabpanel" class="tab-pane fade" id="'+id+'"><div>'+number+' pics in this album</div><div>Album description : '+description+'</div><hr><div class="container-fluid grid"><div class="grid-sizer"></div><div class="gutter-sizer"></div></div></div>';
		});
		
		
		if ( $(photosets).length == 0 ) {
			$( '#myTabs' ).append( '<li role="presentation"><a href="#" aria-controls="" role="tab" data-toggle="tab">Problem downloading the galleries</a></li>' );
		} else {
			$( '#myTabs' ).append( textTabs );
			$( 'div.tab-content' ).append( contentTabs );
		}
		
		$(myTabsActivation(  ));
		
	});
}

function loadTab( t ) {
	var id = $(t).find('.id').text();
	var number = parseInt($(t).find('.number').text());
	var primary = $(t).find('.primary').text();
	var secret = $(t).find('.secret').text();
	var server = $(t).find('.server').text();
	loaded = parseInt($(t).find('.loaded').text());
	var getPhotosURL = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key='+apiKey+'&photoset_id='+id+'&user_id='+userId+'&privacy_filter=1&format=json&nojsoncallback=1';
	if ( loaded < number ) {
		$.getJSON(getPhotosURL, function( data ) {
			var panel = $('#'+id+' > .container-fluid');
			var $grid = $('#'+id+' > .grid');
			var photos = data.photoset.photo;
			$.each( photos, function( key, val ) {
				var farmP = val.farm;
				var idP = val.id;
				var secretP = val.secret;
				var serverP = val.server;
				var titleP = val.title;
				var urlP = 'https://farm'+farmP+'.staticflickr.com/'+serverP+'/'+idP+'_'+secretP+'_n.jpg';
				var clickUrl = 'https://www.flickr.com/photos/'+userId+'/'+idP;
				var $content = $( '<a id="'+idP+'" href="'+clickUrl+'" target="_blank"><img src="'+urlP+'" class="img-responsive img-rounded" alt="'+titleP+'"></a>' );
				$(panel).append($content);
				
				$('#'+idP+' > img').hide().on('load', function(){
					$(this).show();
					$grid.masonry();
				});
			});
			$(t).find('.loaded').text(photos.length);
			$('#'+id+' > .grid').masonry({
				columnWidth: '.grid-sizer',
				gutter: '.gutter-sizer',
				itemSelector: '.img-responsive',
				fitWidth: true,
				percentPosition: true
			});
		});
		
	}
}
