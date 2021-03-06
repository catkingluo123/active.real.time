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
  <link rel="stylesheet" type="text/css" href="${ctx}/WEB-INF/jsp/system/drag-topo/utilfunc/css/reset.css">
  <link rel="stylesheet" type="text/css" href="${ctx}/WEB-INF/jsp/system/drag-topo/utilfunc/css/utilfunc.css">
  <script type="text/javascript" src="${ctx}/WEB-INF/jsp/system/drag-topo/utilfunc/js/jquery-1.11.1.min.js"></script>
  <script type="text/javascript" src="${ctx}/WEB-INF/jsp/system/drag-topo/utilfunc/js/jquery.popui.js"></script>
  <script type="text/javascript" src="${ctx}/WEB-INF/jsp/system/drag-topo/utilfunc/js/utilfunc.js"></script>
  <script type="text/javascript" src="${ctx}/WEB-INF/jsp/system/drag-topo/utilfunc/js/utilfunc-ui.js"></script>
  <!--utilfunc(end)-->

  <!--plugin(start)-->
  <script type="text/javascript" src="${ctx}/WEB-INF/jsp/system/drag-topo/plugin/jquery-ui-1.11.2.min.js"></script>
  <script type="text/javascript" src="${ctx}/WEB-INF/jsp/system/drag-topo/plugin/jquery.jsPlumb-1.7.2-min.js"></script>
  <!--plugin(end)-->

  <!--topo(start)-->
  <link rel="stylesheet" type="text/css" href="${ctx}/WEB-INF/jsp/system/drag-topo/css/topo.css">
  <script type="text/javascript" src="${ctx}/WEB-INF/jsp/system/drag-topo/js/topo.js"></script>
  <!--topo(end)-->

  <title>dtopo</title>
</head>

<body class="topobody">
<div class="topocon">
  <div class="topoleft">
    <div class="companylogo"><a href="#nogo"><img src="${ctx}/WEB-INF/jsp/system/drag-topo/images/logo.gif" alt="" /></a></div>
    <div class="lefticon" id="lefticon">
      <div class="iconitems" icontype="uiscreen">
        <img src="${ctx}/WEB-INF/jsp/system/drag-topo/images/little-icon/screen.gif" alt="" />
        <span>显示器</span>
      </div>
      <div class="iconitems" icontype="uicamera">
        <img src="${ctx}/WEB-INF/jsp/system/drag-topo/images/little-icon/camera.gif" alt="" />
        <span>摄像头</span>
      </div>
      <div class="iconitems" icontype="uiprint">
        <img src="${ctx}/WEB-INF/jsp/system/drag-topo/images/little-icon/print.gif" alt="" />
        <span>打印机</span>
      </div>
      <div class="iconitems" icontype="uifirework">
        <img src="${ctx}/WEB-INF/jsp/system/drag-topo/images/little-icon/firework.gif" alt="" />
        <span>防火墙</span>
      </div>
    </div>
  </div>
  <div class="toporight">
    <div class="funcbtn">
      <ul id="linewrap">
        <li>
          <span><img src="${ctx}/WEB-INF/jsp/system/drag-topo/images/line0.gif" alt="文档" /><em>文档</em><i></i></span>
          <span><img src="${ctx}/WEB-INF/jsp/system/drag-topo/images/line7.gif" alt="使用" /><em>使用</em><i></i></span>
        </li>
        <li>
          <span><img src="${ctx}/WEB-INF/jsp/system/drag-topo/images/line1.gif" alt="冷备" /><em>冷备</em><i></i></span>
          <span><img src="${ctx}/WEB-INF/jsp/system/drag-topo/images/line5.gif" alt="热备" /><em>热备</em><i></i></span>
        </li>
        <li>
          <span><img src="${ctx}/WEB-INF/jsp/system/drag-topo/images/line2.gif" alt="依耐" /><em>依赖</em><i></i></span>
          <span><img src="${ctx}/WEB-INF/jsp/system/drag-topo/images/line4.gif" alt="父子" /><em>父子</em><i></i></span>
        </li>
        <li>
          <span class="focus"><img src="${ctx}/WEB-INF/jsp/system/drag-topo/images/line3.gif" alt="安装在...上" /><em>安装在...上</em><i></i></span>
          <span><img src="${ctx}/WEB-INF/jsp/system/drag-topo/images/line6.gif" alt="连接" /><em>连接</em><i></i></span>
        </li>
      </ul>
      <div class="morebtn">
        <a id="saveTopoBtn"><img src="${ctx}/WEB-INF/jsp/system/drag-topo/images/icon0.gif" alt="保存" /><font>保存</font></a>
        <a id="viewTopoBtn"><img src="${ctx}/WEB-INF/jsp/system/drag-topo/images/icon0.gif" alt="预览" /><font>预览</font></a>
        <!--<a><img src="images/icon1.gif" alt="导出" /><font>导出</font></a>-->
      </div>
    </div>
    <div class="topocontent" id="topocontent">
      <!--<div class="elebox"><img src="images/big-icon/screen.gif" alt="" /><span>高清显示器</span></div>-->
    </div>
  </div>
</div>
<div class="rightkeypop" id="rightkeyPop">
  <span class="delele" id="delEle">删除元素</span>
  <div class="relevancebox" id="relevanceBox">
    <span class="relevanceto">关联到</span>
    <div class="relation_wrap" id="relationWrap">
      <a>高清显示器</a>
      <a>5K等离子显示器</a>
      <a>高清显示器</a>
      <a>5K等离子显示器</a>
    </div>
  </div>
</div>
<div class="loading_pop" id="loadingPop"><img src="${ctx}/WEB-INF/jsp/system/drag-topo/images/loading.gif" width="500" height="500" alt="loading......"></div>
<div id="num"></div>
</body>
</html>

