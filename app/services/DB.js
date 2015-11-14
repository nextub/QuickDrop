!function () {

	function DBService($http, $q) {
		
		var self = this;

		var db = [
			{
				label: 'Alcool',
				icon: 'icon-vin',
				id: 1,
				items: [
					{
						label: 'something1',
						price: '41.32',
						img: 'a'
					},{
						label: 'something2',
						price: '22.32',
						img: 'a'
					},{
						label: 'something3',
						price: '11.32',
						img: 'a'
					}
				]
			},
			{
				label: 'Tabac',
				icon: 'icon-tabac',
				id: 2,
				items: [
					{
						label: 'something',
						price: '41.32',
						img: 'a'
					},{
						label: 'something',
						price: '41.32',
						img: 'a'
					},{
						label: 'something',
						price: '41.32',
						img: 'a'
					}
				]
			},
			{
				label: 'Boisson',
				icon: 'icon-boisson',
				id: 3,
				items: [
					{
						label: 'something',
						price: '41.32',
						img: 'a'
					},{
						label: 'something',
						price: '41.32',
						img: 'a'
					},{
						label: 'something',
						price: '41.32',
						img: 'a'
					}
				]
			},
			{
				label: 'Confiserie',
				icon: 'icon-bonbon',
				id: 4,
				items: [
					{
						label: 'something',
						price: '41.32',
						img: 'a'
					},{
						label: 'something',
						price: '41.32',
						img: 'a'
					},{
						label: 'something',
						price: '41.32',
						img: 'a'
					}
				]
			},
			{
				label: 'Croustilles',
				icon: 'icon-croustille',
				id: 5,
				items: [
					{
						label: 'something',
						price: '41.32',
						img: 'a'
					},{
						label: 'something',
						price: '41.32',
						img: 'a'
					},{
						label: 'something',
						price: '41.32',
						img: 'a'
					}
				]
			},
			{
				label: 'Prêt à manger',
				icon: 'icon-pret',
				id: 6,
				items: [
					{
						label: 'something',
						price: '41.32',
						img: 'a'
					},{
						label: 'something',
						price: '41.32',
						img: 'a'
					},{
						label: 'something',
						price: '41.32',
						img: 'a'
					}
				]
			},
			{
				label: 'Épicerie',
				icon: 'icon-dot-3',
				id: 7,
				items: [
					{
						label: 'something',
						price: '41.32',
						img: 'a'
					},{
						label: 'something',
						price: '41.32',
						img: 'a'
					},{
						label: 'something',
						price: '41.32',
						img: 'a'
					}
				]
			}];

		self.categories = function () {
			return db;
		}
		self.items = function (id) {
			return db.filter(function (i) {
				return i.id == id;
			})[0].items;
		}
	}

	DBService.$inject = ['$http', '$q'];
	angular.module(NG_MODULE).service('DBService', DBService);
}();