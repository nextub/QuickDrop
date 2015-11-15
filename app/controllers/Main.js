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
								name: 'Amir',
								items: [
									{
										label: 'Lay\'s original',
										price: '3.49',
										q: 1
									},
									{
										label: 'Doritos Cheese',
										price: '3,99',
										q: 4
									},
									{
										id: '5134',
										label: 'Corona Extra (6 pack)',
										price: '12.99',
										q: 1
									}
								]
							}
						}
						var htmlItems = notification._payload.items.map(function (i) {
							return "Item: <strong>"+i.label+"</strong> &times; " + i.q + " @ " + i.price;
						}).join("<br />");
						ons.notification.confirm({
							messageHTML: '<div class="cimage"></div><h3 class="notification-h3">From Amir</h3><p style="text-align: justify; font-size:13px;">I need a few items:<br />'+htmlItems+'</p>',
							title: 'New Delivery Request',
							buttonLabels: ['reject', 'accept'],
							animation: 'default', // or 'none'
							primaryButtonIndex: 1,
							cancelable: true,
							callback: function(index) {
								if (index == 1) {
									console.log(notification._payload);
									DBService.orders.push({name: notification._payload.name, items: notification._payload.items, time: '13:28'});
									DBService.customers.push({marker: {lat: 45.510, lng: -73.5673}, order: [htmlItems]});	
									$http.post('https://sw.loyalify.ca/notify', {
										who: 'customer',
										msg: {
											title: 'Order accepted by Afshin!',
											data: {
												name: 'Afshin'
											}
										}
									})
								}
								
							}
						});
					}else {
						if (notification._payload==null) {
							notification._payload = {name: 'Afshin'};
						}
						ons.notification.confirm({
							messageHTML: '<div class="cimage"></div><h3 class="notification-h3">Accepted</h3><p style="text-align: justify; font-size:13px;">Wait for your orders and relax! By' + notification._payload.name + '</p>',
							title: 'Order Accepted!',
							buttonLabels: ['Good!'],
							animation: 'default', // or 'none'
							primaryButtonIndex: 0,
							cancelable: true,
							callback: function(index) {
								
							}
						});
					}
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