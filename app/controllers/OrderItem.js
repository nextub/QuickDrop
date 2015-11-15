!function () {

	function OrderItemsController($rootScope, Router, DBService, CartService) {
		

		this.getOrderItems = function () { 
			return DBService.getOrderItems($rootScope.routeOptions.name);
		}


		this.goToMap = function () {
			Router.push('map');
		}

	}
	OrderItemsController.$inject = ['$rootScope', 'Router', 'DBService', 'CartService']
	angular.module(NG_MODULE).controller('OrderItemsController', OrderItemsController);
	
}();