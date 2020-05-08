// Small mutiples

function lineMultiplesLow() { // object has curly braces, brackets are arrays

  // set the dimensions and margins of the graph
  var margin = {
      top: 30,
      right: 0,
      bottom: 30,
      left: 50
    },
    width = 255 - margin.left - margin.right,
    height = 310 - margin.top - margin.bottom;

  let xScale = d3.scaleLinear()
    .range([0, width]);

  let yScale = d3.scaleLinear()
    .range([height, 0]);

  var yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(5);

  var area = d3.area()
    .x(function (d) {
      return xScale(d.year);
    })
    .y0(height)
    .y1(function (d) {
      return yScale(d.rate);
    });

  var line = d3.line()
    .x(function (d) {
      return xScale(d.year);
    })
    .y(function (d) {
      return yScale(d.rate);
    });

  function convertTextToNumbers(d) {
    d.year = +d.year;
    d.rate = +d.rate;
    return d;
  }

  d3.csv("data/hiv-us-rates-low.csv", convertTextToNumbers)
    .then(function (data) {

      xScale.domain(d3.extent(data, function (d) {
        return d.year;
      }));

      yScale.domain([0, 10 + d3.max(data, function (d) {
        return d.rate;
      })]);

      var states = d3.nest()
        .key(function (d) {
          return d.state;
        })
        .entries(data);


      var usa = states.filter(function (d) {
        return d.key === "U.S."
      });
      console.log(usa);
      states = states.filter(function (d) {
        return d.key !== "U.S."
      });

      console.log(states);


      var svg = d3.select("figure#multiples2").selectAll("svg")
        .data(states)
        .enter().append("svg")
        .style("margin-bottom", "30px")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        

      svg.append("path")
        .attr("class", "line")
        .attr("d", function (d) {
          return line(usa[0].values);
        })
        .style("stroke", "lightgrey");

      svg.append("path")
        .attr("class", "line")
        .attr("d", function (d) {
          return line(d.values);
        });

// state labels
      svg.append("text")
        .attr("x", (width + 10) / 2)
        .attr("y", 0)
        .attr("class", "lenny")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .attr("fill", "#222222") // get rid of this when you are ready for lenny
        .text(function (d) {
          return d.key;
        });

        svg.append("text")
        .attr("x", width -25)
        .attr("y", height-75)
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .attr("fill", "#222222")
        .text("U.S. avg.");


        // start and end years on x-axis
      const xDomain = xScale.domain();
      svg.append("text")
        .text(xDomain[0])
        .attr("x", 0)
        .attr("y", height + 15)
        .style("text-anchor", "start")
        .style("font-size", "12px")
        .attr("fill", "#222222");

      svg.append("text")
        .text(xScale.domain()[1])
        .attr("x", width)
        .attr("y", height + 15)
        .style("text-anchor", "end")
        .style("font-size", "12px")
        .attr("fill", "#222222");

      svg.append("g")
      .attr("id", "yAxisG")
      .call(yAxis);
      d3.selectAll("path.domain")
      .remove();
      d3.selectAll("line")
      .style("stroke", "silver");
    })

}