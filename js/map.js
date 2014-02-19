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
    , gCommunes = svg.append('svg:g')
    , communesPath = null;

  (function setup(){
    /* set up */
    d3.json('data/communes.topojson', draw);
  })();

  /**
   * init draw
   * @param communes
   */
  function draw(communes){

    console.log('draw');

    var width = $container.width()
      , height = $container.height()
      // projection see http://d3js.org
      , projection = d3.geo.albers()
        .scale(3000)
        .center([1, 46.5])
        .rotate([-2, 0])
        .parallels([30, 50])
        .translate([width/2, height/2])
      // path
      , path = d3.geo.path()
      .projection(projection);


    // draw topojson
    communesPath = gCommunes.selectAll('.commune').data(topojson.feature(communes, communes.objects.commune).features);
    communesPath.enter().append('svg:path')
      .attr('class', 'commune')
      .attr('d', path);
  };

  /**
   * salary
   */
  function salary(){

    d3.json('data/salaires-2010.json', function(salaries){
      var salaryScale = d3.scale.linear()
        .domain([0, 30])
        .range(['#ffffff', '#0000ff'])
				, getSalary = function(d){
					if(d.id.match(/^75/)){ // arrondissements parisiens
						return salaryScale(salaries['75056']);
					}else if(d.id.match(/^6938/)){ // arrondissements lyon
						return salaryScale(salaries['69123']);
					}else if(d.id.match(/^132/)){ // arrondissements marseille
						return salaryScale(salaries['13055'	]);
					}else if(d.id in salaries){
						return salaryScale(salaries[d.id]);
					}else {
						return 'white';
					}
				};

      communesPath && communesPath.transition().duration(1)
        .style('fill', getSalary)
        .style('stroke', getSalary);
    });
  };

  $('.salary').on('click', salary);

  function evolPop(){
    d3.json('data/evolution-population-99-10.json', function(evols){
      var evolScale = d3.scale.linear()
        .domain([-50,0,50])
        .range(['red', 'white', 'blue'])
        , getEvolPop = function(d){
          if(d.id.match(/^75/)){ // arrondissements parisiens
            return evolScale(evols['75056']);
          }else if(d.id.match(/^6938/)){ // arrondissements lyon
            return evolScale(evols['69123']);
          }else if(d.id.match(/^132/)){ // arrondissements marseille
            return evolScale(evols['13055'	]);
          }else if(d.id in evols){
            return evolScale(evols[d.id]);
          }else {
            return 'white';
          }          
        };

      communesPath && communesPath.transition().duration(1)
        .style('fill', getEvolPop)
        .style('stroke', getEvolPop);
    });
  };

  $('.evol').on('click', evolPop);

})(d3, jQuery, '.container');