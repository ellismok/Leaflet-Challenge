// We create the tile layers that will be the selectable backgrounds of our map.
console.log("Reading in");
// Create a L.tilelayer() using the 'mapbox/light-v10' map id
var grayMap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  }
);

// Create a L.tilelayer() using the 'mapbox/satellite-v9' map id
var satelliteMap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
  }
);


// Create a L.tilelayer() using the 'mapbox/satellite-v9' map id
var outdoorsMap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
  }
);

// Create a L.map(), reference the 'mapid' element in the HTML page, and pass in the three layers above
var allMaps = L.map("mapid", {
  center: [
    51.505, -0.09
  ],
  zoom: 2,
  layers: [grayMap, satelliteMap, outdoorsMap]
});

// Adding our 'graymap' tile layer to the map.
grayMap.addTo(allMaps);

// We create the layers for our two different sets of data, earthquakes and
// tectonicplates.
var tectonicPlates = new L.LayerGroup();
var earthquakes = new L.LayerGroup();

// Defining an object that contains all of our different map choices. Only one
// of these maps will be visible at a time!
// Create a basemaps object for the three tileLayers from above. 
// The key should be a human readable name for the tile layer, and the value should be a tileLayer variable
var baseMaps = {
  "Gray Map": grayMap,
  "Satellite Map" : satelliteMap,
  "Outdoors Map": outdoorsMap,
};

// We define an object that contains all of our overlays. Any combination of
// these overlays may be visible at the same time!

// Create a overlays object for the two LayerGroups from above. 
// The key should be a human readable name for the layer group, and the value should be a LayerGroup variable
var overlayMaps = {
  "Tectonic Plates": tectonicPlates,
  Earthquakes: earthquakes
};

// Add a L.control.layers() object and pass in the baseMaps and overlayMaps, and then .addTo myMap
L.control
  .layers(baseMaps, overlayMaps)
  .addTo(allMaps);






// Use d3.json() to call the API endpoint for earthquake geoJSON data, 
// .then() fire off an anonymous function that takes a single argument `data`.
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

d3.json(url).then(function(data) {
  var earthquakeData = data.features;
  // console.log(earthquakeData)
}

// This function determines the color of the marker based on the magnitude of the earthquake.
function getColor(intensity) {
  switch (true) {
  case intensity > 90:
    return "#b71212"; // changing the colors to a spectrum of dark red to light red
  case intensity > 70:
    return "#e61717";
  case intensity > 50:
    return "#ea2c2c";
  case intensity > 30:
    return "#ec4343";
  case intensity > 10:
    return "#ef5a5a";
  default:
    return "#f17272";
  }
}

// This function determines the radius of the earthquake marker based on its magnitude.
function getRadius(magnitude) { // grabbing the magnitude 
  if (magnitude === 0) { // Fill (0) with 1
    return 1;
  }

  return magnitude * 4;
}

L.geoJson(data, {
  // We turn each feature into a circleMarker on the map.
  pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 10, 
      fillOpacity: 0.85
    });
  },
  // We set the style for each circleMarker using our styleInfo function.
  style: function (styleInfo) {
    return {
      opacity: 1,
      fillOpacity: 1,
      getColor: getColor(feature.geometry.coordinates[2]), // grabbing the coordinates from the json (e.g. "coordinates":[-74.9491,-39.2503,11.76])
      color: "#000000",
      radius: getRadius(feature.properties.mag),// grabbing the magnitude (e.g. "mag":4.3) from json 
      stroke: true,
      weight: 0.5
    };,
  },
  // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
  onEachFeature: function(feature, layer) {
    layer.bindPopup(
      "Magnitude: "
        + feature.properties.mag
        + "<br>Depth: "
        + feature.geometry.coordinates[2]
        + "<br>Location: "
        + feature.properties.place
    );
  }
}).addTo(earthquakes);

earthquakes.addTo(allMaps);
});

// Here we create a legend control object.
var legend = L.control({
  position: "bottomright"
});

// Here we create a legend control object.
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");

  var grades = [-10, 10, 30, 50, 70, 90];
  var colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];

// loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
    + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
  }
  return div;
};
// Finally, we our legend to the map.
legend.addTo(myMaps);

  // // BONUS
  // // Make another d3.json() call to the tectonic plates API endpoint
  // // then fire off an anonymous function that takes a single argument plateData
  // YOUR_CODE_HERE {
  //     // Create an L.geoJson() that reads the plateData, and sets some options per your choosing 
  //     YOUR_CODE_HERE
  //     .YOUR_CODE_HERE; // use .addTo() to add the l.geoJson layer to the tectonicPlates LayerGroup

  //     // Then add the tectonicplates layer to the map.
  //     YOUR_CODE_HERE; // use .addTo to add the tectonicPlates LayerGroup to the myMap object
  //   });
});
