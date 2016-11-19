<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/6/27
  Time: 11:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>REG PDF Document</title>
  <!--
      This example created for PDFObject.com by Philip Hutchison (www.pipwerks.com)
      Copyright 2016, MIT-style license http://pipwerks.mit-license.org/
      Documentation available at http://pdfobject.com
      Source code available at https://github.com/pipwerks/PDFObject
  -->

  <!-- CSS for basic page styling, not related to example -->
  <link href="${ctx}/js/system/documents/examples.css" rel="stylesheet" />
</head>

<body>
<script src="${ctx}/js/system/documents/pdfobject.min.js"></script>
<script>
  PDFObject.embed("${ctx}/cwsf.pdf",document.body);
</script>
</body>
</html>
