// set the dimensions and margins of the graph
var margin5 = {top: 10, right: 30, bottom: 50, left: 50},
    width5 = 760 - margin5.left - margin5.right,
    height5 = 700 - margin5.top - margin5.bottom;

// append the svg object to the body of the page
var svg5 = d3.select("#graph5")
  .append("svg")
    .attr("width", width5 + margin5.left + margin5.right)
    .attr("height", height5 + margin5.top + margin5.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin5.left + "," + margin5.top + ")");

// Parse the Data
d3.csv('FamilyStatus.csv', function(data) {

  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(data, function(d){return(d.group)}).keys()

  // Add X axis
  var x5 = d3.scaleBand().domain(groups).range([0, width5]).padding([0.2])
  svg5.append("g")
    .attr("transform", "translate(0," + height5 + ")")
    .call(d3.axisBottom(x5).tickSize(0));

  // Add Y axis
  var y5 = d3.scaleLinear().domain([0, 120]).range([ height5, 0]);
  svg5.append("g")
    .call(d3.axisLeft(y5));

  // Another scale for subgroup position?
  var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x5.bandwidth()])
    .padding([0.03])

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#808000','#FF0000','#F87217', '#2E8B57', '#C78023','#5D3FD3'])

  // Show the bars
  svg5.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .enter()
    .append("g")
      .attr("transform", function(d) { return "translate(" + x5(d.group) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y5(d.value); })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return height5 - y5(d.value); })
      .attr("fill", function(d) { return color(d.key); })
      .attr("stroke", "black");

      svg5.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin5.left)
      .attr("x",0 - (height5 / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", "White")
      .text("Number of students")

      svg5.append("text")             
    .attr("transform","translate(" + (width5 / 2) + " ," + (height5+ margin5.top + 30) + ")")
    .style("text-anchor", "middle")
    .style("fill","white")
    .text("Martial status of parents")

      

});
 
