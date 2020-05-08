function heatAges() {

// set the dimensions and margins of the graph
var margin = {top: 70, right: 200, bottom: 20, left: 200},
  width = 1072 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("figure#heatAges")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Labels of row and columns
var myGroups = ["2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"]
var myVars = ["55+", "45-54", "35-44", "25-34", "13-24"]

// Build X scales and axis:
var x = d3.scaleBand()
  .range([ 5, width ])
  .domain(myGroups)
  .padding(0.01);
  svg.append("g")
  .attr("class", "x_axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickSize(0)) //remove ticks
  .call(g => g.select(".domain").remove()); // remove x-axis line


// Build X scales and axis:
var y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(myVars)
  .padding(0.01);
svg.append("g")
  .call(d3.axisLeft(y).tickSize(0))
  .call(g => g.select(".domain").remove()); // remove x-axis line


// Build color scale
var myColor = d3.scaleLinear()
  .range(["white", "#08519c"])
  .domain([1,40])

//Read the data
d3.csv("data/hiv-heatmap-ages.csv")
  .then(function(data) {

  svg.selectAll()
      .data(data, function(d) {return d.year+':'+d.demo;}) //  changed group to year and variable to demo
      .enter()
      .append("rect")
      .attr("x", function(d) { return x(d.year) }) // changed group to year
      .attr("y", function(d) { return y(d.demo) }) // changed to demo
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.rate)} )

 // ! Add a legend here - hacking
 //Append a defs (for definition) element to your SVG
 var defs = svg.append("defs");

 //Append a linearGradient element to the defs and give it a unique id
 var linearGradient = defs.append("linearGradient")
     .attr("id", "linear-gradient");

     //Set the color for the start (0%)
 linearGradient.append("stop")
 .attr("offset", "0%")
 .attr("stop-color", "#fff"); //light blue

 //Set the color for the end (100%)
 linearGradient.append("stop")
 .attr("offset", "100%")
 .attr("stop-color", "#08519c"); //dark blue

 //Draw the rectangle and fill with gradient
 svg.append("rect")
     .attr("width", 150)
     .attr("height", 10)
     .attr("y", -50)
     .attr("x", 520)
     .style("fill", "url(#linear-gradient)");

svg.append("text")
.attr("class", "deck")
.attr("x", -35)
.attr("y", -40)
.text("By Age")

svg.append("text")
.attr("class", "rate")
.attr("x", 520)
.attr("y", -60)
.text("Rate per 100,000")

svg.append("text")
.attr("class", "rate")
.attr("x", 520)
.attr("y", -20)
.text("0")

svg.append("text")
.attr("class", "rate")
.attr("x", 650)
.attr("y", -20)
.text(74.3)

svg.append("text")
.attr("class", "value1")
.attr("x", 25)
.attr("y", 67)
.text(30.8)

svg.append("text")
.attr("class", "value1")
.attr("x", 25)
.attr("y",108)
.text(30.3)

svg.append("text")
.attr("class", "value1")
.attr("x", 25)
.attr("y",148)
.text(21.5)


});

} // end function
