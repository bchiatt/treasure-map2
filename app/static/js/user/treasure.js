/* global google:true, _:true */

(function(){
  'use strict';

  var map,
      directionsDisplay;

  $(document).ready(function(){
    directionsDisplay = new google.maps.DirectionsRenderer();
    initMap(39.8282, -98.5795, 3);
    directionsDisplay.setMap(map);
    var positions = getPositions(),
        locations = getLocations();
    positions.forEach(function(pos){
      addMarker(pos.lat, pos.lng, pos.name);
    });
    calcRoute(locations);
  });

  function calcRoute(locs){
    var directionsService = new google.maps.DirectionsService(),
        start             = _.min(locs, 'order'),
        end               = _.max(locs, 'order'),
        waypts            = _.cloneDeep(locs);

    _.remove(waypts, function(point){
      return point.order === start.order;
    });

    _.remove(waypts, function(point){
      return point.order === end.order;
    });

    waypts.sort(function(a, b){
      return a.order - b.order;
    });

    waypts = waypts.map(function(p){
      return {location:p.name, stopover:true};
    });

    var request = {
      origin: start.name,
      destination: end.name,
      waypoints: waypts,
      optimizeWaypoints: false,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status){
      if (status === google.maps.DirectionsStatus.OK){
        directionsDisplay.setDirections(response);
      }
    });
  }

  function getLocations(){
    var locations = $('table tbody tr').toArray().map(function(o){
      var loc = {};
      loc.name = $(o).attr('data-name');
      loc.lat = parseFloat($(o).attr('data-lat'));
      loc.lng = parseFloat($(o).attr('data-lng'));
      loc.order = parseInt($(o).attr('data-order'));

      return loc;
    });

    return locations;

  }


  function addMarker(lat, lng, name){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.DROP});
  }

  function getPositions(){
    var positions = $('table tbody tr').toArray().map(function(tr){
      var name = $(tr).attr('data-name'),
          lat  = $(tr).attr('data-lat'),
          lng  = $(tr).attr('data-lng'),
          pos  = {name:name, lat:parseFloat(lat), lng:parseFloat(lng)};
      return(pos);
    });

    return positions;
  }

  function initMap(lat, lng, zoom){
    var styles = [{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#b5cbe4'}]},{'featureType':'landscape','stylers':[{'color':'#efefef'}]},{'featureType':'road.highway','elementType':'geometry','stylers':[{'color':'#83a5b0'}]},{'featureType':'road.arterial','elementType':'geometry','stylers':[{'color':'#bdcdd3'}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#ffffff'}]},{'featureType':'poi.park','elementType':'geometry','stylers':[{'color':'#e3eed3'}]},{'featureType':'administrative','stylers':[{'visibility':'on'},{'lightness':33}]},{'featureType':'road'},{'featureType':'poi.park','elementType':'labels','stylers':[{'visibility':'on'},{'lightness':20}]},{},{'featureType':'road','stylers':[{'lightness':20}]}],
        mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles:styles};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

})();
