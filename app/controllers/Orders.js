!function () {

	function OrderController(Router, DBService) {
		
		this.select = function (name) {
			Router.push('orderItems', {
				name: name
			});
		}

		this.getItems = function () { 
			return DBService.getOrders();
		}
		this.goToMap = function () {
			Router.push('map');
		}

	}
	OrderController.$inject = ['Router', 'DBService']
	angular.module(NG_MODULE).controller('OrderController', OrderController);
	
}();