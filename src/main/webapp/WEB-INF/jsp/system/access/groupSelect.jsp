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


    $('#txtGroups1Select').val("");
  }

  function selectedAll1() {
    var selOpt = $("#groupsForSelect1 option");

    selOpt.remove();
    var selObj = $("#selectGroups1");
    selObj.append(selOpt);

    var selOpt = $("#groupsForSelect1")[0];
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

    var selOpt = $("#groupsForSelect1")[0];
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
    var selOpt = $("#groupsForSelect1")[0];
    ids = "";
    for (var i = 0; i < selOpt.length; i++) {
      ids += (selOpt[i].value  + ",");
    }

    if (ids != "") {
      ids = ids.substring(0, ids.length - 1);
    }

    $('#txtGroups1Select').val(ids);
  }
</script>
<div class="form-group">
  <input id="txtGroups1Select" type="hidden" value="${txtGroupsSelect}"
         name="txtGroupsSelect" />
  <input id="userTbs" type="hidden" value="${userTbs}" name="userTbs"/>
  <label for="host" class="col-sm-3 control-label">请选择表</label>
  <div class="col-sm-9">
    <table class="tweenBoxTable" name="groups_tweenbox"
           id="groups_tweenbox" cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
        <td>用户拥有表</td>
        <td></td>
        <td>待分配权限表</td>
      </tr>
      <tr>
        <td style="overflow: scroll"><select id="selectGroups1" multiple="multiple"
                    class="input-large"
                    style="height: 300px; width: 248px">
          <c:forEach items="${userHiveTbs}" var="userHiveTb">
            <option value="${userHiveTb.key}">${userHiveTb.value}</option>
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
        <td  style="overflow: scroll"><select id="groupsForSelect1"
                    multiple="multiple" class="input-large"
                    style="height: 300px; width: 248px"  name="selectGroups">
          <%--<c:forEach items="${group}" var="key">
            <option value="${key.id}">${key.name}</option>
          </c:forEach>--%>
        </select></td>
      </tr>
      </tbody>
    </table>
  </div>
</div>
