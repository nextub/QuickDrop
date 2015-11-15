!function () {

	function CartController(Router, DBService, CartService) {
		var self = this;
		self.items = CartService.items;

		self.getTotal = function () {
			return self.items.reduce(function (s, e) {
				return s+e.q*e.price;
			}, 0);
		};

		self.pay = function () {
			alert('Paying with paypal');
		}
		self.minus = function (item) {
			console.log("asd");
			console.log(item);
			CartService.minus(item);
		}
		self.plus = function (item) {
			console.log(item);
			CartService.plus(item);
		}

	}
	CartController.$inject = ['Router', 'DBService', 'CartService']
	angular.module(NG_MODULE).controller('CartController', CartController);
	
}();