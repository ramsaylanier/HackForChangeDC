Meteor.startup(function(){
	var sdk = new CitySDK();
    censusModule = sdk.modules.census;

    censusModule.enable('2feec6484a8224db2e0cbbf46484ae013ec08111');

 //    var states = ["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"];

	// if (Results.find().count() == 0){
	// 	_.each(states, function(state, index){

	// 		var request = {
	// 		'state': state,
	// 		'level': 'state',
	// 			variables: [
	// 				'employment_female_computer_engineering_and_science_occupations',
	// 				'employment_male_computer_engineering_and_science_occupations'
	// 			]
	// 		}

	// 		Meteor.setTimeout(function(){
	// 			censusModule.APIRequest(request, function(result,error){
	// 				if (error){
	// 					console.log(error);
	// 				} else {
	// 					console.log(state);
	// 					console.log(result);
	// 					Results.insert({state: state, result: result.data});	
	// 				}
	// 			});
	// 		}, index * 1000);
	// 	})
	// }
})