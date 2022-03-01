 export function funkyButton(container_name, data) {
   this.container_name = container_name;
   this.container_class = "." + container_name;
   this.data = data;
   this.empty_container = function(){
     $(this.container_class).empty();
   },
   this.draw_chart = function() {

     this.empty_container();

     var margin = {top: 50, right: 50, bottom: 50, left: 50};
     var width = $(this.container_class).width() - margin.left - margin.right;
     //var height = (this.data.length * 100) + 100 - margin.top - margin.bottom;

     var cta_width = $("#" + this.container_name + "_cta").width();
     var cta_height = $("#" + this.container_name + "_cta").height();

     var pitch_width = $("#" + this.container_name + "_pitch").width();
     var pitch_height = $("#" + this.container_name + "_pitch").height();

    var height = cta_width + pitch_height + margin.top + margin.bottom;

       // append the svg object to the body of the page
      const svg = d3.select(this.container_class)
        .append("svg")
        .attr("width", width)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${width/2}, ${margin.top})`);

        svg.append("foreignObject")
            .attr("x", -(cta_width/3))
            .attr("y", margin.top)
            //.attr("width", $("#funky_button1_cta").width())
            //.attr("height", $("#funky_button1_cta").height())
            .attr("height", cta_height)
            .attr("width", cta_width)
          .append("xhtml:body")
            .html(`<div class="text-center">
                  <button type="button" class="button2">${this.data.cta}</button>
                </div>`);

   };

 }
