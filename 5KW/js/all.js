jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
			def : 'easeOutQuad',
			swing : function(x, t, b, c, d) {
				// alert(jQuery.easing.default);
				return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
			},
			easeInQuad : function(x, t, b, c, d) {
				return c * (t /= d) * t + b;
			},
			easeOutQuad : function(x, t, b, c, d) {
				return -c * (t /= d) * (t - 2) + b;
			},
			easeInOutQuad : function(x, t, b, c, d) {
				if ((t /= d / 2) < 1)
					return c / 2 * t * t + b;
				return -c / 2 * ((--t) * (t - 2) - 1) + b;
			},
			easeInCubic : function(x, t, b, c, d) {
				return c * (t /= d) * t * t + b;
			},
			easeOutCubic : function(x, t, b, c, d) {
				return c * ((t = t / d - 1) * t * t + 1) + b;
			},
			easeInOutCubic : function(x, t, b, c, d) {
				if ((t /= d / 2) < 1)
					return c / 2 * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t + 2) + b;
			},
			easeInQuart : function(x, t, b, c, d) {
				return c * (t /= d) * t * t * t + b;
			},
			easeOutQuart : function(x, t, b, c, d) {
				return -c * ((t = t / d - 1) * t * t * t - 1) + b;
			},
			easeInOutQuart : function(x, t, b, c, d) {
				if ((t /= d / 2) < 1)
					return c / 2 * t * t * t * t + b;
				return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
			},
			easeInQuint : function(x, t, b, c, d) {
				return c * (t /= d) * t * t * t * t + b;
			},
			easeOutQuint : function(x, t, b, c, d) {
				return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
			},
			easeInOutQuint : function(x, t, b, c, d) {
				if ((t /= d / 2) < 1)
					return c / 2 * t * t * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
			},
			easeInSine : function(x, t, b, c, d) {
				return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
			},
			easeOutSine : function(x, t, b, c, d) {
				return c * Math.sin(t / d * (Math.PI / 2)) + b;
			},
			easeInOutSine : function(x, t, b, c, d) {
				return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
			},
			easeInExpo : function(x, t, b, c, d) {
				return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
			},
			easeOutExpo : function(x, t, b, c, d) {
				return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1)
						+ b;
			},
			easeInOutExpo : function(x, t, b, c, d) {
				if (t == 0)
					return b;
				if (t == d)
					return b + c;
				if ((t /= d / 2) < 1)
					return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
				return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
			},
			easeInCirc : function(x, t, b, c, d) {
				return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
			},
			easeOutCirc : function(x, t, b, c, d) {
				return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
			},
			easeInOutCirc : function(x, t, b, c, d) {
				if ((t /= d / 2) < 1)
					return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
				return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
			},
			easeInElastic : function(x, t, b, c, d) {
				var s = 1.70158;
				var p = 0;
				var a = c;
				if (t == 0)
					return b;
				if ((t /= d) == 1)
					return b + c;
				if (!p)
					p = d * .3;
				if (a < Math.abs(c)) {
					a = c;
					var s = p / 4;
				} else
					var s = p / (2 * Math.PI) * Math.asin(c / a);
				return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s)
						* (2 * Math.PI) / p))
						+ b;
			},
			easeOutElastic : function(x, t, b, c, d) {
				var s = 1.70158;
				var p = 0;
				var a = c;
				if (t == 0)
					return b;
				if ((t /= d) == 1)
					return b + c;
				if (!p)
					p = d * .3;
				if (a < Math.abs(c)) {
					a = c;
					var s = p / 4;
				} else
					var s = p / (2 * Math.PI) * Math.asin(c / a);
				return a * Math.pow(2, -10 * t)
						* Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
			},
			easeInOutElastic : function(x, t, b, c, d) {
				var s = 1.70158;
				var p = 0;
				var a = c;
				if (t == 0)
					return b;
				if ((t /= d / 2) == 2)
					return b + c;
				if (!p)
					p = d * (.3 * 1.5);
				if (a < Math.abs(c)) {
					a = c;
					var s = p / 4;
				} else
					var s = p / (2 * Math.PI) * Math.asin(c / a);
				if (t < 1)
					return -.5
							* (a * Math.pow(2, 10 * (t -= 1)) * Math
									.sin((t * d - s) * (2 * Math.PI) / p)) + b;
				return a * Math.pow(2, -10 * (t -= 1))
						* Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c
						+ b;
			},
			easeInBack : function(x, t, b, c, d, s) {
				if (s == undefined)
					s = 1.70158;
				return c * (t /= d) * t * ((s + 1) * t - s) + b;
			},
			easeOutBack : function(x, t, b, c, d, s) {
				if (s == undefined)
					s = 1.70158;
				return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
			},
			easeInOutBack : function(x, t, b, c, d, s) {
				if (s == undefined)
					s = 1.70158;
				if ((t /= d / 2) < 1)
					return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
				return c / 2
						* ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2)
						+ b;
			},
			easeInBounce : function(x, t, b, c, d) {
				return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
			},
			easeOutBounce : function(x, t, b, c, d) {
				if ((t /= d) < (1 / 2.75)) {
					return c * (7.5625 * t * t) + b;
				} else if (t < (2 / 2.75)) {
					return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
				} else if (t < (2.5 / 2.75)) {
					return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
				} else {
					return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375)
							+ b;
				}
			},
			easeInOutBounce : function(x, t, b, c, d) {
				if (t < d / 2)
					return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5
							+ b;
				return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5
						+ c * .5 + b;
			}
		});
		
		
		
/**
 * @fileoverview 百度地图的自定义信息窗口，对外开放。
 * 用户自定义信息窗口的各种样式。例如：border，margin，padding，color，background等
 * 主入口类是<a href="symbols/BMapLib.InfoBox.html">InfoBox</a>，
 * 基于Baidu Map API 1.2。
 *
 * @author Baidu Map Api Group
 * @version 1.2
 */
/**
 * @namespace BMap的所有library类均放在BMapLib命名空间下
 */
var BMapLib = window.BMapLib = BMapLib || {};
//常量，infoBox可以出现的位置，此版本只可实现上下两个方向。
var INFOBOX_AT_TOP = 1, INFOBOX_AT_RIGHT = 2, INFOBOX_AT_BOTTOM = 3, INFOBOX_AT_LEFT = 4;
(function() {
    //声明baidu包
    var T, baidu = T = baidu || {version: '1.5.0'};
    baidu.guid = '$BAIDU$';
    //以下方法为百度Tangram框架中的方法，请到http://tangram.baidu.com 查看文档
    (function() {
        window[baidu.guid] = window[baidu.guid] || {};

		baidu.lang = baidu.lang || {};
        baidu.lang.isString = function (source) {
            return '[object String]' == Object.prototype.toString.call(source);
        };
        baidu.lang.isFunction = function (source) {
            return '[object Function]' == Object.prototype.toString.call(source);
        };
        baidu.lang.Event = function (type, target) {
            this.type = type;
            this.returnValue = true;
            this.target = target || null;
            this.currentTarget = null;
        };


        baidu.object = baidu.object || {};
        baidu.extend =
        baidu.object.extend = function (target, source) {
            for (var p in source) {
                if (source.hasOwnProperty(p)) {
                    target[p] = source[p];
                }
            }

            return target;
        };
        baidu.event = baidu.event || {};
        baidu.event._listeners = baidu.event._listeners || [];
        baidu.dom = baidu.dom || {};

        baidu.dom._g = function (id) {
            if (baidu.lang.isString(id)) {
                return document.getElementById(id);
            }
            return id;
        };
        baidu._g = baidu.dom._g;
        baidu.event.on = function (element, type, listener) {
            type = type.replace(/^on/i, '');
            element = baidu.dom._g(element);
            var realListener = function (ev) {
                    // 1. 这里不支持EventArgument,  原因是跨frame的事件挂载
                    // 2. element是为了修正this
                    listener.call(element, ev);
                },
                lis = baidu.event._listeners,
                filter = baidu.event._eventFilter,
                afterFilter,
                realType = type;
            type = type.toLowerCase();
            // filter过滤
            if(filter && filter[type]){
                afterFilter = filter[type](element, type, realListener);
                realType = afterFilter.type;
                realListener = afterFilter.listener;
            }

            // 事件监听器挂载
            if (element.addEventListener) {
                element.addEventListener(realType, realListener, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + realType, realListener);
            }
            // 将监听器存储到数组中
            lis[lis.length] = [element, type, listener, realListener, realType];
            return element;
        };

        baidu.on = baidu.event.on;
        baidu.event.un = function (element, type, listener) {
            element = baidu.dom._g(element);
            type = type.replace(/^on/i, '').toLowerCase();

            var lis = baidu.event._listeners,
                len = lis.length,
                isRemoveAll = !listener,
                item,
                realType, realListener;
            while (len--) {
                item = lis[len];

                if (item[1] === type
                    && item[0] === element
                    && (isRemoveAll || item[2] === listener)) {
                   	realType = item[4];
                   	realListener = item[3];
                    if (element.removeEventListener) {
                        element.removeEventListener(realType, realListener, false);
                    } else if (element.detachEvent) {
                        element.detachEvent('on' + realType, realListener);
                    }
                    lis.splice(len, 1);
                }
            }

            return element;
        };
        baidu.un = baidu.event.un;
        baidu.dom.g = function (id) {
            if ('string' == typeof id || id instanceof String) {
                return document.getElementById(id);
            } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
                return id;
            }
            return null;
        };
        baidu.g = baidu.G = baidu.dom.g;
        baidu.dom._styleFixer = baidu.dom._styleFixer || {};
        baidu.dom._styleFilter = baidu.dom._styleFilter || [];
        baidu.dom._styleFilter.filter = function (key, value, method) {
            for (var i = 0, filters = baidu.dom._styleFilter, filter; filter = filters[i]; i++) {
                if (filter = filter[method]) {
                    value = filter(key, value);
                }
            }
            return value;
        };
        baidu.string = baidu.string || {};

        baidu.string.toCamelCase = function (source) {
            //提前判断，提高getStyle等的效率 thanks xianwei
            if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
                return source;
            }
            return source.replace(/[-_][^-_]/g, function (match) {
                return match.charAt(1).toUpperCase();
            });
        };

        baidu.dom.setStyle = function (element, key, value) {
            var dom = baidu.dom, fixer;

            // 放弃了对firefox 0.9的opacity的支持
            element = dom.g(element);
            key = baidu.string.toCamelCase(key);

            if (fixer = dom._styleFilter) {
                value = fixer.filter(key, value, 'set');
            }

            fixer = dom._styleFixer[key];
            (fixer && fixer.set) ? fixer.set(element, value) : (element.style[fixer || key] = value);

            return element;
        };

         baidu.setStyle = baidu.dom.setStyle;

        baidu.dom.setStyles = function (element, styles) {
            element = baidu.dom.g(element);
            for (var key in styles) {
                baidu.dom.setStyle(element, key, styles[key]);
            }
            return element;
        };
         baidu.setStyles = baidu.dom.setStyles;
        baidu.browser = baidu.browser || {};
        baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp['\x241']) : undefined;
        baidu.dom._NAME_ATTRS = (function () {
            var result = {
                'cellpadding': 'cellPadding',
                'cellspacing': 'cellSpacing',
                'colspan': 'colSpan',
                'rowspan': 'rowSpan',
                'valign': 'vAlign',
                'usemap': 'useMap',
                'frameborder': 'frameBorder'
            };

            if (baidu.browser.ie < 8) {
                result['for'] = 'htmlFor';
                result['class'] = 'className';
            } else {
                result['htmlFor'] = 'for';
                result['className'] = 'class';
            }

            return result;
        })();
        baidu.dom.setAttr = function (element, key, value) {
            element = baidu.dom.g(element);
            if ('style' == key){
                element.style.cssText = value;
            } else {
                key = baidu.dom._NAME_ATTRS[key] || key;
                element.setAttribute(key, value);
            }
            return element;
        };
         baidu.setAttr = baidu.dom.setAttr;
        baidu.dom.setAttrs = function (element, attributes) {
            element = baidu.dom.g(element);
            for (var key in attributes) {
                baidu.dom.setAttr(element, key, attributes[key]);
            }
            return element;
        };
        baidu.setAttrs = baidu.dom.setAttrs;
        baidu.dom.create = function(tagName, opt_attributes) {
            var el = document.createElement(tagName),
                attributes = opt_attributes || {};
            return baidu.dom.setAttrs(el, attributes);
        };
        T.undope=true;
    })();

    /**
     * @exports InfoBox as BMapLib.InfoBox
     */

    var InfoBox =
    /**
     * InfoBox类的构造函数
     * @class InfoBox <b>入口</b>。
     * 可以自定义border,margin,padding,关闭按钮等等。
     * @constructor
         * @param {Map} map Baidu map的实例对象.
         * @param {String} content infoBox中的内容.
         * @param {Json Object} opts 可选的输入参数，非必填项。可输入选项包括：<br />
         * {<br />"<b>offset</b>" : {Size} infoBox的偏移量
         * <br />"<b>boxClass</b>" : {String} 定义infoBox的class,
         * <br />"<b>boxStyle</b>" : {Json} 定义infoBox的style,此项会覆盖boxClass<br />
         * <br />"<b>closeIconMargin</b>" : {String} 关闭按钮的margin    <br />
         * <br />"<b>closeIconUrl</b>" : {String} 关闭按钮的url地址    <br />
         * <br />"<b>enableAutoPan</b>" : {Boolean} 是否启动自动平移功能    <br />
         * <br />"<b>align</b>" : {Number} 基于哪个位置进行定位，取值为[INFOBOX_AT_TOP,INFOBOX_AT_BOTTOM]<br />
         * }<br />.
         * @example <b>参考示例：</b><br />
         * var infoBox = new BMapLib.InfoBox(map,"百度地图api",{boxStyle:{background:"url('tipbox.gif') no-repeat
          center top",width: "200px"},closeIconMargin: "10px 2px 0 0",enableAutoPan: true
          ,alignBottom: false});
     */
        BMapLib.InfoBox = function(map, content, opts) {

        this._content = content || "";
        this._isOpen = false;
        this._map = map;

        this._opts = opts = opts || {};
        this._opts.offset =  opts.offset || new BMap.Size(0,0);
        this._opts.boxClass = opts.boxClass || "infoBox";
        this._opts.boxStyle = opts.boxStyle || {};
        this._opts.closeIconMargin = opts.closeIconMargin || "2px";
        this._opts.closeIconUrl = opts.closeIconUrl || "close.png";
        this._opts.enableAutoPan = opts.enableAutoPan  ? true : false;
        this._opts.align = opts.align || INFOBOX_AT_TOP;
    }
    InfoBox.prototype = new BMap.Overlay();
    InfoBox.prototype.initialize = function(map) {
        var me = this;
        var div = this._div = baidu.dom.create('div', {"class": this._opts.boxClass});
        baidu.dom.setStyles(div, this._opts.boxStyle);
        //设置position为absolute，用于定位
        div.style.position = "absolute";
        this._setContent(this._content);

        var floatPane = map.getPanes().floatPane;
        floatPane.style.width = "auto";
        floatPane.appendChild(div);
        //设置完内容后，获取div的宽度,高度
        this._getInfoBoxSize();
        //this._boxWidth = parseInt(this._div.offsetWidth,10);
        //this._boxHeight = parseInt(this._div.offsetHeight,10);
        //阻止各种冒泡事件
        baidu.event.on(div,"onmousedown",function(e){
            me._stopBubble(e);
        });
        baidu.event.on(div,"onmouseover",function(e){
            me._stopBubble(e);
        });
        baidu.event.on(div,"click",function(e){
           // me._stopBubble(e);
        });
        baidu.event.on(div,"dblclick",function(e){
            me._stopBubble(e);
        });
        return div;
    }
    InfoBox.prototype.draw = function() {
        this._isOpen && this._adjustPosition(this._point);
    }
    /**
     * 打开infoBox
     * @param {Marker|Point} anchor 要在哪个marker或者point上打开infobox
     * @return none
     *
     * @example <b>参考示例：</b><br />
     * infoBox.open();
     */
    InfoBox.prototype.open = function(anchor){
        var me = this,poi;
        if(!this._isOpen) {
            this._map.addOverlay(this);
            this._isOpen = true;
            //延迟10ms派发open事件，使后绑定的事件可以触发。
            setTimeout(function(){
                me._dispatchEvent(me,"open",{"point" : me._point});
            },10);
        }
        if(anchor instanceof BMap.Point){
            poi = anchor;
            //清除之前存在的marker事件绑定，如果存在的话
            this._removeMarkerEvt();
        }else if(anchor instanceof BMap.Marker){
        	//如果当前marker不为空，说明是第二个marker，或者第二次点open按钮,先移除掉之前绑定的事件
        	if(this._marker){
        		this._removeMarkerEvt();
        	}
            poi = anchor.getPosition();
            this._marker = anchor;
            !this._markerDragend && this._marker.addEventListener("dragend",this._markerDragend = function(e){
            	me._point = e.point;
            	me._adjustPosition(me._point);
            	me._panBox();
            	me.show();
            });
             //给marker绑定dragging事件，拖动marker的时候，infoBox也跟随移动
            !this._markerDragging && this._marker.addEventListener("dragging",this._markerDragging = function(){
            	me.hide();
            	me._point = me._marker.getPosition();
                me._adjustPosition(me._point);
            });
        }
        //打开的时候，将infowindow显示
        this.show();
        this._point = poi;
        this._panBox();
        this._adjustPosition(this._point);
    }
    /**
     * 关闭infoBox
     * @return none
     *
     * @example <b>参考示例：</b><br />
     * infoBox.close();
     */
    InfoBox.prototype.close = function(){
        if(this._isOpen){
            this._map.removeOverlay(this);
            this._remove();
            this._isOpen = false;
            this._dispatchEvent(this,"close",{"point" : this._point});
        }
    }

	/**
   	 * 打开infoBox时，派发事件的接口
     * @name InfoBox#Open
     * @event
     * @param {Event Object} e 回调函数会返回event参数，包括以下返回值：
     * <br />{"<b>target</b> : {BMap.Overlay} 触发事件的元素,
     * <br />"<b>type</b>：{String} 事件类型,
     * <br />"<b>point</b>：{Point} infoBox的打开位置}
     *
     * @example <b>参考示例：</b>
     * infoBox.addEventListener("open", function(e) {
     *     alert(e.type);
     * });
     */
   /**
   	 * 关闭infoBox时，派发事件的接口
     * @name InfoBox#Close
     * @event
     * @param {Event Object} e 回调函数会返回event参数，包括以下返回值：
     * <br />{"<b>target</b> : {BMap.Overlay} 触发事件的元素,
     * <br />"<b>type</b>：{String} 事件类型,
     * <br />"<b>point</b>：{Point} infoBox的关闭位置}
     *
     * @example <b>参考示例：</b>
     * infoBox.addEventListener("close", function(e) {
     *     alert(e.type);
     * });
     */
  /**
     * 启用自动平移
     * @return none
     *
     * @example <b>参考示例：</b><br />
     * infoBox.enableAutoPan();
     */
    InfoBox.prototype.enableAutoPan = function(){
        this._opts.enableAutoPan = true;
    }
    /**
     * 禁用自动平移
     * @return none
     *
     * @example <b>参考示例：</b><br />
     * infoBox.disableAutoPan();
     */
    InfoBox.prototype.disableAutoPan = function(){
        this._opts.enableAutoPan = false;
    }
    /**
     * 设置infoBox的内容
     * @param {String|HTMLElement} content 弹出气泡中的内容
     * @return none
     *
     * @example <b>参考示例：</b><br />
     * infoBox.setContent("百度地图API");
     */
    InfoBox.prototype.setContent = function(content){
      	this._setContent(content);
      	this._getInfoBoxSize();
        this._adjustPosition(this._point);
    }
    /**
     * 设置信息窗的地理位置
     * @param {Point} point 设置position
     * @return none
     *
     * @example <b>参考示例：</b><br />
     * infoBox.setPosition(new BMap.Point(116.35,39.911));
     */
    InfoBox.prototype.setPosition = function(poi){
        this._point = poi;
        this._adjustPosition(poi);
        this._removeMarkerEvt();
    }
    /**
     * 获得信息窗的地理位置
     * @param none
     * @return {Point} 信息窗的地理坐标
     *
     * @example <b>参考示例：</b><br />
     * infoBox.getPosition();
     */
    InfoBox.prototype.getPosition = function(){
        return this._point;
    }
    /**
     * 返回信息窗口的箭头距离信息窗口在地图
     * 上所锚定的地理坐标点的像素偏移量。
     * @return {Size} Size
     *
     * @example <b>参考示例：</b><br />
     * infoBox.getOffset();
     */
    InfoBox.prototype.getOffset = function(){
        return this._opts.offset;
    },
    /**
   	 *@ignore
     * 删除overlay，调用Map.removeOverlay时将调用此方法，
     * 将移除覆盖物的容器元素
     */
    InfoBox.prototype._remove = function(){
        var me = this;
        if(this.domElement && this.domElement.parentNode){
          //防止内存泄露
          baidu.event.un(this._div.firstChild, "click", me._closeHandler());
          this.domElement.parentNode.removeChild(this.domElement);
        }
        this.domElement = null;
        this._isOpen = false;
        this.dispatchEvent("onremove");
    },
    baidu.object.extend(InfoBox.prototype,{
        /**
         * 获取关闭按钮的html
         * @return IMG 关闭按钮的HTML代码
         */
        _getCloseIcon: function(){
            var img = "<img src='"+ this._opts.closeIconUrl +"'  style='position:absolute;right:10px;top:13px;cursor:pointer;margin:"+ this._opts.closeIconMargin +"'/>";
            return img;
        },
        /**
	     * 设置infoBox的内容
	     * @param {String|HTMLElement} content 弹出气泡中的内容
	     * @return none
	     *
	     * @example <b>参考示例：</b><br />
	     * infoBox.setContent("百度地图API");
	     */
        _setContent: function(content){
	        if(!this._div){
	            return;
	        }
	        var closeHtml = this._getCloseIcon();
	        //string类型的content
	        if(typeof content.nodeType === "undefined"){
	            this._div.innerHTML = closeHtml + content;
	        }else{
	            this._div.innerHTML = closeHtml;
	            this._div.appendChild(content);
	        }
	        this._content = content;
	        //添加click关闭infobox事件
	        this._addEventToClose();

   	    },
        /**
         * 调整infobox的position
         * @return none
         */
        _adjustPosition: function(poi){
            var pixel = this._getPointPosition(poi);
            var icon = this._marker && this._marker.getIcon();
            switch(this._opts.align){
                case INFOBOX_AT_TOP:
                    if(this._marker){
                        this._div.style.bottom = -(pixel.y - this._opts.offset.height - icon.anchor.height + icon.infoWindowAnchor.height) - this._marker.getOffset().height + 2 + "px";
                    }else{
                        this._div.style.bottom = -(pixel.y - this._opts.offset.height) + "px";
                    }
                    break;
                case INFOBOX_AT_BOTTOM:
                    if(this._marker){
          		        this._div.style.top = pixel.y + this._opts.offset.height - icon.anchor.height + icon.infoWindowAnchor.height + this._marker.getOffset().height + "px";
                    }else{
                        this._div.style.top = pixel.y + this._opts.offset.height + "px";
                    }
                    break;
            }

            if(this._marker){
                this._div.style.left = pixel.x - icon.anchor.width + this._marker.getOffset().width + icon.infoWindowAnchor.width - this._boxWidth / 2 + "px";
            }else{
                this._div.style.left = pixel.x - (this._boxWidth / 2 - 8) + "px";//调整弹窗最下边尖端所指位置：多减去8像素
            }
        },
        /**
         * 得到infobox的position
         * @return Point  infobox当前的position
         */
        _getPointPosition: function(poi){
            this._pointPosition = this._map.pointToOverlayPixel(poi);
            return this._pointPosition;
        },
        /**
         * 得到infobox的高度跟宽度
         * @return none
         */
        _getInfoBoxSize: function(){
        	this._boxWidth = parseInt(this._div.offsetWidth,10);
        	this._boxHeight = parseInt(this._div.offsetHeight,10);
        },
        /**
         * 添加关闭事件
         * @return none
         */
        _addEventToClose: function(){
            var me = this;
            baidu.event.on(this._div.firstChild, "click", me._closeHandler());
            this._hasBindEventClose = true;
        },
        /**
         * 处理关闭事件
         * @return none
         */
        _closeHandler: function(){
            var me = this;
            return function(e){
                me.close();
            }
        },
        /**
         * 阻止事件冒泡
         * @return none
         */
        _stopBubble: function(e){
            if(e && e.stopPropagation){
                e.stopPropagation();
            }else{
                window.event.cancelBubble = true;
            }
        },
        /**
         * 自动平移infobox，使其在视野中全部显示
         * @return none
         */
        _panBox: function(){
            if(!this._opts.enableAutoPan){
                return;
            }
            var mapH = parseInt(this._map.getContainer().offsetHeight,10),
                mapW = parseInt(this._map.getContainer().offsetWidth,10),
                boxH = this._boxHeight,
                boxW = this._boxWidth;
            //infobox窗口本身的宽度或者高度超过map container
            if(boxH >= mapH || boxW >= mapW){
                return;
            }
            //如果point不在可视区域内
            if(!this._map.getBounds().containsPoint(this._point)){
                this._map.setCenter(this._point);
            }
            var anchorPos = this._map.pointToPixel(this._point),
                panTop,panBottom,panY,
                //左侧超出
                panLeft = boxW / 2 - anchorPos.x,
                //右侧超出
                panRight = boxW / 2 + anchorPos.x - mapW;
            if(this._marker){
                var icon = this._marker.getIcon();
            }
            //基于bottom定位，也就是infoBox在上方的情况
            switch(this._opts.align){
                case INFOBOX_AT_TOP:
                    //上侧超出
                    var h = this._marker ? icon.anchor.height + this._marker.getOffset().height - icon.infoWindowAnchor.height : 0;
                    panTop = boxH - anchorPos.y + this._opts.offset.height + h + 2 ;
                    break;
                case INFOBOX_AT_BOTTOM:
                    //下侧超出
                    var h = this._marker ? -icon.anchor.height + icon.infoWindowAnchor.height + this._marker.getOffset().height + this._opts.offset.height : 0;
                    panBottom = boxH + anchorPos.y - mapH + h + 4;
                    break;
            }

            panX = panLeft > 0 ? panLeft : (panRight > 0 ? -panRight : 0);
            panY = panTop > 0 ? panTop : (panBottom > 0 ? -panBottom : 0);
            this._map.panBy(panX,panY);
        },
        _removeMarkerEvt: function(){
			this._markerDragend && this._marker.removeEventListener("dragend", this._markerDragend);
            this._markerDragging && this._marker.removeEventListener("dragging", this._markerDragging);
            this._markerDragend = this._markerDragging = null;
        },
      	/**
	     * 集中派发事件函数
	     *
	     * @private
	     * @param {Object} instance 派发事件的实例
	     * @param {String} type 派发的事件名
	     * @param {Json} opts 派发事件里添加的参数，可选
	     */
	     _dispatchEvent: function(instance, type, opts) {
	        type.indexOf("on") != 0 && (type = "on" + type);
	        var event = new baidu.lang.Event(type);
	        if (!!opts) {
	            for (var p in opts) {
	                event[p] = opts[p];
	            }
	        }
	        instance.dispatchEvent(event);
	    }
    });
})();

// 影院数据
window._g = {};
$.extend(window._g, {
	pointInfo : {
        "131" : [{coor:"116.431281,39.904403 "},{coor:"116.474826,40.016006"},{coor:"116.372761,39.860241"},{coor:"116.360466,40.014328"},{coor:"116.467605,39.901414 "},{coor:"116.43016,39.870888 "},{coor:"116.425734,39.902611 "},{coor:"116.4457,39.955817 "},{coor:"116.416428,39.920086"},{coor:"116.447137,39.927542 "},{coor:"116.318136,40.034522"},{coor:"116.427565,39.921497 "},{coor:"116.638619,39.910976 "},{coor:"116.417398,39.972311 "},{coor:"116.332346,39.973582 "},{coor:"116.348559,39.971384"},{coor:"116.42093,39.915998 "},{coor:"116.454801,39.928462 "},{coor:"116.379998,39.916897 "},{coor:"116.296497,40.102072"},{coor:"116.418122,39.921469 "},{coor:"116.495123,39.890986 "},{coor:"116.322649,39.984288 "},{coor:"116.524686,39.929824 "}],
        "289" : [{coor:"121.48251,31.238716"},{coor:"121.477773,31.239009"},{coor:"121.224754,31.04327"},{coor:"121.478391,31.24858"},{coor:"121.499041,31.194221"},{coor:"121.523019,31.234023"},{coor:"121.394514,31.114042"},{coor:"121.522379,31.306309"},{coor:"121.481898,31.224913"},{coor:"121.385968,31.239634"},{coor:"121.377671,31.214182"},{coor:"121.568501,31.214846"},{coor:"121.42274,31.224635"},{coor:"121.519536,31.306648"},{coor:"121.509004,31.242212"},{coor:"121.406284,31.136933"},{coor:"121.459141,31.279779"},{coor:"121.576792,31.120472"},{coor:"121.480807,31.241927"},{coor:"121.384484,31.113849"},{coor:"121.443131,31.200469"},{coor:"121.590586,31.206553"},{coor:"121.480379,31.24168"},{coor:"121.333078,31.247036"},{coor:"121.462735,31.23542"},{coor:"121.506941,31.242629"},{coor:"121.446418,31.199511"},{coor:"121.436219,31.208638"},{coor:"121.418601,31.176187"}],
        "257" : [{coor:"113.287871,23.142855"},{coor:"113.284591,23.088761"},{coor:"113.245446,23.126637"},{coor:"113.343094,23.157966"},{coor:"113.343628,22.907554"},{coor:"113.271572,23.188457"},{coor:"113.275426,23.130484"},{coor:"113.374501,22.933767"},{coor:"113.254895,23.152666"},{coor:"113.272499,23.100446"},{coor:"113.408621,23.126471"},{coor:"113.282538,23.095792"},{coor:"113.334043,23.193324"},{coor:"113.343094,23.157966"},{coor:"113.369281,23.046564"},{coor:"113.310071,23.037255"},{coor:"113.253742,23.127593"},{coor:"113.327179,23.18418"},{coor:"113.211051,23.391928"},{coor:"113.302048,23.131382"},{coor:"113.334098,23.131091"},{coor:"113.268902,23.200449"}],
        "340" : [{coor:"114.11781,22.546076"},{coor:"114.231208,22.698132"},{coor:"114.376442,22.690988"},{coor:"114.130731,22.682393"},{coor:"113.94668,22.506783"},{coor:"113.916,22.565334"},{coor:"113.942171,22.522909"},{coor:"113.991863,22.540426"},{coor:"114.092957,22.551692"},{coor:"114.054402,22.602441"},{coor:"113.982368,22.542713"},{coor:"114.018165,22.551616"},{coor:"114.284662,22.694822"},{coor:"113.916273,22.565467"},{coor:"114.123081,22.551767"},{coor:"113.863136,22.575004"},{coor:"113.891413,22.589445"},{coor:"114.139951,22.553427"}],
        "75" : [{coor:"104.0832,30.625808 "},{coor:"104.069421,30.608745"},{coor:"104.03536,30.702613 "},{coor:"104.078277,30.664117 "},{coor:"104.072143,30.595791"},{coor:"104.076862,30.671207"},{coor:"104.115669,30.680812"},{coor:"104.027551,30.670205"},{coor:"104.07325,30.608023"},{coor:"104.0832,30.625808"},{coor:"104.10219,30.685743"},{coor:"104.030508,30.676293"},{coor:"104.109331,30.675198"}],
        "132" : [{coor:"107.405413,29.706654 "},{coor:"106.540427,29.584015 "},{coor:"106.466362,29.563566"},{coor:"106.463257,29.540787"},{coor:"106.411643,29.805452"},{coor:"106.49169,29.488628"},{coor:"106.516648,29.534267"},{coor:"106.584774,29.563251"},{coor:"106.52436,29.516581"},{coor:"106.571109,29.636415"},{coor:"106.578909,29.559851 "},{coor:"106.566651,29.534816"},{coor:"106.551391,29.585829"},{coor:"106.517505,29.545037 "},{coor:"106.551531,29.585829"},{coor:"106.49169,29.488628"},{coor:"106.585353,29.565992"},{coor:"106.4684,29.56421"},{coor:"107.080961,29.837115"},{coor:"106.536524,29.578848"},{coor:"106.519608,29.606823"},{coor:"106.57061,29.532098"}],
        "218" : [{coor:"114.294058,30.58198"},{coor:"114.322682,30.627509"},{coor:"114.409603,30.511115"},{coor:"114.348212,30.59391"},{coor:"114.381917,30.886979"},{coor:"114.41776,30.483692"},{coor:"114.331662,30.510679"},{coor:"114.214978,30.564669"},{coor:"114.328706,30.662292"},{coor:"114.306288,30.553295"},{coor:"114.217678,30.567491"},{coor:"114.361102,30.532293"}]
    },
	movInfo : {
        "113.287871,23.142855":{ movName:"保利国际影城(中环广场店)",address:"广州市越秀区建设大马路18号中环广场南楼五层",tel:"(020)83030222",uid:"3be82bff3126a83d07026fce"},
        "114.11781,22.546076":{ movName:"橙天嘉禾影城(万象城店)",address:"深圳市罗湖区宝安南路1881号华润万象城中座3层",tel:"4000080888",uid:"70aa9bf48658185c1ef74d2e"},
        "107.405413,29.706654":{ movName:"ume国际影城(涪陵店)",address:"重庆市涪陵区兴华中路25号泽胜中央广场商业步行街4楼",tel:"(023)72870011",uid:"9d282d3d3cd60257f603b8b9"},
        "114.231208,22.698132":{ movName:"博纳国际影城(龙岗店)",address:"深圳市龙岗区黄阁路与深惠路交汇处COCO PARK4楼",tel:"(0755)25585111",uid:"1f8f7fbc2fc8aac3cbfa5f6c"},
        "116.431281,39.904403":{ movName:"百老汇影城(国瑞城店)",address:"北京市崇文区崇文门外大街18号国瑞城首层、地下二层",tel:"(010)67171338",uid:"f59b8afcc856667e9e82ea96"},
        "106.540427,29.584015":{ movName:"ume国际影城(江北店)",address:"重庆市江北区北城天街(原洋河路)8号北城天街购物广场B区5F",tel:"(023)67701166",uid:"338ba76caff6496ec1f1cf82"},
        "113.284591,23.088761":{ movName:"广州上影联和电影城",address:"广州市海珠区江燕路108号燕汇广场4楼",tel:"(020)89778118",uid:"919c0a802e4ae2bf8bfc060f"},
        "104.0832,30.625808":{ movName:"成都上影国际影城",address:"成都市武侯区科华中路9号百联天府购物中心5楼",tel:"(028)85222236",uid:"9bca92268e382a191ce999b9"},
        "116.474826,40.016006":{ movName:"华谊兄弟影院(望京店)",address:"北京市朝阳区广顺北大街16号望京华彩商业中心B1",tel:"(010)57620488",uid:"36c80222dc51526e97ec8406"},
        "104.069421,30.608745":{ movName:"橙天嘉禾影城(凯丹店)",address:"成都市高新区盛和一路99号凯丹广场4楼",tel:"(028)65035900",uid:"31f877271c1320819e9d686f"},
        "116.372761,39.860241":{ movName:"保利国际影城(首地大峡谷店)",address:"北京市丰台区南三环首地大峡谷5层",tel:"(010)87578551;(010)87578535",uid:"fafdd7ffd1cce498e8f853f2"},
        "106.466362,29.563566":{ movName:"ume国际影城(沙坪坝店)",address:"重庆市沙坪坝区三峡广场炫地购物中心6楼",tel:"(023)65365599",uid:"eaf99c707769b8c3b7265540"},
        "116.360466,40.014328":{ movName:"嘉华国际影城",address:"海淀区学清路甲8号圣熙8号购物中心5楼(金码大厦北侧)",tel:"(010)82732228",uid:"a7ffadcf75d9f8972b201aeb"},
        "113.245446,23.126637":{ movName:"华影万晟国际影城",address:"广州市荔湾区逢源路153号3-5楼",tel:"(020)81236302;(020)81236303",uid:"0244c008870a057e3a13fd80"},
        "113.343094,23.157966":{ movName:"广州飞影电影城",address:"广州市天河区东莞庄路富力院士庭广场2楼",tel:"(020)37225388",uid:"f07163a670095ddd100daa1b"},
        "104.03536,30.702613":{ movName:"橙天嘉禾影城(一品店)",address:"成都市金牛区一品天下大街399号北京华联5楼",tel:"(028)87735666",uid:"af2cc44ef9fe058bc27da29f"},
        "106.463257,29.540787":{ movName:"博纳国际影城(易诚店)",address:"重庆市沙坪坝区凤天大道37号",tel:"(023)65535020",uid:"ea2efdf151bde59bab175a94"},
        "106.411643,29.805452":{ movName:"ume国际影城(北碚店)",address:"重庆市北碚区康宁路58号嘉陵风情步行街4-5楼(状元府第旁)",tel:"(023)60306699",uid:"c2968cc55e2733a92b11d127"},
        "106.49169,29.488628":{ movName:"橙天嘉禾影城(大渡口店)",address:"重庆市大渡口区新山村街道文体路88号壹街购物中心2楼",tel:"(023)88613666",uid:"1938fdda84e196aee3110384"},
        "114.294058,30.58198":{ movName:"环艺新民众电影城",address:"武汉市江汉区汉口中山大道608号新民众乐园4-5楼",tel:"(027)85379075",uid:"ee2375c3a520a50251e5c575"},
        "114.376442,22.690988":{ movName:"星际银河影城",address:"深圳市坪山新区坪山办事处沙坣社区同富裕路9号A栋三层",tel:"(0755)28395920",uid:"50faf94762a8775ef4231066"},
        "104.078277,30.664117":{ movName:"星美国际影城(西南影都店)",address:"成都市锦江区总府路68号(盐市口茂业百货对面)",tel:"(028)86679268;(028)86679204",uid:"b34cdba998eb4b0433169b52"},
        "113.343628,22.907554":{ movName:"广州番禺沙湾数字电影院",address:"广州市番禺区沙湾镇大巷涌路66号文化中心",tel:"(020)34737921",uid:"06acaa43d978f5e0bda24005"},
        "116.467605,39.901414":{ movName:"ume国际影城(双井店)",address:"北京市朝阳区东三环中路 双井桥北富力广场5-6层",tel:"(010)59037171;(010)59037373",uid:"f54f39c798d66d8d246e9884"},
        "114.130731,22.682393":{ movName:"时代金球影城(华南城店)",address:"深圳市龙岗区平湖街道华南城西门环球物流中心四楼",tel:"(0755)89885688",uid:"8248924e2666860eb1077db5"},
        "116.43016,39.870888":{ movName:"博纳国际影城(方庄店)",address:"北京市丰台区蒲黄榆路28号芳群园一区",tel:"(010)67699909",uid:"f5671be08a63a59e58f6bef4"},
        "106.516648,29.534267":{ movName:"华谊兄弟影院(袁家岗店)",address:"重庆市九龙坡区袁家岗奥体路1号中心城上城3F",tel:"(023)68425803",uid:"76dcea7317ee1d4726e0a09b"},
        "113.94668,22.506783":{ movName:"华谊兄弟影院(太古城店)",address:"深圳市南山区深圳湾太古城北区B132",tel:"(0755)21621200",uid:"f1feb40db328e635c7f025e8"},
        "106.584774,29.563251":{ movName:"重庆环艺电影城",address:"重庆市渝中区邹容路68号大都会广场六楼",tel:"(023)63739803",uid:"309fc9761d8de4af7adbd2b8"},
        "113.271572,23.188457":{ movName:"橙天嘉禾影城(停机坪购物广场店)",address:"广州市白云新城机场路云霄路五号停机坪购物广场3楼",tel:"(020)36077789;4000080888",uid:"8b1f6004d7c9321ecc06a4b3"},
        "113.916,22.565334":{ movName:"深圳宝安环星影城",address:"深圳市宝安区新安二路70号",tel:"(0755)29668666",uid:"22fba482b6ed3018cd06a4ec"},
        "116.425734,39.902611 ":{ movName:"搜秀影城",address:"北京市崇文区崇外大街40号搜秀城9层",tel:"(010)51671298",uid:"fcb7abe8bd7095cfa1d23086"},
        "116.4457,39.955817":{ movName:"百老汇影城(当代MOMA店)",address:"北京市东城区香河园路1号当代MOMA北区T4座",tel:"(010)84388258",uid:"b5adcf1de59a8c2738221c1a"},
        "116.416428,39.920086":{ movName:"横店电影城(王府井店)",address:"北京市东城区王府井大街253号王府井百货大楼北馆8层",tel:"(010)65231588",uid:"be84ac31fd4308634e776e67"},
        "114.322682,30.627509":{ movName:"中影国际影城(武汉东购店)",address:"武汉市江岸区二七路汉口东部购物公园C2栋4楼",tel:"(027)82285802",uid:"569c34d2a2d4fbd82b201a1c"},
        "116.447137,39.927542":{ movName:"博纳国际影城(悠唐店)",address:"北京市朝阳区朝外三丰北里2号楼悠唐生活广场B1层(朝外钱柜南侧)",tel:"(010)59775660",uid:"bcbabfbb79284dc9ae31e53b"},
        "106.52436,29.516581":{ movName:"ume国际影城(九龙坡店)",address:"重庆市九龙坡区杨家坪珠江路48号龙湖西城天街购物广场3F-26号",tel:"(023)68126066",uid:"090de77f72e0e402faf0cbbd"},
        "116.318136,40.034522":{ movName:"橙天嘉禾影城(上地店)",address:"北京市海淀区上地南口华联商厦4F",tel:"(010)62667799",uid:"0f0c62b5ce19c76bc7f0257e"},
        "113.942171,22.522909":{ movName:"海岸影城",address:"深圳市南山区文心五路33号海岸城购物中心三楼",tel:"(0755)86129988",uid:"86bf92b2393da1e3d0f49e9d"},
        "116.427565,39.921497":{ movName:"百丽宫影院(金宝汇店)",address:"北京市东城区金宝街88号",tel:"(010)85221977",uid:"50c39892e45f4bcb80a00c35"},
        "113.991863,22.540426":{ movName:"华夏艺术中心数码影院",address:"深圳市南山区华侨城光侨街1号",tel:"(0755)26602342",uid:"961699d9fb10cd0e2ffaa722"},
        "104.072143,30.595791":{ movName:"中影国际影城(中航九方店)",address:"成都市高新区府城大道中段88号九方购物中心6楼L600",tel:"(028)83333632",uid:"26ab79042f2e88f72c4733e1"},
        "116.638619,39.910976":{ movName:"博纳国际影城(通州店)",address:"北京市通州区杨庄北里天时名苑14号楼F4-01",tel:"(010)56351916",uid:"9942a408d0aa920786420ee5"},
        "116.417398,39.972311":{ movName:"ume国际影城(安贞店)",address:"北京市东城区北三环东路36号环球贸易中心E座B1/F1/F3",tel:"(010)58257733",uid:"fc583e34f1a0bc1bc51b7568"},
        "114.092957,22.551692":{ movName:"博纳国际影城(华强北茂业店)",address:"深圳市福田区华强北茂业百货九楼",tel:"(0755)83019333",uid:"7db74a0de7510ba0c356ac70"},
        "106.571109,29.636415":{ movName:"ume国际影城(两江新区店)",address:"重庆市两江新区机场高速路西部奥特莱斯商业广场5-7楼",tel:"(023)67305500",uid:"78cad6d05ba34578d91318a8"},
        "104.076862,30.671207":{ movName:"橙天嘉禾影城(富力天汇店)",address:"成都青羊区上西顺城街289富力天汇mall7楼",tel:"(028)61322266",uid:"43e1aeb999504ee941ab9a7a"},
        "106.578909,29.559851":{ movName:"橙天嘉禾影城(日月光店)",address:"重庆市渝中区较场口日月光广场6F(台北纯K KTV楼上)",tel:"(023)88062666",uid:"39ead7ce9ab929c97069d39d"},
        "113.275426,23.130484":{ movName:"华影青宫电影城",address:"广州市越秀区北京路312号青年文化宫二楼",tel:"(020)83329918",uid:"af1e0a716e4ad138f4eafcf1"},
        "113.374501,22.933767":{ movName:"中影火山湖电影城(番禺店)",address:"广州市番禺区桥南街桥南路108号",tel:"(020)39292999",uid:"37e38933d2f4e2a49eec2bef"},
        "116.332346,39.973582":{ movName:"ume国际影城(华星店)",address:"北京市海淀区双榆树科学院南路44号(双安商场对面)",tel:"(010)82111601",uid:"6b04a1e8a20f269f04fef56b"},
        "116.348559,39.971384":{ movName:"新华国际影城(大钟寺店)",address:"北京市海淀区大钟寺中坤广场C座3层",tel:"(010)82511616",uid:"14e31ad9661058ecd6b74e9e"},
        "116.42093,39.915998":{ movName:"百老汇影城(新世纪东方广场店)",address:"北京市东城区东长安街1号东方广场地下一层BB65",tel:"(010)85186778",uid:"2e4903dcbb971c99631809b8"},
        "116.454801,39.928462":{ movName:"紫光影城",address:"北京市朝阳区朝外大街10号(蓝岛大厦西区五-六层)",tel:"(010)65992922",uid:"953bdf2d6c6aaa75bca240c6"},
        "114.054402,22.602441":{ movName:"横店电影城(上河坊店)",address:"深圳市宝安区民治书香门第上河坊",tel:"(0755)29309990;(0755)29233330",uid:"49eb68d4c6d515bf7702694d"},
        "113.982368,22.542713":{ movName:"中影益田假日影城",address:"深圳市南山区益田假日广场L3-8",tel:"(0755)86298989",uid:"eaee388590adfc28373a71aa"},
        "116.379998,39.916897":{ movName:"首都电影院(西单店)",address:"北京市西城区西单北大街甲131号大悦城商场十层",tel:"(010)66062266",uid:"bb2f4c6de67abeda96ca07e5"},
        "116.296497,40.102072":{ movName:"中影国际影城(永旺店)",address:"北京市昌平区北清路1号永旺国际商城3楼",tel:"(010)80700847",uid:"0f1a68a07ec74c82d0ff23fd"},
        "106.566651,29.534816":{ movName:"华谊兄弟影院(南坪百联店)",address:"重庆市南岸区南坪西路38号百联上海城购物中心5楼",tel:"(023)62626670;(023)62626671",uid:"f202528a29123e2ba5da3939"},
        "104.115669,30.680812":{ movName:"ume国际影城(成都店)",address:"成都市成华区一环路东二段1号龙湖天街三千集购物中心5楼(厂北路口) ",tel:"(028)84406111",uid:"09e3b47051d5e18b8c1a89e3"},
        "116.418122,39.921469":{ movName:"百老汇影城(新东安店)",address:"北京市东城区王府井大街新东安广场6层",tel:"(010)65281898",uid:"323fa11d95c966ecfbf0cba2"},
        "106.551391,29.585829":{ movName:"橙天嘉禾影城(江北店)",address:"重庆江北区北城天街48号附1号5号(欧式一条街同创国际对面)",tel:"(023)88191000",uid:"10d810984a89b214b21e369d"},
        "113.254895,23.152666":{ movName:"星美国际影城(华南影都店)",address:"广州市荔湾区环市西路133路华南影都D区2楼(近广园西路)",tel:"(020)28340088",uid:"e268b183d0845ccaacee7a73"},
        "106.517505,29.545037":{ movName:"ume国际影城(渝中店)",address:"重庆市渝中区时代天街路1号龙湖时代天街购物广场B馆5F(大坪商圈)",tel:"(023)68505500",uid:"ffed9d374229fcd441ab9a0e"},
        "114.018165,22.551616":{ movName:"中影今典国际影城",address:"深圳市福田区农林路69号深国投广场三楼",tel:"(0755)82531106",uid:"8c20e59fae63ded70b1cc76c"},
        "116.495123,39.890986":{ movName:"东都国际影城",address:"北京市朝阳区东四环中路195号华腾新天地五层",tel:"(010)87952964",uid:"f31a8f08fa4f08fff7e73b70"},
        "113.272499,23.100446":{ movName:"广州UME国际影城",address:"海珠区宝岗大道498号广百新一城广场6楼",tel:"020-84257979",uid:"0f41fd56a91287ad471a321c"},
        "121.48251,31.238716":{ movName:"和平影都",address:"上海市黄浦区西藏中路290号(近汉口路)",tel:"(021)63225252",uid:"f0ac4d4750d841a6d5b74e2e"},
        "114.409603,30.511115":{ movName:"武汉中影天河影院",address:"洪山区光谷步行街C区3楼（近名族大道）",tel:"027-87416895",uid:"594ce74d941ddff7841541ae"},
        "114.284662,22.694822":{ movName:"深圳金域新百花电影城",address:"龙岗区南约社区宏佰超市四楼（宝龙比亚迪厂斜对面）",tel:"0755-28329816",uid:"861752adb7cb7e4132870a64"},
        "113.408621,23.126471":{ movName:"喜洋时代影城-东圃四季荟店",address:"天河区东圃大马路4号",tel:"020-82306000",uid:"42ab6e3a3b78f5a081a12ee4"},
        "114.348212,30.59391":{ movName:"武汉金逸国际影城-销品茂店",address:"洪山区徐东大街18号销品茂5楼（近友谊大道）",tel:"027-68898561 68898566",uid:"9c7bff6526d2d8bd40e19242"},
        "121.477773,31.239009":{ movName:"大光明电影院",address:"上海市黄浦区南京西路216号(近黄河路)",tel:"(021)63273399;(021)63277002",uid:"4e37ef5582693e7f5cd4fe98"},
        "121.224754,31.04327":{ movName:"开元地中海影城",address:"上海市松江区新松江路927弄4042号开元地中海商业广场4楼(近西林北路口)",tel:"(021)37793999",uid:"764fd00f436ee23b8c55eced"},
        "106.551531,29.585829":{ movName:"重庆橙天嘉禾影城-九街店",address:"江北区北城天街48号附1号5号（欧式一条街同创国际对面）",tel:"023-88191000",uid:"d49360e8703ccd20fa0cadbb"},
        "113.916273,22.565467":{ movName:"中影环星电影城新安店",address:"宝安区新安二路70号",tel:"0755-29668666",uid:"3eb6ed005492566c81288a06"},
        "121.478391,31.24858":{ movName:"金逸院线新恒星影城",address:"上海市闸北区西藏北路166号大悦城10-11楼(近曲阜路)",tel:"(021)36527206;(021)36397050",uid:"466b302ce4fad8876268583b"},
        "121.499041,31.194221":{ movName:"世博国际影城",address:"上海市浦东新区世博大道1200号世博文化中心6楼",tel:"(021)20251186",uid:"998ac5c974f4b5780782c2bb"},
        "114.123081,22.551767":{ movName:"深圳戏院",address:"罗湖区新园路1号（东门步行街西口）",tel:"0755-82175808",uid:"969bf6af3b8863872fb17ea4"},
        "121.523019,31.234023":{ movName:"新世纪影城",address:"上海市浦东新区张扬路501号第一八佰伴10楼(近浦东南路)",tel:"(021)58362988;(021)62817017",uid:"cf74f1b0c3598df45abbbcb2"},
        "121.394514,31.114042":{ movName:"上影CGV莘庄影城",address:"上海市闵行区都市路5001号仲盛世界商城4楼(近莘庄地铁南广场)",tel:"(021)34633318",uid:"cd718968a8db3d74adb22a46"},
        "104.027551,30.670205":{ movName:"成都幸福蓝海春天影城",address:"青羊区二环路西二段19号仁和春天广场C座5楼",tel:"028-61500800 61500808",uid:"eac9e0300b984d977adbd2c0"},
        "113.282538,23.095792":{ movName:"广州金逸国际影城-达镖店",address:"海珠区昌岗中路238号达镖国际中心第五层",tel:"",uid:"aba2d7c7027a8571e81e973f"},
        "106.49169,29.488628":{ movName:"重庆橙天嘉禾影城-壹街店",address:"大渡口区新山村街道文体路88号壹街购物中心2楼",tel:"023-88613666",uid:"7b1350c9ab2e69e51ee99956"},
        "121.522379,31.306309":{ movName:"17.5影城(又一城店)",address:"上海市杨浦区凇沪路8号百联又一城购物中心8楼(近五角场邯郸路)",tel:"(021)65483135;(021)65483154",uid:"142a46778dd01f4a09b93a4c"},
        "114.381917,30.886979":{ movName:"华谊兄弟影院武汉黄陂店",address:"黄陂区黄陂大道387号黄陂广场C座（国土局旁）",tel:"027-61106297",uid:"c9dac7642261d487be48429c"},
        "121.481898,31.224913":{ movName:"ume国际影城(新天地)",address:"上海市黄浦区兴业路123弄新天地南里6号5楼(新天地广场内)",tel:"(021)63733333;(021)63841435",uid:"8879446be7f25ddc157643d0"},
        "114.41776,30.483692":{ movName:"华谊兄弟影院武汉光谷店",address:"洪山区关山大道光谷天地F1区三楼",tel:"027－51779999",uid:"2bc3a9e62245361088db7370"},
        "121.385968,31.239634":{ movName:"金逸国际影城(中环店)",address:"上海市普陀区金沙江路1628号绿洲中环太平洋广场5号楼(近中环路)",tel:"(021)32512826;(021)32513346",uid:"644c2ca8757aabb88533049e"},
        "113.334043,23.193324":{ movName:"广州金逸国际影城-太阳城店",address:"白云区广州大道北1811号嘉裕太阳城广场三楼",tel:"020-36732288 36732009",uid:"09c977e4eca2cdc8882fb571"},
        "106.585353,29.565992":{ movName:"重庆金逸国际影城-地王店",address:"渝中区民族路166号地王广场6楼（王府井百货6楼）",tel:"023-63808758",uid:"ef419376e278b8fbb23c819d"},
        "114.331662,30.510679":{ movName:"武汉金逸国际影城-南湖店",address:"武昌区丁字桥南路518号南国南湖城市广场3楼",tel:"027-88709396",uid:"4ebff763b401bbb6dc1e522b"},
        "121.377671,31.214182":{ movName:"世纪仙霞影城",address:"上海市长宁区仙霞西路88号百联西郊购物中心4楼(近哈密路)",tel:"(021)62397873",uid:"8b3cf45e9cd9f3913517dcbf"},
        "104.07325,30.608023":{ movName:"成都横店影城",address:"高新区天府大道8号苏宁广场6楼",tel:"028-85153512",uid:"29ee5c0ed798f016f7e73bad"},
        "113.343094,23.157966":{ movName:"广州飞影电影城",address:"天河区东莞庄路世纪联华二楼",tel:"020-37225388",uid:"1f3e615b7425445a441a32b1"},
        "113.369281,23.046564":{ movName:"广东科学中心",address:"番禺区大学城西六路168号",tel:"020-39348080",uid:"f7a5b3633d9e2c48a3acc4b4"},
        "113.310071,23.037255":{ movName:"广州丽江影城",address:"番禺区丽江花园渔人码头商饮中心三楼丽江影城",tel:"020-39986366",uid:"c4a6a2be6bd7b0f04bcc4a2d"},
        "121.568501,31.214846":{ movName:"喜玛拉雅海上国际影城",address:"上海市浦东新区芳甸路1188弄喜玛拉雅中心7-8楼",tel:"(021)60457099;(021)60457098",uid:"a3349cda33b0660fb6147f5c"},
        "121.42274,31.224635":{ movName:"龙之梦影城",address:"上海市长宁区长宁路1018号龙之梦9楼(近中山公园)",tel:"(021)52378276",uid:"ec4adc8c8fdb7eecf5c59c1b"},
        "121.519536,31.306648":{ movName:"万达影城(上海五角场万达广场店)",address:"上海市杨浦区国宾路58号万达广场三层",tel:"(021)55660926;4000806060",uid:"8d7ec023ca23b9d9eaf85303"},
        "121.509004,31.242212":{ movName:"国金百丽宫影院",address:"上海市浦东新区世纪大道8号国金中心商场地下一层LG1-1(近银城中路)",tel:"(021)31263886;(021)31267833",uid:"3f91d8740c5eafeb1e1d115e"},
        "121.406284,31.136933":{ movName:"世纪友谊影城",address:"上海市闵行区沪闵路7250号友谊商城9楼(近莲花路地铁站)",tel:"(021)64120260;(021)64120804",uid:"01f53be3854c438b095cb34c"},
        "106.4684,29.56421":{ movName:"重庆煌华横店电影城",address:"沙坪坝区三峡广场步行街6号煌华新纪元购物广场8楼",tel:"023-65007645",uid:"db51f18bc8d69ba66ca3cc71"},
        "114.214978,30.564669":{ movName:"武汉金逸国际影城-王家湾店",address:"汉阳区王家湾龙阳大道特6号摩尔城C区5楼",tel:"027-84459599",uid:"ad28dc3b9ef863b80e3dda3a"},
        "121.459141,31.279779":{ movName:"上影CGV大宁影城",address:"上海市闸北区共和新路1878号大宁国际商业广场S1座3楼(近大宁路)",tel:"(021)56651212",uid:"e6cbfed45fa695f3a5c7568e"},
        "121.576792,31.120472":{ movName:"万达影城(上海周浦万达广场店)",address:"上海市浦东新区年家浜路518号万达广场四层",tel:"(021)38230668;4000806060",uid:"6beedb45a44be5810f0e6b49"},
        "121.480807,31.241927":{ movName:"世纪大上海电影院",address:"上海市黄浦区西藏中路500号第一百货商店新楼8楼(近南京东路)",tel:"(021)63616078",uid:"cd7f57d494eb41f8a0d23008"},
        "113.253742,23.127593":{ movName:"广州金逸国际影城-和业店",address:"荔湾区康王中路486号和业广场4楼(龙津东路口)",tel:"020-81236080 81236090",uid:"f26769342a5b20597f29bd5d"},
        "121.384484,31.113849":{ movName:"莘庄海上国际影城",address:"上海市闵行区沪闵路6088号凯德龙之梦广场4楼(近莘建路)",tel:"(021)64880138",uid:"094c5dfe2e340123ab059d49"},
        "104.0832,30.625808":{ movName:"成都上影国际影城",address:"武侯区科华中路9号王府井百货5楼",tel:"028-85222236",uid:"66f395e14f80e1192b06ce1f"},
        "121.443131,31.200469":{ movName:"永华电影城",address:"上海市徐汇区虹桥路1号港汇广场6楼(近华山路)",tel:"(021)64076622",uid:"8da133c711da33c64354d72a"},
        "107.080961,29.837115":{ movName:"重庆金逸国际影城-长寿店",address:"长寿区凤城镇向阳路2号协信购物广场7楼",tel:"023-40236011",uid:"065599ca4cc0cd804f554729"},
        "113.327179,23.18418":{ movName:"广州华影梅花园影城",address:"白云区广州大道北28号梅花园商业广场5楼",tel:"020-37322088",uid:"e4c05e540ba29ff9c909f0e9"},
        "106.536524,29.578848":{ movName:"重庆华谊兄弟影城-金源店",address:"江北区建新北路二支路1号金源地下不夜城",tel:"023-61802211",uid:"607b3bd42a8ba014f32d83c1"},
        "121.590586,31.206553":{ movName:"金逸国际影城(张江店)",address:"上海市浦东新区碧波路635号传奇广场2楼(近祖冲之路)",tel:"(021)50802001",uid:"1b1bce9cd40e680914c8f6e3"},
        "106.519608,29.606823":{ movName:"重庆华大影院",address:"渝北区新南路36号卜蜂莲花超市3楼",tel:"023-67960705",uid:"262144336ef5d0b8130daaff"},
        "121.480379,31.24168":{ movName:"新世界电影城",address:"上海市黄浦区南京西路2-68号新世界12楼(近西藏中路)",tel:"(021)63596810;(021)63594933",uid:"d15891210c0eb2fcf503b87c"},
        "114.328706,30.662292":{ movName:"武汉天河国际影城后湖百步亭店",address:"江岸区后湖大道268号新生活摩尔城三楼",tel:"027-82311119-804 805",uid:"1940014d530cecffb04c4978"},
        "113.211051,23.391928":{ movName:"喜洋时代影城-星光汇店",address:"花都区建设北路72号星光汇商厦八楼",tel:"020-36991000",uid:"90dea616e6cfecb121f017eb"},
        "114.306288,30.553295":{ movName:"江汉环球电影城",address:"武昌区司门口解放路464号原江汉剧场(户部巷对面)",tel:"027-88863743",uid:"f18e562848ee2c1381288ad6"},
        "114.217678,30.567491":{ movName:"汉阳天河国际影城",address:"汉阳区汉阳大道687号，汉商21购物娱乐中心三楼（近汉水公园）",tel:"027－84675900 84675911",uid:"21071ff7ceb7151f97031975"},
        "121.333078,31.247036":{ movName:"万达影城(上海江桥万达广场店)",address:"上海市嘉定区金沙江西路1075弄49号万达广场三层",tel:"(021)31275666;4000806060",uid:"894c9c488158d6f762685820"},
        "113.863136,22.575004":{ movName:"深圳金逸国际影城-碧海城店",address:"宝安区西乡大道与兴业路交汇处碧海城广场4楼",tel:"0755-29885188",uid:"63a6b4f5f7f0491c5fd4fee7"},
        "104.10219,30.685743":{ movName:"成都保利万和国际影城",address:"成华区府青路二段2号财富又一城5楼",tel:"028-83266069",uid:"e50f67cf75b46e129d82ea7f"},
        "113.302048,23.131382":{ movName:"中影火山湖电影城-东山口店",address:"越秀区农林下路4-6号东山锦轩现代城4楼",tel:"020-87623898",uid:"6e76cb75d634765fb7265592"},
        "121.462735,31.23542":{ movName:"环艺电影城",address:"上海市静安区南京西路1038号梅龙镇广场10楼(近江宁路)",tel:"(021)62187109;(021)62183189",uid:"5906ca95b3524faf734b87a3"},
        "121.506941,31.242629":{ movName:"星美国际影城(浦东正大店)",address:"上海市浦东新区陆家嘴西路168号正大广场8楼(近东方明珠)",tel:"(021)50472025",uid:"682c80b7ae134711e6e965ee"},
        "121.446418,31.199511":{ movName:"超极电影世界",address:"上海市徐汇区肇嘉浜路1111号美罗城5楼(近漕溪北路)",tel:"(021)64268181",uid:"0f267165bfa95e4df90cadf9"},
        "121.436219,31.208638":{ movName:"上海影城",address:"上海市长宁区新华路160号(番禺路口)",tel:"(021)62806088",uid:"a907b651473ce955725e80bb"},
        "104.030508,30.676293":{ movName:"成都峨影1958影城",address:"青羊区清江东路360号",tel:"400-616-6688",uid:"4c6da9644e17ed3fdc1e52e1"},
        "113.334098,23.131091":{ movName:"广州金逸国际影城-维家思店",address:"天河区黄埔大道西188号维家思广场三楼",tel:"020-87588855",uid:"922341d4016ef63cdf1e52e7"},
        "113.268902,23.200449":{ movName:"广州金逸国际影城-百信店",address:"白云区机场路1423-1455号百信三期5楼",tel:"020-86310906 86310908",uid:"ae4d9617569ab79501294fe8"},
        "106.57061,29.532098":{ movName:"重庆南岸横店电影城",address:"南岸区惠工路13号五楼（元旦购物广场）",tel:"023-62822200",uid:"a588e96efd6ad4d2da2f286e"},
        "104.109331,30.675198":{ movName:"成都星美国际影城-沙河店",address:"成华区建设路26号",tel:"028-84339232",uid:"4e74877fbe06b30ea7c756ad"},
        "121.418601,31.176187":{ movName:"庆春电影城",address:"上海市徐汇区田林路140号越界广场15幢2楼(近苍梧路)",tel:"(021)33676660",uid:"8accd6a4228ef806aaf7297e"},
        "113.891413,22.589445":{ movName:"深圳金逸国际影城-建安店",address:"宝安区建安二路河东骏丰园首层金逸影城",tel:"0755-85268280 0755-85268281",uid:"0f930b8df1545e9e01294f77"},
        "114.139951,22.553427":{ movName:"深影凤凰国际影城",address:"罗湖区凤凰路和清平路交汇处京基凤凰印象三楼",tel:"0755-82119111",uid:"78c37c3a4e5ff17043afe602"},
        "116.322649,39.984288":{ movName:"金逸国际电影城(北京中关村店)",address:"北京市海淀区中关村大街19号新中关购物中心地下一层B180 ",tel:"(010)82486800 ",uid:"f61acef3238530bceb12e404"},
        "116.524686,39.929824":{ movName:"金逸国际电影城朝阳大悦城店",address:"朝阳区朝阳北路101号朝阳大悦城8楼(青年路口)",tel:"(010)85527919 ",uid:"c73d22291003a249c51e51f8"}
    },
	cityList : ['beijing', 'shanghai', 'guangzhou', 'shenzhen', 'hangzhou',
			'lijiang', 'chengdu', 'sanya', 'xiamen', 'xian'],
	tpl : function(template, data, label) {
		var tmp = String(template), s = label || /&\{([^}]*)\}/mg;
		return tmp.replace(s, function(value, name) {
					if (data[$.trim(name)] === '') {
						return value = '&nbsp';
					}
					return value = data[$.trim(name)];
				});
	},
	mecatorTolnglat:function(x,y) {
	var poi = new BMap.Pixel(x,y);
	return this.map.getMapType().getProjection().pointToLngLat(poi);
	},
	lngLatToMecator:function (lng,lat){
	var poi = new BMap.Point(lng,lat);
	return this.map.getMapType().getProjection().lngLatToPoint(poi);
    },

	map : {},
	initMap : function(cityName,targetDiv) {
		var map = new BMap.Map(targetDiv);
		map.centerAndZoom(cityName, 12);
		map.enableScrollWheelZoom();
		this.map = map;
	},
	temp:"<div id='popupBox' style='width:412px;height:356px;background:url(images/popup.png) no-repeat scroll 0 0 transparent;color:#ffffff;'><div class='popup_title' style='overflow:hidden;font-size:14px;height:34px;line-height:34px;text-indent:15px'>&{movName}</div><div style='height:55px;text-indent:15px'><div style='height:30px;line-height:30px;'>&{address}</div><div style='height:25px;line-height:12px;'>&{tel}</div></div><ul style='padding:0 14px;height:162px;width:412px;overflow:hidden;'><li style='float:left;display:inline;'><img src='images/1s.jpg' width='115px' height='161px'/></li><li style='float:left;display:inline;margin-left:18px;'><img src='images/2s.jpg' width='115px' height='161px'/></li><li style='float:left;display:inline;margin-left:18px;'><img src='images/3s.jpg' width='115px' height='161px'/></li></ul><div style='height:31px; width:169px; padding:14px 121px;'><a style='width:174px;height:29px;line-height:29px;display:block;text-align:center;color:#ffffff;background:url(images/pick_seat.png);cursor:pointer;text-decoration:none;font-weight:bold;' uid='&{uid}' target='_blank' class='buy_ticket' movId='&{id}'>选座购票</a></div></div>",
	addMarker : function(point, index, map) {
		var that = this;
		var myIcon = new BMap.Icon("images/raindrop.png", new BMap.Size(27, 40)),marker = new BMap.Marker(
				point, {
					icon : myIcon
				});
		marker.setOffset(new BMap.Size(0, -20));
		marker.addEventListener("click",function() {
			if($("#map").find(".infoBox").length>0){
			  $("#map").find(".infoBox").remove();
			}
			
			var    mov_key = point.lng+","+point.lat;//point.lng+","+point.lat, 			     
			     var cnt = that.tpl(that.temp,that.movInfo[mov_key]);
			      var mov_popup = new BMapLib.InfoBox(that.map,cnt,{alignBottom: true,closeIconUrl:"images/close.png",enableAutoPan:true});//boxStyle:{background:"url('img/popup.png') no-repeat scroll 0 0 transparent",width: "412px",height:"356px",color:"#ffffff"}
                             mov_popup.open(point);
                             $("#map").find(".buy_ticket").on("click",function(){
                                var _uid = $(this).attr("uid");                               
		                     $.ajax({
		                      url:"http://172.22.182.35/movie2013/index.php/movie/getTenPara",
		                      type:"get",
		                      dataType:"jsonp",
		                      jsonp:"callback",
		                      success:function(re){
                             var _url = "http://map.baidu.com/detail?qt=ninf&detail=life&uid="+_uid+re.result;
                             var j =encodeURIComponent(_url+"&channel=pc1");
                             window.open("activity_mid.html?jump="+j);
                             
                      }
                 });
                               
                             })
				

		});
		that.map.addOverlay(marker);
	}

});
					/*
					 * 自定义弹窗 window._g.MoviePopUpOverlay = function(coor, temp,
					 * data,opts,map) { this._map = map; this._width =
					 * opts.width; this._coor = coor; this._cnt = _g.tpl(temp,
					 * data); } window._g.MoviePopUpOverlay.prototype = new
					 * BMap.Overlay();
					 * window._g.MoviePopUpOverlay.prototype.initialize =
					 * function(map) {
					 * map.getPanes().floatPane.appendChild(this._cnt); return
					 * this._cnt; } window._g.MoviePopUpOverlay.prototype.draw =
					 * function() { // 根据地理坐标转换为像素坐标，并设置给容器 var position =
					 * this._map.pointToOverlayPixel(this._coor);
					 * this._cnt.style.left = position.x - this._width / 2 +
					 * "px"; this._cnt.style.top = position.y - this._width / 2 +
					 * "px"; }
					 */




;
(function($) {
	// 图片轮播插件
	$.fn.UISlide = function(options) {
		var defaults = {
			playTime : 2000, // 间隔时间
			duration : 800, // 延迟时间
			direction : 'left', // 方向
			easing : 'easeInOutQuad', // 自动播放时 easing 方式
			clickEasing : 'easeOutCubic' // 点击时 easing 方式
		};
		var opts = $.extend({}, defaults, options); // 参数合并
		var slide = {
			// 播放调用及一些变量的初始化
			play : function(opts, me) {
				var that = this, isPlay;
				that.me = me;
				that.picList = me.find('ul'); // 图片列表
				that.title = me.find('div').find('a'); // 图片标题
				that.oNum = $(".slide_num")//me.find('dl'); // 数字按钮
				that.lis = that.picList.find('li'); // li
				that.size = that.lis.length; // 图片的数量
				that.lisWidth = that.lis.width();
				that.isPlay = isPlay; // 是否自动播放
				for (var p in opts) { // opts 绑定到 slide
					that[p] = opts[p];
				}
				that.setNums().setTitle();
				if (that.size > 1) { // 如果图片数量大于则轮播
					that.autoPlay().slideEvent();
				}
			},
			// 设置按钮
			setNums : function() {
				var that = this, links, // 图片的链接
				me = that.me, size = that.size, oNum = that.oNum, // 按钮对象
				arrTemp = [];
				//links = that.picList.find('a').first();
				//that.title.html(links[0].title).attr('href', links[0].href); // 把链接的
																				// title
																				// 内容放到标题栏上显示
				for (var i = 1; i <= size; i++) {
					if (i == 1) {
						arrTemp.push('<dd style="border:none;"></dd>');
					} else {
						arrTemp.push('<dd></dd>');
					}
				}
				oNum.append(arrTemp.join(''));
				that.slideNum = oNum.find('dd');
				that.numWidth = (that.slideNum.width()
						+ parseInt(that.slideNum.css('margin-right')) + 0)
						* size + 1; // 数字按钮宽度
				that.setTitle();
				return that;
			},
			// 自动播放
			autoPlay : function() {
				var that = this, activePos, direction = that.direction, picList = that.picList, slideNum = that.slideNum, playTime = that.playTime;
				that.isPlay = setInterval(function() {
					activePos = that.oNum.find('.active').index();
					if (direction == 'left') {
						if (activePos == (that.size - 1)) {
							direction = 'right';
							activePos--;
						} else {
							activePos++;
						}
					} else {
						if (activePos == 0) {
							direction = 'left';
							activePos++;
						} else {
							activePos--;
						}
					}
					picList.stop().animate({
								'margin-left' : 0 - activePos
										* (that.lisWidth)//ddddd
							}, {
								duration : that.duration,
								easing : that.easing
							});
					slideNum.removeClass('active').eq(activePos)
							.addClass('active');
					//var links = picList.find('a').eq(activePos);
					//that.title.html(links[0].title).attr('href', links[0].href);
				}, playTime);
				return that;
			},
			// 设置标题
			setTitle : function() {
				var that = this;
				that.oNum.width(that.numWidth + 2); // 设置数字按钮宽度
				that.picList.width((that.lisWidth) * that.size); // 设置图片容器总宽度    ddddd
				that.slideNum.first().addClass('active');
				return that;
			},
			// 绑定数字按钮事件
			slideEvent : function() {
				var that = this, slideNum = that.slideNum;
				slideNum.click(function() {
					var thisNum = $(this).index();
					that.picList.stop().animate({
								"margin-left" : 0 - thisNum
										* (that.lisWidth)// ddddd
							}, {
								duration : that.duration,
								easing : that.clickEasing
							});
					slideNum.removeClass('active').eq(thisNum)
							.addClass('active');
					//var links = that.picList.find('a').eq(thisNum);
					//that.title.html(links[0].title).attr('href', links[0].href);
				});
				// 鼠标到画面中任意位置，停止播放
				that.me.hover(function() {
							clearInterval(that.isPlay);
						}, function() {
							that.autoPlay();
						})
				return that;
			}
		};
		return this.each(function() { // $(a,b) 方式调用
					slide.play(opts, $(this));
				});
	}
})(jQuery);  






var oBox = document.getElementById("box");
	var aUl = document.getElementsByTagName("ul");
	var aImg = aUl[0].getElementsByTagName("li");
	var aNum = aUl[1].getElementsByTagName("li");
	var timer = play = null;
	var i = index = 0;	
	var bOrder = true;
	//切换按钮
	for (i = 0; i < aNum.length; i++)
	{
		aNum[i].index = i;
		aNum[i].onmouseover = function ()
		{
			show(this.index)
		}
	}
	
	//鼠标划过关闭定时器
	oBox.onmouseover = function ()
	{
		clearInterval(play)	
	};
	
	//鼠标离开启动自动播放
	oBox.onmouseout = function ()
	{
		autoPlay()
	};	
	
	//自动播放函数
	function autoPlay ()
	{
		play = setInterval(function () {
			//判断播放顺序
			bOrder ? index++ : index--;			
			
			//正序
			index >= aImg.length && (index = aImg.length - 2, bOrder = false);
			
			//倒序
			index <= 0 && (index = 0, bOrder = true);
			
			//调用函数
			show(index)
		},2000);	
	}
	autoPlay();//应用
	
	//图片切换, 淡入淡出效果
	function show (a)
	{
		index = a;
		var alpha = 0;
		for (i = 0; i < aNum.length; i++)aNum[i].className = "";
		aNum[index].className = "current";
		clearInterval(timer);			
		
		for (i = 0; i < aImg.length; i++)
		{
			aImg[i].style.opacity = 0;
			aImg[i].style.filter = "alpha(opacity=0)";	
		}
		
		timer = setInterval(function () {
			alpha += 2;
			alpha > 100 && (alpha =100);
			aImg[index].style.opacity = alpha / 100;
			aImg[index].style.filter = "alpha(opacity = " + alpha + ")";
			alpha == 100 && clearInterval(timer)
		},20);
	}
	
	
	
	
	
/********************************图片延迟加载************************************************/

/*
* 延迟加载页面图片
* 
* 依赖 jquery
* 
* 
*/
;(function(global){
    //获取窗口的大小
    var getClientSize = function(){
        if(document.compatMode === "CSS1Compat"){
            return {
                width:document.documentElement.clientWidth,
                height:document.documentElement.clientHeight
            }
        }else{
            return {
                widht:document.body.clientWidth,
                height:document.body.clientHeight
            }
        }
    }; 
    //获取页面高度
    var getPageHeight = function(){
        var D = document;
        return Math.max(
            Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
            Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
            Math.max(D.body.clientHeight, D.documentElement.clientHeight)
        );
    };
                
    var LazyLoad = function(options){
        options = options || {};
        this.watchClass = options.watchClass || ".lazy-load"; //监控延时加载的类名
        this.srcTag = options.srcTag || "lazy-load-src"; //如果是延时加载 显示延时加载的图片路径
        this.isStartWatch = options.isStartWatch === void 0 ? false : options.isStartWatch; //是否立即执行，绑定事件动作
       
        this.watchList = []; //监控的元素列表 ps:jquery对象
        this.loadedTag = "lazy-loaded";
        this.init();
    };
                
    LazyLoad.prototype = {
        constructor:LazyLoad,
        init:function(){
            if(this.isStartWatch){
                this.addWatchEle(jQuery(this.watchClass));
                this.eleIsInView();
            }
            this.bindEvent();
        },
        startWatch:function(){
            this.addWatchEle(jQuery(this.watchClass));
            this.eleIsInView();
        },
        addWatchEle:function(eles){
            if(!eles){
                return;
            }
            //todo:增加 重复元素检查机制。ps：每个增加到监控列表的元素都要生成一个唯一的id属性 lazy-load-id 
            //todo:判断是否元素已经添加到监控列表了
            this.watchList.push(eles);
        },
        removeWatchEle:function(){
            //todo:从列表中移除监控的元素，立即执行加载动作
            
        },
        showImages:function(ele){
            if(!ele){
                return;
            }
            var that = this;
            var jEle = jQuery(ele);
            if(jEle.attr(this.loadedTag)){
                return;
            }
            jQuery(ele).find("img["+this.srcTag+"]").each(function(i,img){
                var jImg = $(img);
                jImg.attr("src",jImg.attr(that.srcTag));
            });
            jEle.attr(this.loadedTag,"1");
        },
        eleIsInView:function(){
            var clientSize = getClientSize();
            var scrollTop = $(document.documentElement).scrollTop() || $("body").scrollTop();//todo:确定是否是body的scroll todo:缓存body 元素
            var scrollLeft = $(document.documentElement).scrollLeft() || $("body").scrollLeft();//todo:确定是否是body的scroll todo:缓存body 元素
            var that = this;
            jQuery.each(this.watchList,function(i,eles){
                eles.each(function(j,ele){//多个元素
                    var off = jQuery(ele).offset();
                    var offTop = off.top - scrollTop;
                    var offLeft = off.left - scrollLeft;
                    if((offTop + jQuery(ele).height() >=0 && offTop <= clientSize.height) &&  (offLeft + jQuery(ele).width() >=0 && offLeft<= clientSize.width)){
                        //表面这个元素在显示区域中,加载这个元素下的所有图片
                        that.showImages.call(that,ele);                                    
                    }
                });
            });
        },
        bindEvent:function(){
            var that = this;
            //绑定scroll事件
            jQuery(window).on("scroll",function(){
                that.eleIsInView();
            });
            //绑定resize事件
            jQuery(window).on("resize",function(){
                that.eleIsInView();
            });
        }
    };
    global.LazyLoad = LazyLoad;
    
    

    /*
    jQuery(document).ready(function(){
        new LazyLoad({
            isStartWatch:true
        });
    });*/
})(window)
	