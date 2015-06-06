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
	chartData.addColumn('number', 'Male Percentage');

	_.each(states, function(state){
		var stateName = 'US-' + state.state;
		var total =  parseInt(state.femaleCount) + parseInt(state.maleCount);
		var malePercentage = Math.round( (state.maleCount / total * 100) * 100) / 100;

		chartData.addRow([stateName, malePercentage]);
	});
      
    chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(chartData, options);
});

