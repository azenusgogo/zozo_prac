(function(a) {
	a.fn.vslide = function(b) {
		var c = {
			width : a(this).width(),
			height : a(this).find("li").eq(0).height(),
			li_width : a(this).find("li").eq(0).width(),
			box : ".rotation_h",
			left_bt : "#left",
			right_bt : "#right",
			step : 1,
			time : 500,
			ani : true,
			auto : false
		};
		var b = a.extend(c, b);
		this.each(function() {
			/*a.extend(a.easing, {
				bt : function(o, p, n, r, q) {
					return (p == q) ? n + r : r
							* (-Math.pow(2, -10 * p / q) + 1) + n
				}
			});*/
			//var g = b.ani ? "bt" : "";
			var h = this, e = a(h).width(), m = a(h).height(), l = a(h).find(
					"li").eq(0).width(), i = a(h).find("ul"), k = l
					* a(h).find("li").length, f = 0;
			i.css({
				width : k,
				marginLeft : 0
			});
			var j = function(o, n) {
				if (n.is(":animated")) {
					return
				}
				o = o || "left";
				if (o == "left") {
					if (f == 0) {
						f = e - k
					} else {
						f = f + b.step * l < 0 ? f + b.step * l : 0
					}
				} else {
					if (f == e - k) {
						f = 0
					} else {
						f = f - b.step * l > e - k ? f - b.step * l : e - k
					}
				}
				n.animate({
					marginLeft : f
				}, b.time, "ease")
			};
			if (b.left_bt) {
				a(".btn1").on(
						"click",
						function() {
							a(this).find(b.left_bt).css("opacity", "1").end()
									.next().find(b.right_bt).css("opacity",
											"0.5");
							j("left", i)
						})
			}
			if (b.right_bt) {
				a(".btn2").on(
						"click",
						function() {
							a(this).find(b.right_bt).css("opacity", "1").end()
									.prev().find(b.left_bt).css("opacity",
											"0.5");
							j("right", i)
						})
			}
			if (b.auto) {
				d()
			}
			function d() {
				h.t = setInterval(function() {
					j("left", i);
				}, 2000);
			}
			a(window).on(
					"orientationchange",
					function() {
						clearInterval(h.t);
						this.utils.initSlide();
						e = a(h).width(); m = a(h).height(); l = a(h)
								.find("li").eq(0).width(); i = a(h).find("ul");
								k = l * a(h).find("li").length; f = 0;
						i.css({
							width : k,
							marginLeft : 0
						});
						d();
					});
			a(window).on(
					"resize",
					function() {
						clearInterval(h.t);
						this.utils.initSlide();
						e = a(h).width(); m = a(h).height(); l = a(h)
								.find("li").eq(0).width(); i = a(h).find("ul");
								k = l * a(h).find("li").length; f = 0;
						i.css({
							width : k,
							marginLeft : 0
						});
						d();
					});
		});
	}
})(jQuery);