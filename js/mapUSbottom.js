function mapBottom() { // object has curly braces, brackets are arrays
var map = d3.choropleth()
        .geofile('data/d3-geomap/topojson/countries/USA.json')
    .projection(d3.geoAlbersUsa)
    .column('status')
    .unitId('fips')
    .scale(1000)
    .legend(true);

d3.csv('data/hivmedicaidmap.csv').then(data => {
        map.draw(d3.select('figure#mapbottom').datum(data));
});
}