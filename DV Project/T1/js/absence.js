// create 2 data_set 

// This dataaset has been created and compiled using multiple functions in excel and using pivot tables to consolidate
// all the findings
var data1 = [
   {group: "0-10", value: 58},
   {group: "10-20", value: 56},
   {group: "20-30", value: 54},
   {group: "30-40", value: 25},
   {group: "40-50", value: 35},
   {group: "50-60", value: 34}
];

var data2 = [
   {group: "0-10", value: 0},
   {group: "10-20", value: 4.20},
   {group: "20-30", value: 7.83},
   {group: "30-40", value: 6.13},
   {group: "40-50", value: 3.91},
   {group: "50-60", value: 5.05}
];

// set the dimensions and margins of the graph
var margin4 = {top4: 30, right4: 30, bottom4: 70, left4: 60},
    width4 = 660 - margin4.left4 - margin4.right4,
    height4 = 600 - margin4.top4 - margin4.bottom4;

// append the svg object to the body of the page
var svg4 = d3.select("#graph4")
  .append("svg").attr("width", width4 + margin4.left4 + margin4.right4).attr("height", height4 + margin4.top4 + margin4.bottom4).append("g").attr("transform","translate(" + margin4.left4 + "," + margin4.top4 + ")");

// X axis
var x4 = d3.scaleBand().range([ 0, width4 ]).domain(data1.map(function(d) { return d.group; })).padding(0.2);
svg4.append("g").attr("transform", "translate(0," + height4 + ")").call(d3.axisBottom(x4))

// Add Y axis
var y4= d3.scaleLinear().domain([0, 70]).range([ height4, 0]);
svg4.append("g").attr("class", "myYaxis").call(d3.axisLeft(y4));

// A function that create / update the plot for a given variable:
function update(data) {

  var u = svg4.selectAll("rect")
    .data(data)

  u
    .enter()
    .append("rect")
    .merge(u)
    .transition()
    .duration(1000)
      .attr("x", function(d) { return x4(d.group); })
      .attr("y", function(d) { return y4(d.value); })
      .attr("width", x4.bandwidth())
      .attr("height", function(d) { return height4 - y4(d.value); })
      .attr("fill", "#FFC300")
      .attr("stroke", "black");

      svg4.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin4.left4)
      .attr("x",0 - (height4 / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", "white")
      .text("Subject Total")

      svg4.append("text")             
    .attr("transform","translate(" + (width4 / 2) + " ," + (height4 + margin4.top4 + 30) + ")")
    .style("text-anchor", "middle")
    .style("fill","white")
    .text("Number of absences")

    
      

    }