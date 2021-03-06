<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/common/common.jspf"%>
<script type="text/javascript" src="${ctx}/js/system/group/edit.js"></script>
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
		action="${ctx}/groups/editEntity.shtml">
		<input type="hidden" class="form-control checkacc" value="${group.id}"
			name="groupFormMap.id" id="id">
		<section class="panel panel-default">
			<div class="panel-body">
				<div class="form-group">
					<label class="col-sm-3 control-label">组别名</label>
					<div class="col-sm-9">
						<input type="text" class="form-control checkRole"
							placeholder="请输入组别名" name="groupFormMap.name" id="name" value="${group.name}"/>
					</div>
				</div>
				<div class="line line-dashed line-lg pull-in"></div>
				<div class="form-group">
					<label class="col-sm-3 control-label">roleKey</label>
					<div class="col-sm-9">
						<input type="text" class="form-control checkacc"
							placeholder="请输入组别关键字" name="groupFormMap.groupKey" id="roleKey" value=${group.groupKey}>
					</div>
				</div>
				<div class="line line-dashed line-lg pull-in"></div>
				<div class="form-group">
					<label class="col-sm-3 control-label">描述</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" placeholder="请输入组别描述"
							name="groupFormMap.description" id="description" value="${group.description}">
					</div>
				</div>
				<div class="line line-dashed line-lg pull-in"></div>
				<div class="form-group">
					<label class="col-sm-3 control-label">组别状态</label>
					<div class="col-sm-9">
						<div class="btn-group m-r">
							<button data-toggle="dropdown"
								class="btn btn-sm btn-default dropdown-toggle">
								<span class="dropdown-label"><c:if test="${group.state eq 0}">是</c:if><c:if test="${group.state eq 1}">否</c:if></span> <span class="caret"></span>
							</button>
							<ul class="dropdown-menu dropdown-select">
								<li class=""><a href="#"><input type="radio"
										name="groupFormMap.state" value="0" <c:if test="${group.state eq 0}"> checked="checked"</c:if>>是</a></li>
								<li class="active"><a href="#"><input type="radio"
										name="groupFormMap.state" value="1" <c:if test="${group.state eq 1}"> checked="checked"</c:if>>否</a></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="line line-dashed line-lg pull-in"></div>
			</div>
			<footer class="panel-footer text-right bg-light lter">
			<button type="submit" class="btn btn-success btn-s-xs">提交</button>
		</footer> 
	</section>
	</form>
	<script type='text/javascript'>
		/* $(function(){
			$("from input[name='enable'][value='${role.enable}']").attr("checked","checked");
			alert("input[name='enable'][value='${role.enable}']");
		}); */
	</script>
</body>
</html>