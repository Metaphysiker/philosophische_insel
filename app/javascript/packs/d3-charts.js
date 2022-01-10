console.log("d3-charts");

export function AreaChart(container_class) {
   this.container_class = container_class;
   this.log = function() {
     console.log(this.container_class);
   };
 }

 export function HorizontalBarChart(container_class, data) {
   this.container_class = container_class;
   this.data = data;
   this.get_max_value_of_array_with_hashes = function(data){
     var array_with_values = [];
     for (var i = 0; i < data.length; i++) {
       array_with_values.push(data[i].value);
    }

    return Math.max(...array_with_values);

   },
   this.draw_chart = function() {

     var margin = {top: 50, right: 50, bottom: 50, left: 50};
     var width = $(container_class).width() - margin.left - margin.right;
     var height = this.data.length * 100 - margin.top - margin.bottom;

       // append the svg object to the body of the page
      const svg = d3.select(this.container_class)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Add X axis
        const x = d3.scaleLinear()
          .domain([0, this.get_max_value_of_array_with_hashes(data)])
          .range([ 0, width]);
        svg.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x))
          .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Y axis
        const y = d3.scaleBand()
          .range([ 0, height ])
          .domain(data.map(d => d.name))
          .padding(.5);

        svg.append("g")
          .call(d3.axisLeft(y).tickSize(0).tickValues([]));

        //Bars
        svg.selectAll("myRect")
          .data(data)
          .join("rect")
          .attr("x", x(0) )
          .attr("y", d => y(d.name))
          .attr("width", d => x(d.value))
          .attr("height", y.bandwidth())
          .attr("fill", "#00c39b");

          //add Text to the bars
          svg.append("g")
              .attr("fill", "#2c4959")
              .attr("font-family", "sans-serif")
            .selectAll("text")
            .data(data)
            .join("text")
              //.attr("x", d => x(d.value))
              .attr("x", d => x(0) + 10)
              .attr("y", d => y(d.name) - y.bandwidth()/4)
              .attr("dy", "0.35em")
              .attr("dx", -4)
              .text(d => d.name);

   };

 }
