!function () {

	function ConfirmController(Router, DBService, CartService, $http) {
		var self = this;
		CartService.items = [];

	}
	ConfirmController.$inject = ['Router', 'DBService', 'CartService', '$http']
	angular.module(NG_MODULE).controller('ConfirmController', ConfirmController);
	
}();