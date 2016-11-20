<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html lang="en" class="app js no-touch no-android chrome no-firefox no-iemobile no-ie no-ie10 no-ie11 no-ios no-ios7 ipad">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- Google Chrome Frame也可以让IE用上Chrome的引擎: -->
<meta http-equiv="X-UA-Compatible" content="IE=edge;chrome=1">
<link href="/favicon.ico" type="image/x-icon" rel=icon>
<link href="/favicon.ico" type="image/x-icon" rel="shortcut icon">
<meta name="renderer" content="webkit">
<title>登录－活跃量监控</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet"
	href="${ctx}/admin_files/min.css">
<link rel="stylesheet"
	href="${ctx}/admin_files/login.css">
<link
	href="${ctx}/admin_files/css.css"
	rel="stylesheet" type="text/css">
<script type="text/javascript" src="${ctx}/js/jquery/jquery-1.11.1.min.js"></script>
<style type="text/css">
	<%--html, body--%>
	<%--{--%>
		<%--/*此部分支持chrome，应该也支持firefox*/--%>
		<%--background: rgb(246,248,249);--%>
		<%--background: url('${ctx}/images/lol/dongrihenying.jpg') no-repeat center fixed;--%>
		<%--background-size: 100% 100%;--%>
		/*以下是IE部分，使用滤镜*/
		<%--filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${ctx}/images/lol/tianshi.jpg',sizingMethod= scale);--%>
		<%--font: normal 12px tahoma, arial, verdana, sans-serif;--%>
		<%--margin: 0;--%>
		<%--padding: 0;--%>
		<%--border: 0 none;--%>
		<%--overflow: hidden;--%>
		<%--height: 100%;--%>
	/*}*/

	/*html, form{*/
		/*background-color: rgba(0, 0, 0, 0.5) !important;*/
		/*background-color: #000; filter: alpha(opacity = 50);*/
		/*color: #FFF; bottom: 0px; right: 0px;*/
		/*border: 1px solid #000;*/
	/*}*/
	.alpha {

	}
</style>
</head>
<body
	style="background-image: url('${ctx}/admin_files/9.jpg');margin-top:0px;">
	<div id="loginbox" style="padding-top: 10%;">
		<form id="loginform" name="loginform" class="form-vertical"
			style="background-color: rgba(0, 0, 0, 0.5) !important; background: #000; filter: alpha(opacity = 50); *background: #000; *filter: alpha(opacity = 50); /*黑色透明背景结束*/ color: #FFF; bottom: 0px; right: 0px; border: 1px solid #000;"
			action="${ctx}/login.shtml"
			method="post">
			<div class="control-group normal_text">
				<table style="width: 100%">
					<tr>
						<td align="left"><img
							src="${ctx}/admin_files/logo_left.png"
							alt="Logo"></td>
							<td align="center" style="font-weight: bold;color: gray;">活跃量监控WEB</td>
						<td align="right"><img
							src="${ctx}/admin_files/logo_left.png"
							alt="Logo"></td>
					</tr>
				</table>


			</div>
			<div class="control-group">
				<div class="controls">
					<div class="main_input_box">
						<span class="add-on bg_ly" style="background: #28b779"><img
							src="${ctx}/admin_files/account_1.png"
							alt="请输入账号.."></span><input type="text" placeholder="username" name="username" value="admin"
							style="height: 32px; margin-bottom: 0px;"/>
					</div>
				</div>
			</div>
			<div class="control-group">
				<div class="controls">
					<div class="main_input_box">
						<span class="add-on bg_ly"><img
							src="${ctx}/admin_files/lock_1.png"
							alt="请输入密码.."></span><input type="password" placeholder="password" name="password" value="chycr1924" style="height: 32px; margin-bottom: 0px;"/>
					</div>
				</div>
			</div>
			<div class="form-actions">
				<%--<span class="pull-left" style="width: 33%"><a href="#"--%>
					<%--class="flip-link btn btn-info" id="to-recover">忘记密码？</a></span>--%>
					<%--<span class="pull-left" style="width: 33%"><a href="install.shtml"
					class="flip-link btn btn-danger" id="to-recover">一键初始化系统</a></span>--%>
					 <span
					class="pull-right"><a type="submit"
					href="javascript:checkUserForm()" class="btn btn-success">登&nbsp;&nbsp;录</a></span>
			</div>
		</form>
	</div>
	<script type="text/javascript">
		<%--$(function(){--%>
			<%--var error = "${error}";--%>
			<%--if(error != null || error != ""){--%>
				<%--alert(error);--%>
			<%--}--%>
		<%--});--%>
		function checkUserForm() {
			document.loginform.submit();
		}
	</script>
</body>
</html>