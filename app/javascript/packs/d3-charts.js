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
          .attr("width", x.bandwidth()/2 - 5)
          .attr("height", d => height - y(d.value))
          .attr("fill", "#00c39b");

        //second bars
        svg.selectAll("myRect")
          .data(data)
          .join("rect")
          .attr("y", d => y(d.value2))
          .attr("x", d => x(d.name) + x.bandwidth()/2 + 5)
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
