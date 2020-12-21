// Plot builder
export function buildFrameRatePlot(svg, width, height) {  
    // var some parameters for drawing this
            var margin = 16;
    
            // clean clear our svg
            svg.selectAll("g").remove();
    
            svg.append("rect")
                .attr("height", height)
                .attr("width", width)
                .style("fill", "white")
    
            // plot container
            let container = svg
                .append("g")
    
            // create my scales
            var y = d3.scaleLinear()
                .domain([0, 120])
                .range([height - margin, 0])
            var x = d3.scaleLinear()
                .domain([0, 900])
                .range([0, width - margin * 2])
    
        var yAxis = g => g
            .attr("transform", `translate(30,8)`)
            .call(d3.axisLeft(y))
        var xAxis = g => g
            .attr("transform", `translate(30, ${height - 8})`)
            .call(d3.axisBottom(x))
    
        svg.append("g")
            .call(yAxis);
        svg.append("g")
            .call(xAxis);
}