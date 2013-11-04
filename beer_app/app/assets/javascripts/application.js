// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require underscore
//= require handlebars
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require d3.v3.min
//= require topojson.v0.min
//= require backbone
//= require_tree .

function beerMe() {

  var width = 960,
    height = 500;

  var projection = d3.geo.mercator()
    .center([0, 5 ])
    .scale(900)
    .rotate([-180,0]);

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

  var path = d3.geo.path()
    .projection(projection);

  var g = svg.append("g");

  // load and display the World
  d3.json("world-110m2.json", function(error, topology) {

  // load and display the cities
  d3.json("/beer_feed", function(error, data) {
    g.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
       .attr("cx", function(d) {
               return projection([d.longitude, d.latitude])[0];
       })
       .attr("cy", function(d) {
               return projection([d.longitude, d.latitude])[1];
       })
       .attr("r", 20)
       .style("fill", "orange");
  });


  g.selectAll("path")
      .data(topojson.object(topology, topology.objects.countries)
          .geometries)
    .enter()
      .append("path")
      .attr("d", path)
  });

  // zoom and pan
  var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        g.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g.selectAll("circle")
            .attr("d", path.projection(projection));
        g.selectAll("path")  
            .attr("d", path.projection(projection)); 

  });

  svg.call(zoom)
}