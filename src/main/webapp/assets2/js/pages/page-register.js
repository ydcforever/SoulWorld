$(document).ready(function() {
	
	 $.ajax({
         type : "POST",
         url : "echarts/test",
         dataType: "json",
         success : function(data) { 	 
         console.log(data);
         }
	 });

	
	require.config({
        paths: {echarts: 'assets2/echarts/dist'}
    });
    require(
        [  'echarts',
           'echarts/chart/line',   // echar折线图
        ],
    function (ec) {
        	var pOne = ec.init(document.getElementById('eOne'));
        	var option = {
        			  title: {
	        		        text: '当天入库数据'
	        		    },
	        		    tooltip : {
	                        trigger: 'axis'
	                    },
	        		    legend: {
	        		        data:[]
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
	        		        data: []
	        		    },
	        		    yAxis: {
	        		        type: 'value'
	        		    },
	        		    series: [
	        		        {   name:'',
	        		            type:'line',
	        		            stack: '总量',
	        		            data:[]
	        		        }
	        		    ]
	        		};                  	
        	  $.ajax({
                  type : "POST",
                  url : "echarts/test",
                  dataType: "json",
                  success : function(data) { 	 
                      var jsonobj = eval(data);
                      option.legend.data = jsonobj[0].legend;
                      //读取横坐标值
                      option.xAxis.data = jsonobj[0].axis;
                      option.series[0].data = jsonobj[0].series;
                      option.series[0].name = jsonobj[0].legend[0];
                      pOne.hideLoading();
                      pOne.setOption(option);
                  }
              });

})    

	//数据校验包括登录名、密码与再次输入密码、验证码的校验
					$("#passwordConfirm").blur(function(){
						var pwd = $("#password").val();
						var pwdC = $("#passwordConfirm").val();
						
						if(pwd!=pwdC){
							alert("对不起，您2次输入的密码不一致");
							
						}
						
					});
});

