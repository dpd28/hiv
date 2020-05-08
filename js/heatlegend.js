function legend() {
// set the dimensions and margins of the graph
var margin = {top: 50, right: 200, bottom: 20, left: 200},
  width = 1072 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;
  
  // append the svg object to the body of the page
var svg = d3.select("figure#heatlegend")
.append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

 // * Add a legend here
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
 svg.selectAll()
 .enter()
 .append("rect")
     .attr("width", 200)
     .attr("height", 10)
    //  .attr("y", -40)
     .style("fill", "url(#linear-gradient)");
}