// console.log("Leaf-1 file is connecting");

// Start background of the map
var leaf1map = L.tileLayer( // Use L.tileLayer() to load and display tile layers on the map
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 500,
    minZoom: Number,
    maxZoom: 12,
    errorTileUrl: "broken map, contact creator", 
    zoomOffset: -1,
    id: "mapbox/light-v10", // type of version
    accessToken: API_KEY
  }
);

// initialize the map on the "map" div with a given center and zoom
var mapplacement = L.map("mapplacement", { // 'mapplacement' found in html that hold our map
  center: [51.505, -0.09],
  zoom: 13
});

// // Then we add our 'graymap' tile layer to the map.
leaf1map.addTo(mapplacement);

// Here we make an AJAX call that retrieves our earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson").then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

//   // This function determines the color of the marker based on the magnitude of the earthquake.
//   YOUR_CODE_HERE

//   // This function determines the radius of the earthquake marker based on its magnitude.
//   // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
//   YOUR_CODE_HERE

//   // Here we add a GeoJSON layer to the map once the file is loaded.
//   YOUR_CODE_HERE

//   // Here we create a legend control object.
//   YOUR_CODE_HERE

//   // Then add all the details for the legend
//   YOUR_CODE_HERE

//     // Looping through our intervals to generate a label with a colored square for each interval.
//     YOUR_CODE_HERE

  // Finally, we our legend to the map.
  legend.addTo(mapplacement);;
});
