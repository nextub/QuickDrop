!function () {

	function MapController($scope, $timeout) {
		$scope.map;
        $scope.markers = [];
        $scope.markerId = 1;

        //Map initialization  
        $timeout(function(){

            var latlng = new google.maps.LatLng(45.5017, -73.5673);
            var myOptions = {
                zoom: 15,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            $scope.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 
            $scope.overlay = new google.maps.OverlayView();
            $scope.overlay.draw = function() {}; // empty function required
            $scope.overlay.setMap($scope.map);
            $scope.element = document.getElementById('map_canvas');

        },100);

	}
	MapController.$inject = ['$scope', '$timeout']
	angular.module(NG_MODULE).controller('MapController', MapController);
	
}();