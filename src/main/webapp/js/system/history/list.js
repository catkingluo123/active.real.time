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
						return "<a href='javascript:void(0)' style='text-decoration:underline' onclick='history($(this))'>"+data+"</a>"
					}
				}, {
					colkey : "jobName",
					name : "Job名称"
				}, {
					colkey : "userName",
					name : "创建者"
				}, {
					colkey : "createTime",
					name : "创建时间",
					renderData : function(rowindex,data, rowdata, column) {
						return new Date(data).format("yyyy-MM-dd hh:mm:ss");
					}
				},{
					colkey : "modifyTime",
					name : "结束时间",
					renderData : function(rowindex,data, rowdata, column) {
						return new Date(data).format("yyyy-MM-dd hh:mm:ss");
					}
				}, {
					colkey:"jobBusinessType",
					name:"业务类型"
				},{
					colkey : "jobDescript",
					name : "Job描述",
					renderData : function(rowindex,data, rowdata, column) {
						return cutstr(data,30);
					}
				},{
					colkey : "status",
					name : "任务状态",
					renderData:function(rowindex,data,rowdata,column){
						if(data=='failed'){
							return "<font color='red'>"+data+"</font>";
						}else if(data=='running'){
							return "<font color='yellow'>"+data+"</font>";
						}else if(data=='success'){
							return "<font color='green'>"+data+"</font>";
						}else if(data=='killed'){
							return "<font color='#a52a2a'>"+data+"</font>";
						}else if(data=='interrupt'){
							return "<font color='#2f4f4f'>"+data+"</font>";
						}else{
							return "<font color='black'>"+data+"</font>";
						}
					}
				},{
					colkey:"status",
					name:"操作",
					renderData:function(rowindex,data,rowdata,column){
						if(data=='running'){
							return "<a title='修改定时任务' href='javascript:void(0)' onclick='cancel(" + rowindex + ")'>"+"取消任务"+"</a>"
						}
						return ""
					}
				}],
				jsonUrl : rootPath + '/history/findByPage.shtml',
				data : {level : level},
				checkbox : true
			});


	$("#search").click("click", function() {// 绑定查询按扭
		var searchParams = $("#searchForm").serializeJson();// 初始化传参数
		grid.setOptions({
			data : searchParams
		});
	});


	$("#delHistory").click("click",function(){
		deleteHistory();
	});
});

function cancel(rowindex){
	layer.confirm('是否取消？', function(index) {
		var tab = document.getElementById("mytable");
		var hisId = tab.rows[rowindex].cells[2].innerText;
		var url = rootPath + '/history/cancelJob.shtml';
		$.post(url, {jobHisId: hisId}, function (data) {
			var cancelData = jQuery.parseJSON(data);
			layer.msg(cancelData.msg);
			if (cancelData.result == "success") {
				var searchParams = $("#searchForm").serializeJson();// 初始化传参数
				grid.setOptions({
					data: searchParams
				});
			}
		}, "json");
	});
}

function cutstr(str,len) {
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

function history(event) {
	pageii = layer.open({
		title : "历史日志",
		type : 2,
		area : [ "90%","90%" ],
		content : rootPath + '/history/jobHistory.shtml?jobHistoryId='+ event.text()
	});
}


function deleteHistory() {
	var cbox = grid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function(index) {
		var url = rootPath + '/history/deleteHistory.shtml';
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