
/*
Lightbox
*/
(function(theme, $) {

	theme = theme || {};

	var instanceName = '__lightbox';

	var PluginLightbox = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginLightbox.defaults = {
		tClose: 'Close (Esc)', // Alt text on close button
		tLoading: 'Loading...', // Text that is displayed during loading. Can contain %curr% and %total% keys
		gallery: {
			tPrev: 'Previous (Left arrow key)', // Alt text on left arrow
			tNext: 'Next (Right arrow key)', // Alt text on right arrow
			tCounter: '%curr% of %total%' // Markup for "1 of 7" counter
		},
		image: {
			tError: '<a href="%url%">The image</a> could not be loaded.' // Error message when image could not be loaded
		},
		ajax: {
			tError: '<a href="%url%">The content</a> could not be loaded.' // Error message when ajax request failed
		}
	};

	PluginLightbox.prototype = {
		initialize: function($el, opts) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginLightbox.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			this.options.wrapper.magnificPopup(this.options);

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginLightbox: PluginLightbox
	});

	// jquery plugin
	$.fn.themePluginLightbox = function(opts) {
		return this.each(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginLightbox($this, opts);
			}

		});
	}

}).apply(this, [ window.theme, jQuery ]);

(function( $ ) {

	'use strict';

	if ( $.isFunction($.fn[ 'magnificPopup' ]) ) {

		$(function() {
			$('[data-plugin-lightbox], .lightbox:not(.manual)').each(function() {
				var $this = $( this ),
					opts = {};

				var pluginOptions = $this.data('plugin-options');
				if (pluginOptions)
					opts = pluginOptions;

				$this.themePluginLightbox(opts);
			});
		});

	}

}).apply(this, [ jQuery ]);


/*
FlotChart (Fire Admin Update)
*/
function randNum(){
	return ((Math.floor( Math.random()* (1+40-0) ) ) + 10)* 10;
	}

/*var menulist = "";

function son(menu){
	
	if(menu.sonlist.length > 0){
		
		if(menu.grade == 1){
			menulist += '<li class="nav-parent"><a ><i class="fa fa-laptop" aria-hidden="true"></i><span>'+menu.name+'</span></a><ul class="nav nav-children">';
		}
		if(menu.grade == 2){
			menulist += '<li class="nav-parent"><a><span>'+menu.name+'</span></a><ul class="nav nav-third">';
		}
		if(menu.grade == 3){
			menulist += '<li class="nav-parent"><a><span>'+menu.name+'</span></a><ul class="nav nav-third">';
		}
		
		for(var e=0;e<menu.sonlist.length;e++){
			son(menu.sonlist[e]);
		}
			
		menulist += '</ul></li>';
		
	}
	
	if(menu.sonlist.length == 0 ){	
			if(menu.grade == 1){
				menulist += '<li class="nav-parent"><a ><i class="fa fa-laptop" aria-hidden="true"></i><span>'+menu.name+'</span></a></li>'
			}
			if(menu.grade == 2){
				menulist += '<li><a href="/Ex/'+menu.url+'"><span class="text">'+menu.name+'</span></a></li>';
			}
			if(menu.grade == 3){
				menulist += '<li><a href="/Ex/'+menu.url+'"><span class="text"><i class="fa fa-copy" aria-hidden="true"></i>'+menu.name+'</span></a></li>';
			}
	}
}
*/
$(document).ready(function(){
	console.log('mian');
	
	/*$.ajax({
		url:'/Ex/tree/menu',
		type:'POST',
		async:false,
		dataType:'json',
		success:function(data){
			
			for(var b = 0 ; b<data.length ; b++){
				var menu = data[b];
				son(menu);		
			}

			 $("#menulist").html(menulist);
					
		},
		error:function(data){
			console.log('22112211');
	}
	})*/
	/*g1=new JustGage({id:"g1",value:24,min:0,max:100,title:"差异数据百分比",label:"per minute"});*/
	/*g1a=new JustGage({id:"g1a",value:45,min:0,max:100,title:"Errors",label:"average"});
	g2=new JustGage({id:"g2",value:15,min:0,max:100,title:"Timers",label:""});
	g2a=new JustGage({id:"g2a",value:7,min:0,max:100,title:"Alerts",label:""});
	g2b=new JustGage({id:"g2b",value:22,min:0,max:100,title:"Events",label:""});*/
	
	
	require.config({
	        paths: {

	            echarts: '../assets2/echarts/dist'

	       	        }
	    });

	    require(
	        [
	           'echarts',
	           'echarts/chart/line',   // echar折线图
	           'echarts/chart/pie',
	           'echarts/chart/bar'
	        ],

	    function (ec) {
	        	
	        	var pOne = ec.init(document.getElementById('eOne'));
	        	var pTwo = ec.init(document.getElementById('eTwo'));
	        	var pThree = ec.init(document.getElementById('eThree'));
	        	var pFour = ec.init(document.getElementById('eFour'));
	        	var pFive = ec.init(document.getElementById('eFive'));
	        	var pSix = ec.init(document.getElementById('eSix'));
	        	var pSeven = ec.init(document.getElementById('eSeven'));
	        	
	        	option1 = {
	        		    title: {
	        		        text: '当天入库数据'
	        		    },
	        		    tooltip : {
	                        trigger: 'axis'
	                    },
	        		    legend: {
	        		        data:['B2T','B2C']
	        		    },
	        		    grid: {
	        		        left: '3%',
	        		        right: '4%',
	        		        bottom: '3%',
	        		        containLabel: true
	        		    },
	        		    xAxis: {
	        		        type: 'category',
	        		        boundaryGap: false,
	        		        axisLabel:{  
                                interval:0,//横轴信息全部显示  
                                //rotate:-20,//-30度角倾斜显示  
                           },
	        		        data: ['0','6','12','18','24']
	        		    },
	        		    yAxis: {
	        		        type: 'value'
	        		    },
	        		    series: [
	        		        {
	        		            name:'B2T',
	        		            type:'line',
	        		            stack: '总量',
	        		            data:[100,120, 132, 101, 134]
	        		        },
	        		        {
	        		            name:'B2C',
	        		            type:'line',
	        		            stack: '总量',
	        		            data:[123,220, 182, 191, 234]
	        		        }
	        		    ]
	        		};
	        	
           option2 = {

              title: {
    			    	text:'每月审核数量（万为单位）',
    			    	   x:'center',
    			           y:'top',
    			   textAlign:'center',
        		   textStyle:{
   			           //文字颜色
   			           color:'#2D2F33',
   			           //字体大小
   			           fontSize:15
   			                 }
    			       }, 
    			       tooltip:{
    			    	  show: false
    			       },
	        			    grid : {
	  	                    	x:"50px",
	  	                    	x2:"20px",
	  	                    	y:"50px",
	  	                    	y2:"35px"
	  	                    },
	        			    color: ['#3398DB'],
	        			    
	        	            xAxis: {
	        	                data: ["八月","九月","十月","十一月","十二月"]
	        	            },
	        	            yAxis: {},
	        	            series: [{
	        	            barWidth: 40,
	        	                type: 'bar',
	        	                data: [123,231,276,165,187],
	        	                itemStyle : { normal: {label : {show: true, position: 'top'}}}
	        	            }]
      };

      option3={
        
               title: {
    			    	text:'当月重点差异占比',
    			    	 x:'center',
    			         y:'top',
    			         textAlign:'center',
  	        		     textStyle:{
       			           //文字颜色
       			           color:'#2D2F33',
       			           //字体大小
       			           fontSize:15
       			        }
    			       },
    			      color : ['yellow', 'orange','red'],   
	        			tooltip : {
	        		        trigger: 'item',
	        		        formatter: "{a}<br/>{b}:{c}"
	        		    },
	        		    noDataLoadingOption: {
	                        text: '暂无数据',
	                        effect: 'bubble',
	                        effectOption: {
	                            effect: {
	                                n: 0
	                            }
	                        }
	                    },
	        		    series : [
	        		        {
	        		            name: '差异税费',
	        		            type: 'pie',
	        		            radius: '50%',
	        		            center: ['50%', '45%'],
	        		            data:[{name:'A',value:30},{name:'B',value:18},{name:'C',value:6},{name:'D',value:9},{name:'others',value:80}],
	        		            itemStyle: {
	        		                emphasis: {
	        		                    shadowBlur: 10,
	        		                    shadowOffsetX: 0,
	        		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	        		                },
	        		                normal: {label : {show: false,position: 'inner',formatter: '{b}:{c}'},labelLine :{show:false}}, 
	        		            }
	        		        }
	        		    ]

      }

      option4 = {
	                    
	        			title: {
	        		       
	        				text: '每天新增人数',
	            		    textStyle:{
	      			           //文字颜色
	      			           color:'#2D2F33',
	      			           //字体大小
	      			           fontSize:15
	      			        }
	        		      
	        		    },
	        			 grid : {
	                    	x:"30px",
	                    	x2:"20px",
	                    	y:"35px",
	                    	y2:"25px"
	                    },  
	                    tooltip : {
	                        trigger: 'axis'
	                    },
	            	    xAxis : [
	            	        {
	            	            type : 'category',
	            	            boundaryGap : false,
	            	            axisLabel:{  
	                                interval:0,//横轴信息全部显示  
	                                //rotate:-20,//-30度角倾斜显示  
	                           },
                           data: ['周一','周二','周三','周四','周五','周六','周日']  
	            	        }
	            	    ],
	            	    yAxis : [
	            	        {
	            	            type : 'value'
	            	        }
	            	    ],
	            	    series : [
	            	        {
	            	            type:'line',
	            	            name:'人数',
	            	            data:[11, 11, 15, 13, 12, 13, 10]
	            	        }
	            	    ]
	            	};
      option5 = {

              title: {
    			    	text:'YQ每天更新数量',
    			    	   x:'center',
    			           y:'top',
    			   textAlign:'center',
        		   textStyle:{
   			           //文字颜色
   			           color:'#2D2F33',
   			           //字体大小
   			           fontSize:15
   			                 }
    			       }, 
    			       tooltip:{
    			    	  show: false
    			       },
	        			    grid : {
	  	                    	x:"20px",
	  	                    	x2:"20px",
	  	                    	y:"50px",
	  	                    	y2:"35px"
	  	                    },
	        			    color: ['#3398DB'],
	        			    
	        	            xAxis: {
	        	                data: ["周一","周二","周三","周四","周五","周六","周日"]
	        	            },
	        	            yAxis: {},
	        	            series: [{
	        	            barWidth: 40,
	        	                type: 'bar',
	        	                data: [23,31,76,16,47,52,38],
	        	                itemStyle : { normal: {label : {show: true, position: 'top'}}}
	        	            }]
      };
      option6 = {

              title: {
    			    	text:'Tax每天更新数量',
    			    	   x:'center',
    			           y:'top',
    			   textAlign:'center',
        		   textStyle:{
   			           //文字颜色
   			           color:'#2D2F33',
   			           //字体大小
   			           fontSize:15
   			                 }
    			       }, 
    			       tooltip:{
    			    	  show: false
    			       },
	        			    grid : {
	  	                    	x:"30px",
	  	                    	x2:"20px",
	  	                    	y:"50px",
	  	                    	y2:"35px"
	  	                    },
	        			    color: ['#3398DB'],
	        			    
	        	            xAxis: {
	        	                data: ["周一","周二","周三","周四","周五","周六","周日"]
	        	            },
	        	            yAxis: {},
	        	            series: [{
	        	            barWidth: 40,
	        	                type: 'bar',
	        	                data: [123,131,76,196,147,52,138],
	        	                itemStyle : { normal: {label : {show: true, position: 'top'}}}
	        	            }]
      };
      
      option7 = {
    		    title: {
    		        text: '每天调用缓存次数',
    		        left: 'center'
    		    },
    		    tooltip: {
    		        trigger: 'item',
    		        formatter: '{a} <br/>{b} : {c}'
    		    },
    		    xAxis: {
    		        type: 'category',
    		        splitLine: {show: false},
    		        data: ['周日','周一', '周二', '周三', '周四', '周五', '周六']
    		    },
    		    grid: {
    		        left: '3%',
    		        right: '4%',
    		        bottom: '3%',
    		        containLabel: true
    		    },
    		    yAxis: {
    		        type: 'value',
    		        name: '数量'
    		    },
    		    series: [
    		        {
    		            name: '调用次数',
    		            type: 'line',
    		            data: [5, 3, 20, 27, 11, 7, 21, 22, 9]
    		        }
    		    ]
    		};

      
      pOne.setOption(option1);
      pTwo.setOption(option2);
      pThree.setOption(option3);
      pFour.setOption(option4);
      pFive.setOption(option5);
      pSix.setOption(option6);
      pSeven.setOption(option7);
    }
    
  )    
	
	
	if($("#adminChartUpdate").length)
	{	
		var likes = [[2007, 1+randNum()], [2008, 15+randNum()], [2009, 35+randNum()], [2010, 60+randNum()],[2011, 90+randNum()],[2012, 40+randNum()],[2013, 25+randNum()],[2014, 55+randNum()]];

		var plot = $.plot($("#adminChartUpdate"),
			   [ { data: likes} ], {
				   series: {
					   lines: { show: true,
								lineWidth: 2,
								fill: false, fillColor: { colors: [ { opacity: 0.5 }, { opacity: 0.2 } ] }
							 },
					   points: { show: true, 
								 lineWidth: 1 
							 },
					   shadowSize: 0
				   },
				   grid: { hoverable: true, 
						   clickable: true, 
						   tickColor: "#ECECFB",
						   borderWidth: 0,
						   backgroundColor: '#FFF'
						 
						 },
				   colors: ["#99CCFF"],
					xaxis: {ticks:8, tickDecimals: 0},
					yaxis: {ticks:5, tickDecimals: 0},
					
				 });

		function showTooltip(x, y, contents) {
			$('<div id="tooltip">' + contents + '</div>').css( {
				position: 'absolute',
				display: 'none',
				top: y + 5,
				left: x + 5,
				border: '2px solid #fff',
				padding: '5px',
				'background-color': '#FFBFBF',
				'color': '#fff',
				opacity: 0.90
			}).appendTo("body").fadeIn(200);
		}

		var previousPoint = null;
		$("#adminChartUpdate").bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x.toFixed(2));
			$("#y").text(pos.y.toFixed(2));

				if (item) {
					if (previousPoint != item.dataIndex) {
						previousPoint = item.dataIndex;

						$("#tooltip").remove();
						var x = item.datapoint[0].toFixed(0),
							y = item.datapoint[1].toFixed(0);

						showTooltip(item.pageX, item.pageY,
									item.series.label + " of " + x + " = " + y);
					}
				}
				else {
					$("#tooltip").remove();
					previousPoint = null;
				}
		});
	
	}
	
	function randNumTW(){
		return ((Math.floor( Math.random()* (1+40-20) ) ) + 20);
	}
	
	
	/* ---------- Pie chart (Best Seller) ---------- */
	var data = [
	{ label: "B2C",  data: 12},
	{ label: "B2T",  data: 27}
	];
	
	if($("#piechart").length)
	{
		$.plot($("#piechart"), data,
		{
			series: {
					pie: {
							show: true
					}
			},
			grid: {
					hoverable: true,
					clickable: true
			},
			legend: {
				show: false
			},
			colors: ["#FF9999", "#FFCC99", "#99CCFF", "#FF7396"]
		});
		
		function pieHover(event, pos, obj)
		{
			if (!obj)
					return;
			percent = parseFloat(obj.series.percent).toFixed(2);
			$("#hover").html('<span style="font-weight: bold; color: '+obj.series.color+'">'+obj.series.label+' ('+percent+'%)</span>');
		}
		$("#piechart").bind("plothover", pieHover);
	}
	
	
		/* ----------Realtime chart (Server Usage) ---------- */

	 // we use an inline data source in the example, usually data would
	// be fetched from a server
	var data = [], totalPoints = 300;
	function getRandomData() {
		if (data.length > 0)
			data = data.slice(1);

		// do a random walk
		while (data.length < totalPoints) {
			var prev = data.length > 0 ? data[data.length - 1] : 50;
			var y = prev + Math.random() * 10 - 5;
			if (y < 0)
				y = 0;
			if (y > 100)
				y = 100;
			data.push(y);
		}

		// zip the generated y values with the x values
		var res = [];
		for (var i = 0; i < data.length; ++i)
			res.push([i, data[i]])
		return res;
	}

	// setup control widget
	var updateInterval = 100;
	$("#updateInterval").val(updateInterval).change(function () {
		var v = $(this).val();
		if (v && !isNaN(+v)) {
			updateInterval = +v;
			if (updateInterval < 1)
				updateInterval = 1;
			if (updateInterval > 2000)
				updateInterval = 2000;
			$(this).val("" + updateInterval);
		}
	});

	
	if($("#realtimeServerUsage").length)
	{
		var options = {
			series: { shadowSize: 1 },
			lines: { fill: true, fillColor: { colors: [ { opacity: 1 }, { opacity: 0.1 } ] }},
			yaxis: { min: 0, max: 100 },
			xaxis: { show: false },
			colors: ["#FFCFBF"],
			grid: {	tickColor: "#ECECFB",
					borderWidth: 0 
			},
		};
		var plot = $.plot($("#realtimeServerUsage"), [ getRandomData() ], options);
		function update() {
			plot.setData([ getRandomData() ]);
			// since the axes don't change, we don't need to call plot.setupGrid()
			plot.draw();
			
			setTimeout(update, updateInterval);
		}

		update();
	}
	
});


