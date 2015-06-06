chartData = new google.visualization.DataTable();
options = {
	region : 'US',
	resolution : 'provinces',

};

Template.map.onRendered(function(){
	var instance = this;
	var states = instance.data.fetch();

	var dataArray = [];

	chartData.addColumn('string', 'State');
	chartData.addColumn('number', 'Male Employment');

	_.each(states, function(state){
		var stateName = 'US-' + state.state;
		var total =  parseInt(state.femaleCount) + parseInt(state.maleCount);
		var malePercentage = Math.round( (state.maleCount / total * 100) * 100) / 100;
		chartData.addRow([stateName, malePercentage]);
	});
      
    chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

 google.visualization.events.addListener(chart, "regionClick", function (eventData) {

    	//Delete Tooltip
    	$(".tooltip_inner").remove();

		var region = eventData["region"];
		var state_key = region.slice(3, 5);
		var found = States.findOne({state:state_key});
		var malePercentage = Math.round( (parseInt(found.maleCount) / (parseInt(found.maleCount) + parseInt(found.femaleCount)) * 100) * 100) / 100;
		var femalePercentage = Math.round(100 - malePercentage);
		var tooltip_data = {
			'found' : found,
			'malePercentage': malePercentage,
			'femalePercentage': femalePercentage
		};

		Blaze.renderWithData(Template.tooltip, tooltip_data, $("#tooltip").get(0));

	});


    chart.draw(chartData, options);


});

