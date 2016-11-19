<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2015/12/28
  Time: 9:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
    <title>SERVER INFO</title>
</head>
<script type="text/javascript" src="${ctx}/js/echarts/echarts-all.js"></script>
<script type="text/javascript" src="${ctx}/js/jquery/jquery-1.11.1.min.js"></script>


<body>
<div id="serverInfo" style="height: 400px">
</div>
<div id="serverPer" style="height: 300px"></div>
<script type="text/javascript">
  var rootPath = "${ctx}";
  var host = "${host}"
</script>
<script src="${ctx}/js/system/monitor/serverInfo.js"></script>
</body>
</html>
