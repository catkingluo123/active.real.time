// JavaScript Document
function del(obj){
	$(obj).parents("tr").remove();
}

function change(obj){
	$(obj).readonly=false;
	
}

function findMsg(taskHistoryId){
	if(taskHistoryId == undefined || taskHistoryId == "" || taskHistoryId == null){
		alert("文件预览错误");
		return false;
	}
	pageii = layer.open({
		title : "HiveQuery结果预览",
		type : 2,
		area : [ "80%", "90%" ],
		content : rootPath + '/history/HiveQueryPre.shtml?taskHistoryId='+taskHistoryId
	});
}

function findPath(taskHistoryId){
	if(taskHistoryId == undefined || taskHistoryId == "" || taskHistoryId == null){
		alert("文件下载错误");
		return false;
	}
	var isSynchronized = false;
	var localPath = "";
	$.ajax({
		type: "post",
		dataType: "json",
		async:false,
		cache:false,
		url: rootPath + "/history/copyToLocal.shtml?taskHistoryId="+taskHistoryId,
		success: function(data) {
			if(data.status != "success"){
				alert(data.reason);
			}
			isSynchronized = true;
			localPath = data.localPath;
		}
	});
	if(isSynchronized){
		document.getElementById("ifile").src = rootPath + "/history/download.shtml?filePath="+localPath;
	}else{
		alert("文件还未同步完成！");
	}
}

function taskHistoryLog(event) {
	var id = event;
	pageii = layer.open({
		title : "task日志信息",
		type : 2,
		area : [ "80%", "90%" ],
		content : rootPath + '/history/task.shtml?taskHistoryId='+id
	});
}


function jobHistoryLog() {
	var id=jobHistoryId;
	pageii = layer.open({
		title : "job详细日志信息",
		type : 2,
		area : [ "80%","90%" ],
		content : rootPath + '/history/job.shtml?jobHistoryId='+ id
	});
}

$(function(){

	
	$(".funprops .tab a").mouseover(function(){
		$(this).addClass('on').siblings().removeClass('on');
		var index = $(this).index();
		number = index;
		$('.funprops .content li').hide();
		$('.funprops .content li:eq('+index+')').show();
	});
	  
	  $(".funprop .tabs a").mouseover(function(){
		$(this).addClass('on').siblings().removeClass('on');
		var index = $(this).index();
		number = index;
		$('.funprop .contents li').hide();
		$('.funprop .contents li:eq('+index+')').show();
	});

	//-------------------编辑(start)-------------------
	var topocontent = $('#topocontent'),
		lefticon = $('#lefticon'),
		linewrap = $('#linewrap');
	
	//连接样式
	var lineColorArr = ['#b267ce', '#7c4f2e', '#0074b0', '#b02929', '#e28b1a', '#48daff', '#61b7cf', '#2f8e00'],
	    relationArr = ['doucment', 'use', 'cool', 'host', 'denpendencis', 'fach', '依赖', 'conn'],
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
	
	var labelTxt = relationArr[6],
	    lineColor = lineColorArr[6],
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

	if(depe=='' || depe==undefined ||depe==null){

	}else {
		window.onload = function () {
			var obj = jQuery.parseJSON(depe);
			editJson(obj);
		};
	}
	var timeId;
	function editJson(obj){
		var list=obj.arrows;
		var blocks=obj.taskUnits;
		htmlText="";
		conn="";
		$.each(blocks,function(index,item){
			var viewstyle='left:'+item.x+'px;top:'+item.y+'px',
				viewid=item.taskId,
				viewClass=item.taskType,
				viewsrc=item.taskImage,
				viewTxt=item.taskName;
			htmlText=htmlText+'<div class="elebox '+viewClass+'" id='+viewid+' style='+viewstyle+'><img src='+viewsrc+'><span class="dragPoint">'+viewTxt+'</span></div>';
		});
		topocontent.html(htmlText);
		//-------------默认连接-------------
		var windowsDrag=jsPlumb.getSelector("#topocontent .elebox");
		renderConnect(windowsDrag);

		//------------更改样式-------------
		for(var i in list){
			var conor=instance.connect({source:list[i].sourceId, target:list[i].targetId});
			conor.getOverlay("label").setLabel(list[i].label);
			conor.setPaintStyle({fillStyle:list[i].color,strokeStyle:list[i].color});
			conor.bind('click',function(){
				detachLine(this);
			});
		}
		if(jobHistoryId!=null&&jobHistoryId!='') {
			$("div.elebox").draggable({containment: "parent"});
			$("#topocontent .elebox").each(function (idx, elem) {
				var $elem = $(elem);
				var src = $elem.children('img').attr('src');
				var src1 = src.replace(/green|red|yellow|big/, 'grey');
				$elem.children('img').attr('src', src1);
			});
			timeId=setTimeout(function(){
				changeElem(rootPath,jobHistoryId);
			},1);
		}
	}

	
	//自定义鼠标事件
	var rightkeyPop = $('#rightkeyPop'),
		relationWrap = $('#relationWrap'),
		relevanceBox = $('#relevanceBox'),
	    delEle = $('#delEle');
	
	linewrap.find('span').each(function(i) {//点解切换关系
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
		return false;
	});

	$(document).on('dblclick','#topocontent div.elebox',function(event){
		$this=$(this);
		var id=$this.attr('id').split("_")[1];
		pageii=layer.open({
			title:"编辑任务",
			type:2,
			area:["80%","90%"],
			content:rootPath+'/task/editTask.shtml?id='+id+'&commitType=false'
		});
	});

	$(document).on('click','#editEle',function(event){
		$this=$(this);
		var id=rightkeyPop.attr('rightkey_click_id').split("_")[1];
		pageii=layer.open({
			title:"编辑任务",
			type:2,
			area:["80%","90%"],
			content:rootPath+'/task/editTask.shtml?id='+id+'&commitType=false'
		});
	});

	$(document).on('click', '#delEle', function(){
		idStr = rightkeyPop.attr('rightkey_click_id');
	    $.confirmInfo({
			title : '删除元素及链接',
			text : '确认删除此元素及其链接吗？',
			sure : function(){
				instance.removeAllEndpoints(idStr);
				instance.remove(idStr);
			}
		});
	});
	$(document).on('click', '#relationWrap a', function(){
	    var txt = $(this).text(),
		    idStr = rightkeyPop.attr('rightkey_click_id');
		$('#' + idStr).children('span').text(txt);
		relationWrap.hide();
		rightkeyPop.hide();
		instance.revalidate(idStr);
	});
	rightkeyPop.mouseover(function(){
		$(this).show();
		return false;
	});
	relevanceBox.hover(function(){
	    relationWrap.show();
	}, function(){
	    relationWrap.hide();
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


	//-------------------编辑(end)----------------


	function changeElem(rootPath,jobHistoryid){
		var url=rootPath+"/job/getTaskStatus.shtml?jobId="+jobHistoryid;
		$.post(url,{ids:jobHistoryid},function(data){
			var taskStatus=jQuery.parseJSON(data);
			var tasks=taskStatus.taskStatus;
			var size=document.getElementById("taskTable").rows.length;
			if(size>1){
				for(var j=2;j<=size;j++){
					document.getElementById("taskTable").deleteRow(-1);
				}
			}
			for(var i in tasks){
				var cl='#'+tasks[i].taskType+'_'+tasks[i].taskId;
				var src=$(cl).children('img').attr('src');
				var src1;
				if(tasks[i].taskStatus=='success'){
					src1=src.replace(/red|big|yellow|grey/,'green');
				}else if(tasks[i].taskStatus=='running'){
					src1=src.replace(/red|big|green|grey/,'yellow');
				}else if(tasks[i].taskStatus=='failed'){
					src1=src.replace(/green|big|yellow|grey/,'red');
				}
				$(cl).children('img').attr('src',src1);
				var x=document.getElementById("taskTable").insertRow(-1);
				var taskName=x.insertCell(0);
				var createTime=x.insertCell(1);
				var modifyTime=x.insertCell(2);
				var status=x.insertCell(3);
				var operate= x.insertCell(4);
				taskName.innerHTML="<a onclick='taskHistoryLog("+tasks[i].id+")'>"+tasks[i].taskName+"</a>";
				createTime.innerHTML=tasks[i].createTime;
				modifyTime.innerHTML=tasks[i].modifyTime;
				status.innerHTML=tasks[i].taskStatus;
				operate.innerHTML="<a title='查看' id='check_"+i+"' href='javascript:void(0)' onclick=findMsg('"+tasks[i].id+"')>"+"查看"+"</a>"
					+ "<span> | </span> " +
					"<a title='下载' id='download_"+i+"' href='javascript:void(0)' onclick=findPath('"+tasks[i].id+"')>"+"下载"+"</a>";

				if(tasks[i].taskType!="hiveQy"){
					var downloadId='#download_'+i;
					var checkId = '#check_'+i;
					$(checkId).removeAttr("onclick");
					$(checkId).css("color","gray ");
					$(downloadId).removeAttr("onclick");
					$(downloadId).css("color","gray ");
				}
			}
			$("#jobHistoryLog").text(taskStatus.jobLog);
			if(taskStatus.jobStatus=="running"){
				timeId=setTimeout(function(){
					changeElem(rootPath,jobHistoryid);
				},5000);
			}
		},"json");
	};

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
	
	//-------------------全局变量动态增加删除td-------------
	var aTr = document.getElementsByTagName('tr');
	
	var aDlist = '<tr>' +
			'<td align="center" valign="top" class="box_td_left">' + '<input type="text" class="left_name" style="height:17px;margin-bottom:3px;">' + '</td>' +
			'<td class="box_td_right">' + '<input type="text" class="right_value" style="height:17px;margin-bottom:3px;">'
			+ '<span class="del-list" style="height:17px;margin-bottom:0;"><a href="javascript:;" class="as delete_btu" onclick="del(this)" style="font-size:13px;height: 17px;">删除</a></span></td>' +
		   '</tr>';
	
	$('.add-icon').click(function(){
			$('#addCont').find('tr').css('display','table-row');
			$('#addCont').find('tbody').append(aDlist);        
	});

	$('.save-icon').click(function(){
		alert("ddd");
	});
	
	$('.add-depend').click(function(){
			$('#adddepends').find('tr').css('display','table-row');
			$('#adddepends').find('tbody').append(aDlist);        
	});
	
});


