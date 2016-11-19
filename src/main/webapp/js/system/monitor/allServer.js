var dialog;
var grid;
$(function() {
    grid = lyGrid({
        id : 'paging',
        l_column : [ {
            colkey : "host",
            name : "Host",
            hide:false,
            renderData : function(rowindex,data, rowdata, column) {

                return "<a href='javascript:void(0)' onclick='serverInfo($(this))'>"+data+"</a>"
            }
        }, {
            colkey : "cpu_num",
            name : "CPU核数"
        }, {
            colkey : "cpu_speed",
            name : "CPU速率(MHZ)"
        }, {
            colkey : "disk_total",
            name : "硬盘容量(GB)"
        }, {
            colkey : "swap_total",
            name : "swap容量(GB)"
        } ,{
            colkey : "mem_total",
            name : "内存容量(GB)"
        } ,{
            colkey : "os_name",
            name : "操作系统"
        } ,{
            colkey : "boottime",
            name : "上次启动时间",
            renderData : function(rowindex,data, rowdata, column) {
                return new Date(data).format("yyyy-MM-dd hh:mm:ss");
            }
        }],
        jsonUrl : rootPath + '/monitor/findAllServer.shtml',
        checkbox : true
    });
});

function serverInfo(data){
    pageii=layer.open({
        title:"SERVER INFO",
        type:2,
        area:["100%","100%"],
        content:rootPath+'/monitor/serverInfo.shtml?host='+data.text()
    });
}