Template.map.onRendered(function(){
	drawRegionsMap();
	function drawRegionsMap() {
	     var data = google.visualization.arrayToDataTable([
	        ['State', 'Percentage'],
	        ['US-IL', 100],
	        ['US-IN', 75],
	        ['US-IA', 50],
	        ['US-RI', 10]
	      ]);

	    var options = {
	        region : 'US',
	        resolution : 'provinces',
	        colorAxis: {colors: ['#00ff00','#ff0000']},
	    };
	      
	      


	    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

	    chart.draw(data, options);
  	}
});

