Meteor.publish('occupations', function(){
	return Occupations.find();
})