function multiLine() {
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 200, bottom: 30, left: 200},
      width = 1072 - margin.left - margin.right,
      height = 550 - margin.top - margin.bottom;
  
  
  // append the svg object to the body of the page
  var svg = d3.select("figure#multiLine")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
  
  
  //Read the data
  d3.csv("data/hiv-transmission-types-tall.csv")
  .then(function(data) {
    // group the data: Draw one line per group
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
      .key(function(d) {return d.name;})
      .entries(data);
      console.log(sumstat); // categories are nested and works
  
    // Add X axis
    var x = d3.scaleLinear()
    // .domain(d3.extent(data, function (d) {
    // return +d.year;
    // })) // Check the CSV file for extra rows of no data
      .domain([2008,2017])
      // .domain(d3.extent(data, function(d) { return +d.year; }))
      .range([0, width ]); // adjust this to move axis starting point
      svg.append("g")
      .attr( "class", "x_axis" )
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)
      .tickPadding([10]) // moves axis labels away from ticks and lines
      .tickSize(-height, 0, 0)
      .tickFormat("")
      .tickFormat(d3.format(".0f"))) // change 1,984 to 1984
      // .call(g => g.selectAll(".tick:not(:first-of-type) line")
      .attr("stroke-opacity", 0.1) // lightens the gridlines
      .attr("stroke-dasharray", "1,2"); // add gridlines and make them dashed
    // .call(g => g.select(".domain").remove());

    // Add Y axis
    var y = d3.scaleLinear()
      // .domain([0, d3.max(data, function(d) { return +d.rate; })])
      .domain([0,60])
      .range([ height, 0 ]);
      svg.append("g")
      .attr( "class", "y_axis" )
      .call(d3.axisLeft(y).tickSize(0)
      .tickFormat(d3.format("0"))) // change 7.0 to whole numbers
      // .call(g => g.select(".domain").remove()); // removes the line for axis
  
      ///////////
      // ! Labels added to end of line.
      // ! Need to add to beginning. Figure out later.
      //////////

 // * BEGIN CATEGORY - MALE BLACK/AFRICAN AMERICAN MALE-TO-MALE ANNOTATIONS     

      // add labels for each line
      // svg.append("text")
      // .attr("class", "labels")
      // .attr("transform", "translate("+(width+3)+","+y(sumstat[0].values[9].rate)+")")
      // .attr("dy", "0.1em")
      // .attr("text-anchor", "start")
      // .style("fill", "green")
      // .text("Male Black/African American");
      // break labels into two lines
      // ! There has to be an easier, less code heavy way to do this. Look into tspan at some point
      // svg.append("text")
      // .attr("class", "labels")
      // .attr("transform", "translate("+(width+3)+","+y(sumstat[0].values[9].rate)+")")
      // .attr("dy", "1em")
      // .attr("text-anchor", "start")
      // .style("fill", "green")
      // .text("Male-to-male sexual contact");

      // ! Begin manual annotations to start of line attribution. Remember to fix CSS.
      svg.append("text")
      .attr("class", "labels")
      // .attr("transform", "translate("+(width+3)+","+y(sumstat[0].values[9].rate)+")")
      // .attr("dy", "0.1em")
      .attr("y", 20)
      .attr("x", "-175")
      // .attr("y", 230)
      // .attr("x", "-150")
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("Male Black/African American");

// add the second line
// ! Need to figure out how to align right. "end" for text anchor doesn't work, breaks chart.
      svg.append("text")
      .attr("class", "labels")
      .attr("y", 35)
      .attr("x", "-175")
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("Male-to-male sexual contact");

// add a line to the first data point
    svg.append("line")
      .attr("class", "diagLine")
      .attr("x1",-20)
      .attr("y1", 35)
      .attr("x2", -5)
      .attr("y2", 48)
      .attr("stroke-width", 0.5)
      .attr("stroke", "#666");
// Add 1st value since there isn't a y-axis
      svg.append("text")
      .attr("class", "labels")
      .attr("y", 40)
      .attr("x", 0)
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("54.32");
// Add 2nd value since there isn't a y-axis
svg.append("text")
.attr("class", "labels")
.attr("y", 93)
.attr("x", (width+5))
.attr("text-anchor", "start")
.style("fill", "#000")
.text("49.53");


 // * BEGIN CATEGORY - MALE BLACK/AFRICAN AMERICAN HETEROSEXUAL ANNOTATIONS     
      // svg.append("text")
      // .attr("class", "labels")
      // // .attr("transform", "translate("+(width+3)+","+y(data[5].rate)+")")
      // .attr("transform", "translate("+(width+3)+","+y(sumstat[1].values[9].rate)+")")
      // .attr("dy", ".35em")
      // .attr("text-anchor", "start")
      // .style("fill", "red")
      // .text("Male Black/African American");
      // // breaks the long line to two
      // svg.append("text")
      // .attr("class", "labels")
      // .attr("transform", "translate("+(width+3)+","+y(sumstat[1].values[9].rate)+")")
      // .attr("dy", ".35em")
      // .attr("text-anchor", "start")
      // .style("fill", "red")
      // .text("Heterosexual contact");

      svg.append("text")
      .attr("class", "labels")
      // .attr("transform", "translate("+(width+3)+","+y(sumstat[1].values[9].rate)+")")
      // .attr("dy", "0.1em")
      .attr("y", 330)
      .attr("x", "-175")
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("Male Black/African American");
// add the second line
// ! Need to figure out how to align right. "end" for text anchor doesn't work, breaks chart.
      svg.append("text")
      .attr("class", "labels")
      .attr("y", 345)
      .attr("x", "-175")
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("Heterosexual contact");

             // Add annotation line
             svg.append("line")
             .attr("class", "diagLine")
             .attr("x1",-20)
             .attr("y1", 345)
             .attr("x2", -5)
             .attr("y2", 360)
             .attr("stroke-width", 0.5)
             .attr("stroke", "#666");

// Add 1st value since there isn't a y-axis
      svg.append("text")
      .attr("class", "labels")
      .attr("y", 353)
      .attr("x", 0)
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("17.63");
 // Add 2nd value since there isn't a y-axis
       svg.append("text")
       .attr("class", "labels")
       .attr("y", 438)
       .attr("x", (width+5))
       .attr("text-anchor", "start")
       .style("fill", "#000")
       .text("8.67");

 // * BEGIN CATEGORY - MALE HISPANIC/LATINO MALE-TO-MALE ANNOTATIONS     

      // svg.append("text")
      // .attr("class", "labels")
      // .attr("transform", "translate("+(width+3)+","+y(data[2].rate)+")")
      // // .attr("y", 230)
      // // .attr("x", "-150")
      // .attr("dy", "1em")
      // .attr("text-anchor", "start")
      // .style("fill", "blue")
      // .text("Male Hispanic/Latino Male-to-male sexual contact");

      // ! Manual
      svg.append("text")
      .attr("class", "labels")
      .attr("y", 260)
      .attr("x", "-175")
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("Male Hispanic/Latino");

            // ! Manual second line
            svg.append("text")
            .attr("class", "labels")
            .attr("y", 275)
            .attr("x", "-175")
            .attr("text-anchor", "start")
            .style("fill", "#000")
            .text("Male-to-male sexual contact");
       // Add annotation line
            svg.append("line")
            .attr("class", "diagLine")
            .attr("x1",-20)
            .attr("y1", 275)
            .attr("x2", -5)
            .attr("y2", 290)
            .attr("stroke-width", 0.5)
            .attr("stroke", "#666");

        // Add 1st value since there isn't a y-axis
        svg.append("text")
       .attr("class", "labels")
        .attr("y", 287)
        .attr("x", 0)
        .attr("text-anchor", "start")
        .style("fill", "#000")
       .text("25.35");
 // Add 2nd value since there isn't a y-axis
      svg.append("text")
      .attr("class", "labels")
      .attr("y", 307)
      .attr("x", (width+5))
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("24.25");

 // * BEGIN CATEGORY - MALE WHITE MALE-TO-MALE ANNOTATIONS     

      // svg.append("text")
      // .attr("class", "labels")
      // .attr("transform", "translate("+(width+3)+","+y(data[3].rate)+")")
      //     // data[data.length-1].open 
      // .attr("dy", "1.8em")
      // .attr("text-anchor", "start")
      // .style("fill", "green")
      // .text("Male White Male-to-male sexual contact");

      // ! Manual
      svg.append("text")
      .attr("class", "labels")  
      .attr("y", 400)
      .attr("x", "-175")        // data[data.length-1].open 
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("Male White");

      // ! Manual second line
       svg.append("text")
      .attr("class", "labels")  
      .attr("y", 415)
      .attr("x", "-175")        // data[data.length-1].open 
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("Male-to-male sexual contact");

      // Add annotation line
             svg.append("line")
             .attr("class", "diagLine")
             .attr("x1",-20)
             .attr("y1", 420)
             .attr("x2", -5)
             .attr("y2", 430)
             .attr("stroke-width", 0.5)
             .attr("stroke", "#666");

       // Add 1st value since there isn't a y-axis
        svg.append("text")
          .attr("class", "labels")
               .attr("y", 425)
               .attr("x", 0)
               .attr("text-anchor", "start")
               .style("fill", "#000")
              .text("9.28");
 // Add 2nd value since there isn't a y-axis
      svg.append("text")
      .attr("class", "labels")
      .attr("y", 455)
      .attr("x", (width+5))
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("7.18");


// * BEGIN CATEGORY - FEMALE BLACK/AFRICAN AMERICAN ANNOTATIONS   

      // svg.append("text")
      // .attr("class", "labels")
      // .attr("transform", "translate("+(width+3)+","+y(data[5].rate)+")")
      // .attr("transform", "translate("+(width+3)+","+y(sumstat[4].values[9].rate)+")")
      // .attr("dy", ".35em")
      // .attr("text-anchor", "start")
      // .style("fill", "red")
      // .text("Female Black/African American Heterosexual contact");

// ! Manual
      svg.append("text")
      .attr("class", "labels")
      .attr("y", 200)
      .attr("x", "-175")
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("Female Black/African American");

// ! Manual 2nd line
      svg.append("text")
      .attr("class", "labels")
      .attr("y", 215)
      .attr("x", "-175")
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("Heterosexual contact");

// Add annotation line
    svg.append("line")
    .attr("class", "diagLine")
    .attr("x1",-20)
    .attr("y1", 210)
    .attr("x2", -5)
    .attr("y2", 235)
    .attr("stroke-width", 0.5)
    .attr("stroke", "#666");

// Add 1st value since there isn't a y-axis
       svg.append("text")
       .attr("class", "labels")
            .attr("y", 228)
            .attr("x", 0)
            .attr("text-anchor", "start")
            .style("fill", "#000")
           .text("32.15");
 // Add 2nd value since there isn't a y-axis
      svg.append("text")
      .attr("class", "labels")
      .attr("y", 355)
      .attr("x", (width+5))
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("18.56");
      
 // * BEGIN CATEGORY - FEMALE HISPANIC/LATINO ANNOTATIONS   
      // svg.append("text")
      // .attr("class", "labels")
      // .attr("transform", "translate("+(width+3)+","+y(data[5].rate)+")")
      // .attr("dy", "2em")
      // .attr("text-anchor", "start")
      // .style("fill", "black")
      // .text("Female Hispanic/Latino Heterosexual contact");

// ! Manual
      svg.append("text")
      .attr("class", "labels")  
      .attr("y", 450)
      .attr("x", "-175")        
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("Female Hispanic/Latino");
     
// ! Manual second line
      svg.append("text")
      .attr("class", "labels")  
      .attr("y", 465)
      .attr("x", "-175")      
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("Heterosexual contact");

// Add annotation line
      svg.append("line")
      .attr("class", "diagLine")
      .attr("x1",-20)
      .attr("y1", 450)
      .attr("x2", -5)
      .attr("y2", 455)
      .attr("stroke-width", 0.5)
      .attr("stroke", "#666");

// Add 1st value since there isn't a y-axis
      svg.append("text")
      .attr("class", "labels")
      .attr("y", 450)
      .attr("x", 0)
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("6.11");

 // Add 2nd value since there isn't a y-axis
      svg.append("text")
      .attr("class", "labels")
      .attr("y", 485)
      .attr("x", (width+5))
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("3.36");

 // * BEGIN CATEGORY - FEMALE WHITE HETEROSEXUAL ANNOTATIONS     

      // svg.append("text")
      // .attr("class", "labels")
      // .attr("transform", "translate("+(width+3)+","+y(data[6].rate)+")")
      // .attr("dy", ".35em")
      // .attr("text-anchor", "start")
      // .style("fill", "black")
      // .text("Female White Heterosexual contact");

// ! Manual
      svg.append("text")
        .attr("class", "labels")  
        .attr("y", 500)
        .attr("x", "-175")        
        .attr("text-anchor", "start")
        .style("fill", "#000")
        .text("Female White");
            
// ! Manual second line
      svg.append("text")
        .attr("class", "labels")  
        .attr("y", 515)
        .attr("x", "-175")      
        .attr("text-anchor", "start")
        .style("fill", "#000")
        .text("Heterosexual contact");

// Add annotation line
      svg.append("line")
        .attr("class", "diagLine")
        .attr("x1",-20)
        .attr("y1", 500)
        .attr("x2", -5)
        .attr("y2", 500)
        .attr("stroke-width", 0.5)
        .attr("stroke", "#666");

// Add 1st value since there isn't a y-axis
      svg.append("text")
      .attr("class", "labels")
           .attr("y", 490)
           .attr("x", 0)
           .attr("text-anchor", "start")
           .style("fill", "#000")
          .text("1.28");

 // Add 2nd value since there isn't a y-axis
      svg.append("text")
      .attr("class", "labels")
      .attr("y", 505)
      .attr("x", (width+5))
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("1");

// END OF MANUAL ANNOTATIONS - PHEW

// color palette
    var res = sumstat.map(function(d){ return d.key }) // list of group names
    var color = d3.scaleOrdinal()
      .domain(res)
      .range(['#d78d34','#d69a55','#d3ab7c','#08519c','#2171b5','#4292c6','#6baed6'])

    // Draw the line
    svg.selectAll(".line")
        .data(sumstat)
        .enter()
        .append("path")
          .attr("fill", "none")
          .attr("stroke", function(d){ return color(d.key) })
          .attr("stroke-width", 1.5)
          .attr("d", function(d){
            return d3.line()
              .x(function(d) { return x(d.year); })
              .y(function(d) { return y(+d.rate); })
              (d.values)
          });
  
  });
  }
  