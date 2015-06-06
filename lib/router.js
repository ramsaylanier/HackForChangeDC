Router.configure({
	layoutTemplate: 'layout'
})

Router.route('/', {
	action: function(){
		this.render('landingPage');
	}
})