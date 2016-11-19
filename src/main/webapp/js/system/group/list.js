var pageii = null;
var grid = null;
$(function() {
	grid = lyGrid({
		id : 'paging',
		l_column : [ {
			colkey : "id",
			name : "id",
			width : "50px",
			hide : false
		}, {
			colkey : "name",
			name : "组别名"
		}, {
			colkey : "state",
			name : "状态",
			width : "100px"
		}, {
			colkey : "groupKey",
			name : "组别关键字"
		}, {
			colkey : "description",
			name : "描述"
		} ],
		jsonUrl : rootPath + '/groups/findByPage.shtml',
		checkbox : true
	});
	$("#search").click("click", function() {// 绑定查询按扭
		var searchParams = $("#searchForm").serializeJson();// 初始化传参数
		grid.setOptions({
			data : searchParams
		});
	});
	$("#addGroup").click("click", function() {
		addGroup();
	});
	$("#editGroup").click("click", function() {
		editGroup();
	});
	$("#delGroup").click("click", function() {
		delGroup();
	});
	$("#permissions").click("click", function() {
		permissions();
	});
});
function editGroup() {
	var cbox = grid.getSelectedCheckbox();
	if (cbox.length > 1 || cbox == "") {
		layer.msg("只能选中一个");
		return;
	}
	pageii = layer.open({
		title : "编辑",
		type : 2,
		area : [ "600px", "60%" ],
		content : rootPath + '/groups/editUI.shtml?id=' + cbox
	});
}
function permissions() {
	var cbox = grid.getSelectedCheckbox();
	if (cbox.length > 1 || cbox == "") {
		layer.msg("请选择一个对象！");
		return;
	}
	var url = rootPath + '/resources/permissions.shtml?roleId='+cbox;
	pageii = layer.open({
		title : "分配权限",
		type : 2,
		area : [ "700px", "60%" ],
		content : url
	});
}
function addGroup() {
	pageii = layer.open({
		title : "新增",
		type : 2,
		area : [ "600px", "60%" ],
		content : rootPath + '/groups/addUI.shtml'
	});
}
function delGroup() {
	var cbox = grid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function(index) {
		var url = rootPath + '/groups/deleteEntity.shtml';
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
