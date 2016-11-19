<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <%@include file="/common/common.jspf"%>
 <script type="text/javascript" src="${ctx}/js/system/access/edit.js">
  </script>

  <style type="text/css">
    .col-sm-3 {
      width: 15%;
      float: left;
    }

    .col-sm-9 {
      width: 85%;
      float: left;
    }


  </style>
</head>
<body>
<div class="l_err" style="width: 100%; margin-top: 2px;"></div>
<form id="form" name="form" class="form-horizontal" method="post"
      action="${ctx}/hive/editEntity.shtml">
  <input type="hidden" class="form-control checkacc"
         value="${user.id}" name="userFormMap.userId" id="id">
  <input type="hidden" value="" name="opeIds" id="opeIds"/>
  <section class="panel panel-default">
    <div class="panel-body">
    <div class="form-group">
      <table  id="mytable" class="pp-list table table-striped table-bordered" style="margin-bottom: -3px; width: 600px; ">
        <thead>
        <tr><th style="width: 10%">操作类型</th><th>查询</th><th>增加</th><th>删除</th><th>修改</th></tr>
        </thead>
        <tbody>
        <tr><td></td>
          <td><input type="checkbox" checked="checked" name="opechk" value="1"></td>
          <td><input type="checkbox"  name="opechk" value="1"></td>
          <td><input type="checkbox"  name="opechk" value="1"></td>
          <td><input type="checkbox"  name="opechk" value="1"></td>
        </tr>
        </tbody>
      </table></div>
      <!--在这里异步请求获得用户已有Hive权限表-->
    <div class="line line-dashed line-lg pull-in"></div>
      <div id="selGroup"
           data-url="/hive/selHive.shtml?userFormMap.userId=${user.id}">

      </div>
      <footer class="panel-footer text-right bg-light lter">
      <button type="submit" class="btn btn-success btn-s-xs">保存</button>
    </footer></div> </section>
</form>
<script type="text/javascript">
  onloadurl();
</script>
</body>
</html>
