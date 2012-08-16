(function($) {

	function observable() {}
	observable.prototype = {

	};
	
	$.addModule('event', {
		observable: observable
	});

})(jQuery);
