Occupations = new Mongo.Collection('occupations');

Meteor.methods({
	init: function(){
		var sdk = new CitySDK();
	    censusModule = sdk.modules.census;

	    censusModule.enable('2feec6484a8224db2e0cbbf46484ae013ec08111');

		var occupations = [
	 		'_computer_engineering_and_science_occupations',
	 		'_computer_and_mathematical_occupations',
	 		'_architecture_and_engineering_occupations',
	 		'_arts_design_entertainment_sports_and_media_occupations',
	 		'_law_enforcement_workers_including_supervisors'
	 	];

	 	var years = [
	 		'2011',
	 		'2012',
	 		'2013'
	 	]

		_.each(occupations, function(occupation, index){
			var occupationId = Occupations.insert({occupation: occupation});

			_.each(years, function(year){

				var thisYear = year;

				var request = {
				'level': 'us',
				'sublevel': 'true',
				'year': thisYear,
					variables: [
						'employment_female' + occupation,
						'employment_male' + occupation
					]
				}

				censusModule.APIRequest(request, function(result,error){
					console.log(result);
					if (error){
						console.log(error);
					} else {
						var dataSet = {
							year: thisYear,
							data: result.data
						}
						Occupations.upsert({_id: occupationId}, {$set: {occupation: occupation}, $push: {dataSet: dataSet}});	
					}
				});
			});
		});
	}
})