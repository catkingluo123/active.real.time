var pageii = null;
var grid = null;
$(function() {
    grid = lyGrid({
        pagId : 'paging',
        l_column : [ {
            colkey : "id",
            name : "id"
        }, {
            colkey : "userName",
            name : "用户名"
        }, {
            colkey : "accountName",
            name : "账号"
        }, {
            colkey : "groupName",
            name : "所属组别"
        },{
            colkey : "roleName",
            name : "所属角色"
        }, {
            colkey : "locked",
            name : "账号状态",
            width : '90px'
        }, {
            colkey : "description",
            name : "描述"
        }, {
            colkey : "createTime",
            name : "时间",
            renderData : function(rowindex,data, rowdata, column) {
                return new Date(data).format("yyyy-MM-dd hh:mm:ss");
            }
        }],
        jsonUrl : rootPath + '/hive/findByPage.shtml',
        checkbox : true,
        serNumber : true
    });
    $("#search").click("click", function() {// 绑定查询按扭
        var searchParams = $("#searchForm").serializeJson();// 初始化传参数
        grid.setOptions({
            data : searchParams
        });
    });
    $("#permissions").click("click", function() {
        permissions();
    });
    $("#editUI").click("click", function () {
        editUI();
    });

});
function editUI() {
    var cbox = grid.getSelectedCheckbox();
    if (cbox.length > 1 || cbox == "") {
        layer.msg("只能选中一个");
        return;
    }
    pageii = layer.open({
        title : "编辑",
        type : 2,
        area : [ "800px", "80%" ],
        content : rootPath + '/hive/editUI.shtml?id=' + cbox
    });
}


function permissions() {
    var cbox = grid.getSelectedCheckbox();
    if (cbox.length > 1 || cbox == "") {
        layer.msg("请选择一个对象！");
        return;
    }
    var url = rootPath + '/hive/permissions.shtml?userId='+cbox;
    pageii = layer.open({
        title : "分配权限",
        type : 2,
        area : [ "700px", "80%" ],
        content : url
    });
}
