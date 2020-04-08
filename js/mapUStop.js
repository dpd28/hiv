// Using d3v5
// object has curly braces, brackets are arrays

var dimensions = {
    width: window.innerWidth * 0.9, // grab the innerwidth and use 90%
    height: 600,
    margin: {
        top:20,
        right: 20,
        bottom: 30,
        left: 80,
    }
};

// create two new parameters
// you are choosing from above. chaining from above. descendent selectors, down the tree.

dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

// move into the scaffolding of the chart. 

var svg = d3.select("figure#maptop") // do something to the html area specified
    .append("svg")
    // .attr("width", dimensions.width) // we defined this earlier on the page
    // .attr("height", dimensions.height);

    .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`) 
    // viewbox retains proportions
    // group the svg
    .append("g")
    .attr("transform", `translate(${dimensions.margin.left},${dimensions.margin.right})`);

    // defines how to format values in the map legend and in tooltips when moving the mouse over a shape. Use to set legend to true or false.
var format = function(d) {
        d = d / 1000000;
        return d3.format(',.02f')(d) + 'M';
    }

var map = d3.choropleth()
    .geofile('d3-geomap/topojson/countries/USA.json')
    .projection(d3.geoAlbersUsa)
    .column('2012')
    .unitId('fips')
    .scale(1000)
    .legend(true);

d3.csv('data/hiv-rate-us-map.csv').then(data => {
    map.draw(d3.select('figure#maptop').datum(data));
});