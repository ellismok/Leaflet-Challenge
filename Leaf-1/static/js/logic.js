console.log("Leaf-1 file is connecting");

// Start background of the map
var graymap = L.tileLayer( // Use L.tileLayer() to load and display tile layers on the map
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 500,
    maxZoom: 12,
    errorTileUrl: "broken map, contact creator", 
    zoomOffset: -1,
    id: "mapbox/light-v10", // type of version
    accessToken: API_KEY
  }
);

// initialize the map on the "map" div with a given center and zoom
var map = L.map("mapid", { // 'mapid' found in html that hold our map
  center: [51.505, -0.09],
  zoom: 13
});

// // Then we add our 'graymap' tile layer to the map.
graymap.addTo(map);

// Here we make an AJAX call that retrieves our earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

  // use this function to set up the style as we get the 'getColor' = coordinates and 'getRadius' for the magnitude
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      getColor: getColor(feature.geometry.coordinates[2]), // grabbing the coordinates from the json (e.g. "coordinates":[-74.9491,-39.2503,11.76])
      color: "#000000",
      radius: getRadius(feature.properties.mag),// grabbing the magnitude (e.g. "mag":4.3) from json 
      stroke: true,
      weight: 0.5
    };
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

  // Adding a L.geoJSON layer to add a feature such as the L.circleMarker
  
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
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
  }).addTo(map);

  // Here we create a legend control object.
  var legend = L.control({
    position: "bottomright"
  }
    );
  
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
  legend.addTo(map);
)};
