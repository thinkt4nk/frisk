$.addService("engines", {
	/* available services */
	
	controller: "engines",
	
	getOverview: function (data, success, error) {
		this.execute("ajax", {
			type:"GET",
			url: URLHelper.buildAjaxURL(this.controller + "/Overview"),
			data: URLHelper.buildQuery(data),
			dataType: "json",
			success: success,
			error: error
		},
		this.getOverviewFixture(),
		false);
	},
	
	getBreakdown: function (data, success, error) {		
		this.execute("ajax", {
			type:"GET",
			url: URLHelper.buildAjaxURL(this.controller + "/IndexGrid"),
			data: URLHelper.buildQuery(data), 
			dataType: "json",
			success: success, 
			error: error
		},
		this.getBreakdownFixture(),
		false);
	},
	
	getChart: function (data, success, error) {		
		data.max_points = 20;
		this.execute("ajax", {
			url: URLHelper.buildAjaxURL(this.controller + "/IndexChart"), 
			data: URLHelper.buildQuery(data), 
			dataType: "json",
			success: success, 
			error: error
		}, 
		this.getChartDataFixture(),
		false);
	},
	
	getChartInverted: function (data, success, error) {		
		data.max_points = 20;
		this.execute("ajax", {
			url: URLHelper.buildAjaxURL(this.controller + "/InvertedChart"), 
			data: URLHelper.buildQuery(data), 
			dataType: "json",
			success: success, 
			error: error
		}, 
		this.getChartInvertedDataFixture(),
		false);
	},		
	
	getChartHistorical: function (data, success, error) {	
		this.execute("ajax", {
			url: URLHelper.buildAjaxURL(this.controller + "/IndexChart"), 
			data: URLHelper.buildQuery(data), 
			dataType: "json",
			success: success, 
			error: error
		}, 
		this.getChartHistoricalDataFixture(),
		false);
	},
	
	getChartHistoricalInverted: function (data, success, error) {		
		data.max_points = 20;
		this.execute("ajax", {
			url: URLHelper.buildAjaxURL(this.controller + "/InvertedChart"), 
			data: URLHelper.buildQuery(data), 
			dataType: "json",
			success: success, 
			error: error
		}, 
		this.getChartHistoricalInvertedDataFixture(),
		false);
	},	

  // --------------------------------------------------------------------------
  // Details for Drill-downs 
  // --------------------------------------------------------------------------
  
  getBreakdownDetails: function (data, success, error) {   
    this.execute("ajax", {
      type:"GET",
      url: URLHelper.buildAjaxURL(this.controller + "/DetailsGrid"),
      data: URLHelper.buildQuery(data), 
      dataType: "json",
      success: success, 
      error: error
    },
    this.getBreakdownFixture(),
    false);
  },
  
  getChartDetails: function (data, success, error) {   
    data.max_points = 20;
    this.execute("ajax", {
      url: URLHelper.buildAjaxURL(this.controller + "/DetailsChart"), 
      data: URLHelper.buildQuery(data), 
      dataType: "json",
      success: success, 
      error: error
    }, 
    this.getChartDataFixture(),
    false);
  },
  
  getChartHistoricalDetails: function (data, success, error) { 
    this.execute("ajax", {
      url: URLHelper.buildAjaxURL(this.controller + "/DetailsChart"), 
      data: URLHelper.buildQuery(data), 
      dataType: "json",
      success: success, 
      error: error
    }, 
    this.getChartHistoricalDataFixture(),
    false);
  },
  
  	/**
	 * Get list of Engines for chart select filter
	 */
	getEnginesList: function(data, success, error)
	{	
	  this.execute("ajax", {
      url: URLHelper.buildAjaxURL("filters/list"), 
      data: URLHelper.buildQuery(data), 
      dataType: "json",
      success: success, 
      error: error
    }, 
    this.getEnginesListFixture(),
    false);
  },

	/* 	fixtures 	*/
	getBreakdownFixture: function() {
		var fixture = {
			"engine": ["http://www.google.de", "http://www.google.co.uk", "http://www.google.co.jp", "http://www.baidu.com", "http://www.google.co.in", "http://www.google.com"],
			"engine_id": "1...3000",
			"bounce": "32...34:2",
			"conversion1": "150...612",
			"conversion2": "0...100",
			"previous_rank": "-3...1:2",			
			"rank": "0...7",
			"rank_delta": "0...7",
			"rate1": "1100...0",
			"rate2": "1...2:2",
			"visits_delta": "-20...20:2",
      "page_views":"49737...158359",
      "time_visit": "127...140:2",
      "views_per_visit": "2...5:2",
      "visits": "39980...11919"
		};
		var result = {};
		result.table = {};
		result.table.data = DataTemplate.generate(fixture, 25);
		return result;
	},
	
	getEnginesListFixture: function(){
		var fixture = [{"id":"1","value":"aa.yhs.search.yahoo.com"},{"id":"2","value":"aim.search.aol.com"},{"id":"3","value":"aolsearcht11.search.aol.com"},{"id":"4","value":"aolsearcht6.search.aol.com"},{"id":"5","value":"aolsearcht7.search.aol.com"},{"id":"6","value":"ar.search.yahoo.com"},{"id":"7","value":"arianna.libero.it"},{"id":"8","value":"au.search.yahoo.com"},{"id":"9","value":"azby.search.nifty.com"},{"id":"10","value":"br.yhs.search.yahoo.com"},{"id":"11","value":"ca.search.yahoo.com"},{"id":"12","value":"cade.search.yahoo.com"},{"id":"13","value":"cgi.search.biglobe.ne.jp"},{"id":"14","value":"cn.bing.com"},{"id":"15","value":"de.ask.com"},{"id":"16","value":"de.search.yahoo.com"},{"id":"17","value":"es.search.yahoo.com"},{"id":"18","value":"espanol.search.yahoo.com"},{"id":"19","value":"fi.search.yahoo.com"},{"id":"20","value":"fr.search.yahoo.com"},{"id":"21","value":"go.mail.ru"},{"id":"22","value":"hk.search.yahoo.com"},{"id":"23","value":"id.search.yahoo.com"},{"id":"24","value":"ie.search.msn.com"},{"id":"25","value":"www.google.com"},{"id":"26","value":"images.yandex.ru"},{"id":"27","value":"in.search.yahoo.com"},{"id":"28","value":"it.search.yahoo.com"},{"id":"29","value":"iwon.results.myway.com"},{"id":"30","value":"m.bing.com"},{"id":"31","value":"m.yahoo.com"},{"id":"32","value":"malaysia.search.yahoo.com"},{"id":"33","value":"images.google.com"},{"id":"34","value":"maps.google.ca"},{"id":"35","value":"maps.google.com"},{"id":"36","value":"maps.google.com.br"},{"id":"37","value":"maps.google.de"},{"id":"38","value":"mindia.bing.com"},{"id":"39","value":"mundo.busca.uol.com.br"},{"id":"40","value":"mx.search.yahoo.com"},{"id":"41","value":"nz.search.yahoo.com"},{"id":"42","value":"ph.search.yahoo.com"},{"id":"43","value":"ricerca.virgilio.it"},{"id":"44","value":"search.aol.ca"},{"id":"45","value":"search.aol.com"},{"id":"46","value":"search.cn.yahoo.com"},{"id":"47","value":"search.daum.net"},{"id":"48","value":"search.goo.ne.jp"},{"id":"49","value":"search.hp.my.aol.co.uk"},{"id":"50","value":"search.icq.com"},{"id":"51","value":"search.naver.com"},{"id":"52","value":"search.seznam.cz"},{"id":"53","value":"search.walla.co.il"},{"id":"54","value":"search.yahoo.co.jp"},{"id":"55","value":"search.yahoo.com"},{"id":"56","value":"searchassist.teoma.com"},{"id":"57","value":"sg.search.yahoo.com"},{"id":"58","value":"sg.yhs.search.yahoo.com"},{"id":"59","value":"startgoogle.startpagina.nl"},{"id":"60","value":"suche.web.de"},{"id":"61","value":"tw.search.yahoo.com"},{"id":"62","value":"uk.ask.com"},{"id":"63","value":"uk.search.yahoo.com"},{"id":"64","value":"us.m.yahoo.com"},{"id":"65","value":"us.m2.yahoo.com"},{"id":"66","value":"us.nc.yhs.search.yahoo.com"},{"id":"67","value":"us.yhs.search.yahoo.com"},{"id":"68","value":"us.yhs4.search.yahoo.com"},{"id":"69","value":"verden.abcsok.no"},{"id":"70","value":"www.ask.com"},{"id":"71","value":"www.baidu.com"},{"id":"72","value":"www.bing.com"},{"id":"73","value":"www.excite.co.jp"},{"id":"74","value":"www.google.ae"},{"id":"75","value":"www.google.as"},{"id":"76","value":"www.google.at"},{"id":"77","value":"www.google.az"},{"id":"78","value":"www.google.ba"},{"id":"79","value":"www.google.be"},{"id":"80","value":"www.google.bg"},{"id":"81","value":"www.google.ca"},{"id":"82","value":"www.google.cat"},{"id":"83","value":"www.google.ch"},{"id":"84","value":"www.google.ci"},{"id":"85","value":"www.google.cl"},{"id":"86","value":"www.google.cn"},{"id":"87","value":"www.google.co.bw"},{"id":"88","value":"www.google.co.cr"},{"id":"89","value":"www.google.co.id"},{"id":"90","value":"www.google.co.il"},{"id":"91","value":"www.google.co.in"},{"id":"92","value":"www.google.co.in."},{"id":"93","value":"www.google.co.jp"},{"id":"94","value":"www.google.co.ke"},{"id":"95","value":"www.google.co.kr"},{"id":"96","value":"www.google.co.ls"},{"id":"97","value":"www.google.co.ma"},{"id":"98","value":"www.google.co.mz"},{"id":"99","value":"www.google.co.nz"},{"id":"100","value":"www.google.co.th"}];
		return fixture;
	},	
	
	getChartDataFixture: function(data) {
		var fixture = {
          "ranges":["2011-05-01","2011-05-02","2011-05-03","2011-05-04","2011-05-05","2011-05-06","2011-05-07","2011-05-08","2011-05-09","2011-05-10","2011-05-11","2011-05-12","2011-05-13","2011-05-14"],		
		      "data":{
		           "visits": {"data": DataTemplate.getRandomArrayValues(14,39980,11919), "label": "Visits"},
		           "page_views": {"data": DataTemplate.getRandomArrayValues(14,49737,158359), "label":"Page Views"},
		           "views_per_visit": {"data": DataTemplate.getRandomArrayValues(14,2,5), "label":"Page Views / Vist"},
		           "time_visit": {"data": DataTemplate.getRandomArrayValues(14,127,140), "label":"Total Time Spent"},
		           "bounce_rate": {"data": DataTemplate.getRandomArrayValues(14,32,34), "label":"Bounce Rate"},
		           "rank": {"data": DataTemplate.getRandomArrayValues(14,1,4), "label":"Rank"},
		           "conversion1": {"data": DataTemplate.getRandomArrayValues(14,150,612), "label":"L1"},
		           "rate1": {"data": DataTemplate.getRandomArrayValues(14,1,4), "label":"L1 Rate"},
		           "conversion2": {"data": DataTemplate.getRandomArrayValues(14,1,4), "label":"L2"},
		           "rate2": {"data": DataTemplate.getRandomArrayValues(14,1,4), "label":"L2 Rate"}
		       },
  	       "aggregation": "daily"
		};
		
		return fixture;
	},
	
	getChartInvertedDataFixture: function(data) {
		var fixture = {};
			fixture = {
	     	"ranges":["2011-05-01","2011-05-02","2011-05-03","2011-05-04","2011-05-05","2011-05-06","2011-05-07","2011-05-08","2011-05-09","2011-05-10","2011-05-11","2011-05-12","2011-05-13","2011-05-14"],		
	      "data":{
	           "engine1": {"data": DataTemplate.getRandomArrayValues(14,39980,11919), "label": "aa.yhs.search.yahoo.com"},
	           "engine2": {"data": DataTemplate.getRandomArrayValues(14,49737,158359), "label":"aim.search.aol.com"},
						 "engine3": {"data": DataTemplate.getRandomArrayValues(14,2,5), "label":"aolsearcht11.search.aol.com"},
					   "engine4": {"data": DataTemplate.getRandomArrayValues(14,32,40), "label":"aolsearcht6.search.aol.com"}
	       },
				"aggregation": "daily",
				"metric":"visits"
			};			
			return fixture;
		},	
		

	
	getChartHistoricalDataFixture: function() {
    var fixture = {
        "ranges":["2011-04-01","2011-04-02","2011-04-03","2011-04-04","2011-04-05","2011-04-06","2011-04-07","2011-04-08","2011-04-09","2011-04-10","2011-04-11","2011-04-12","2011-04-13","2011-04-14"],		
        "data":{
          "visits": {"data": DataTemplate.getRandomArrayValues(14,39980,11919), "label": "Visits"},
          "page_views": {"data": DataTemplate.getRandomArrayValues(14,49737,158359), "label":"Page Views"},
          "views_per_visit": {"data": DataTemplate.getRandomArrayValues(14,2,5), "label":"Page Views / Vist"},
          "time_visit": {"data": DataTemplate.getRandomArrayValues(14,127,140), "label":"Total Time Spent"},
          "bounce_rate": {"data": DataTemplate.getRandomArrayValues(14,32,34), "label":"Bounce Rate"},
          "rank": {"data": DataTemplate.getRandomArrayValues(14,1,4), "label":"Rank"},
          "conversion1": {"data": DataTemplate.getRandomArrayValues(14,150,612), "label":"L1"},
          "rate1": {"data": DataTemplate.getRandomArrayValues(14,1,4), "label":"L1 Rate"},
          "conversion2": {"data": DataTemplate.getRandomArrayValues(14,1,4), "label":"L2"},
          "rate2": {"data": DataTemplate.getRandomArrayValues(14,1,4), "label":"L2 Rate"}     
        },
		    "aggregation": "daily"
    };
    return fixture;
	},
	
	getChartHistoricalInvertedDataFixture: function(data) {
		var fixture = {};
			//Modify engines id to Engine1,2 bla
			fixture = {
	     	"ranges":["2011-05-01","2011-05-02","2011-05-03","2011-05-04","2011-05-05","2011-05-06","2011-05-07","2011-05-08","2011-05-09","2011-05-10","2011-05-11","2011-05-12","2011-05-13","2011-05-14"],		
	      "data":{
	           "engine1": {"data": DataTemplate.getRandomArrayValues(14,39980,11919), "label": "Google"},
	           "engine2": {"data": DataTemplate.getRandomArrayValues(14,49737,158359), "label":"Bing"},
						 "engine3": {"data": DataTemplate.getRandomArrayValues(14,2,5), "label":"aolsearcht11.search.aol.com"}	
	       },
				"aggregation": "daily",
				"metric":"visits"
			};			
			return fixture;
		},	
	
	getOverviewFixture: function() {
		return null;
	}
});