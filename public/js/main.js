$(document).on('ready', function () {

	// Bar graph generation
	$('.bar-graph .graph-item').each(function(i) {
		var graphItem = $(this);
		var label = graphItem.data('graph-item-label');
		var value = graphItem.data('graph-item-value');

		$('<span class="lbl">' + label + '</span>').appendTo(graphItem);
		var bar = $('<div class="value-bar"></div>').appendTo(graphItem);
		var barVal = $('<div class="value-bar-value"></div>').appendTo(bar);

		setTimeout(function() {
			barVal.css('width', value + '%');
		}, (i + 1) * 200);
	});

	// Text fade in
	$('header h1').akTextFadeIn();
	$('.intro .me').akTextFadeIn();
});