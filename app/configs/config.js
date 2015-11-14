!function () {

	function config ($ionicPlatform) {
		// var push = new Ionic.Push({
	 //      "debug": true
	 //    });

	 //    push.register(function(token) {
	 //      console.log("Device token:",token.token);
	 //    });
	}
	config.$inject = ['$ionicPlatform'];
	angular.module(NG_MODULE).run(config);
	
}();


