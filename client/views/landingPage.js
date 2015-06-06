Template.landingPage.events({
	'submit form': function(e){
		e.preventDefault();
		$('.submit-btn').val('loading');
		$('.submit-btn').addClass('loading');

		var states = States.find().fetch();
		var selectVal = $('.variable').val();
		var selectYear = $('.year').val();
		var maleVariable = 'employment_male' + selectVal;
		var femaleVariable = 'employment_female' + selectVal;
		var variables = [
			femaleVariable,
			maleVariable
		]

		_.each(states, function(state, index){
			var request = {
				'state': state.state,
				'level': 'state',
				'year': selectYear,
				variables: variables
			}

			Meteor.setTimeout(function(){
				censusModule.APIRequest(request, function(result,error){
					if (error){
						console.log(error);
					} else {
						Meteor.call('updateState', state, result, function(error, res){
							if (error){
								alert(error)
							} else {
								var stateName = 'US-' + state.state;
								var maleCount = result.data[0][maleVariable];
								var femaleCount = result.data[0][femaleVariable];
								var total =  parseInt(femaleCount) + parseInt(maleCount);
								var malePercentage = Math.round( (maleCount / total * 100) * 100) / 100;


								var rowToUpdate = chartData.getFilteredRows([{column: 0, value: stateName}]);
								chartData.setCell(rowToUpdate[0], 1, malePercentage);
								chart.draw(chartData, options);

								if (index == 50){
									$('.submit-btn').val('Submit');
									$('.submit-btn').removeClass('loading');
								}
							}
						});	
					}
				});
			}, index * 50);	
		});
	}
})

Template.landingPage.helpers({
	'states': function(){
		return States.find();
	}
})