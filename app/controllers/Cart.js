!function () {

	function CartController(Router, DBService, CartService, $http) {
		var self = this;
		self.items = CartService.items;

		self.getTotal = function () {
			return self.items.reduce(function (s, e) {
				return s+e.q*e.price;
			}, 0);
		};

		self.pay = function () {
			$http.post('https://sw.loyalify.ca/notify', {
				who: 'delivery',
				msg: {
					title: 'New delivery request from Amir!',
					data: {
						name: 'Amir',
						items: self.items
					}
				}
			})
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
	CartController.$inject = ['Router', 'DBService', 'CartService', '$http']
	angular.module(NG_MODULE).controller('CartController', CartController);
	
}();