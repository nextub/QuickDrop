!function () {

	function config ($ionicPlatform) {
		var push = new Ionic.Push({
		  "debug": true,
		  canSetBadge: true, //Can pushes update app icon badges?
			canPlaySound: true, //Can notifications play a sound?
			canRunActionsOnWake: true, //Can run actions outside the app,
			onNotification: function(notification) {
				// Handle new push notifications here
				console.log(JSON.stringify(notification));
				return true;
			}
		});
		push.register(function(token) {
		  console.log("Device token:",token.token);
		});
	}
	config.$inject = ['$ionicPlatform'];
	angular.module(NG_MODULE).run(config);
	
}();


