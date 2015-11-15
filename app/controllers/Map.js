!function () {

	function MapController($rootScope, DBService, $timeout) {
		var self = this;
        self.map;
        self.bounds = new google.maps.LatLngBounds();
  
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
            showCustomerMarkers(DBService.getCustomers());
            showStoreMarkers(DBService.getStores());
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
                    content: content,
                    pinColor: "FE7569"
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
                    content: content,
                    pinColor: "1364CF"

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
            

            var pinColor = data.pinColor;
            var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                new google.maps.Size(21, 34),
                new google.maps.Point(0,0),
                new google.maps.Point(10, 34));
            var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                new google.maps.Size(40, 37),
                new google.maps.Point(0, 0),
                new google.maps.Point(12, 35));

            var marker = new google.maps.Marker({
                position: location,
                map: self.map,
                icon: pinImage,
                shadow: pinShadow

            });
            marker.addListener('click', function() {
                infowindow.open(self.map, marker);
            });
            google.maps.event.addListener(self.map, "click", function(){
                infowindow.close();
            });
        }

	}
	MapController.$inject = ['$scope', 'DBService', '$timeout']
	angular.module(NG_MODULE).controller('MapController', MapController);
	
}();