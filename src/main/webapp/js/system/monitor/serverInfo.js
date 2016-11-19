$(function(){
    var load_one = [];
    var cpu = [];
    var disk = [];
    var cpu_user;
    var mem_per;
    var mb_in;
    var mb_out;
    $.ajax({
        type: "POST",
        url: rootPath + '/monitor/getFirstServerInfo.shtml?host='+host,
        cache:false,
        async: false,
        dataType: 'json',
        success: function (json) {
            load_one = json.load_one;
            cpu = json.cpu_aidle;
            disk = json.part_max_used;
            cpu_user = json.cpu_user;
            mem_per = json.mem_per;
            mb_in = json.mb_in;
            mb_out = json.mb_in;
        }
    });
    var serverChar = echarts.init(document.getElementById('serverInfo'));
    var serverPerChar = echarts.init(document.getElementById('serverPer'))
    option = {
        title: {
            text: '机器运行监控',
            subtext: host
        },
        tooltip : {
            trigger: 'axis'
        },
        toolbox: {
            show : true,
            y: 'bottom',
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        legend: {
            data:['一分钟内平均负载','CPU空闲率','磁盘占用比']
        },
        xAxis : [
            {
                type : 'category',
                splitLine : {show : false},
                data : (function (){
                    var now = new Date();
                    var res = [];
                    var len = 10;
                    while (len--) {
                        res.unshift(now.toLocaleTimeString().replace(/^\D*/,'').slice(0, 5));
                        now = new Date(now - 60000);
                    }
                    return res;
                })()
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value} %'
                },
                position: 'left',
                max:100,
                scale:true
            }
        ],
        series : [
            {
                name:'一分钟内平均负载',
                type:'line',
                data:load_one
            },
            {
                name:'CPU空闲率',
                type:'line',
                tooltip : {trigger: 'item'},
                data:cpu
            },
            {
                name:'磁盘占用比',
                type:'line',
                tooltip : {trigger: 'item'},
                data:disk
            }
        ]
    };
    two_option = {
        tooltip : {
            formatter: "{a} <br/>{c} {b}"
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        series : [
            {
                name:'CPU用户进程消耗占比',
                type:'gauge',
                z: 3,
                min:0,
                max:100,
                splitNumber:10,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 10
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length :15,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: {           // 分隔线
                    length :20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                title : {
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: 20,
                        fontStyle: 'italic'
                    }
                },
                detail : {
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder'
                    }
                },
                data:[{value: cpu_user, name: 'CPU占用率'}]
            },
            {
                name:'内存消耗',
                type:'gauge',
                center : ['25%', '55%'],    // 默认全局居中
                radius : '60%',
                min:0,
                max:100,
                // endAngle:15,
                splitNumber:10,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length :12,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: {           // 分隔线
                    length :20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width:5
                },
                title : {
                    offsetCenter: [0, '-30%'],       // x, y，单位px
                },
                detail : {
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder'
                    }
                },
                data:[{value: mem_per, name: '内存消耗'}]
            },
            {
                name:'下载速度',
                type:'gauge',
                center : ['75%', '50%'],    // 默认全局居中
                radius : '70%',
                min:0,
                max:10,
                startAngle:-30,
                endAngle:-330,
                splitNumber:10,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.2, '#228b22'],[0.8, '#48b'],[1, '#ff4500']],
                        width: 8
                    }
                },
                axisTick: {            // 坐标轴小标记
                    splitNumber:5,
                    length :10,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                axisLabel: {
                    formatter:function(v){
                        switch (v + '') {
                            case '0' : return '0';
                            case '5' : return '下载速度';
                            case '10' : return '10M/s';
                        }
                    }
                },
                splitLine: {           // 分隔线
                    length :15,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width:2
                },
                title : {
                    show: false
                },
                detail : {
                    show: false
                },
                data:[{value: mb_in, name: '下载速度(M/s)'}]
            },
            {
                name:'上传速度',
                type:'gauge',
                center : ['75%', '50%'],    // 默认全局居中
                radius : '40%',
                min:0,
                max:10,
                startAngle:140,
                endAngle:-140,
                splitNumber:10,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.2, '#228b22'],[0.8, '#48b'],[1, '#ff4500']],
                        width: 8
                    }
                },
                axisTick: {            // 坐标轴小标记
                    show: false
                },
                axisLabel: {
                    formatter:function(v){
                        switch (v + '') {
                            case '0' : return '0';
                            case '5' : return '上传速度';
                            case '10' : return '10M/s';
                        }
                    }
                },
                splitLine: {           // 分隔线
                    length :15,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width:2
                },
                title : {
                    show: false
                },
                detail : {
                    show: false
                },
                data:[{value: mb_out, name: '上传速度(M/s)'}]
            }
        ]
    };
    var axisData;
    clearInterval(timeTicket);
    var timeTicket = setInterval(function (){
        axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
        axisData = axisData.slice(0, 5);
        var load_one = [];
        var cpu = [];
        var disk = [];
        $.ajax({
            type : "POST",
            url : rootPath + '/monitor/getLastServerInfo.shtml',
            async : false,
            dataType : 'json',
            success : function(json) {

                load_one.push(json.load_one);
                cpu.push(json.cpu_aidle);
                disk.push(json.part_max_used);
                // 动态数据接口 addData
                serverChar.addData([
                    [
                        0,        // 系列索引
                        load_one, // 新增数据
                        false,     // 新增数据是否从队列头部插入
                        false     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                    ],
                    [
                        1,        // 系列索引
                        cpu, // 新增数据
                        false,     // 新增数据是否从队列头部插入
                        false     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                    ],
                    [
                        2,        // 系列索引
                        disk, // 新增数据
                        false,    // 新增数据是否从队列头部插入
                        false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                        axisData  // 坐标轴标签
                    ]
                ]);

                two_option.series[0].data[0].value = json.cpu_user;
                two_option.series[1].data[0].value = json.mem_per;
                two_option.series[2].data[0].value = json.mb_in;
                two_option.series[3].data[0].value = json.mb_out;
                serverPerChar.setOption(two_option,true);
            }
        });
        // 动态数据接口 addData
    }, 60000);

    serverChar.setOption(option);
    serverPerChar.setOption(two_option);

});
