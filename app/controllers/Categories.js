!function () {

	function CatController(Router, DBService, CartService) {
		this.items = DBService.categories();
		this.cart = CartService;
		// console.log(items);
		this.select = function (id) {
			Router.push('items', {
				id: id
			});
		}

		this.goCart = function () {
			Router.push('cart');
		}

	}
	CatController.$inject = ['Router', 'DBService', 'CartService']
	angular.module(NG_MODULE).controller('CatController', CatController);
	
}();