Template.map.onRendered(function(){
	var instance = this;
	var states = instance.data.fetch();

	var dataArray = [];

	var data = new google.visualization.DataTable();
	data.addColumn('string', 'State');
	data.addColumn('number', 'Male Percentage');

	_.each(states, function(state){
		console.log(state.state + '-male: ' + state.maleCount);
		console.log(state.state + '-female: ' + state.femaleCount);
		var stateName = 'US-' + state.state;
		var malePercentage = state.maleCount / (state.femaleCount + state.maleCount);
		console.log(malePercentage);

		data.addRow([stateName, malePercentage]);
	});

    var options = {
        region : 'US',
        resolution : 'provinces',
        colorAxis: {colors: ['#00ff00','#ff0000']},
    };
      
     
    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
});

