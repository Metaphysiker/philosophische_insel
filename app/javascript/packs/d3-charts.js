 export function HorizontalBarChart(container_class, data) {
   this.container_class = container_class;
   this.data = data;
   this.empty_container = function(){
     $(this.container_class).empty();
   }
   this.get_max_value_of_array_with_hashes = function(data){
     var array_with_values = [];
     for (var i = 0; i < data.length; i++) {
       array_with_values.push(data[i].value);
    }

    return Math.max(...array_with_values);

   },
   this.draw_chart = function() {

     this.empty_container();

     var margin = {top: 50, right: 50, bottom: 50, left: 50};
     var width = $(container_class).width() - margin.left - margin.right;
     var height = (this.data.length * 100) + 100 - margin.top - margin.bottom;
     //var height = 500 - margin.top - margin.bottom;

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

          //add name above the bars
          svg.append("g")
              .attr("fill", "black")
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

          //add value inside the bars
          svg.append("g")
              .attr("fill", "black")
              .attr("font-family", "sans-serif")
            .selectAll("text")
            .data(data)
            .join("text")
              //.attr("x", d => x(d.value))
              .attr("x", d => x(0) + 10)
              .attr("y", d => y(d.name) + y.bandwidth()/2)
              .attr("dy", "0.35em")
              .attr("dx", -4)
              .text(d => d.value);

   };

 }

 export function VerticalBarChart(container_class, data) {
   this.container_class = container_class;
   this.data = data;
   this.empty_container = function(){
     $(this.container_class).empty();
   }
   this.get_max_value_of_array_with_hashes = function(data){
     var array_with_values = [];
     for (var i = 0; i < data.length; i++) {
       array_with_values.push(data[i].value);
    }

    return Math.max(...array_with_values);

   },
   this.draw_chart = function() {

     this.empty_container();

     var margin = {top: 50, right: 50, bottom: 50, left: 50};
     var width = $(container_class).width() - margin.left - margin.right;
     var height = 500 - margin.top - margin.bottom;

       // append the svg object to the body of the page
      const svg = d3.select(this.container_class)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Add y axis
        const y = d3.scaleLinear()
          .domain([0, this.get_max_value_of_array_with_hashes(data)])
          .range([ height, 0]);

        svg.append("g")
          .attr("transform", `translate(0, 0)`)
          .call(d3.axisLeft(y))
          .selectAll("text")
            //.attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // x axis
        const x = d3.scaleBand()
          .range([ 0, width ])
          .domain(data.map(d => d.name))
          .padding(.1);

        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        //Bars
        svg.selectAll("myRect")
          .data(data)
          .join("rect")
          .attr("y", d => y(d.value))
          .attr("x", d => x(d.name))
          .attr("width", x.bandwidth())
          .attr("height", d => height - y(d.value))
          .attr("fill", "#00c39b");

          //add value at top of the bars
          svg.append("g")
              .attr("fill", "black")
              .attr("font-family", "sans-serif")
              .attr("font-size", 12)
            .selectAll("text")
            .data(data)
            .join("text")
              .style("text-anchor", "middle")
              //.attr("x", d => x(d.value))
              .attr("x", d => x(d.name) + (x.bandwidth()/2))
              .attr("y", d => y(d.value))
              .attr("dy", -10)
              .attr("dx", 5)
              .text(d => d.value);

   };

 }

 export function VerticalBarChartGroupedTwo(container_class, data) {
   this.container_class = container_class;
   this.data = data;
   this.empty_container = function(){
     $(this.container_class).empty();
   }
   this.get_max_value_of_array_with_hashes = function(data){
     var array_with_values = [];
     for (var i = 0; i < data.length; i++) {
       array_with_values.push(data[i].value);
    }

    return Math.max(...array_with_values);

   },
   this.draw_chart = function() {

     this.empty_container();

     var margin = {top: 50, right: 50, bottom: 50, left: 50};
     var width = $(container_class).width() - margin.left - margin.right;
     var height = 500 - margin.top - margin.bottom;

       // append the svg object to the body of the page
      const svg = d3.select(this.container_class)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Add y axis
        const y = d3.scaleLinear()
          .domain([0, this.get_max_value_of_array_with_hashes(data)])
          .range([ height, 0]);

        svg.append("g")
          .attr("transform", `translate(0, 0)`)
          .call(d3.axisLeft(y))
          .selectAll("text")
            //.attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // x axis
        const x = d3.scaleBand()
          .range([ 0, width ])
          .domain(data.map(d => d.name))
          .padding(.1);

        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        //first bars
        svg.selectAll("myRect")
          .data(data)
          .join("rect")
          .attr("y", d => y(d.value))
          .attr("x", d => x(d.name))
          .attr("width", x.bandwidth()/2 - 1)
          .attr("height", d => height - y(d.value))
          .attr("fill", "#00c39b");

        //second bars
        svg.selectAll("myRect")
          .data(data)
          .join("rect")
          .attr("y", d => y(d.value2))
          .attr("x", d => x(d.name) + (x.bandwidth()/2) + 1)
          .attr("width", x.bandwidth()/2)
          .attr("height", d => height - y(d.value2))
          .attr("fill", "red");

          //add value at top of the bars
          svg.append("g")
              .attr("fill", "black")
              .attr("font-family", "sans-serif")
              .attr("font-size", 12)
            .selectAll("text")
            .data(data)
            .join("text")
              .style("text-anchor", "end")
              //.attr("x", d => x(d.value))
              .attr("x", d => x(d.name) + (x.bandwidth()/4))
              .attr("y", d => y(d.value))
              .attr("dy", -10)
              .attr("dx", 5)
              .text(d => d.value);

              //add value2 at top of the bars
              svg.append("g")
                  .attr("fill", "black")
                  .attr("font-family", "sans-serif")
                  .attr("font-size", 12)
                .selectAll("text")
                .data(data)
                .join("text")
                  .style("text-anchor", "end")
                  //.attr("x", d => x(d.value))
                  .attr("x", d => x(d.name) + ((x.bandwidth()/4)*3))
                  .attr("y", d => y(d.value2))
                  .attr("dy", -10)
                  .attr("dx", 5)
                  .text(d => d.value2);

   };

 }


 export function DonutChart(container_class, data) {
   this.container_class = container_class;
   this.data = data;
   this.empty_container = function(){
     $(this.container_class).empty();
   };
   this.names_of_data = function(){
     var names = [];
     for (var i = 0; i < this.data.length; i++) {
       names.push(this.data[i].name);
     }
     return names;
   };
   this.values_of_data = function(){
     var values = [];
     for (var i = 0; i < this.data.length; i++) {
       values.push(this.data[i].values);
     }
     return values;
   };
   this.draw_chart = function() {

     this.empty_container();

     var margin = {top: 50, right: 50, bottom: 50, left: 50};
     var width = $(container_class).width() - margin.left - margin.right;
     var height = 500;
     //var height = (this.data.length * 100) + 100 - margin.top - margin.bottom;
     //var height = 500 - margin.top - margin.bottom;

     // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
     var radius = Math.min(width, height) / 2 - 40;

       // append the svg object to the body of the page
      const svg = d3.select(this.container_class)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${width/2},${height/2})`);

          // Create dummy data
          //data = {a: 9, b: 20, c:30, d:8, e:12, f:3, g:7, h:14}

          // set the color scale
          var data_keys = this.names_of_data();
          var color = d3.scaleOrdinal().domain(this.names_of_data()).range(d3.schemeDark2);

          // Compute the position of each group on the pie:
          var pie = d3.pie()
            .sort(null) // Do not sort group by size
            .value(d => d.value)

        var data_ready = pie(this.data);

        // The arc generator
        var arc = d3.arc()
          .innerRadius(radius * 0.5)         // This is the size of the donut hole
          .outerRadius(radius * 0.8)

        // Another arc that won't be drawn. Just for labels positioning
        var outerArc = d3.arc()
          .innerRadius(radius * 0.9)
          .outerRadius(radius * 0.9)

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
          .selectAll('allSlices')
          .data(data_ready)
          .join('path')
          .attr('d', arc)
          .attr('fill', d => color(d.index % this.data.length))
          .attr("stroke", "white")
          .style("stroke-width", "2px")
          .style("opacity", 0.7)

        // Add the polylines between chart and labels:
        svg
          .selectAll('allPolylines')
          .data(data_ready)
          .join('polyline')
            .attr("stroke", "black")
            .style("fill", "none")
            .attr("stroke-width", 1)
            .attr('points', function(d) {
              var posA = arc.centroid(d) // line insertion in the slice
              var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
              var posC = outerArc.centroid(d); // Label position = almost the same as posB
              var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
              posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
              return [posA, posB, posC]
            })

        // Add the polylines between chart and labels:
        svg
          .selectAll('allLabels')
          .data(data_ready)
          .join('text')
            .text(d => this.names_of_data()[d.index] + " - " + d.value)
            .attr('transform', function(d) {
                var pos = outerArc.centroid(d);
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return `translate(${pos})`;
            })
            .style('text-anchor', function(d) {
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                return (midangle < Math.PI ? 'start' : 'end')
            })
            //end of DonutChart

   };

 }
