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
			this.getStatesFixture,
			false);
		},
		postDeleteState: function (data, success, error) {
			if (data.id != null) {
				this.execute("ajax", {
					type:"DELETE",
					url: "/states/" + data.id,
					data: {},
					dataType: "json",
					success: success,
					error: error
				},
				this.postDeleteStateFixture,
				false);
			}
		},


		//==========================================
		// Fixtures
		//==========================================
		postCreateStateFixture: function(data) {
			return $.extend(data, {
				id: 1
			});
		},
		getStatesFixture: function(data) {
			// stub
		},
		postDeleteStateFixture: function(data) {
			// stub
		}

	});

})(jQuery);
