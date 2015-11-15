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