var NG_MODULE = 'MyApp'
!function () {
	angular.module(NG_MODULE, ['onsen', 'ionic']);
}();
!function () {

	function AuthService($http, $q) {
		
		var self = this;

		self.authenticate = authenticate;
		self.logout = logout;
		
		self.setUser = setUser;
		self.currentUser = null;

		function setUser(user) {
			self.currentUser = user;
		}

		function getUser() {
			return self.currentUser;
		}

		function authenticate(prop) {
			return $http.post('/api/auth', {username: prop.username, password: prop.password}).then(function (resp) {
				return resp.data;
			});	
		}

		function logout() {
			return $http.post('/api/logout').then(function (resp) {
				return resp.data;
			});	
		}

	}

	AuthService.$inject = ['$http', '$q'];
	angular.module(NG_MODULE).service('AuthService', AuthService);
}();
!function () {

	function CartService() {
		
		var self = this;
		self.items = [];

		self.q = function (item) {
			return self.items.filter(function (i) {
				return i.id == item.id;
			}).reduce(function (s, i) {
				return s+i.q;
			}, 0)
		}

		self.add = function (item) {
			var e = self.items.filter(function (i) {
				return i.id==item.id;
			});
			if (e.length == 0) {
				self.items.push({
					id: item.id,
					q: 1,
					label: item.label,
					price: item.price
				});
			}else {
				e[0].q++;
			}
		}

		self.minus = function (item) {
			var e = self.items.filter(function (i) {
				return i.id==item.id;
			});
			if (e.length == 0) {
				return;
			}else {
				e[0].q--;
				if (e[0].q<0) e[0].q = 0;
			}	
		}

		self.plus = function (item) {
			var e = self.items.filter(function (i) {
				return i.id==item.id;
			});
			console.log(e);
			if (e.length == 0) {
				return;
			}else {
				e[0].q++;
			}
		}
	}

	CartService.$inject = ['$http', '$q'];
	angular.module(NG_MODULE).service('CartService', CartService);
}();
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
						id: '123',
						label: 'something1',
						price: '41.32',
						img: 'a'
					},{
						id: '5134',
						label: 'something2',
						price: '22.32',
						img: 'a'
					},{
						id: '512312',
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
!function () {

	angular.module(NG_MODULE)

	.run([
	 'Capture',
	 '$rootScope',
	 function(Capture, $rootScope) {
		 $rootScope.$on('routeChangeSuccess', function() {
			 Capture.resetAll();
		 });
	 }
	])

	.factory('Capture', [
	 '$compile',
	 function($compile) {
		 var yielders = {};
		 return {
			 resetAll: function() {
				 for (var name in yielders) {
					if (yielders.hasOwnProperty(name)) {
						this.resetYielder(name);
					}
				 }
			 },

			 resetYielder: function(name) {
				 var b = yielders[name];
				 this.setContentFor(name, b.defaultContent, b.defaultScope);
			 },

			 putYielder: function(name, element, defaultScope, defaultContent) {
				 var yielder = {};
				 yielder.name = name;
				 yielder.element = element;
				 yielder.defaultContent = defaultContent || '';
				 yielder.defaultScope = defaultScope;
				 yielders[name] = yielder;
			 },

			 getYielder: function(name) {
				 return yielders[name];
			 },

			 removeYielder: function(name) {
				 delete yielders[name];
			 },

			 setContentFor: function(name, content, scope) {
				 var b = yielders[name];
				 if (!b) {
					 return;
				 }
				 b.element.html(content);
				 $compile(b.element.contents())(scope);
			 }

		 };
	 }
	])


	.directive('uiContentFor', [
	 'Capture',
	 function(Capture) {
		 return {
			 compile: function(tElem, tAttrs) {
				 var rawContent = tElem.html();
				 if(tAttrs.uiDuplicate === null || tAttrs.uiDuplicate === undefined) {
					 // no need to compile anything!
					 tElem.html('');
					 tElem.remove();
				 }
				 return function(scope, elem, attrs) {
					 Capture.setContentFor(attrs.uiContentFor, rawContent, scope);
				 };
			 }
		 };
	 }
	])

	.directive('uiYieldTo', [
	 '$compile', 'Capture', function($compile, Capture) {
		 return {
			 link: function(scope, element, attr) {
				 Capture.putYielder(attr.uiYieldTo, element, scope, element.html());

				 element.on('$destroy', function(){
					 Capture.removeYielder(attr.uiYieldTo);
				 });

				 scope.$on('$destroy', function(){
					 Capture.removeYielder(attr.uiYieldTo);
				 });
			 }
		 };
	 }
	]);

}();
!function () {

	function capitalize() {
		return function (input, format, separator) {
			if (!input) {
				return input;
			}
			format = format || 'all';
			separator = separator || ' ';
			if (format === 'first') {
				// Capitalize the first letter of a sentence
				var output = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
				if (separator === ' ') {
					return output;
				} else {
					return output.split(separator).join(' ');
				}
			} else {
				return input.split(separator).map(function(word) {
					if (word.length === 2 && format === 'team') {
						// Uppercase team abbreviations like FC, CD, SD
						return word.toUpperCase();
					} else {
						return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
					}
				}).join(' ');
			}
		}
	};

	angular.module(NG_MODULE).filter('capitalize', capitalize);
	
}();
!function () {

	function autoFocus($timeout) {
		return {
	        restrict: 'AC',
	        link: function(_scope, _element) {
				$timeout(function(){
					_element[0].focus();
				}, 0);
			}
		}
	}

	autoFocus.$inject = ["$timeout"];

	angular.module(NG_MODULE).directive('autoFocus', autoFocus);
	
}();
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
!function () {

	function LoginController($rootScope, $interval, Router) {
		$interval.cancel($rootScope.stopper);
		$rootScope.stopper = $interval(function () {
			if ($rootScope.carousel.getActiveCarouselItemIndex() == 2) {
				$rootScope.carousel.first();
			}else {
				$rootScope.carousel.next();
			}
		}, 3000);

		this.go = function () {
			$rootScope.registerNotification('customer');
			Router.push('categories');
		}

		this.goDelivery = function () {
			$rootScope.registerNotification('delivery');
			Router.push('map');
		}
	}

	LoginController.$inject = ['$rootScope', '$interval', 'Router']
	angular.module(NG_MODULE).controller('LoginController', LoginController);
	
}();
!function () {

	function MainController ($rootScope, $http, DBService) {
		$rootScope.registerNotification = function (type) {
			console.log(type);
			var push = new Ionic.Push({
			  "debug": true,
			  canSetBadge: true, //Can pushes update app icon badges?
				canPlaySound: true, //Can notifications play a sound?
				canRunActionsOnWake: true, //Can run actions outside the app,
				onNotification: function(notification) {
					if (type == 'delivery') {
						alert(notification._payload.name);
						alert(notification._payload.items);
					}
					// alert(notification.text);
					// alert(JSON.stringify(notification));
					return true;
				}
			});
			push.register(function(token) {
				$http.post('https://sw.loyalify.ca/reg/', {type: type, token: token.token}).then(function (resp) {
					console.log(resp);
				});
			  	console.log("Device token:",token.token);
			});
		}
	}
	MainController.$inject = ['$rootScope', '$http', 'DBService'];
	angular.module(NG_MODULE).controller('MainController', MainController);
	
}();
!function () {

	function MapController($rootScope, $timeout) {
		var self = this;
        self.map;
        self.bounds = new google.maps.LatLngBounds();
        $rootScope.customers = [
            {
                marker: {
                    lat: 45.510,
                    lng: -73.5673

                },
                order: 
                    ['adasda', 'asdasd', 'dasdasd']
                
            },{
                marker: {
                    lat: 45.5217,
                    lng: -73.5673

                },
                order: 
                    ['adasda', 'asdasd', 'dasdasd']
                
            },{
                marker: {
                    lat: 45.5020,
                    lng: -73.5673

                },
                order: 
                    ['adasda', 'asdasd', 'dasdasd']
                
            }
        ];

         $rootScope.stores = [
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

        //Map initialization  
        var latlng = new google.maps.LatLng(45.5017, -73.5673);
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.refresh = function () {
            self.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 
            self.overlay = new google.maps.OverlayView();
            //showCustomerMarkers($rootScope.customers);
            showStoreMarkers($rootScope.stores)
            self.map.fitBounds(self.bounds);

            self.overlay.draw = function() {}; // empty function required
            self.overlay.setMap(self.map);
            self.element = document.getElementById('map_canvas');
        }

        function showCustomerMarkers(markers) {
            markers.forEach(function(entry) {
                var content = entry.order.join();
                showMarker ( {
                    lat: entry.marker.lat,
                    lng: entry.marker.lng,
                    content: content
                });

                var location = new google.maps.LatLng(entry.marker.lat,  entry.marker.lng);
                self.bounds.extend(location)
            });
        }

        function showStoreMarkers(markers) {
            markers.forEach(function(entry) {
                var content = 'Nom: ' + entry.name + '<br>' 
                            + 'Heures \'Ouverture: ' + entry.hours + '<br>' 
                            + 'Telephone: ' + entry.phone + '<br>'
                            + 'Addresse: ' + entry.address +', Montreal, ' + entry.postal + '<br>';
                showMarker ( {
                    lat: entry.marker.lat,
                    lng: entry.marker.lng,
                    content: content
                });

                var location = new google.maps.LatLng(entry.marker.lat,  entry.marker.lng);
                self.bounds.extend(location)
            });
        }

        


        function showMarker (data) {
            var infowindow = new google.maps.InfoWindow({
                content: data.content
            });
            var location = {lat: data.lat, lng: data.lng};

            var marker = new google.maps.Marker({
                position: location,
                map: self.map,
            });
            marker.addListener('click', function() {
                infowindow.open(self.map, marker);
            });
            google.maps.event.addListener(self.map, "click", function(){
                infowindow.close();
            });
        }

	}
	MapController.$inject = ['$scope', '$timeout']
	angular.module(NG_MODULE).controller('MapController', MapController);
	
}();
!function () {

	function TodoController($scope, $timeout) {
		this.items = [
		  {
			title: 'Water the plants',
			done: false,
		  },
		  {
			title: 'Walk the dog',
			done: true,
		  },
		  {
			title: 'Go to the dentist',
			done: false,
		  },
		  {
			title: 'Buy milk',
			done: false,
		  },
		  {
			title: 'Play tennis',
			done: true,
		  }
		]

		this.newTodo = function() {
		  this.items.push({
			title: '',
			done: false
		  });
		}.bind(this);

		this.focusInput = function(event) {
		  $timeout(function() {
			var item = event.target.parentNode.querySelector('input[type="text"]');
			item.focus();
			item.select();
		  });
		}

		this.clearCompleted = function() {
		  this.items = this.items.filter(function(item) {
			return !item.done;
		  });
		}.bind(this);

		this.selectedItem = -1;
			
	}
	TodoController.$inject = ['$scope', '$timeout']
	angular.module(NG_MODULE).controller('TodoController', TodoController);
	
}();
!function () {

	function config ($ionicPlatform) {
	}
	config.$inject = ['$ionicPlatform'];
	angular.module(NG_MODULE).run(config);
	
}();



!function () {

	angular.module(NG_MODULE)
		.constant('VERSION', '0.0.1');

}();

!function () {

	function Router($rootScope, $timeout, AuthService) {
		var self = this;
		var stack = [];
		self.go = go;
		self.push = push;
		self.pop = pop;
		self.pops = pops;
		self.stack = stack;
		self.defaultState = 'login';
		self.states = {
			'login': {
				templateUrl: 'templates/login.html'
			},
			'categories': {
				templateUrl: 'templates/categories.html'
			},
			'items': {
				templateUrl: 'templates/items.html'
			},
			'cart': {
				templateUrl: 'templates/cart.html'
			},
			'map' : {
				templateUrl: 'templates/map.html'	
			}
		}
		
		$rootScope.menuBreakPoint = 960;

		function go (stateName, options) {
			var state = self.states[stateName];
			if (!state) throw 'State ' + stateName + ' not found!';
			$rootScope.routeOptions = options;
			stack = [options];
			$rootScope.globals.nav.resetToPage(state.templateUrl, {
				animation: 'none'
			});
			if ($rootScope.globals && $rootScope.globals.menu) $rootScope.globals.menu.close();
			if (state.fullScreen) {
				$rootScope.menuBreakPoint = 1000000;
			}else {
				$rootScope.menuBreakPoint = 960;
			}
			$rootScope.$broadcast('routeChangeSuccess');
		}

		function push (stateName, options) {
			options = options || {};
			var state = self.states[stateName];
			if (!state) throw 'State ' + stateName + ' not found!';
			stack.push($rootScope.routeOptions);
			$rootScope.routeOptions = options;
			$rootScope.globals.nav.pushPage(state.templateUrl);
			if ($rootScope.globals && $rootScope.globals.menu) $rootScope.globals.menu.close();
			if (state.fullScreen) {
				$rootScope.menuBreakPoint = 1000000;
			}else {
				$rootScope.menuBreakPoint = 960;
			}
			$rootScope.$broadcast('routeChangeSuccess');
		}

		function pop() {
			$rootScope.globals.nav.popPage({refresh: true});
		}

		function pops(n) {
			n--;
			while(n-- && $rootScope.globals.nav.getPages().length > 2) {
				$rootScope.globals.nav.getPages()[$rootScope.globals.nav.getPages().length-2].destroy();
				stack.pop();
			}
			pop();
		}

		this.getDefaultState = function () {
			return self.defaultState;
		}

		this.prePop = function () {
			var options = stack.pop();
			$rootScope.routeOptions = options;
		}

	}

	Router.$inject = ['$rootScope', '$timeout', 'AuthService'];
	angular.module(NG_MODULE)
		.service('Router', Router)
		.run(['Router', '$timeout', '$rootScope', function (Router, $timeout, $rootScope) {
			$timeout(function () {
				$rootScope.globals.nav.on('prepop', Router.prePop);
				Router.go(Router.getDefaultState());
			}, 0);
		}])
}();