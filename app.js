/**
 * Created by nmondon on 18/02/14.
 */

'use strict';
(function(d3, $, containerSelector){

  // jquery container tag
  var $container = $(containerSelector)
    , svg = d3.select(containerSelector)
      .append('svg')
      .attr('class', 'd3-svg')
      // a container for communes path
    , gCommunes = svg.append('svg:g');

  (function setup(){
    /* set up */
    d3.json('data/communes.topojson', draw);
  })();

  function draw(communes){

    console.log('draw');

    var width = $container.width()
      , height = $container.height()
      // projection see http://d3js.org
      , projection = d3.geo.albers()
        .scale(5000)
        .center([1, 46.5])
        .rotate([-2, 0])
        .parallels([30, 50])
        .translate([width/2, height/2])
      // path
      , path = d3.geo.path()
      .projection(projection);


    // draw topojson
    var communesPath = gCommunes.selectAll('.commune').data(topojson.feature(communes, communes.objects.commune).features);
    communesPath.enter().append('svg:path')
      .attr('class', function(d,i){
        return 'commune ' + (parseInt(d.id)%2 == 0 ? 'commune-paire' : 'commune-impaire');
      })
      .attr('d', path);


  };

})(d3, jQuery, '.container')