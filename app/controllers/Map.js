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
            {
                marker: {
                    lat: 45.510,
                    lng: -73.5683

                },
                order: 
                    ['adasda', 'asdasd', 'dasdasd']
                
            },{
                marker: {
                    lat: 45.5217,
                    lng: -73.5683

                },
                order: 
                    ['adasda', 'asdasd', 'dasdasd']
                
            },{
                marker: {
                    lat: 45.5020,
                    lng: -73.5683

                },
                order: 
                    ['adasda', 'asdasd', 'dasdasd']
                
            }
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
            showMarkers($rootScope.customers);
            showMarkers($rootScope.stores)
            self.map.fitBounds(self.bounds);

            self.overlay.draw = function() {}; // empty function required
            self.overlay.setMap(self.map);
            self.element = document.getElementById('map_canvas');
        }

        function showMarkers(markers) {
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
        }

	}
	MapController.$inject = ['$scope', '$timeout']
	angular.module(NG_MODULE).controller('MapController', MapController);
	
}();