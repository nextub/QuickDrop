!function () {

	function ItemsController($rootScope, Router, DBService) {
		this.items = DBService.items($rootScope.routeOptions.id);
		console.log(this.items);
		// console.log(items);
		this.select = function (item) {
			console.log(item);
		}

	}
	ItemsController.$inject = ['$rootScope', 'Router', 'DBService']
	angular.module(NG_MODULE).controller('ItemsController', ItemsController);
	
}();