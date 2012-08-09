(function($) {
	$.addService("frisk", {
		/* available services */
		
		postCreateState: function (data, success, error) {
			this.execute("ajax", {
				type:"PUT",
				url: "/states/",
				data: data,
				dataType: "json",
				success: success,
				error: error
			},
			this.postCreateStateFixture,
			false);
		},
		getStates: function (data, success, error) {
			this.execute("ajax", {
				type:"GET",
				url: "/states/",
				data: data,
				dataType: "json",
				success: success,
				error: error
			},
			this.postCreateStateFixture,
			false);
		},


		//==========================================
		// Fixtures
		//==========================================
		postCreateStateFixture: function(data) {
			return $.extend(data, {
				id: 1
			});
		}
	});

})(jQuery);
