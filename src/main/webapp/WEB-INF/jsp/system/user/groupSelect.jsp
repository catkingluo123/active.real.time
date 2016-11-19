<%--
  Created by IntelliJ IDEA.
  User: CHENRAN
  Date: 2015/11/10 0010
  Time: 10:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript">
  $(document).ready(function() {
    $("#groupsForSelect1").dblclick(function() {
      selected1();
    });
    $("#selectGroups1").dblclick(function() {
      unselected1();
    });
  });
  function selected1() {
    var selOpt = $("#groupsForSelect1 option:selected");

    selOpt.remove();
    var selObj = $("#selectGroups1");
    selObj.append(selOpt);

    var selOpt = $("#selectGroups1")[0];
    ids = "";
    for (var i = 0; i < selOpt.length; i++) {
      ids += (selOpt[i].value  + ",");
    }

    if (ids != "") {
      ids = ids.substring(0, ids.length - 1);
    }
    $('#txtGroups1Select').val(ids);
  }

  function selectedAll1() {
    var selOpt = $("#groupsForSelect1 option");

    selOpt.remove();
    var selObj = $("#selectGroups1");
    selObj.append(selOpt);

    var selOpt = $("#selectGroups1")[0];
    ids = "";
    for (var i = 0; i < selOpt.length; i++) {
      ids += (selOpt[i].value  + ",");
    }

    if (ids != "") {
      ids = ids.substring(0, ids.length - 1);
    }
    $('#txtGroups1Select').val(ids);
  }

  function unselected1() {
    var selOpt = $("#selectGroups1 option:selected");
    selOpt.remove();
    var selObj = $("#groupsForSelect1");
    selObj.append(selOpt);

    var selOpt = $("#selectGroups1")[0];
    ids = "";
    for (var i = 0; i < selOpt.length; i++) {
      ids += (selOpt[i].value + ",");
    }

    if (ids != "") {
      ids = ids.substring(0, ids.length - 1);
    }
    $('#txtGroups1Select').val(ids);
  }

  function unselectedAll1() {
    var selOpt = $("#selectGroups1 option");
    selOpt.remove();
    var selObj = $("#groupsForSelect1");
    selObj.append(selOpt);

    $('#txtGroups1Select').val("");
  }
</script>
<div class="form-group">
  <input id="txtGroups1Select" type="hidden" value="${txtGroupsSelect}"
         name="txtGroupsSelect" />
  <label for="host" class="col-sm-3 control-label">组别</label>
  <div class="col-sm-9">
    <table class="tweenBoxTable" name="groups_tweenbox"
           id="groups_tweenbox" cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
        <td>已组别</td>
        <td></td>
        <td>可组别</td>
      </tr>
      <tr>
        <td><select id="selectGroups1" multiple="multiple"
                    class="input-large" name="selectGroups"
                    style="height: 150px; width: 150px">
          <c:forEach items="${userGroup}" var="key">
            <option value="${key.id}">${key.name}</option>
          </c:forEach>
        </select></td>
        <td align="center">
          <div style="margin-left: 5px; margin-right: 5px">
            <button onclick="selectedAll1()" class="btn btn-primary"
                    type="button" style="width: 50px;" title="全选">&lt;&lt;</button>
          </div>
          <div style="margin-left: 5px; margin-right: 5px; margin-top: 5px;">
            <button onclick="selected1()" class="btn btn-primary"
                    type="button" style="width: 50px;" title="选择">&lt;</button>
          </div>
          <div style="margin-left: 5px; margin-right: 5px; margin-top: 5px;">
            <button onclick="unselected1()" class="btn btn-primary"
                    type="button" style="width: 50px;" title="取消">&gt;</button>
          </div>
          <div style="margin-left: 5px; margin-right: 5px; margin-top: 5px">
            <button onclick="unselectedAll1()" class="btn btn-primary"
                    type="button" style="width: 50px;" title="全取消">&gt;&gt;</button>
          </div>
        </td>
        <td><select id="groupsForSelect1"
                    multiple="multiple" class="input-large"
                    style="height: 150px; width: 150px">
          <c:forEach items="${group}" var="key">
            <option value="${key.id}">${key.name}</option>
          </c:forEach>
        </select></td>
      </tr>
      </tbody>
    </table>
  </div>
</div>
