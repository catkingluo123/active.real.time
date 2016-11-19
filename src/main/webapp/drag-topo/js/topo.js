// JavaScript Document
$(function(){

	
	//-------------------编辑(start)-------------------
	var topocontent = $('#topocontent'),
		lefticon = $('#lefticon'),
		linewrap = $('#linewrap');
	
	//连接样式
	var lineColorArr = ['#b02929', '#2f8e00'],
	    relationArr = ['故障连接', '正常连接'],
	    instance = jsPlumb.getInstance({
			Endpoint : ["Dot", {radius:2}],
			ConnectionOverlays : [
				[ "Arrow", {location: 1, id:"arrow", length:10, foldback:0.8, width: 10} ],
				[ "Label", { label:"关系", id:"label", cssClass:"labelstyle" }]
			],
			DragOptions : { zIndex:2000 },
			Container:"topocontent"
		});
	window.jsp = instance;
	
	var labelTxt = relationArr[1],
	    lineColor = lineColorArr[1],
	    pstyle = {
			Endpoint: ["Dot", { radius: 2 }],
			paintStyle: {
				strokeStyle: lineColor,
				fillStyle: lineColor
			},
			connector: ["Flowchart", {stub: [0, 0], gap: 2, cornerRadius: 5, alwaysRespectStubs: true }],
			connectorStyle: {
				lineWidth: 1,
				strokeStyle: lineColor
			},
			maxConnections: -1
		};
	
	//加载已有数据

	$.ajax({
		type: "POST",
		url: rootPath + '/dataListener/getDependence.shtml?id='+id,
		cache:false,
		async: false,
		dataType: 'json',
		success: function (json) {
			if(json=="" || json==undefined || json==null){

			}else {
				var data = jQuery.parseJSON(json);
				editData(data.source,data.info);
			}
		}
	});

	//topocontent.load('json\connection.json', function(response, status){
	//alter("");
	//    if(status == "success"){
	//		$.closePop('loadingPop');
	//		editData(response);
	//	}else{
	//	    $.popupEle('loadingPop');
	//	}
	//});
	function editData(source,info){
	    var list = source,
			blocks = info,
			htmlText = "",
			conn = "";

		
		

		//------------插入元素-------------
		for( var i in blocks){
			var viewstyle = 'left:'+blocks[i].BlockX+'px;top:'+blocks[i].BlockY+'px;',
				viewid = blocks[i].BlockId,
				viewClass = blocks[i].BlockClass,
				viewsrc = blocks[i].BlockImg,
				viewTxt = blocks[i].BlockText,
				jumpId = blocks[i].BlockJump;
			htmlText = htmlText + '<div class="elebox '+viewClass+'" id='+viewid+' name='+jumpId+' onclick = "jump(\''+jumpId+'\')" style='+viewstyle+'><img src='+viewsrc+'><span class="dragPoint">'+viewTxt+'</span></div>';
			
		};
		topocontent.html(htmlText);
		
		//------------默认连接-------------
		var windowsDrag = jsPlumb.getSelector("#topocontent .elebox");
		renderConnect(windowsDrag);
		
		//------------更改样式-------------
		for( var i in list){
			var conor = instance.connect({ source: list[i].PageSourceId, target:list[i].PageTargetId});
			conor.getOverlay("label").setLabel(list[i].connectionLabel);
			conor.setPaintStyle({fillStyle : list[i].lineColor, strokeStyle: list[i].lineColor});
			conor.bind('click',function(){
				detachLine(this);
			});
		};
		$("div.elebox").draggable({ containment: "parent" });
	}
	
	//自定义鼠标事件
	var rightkeyPop = $('#rightkeyPop'),
	    delEle = $('#delEle');
	
	linewrap.find('span').each(function(i) {//点击切换关系
		var $this = $(this);
		$this.click(function(){
			linewrap.find('span').removeClass('focus');
			$this.addClass('focus');
			labelTxt = relationArr[i];
			lineColor = lineColorArr[i];
		});
	});
	$(document).on("contextmenu", function() { return false; }); 
	$(document).on('mousedown', '#topocontent div.elebox', function(event){
        if(event.which == 3){
		    var $this = $(this),
			    event = event || window.event,
			    oLeft = parseInt(event.clientX),
				oTop = parseInt(event.clientY),
				span = $this.children('span'),
				idStr = $this.attr('id');
			rightkeyPop.css({left : oLeft, top : oTop, zIndex : 2999}).attr('rightkey_click_id', idStr).show();
		}
	});
	$(document).on('mouseout', '#topocontent div.elebox', function(){
		rightkeyPop.hide();
	});
	$(document).on('mouseover', '#topocontent div.elebox', function(){
		var rid = $(this).attr("id");
		$.ajax({
			type: "POST",
			url: rootPath+'/dataListener/queueInfo.shtml?rid='+rid,
			cache: false,
			async: true,
			dataType: 'json',
			success: function (json) {
				layer.tips(json, '#'+rid, {
					tips: [1, '#3595CC'],
					time: 4000
				});
			}
		});
		return false;
	});
	$(document).on('click', '#delEle', function(){
		var idStr = rightkeyPop.attr('rightkey_click_id');
	    $.confirmInfo({
			title : '删除节点及链接',
			text : '确认删除此节点及其链接吗？',
			sure : function(){

				$.ajax({
					type: "POST",
					url: rootPath+'/dataListener/delReg.shtml?rid='+idStr,
					cache: false,
					async: true,
					dataType: 'json',
					success: function (json) {
						if (json == "success") {
							instance.removeAllEndpoints(idStr);
							instance.remove(idStr);
							layer.msg('删除成功', {icon: 1});
						}else{
							layer.alert('删除失败', 3);
						}
					}
				});
			}
		});
	});

	$(document).on('click','#editEle',function(event){
		var idStr = rightkeyPop.attr('rightkey_click_id');
		pageii=layer.open({
			title:"编辑节点",
			type:2,
			area:["40%","80%"],
			content:rootPath+'/dataListener/editNode.shtml?rid='+idStr
		});
	});

	$(document).on('dblclick','#topocontent div.elebox',function(event){
		var idStr=$(this).attr('id');
		pageii=layer.open({
			title:"编辑节点",
			type:2,
			area:["40%","80%"],
			content:rootPath+'/dataListener/editNode.shtml?rid='+idStr
		});
	});

	$(document).on('click', '#relationWrap a', function(){
	    var txt = $(this).text(),
		    idStr = rightkeyPop.attr('rightkey_click_id');
		$('#' + idStr).children('span').text(txt);
		rightkeyPop.hide();
		instance.revalidate(idStr);
	});
	rightkeyPop.mouseover(function(){
		$(this).show();
		return false;
	});

	$('body').mouseover(function(){
	    rightkeyPop.hide();
	});
	
	//jsPlumb事件
	/*instance.bind("click", function(info) {//点解连接线删除连接（bug,点击endpoint也能删除，但是点击label能提示不能删除）
	    detachLine(info);
	});*/
	instance.bind("connection", function(info) {//更改label关系
		info.connection.getOverlay("label").setLabel(labelTxt);
	});
	instance.bind("connectionDrag", function(info) {//更改连接链颜色
		info.setPaintStyle({fillStyle : lineColor, strokeStyle: lineColor});
	});
	instance.bind("connectionDragStop", function(info) {//点击连接线、overlay、label提示删除连线 + 不能以自己作为目标元素
	    if(info.sourceId == info.targetId){
			$.popupTips('不能以自己作为目标元素');
		    instance.detach(info); 
		}else{
			info.unbind('click');
			info.bind('click',function(){
				detachLine(info);
			});
		};
	});
	function detachLine(info){//删除连接
	    $.confirmInfo({
			title : '删除连接',
			text : '确认删除此链接吗？',
			sure : function(){
			   instance.detach(info); 
			}
		});
	}
	function renderConnect(newid){//渲染
		instance.draggable(newid);
		instance.doWhileSuspended(function(){
			var isFilterSupported = instance.isDragFilterSupported();
			if(isFilterSupported){
				instance.makeSource(newid, {filter:".dragPoint",anchor:"Continuous"}, pstyle);
			}else{
				var eps = jsPlumb.getSelector(".dragPoint");
				for (var i = 0; i < eps.length; i++) {
					var e = eps[i], p = e.parentNode;
					instance.makeSource(e, {parent:p, anchor:"Continuous"}, pstyle);
				}
			}
		});
		instance.makeTarget(newid, {dropOptions:{hoverClass:"dragHover"}, anchor:"Continuous"}, pstyle);
	}

	function nodeReg(id,nodeName,rid){
		var url = rootPath+'/dataListener/nodeReg.shtml?id='+id+"&rid="+rid+"&nodeName="+nodeName;
		url = encodeURI(url);
		url = encodeURI(url);
		pageii=layer.open({
			title:"节点注册",
			type:2,
			area:["40%","80%"],
			content: url
		});
		
	}


	
	//拖动创建元素
    lefticon.children('div.iconitems').draggable({
	    helper: 'clone',
		scope: 'topo'
	});
	topocontent.droppable({
	    scope: 'topo',
		drop: function(event, ui){
			var nodeName = "";
			var $this = $(this),
				dragui = ui.draggable;
			layer.prompt({formType:3,title:'请输入节点名称'},function(value,index,elem){

				nodeName = value;
				var url = rootPath + '/dataListener/initRid.shtml?businessType=' + businessType
						+ "&nodeName=" + nodeName;
				url = encodeURI(url);
				url = encodeURI(url);
				$.ajax({
					type: "POST",
					url: url,
					cache: false,
					async: true,
					dataType: 'json',
					success: function (json) {
						console.log(json);
						if (json == "" || json == undefined || json == null) {
							layer.close(index);
							layer.alert('创建失败', 3);
						} else if(json == "mustOnly"){
							layer.alert('节点名称重复', 3);
						}else{
							layer.close(index);
							nodeReg(id,nodeName,json);
							var	fatop = parseInt($this.offset().top),
								faleft = parseInt($this.offset().left),
								uitop = parseInt(ui.offset.top),
								uileft = parseInt(ui.offset.left),
								imgsrc = dragui.children('img').attr('src'),
								spantxt = nodeName,
								uid = dragui.attr('icontype');

							var newstyle = 'left:' + (uileft - faleft) + 'px;top:' + (uitop - fatop) + 'px',
								newsrc = imgsrc.replace('little-icon', 'big-icon'),
								newid = json,
								str = '<div class="elebox ' + uid + '" id=' + newid + ' style=' + newstyle + '>' +
									'<img src=' + newsrc + '>' +
									'<span class="dragPoint">' + spantxt + '</span></div>';

							$this.append(str);
							renderConnect(newid);
							instance.revalidate(newid);
							$("#" + newid).draggable({containment: "parent"});
						}
					}
				});
			});
		}

	});
	//-------------------编辑(end)-------------------
	
	
	//-------------------保存(start)-------------------
	var saveTopoBtn = $('#saveTopoBtn'),
		serliza = '';
	saveTopoBtn.click(function(){
	    var connects = [];
		$.each(instance.getAllConnections(), function (idx, connection) {
			connects.push({
				lineColor: connection.getPaintStyle('label').fillStyle,
				connectionLabel : connection.getOverlay('label').label,
				PageSourceId: connection.sourceId,
				PageTargetId: connection.targetId
			});
		});
		var blocks = [];
		$("#topocontent .elebox").each(function (idx, elem) {
			var $elem = $(elem);
			blocks.push({
				BlockId: $elem.attr('id'),
				BlockClass: $elem.attr('class').split(' ')[1],
				BlockImg: $elem.children('img').attr('src'),
				BlockText: $elem.children('span').text(),
				BlockX: parseInt($elem.css("left")),
				BlockY: parseInt($elem.css("top")),
				BlockJump : $elem.attr('name')
			});
		});
		var data = new Object();
		data.source = JSON.stringify(connects);
		data.info = JSON.stringify(blocks);

		var dependence = JSON.stringify(data);

		
		

		//serliza = JSON.stringify(connects) + "&" + JSON.stringify(blocks);
		
		if(topocontent.children('div.elebox').length == 0){
		    $.popupTips('请先创建元素或连接');
		}else{
			var url=rootPath+'/dataListener/saveDependence.shtml';
			$.post(url,{id:id,dependence:dependence},function(data){
				if(data=="success"){
					$.popupTips('流程图已保存.');
				}else{
					$.popupTips("流程图保存失败.")
				}
			},"json");
		}
		
		$('#num').text(serliza);

	});
	//-------------------保存(end)-------------------
	
	
	//-------------------预览(start)-------------------
	var topoView = $('#topoView'),
	    viewTopoBtn = $('#viewTopoBtn');
	viewTopoBtn.click(function(){
	    $.iframePop('topo-view.html', 640, 900);
	});
	topoView.load('json/connection.json', function(response, status){
	    if(status == "success"){
			$.closePop('loadingPop');
			viewPop(response);
		}else{
		    $.popupEle('loadingPop');
		}
	});
	
	function viewPop(response){
	    var list = eval(response.split('&')[0]),
			blocks = eval(response.split('&')[1]),
			htmlText = "",
			conn = "";
		//------------插入元素-------------
		for( var i in blocks){
			var viewstyle = 'left:'+blocks[i].BlockX+'px;top:'+blocks[i].BlockY+'px;',
				viewid = blocks[i].BlockId,
				viewClass = blocks[i].BlockClass,
				viewsrc = blocks[i].BlockImg,
				viewTxt = blocks[i].BlockText;
			htmlText = htmlText + '<div class="elebox cursor_default '+viewClass+'" id='+viewid+' style='+viewstyle+'><img src='+viewsrc+'><span class="dragPoint cursor_default">'+viewTxt+'</span></div>';
		};
		topoView.html(htmlText);
		
		//------------默认连接-------------
		var instanceView = jsPlumb.getInstance({
				Endpoint : ["Dot", {radius:2}],
				ConnectionOverlays : [
					[ "Arrow", {location: 1, id:"arrow", length:10, foldback:0.8, width: 10} ],
					[ "Label", { label:"关系", id:"label", cssClass:"labelstyle" }]
				],
				Container:"topoView"
			});
		window.jsp = instanceView;
		var windows = jsPlumb.getSelector("#topoView .elebox");
		instanceView.doWhileSuspended(function() {
			var isFilterSupported = instanceView.isDragFilterSupported();
			if (isFilterSupported) {
				instanceView.makeSource(windows, {filter:'none',anchor:"Continuous"}, pstyle);
			}else {
				var eps = jsPlumb.getSelector(".elebox");
				for (var i = 0; i < eps.length; i++) {
					var e = eps[i], p = e.parentNode;
					instanceView.makeSource(e, {parent:p,anchor:"Continuous"}, pstyle);
				}
			}
		});
		instanceView.makeTarget(windows, {anchor:"Continuous"}, pstyle);
		
		//------------更改样式-------------
		for( var i in list){
			var conor = instanceView.connect({ source: list[i].PageSourceId, target:list[i].PageTargetId});
			conor.getOverlay("label").setLabel(list[i].connectionLabel);
			conor.setPaintStyle({fillStyle : list[i].lineColor, strokeStyle: list[i].lineColor});
		};
	}
	//-------------------预览(end)-------------------

});


