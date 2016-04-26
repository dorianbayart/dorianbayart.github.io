

function myTabsActivation(  ) {
	$('#myTabs a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
		
		loadTab( $(this) );
		
  });
	$('#myTabs > li').first().addClass('active');
	$('div.tab-content > div').first().addClass('in active');
	loadTab( $('#myTabs > li').first() );
}

