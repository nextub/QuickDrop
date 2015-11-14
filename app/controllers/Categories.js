!function () {

	function CatController(Router, DBService) {
		this.items = DBService.categories();
		// console.log(items);
		this.select = function (id) {
			Router.push('items', {
				id: id
			});
		}

	}
	CatController.$inject = ['Router', 'DBService']
	angular.module(NG_MODULE).controller('CatController', CatController);
	
}();