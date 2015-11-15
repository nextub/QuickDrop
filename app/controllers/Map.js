!function () {

	function MapController($rootScope, $timeout) {
		var self = this;
        self.map;

        $rootScope.markers = [
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
            showCustormerMarkers($rootScope.markers);
            self.overlay.draw = function() {}; // empty function required
            self.overlay.setMap(self.map);
            self.element = document.getElementById('map_canvas');
        }

        function showCustormerMarkers(markers) {
            markers.forEach(function(entry) {
                var content = entry.order.join();
                showMarker ( {
                    lat: entry.marker.lat,
                    lng: entry.marker.lng,
                    content: content
                });
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