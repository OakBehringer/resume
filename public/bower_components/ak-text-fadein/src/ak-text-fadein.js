
(function ($) {

	var easing = {
		easeInOutQuad: function(t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},
		easeOutQuad: function(t, b, c, d) {return -c * (t/=d)*(t-2) + b;},
		easeInQuad: function(t, b, c, d) {return c*(t/=d)*t + b;}
	}

	var makeNodes = function(cont) {
		var $cont = $(cont);
		var n;
		var rtn = [];
		var replacements = [];

		for (var i in $cont.toArray()) {
			n = $cont[i];

			for (var i = 0; i < n.childNodes.length; i++) {
				// text node
				if (n.childNodes[i].nodeType == 3) {
					var chars = n.childNodes[i].textContent.split('');
					var newCont = [];
					var curCont;

					for (j in chars) {
						if (chars[j].match(/\s/) !== null) {
							newCont.push(chars[j]);
						}
						else {
							curCont = $('<span class="ak-text-fadein-char">' + chars[j] + '</span>');
							rtn.push(curCont);
							newCont.push(curCont);
						}
					}

					replacements.push([ $(n.childNodes[i]), newCont ]);
				}
				else {
					rtn = rtn.concat(makeNodes(n.childNodes[i]));
				}
			}
		}

		for (var i in replacements) {
			replacements[i][0].replaceWith(replacements[i][1]);
		}

		return rtn;
	}

	$.fn.akTextFadeIn = function() {
		this.each(function(i, n) {
			var allFadeIns = makeNodes(n);
			$(n).addClass('started');

			var c = 0;
			var time = 0;
			var minTime = 0;
			var maxTime = 1200;

			for (var i = 0; i < allFadeIns.length; i++) {

				(function(ii){
					setTimeout(function(){
						allFadeIns[ii].addClass('ak-show');
					}, time);
				}(i))

				time = easing.easeInQuad(i, minTime, maxTime, allFadeIns.length);
			}
		});

		return this;
	}
}( jQuery ));