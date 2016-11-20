var dialog;
var grid;
$(function() {
	grid = lyGrid({
				id : 'paging',
				l_column : [
					{
					colkey : "businessType",
					name : "监控业务类型",
					renderData : function(rowindex,data,rowdata,column) {
						return "<a href='javascript:void(0)' style='text-decoration:underline' onclick='openWin(\"" + data +"\")'>"+data+"</a>";
					}
				}, {
					colkey:"userName",
					name:"创建者"
				},{
					colkey : "lastModifyTime",
					name : "最近修改时间",
					renderData : function(rowindex,data, rowdata, column) {
						return new Date(data).format("yyyy-MM-dd hh:mm:ss");
					}
				}, {
					colkey : "status",
					name : "任务状态",
					renderData:function(rowindex,data,rowdata,column){
						if(data=='0'){
							return "<font color='red'>故障</font>";
						}else{
							return "<font color='green'>正常</font>";
						}
					}
				}],
				jsonUrl : rootPath + '/dataListener/findByPage.shtml'
			});
	$("#search").click("click", function() {// 绑定查询按扭
		var searchParams = $("#searchForm").serializeJson();// 初始化传参数
		grid.setOptions({
			data : searchParams
		});
	});
});

function openWin(data){
	var url = rootPath+'/dataListener/showNode.shtml?business='+data;
	url = encodeURI(url);
	url = encodeURI(url);
	window.open(url);
}

