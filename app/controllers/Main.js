!function () {

	function MainController ($rootScope, $http) {
		$rootScope.registerNotification = function (type) {
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
				$http.post('https://loyalify.ca:4000/reg/', {type: type, token: token.token});
			  	console.log("Device token:",token.token);
			});
		}
	}
	MainController.$inject = ['$rootScope', '$http'];
	angular.module(NG_MODULE).controller('MainController', MainController);
	
}();