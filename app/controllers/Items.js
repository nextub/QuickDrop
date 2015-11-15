!function () {

	function ItemsController($rootScope, Router, DBService, CartService) {
		this.items = DBService.items($rootScope.routeOptions.id);
		this.cart = CartService;

		this.select = function (item) {
			this.cart.add(item);
		}

		this.goCart = function () {
			Router.push('cart');
		}

	}
	ItemsController.$inject = ['$rootScope', 'Router', 'DBService', 'CartService']
	angular.module(NG_MODULE).controller('ItemsController', ItemsController);
	
}();