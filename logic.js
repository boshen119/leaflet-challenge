// store API as URL
var quakeURL = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// +
// "2020-04-08&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// `http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson
// &starttime=2014-01-01&endtime=2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337`;

// Get request to query URL
d3.json(quakeURL, function(data) { 
  console.log("hello world");
  createFeatures(data.features);
  console.log(data)

  function createFeatures(earthquakeData){


  // Creating marker
  function onEachFeature(feature, layer){
    L.circleMarker(feature.geometry.coordinates)
    
    // (`<h3>${feature.geometry.coordinates}</h3><hr><p>${new Magnitude(feature.properties.mag)}</p>`)
  }
    // var earthquakes = L.geoJSON(data, {
      // pointToLayer: function(data, latlng){
      //   console.log(latlng)
      //   return L.circleMarker(latlng)
      // }
    // })
  }
    var earthquakes = new L.LayerGroup()

    createMap(earthquakes);

    L.geoJSON(data, {
      pointToLayer: function(data, latlng){
        console.log(latlng)
        return L.circleMarker(latlng)
    }}).addTo(earthquakes)
});


function createMap(earthquakes) {
  // Define streetmap layer
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
  };

  var overlayMap = {
    EarthQuakes: earthquakes
  }


var myMap = L.map("map", {
    center: [37.339591851359174, -121.91802978515625],
    zoom: 5
  });

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);


  L.control.layers(baseMaps, overlayMap, {
    collapsed: false
  }).addTo(myMap);

}