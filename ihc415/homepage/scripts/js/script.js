var w = 500,
	h = 500;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['Projects Not Started','Projects In Progress','Projects Completed'];


//Data
var d = [
		  [
			{axis:"Bear River",value:.12},
			{axis:"Cassia",value:.04},
			{axis:"Logan",value:0.01},
			{axis:"McKay-Dee",value:0.18},
			{axis:"RCO",value:.00},
			{axis:"Risk Mgmt",value:0.00}
		  ],[
			{axis:"Bear River",value:0.19},
			{axis:"Cassia",value:0.22},
			{axis:"Logan",value:0.17},
			{axis:"McKay-Dee",value:0.17},
			{axis:"RCO",value:1.00},
			{axis:"Risk Mgmt",value:0.18}
		  ],[
			{axis:"Bear River",value:0.69},
			{axis:"Cassia",value:0.74},
			{axis:"Logan",value:0.72},
			{axis:"McKay-Dee",value:0.65},
			{axis:"RCO",value:0.00},
			{axis:"Risk Mgmt",value:0.82}
		  ]
		];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.6,
  levels: 6,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#chart", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("Percent (%) Completion of Each Facility's Projects");
		
//Initiate Legend	
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;