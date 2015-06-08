Router.configure({
	layoutTemplate: 'layout'
})

Router.route('/', {
	waitOn: function(){
		return Meteor.subscribe('occupations');
	},
	data: function(){
		return Occupations.find();
	},
	action: function(){
		this.render('landingPage');
	}
})