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