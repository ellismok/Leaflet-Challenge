// We create the tile layer that will be the background of our map.
console.log("Step 1 working");

var graymap = YOUR_CODE_HERE

// We create the map object with options.
var map = YOUR_CODE_HERE

// Then we add our 'graymap' tile layer to the map.
YOUR_CODE_HERE;

// Here we make an AJAX call that retrieves our earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  YOUR_CODE_HERE

  // This function determines the color of the marker based on the magnitude of the earthquake.
  YOUR_CODE_HERE

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  YOUR_CODE_HERE

  // Here we add a GeoJSON layer to the map once the file is loaded.
  YOUR_CODE_HERE

  // Here we create a legend control object.
  YOUR_CODE_HERE

  // Then add all the details for the legend
  YOUR_CODE_HERE

    // Looping through our intervals to generate a label with a colored square for each interval.
    YOUR_CODE_HERE

  // Finally, we our legend to the map.
  YOUR_CODE_HERE;
});
