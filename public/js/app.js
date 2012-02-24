/* Setting up block data */
var ictLayer, map, interaction;
var ictLayers = ["http://opmilld.no.de/v2/tt-digital_access_index",
    "http://opmilld.no.de/v2/tt-ict-underserved-communities",
    "http://opmilld.no.de/v2/tt-underserved-comm-blocks",
    "http://opmilld.no.de/v2/tt-underserved-comm-blocks"];
    
    /*
    ictLayers urlDAI = "http://opmilld.no.de/v2/tt-digital_access_index",
    urlCommunities = "http://opmilld.no.de/v2/tt-ict-underserved-communities",
    urlBlocks = "http://opmilld.no.de/v2/tt-underserved-comm-blocks",
    urlBaskets = "http://opmilld.no.de/v2/tt-underserved-comm-blocks";
    */
    
    blocks =
[
  { 'block': 'block 1', 'noData': true },
  { 'block': 'block 2' },
  { 'block': 'block 3' },
  { 'block': 'block 4' },
  { 'block': 'block 5' },
  { 'block': 'block 6' },
  { 'block': 'block 7' },
  { 'block': 'block 8', 'noData': true },
  { 'block': 'block 9' },
  { 'block': 'block 10' },
  { 'block': 'block 11' },
  { 'block': 'block 12' }
    ];

var mInteraction, mLegend;

/* Using Foundation v2.1.5 http://foundation.zurb.com 
   A powerful and flexible framework for Grids, Buttons, Forms, LayoutUI, etc.
*/
$(document).ready(function () {
    
    $("#ict-dai").click(function (e) {
        e.preventDefault(); 
        callMapM(ictLayers[0],0);
    });
    $("#ict-ucomm").click(function (e) {
        e.preventDefault(); 
        callMapM(ictLayers[1],0);
    });
    $("#ict-ublks").click(function (e) {
        e.preventDefault(); 
        callMapM(ictLayers[2],0);
    });
    $("#ict-ubskts").click(function (e) {
        e.preventDefault(); 
        callMapM(ictLayers[3],0);
    });

	/* Use this js doc for all application specific JS */

	/* TABS --------------------------------- */
	/* Remove if you don't need :) */

	function activateTab($tab) {
		var $activeTab = $tab.closest('dl').find('a.active'),
				contentLocation = $tab.attr("href") + 'Tab';

		//Make Tab Active
		$activeTab.removeClass('active');
		$tab.addClass('active');

    	//Show Tab Content
		$(contentLocation).closest('.tabs-content').children('li').hide();
		$(contentLocation).show();
	}

	$('dl.tabs').each(function () {
		//Get all tabs
		var tabs = $(this).children('dd').children('a');
		tabs.click(function (e) {
			activateTab($(this));
		});
	});

	if (window.location.hash) {
		activateTab($('a[href="' + window.location.hash + '"]'));
	}

	/* ALERT BOXES ------------ */
	$(".alert-box").delegate("a.close", "click", function(event) {
    event.preventDefault();
	  $(this).closest(".alert-box").fadeOut(function(event){
	    $(this).remove();
	  });
	});


	/* PLACEHOLDER FOR FORMS ------------- */
	/* Remove this and jquery.placeholder.min.js if you don't need :) */

	$('input, textarea').placeholder();



	/* UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE6/7/8 SUPPORT AND ARE USING .block-grids */
//	$('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'left'});
//	$('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'left'});
//	$('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'left'});
//	$('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'left'});



	/* DROPDOWN NAV ------------- */

	var lockNavBar = false;
	$('.nav-bar a.flyout-toggle').live('click', function(e) {
		e.preventDefault();
		var flyout = $(this).siblings('.flyout');
		if (lockNavBar === false) {
			$('.nav-bar .flyout').not(flyout).slideUp(500);
			flyout.slideToggle(500, function(){
				lockNavBar = false;
			});
		}
		lockNavBar = true;
	});
  if (Modernizr.touch) {
    $('.nav-bar>li.has-flyout>a.main').css({
      'padding-right' : '25px',
    });
    $('.nav-bar>li.has-flyout>a.flyout-toggle').css({
      'border-left' : '1px dashed #eee'
    });
  } else {
    $('.nav-bar>li.has-flyout').hover(function() {
      $(this).children('.flyout').show();
    }, function() {
      $(this).children('.flyout').hide();
    })
  }


	/* DISABLED BUTTONS ------------- */
	/* Gives elements with a class of 'disabled' a return: false; */
	
  /*Call the data table functions*/
  addTableElements('table-div'); 
  buildTable('data_sources/blocks2.json');

  /* Map */
  callMapM(ictLayers[0],1);
  addMapButtons_Blocks();
  /*addMapButtons('mapButtons-div','http://opmilld.no.de/v2/tt-digital_access_index',
   'http://opmilld.no.de/v2/tt-digital_access_index',
   'http://opmilld.no.de/v2/tt-digital_access_index');*/

  /* d3 Chart */
  d3Chart();





/*  jQuery click function 
    For MapBox Map */

    $('#sidebar ul.layerswitch a').click(function (e) {
      e.preventDefault();
      $('#sidebar ul.layerswitch a').removeClass('active');
      $(this).addClass('active');
      layer = this.id;
      refreshMap();
    });
  });



function callMapM(source,ini) {
    /*
        Using ModestMaps
        */
    var tilejson = {
        tilejson: '1.0.0',
        scheme: 'xyz',
        tiles: [source + '/{z}/{x}/{y}.png']
    };
 
    var url = source + '.json';
    var mm = com.modestmaps;
    var wxm = wax.mm;
    var locations;

    
    wax.tilejson(url, function(tilejson) {
        
    ictLayer = new wxm.connector(tilejson);
        
        if (ini !== 1){
            $('.wax-legends').remove();
            $('.wax-tooltip').remove();
            interaction.remove();
            //map.removeLayerAt(0);
            map = new mm.Map('map-div', ictLayer).
            setCenterZoom(new mm.Location(10.641743690271975, -61.27819824218748), 10);
            interaction = wxm.interaction(map, tilejson);
            wxm.fullscreen(map, tilejson).appendTo(map.parent);
            wxm.zoomer(map, tilejson).appendTo(map.parent);
            wxm.legend(map, tilejson).appendTo(map.parent);
            /*
            locations = [
              new mm.Location(-62.5466,9.9526),
              new mm.Location(-59.8687,11.1542)
            ];
            map.setExtent(locations);
            */
        }
        else{ 
            // Set up a map in a div with the id 'map-div'
            map = new mm.Map('map-div', ictLayer).
            setCenterZoom(new mm.Location(10.641743690271975, -61.27819824218748), 10);
            interaction = wxm.interaction(map, tilejson);
            wxm.fullscreen(map, tilejson).appendTo(map.parent);
            wxm.zoomer(map, tilejson).appendTo(map.parent);
            wxm.legend(map, tilejson).appendTo(map.parent);
            /*
            locations = [
              new mm.Location(-62.5466,9.9526),
              new mm.Location(-59.8687,11.1542)
            ];
            map.setExtent(locations);
            */
        }
    });
}


function callMapL(source,ini) {
    /*
        Using Leaflet
        */
    var tilejson = {
		tilejson: '1.0.0',
		scheme: 'xyz',
		tiles: [source + '/{z}/{x}/{y}.png']
	};
 
	var url = source + '.json';
    
    
	wax.tilejson(url, function(tilejson) {
        
        var southWest = new L.LatLng(-62.5466,9.9526),
        northEast = new L.LatLng(-59.8687,11.1542),
        bounds = new L.LatLngBounds(southWest, northEast);
        
        
        ictLayer = new wax.leaf.connector(tilejson);
        
        if (ini !== 1){
            interaction.remove();
            map.removeLayer(ictLayer );
            map.addLayer(ictLayer).
            setView(new L.LatLng(10.641743690271975, -61.27819824218748), 10);
            interaction = wax.leaf.interaction(map, tilejson);
            //wax.leaf.legend(map, tilejson).appendTo(map.parent); 
            wax.mm.legend(map, tilejson).appendTo(map);
        }
        else{ 
            // Set up a map in a div with the id 'map-div'
            map = new L.Map('map-div', {minZoom: 8}).
            addLayer(ictLayer).
            setView(new L.LatLng(10.641743690271975, -61.27819824218748), 10);
            $('.leaflet-control-attribution').remove();
            interaction = wax.leaf.interaction(map, tilejson);
            //wax.leaf.legend(map, tilejson).appendTo(map.parent);
            wax.mm.legend(map, tilejson).appendTo(map);
        }
	});
}



/* Build the DataTable with data from any json source */

function buildTable(source) {
	var aSelected = [];
	$('#data-table').dataTable({
        "aoColumnDefs": [ 
                    { "bSearchable": true, "bVisible": false, "aTargets": [ 0 ] }
                    ]   ,    
		"bProcessing": true,
		"bJQueryUI": true,
		"sPaginationType": "full_numbers",
		"sAjaxSource": source,
		"fnRowCallback": function(nRow, aData, iDisplayIndex) {
			if (jQuery.inArray(aData.DT_RowId, aSelected) !== -1) {
				$(nRow).addClass('row_selected');
			}
		}
	});


	/* Click event handler */
	$('#example tbody tr').live('click', function() {
		var id = this.id;
		var index = jQuery.inArray(id, aSelected);

		if (index === -1) {
			aSelected.push(id);
		}
		else {
			aSelected.splice(index, 1);
		}

		$(this).toggleClass('row_selected');
	});

}
/* Add elements to data table */

function addTableElements(source) {
    $('<table id="data-table" class="display">'+
        '<thead>' + 
            '<tr>' + 
                '<th>Block name</th>' + 
                '<th width=15%">Country</th>' + 
                '<th>Geographical Region</th>' + 
                '<th>Community</th>' + 
                '<th>Area (km)</th>' + 
                '<th>No. of Households</th>' + 
                '<th>Population</th>' + 
                '<th>Population Density</th>' +
            '</tr>' + 
        '</thead>' + 
        '<tfoot>' + 
            '<tr>' + 
                '<th>Block name</th>' + 
                '<th>Country</th>' + 
                '<th>Geographical Region</th>' + 
                '<th>Community</th>' + 
                '<th>Area (km)</th>' + 
                '<th>No. of Households</th>' + 
                '<th>Population</th>' + 
                '<th>Population Density</th>' +
            '</tr>' + 
        '</tfoot>'+
    '</table>').appendTo('#'+source);
}

function filterTable(blockName)
{
    $('#data-table').dataTable().fnFilter( 
        blockName,
        0, 
        false, 
        false
    );
}
/*  Dynamicall add buttons to the map
 */
 
function addMapButtons(source,map1,map2,map3){
    
$('<ul class="layerswitch">'+
					'<li><a id=' + map1 + ' href="#">2008</a></li>'+
					'<li><a id=' + map2 + ' href="#">2009</a></li>'+
					'<li><a id=' + map3 + ' href="#">2010</a></li>'+
				'</ul>').appendTo('#'+source); 
}

function addMapButtons_Blocks() {
	$('<li class="block"><a id="block" class="small radius blue button" href="#block">All</a></li>').appendTo('#blockButtons-div ul');
	for (var i = 0; i < blocks.length; i++) {
		var isBlock = "block";
		if (blocks[i].noData) {
			isBlock = "no-block";
		}

		$('<li class="' + isBlock + '"><a class="small nice radius white button" id="' + blocks[i].block + '" href="#' + blocks[i].block + '">' + blocks[i].block + '</a></li>').appendTo('#blockButtons-div ul');
	}

	$('#blockButtons-div a').click(

	function(e) {
		e.preventDefault();
		filterTable(e.delegateTarget.id);
	});
}

/* 
   Using JQuery UI for dragging and dropping viz. for user interaction with Blocks and baskets
*/
$(function() {
    $("#basket0").sortable({
        connectWith: "ul",
        placeholder: "ui-state-highlight",
        containment: "#containment-wrapper",
        hoverClass: "ui-state-hover",
        accept: ":not(#basket-head0)",
        items: ':not(.ui-widget-header)'
    });    
    $("#basket-head0").sortable({
        connectWith: "ul",
        placeholder: "ui-state-highlight",
        containment: "#containment-wrapper",
        hoverClass: "ui-state-hover",
        accept: ":not(.ui-widget-header)",
        items: ':not(.ui-widget-header)'
    });
    $("#basket1").sortable({
        connectWith: "ul",
        placeholder: "ui-state-highlight",
        containment: "#containment-wrapper",
        hoverClass: "ui-state-hover",
        accept: ":not(.ui-widget-header)",
        items: ':not(.ui-widget-header)'
    });
    $("#basket2").sortable({
        connectWith: "ul",
        placeholder: "ui-state-highlight",
        containment: "#containment-wrapper",
        hoverClass: "ui-state-hover",
        accept: ":not(.ui-sortable-helper)",
        items: ':not(.ui-widget-header)'
    });
    $( "#basket3" ).sortable({ 
        connectWith: "ul",
        placeholder: "ui-state-highlight",
        containment: "#containment-wrapper",
        hoverClass: "ui-state-hover",
        accept: ":not(.ui-sortable-helper)",
        items: ':not(.ui-widget-header)'
        });
    $( "#basket4" ).sortable({ 
        connectWith: "ul",
        placeholder: "ui-state-highlight",
        containment: "#containment-wrapper",
        hoverClass: "ui-state-hover",
        accept: ":not(.ui-sortable-helper)",
        items: ':not(.ui-widget-header)'
        });
    $( "#basket5" ).sortable({ 
        connectWith: "ul",
        placeholder: "ui-state-highlight",
        containment: "#containment-wrapper",
        hoverClass: "ui-state-hover",
        accept: ":not(.ui-sortable-helper)",
        items: ':not(.ui-widget-header)'
        });
    $("basket0, #basket1, #basket2, #basket3, #basket4, #basket5").disableSelection();
});



/* 
   Using D3 Chart http://mbostock.github.com/d3/ 
   D3.js is a JavaScript library for manipulating documents based on data.
*/

function d3Chart(){
var w = 480,
    h = 400,
    x = d3.scale.linear().range([0, w]),
    y = d3.scale.linear().range([0, h - 40]);

// An SVG element with a bottom-right origin.
var svg = d3.select("#chart-div").append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("padding-right", "30px")
  .append("g")
    .attr("transform", "translate(" + x(1) + "," + (h - 20) + ")scale(-1,-1)");

// A sliding container to hold the bars.
var body = svg.append("g")
    .attr("transform", "translate(0,0)");

// A container to hold the y-axis rules.
var rules = svg.append("g");

// A label for the current year.
var title = svg.append("text")
    .attr("class", "title")
    .attr("dy", ".71em")
    .attr("transform", "translate(" + x(1) + "," + y(1) + ")scale(-1,-1)")
    .text(2000);

d3.csv('data_sources/population.csv', function(data) {

  // Convert strings to numbers.
  data.forEach(function(d) {
    d.people = +d.people;
    d.year = +d.year;
    d.age = +d.age;
  });

  // Compute the extent of the data set in age and years.
  var age0 = 0,
      age1 = d3.max(data, function(d) { return d.age; }),
      year0 = d3.min(data, function(d) { return d.year; }),
      year1 = d3.max(data, function(d) { return d.year; }),
      year = year1;

  // Update the scale domains.
  x.domain([0, age1 + 5]);
  y.domain([0, d3.max(data, function(d) { return d.people; })]);

  // Add rules to show the population values.
  rules = rules.selectAll(".rule")
      .data(y.ticks(10))
    .enter().append("g")
      .attr("class", "rule")
      .attr("transform", function(d) { return "translate(0," + y(d) + ")"; });

  rules.append("line")
      .attr("x2", w);

  rules.append("text")
      .attr("x", 6)
      .attr("dy", ".35em")
      .attr("transform", "rotate(180)")
      .text(function(d) { return Math.round(d / 1e6) + "M"; });

  // Add labeled rects for each birthyear.
  var years = body.selectAll("g")
      .data(d3.range(year0 - age1, year1 + 5, 5))
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x(year1 - d) + ",0)"; });

  years.selectAll("rect")
      .data(d3.range(2))
    .enter().append("rect")
      .attr("x", 1)
      .attr("width", x(5) - 2)
      .attr("height", 1e-6);

  years.append("text")
      .attr("y", -6)
      .attr("x", -x(5) / 2)
      .attr("transform", "rotate(180)")
      .attr("text-anchor", "middle")
      .style("fill", "#fff")
      .text(String);

  // Add labels to show the age.
  svg.append("g").selectAll("text")
      .data(d3.range(0, age1 + 5, 5))
    .enter().append("text")
      .attr("text-anchor", "middle")
      .attr("transform", function(d) { return "translate(" + (x(d) + x(5) / 2) + ",-4)scale(-1,-1)"; })
      .attr("dy", ".71em")
      .text(String);

  // Nest by year then birthyear.
  data = d3.nest()
      .key(function(d) { return d.year; })
      .key(function(d) { return d.year - d.age; })
      .rollup(function(v) { return v.map(function(d) { return d.people; }); })
      .map(data);

  // Allow the arrow keys to change the displayed year.
  d3.select(window).on("keydown", function() {
    switch (d3.event.keyCode) {
      case 37: year = Math.max(year0, year - 10); break;
      case 39: year = Math.min(year1, year + 10); break;
    }
    redraw();
  });

  redraw();

  function redraw() {
    if (!(year in data)) return;
    title.text(year);

    body.transition()
        .duration(750)
        .attr("transform", function(d) { return "translate(" + x(year - year1) + ",0)"; });

    years.selectAll("rect")
        .data(function(d) { return data[year][d] || [0, 0]; })
      .transition()
        .duration(750)
        .attr("height", y);
  }
});
}
