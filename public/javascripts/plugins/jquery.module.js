(function(exports, $) {

	var modules = {}
		, base_namespace = "modules";

	var parseModuleName = function(name) {
			var name_segments = name.split(/\./)
				, module_namespace
				, module_name;

			if (name_segments.length > 1) {
				module_namespace = name_segments[0];
				module_name = name_segments[1];
			}
			else {
				module_namespace = base_namespace;
				module_name = name_segments[0];
			}
			return {
				namespace: module_namespace,
				name: module_name
			};
	}

	$.extend({
		addModule: function(name, module) {
			var module_location   = parseModuleName(name)
				, module_namespace  = module_location.namespace
				, module_name       = module_location.name;

			modules[module_namespace] = modules[module_namespace] || {};
			modules[module_namespace][module_name] = module;
		},
		getModule: function(name) {
			var module_location   = parseModuleName(name)
				, module_namespace  = module_location.namespace
				, module_name       = module_location.name;

			return modules[module_namespace][module_name];
		}
	});

})(this, jQuery);
