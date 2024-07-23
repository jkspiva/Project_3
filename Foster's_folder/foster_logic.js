// Width, height, and margin for the chart
const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Select the chart container
const svg = d3.select("#chart-container")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Read the CSV data
d3.csv("alc.csv").then(function(data) {
    // Extract unique states from the data
    const states = [...new Set(data.map(d => d.State))];

    // Define color scale for lines
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // X scale (years)
    const xScale = d3.scaleLinear()
                     .domain(d3.extent(data, d => +d.Year))
                     .range([0, width]);

    // Y scale (beer consumption)
    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(data, d => +d["All beverages (Per capita consumption)"])])
                     .range([height, 0]);

    // Line generator
    const line = d3.line()
                   .x(d => xScale(+d.Year))
                   .y(d => yScale(+d["All beverages (Per capita consumption)"]));

    // Draw lines for each state
    states.forEach(state => {
        const stateData = data.filter(d => d.State === state);

        svg.append("path")
           .datum(stateData)
           .attr("class", "line")
           .attr("d", line)
           .style("stroke", () => color(state))
           .style("stroke-width", 2)
           .style("fill", "none");

        // Add text label for each state near the end of the line
        svg.append("text")
           .datum(stateData[stateData.length - 1])
           .attr("transform", d => `translate(${xScale(d.Year)}, ${yScale(d["Beer (Per capita consumption)"])})`)
           .attr("x", 5)
           .attr("dy", "0.35em")
           .style("font", "10px sans-serif")
           .text(state);
    });

    // Add X-axis
    svg.append("g")
       .attr("transform", `translate(0, ${height})`)
       .call(d3.axisBottom(xScale).ticks(10))
       .append("text")
       .attr("x", width / 2)
       .attr("y", margin.bottom - 10)
       .attr("fill", "#000")
       .attr("text-anchor", "middle")
       .text("Year");

    // Add Y-axis
    svg.append("g")
       .call(d3.axisLeft(yScale))
       .append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", -margin.left)
       .attr("x", -height / 2)
       .attr("dy", "0.71em")
       .attr("fill", "#000")
       .attr("text-anchor", "middle")
       .text("All beverages (Per capita consumption)");

    // Add chart title
    svg.append("text")
       .attr("x", width / 2)
       .attr("y", -margin.top / 2)
       .attr("text-anchor", "middle")
       .style("font-size", "18px")
       .text("Alcohol Consumption by State Over Years");
});