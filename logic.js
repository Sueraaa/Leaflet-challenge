// STEP-1

// We create the tile layer that will be the background of our map.
console.log("Step 1 working");

// We create the tile layer that will be the background of our map.
let basemap = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
//Load the GeoJSON data.
let geoJsonData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// We create the map object with options.
let myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 2
});
  
// Then we add our 'basemap' tile layer to the map.
basemap.addTo(myMap);

// Here we make an AJAX call that retrieves our earthquake geoJSON data.
d3.json(geoJsonData).then(data => {
    createFeatures(data.features);

// Define the createFeatures function
function createFeatures(geoJsonData) {
    // Loop through each feature in the GeoJSON data
    geoJsonData.forEach(feature => {
    });
}
  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the colour and radius.
  function styleInfo(feature) {
    let depth = feature.geometry.coordinates[2];
    return {
      // Set the radius based on the magnitude of the earthquake
      radius: getRadius(feature.properties.mag),
      // Set the fill color based on the depth of the earthquake
      fillColor: getColor(depth),
      // Set the opacity
      fillOpacity: 0.8,
      // Set the color of the circle's outline
      color: "#000",
      // Set the weight of the circle's outline
      weight: 1
    };
  }

  // This function determines the colour of the marker based on the depth of the earthquake.
  function getColor(depth) {
    switch (true) {
      case depth > 100:
        return "#1f005c";
      case depth > 70:
        return "#54278f";
      case depth > 50:
        return "#756bb1";
      case depth > 30:
        return "#9e9ac8";
      case depth > 10:
        return "#cbc9e2";
      default:
        return "#f2f0f7"; 
    }
  }
  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(magnitude) {
    return magnitude > 0 ? magnitude * 4 : 1; 
  }

  // Here we add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`<h3>Magnitude: ${feature.properties.mag}</h3><p>Location: ${feature.properties.place}</p></h3><p>Depth: ${feature.geometry.coordinates[2]} km</p>`);
    }
    }).addTo(myMap);
    
   // Here we create a legend control object.
   let legend = L.control({ position: "bottomright" });
 
  // Then add all the details for the legend
   legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    let grades = [0, 10, 30, 50, 70, 90];
    let colors = ["#f2f0f7", "#cbc9e2", "#9e9ac8", "#756bb1", "#54278f", "#1f005c"];

     // Looping through our intervals to generate a label with a coloured square for each interval.
     for (let i = 0; i < grades.length; i++) {
         div.innerHTML +=
             '<li style= \"background:' + colors[i] + '"></li> ' +
             grades[i] + (grades[i + 1]? '&ndash;' + grades[i + 1] + '<br>'  :'+');
     }
     
      return div;
     };


  // Finally, we add our legend to the map.
  legend.addTo(myMap);

});



// // STEP-2
// console.log("Step 2 working");

// // We create the tile layer that will be the background of our map.
// let topo = L.tileLayer(
//     "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'",
//   {
//     attribution:
//       'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
//   }
// );

// let street = L.tileLayer(
//   'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
//   {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }
// );

// // We then create the map object with options.
// let map = L.map(
// });


// // Adding our 'street' tile layer to the map.


// // We create the layers for our two different sets of data, earthquakes and
// // tectonicplates.
// let tectonicplates = 
// let earthquakes = 

// // Defining an object that contains our map for use in the layer control.
// let baseMaps = {
// //  "Global Earthquakes": basemap,
//   "Street Map": 
//   "Topographic Map": 
// };

// // We define an object that contains all of our overlays. Any combination of
// // these overlays may be visible at the same time!
// let overlays = {
//   "Tectonic Plates": 
//   "Earthquakes": 
// };

// // Then we add a control to the map that will allow the user to change which
// // layers are visible.
// L.control.layers()
  

// // Our AJAX call retrieves our earthquake geoJSON data.


//   // This function returns the style data for each of the earthquakes we plot on
//   // the map. We pass the magnitude of the earthquake into two separate functions
//   // to calculate the colour and radius.
//   function styleInfo(feature) {
//     return {
      
//     };
//   }

//   // This function determines the colour of the marker based on the depth of the earthquake.
//   function getColor(depth) {
//     switch 
//       case 
//         return 
     
//   }  

//   // This function determines the radius of the earthquake marker based on its magnitude.
//   // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
//   function getRadius(magnitude) {
//     if (magnitude === 0) {
      
//   }

//   // Here we add a GeoJSON layer to the map once the file is loaded.
//   L.geoJson(data, {
//     // We turn each feature into a circleMarker on the map.
//     pointToLayer: function (feature, latlng) {
//       return 
//     },
//     // We set the style for each circleMarker using our styleInfo function.
//     style: styleInfo,
//     // We create a popup for each marker to display the magnitude and location of
//     // the earthquake after the marker has been created and styled
//     onEachFeature: function (feature, layer) {
      
//     }
//     // We add the data to the earthquake layer instead of directly to the map.
//   })

//   // Then we add the earthquake layer to our map.


//   // Here we create a legend control object.
//   let legend = 
    

//   legend.onAdd = function () {
    

//     // Loop through our intervals and generate a label with a coloured square for each interval.
//     for () {
//       div.innerHTML += "<i style='background: "
//         + colors
//         + "'></i> "
//         + grades
//         + ();
//     }
//     return div;
//   };

//   // We add our legend to the map.
  

//   // Here we make an AJAX call to get our Tectonic Plate geoJSON data.
//   d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (platedata) {
//     // Adding our geoJSON data, along with style information, to the tectonicplates
//     // layer.
//     L.geoJson(
//     }).addTo(tectonicplates);

//     // Then add the tectonicplates layer to the map.
    
//   });
// });
