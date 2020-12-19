function buildFrameRatePlot(svg, width, height, data) {
  
    var layoutMeasures = {
      width : width,
      height : height,
      plotPadding: [24,24,24,24], // top, right, bottom, left
      get plotWidth()
      { 
        return layoutMeasures.width - layoutMeasures.plotPadding[1] - layoutMeasures.plotPadding[3]
      },
      get plotHeight(){
        return layoutMeasures.height - layoutMeasures.plotPadding[0] - layoutMeasures.plotPadding[2]
      }
    }

    // clean clear our svg
    svg.selectAll("g").remove();

    // plot container
    let container = svg
        .append("g")
        .attr("height", layoutMeasures.plotHeight)
        .attr("width", layoutMeasures.plotWidth)
        .attr("transform", `translate(${layoutMeasures.plotPadding[0]}, ${layoutMeasures.plotPadding[3]})`);
    
    container.append("rect")
        .attr("height", layoutMeasures.plotHeight)
        .attr("width", layoutMeasures.plotWidth)
        .style("fill", "#F7F7F7")

    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([layoutMeasures.plotHeight, 0])
    var x = d3.scaleLinear()
        .domain([0, 900])
        .range([0, layoutMeasures.plotWidth])
    var line = d3.line()
      .defined(d => !isNaN(d.x))
      .defined(d => !isNaN(d.y))
      .x(d => x(d.x))
      .y(d => y(d.y))

var yAxis = g => g
    .attr("transform",`translate(0,0)`)
    .call(d3.axisLeft(y))
var xAxis = g => g
    .attr("transform",`translate(0,${layoutMeasures.plotHeight})`)
    .call(d3.axisBottom(x))

container.append("g")
    .call(yAxis);
container.append("g")
    .call(xAxis);

container.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1)
  .attr("d", line);
}