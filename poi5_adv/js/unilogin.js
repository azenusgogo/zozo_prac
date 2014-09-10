(function($, undefined) {
	var instance = passport.pop.init({
		 apiOpt: {
			 staticPage: 'http://zn.baidu.com/poi5_adv/v3Jump.html',//http://map.baidu.com/zt/poi5/v3Jump.html
			 product: 'http://map.baidu.com',
			 memberPass: true,
             u: 'http://zn.baidu.com/poi5_adv/',//http://map.baidu.com/zt/poi5/
			 safeFlag: 0
		 },
		 cache: false,
		 tangram: true
	});
    window.loginInstance = instance;
})(window.jQuery);