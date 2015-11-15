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
		this.count = function (item) {
			var n = 0;
			for (var i=0;i<item.items.length;i++) n+= item.items[i].q;
			return n;
		}

	}
	OrderController.$inject = ['Router', 'DBService']
	angular.module(NG_MODULE).controller('OrderController', OrderController);
	
}();