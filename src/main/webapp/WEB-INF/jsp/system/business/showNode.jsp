<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/4/19
  Time: 20:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <!--utilfunc(start)-->
  <link rel="stylesheet" type="text/css" href="${ctx}/drag-topo/utilfunc/css/reset.css">
  <link rel="stylesheet" type="text/css" href="${ctx}/drag-topo/utilfunc/css/utilfunc.css">
  <script type="text/javascript" src="${ctx}/drag-topo/utilfunc/js/jquery-1.11.1.min.js"></script>
  <script type="text/javascript" src="${ctx}/drag-topo/utilfunc/js/jquery.popui.js"></script>
  <script type="text/javascript" src="${ctx}/drag-topo/utilfunc/js/utilfunc.js"></script>
  <script type="text/javascript" src="${ctx}/drag-topo/utilfunc/js/utilfunc-ui.js"></script>
  <!--utilfunc(end)-->
  <!--layer-->
  <script type="text/javascript" src="${ctx}/js/layer-v1.9.2/layer/layer.js"></script>
  <script type="text/javascript" src="${ctx}/js/layer-v1.9.2/layer/extend/layer.ext.js"></script>
  <!--layer-->
  <!--plugin(start)-->
  <script type="text/javascript" src="${ctx}/drag-topo/plugin/jquery-ui-1.11.2.min.js"></script>
  <script type="text/javascript" src="${ctx}/drag-topo/plugin/jquery.jsPlumb-1.7.2-min.js"></script>
  <!--plugin(end)-->
  <!--echarts-->
  <script type="text/javascript" src="${ctx}/drag-topo/js/echarts.min.js"></script>
  <script type="text/javascript" src="${ctx}/drag-topo/js/line.js"></script>
  <!--echarts-->
  <!--37ui-->
  <link href="${pageContext.request.contextPath}/37uicss/bootstrap.min.css" rel="stylesheet">
  <link href="${pageContext.request.contextPath}/37uicss/contents.min.css" rel="stylesheet">
  <script type="text/javascript" src="${pageContext.request.contextPath}/37uicss/bootstrap.min.js"></script>
  <script type="text/javascript" src="${pageContext.request.contextPath}/37uicss/sq-components.min.js"></script>
  <script type="text/javascript" src="${pageContext.request.contextPath}/37uicss/jquery.nicescroll.min.js"></script>
  <!--37ui-->
  <script type="text/javascript">
    var rootPath = "${ctx}";

  </script>

  <title>活跃数监控</title>
</head>

<body>
<div class="panel panel-default">
  <div class="panel-body">
    <div class="row">
      <form method="post" class="form-horizontal">
        <div class="row">
          <div class="form-group" style="margin-top: 15px">
            <label class="col-md-2 control-label">开始日期</label>

            <div class="col-md-2">
              <div class="input-group date" id="wrapper-start">
                <input type="text" class="form-control" id="startday">
                <a href="javascript:;" class="input-group-addon">
                  <span class="fa fa-clock-o"></span>
                </a>
              </div>
            </div>

            <label class="col-md-1 control-label">结束日期</label>

            <div class="col-md-2">
              <div class="input-group date" id="wrapper-end">
                <input type="text" class="form-control" id="endday">
                <a href="javascript:;" class="input-group-addon">
                  <span class="fa fa-clock-o"></span>
                </a>
              </div>
            </div>

            <label class="col-md-1 control-label">数据刷新</label>
            <div class="col-md-2">
              <select class="form-control m-b" name="type_flush" id="type_flush">
                <option value="no_flush">关闭->不刷新</option>
                <option value="flush">默认->每5秒刷新</option>
              </select>
            </div>


            <div class="col-md-1">
              <button class="btn btn-primary btn-block" type="button"><strong>查询</strong></button>
            </div>

          </div>

        </div>
      </form>
    </div>
  </div>
</div>

<div id="active" style="margin:0 auto;width: 1360px;height: 400px;"></div>

</body>
