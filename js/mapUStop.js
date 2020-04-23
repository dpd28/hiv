// Using d3v5
function mapTop() { // object has curly braces, brackets are arrays

var map = d3.choropleth()
    .geofile('data/d3-geomap/topojson/countries/USA.json')
    .projection(d3.geoAlbersUsa)
    .column('rate')
    .unitId('fips')
    .scale(1000)
    .legend(true);

d3.csv('data/hiv-rate-us-map.csv').then(data => {
        map.draw(d3.select('figure#maptop').datum(data));
});
} // end function