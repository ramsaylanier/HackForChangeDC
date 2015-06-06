Meteor.startup(function(){
	var sdk = new CitySDK();
    var censusModule = sdk.modules.census;

    censusModule.enable('2feec6484a8224db2e0cbbf46484ae013ec08111');
})