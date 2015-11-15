!function () {

	function DBService($http, $q) {
		
		var self = this;

		self.stores = [
            { marker: { lat: 45.54631, lng:-73.57956}, name: 'DEPANNEUR DANDURAND', phone: '(514) 722-1655', address: '2600 RUE DANDURAND ', postal: 'H1Y 1S5', hours: 'Ouvert aujourd\'hui 6h - 22h'},
            { marker: { lat: 45.54899, lng:-73.57809}, name: 'DEPANNEUR XIN XIN', phone: '(514) 728-8827', address: '2891 RUE DANDURAND', postal: 'H1Y 1T4', hours: 'Ouvert aujourd\'hui 6h - 22h'},
            { marker: { lat: 45.54412, lng:-73.57752}, name: 'MAXI', phone: '(514) 527-2413', address: '2535 MASSON ', postal: 'H1Y 1V7', hours: 'Ouvert aujourd\'hui 6h - 22h'},
            { marker: { lat: 45.54382, lng:-73.57723}, name: 'SHELL ', phone: '(514) 523-6904', address: '2544 MASSON ', postal: 'H1Y 1V8', hours: 'Ouvert aujourd\'hui 6h - 22h'},
            { marker: { lat: 45.54548, lng:-73.5767 }, name: 'PROVI-SOIR #5026 /  9300-5957 QC IN', phone: '(514) 721-5931', address: '2605 RUE MASSON ', postal: 'H1Y 1W1', hours: 'Ouvert aujourd\'hui 6h - 22h'},
            { marker: { lat: 45.54765, lng:-73.57497}, name: 'TAB. MASSON - 6EME AVENUE', phone: '(514) 722-7530', address: '2856 RUE MASSON ', postal: 'H1Y 1W9', hours: 'Ouvert aujourd\'hui 6h - 22h'},
            { marker: { lat: 45.54869, lng:-73.57414}, name: 'COUCHE-TARD #321', phone: '(514) 374-2158', address: '3000 MASSON ', postal: 'H1Y 1X6', hours: 'Ouvert 24h / 24h '},
            { marker: { lat: 45.54991, lng:-73.57382}, name: 'TABAGIE IMPERIAL', phone: '(514) 727-3003', address: '3159 MASSON ', postal: 'H1Y 1Y2', hours: 'Ouvert aujourd\'hui 6h - 22h'},
            { marker: { lat: 45.54544, lng:-73.57239}, name: 'DEPANNEUR KIATOU', phone: '(514) 527-9966', address: '2700 LAURIER EST', postal: 'H1Y 1Y7', hours: 'Ouvert aujourd\'hui 6h - 22h'},
            { marker: { lat: 45.54765, lng:-73.57822}, name: 'DEPANNEUR MAI', phone: '(514) 722-2853', address: '5582 4E AVENUE RSMT ', postal: 'H1Y 2V6', hours: 'Ouvert aujourd\'hui 6h - 22h'}
        ];

         self.customers = [
            {
                marker: {
                    lat: 45.510,
                    lng: -73.5673

                },
                order: 
                    ['aaaa', 'asdasd', 'dasdasd']
                
            }
        ];

        self.getStores = function() {
        	return self.stores;
        }

		self.orders = [
			{
				name: 'Afshin', 
				time: '13:42',
				items: [
					{
						label: 'something1',
						price: '41.32',
						q: 1
					},{
						label: 'something2',
						price: '22.32',
						q: 1
					},{
						label: 'something3',
						price: '11.32',
						q: '2'
					}
				]
			}, {
				name: 'John', 
				time: '13:46', 
				items: [
					{
						label: 'something1',
						price: '41.32',
						q: 1
					},{
						label: 'something2',
						price: '22.32',
						q: 1
					},{
						label: 'something3',
						price: '11.32',
						q: '2'
					}
				]
			}];

		var db = [
			{
				label: 'Alcool',
				icon: 'icon-vin',
				id: 1,
				items: [
					{
						id: '123',
						label: 'Budweiser (1,18L)',
						price: '6.99',
						img: 'a'
					},{
						id: '5134',
						label: 'Corona Extra (6 pack)',
						price: '12.99',
						img: 'a'
					},{
						id: '512312',
						label: 'Boréale Blonde (6 pack)',
						price: '11.99',
						img: 'a'
					},{
						id: '512312',
						label: 'Labatt Bleue (12 pack)',
						price: '20.99',
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
						label: 'V8 Original',
						price: '2.39',
						img: 'a'
					},{
						label: 'Coca-Cola Classique 500ml',
						price: '1.99',
						img: 'a'
					},{
						label: 'Pepsi 2L',
						price: '2.99',
						img: 'a'
					}
				]
			},
			{
				label: 'Confiserie',
				icon: 'icon-bonbon',
				id: 4,
				
			},
			{
				label: 'Croustilles',
				icon: 'icon-croustille',
				id: 5,
				items: [
					{
						label: 'Lay\'s original',
						price: '3.49',
						img: 'a'
					},{
						label: 'Miss Vickies Original',
						price: '4.19',
						img: 'a'
					},{
						label: 'Doritos Cheese',
						price: '3,99',
						img: 'a'
					}
				]
			},
			{
				label: 'Prêt à manger',
				icon: 'icon-pret',
				id: 6,
				items: [
					
				]
			},
			{
				label: 'Épicerie',
				icon: 'icon-dot-3',
				id: 7,
				items: [
					
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

		self.getOrders = function () {
			
			return self.orders;
		}
		self.getOrderItems = function (name) {
			return self.orders.filter(function (i) {
				return i.name == name;
			})[0].items;
		}
	}

	DBService.$inject = ['$http', '$q'];
	angular.module(NG_MODULE).service('DBService', DBService);
}();