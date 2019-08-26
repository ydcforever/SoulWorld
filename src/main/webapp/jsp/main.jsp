<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="zh-CN">

<head>

    <link rel="shortcut icon" href="favicon.ico">
    <link href="../hplus/css/bootstrap.min14ed.css?v=3.3.6" rel="stylesheet">
    <link href="../hplus/css/font-awesome.min93e3.css?v=4.4.0" rel="stylesheet">

    <!-- Morris -->
    <link href="../hplus/css/plugins/morris/morris-0.4.3.min.css" rel="stylesheet">

    <!-- Gritter -->
    <link href="../hplus/js/plugins/gritter/jquery.gritter.css" rel="stylesheet">

    <link href="../hplus/css/animate.min.css" rel="stylesheet">
    <link href="../hplus/css/style.min862f.css?v=4.1.0" rel="stylesheet">
    <style type="text/css">
        #top_left {
            background: white;
            color: black;
            margin: 5px 0px 0px 0px;
            float: left;
            width: 53%;
            height: 10%;
        }

        #top_right {

            color: black;
            margin: 5px 0px 0px 0px;
            float: right;
            width: 45%;
            height: 10%;
        }

        #top_right_left {
            float: left;
            width: 35%;
            text-align: center
        }

        #top_right_right {
            float: right;
            width: 64%;
            text-align: center
        }

        #rows {
            margin: 10px 0px 0px 0px;
        }

        p {
            text-indent: 2em;
        }

        #em {

            letter-spacing: 3px;
        }
    </style>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>系统简介</h5>

                    <div class="ibox-tools">
                        <a class="collapse-link">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                        <a class="close-link">
                            <i class="fa fa-times"></i>
                        </a>
                    </div>
                </div>
                <div class="ibox-content" id="top_left">

                    <p class="em">贝特威GUI税费管理引擎是集查询、计算、审核、监控为一体的管理引擎。主要包含以下功能：</p>
                    <ul class="em">
                        <li>客票税费实时计算</li>
                        <li>机场税费明细查询</li>
                        <li>税费差异审核</li>
                        <li>基础数据的运维监控</li>
                    </ul>

                    <p class="em">贝特威官网：<a href="http://www.betterwayit.com/"
                                           target="_blank">http://www.betterwayit.com/</a>
                    </p>

                </div>

                <div id="top_right">
                    <div id="top_right_left">
                        <div class="ibox float-e-margins">
                            <div class="ibox-title">
                                <span class="label label-success pull-right">总计</span>
                                <h5>涉及机场</h5>
                            </div>
                            <div class="ibox-content">
                                <div class="row">
                                    <h1 class="no-margins">411</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="top_right_right">
                        <div id="ibox float-e-margins">
                            <div class="ibox-title">
                                <span class="label label-info pull-right">总计/年</span>
                                <h5>数据库信息</h5>
                            </div>
                            <div class="ibox-content">
                                <div class="row">
                                    <h1 class="no-margins">11,180,800</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row" id="rows">
        <div class="col-md-6 ">
            <div id="eOne" style="height: 300px;">
            </div>
        </div>
        <div class="col-md-6 ">
            <div id="eTwo" style="height: 300px;">
            </div>
        </div>


        <div class="col-md-6 ">
            <div id="eSix" style="height: 300px;background-color: #87cefa">
            </div>
        </div>

    </div>


</div>
<div id="eFive" style="height: 400px;">

</div>

<script src="../hplus/js/jquery.min.js?v=2.1.4"></script>
<script src="../hplus/js/bootstrap.min.js?v=3.3.6"></script>
<script src="../hplus/js/plugins/flot/jquery.flot.js"></script>
<script src="../hplus/js/plugins/flot/jquery.flot.tooltip.min.js"></script>
<script src="../hplus/js/plugins/flot/jquery.flot.spline.js"></script>
<script src="../hplus/js/plugins/flot/jquery.flot.resize.js"></script>
<script src="../hplus/js/plugins/flot/jquery.flot.pie.js"></script>
<script src="../hplus/js/plugins/flot/jquery.flot.symbol.js"></script>
<script src="../hplus/js/plugins/peity/jquery.peity.min.js"></script>
<script src="../hplus/js/demo/peity-demo.min.js"></script>
<script src="../hplus/js/content.min.js?v=1.0.0"></script>
<%--<script src="../hplus/js/plugins/jquery-ui/jquery-ui.min.js"></script>--%>
<script src="../assets2/plugins/jquery-ui/js/jquery-ui-1.10.4.min.js"></script>
<script src="../hplus/js/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="../hplus/js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<script src="../hplus/js/plugins/easypiechart/jquery.easypiechart.js"></script>
<script src="../hplus/js/plugins/chartJs/Chart.min.js"></script>
<script src="../hplus/js/plugins/sparkline/jquery.sparkline.min.js"></script>
<script src="../hplus/js/demo/sparkline-demo.min.js"></script>
<%--<script src="../hplus/js/plugins/echarts/echarts.js"></script>--%>
<script src="../assets2/echarts/dist/echarts.js"></script>
<script src="../assets2/echarts/dist/echarts-all.js"></script>
<%--<script src="../assets2/echarts/dist/echarts.min.js"></script>--%>
<script src="../assets2/echarts/dist/world.js"></script>
<script src="../js/AirportGeo/airport.js"></script>

<%--<script src="http://gallery.echartsjs.com/dep/echarts/map/js/world.js"></script>--%>
<script>
    $(document).ready(function () {
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


                    //var pFive = ec.init(document.getElementById('eFive'));
                    var pSix = ec.init(document.getElementById('eSix'));

                    option1 = {
                        title: {
                            text: '当天接口调用量（万条/时）'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['B2T', 'B2C']
                        },
                        grid: {
                            x: "12%",
                            x2: "12%",
                            y: "12%",
                            y2: "12%"
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            axisLabel: {
                                interval: 0//横轴信息全部显示
                                //rotate:-20,//-30度角倾斜显示  
                            },
                            data: ['0', '6', '12', '18', '24']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: 'B2T',
                                type: 'line',
                                stack: '总量',
                                data: [100, 120, 132, 101, 134]
                            },
                            {
                                name: 'B2C',
                                type: 'line',
                                stack: '总量',
                                data: [123, 220, 182, 191, 234]
                            }
                        ]
                    };

                    option2 = {

                        title: {
                            text: '税费审核统计（万条/月）'
                        },
                        tooltip: {
                            show: false
                        },
                        grid: {
                            x: "12%",
                            x2: "12%",
                            y: "12%",
                            y2: "12%"
                        },
                        color: ['#3398DB'],

                        xAxis: {
                            data: ["八月", "九月", "十月", "十一月", "十二月"]
                        },
                        yAxis: {},
                        series: [{
                            barWidth: 40,
                            type: 'bar',
                            data: [123, 231, 276, 165, 187],
                            itemStyle: {normal: {label: {show: true, position: 'top'}}}
                        }]
                    };


//                    option5 = {
//
//                        title: {
//                            text: '燃油税每天更新量（条/天）'
//                        },
//                        tooltip: {
//                            show: false
//                        },
//                        grid: {
//                            x: "12%",
//                            x2: "12%",
//                            y: "12%",
//                            y2: "12%"
//                        },
//                        color: ['#3398DB'],
//
//                        xAxis: {
//                            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
//                        },
//                        yAxis: {},
//                        series: [{
//                            barWidth: 40,
//                            type: 'bar',
//                            data: [23, 31, 76, 16, 47, 52, 38],
//                            itemStyle: {normal: {label: {show: true, position: 'top'}}}
//                        }]
//                    };
                    option6 = {

                        title: {
                            text: '机场税更新（条/天）'
                        },
                        tooltip: {
                            show: false
                        },
                        grid: {
                            x: "12%",
                            x2: "12%",
                            y: "12%",
                            y2: "12%"
                        },
                        color: ['#3398DB'],

                        xAxis: {
                            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
                        },
                        yAxis: {},
                        series: [{
                            barWidth: 40,
                            type: 'bar',
                            data: [123, 131, 76, 196, 147, 52, 138],
                            itemStyle: {normal: {label: {show: true, position: 'top'}}}
                        }]
                    };


                    pOne.setOption(option1);
                    pTwo.setOption(option2);


//                    pFive.setOption(option5);
                    pSix.setOption(option6);


                });


        option5 = {
            title: {
                sublink: 'http://esa.un.org/wpp/Excel-Data/population.htm',
                left: 'center',
                top: 'top'
            },
            /* tooltip: {
             trigger: 'item',
             formatter: function (params) {
             var value = (params.value + '').split('.');
             value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
             + '.' + value[1];
             return params.seriesName + '<br/>' + params.name + ' : ' + value;
             }
             },*/

            visualMap: {
                min: 0,
                max: 1000000,
                text: ['High', 'Low'],
                realtime: false,
                calculable: true,
                color: ['orangered', 'yellow', 'lightskyblue']
            },
            series: [
                {
                    name: 'World Population (2010)',
                    type: 'map',
                    mapType: 'world',
                    roam: true,
//                    selectedMode : 'multiple',
                    itemStyle: {
                        normal: {
                            borderColor: 'white',
                            areaStyle: {
                                color: '#87cefa'
                            }
                        },
                        emphasis: {
                            borderColor: 'pink',
                            areaStyle: {
                                color: 'pink'
                            },
                            label: {show: false}
                        }
                    },
                    data: [
                        {name: 'Afghanistan', value: 28397.812, selected: true},
                        {name: 'Angola', value: 19549.124},
                        {name: 'Albania', value: 3150.143},
                        {name: 'United Arab Emirates', value: 8441.537, selected: true},
                        {name: 'Argentina', value: 40374.224},
                        {name: 'Armenia', value: 2963.496},
                        {name: 'French Southern and Antarctic Lands', value: 268.065},
                        {name: 'Australia', value: 22404.488},
                        {name: 'Austria', value: 8401.924},
                        {name: 'Azerbaijan', value: 9094.718},
                        {name: 'Burundi', value: 9232.753},
                        {name: 'Belgium', value: 10941.288},
                        {name: 'Benin', value: 9509.798},
                        {name: 'Burkina Faso', value: 15540.284},
                        {name: 'Bangladesh', value: 151125.475},
                        {name: 'Bulgaria', value: 7389.175},
                        {name: 'The Bahamas', value: 66402.316},
                        {name: 'Bosnia and Herzegovina', value: 3845.929},
                        {name: 'Belarus', value: 9491.07},
                        {name: 'Belize', value: 308.595},
                        {name: 'Bermuda', value: 64.951},
                        {name: 'Bolivia', value: 716.939},
                        {name: 'Brazil', value: 195210.154},
                        {name: 'Brunei', value: 27.223},
                        {name: 'Bhutan', value: 716.939},
                        {name: 'Botswana', value: 1969.341},
                        {name: 'Central African Republic', value: 4349.921},
                        {name: 'Canada', value: 34126.24},
                        {name: 'Switzerland', value: 7830.534},
                        {name: 'Chile', value: 17150.76},
                        {name: 'China', value: 1359821.465},
                        {name: 'Ivory Coast', value: 60508.978},
                        {name: 'Cameroon', value: 20624.343},
                        {name: 'Democratic Republic of the Congo', value: 62191.161},
                        {name: 'Republic of the Congo', value: 3573.024},
                        {name: 'Colombia', value: 46444.798},
                        {name: 'Costa Rica', value: 4669.685},
                        {name: 'Cuba', value: 11281.768},
                        {name: 'Northern Cyprus', value: 1.468},
                        {name: 'Cyprus', value: 1103.685},
                        {name: 'Czech Republic', value: 10553.701},
                        {name: 'Germany', value: 83017.404},
                        {name: 'Djibouti', value: 834.036},
                        {name: 'Denmark', value: 5550.959},
                        {name: 'Dominican Republic', value: 10016.797},
                        {name: 'Algeria', value: 37062.82},
                        {name: 'Ecuador', value: 15001.072},
                        {name: 'Egypt', value: 78075.705},
                        {name: 'Eritrea', value: 5741.159},
                        {name: 'Spain', value: 46182.038},
                        {name: 'Estonia', value: 1298.533},
                        {name: 'Ethiopia', value: 87095.281},
                        {name: 'Finland', value: 5367.693},
                        {name: 'Fiji', value: 860.559},
                        {name: 'Falkland Islands', value: 49.581},
                        {name: 'France', value: 63230.866},
                        {name: 'Gabon', value: 1556.222},
                        {name: 'United Kingdom', value: 62066.35},
                        {name: 'Georgia', value: 4388.674},
                        {name: 'Ghana', value: 24262.901},
                        {name: 'Guinea', value: 10876.033},
                        {name: 'Gambia', value: 1680.64},
                        {name: 'Guinea Bissau', value: 10876.033},
                        {name: 'Equatorial Guinea', value: 696.167},
                        {name: 'Greece', value: 11109.999},
                        {name: 'Greenland', value: 56.546},
                        {name: 'Guatemala', value: 14341.576},
                        {name: 'French Guiana', value: 231.169},
                        {name: 'Guyana', value: 786.126},
                        {name: 'Honduras', value: 7621.204},
                        {name: 'Croatia', value: 4338.027},
                        {name: 'Haiti', value: 9896.4},
                        {name: 'Hungary', value: 10014.633},
                        {name: 'Indonesia', value: 240676.485},
                        {name: 'India', value: 1205624.648},
                        {name: 'Ireland', value: 4467.561},
                        {name: 'Iran', value: 240676.485},
                        {name: 'Iraq', value: 30962.38},
                        {name: 'Iceland', value: 318.042},
                        {name: 'Israel', value: 7420.368},
                        {name: 'Italy', value: 60508.978},
                        {name: 'Jamaica', value: 2741.485},
                        {name: 'Jordan', value: 6454.554},
                        {name: 'Japan', value: 127352.833},
                        {name: 'Kazakhstan', value: 15921.127},
                        {name: 'Kenya', value: 40909.194},
                        {name: 'Kyrgyzstan', value: 5334.223},
                        {name: 'Cambodia', value: 14364.931},
                        {name: 'South Korea', value: 51452.352},
                        {name: 'Kosovo', value: 97.743},
                        {name: 'Kuwait', value: 2991.58},
                        {name: 'Laos', value: 6395.713},
                        {name: 'Lebanon', value: 4341.092},
                        {name: 'Liberia', value: 3957.99},
                        {name: 'Libya', value: 6040.612},
                        {name: 'Sri Lanka', value: 20758.779},
                        {name: 'Lesotho', value: 2008.921},
                        {name: 'Lithuania', value: 3068.457},
                        {name: 'Luxembourg', value: 507.885},
                        {name: 'Latvia', value: 2090.519},
                        {name: 'Morocco', value: 31642.36},
                        {name: 'Moldova', value: 103.619},
                        {name: 'Madagascar', value: 21079.532},
                        {name: 'Mexico', value: 117886.404},
                        {name: 'Macedonia', value: 507.885},
                        {name: 'Mali', value: 13985.961},
                        {name: 'Myanmar', value: 51931.231},
                        {name: 'Montenegro', value: 620.078},
                        {name: 'Mongolia', value: 2712.738},
                        {name: 'Mozambique', value: 23967.265},
                        {name: 'Mauritania', value: 3609.42},
                        {name: 'Malawi', value: 15013.694},
                        {name: 'Malaysia', value: 28275.835},
                        {name: 'Namibia', value: 2178.967},
                        {name: 'New Caledonia', value: 246.379},
                        {name: 'Niger', value: 15893.746},
                        {name: 'Nigeria', value: 159707.78},
                        {name: 'Nicaragua', value: 5822.209},
                        {name: 'Netherlands', value: 16615.243},
                        {name: 'Norway', value: 4891.251},
                        {name: 'Nepal', value: 26846.016},
                        {name: 'New Zealand', value: 4368.136},
                        {name: 'Oman', value: 2802.768},
                        {name: 'Pakistan', value: 173149.306},
                        {name: 'Panama', value: 3678.128},
                        {name: 'Peru', value: 29262.83},
                        {name: 'Philippines', value: 93444.322},
                        {name: 'Papua New Guinea', value: 6858.945},
                        {name: 'Poland', value: 38198.754},
                        {name: 'Puerto Rico', value: 3709.671},
                        {name: 'North Korea', value: 1.468},
                        {name: 'Portugal', value: 10589.792},
                        {name: 'Paraguay', value: 6459.721},
                        {name: 'Qatar', value: 1749.713},
                        {name: 'Romania', value: 21861.476},
                        {name: 'Russia', value: 21861.476, selected: true},
                        {name: 'Rwanda', value: 10836.732},
                        {name: 'Western Sahara', value: 514.648},
                        {name: 'Saudi Arabia', value: 27258.387},
                        {name: 'Sudan', value: 35652.002},
                        {name: 'South Sudan', value: 9940.929},
                        {name: 'Senegal', value: 12950.564},
                        {name: 'Solomon Islands', value: 526.447},
                        {name: 'Sierra Leone', value: 5751.976},
                        {name: 'El Salvador', value: 6218.195},
                        {name: 'Somaliland', value: 9636.173},
                        {name: 'Somalia', value: 9636.173},
                        {name: 'Republic of Serbia', value: 3573.024},
                        {name: 'Suriname', value: 524.96},
                        {name: 'Slovakia', value: 5433.437},
                        {name: 'Slovenia', value: 2054.232},
                        {name: 'Sweden', value: 9382.297},
                        {name: 'Swaziland', value: 1193.148},
                        {name: 'Syria', value: 7830.534},
                        {name: 'Chad', value: 11720.781},
                        {name: 'Togo', value: 6306.014},
                        {name: 'Thailand', value: 66402.316},
                        {name: 'Tajikistan', value: 7627.326},
                        {name: 'Turkmenistan', value: 5041.995},
                        {name: 'East Timor', value: 10016.797},
                        {name: 'Trinidad and Tobago', value: 1328.095},
                        {name: 'Tunisia', value: 10631.83},
                        {name: 'Turkey', value: 72137.546},
                        {name: 'United Republic of Tanzania', value: 44973.33},
                        {name: 'Uganda', value: 33987.213},
                        {name: 'Ukraine', value: 46050.22},
                        {name: 'Uruguay', value: 3371.982},
                        {name: 'United States of America', value: 312247.116},
                        {name: 'Uzbekistan', value: 27769.27},
                        {name: 'Venezuela', value: 236.299},
                        {name: 'Vietnam', value: 89047.397},
                        {name: 'Vanuatu', value: 236.299},
                        {name: 'West Bank', value: 13.565},
                        {name: 'Yemen', value: 22763.008},
                        {name: 'South Africa', value: 51452.352},
                        {name: 'Zambia', value: 13216.985},
                        {name: 'Zimbabwe', value: 13076.978}
                    ],
                    makeLine: {
//                        type : 'lines',
//                        smooth: true,
//                        symbol: ['none', 'none'],
//                        effect: {
//                            show: true,
//                            scaleSize: 1,
//                            period: 30,
//                            color: '#fff',
//                            shadowColor: 'rgba(220,220,220,0.4)',
//                            shadowBlur: 5
//                        },
//                        itemStyle: {
//                            normal: {
//                                borderWidth: 0.05,
//                                lineStyle: {
//                                    type: 'solid',
//                                    color: 'aqua'
//                                }
//                            }
//                        },
                        data: [[{name: "Zambia",value:'13216.985', x: 10, y: 10},
                            {name: "Zimbabwe", x: 800, y: 220}]]
//                        , geoCoord: airportGeo
                    }
                }
//                ,
//                {
//                    type: 'map',
//                    mapType: 'world',
//                    roam: true,
//                    itemStyle: {
//                        normal: {
//                            borderColor: 'white',
//                            areaStyle: {
//                                color: 'lightgreen'
//                            }
//                        },
//                        emphasis: {
//                            borderColor: 'pink',
//                            areaStyle: {
//                                color: 'pink'
//                            },
//                            label: {show: false}
//                        }
//                    },
//                    data:[],
//                    makeLine: {
//                        smooth: true,
//                        symbol: ['none', 'none'],
//                        effect: {
//                            show: true,
//                            scaleSize: 1,
//                            period: 30,
//                            color: '#fff',
//                            shadowColor: 'rgba(220,220,220,0.4)',
//                            shadowBlur: 5
//                        },
//                        itemStyle: {
//                            normal: {
//                                borderWidth: 0.05,
//                                lineStyle: {
//                                    type: 'solid',
//                                    color: 'aqua'
//                                }
//                            }
//                        },
//                        data: [[{name: "PEK",value:'22', xAxis: 10, yAxis: 10}, {name: "KMG", xAxis: 800, yAxis: 60}]
//                        ]
//                        //geoCoord: airportGeo
//                    }
//                }
            ]
        };
        var myCharts = echarts.init(document.getElementById('eFive'));
        myCharts.setOption(option5);
    });
</script>
<script type="text/javascript" src="http://tajs.qq.com/stats?sId=9051096" charset="UTF-8"></script>
</body>
</html>