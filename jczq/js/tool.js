(function(a) {
	a.fn.extend({
				disableSelection : function() {
					return this.attr("unselectable", "on").css("MozUserSelect",
							"none").bind("selectstart", a.falseFn)
				},
				enableSelection : function() {
					return this.removeAttr("unselectable").css("MozUserSelect",
							"").unbind("selectstart").bind("selectstart",
							a.stopProp)
				},
				disableRightClick : function() {
					return this.bind("contextmenu", a.falseFn)
				},
				enableRightClick : function() {
					return this.unbind("contextmenu", a.falseFn).bind(
							"contextmenu", a.stopProp)
				},
				disableIME : function() {
					return this.css("ime-mode", "disabled")
				},
				enableIME : function() {
					return this.css("ime-mode", "")
				}
			});
	a.fn.setControlEffect = function(c, b) {
		return this.each(function() {
					if (this.bindControlEffect) {
						return
					}
					this.bindControlEffect = 1;
					var e = c || "down", d;
					if (/^down(.+)$/.test(e)) {
						d = RegExp.$1
					}
					d !== undefined
							&& (this.bindDownCssFix = d, a(this)
									.hasClass("disabled")
									&& a(this).removeClass("disabled")
											.addClass("disabled" + d));
					a(this).enableDrag().disableDrag().bind({
						mousedown : function(f) {
							if (!a.isLeftClick(f) || this.disabled
									|| /disabled/gi.test(this.className)) {
								return false
							}
							a(this).addClass(e)
						},
						mouseup : function(f) {
							if (!a.isLeftClick(f)) {
								return false
							}
							a(this).removeClass(e)
						},
						mouseout : function() {
							a(this).removeClass(e)
						}
					});
					b && a(this).click(function() {
								a(this).toggleClass(b)
							})
				})
	}
})(jQuery);