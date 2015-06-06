Template.landingPage.events({
	'submit form': function(e){
		e.preventDefault();

		var state = $('.state-name').val();
		var level = $('.level').val();
		var request = {
			'state': state,
			'level': level,
			variables: [
				'employment_female_computer_engineering_and_science_occupations',
				'employment_male_computer_engineering_and_science_occupations'
			]
		}

		censusModule.APIRequest(request, function(result,error){
			if (error){
				alert(error)
			} else {
				console.log(result);
			}
		});
	},
	'click .load-data-btn': function(){
		var states = States.find().fetch();

		_.each(states, function(state, index){
			var request = {
			'state': state.state,
			'level': 'state',
				variables: [
					'employment_female_computer_engineering_and_science_occupations',
					'employment_male_computer_engineering_and_science_occupations'
				]
			}

			Meteor.setTimeout(function(){
				censusModule.APIRequest(request, function(result,error){
					if (error){
						console.log(error);
					} else {
						console.log(state);
						Meteor.call('updateState', state, result, function(error, res){
							if (error){
								alert(error)
							} else {
								console.log(states + ' YAY!');
							}
						});	
					}
				});
			}, index * 300);	

		});
	}
})