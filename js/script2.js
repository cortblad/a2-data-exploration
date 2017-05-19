

$(function() {
   d3.csv('data/data.csv', function(data){
        data.forEach(function(d) {
                d.ETHNICITY = d.ETHNICITY;
                d.FEMALE = +d.FEMALE;
                d.MALE = +d.MALE;
                d.TOTAL = +d.TOTAL;
        });
        // var svg = d3.select("#vis")
        //         .append("svg"),

        var svg = d3.select("svg"),
                // .append("svg"),                
            width = +svg.attr("width"),
            height = +svg.attr("height"),
            radius = Math.min(width, height) / 2,
            g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var pie = d3.pie()
            .sort(null)
            .value(function(d) { return +d.TOTAL; });

        var path = d3.arc()
            //.stroke("#fff")
            .outerRadius(radius - 10)
            .innerRadius(0);

        var label = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        // d3.csv("data/data.csv", function(d) {
        // d.TOTAL = +d.TOTAL;
        // d.ETHNICITY = d.ETHNICITY
        // return d;
        // }, function(error, data) {
        // if (error) throw error;

        var arc = g.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        arc.append("path")
            .attr("d", path)
            .attr("fill", function(d) { return color(d.data.ETHNICITY); });

        arc.append("text")
            .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
            .attr("dy", "0.75em")
            .style("font", "9px arial")
            .text(function(d) { console.log(d); return d.data.ETHNICITY; });
        });
    });                     
    
    
    
// });