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
						console.log(notification);
						if (notification._payload == null) {
							notification._payload = {
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
							}
						}
						var htmlItems = notification._payload.items.map(function (i) {
							return "Item: <strong>"+i.label+"</strong> &times; " + i.q + " @ " + i.price;
						}).join("<br />");
						ons.notification.confirm({
							messageHTML: '<div class="cimage"></div><h3 class="notification-h3">From Amir</h3><p style="text-align: justify; font-size:13px;">I need a few items:</p>'+htmlItems,
							title: 'New Delivery Request',
							buttonLabels: ['reject', 'accept'],
							animation: 'default', // or 'none'
							primaryButtonIndex: 1,
							cancelable: true,
							callback: function(index) {
								if (index == 1) {
									self.consent = true;
									self.register();
								}
								DBService.orders.push({name: notification._payload.name, items: notification._payload.items, time: '13:28'});
							}
						});
					};
					return true;
				}
				// alert(notification.text);
				// alert(JSON.stringify(notification));
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