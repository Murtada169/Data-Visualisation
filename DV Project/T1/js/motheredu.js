// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 60, left: 50},
width3 = 800 - margin.left - margin.right,
height3 = 550 - margin.top - margin.bottom;
// append the svg object to the body of the page
var svg3 = d3.select("#graph3")
.append("svg").attr("width", width3 + margin.left + margin.right).attr("height", height3 + margin.top + margin.bottom).append("g").attr("transform",
"translate(" + margin.left + "," + margin.top + ")");
// Parse the Data
d3.csv("mother.csv", function(data) {
// List of subgroups = header of the csv files = soil condition here
var subgroups = data.columns.slice(1)
// List of groups = species here = value of the first column called group -> I show them on the X axis
var groups = d3.map(data, function(d){return(d.group)}).keys()
// Add X axis
var x3 = d3.scaleBand().domain(groups).range([0, width3]).padding([0.5])
svg3.append("g")
.attr("transform", "translate(0," + height3 + ")")
.call(d3.axisBottom(x3).tickSizeOuter(0));
// Add Y axis
var y3 = d3.scaleLinear().domain([0, 530]).range([ height3, 0 ]);
svg3.append("g")
.call(d3.axisLeft(y3));

// color palette = one color per subgroup
var color = d3.scaleOrdinal()
.domain(subgroups)
.range(['#0047AB','#FF5733','#7393B3','#FFC300','#6495ED','#00A36C'])
//stack the data? --> stack per subgroup
var stackedData = d3.stack()
.keys(subgroups)
(data)
// ----------------
// Create a tooltip
// ----------------

var tooltip = d3.select("#myvisual2").append("div")
.style("opacity", 1)
.attr("class", "tooltip")
.style("background-color", "#DAF7A6")
.style("padding", "20px")
// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
var subgroupName = d3.select(this.parentNode).datum().key;
var subgroupValue = d.data[subgroupName];

tooltip.html("subgroup: " + subgroupName + "<br>" + "Students: " + subgroupValue)
.style("left", (d3.event.pageX) + "px")
.style("top", (d3.event.pageY - 28) + "px")
.style("opacity", 1)
}
var mousemove = function(d) {
tooltip
.style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
.style("top", (d3.mouse(this)[1]) + "px")
}
var mouseleave = function(d) {
    tooltip.transition()
    .duration(500)
    .style("opacity", 0);
}
// Show the bars
svg3.append("g")
.selectAll("g")
// Enter in the stack data = loop key per key = group per group
.data(stackedData)
.enter().append("g")
.attr("fill", function(d) { return color(d.key); })
.selectAll("rect")
// enter a second time = loop subgroup per subgroup to add all rectangles
.data(function(d) { return d; })
.enter().append("rect")
.attr("x", function(d) { return x3(d.data.group); })
.attr("y", function(d) { return y3(d[1]); })
.attr("height", function(d) { return y3(d[0]) - y3(d[1]); })
.attr("width",x3.bandwidth())
.attr("stroke", "black")
.on("mouseover", mouseover)
.on("mousemove", mousemove)
.on("mouseleave", mouseleave)

svg3.append("text")
   .attr("transform", "translate(100,0)")
   .attr("x", 50)
   .attr("y", 50)
   .attr("font-size", "24px")
   .style("fill", "white")
   .text("Mother qualification vs GPA")

   
   svg3.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x",0 - (height3 / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.style("fill", "white")
.text("Subject Total")

svg3.append("text")             
    .attr("transform","translate(" + (width3 / 2) + " ," + (height3 + margin.top + 30) + ")")
    .style("text-anchor", "middle")
    .style("fill","white")
    .text("Mother Education")
    
   
   
});