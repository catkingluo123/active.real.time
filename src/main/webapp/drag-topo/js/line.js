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
    var yesterday_milliseconds=myDate.getTime()-1000*60*60*24*6;
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
        paint(startday,endday);
    });

    var timeTicket = null;
    timeTicket = setInterval(function () {

        var type_flush=document.getElementById("type_flush").value;
        time = getSelectInfo();
        startday = time.split(",")[0];
        endday = time.split(",")[1];
        hour = time.split(",")[2];
        if(type_flush=="flush"){
            paint(startday,endday);
        }
    }, 5000);

    function getSelectInfo(){

        var startday=document.getElementById("startday").value.replace(/-/g,"");
        var endday=document.getElementById("endday").value.split(" ",-1)[0].replace(/-/g,"");

        var hour=document.getElementById("endday").value.split(" ",-1)[1];
        return startday+","+endday+","+hour;
    }


    function paint(startday,endday) {

        var myChart = echarts.init(document.getElementById("active"));
        var ydata = [];
        var xdata = [];
        var legend = ['活跃数'];

        $.ajax({
            type: "POST",
            url: rootPath + '/dataListener/getLine.shtml?startday='+startday+'&endday='+endday,
            cache:false,
            async: false,
            dataType: 'json',
            success: function (json) {
                data = JSON.parse(json);
                ydata = data.ydata;
                xdata = data.xdata;
            }
        });

        var option = {
            title: {
                text: "实时活跃数",
                subtext: "7天内每天实时活跃数",
                x: 'center'
            },
            legend: {
                data: legend,
                bottom: 0
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            label: {
                normal: {
                    show: true,
                    formatter: '{c}'
                }
            },
            grid: {
                width: 'auto',
                height: 'auto'
            }
            ,
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisTick: {
                    show: true,
                    interval: 0
                },
                //axisLabel:{
                //    show :true,
                //    interval:0
                //},
                name: "日期",
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


        myChart.setOption(option);
    }





});
