<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/1/22
  Time: 19:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
  <script type="text/javascript" src="${ctx}/js/jquery/jquery-1.11.1.min.js"></script>
  <link rel="stylesheet"
        href="${ctx}/css/bootstrap.min.css">
  <style type="text/css">

    body {
      color: #3c3c3c;
      font: 12px/1.5 "Microsoft Yahei",SimSun;
    }
    .postPicture{
      width:500px;
      margin:0 auto;
      text-align:center;
      background: rgb(246,248,249);
      background: url('${ctx}/images/post/user-top.jpg') no-repeat center fixed;
      background-size: 100% 100%;
      padding: 0;
      border: 0 none;
      overflow: hidden;
      height: 155px;
    }
    .nickName{
      width:100px;
      margin:0 auto;
      text-align:center;
      height: 155px;
    }

    .a9c {
      color: #9c9c9c;
    }

  </style>
  <script type="text/javascript">
    $(document).ready(function(){
      var error = false;

      $("#username").blur(function(){
        var username = $("#username").val();
        if(username == '') {
          showError('username', '账户不能为空');
          error = true;
          return;
        }

        $.post("${ctx}/user/isExists.shtml", {flag:1, username:username}, function(data){
          if(data=="true") {
            $("#username").css({"border-color":"green"});
            $("#usernameTip").css({"display":"none"});
          } else {
            showError('username', '账户不存在');
            error = true;
          }
        });
      });

      $("#oldpass").blur(function(){
        var username = $("#username").val();
        if(username=='') {
          showError('username', '账户不能为空');
          error = true;
          return;
        }

        var oldpass = $("#oldpass").val();
        if(oldpass =='') {
          showError('oldpass', '密码不能为空');
          error = true;
          return;
        }

        $.post("${ctx}/user/isExists.shtml", {flag:2, username:username, oldpass:oldpass}, function(data){
          if(data=="true") {
            $("#oldpass").css({"border-color":"green"});
            $("#oldpassTip").css({"display":"none"});
          } else {
            showError('oldpass', '密码错误');
            error = true;
          }
        });
      });

      $("#newpass").blur(function(){
        var newpass = $("#newpass").val();
        if(newpass == '') {
          showError('newpass', '新密码不能为空');
          error = true;
        }
        else {
          $("#newpass").css({"border-color":"green"});
          $("#newpassTip").css({"display":"none"});
        }
      });

      $("#newpassAgain").blur(function(){
        var newpass = $("#newpass").val();
        if(newpass == '') {
          showError('newpass', '新密码不能为空');
          error = true;
          return;
        }

        var newpassAgain = $("#newpassAgain").val();
        if(newpassAgain != newpass) {
          showError('newpassAgain', '与输入的新密码不一致');
          error = true;
        }
        else {
          $("#newpassAgain").css({"border-color":"green"});
          $("#newpassAgainTip").css({"display":"none"});
        }
      });

      $("#submit").click(function(event){
        $("#username").blur();
        $("#oldpass").blur();
        $("#newpass").blur();
        $("#newpassAgain").blur();

        if(!error) {
          var username = $("#username").val();
          var newpass = $("#newpass").val();
          $.post('${ctx}/user/isExists.shtml', {flag:3, username:username, newpass:newpass}, function(data) {
            if(data=="true"){
              $("#modifySuccess").css({'display':'inline'});
            }
          });
        }

        event.preventDefault();
        return false;
      });
    });

    function showError(formSpan, errorText) {
      $("#" + formSpan).css({"border-color":"red"});
      $("#" + formSpan + "Tip").empty();
      $("#" + formSpan + "Tip").append(errorText);;
      $("#" + formSpan + "Tip").css({"display":"inline"});
    }
  </script>
</head>
<body>
<div class="postPicture">
  <img alt="头像" class="user-avatar" id="avatar" width="150" height="150" src="http://img1.37wanimg.com/www2015/images/user/avatar/fg-a-ava-13.png">

</div>
<div class="nickName">
  <a href="javascript:;" class="user-avatar-edit a9c" id="avatar-edit" title="修改头像">修改头像</a>
  <p><h2>${userFormMap.userName}</h2></p>
  <span><h3>${userFormMap.groupName}</h3></span>
</div>
<div class=".container" style="margin-top:100px;width:250%;">
  <form class="form-horizontal" role="form">
    <div class="form-group">
      <label for="username" class="col-sm-2 control-label">账户</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" style="width:250px;" id="username" placeholder="Username" value="${userFormMap.accountName}" disabled="true"><span id="usernameTip" style="display:none;color:red;"></span>
      </div>
    </div>
    <div class="form-group">
      <label for="oldpass" class="col-sm-2 control-label">旧密码</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" style="width:250px;" id="oldpass" placeholder="Old Password"><span id="oldpassTip" style="display:none;color:red;"></span>
      </div>
    </div>
    <div class="form-group">
      <label for="newpass" class="col-sm-2 control-label">新密码</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" style="width:250px;" id="newpass" placeholder="New Password"><span id="newpassTip" style="display:none;color:red;"></span>
      </div>
    </div>
    <div class="form-group">
      <label for="newpassAgain" class="col-sm-2 control-label">再次确认新密码</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" style="width:250px;" id="newpassAgain" placeholder="Again New Password"><span id="newpassAgainTip" style="display:none;color:red;"></span>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">  </label>
      <button type="submit" class="btn btn-primary" id="submit" style="text-align:center;">确认修改</button>
    </div>
  </form>
</div>
<div id="modifySuccess" class="alert alert-success alert-dismissable" style="width:50%;margin-left:40%;display:none;">
  <strong>Success!</strong> 你已成功修改密码！
</div>

</body>
</html>