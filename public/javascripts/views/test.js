(function($) {

	var state = {
		title: "Dev",
		order: 0
	};

	$.ajax({
		type: "GET",
		data: {},
		url: "/states/5",
		dataType: "json",
		success: function() {
			console.log('success::',arguments);
		},
		error: function() {
			console.log('success::',arguments);
		}
	});
})(jQuery);
