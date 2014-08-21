/* global google:true */

var map;

(function(){
  'use strict';

  $(document).ready(function(){
    var pos = getPositions();
    initMap(pos.lat, pos.lng, 7);
    addMarker(pos.lat, pos.lng, pos.name);
    $('form').submit(findTreasure);
  });

  function findTreasure(e){
    $('form').submit();
    e.preventDefault();
  }

  function addMarker(lat, lng, name){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.DROP});
  }

  function getPositions(){
    var $treasure = $('#treasure'),
        name = $treasure.attr('data-name'),
        lat  = $treasure.attr('data-lat'),
        lng  = $treasure.attr('data-lng'),
        pos  = {name:name, lat:parseFloat(lat), lng:parseFloat(lng)};
    return(pos);
  }

  function initMap(lat, lng, zoom){
    var styles = [{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#b5cbe4'}]},{'featureType':'landscape','stylers':[{'color':'#efefef'}]},{'featureType':'road.highway','elementType':'geometry','stylers':[{'color':'#83a5b0'}]},{'featureType':'road.arterial','elementType':'geometry','stylers':[{'color':'#bdcdd3'}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#ffffff'}]},{'featureType':'poi.park','elementType':'geometry','stylers':[{'color':'#e3eed3'}]},{'featureType':'administrative','stylers':[{'visibility':'on'},{'lightness':33}]},{'featureType':'road'},{'featureType':'poi.park','elementType':'labels','stylers':[{'visibility':'on'},{'lightness':20}]},{},{'featureType':'road','stylers':[{'lightness':20}]}],
        mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles:styles};
    map = new google.maps.Map(document.getElementById('map-small'), mapOptions);
  }

})();

