!function () {

	function Router($rootScope, $timeout, AuthService) {
		var self = this;
		var stack = [];
		self.go = go;
		self.push = push;
		self.pop = pop;
		self.pops = pops;
		self.stack = stack;
		self.defaultState = 'orders';
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
			'orders': {
				templateUrl: 'templates/orders.html'
			},
			'orderItems': {
				templateUrl: 'templates/orderitems.html'
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