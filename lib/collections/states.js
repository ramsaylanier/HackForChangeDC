States = new Mongo.Collection('states');

Meteor.methods({
	'updateState': function(state, result){

		var malekey = Object.keys(result.data[0])[1];
		var femalekey = Object.keys(result.data[0])[0];

		console.log("male " + malekey);
		console.log("female " + femalekey);

		var maleCount = result.data[0][malekey];
		var femaleCount = result.data[0][femalekey];

		console.log("maleCount:  " + maleCount);
		console.log("femaleCount " + femaleCount);

		States.update({_id: state._id}, {$set: {maleCount: maleCount, femaleCount: femaleCount}});
	}
})