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
var overlayMaps = {YOUR_CODE_HERE};

// Add a L.control.layers() object and pass in the baseMaps and overlayMaps, and then .addTo myMap
YOUR_CODE_HERE;

// Use d3.json() to call the API endpoint for earthquake geoJSON data, 
// .then() fire off an anonymous function that takes a single argument `data`.
YOUR_CODE_HERE {
  // Use L.geoJson() to parse the data, and do the following:
  L.geoJson(data, {
    // use pointToLayer to convert each feature to an L.circleMarker, see https://geospatialresponse.wordpress.com/2015/07/26/leaflet-geojson-pointtolayer/ for a tutorial
    // use style to set the color, radius, and other options for each circleMarker dynamically using the magnitude data
    // use onEachFeature to bind a popup with the magnitude and location of the earthquake to the layer (see above tutorial for an example)
  }).YOUR_CODE_HERE;  // use .addTo to add the L.geoJson object to the earthquakes LayerGroup

  // Then we add the earthquake layer to our map.
  YOUR_CODE_HERE; // use .addTo to add the earthquakes LayerGroup to the myMap object

  // Create a dynamic legend that describes the color scheme for the circles
  // see this tutorial for guidance: https://www.igismap.com/legend-in-leafletjs-map-with-topojson/
  YOUR_CODE_HERE

  // BONUS
  // Make another d3.json() call to the tectonic plates API endpoint
  // then fire off an anonymous function that takes a single argument plateData
  YOUR_CODE_HERE {
      // Create an L.geoJson() that reads the plateData, and sets some options per your choosing 
      YOUR_CODE_HERE
      .YOUR_CODE_HERE; // use .addTo() to add the l.geoJson layer to the tectonicPlates LayerGroup

      // Then add the tectonicplates layer to the map.
      YOUR_CODE_HERE; // use .addTo to add the tectonicPlates LayerGroup to the myMap object
    });
});
