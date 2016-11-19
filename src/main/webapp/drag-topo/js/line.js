/**
 * Created by Administrator on 2016/4/17.
 */
$(function(){

    var start = {
        elem: '#startday',
        format: 'YYYY-MM-DD',
        max: laydate.now(),/*最大日期*/
        istoday: true,
        choose: function(datas){
            end.min = datas; /*开始日选好后，重置结束日的最小日期*/
            end.start = datas; /*将结束日的初始值设定为开始日*/
        }
    };
    var end = {
        elem: '#endday',
        format: 'YYYY-MM-DD hh',
        max: laydate.now(),
        istime: true,
        istoday: true,
        choose: function(datas){
            start.max = datas; /*结束日选好后，重置开始日的最大日期*/
        }
    };


    laydate(start);
    laydate(end);


    var myDate = new Date();
    var yesterday_milliseconds=myDate.getTime()-1000*60*60*24*1;
    var yesterday= new Date();
    yesterday.setTime(yesterday_milliseconds);
    $("#startday").val(getDateTime(yesterday,"YYYY-MM-DD"));


    function getDateTime(dateStr,formatStr){
        Date.prototype.Format = function(formatStr)
        {
            var str = formatStr;
            var Week = ['日','一','二','三','四','五','六'];

            str=str.replace(/yyyy|YYYY/,this.getFullYear());
            str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));

            str=str.replace(/MM/,this.getMonth()+1>9?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));
            str=str.replace(/M/g,this.getMonth());

            str=str.replace(/w|W/g,Week[this.getDay()]);

            str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
            str=str.replace(/d|D/g,this.getDate());

            str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
            str=str.replace(/h|H/g,this.getHours());
            str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
            str=str.replace(/m/g,this.getMinutes());

            str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
            str=str.replace(/s|S/g,this.getSeconds());

            return str;
        };

        return dateStr.Format(formatStr);

    }

    var startday = null;
    var endday = null;
    var hour = null;

    var time = getSelectInfo();
    startday = time.split(",")[0];
    endday = time.split(",")[1];
    hour = time.split(",")[2];

    paint(startday,endday,hour);

    $("button").click(function(){
        time = getSelectInfo();
        startday = time.split(",")[0];
        endday = time.split(",")[1];
        hour = time.split(",")[2];
        layer.msg('加载中', {icon: 16});
        paint(startday,endday,hour);
    });

    var timeTicket = null;
    timeTicket = setInterval(function () {

        var type_flush=document.getElementById("type_flush").value;
        time = getSelectInfo();
        startday = time.split(",")[0];
        endday = time.split(",")[1];
        hour = time.split(",")[2];
        if(type_flush=="flush"){
            paint(startday,endday,hour);
        }
    }, 60000);

    function getSelectInfo(){

        var startday=document.getElementById("startday").value.replace(/-/g,"");
        var endday=document.getElementById("endday").value.split(" ",-1)[0].replace(/-/g,"");

        var hour=document.getElementById("endday").value.split(" ",-1)[1];
        return startday+","+endday+","+hour;
    }


    function paint(startday,endday,hour){
        for(var i=0;i<regJson.length;i++){
            var rid = regJson[i].rid;
            var nodeName = regJson[i].nodeName;
            var exts = regJson[i].ext;
            var extLength = exts.length;
            
            for(var j=0;j<extLength;j++){
                var ext = exts[j];
                
                var attr = rid+ext;
                if(attr=="19online_value"){
                    var height = "1000px";
                    $("#19online_value").css("height",height);
                }
                var myChart = echarts.init(document.getElementById(attr));
                var ydata = [];
                var xdata = [];
                var legend = [];
                var rid19;
                var subtext;
                $.ajax({
                    type: "POST",
                    url: rootPath + '/dataListener/getSubtext.shtml?rid='+rid+'&ext='+ext,
                    cache:false,
                    async: false,
                    dataType: 'json',
                    success: function (json) {

                        subtext = json;
                    }
                });
                

                $.ajax({
                    type: "POST",
                    url: rootPath + '/dataListener/getLineData.shtml?rid='+rid+'&ext='
                    +ext+"&startday="+ startday+"&endday="+endday+"&hour="+hour,
                    cache:false,
                    async: false,
                    dataType: 'json',
                    success: function (json) {
                        if(rid=="19"){
                            
                            rid19 = json.dpReturnResearchList;
                        }
                        
                        xdata = json.xinfo;
                        ydata = json.dpYInfo;
                        legend = json.legend;
                        
                        
                    }
                });
                var option = {
                    title: {
                        text: nodeName+":"+ext+"("+hour+"时)",
                        subtext : subtext,
                        x:'center'
                    },
                    legend: {
                        data: legend,
                        bottom : 0
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            animation: false
                        }
                    },
                    toolbox:{
                        show:true,
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    label:{
                        normal:{
                            show:true,
                            formatter: '{c}'
                        }
                    },
                    grid:{
                        width : 'auto',
                        height : 'auto'
                    }
                    ,
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisTick :{
                            show:true,
                            interval:0
                        },
                        //axisLabel:{
                        //    show :true,
                        //    interval:0
                        //},
                        name : "分钟",
                        data: xdata
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: true
                        }
                        //axisLabel:{
                        //    show :true,
                        //    interval:0
                        //}
                    },
                    series: ydata
                };

                if(rid=="18"){
                    option.title.text=nodeName+":"+ext;
                    option.yAxis.axisLabel = {};
                    option.yAxis.axisLabel.show=true;
                    option.yAxis.axisLabel.interval=0;
                    var dt = option.legend.data;
                    option.legend.selected = {};
                    var length = dt.length;
                    for (var n = 0; n < length; n++) {
                        var val = dt[n];
                        if(val!="所有游戏"){
                            option.legend.selected[val] = false;
                        }
                    }
                }else if(rid=="19"){
                    var labelRight = {
                        normal: {
                            position: 'right'
                        }
                    };
                    var labelLeft = {
                        normal: {
                            position: 'left'
                        }
                    };
                    option = {
                        title: {
                            text: nodeName+":"+ext,
                            subtext: subtext,
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            },
                            formatter:'{a}<br />{b}:{c}'
                        },
                        grid: [
                            {x: '7%', y: '7%', width: '38%', height: '25%'},
                            {x2: '7%', y: '7%', width: '38%', height: '25%'},
                            {x: '7%', y: '40%', width: '38%', height: '25%'},
                            {x2: '7%', y: '40%', width: '38%', height: '25%'},
                            {x: '7%', y2: '2%', width: '38%', height: '25%'},
                            {x2: '7%', y2: '2%', width: '38%', height: '25%'}
                        ],
                        xAxis: [
                            {
                                gridIndex: 0,
                                type : 'value',
                                position: 'top',
                                splitLine: {lineStyle:{type:'dashed'}}
                            },
                            {
                                gridIndex: 1,
                                type : 'value',
                                position: 'top',
                                splitLine: {lineStyle:{type:'dashed'}}
                            },
                            {
                                gridIndex: 2,
                                type : 'value',
                                position: 'top',
                                splitLine: {lineStyle:{type:'dashed'}}
                            },
                            {
                                gridIndex: 3,
                                type : 'value',
                                position: 'top',
                                splitLine: {lineStyle:{type:'dashed'}}
                            },
                            {
                                gridIndex: 4,
                                type : 'value',
                                position: 'top',
                                splitLine: {lineStyle:{type:'dashed'}}
                            },
                            {
                                gridIndex: 5,
                                type : 'value',
                                position: 'top',
                                splitLine: {lineStyle:{type:'dashed'}}
                            }
                        ],
                        yAxis: [
                            {
                                gridIndex: 0,
                                type : 'category',
                                axisLine: {show: false},
                                axisLabel: {show: false},
                                axisTick: {show: false},
                                splitLine: {show: false},
                                data : rid19[0].ydata
                            },
                            {
                                gridIndex: 1,
                                type : 'category',
                                axisLine: {show: false},
                                axisLabel: {show: false},
                                axisTick: {show: false},
                                splitLine: {show: false},
                                data : rid19[1].ydata
                            },
                            {
                                gridIndex: 2,
                                type : 'category',
                                axisLine: {show: false},
                                axisLabel: {show: false},
                                axisTick: {show: false},
                                splitLine: {show: false},
                                data : rid19[2].ydata
                            },
                            {
                                gridIndex: 3,
                                type : 'category',
                                axisLine: {show: false},
                                axisLabel: {show: false},
                                axisTick: {show: false},
                                splitLine: {show: false},
                                data : rid19[3].ydata
                            },
                            {
                                gridIndex: 4,
                                type : 'category',
                                axisLine: {show: false},
                                axisLabel: {show: false},
                                axisTick: {show: false},
                                splitLine: {show: false},
                                data : rid19[4].ydata
                            },
                            {
                                gridIndex: 5,
                                type : 'category',
                                axisLine: {show: false},
                                axisLabel: {show: false},
                                axisTick: {show: false},
                                splitLine: {show: false},
                                data : rid19[5].ydata
                            }
                        ],
                        series : [
                            {
                                name:rid19[0].name,
                                type:'bar',
                                xAxisIndex: [0],
                                yAxisIndex: [0],
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: '{a}:{b}'
                                    }
                                },
                                data:[
                                    {value:rid19[0].seriesData[0].value, label: rid19[0].seriesData[0].label},
                                    {value:rid19[0].seriesData[1].value, label: rid19[0].seriesData[1].label},
                                    {value:rid19[0].seriesData[2].value, label: rid19[0].seriesData[2].label},
                                    {value:rid19[0].seriesData[3].value, label: rid19[0].seriesData[3].label},
                                    {value:rid19[0].seriesData[4].value, label: rid19[0].seriesData[4].label},
                                    {value:rid19[0].seriesData[5].value, label: rid19[0].seriesData[5].label},
                                    {value:rid19[0].seriesData[6].value, label: rid19[0].seriesData[6].label},
                                    {value:rid19[0].seriesData[7].value, label: rid19[0].seriesData[7].label}
                                ]
                            },{
                                name:rid19[1].name,
                                type:'bar',
                                xAxisIndex: [1],
                                yAxisIndex: [1],
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: '{a}:{b}'
                                    }
                                },
                                data:[
                                    {value:rid19[1].seriesData[0].value, label: rid19[0].seriesData[0].label},
                                    {value:rid19[1].seriesData[1].value, label: rid19[0].seriesData[1].label},
                                    {value:rid19[1].seriesData[2].value, label: rid19[0].seriesData[2].label},
                                    {value:rid19[1].seriesData[3].value, label: rid19[0].seriesData[3].label},
                                    {value:rid19[1].seriesData[4].value, label: rid19[0].seriesData[4].label},
                                    {value:rid19[1].seriesData[5].value, label: rid19[0].seriesData[5].label},
                                    {value:rid19[1].seriesData[6].value, label: rid19[0].seriesData[6].label},
                                    {value:rid19[1].seriesData[7].value, label: rid19[0].seriesData[7].label}
                                ]
                            },{
                                name:rid19[2].name,
                                type:'bar',
                                xAxisIndex: [2],
                                yAxisIndex: [2],
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: '{a}:{b}'
                                    }
                                },
                                data:[
                                    {value:rid19[2].seriesData[0].value, label: rid19[0].seriesData[0].label},
                                    {value:rid19[2].seriesData[1].value, label: rid19[0].seriesData[1].label},
                                    {value:rid19[2].seriesData[2].value, label: rid19[0].seriesData[2].label},
                                    {value:rid19[2].seriesData[3].value, label: rid19[0].seriesData[3].label},
                                    {value:rid19[2].seriesData[4].value, label: rid19[0].seriesData[4].label},
                                    {value:rid19[2].seriesData[5].value, label: rid19[0].seriesData[5].label},
                                    {value:rid19[2].seriesData[6].value, label: rid19[0].seriesData[6].label},
                                    {value:rid19[2].seriesData[7].value, label: rid19[0].seriesData[7].label}
                                ]
                            },{
                                name:rid19[3].name,
                                type:'bar',
                                xAxisIndex: [3],
                                yAxisIndex: [3],
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: '{a}:{b}'
                                    }
                                },
                                data:[
                                    {value:rid19[3].seriesData[0].value, label: rid19[0].seriesData[0].label},
                                    {value:rid19[3].seriesData[1].value, label: rid19[0].seriesData[1].label},
                                    {value:rid19[3].seriesData[2].value, label: rid19[0].seriesData[2].label},
                                    {value:rid19[3].seriesData[3].value, label: rid19[0].seriesData[3].label},
                                    {value:rid19[3].seriesData[4].value, label: rid19[0].seriesData[4].label},
                                    {value:rid19[3].seriesData[5].value, label: rid19[0].seriesData[5].label},
                                    {value:rid19[3].seriesData[6].value, label: rid19[0].seriesData[6].label},
                                    {value:rid19[3].seriesData[7].value, label: rid19[0].seriesData[7].label}
                                ]
                            },{
                                name:rid19[4].name,
                                type:'bar',
                                xAxisIndex: [4],
                                yAxisIndex: [4],
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: '{a}:{b}'
                                    }
                                },
                                data:[
                                    {value:rid19[4].seriesData[0].value, label: rid19[0].seriesData[0].label},
                                    {value:rid19[4].seriesData[1].value, label: rid19[0].seriesData[1].label},
                                    {value:rid19[4].seriesData[2].value, label: rid19[0].seriesData[2].label},
                                    {value:rid19[4].seriesData[3].value, label: rid19[0].seriesData[3].label},
                                    {value:rid19[4].seriesData[4].value, label: rid19[0].seriesData[4].label},
                                    {value:rid19[4].seriesData[5].value, label: rid19[0].seriesData[5].label},
                                    {value:rid19[4].seriesData[6].value, label: rid19[0].seriesData[6].label},
                                    {value:rid19[4].seriesData[7].value, label: rid19[0].seriesData[7].label}
                                ]
                            },{
                                name:rid19[5].name,
                                type:'bar',
                                xAxisIndex: [5],
                                yAxisIndex: [5],
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: '{a}:{b}'
                                    }
                                },
                                data:[
                                    {value:rid19[5].seriesData[0].value, label: rid19[0].seriesData[0].label},
                                    {value:rid19[5].seriesData[1].value, label: rid19[0].seriesData[1].label},
                                    {value:rid19[5].seriesData[2].value, label: rid19[0].seriesData[2].label},
                                    {value:rid19[5].seriesData[3].value, label: rid19[0].seriesData[3].label},
                                    {value:rid19[5].seriesData[4].value, label: rid19[0].seriesData[4].label},
                                    {value:rid19[5].seriesData[5].value, label: rid19[0].seriesData[5].label},
                                    {value:rid19[5].seriesData[6].value, label: rid19[0].seriesData[6].label},
                                    {value:rid19[5].seriesData[7].value, label: rid19[0].seriesData[7].label}
                                ]
                            }
                        ]
                    };
                }else{
                    var len = option.series.length;
                    if(len!=0){
                    option.series[len-1].lineStyle = {};
                    option.series[len-1].lineStyle.normal = {};
                    option.series[len-1].lineStyle.normal.color = '#000000';
                    }
                }
                myChart.setOption(option);
            }
            }
    }





});
