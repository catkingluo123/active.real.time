var dialog;
var grid;
$(function() {
	grid = lyGrid({
				id : 'paging',
				l_column : [ {
					colkey : "id",
					name : "id",
					hide : false,
					renderData : function(rowindex,data, rowdata, column) {
						//return "<a href=\"/domino/job/editJob.shtml\">"+data+"</a>";
						return "<a href='javascript:void(0)' style='text-decoration:underline' onclick='openWin($(this))'>"+data+"</a>"
					}
				}, {
					colkey : "jobName",
					name : "Job名称"
				}, {
					colkey:"userName",
					name:"创建者"
				},{
					colkey : "jobCreateTime",
					name : "创建时间",
					renderData : function(rowindex,data, rowdata, column) {
						return new Date(data).format("yyyy-MM-dd hh:mm:ss");
					}
				}, {
					colkey:"jobVersion",
					name:"当前版本"
				},{
					colkey:"jobBusinessType",
					name:"业务类型"
				},{
					colkey : "jobDescript",
					name : "Job描述",
					renderData : function(rowindex,data, rowdata, column) {
						return cutstr(data,30);
					}
				}],
				jsonUrl : rootPath + '/job/findByPage.shtml',
				data:{level:level},
				checkbox : true,
				serNumber : true
			});
	$("#search").click("click", function() {// 绑定查询按扭
		var searchParams = $("#searchForm").serializeJson();// 初始化传参数
		grid.setOptions({
			data : searchParams
		});
	});

	$("#addJob").click("click", function() {
		addJob();
	});
	$("#delJob").click("click",function(){
		deleteJob();
	});

	$("#editJob").click("click",function(){
		editJob();
	});
});

function cutstr(str,len)
{
	var str_length = 0;
	var str_len = 0;
	str_cut = new String();
	str_len = str.length;
	for(var i = 0;i<str_len;i++)
	{
		a = str.charAt(i);
		str_length++;
		if(escape(a).length > 4)
		{
			//中文字符的长度经编码之后大于4
			str_length++;
		}
		str_cut = str_cut.concat(a);
		if(str_length>=len)
		{
			str_cut = str_cut.concat("...");
			return str_cut;
		}
	}
	//如果给定字符串小于指定长度，则返回源字符串；
	if(str_length<len){
		return  str;
	}
}

function openWin(obj){
	pageii=layer.open({
		titel:"任务编辑",
		type:2,
		area:["100%","100%"],
		content:rootPath+'/job/topo.shtml?id='+obj.text()
	});
}

function addJob(){
	pageii=layer.open({
		title : "新增",
		type : 2,
		area : [ "600px", "65%" ],
		content : rootPath + '/job/addJob.shtml?level='+level
	});
}

function editJob(){
	var cbox=grid.getSelectedCheckbox();
	if(cbox.length>1||cbox==""){
		layer.msg("只能选中一个");
		return;
	}
	pageii=layer.open({
		title:"编辑",
		type : 2,
		area : ["600px","65%"],
		content : rootPath+"/job/editJob.shtml?id="+cbox
	});
}

function deleteJob() {
	var cbox = grid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function(index) {
		var url = rootPath + '/job/deleteJob.shtml';
		var s = CommnUtil.ajax(url, {
			ids : cbox.join(",")
		}, "json");
		if (s == "success") {
			layer.msg('删除成功');
			grid.loadData();
		} else {
			layer.msg('删除失败');
		}
	});
}