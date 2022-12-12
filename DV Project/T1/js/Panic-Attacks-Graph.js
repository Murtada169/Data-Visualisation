// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 60, left: 50},
    width = 800 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

var tooltip = d3.select("#graph2").append("div")
.attr("class", "toolTip")
.style('opacity', 0);
// append the svg object to the body of the page
var svg2 = d3.select("#graph2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("a.csv", function(data) {

  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(data, function(d){return(d.group)}).keys()

  // Add X axis
  var x1 = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.6])
  svg2.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x1).tickSizeOuter(0));
    svg2.append("text")             
    .attr("transform","translate(" + (width / 2) + " ," + (height + margin.top + 30) + ")")
    .style("text-anchor", "middle")
    .text("Gender")
    .style("fill", "white");

  // Add Y axis
  var y1 = d3.scaleLinear()
    .domain([0, 80])
    .range([ height, 0 ]);
  svg2.append("g")
    .call(d3.axisLeft(y1));

    svg2.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("fill", "white")
    .text("Frequency");  

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(["#B1D4E0", "#2E8BC0", "#0C2D48", "#145DA0"])

  //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(subgroups)
    (data)




  // ----------------
  // Create a tooltip
  // ----------------
  var tooltip = d3.select("#graph2")
    .append("div")
    .style("opacity", 1)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "6px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    var subgroupName = d3.select(this.parentNode).datum().key;
    var subgroupValue = d.data[subgroupName];
    tooltip.html("subgroup: " + subgroupName + "<br>" + "Value: " + subgroupValue)
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY - 28) + "px")
    .style("opacity",1);    // Highlight all rects of this subgroup with opacity 0.8. It is possible to select them since they have a specific class = their name.
d3.selectAll("."+subgroupName)
  .style("opacity", 1)
  }
//   var mousemove = function(d) {
    
//     tooltip.html("subgroup: " + subgroupName + "<br>" + "Value: " + subgroupValue)
//       .style("right", (d3.mouse(this)[0]) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
//       .style("top", (d3.mouse(this)[1]) + "px");
//   }
  var mouseleave = function(d) {
    tooltip.transition()
    .duration(500)
    .style("opacity", 0);
  }
  var zoom = d3.zoom()
    .scaleExtent([0.8, 2])
  .on("zoom", function() {
  svg2.attr("transform", d3.event.transform);
 });

svg2.call(zoom);
  // Show the bars
  svg2.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color(d.key); })
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x1(d.data.group); })
        .attr("y", function(d) { return y1(d[1]); })
        .attr("class", function(d){return d3.select(this.parentNode).datum().key; })
        .attr("height", function(d) { return y1(d[0]) - y1(d[1]); })
        .attr("width",x1.bandwidth())
        .attr("stroke", "black")
      .on("mouseover", mouseover)
    //   .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

})