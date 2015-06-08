function updateChart(occupationSelect, yearSelect, initial){
	var occupation = Occupations.findOne({occupation: occupationSelect});
	var occupationDataSet = _.find(occupation.dataSet, function(set){
		return set.year == yearSelect;
	});

	_.each(occupationDataSet.data, function(state, index){
		var thisState = state;
		var stateAbbreviation = _.find(States, function(State){
			return thisState.name.trim() === State.name.trim();
		}).abbreviation;
		var stateName = 'US-' + stateAbbreviation;
		var maleCount = state['employment_male' + occupationSelect];
		var femaleCount = state['employment_female' + occupationSelect];
		var total =  parseInt(femaleCount) + parseInt(maleCount);
		var malePercentage = Math.round( (maleCount / total * 100) * 100) / 100;

		Meteor.setTimeout(function(){
			if (initial){
				chartData.addRow([stateName, malePercentage])
			} else {
				var rowToUpdate = chartData.getFilteredRows([{column: 0, value: stateName}]) || null;
				chartData.setCell(rowToUpdate[0], 1, malePercentage);
			}

			chart.draw(chartData, chartOptions);
		}, index * 20);
	});
}

Template.landingPage.onRendered(function(){

	chartOptions = {
		region : 'US',
		resolution : 'provinces'
	};

	chartData = new google.visualization.DataTable();
	chartData.addColumn('string', 'State');
	chartData.addColumn('number', 'Male Employment');
	chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

	occupationSelect = $('.variable').val();
	yearSelect = $('.year').val();

	// google.visualization.events.addListener(chart, "regionClick", function (eventData) {

 //    	//Delete Tooltip
 //    	$(".tooltip_inner").remove();

	// 	var region = eventData["region"];
	// 	var state_key = region.slice(3, 5);
	// 	var occupation = Occupations.findOne({occupation: occupationSelect});
	// 	var occupationDataSet = _.find(occupation.dataSet, function(set){
	// 		return set.year == yearSelect;
	// 	});

	// 	console.log(found);


	// 	var malePercentage = Math.round( (parseInt(found.maleCount) / (parseInt(found.maleCount) + parseInt(found.femaleCount)) * 100) * 100) / 100;
	// 	var femalePercentage = Math.round(100 - malePercentage);
	// 	var tooltip_data = {
	// 		'found' : found,
	// 		'malePercentage': malePercentage,
	// 		'femalePercentage': femalePercentage
	// 	};

	// 	Blaze.renderWithData(Template.tooltip, tooltip_data, $("#tooltip").get(0));

	// });

   
	var instance = this;

	if (instance.data.fetch().length === 0){
		Meteor.call('init', function(error, result){
			if(error){
				console.log(error);
			} else {
				console.log(result);
				updateChart(occupationSelect, yearSelect, true);
			}
		})
	} else {
		updateChart(occupationSelect, yearSelect, true);
	}

});

Template.landingPage.events({
	'submit form': function(e){
		e.preventDefault();

		var occupationSelect = $('.variable').val();
		var yearSelect = $('.year').val();

		updateChart(occupationSelect, yearSelect, false);
	}
});