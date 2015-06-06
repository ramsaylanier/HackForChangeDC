Template.map.onRendered(function(){
	var instance = this;
	var states = instance.data.fetch();

	var dataArray = [];

	var data = new google.visualization.DataTable();
	data.addColumn('string', 'State');
	data.addColumn('number', 'Male Percentage');

	_.each(states, function(state){
		var stateName = 'US-' + state.state;
		var total =  parseInt(state.femaleCount) + parseInt(state.maleCount);
		var malePercentage = Math.round( (state.maleCount / total * 100) * 100) / 100;

		data.addRow([stateName, malePercentage]);
	});

    var options = {
        region : 'US',
        resolution : 'provinces',
    };
      
    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
});

