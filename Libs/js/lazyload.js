!function(a, b, c, d) {
	function h(c, f) {
		var g;
		return g = f.container === d || f.container === b ? (b.innerHeight
				? b.innerHeight
				: e.height())
				+ e.scrollTop() : a(f.container).offset().top
				+ a(f.container).height(), g <= a(c).offset().top - f.threshold
	}
	function i(c, f) {
		var g;
		return g = f.container === d || f.container === b
				? e.width()
						+ (a.fn.scrollLeft ? e.scrollLeft() : b.pageXOffset)
				: a(f.container).offset().left + a(f.container).width(), g <= a(c)
				.offset().left
				- f.threshold
	}
	function j(c, f) {
		var g;
		return g = f.container === d || f.container === b
				? e.scrollTop()
				: a(f.container).offset().top, g >= a(c).offset().top
				+ f.threshold + a(c).height()
	}
	function k(c, f) {
		var g;
		return g = f.container === d || f.container === b ? a.fn.scrollLeft ? e
				.scrollLeft() : b.pageXOffset : a(f.container).offset().left, g >= a(c)
				.offset().left
				+ f.threshold + a(c).width()
	}
	function l(b, c) {
		var d = 0;
		b.each(function() {
					function e() {
						b.trigger("_lazyload_appear"), d = 0
					}
					var b = a(this);
					if (!c.skip_invisible || b.width() || b.height()
							|| "none" === b.css("display"))
						if (c.vertical_only)
							if (j(this, c))
								;
							else if (h(this, c)) {
								if (++d > c.failure_limit)
									return !1
							} else
								e();
						else if (j(this, c) || k(this, c))
							;
						else if (h(this, c) || i(this, c)) {
							if (++d > c.failure_limit)
								return !1
						} else
							e()
				})
	}
	function m(b) {
		var c = a.grep(b, function(a) {
					return !a._lazyload_loadStarted
				});
		return a(c)
	}
	var e = a(b), f = {
		threshold : 0,
		failure_limit : 0,
		event : "scroll",
		effect : "show",
		effect_params : null,
		container : b,
		data_attribute : "original",
		skip_invisible : !0,
		appear : null,
		load : null,
		vertical_only : !1,
		placeholderDataImg : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
		placeholderRealImg : "http://webmap4.map.bdimg.com/yyfm/lazyload/0.0.1/img/placeholder.png"
	}, g = /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion);
	a.fn.lazyload = function(c) {
		var i, j, h = this;
		return a.isPlainObject(c) || (c = {}), a.each(f, function(a, b) {
					!f.hasOwnProperty(a) || c.hasOwnProperty(a)
							&& typeof c[a] == typeof f[a] || (c[a] = b)
				}), i = c.container === d || c.container === b
				? e
				: a(c.container), j = "scroll" == c.event
				|| "scrollstart" == c.event || "scrollstop" == c.event, h.each(
				function() {
					var b = this, e = a(b), f = e.attr("src"), g = e
							.attr("data-" + c.data_attribute), i = e.is("img");
					return 1 == b._lazyload_loadStarted || f == g
							? (b._lazyload_loadStarted = !0, h = m(h), void 0)
							: (b._lazyload_loadStarted = !1, i && !f
									&& e.on("error", function() {
												e.attr("src",
														c.placeholderRealImg)
											})
											.attr("src", c.placeholderDataImg), e
									.one("_lazyload_appear", function() {
										var f, k, j = a
												.isArray(c.effect_params);
										b._lazyload_loadStarted
												|| (k = "show" != c.effect
														&& a.fn[c.effect]
														&& (!c.effect_params || j
																&& 0 == c.effect_params.length), c.appear
														&& (f = h.length, c.appear
																.call(b, f, c)), b._lazyload_loadStarted = !0, a("<img />")
														.on("load", function() {
															var a;
															k && e.hide(), i
																	? e
																			.attr(
																					"src",
																					g)
																	: e
																			.css(
																					"background-image",
																					'url("'
																							+ g
																							+ '")'), k
																	&& e[c.effect]
																			.apply(
																					e,
																					j
																							? c.effect_params
																							: d), h = m(h), c.load
																	&& (a = h.length, c.load
																			.call(
																					b,
																					a,
																					c))
														}).attr("src", g))
									}), j || e.on(c.event, function() {
										b._lazyload_loadStarted
												|| e
														.trigger("_lazyload_appear")
									}), void 0)
				}), j && i.on(c.event, function() {
					return l(h, c)
				}), e.on("resize", function() {
					l(h, c)
				}), g && e.on("pageshow", function(a) {
					a.originalEvent && a.originalEvent.persisted
							&& h.trigger("_lazyload_appear")
				}), a(function() {
					l(h, c)
				}), this
	}
}(window.jQuery || window.Zepto, window, document);