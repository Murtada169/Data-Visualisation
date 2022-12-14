// set the dimensions and margins of the graph
var margin7 = {top7: 10, right7: 30, bottom7: 60, left7: 50},
width7 = 800 - margin7.left7 - margin7.right7,
height7 = 350 - margin7.top7 - margin7.bottom7;

// create the tooltip
var divTooltip = d3.select("#graph7").append("div")
.attr("class", "toolTip")
.style('opacity', 0);

// append the svg object to the body of the page
var svg7 = d3.select("#graph7")
.append("svg")
.attr("width", width7 + margin7.left7 + margin7.right7)
.attr("height", height7 + margin7.top7 + margin7.bottom7)
.append("g")
.attr("transform", "translate(" + margin7.left7 + "," + margin.top7 + ")");

// Parse the Data
d3.csv("StudentDataToDoSliced.csv", function(data) {
    var groups = d3.map(data, function(d){return(d["Occupation of Mother"])}).keys();
    console.log(groups);
    var subgroups = data.columns.slice(1);
    console.log(subgroups)

    // Add X axis
    var x7 = d3.scaleBand().domain(groups).range([0,width7]);
    svg7.append("g")
    .attr("transform", "translate(0," + height7 + ")")
    .call(d3.axisBottom(x7).tickSizeOuter(0));

    // Label for x axis
    svg7.append("text")             
    .attr("transform","translate(" + (width7 / 2) + " ," + (height7 + margin7.top7 + 30) + ")")
    .style("text-anchor", "middle")
    .text("Occupation of Mother")
    .style("fill", "white");

    // Add Y axis
    var y7 = d3.scaleLinear().domain([0, 20]).range([height7,0]);
    svg7.append("g")
    .call(d3.axisLeft(y7));

    // Label for y axis
    svg7.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin7.left7)
    .attr("x",0 - (height7 / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("fill", "white")
    .text("Grade");  

    // Another scale for subgroup position
    var xSubgroup7 = d3.scaleBand().domain(subgroups).range([0, x7.bandwidth()]).padding([0.2]);

    // color palette
    var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(["#6D9886", "#4E6C50", "#628E90"]);

    // Show the bars
    svg7.append("g")
    .selectAll("g")
    .data(data).enter().append("g")
    .attr("transform", function(d) { return "translate(" + x7(d["Occupation of Mother"]) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
    .attr("x", function(d) { return xSubgroup7(d.key); })
    .attr("y", function(d) { return y7(d.value); })
    .attr("width", xSubgroup7.bandwidth())
    .attr("height", function(d) { return height7 - y7(d.value); })
    .attr("fill", function(d) { return color(d.key); })
    .on("mouseover", function(d){
        divTooltip.transition()
        .duration(200)
        .style("opacity", .9);
        var elements = document.querySelectorAll(':hover');
        l = elements.length
        l -=1
        elementData = elements[l].__data__;
        var activeBar = window.activeBar = elements[l];
        divTooltip.html(elementData.key + "<br>Score: " + elementData.value)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d){
        divTooltip.transition()
        .duration(500)
        .style('opacity', 0);
    });
})