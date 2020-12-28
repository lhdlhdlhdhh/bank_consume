$(function () {
    echart_1();
    echart_2();
    echart_3();
    echart_4();
    echart_5();
    echart_6();

    function echart_1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_1'));
        myChart.showLoading();
        $.get('http://localhost:5000/total_cost', function (data) {
            myChart.hideLoading();  // 隐藏 loading 效果
            myChart.setOption({
                series: [
                    {
                        name: '总消费分类',
                        type: 'pie',    // 设置图表类型为饼图
                        roseType: 'angle',
                        radius: '65%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                        label: {
                            normal: {
                                formatter: '{b}:{c}: ({d}%)',
                                textStyle: {
                                    fontWeight: 'normal',
                                    //fontSize:15
                                }
                            }
                        },
                        data: data.data
                    }
                ]
            })
        }, 'json');
        // 使用刚指定的配置项和数据显示图表。
        //myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function echart_2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_2'));
        myChart.showLoading();
        $.get('http://localhost:5000/average_cost', function (data) {
            myChart.hideLoading();  // 隐藏 loading 效果
            myChart.setOption({
                series: [
                    {
                        name: '总消费分类',
                        type: 'pie',    // 设置图表类型为饼图
                        roseType: 'angle',
                        radius: '65%',  // 饼图的半径，外半径为可视区尺寸（>容器高宽中较小一项）的 55% 长度。
                        label: {
                            normal: {
                                formatter: '{b}:{c}: ({d}%)',
                                textStyle: {
                                    fontWeight: 'normal',
                                    //fontSize:15
                                }
                            }
                        },
                        data: data.data
                    }
                ]
            })
        }, 'json');
        // 使用刚指定的配置项和数据显示图表。
        //myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function echart_3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_3'));
        // 指定图表的配置项和数据

        $.get('http://localhost:5000/total_sex', function (data) {
            var option = {
                title: {
                    text: ''
                },
                tooltip: {},
                legend: {
                    data: ['金额']
                },
                xAxis: {
                    data: Object.keys(data),
                    axisTick: {      // 坐标轴的刻度
                        show: true,    // 是否显示
                        inside: true,  // 是否朝内
                        length: 1,      // 长度
                        lineStyle: {
                            color: 'red',  // 默认取轴线的颜色
                            width: 1,
                            type: 'solid'
                        }
                    },
                },
                yAxis: {
                    axisLabel: {    // 坐标轴标签
                        show: true,  // 是否显示
                        inside: false, // 是否朝内
                        rotate: -45, // 旋转角度
                        margin: 1, // 刻度标签与轴线之间的距离
                        //color: 'green'  // 默认取轴线的颜色
                    },
                    axisTick: {      // 坐标轴的刻度
                        show: false,    // 是否显示
                        inside: true,  // 是否朝内
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
                    },
                },
                series: [{
                    name: '金额',
                    itemStyle: {
                        color: 'yellow'
                    },
                    type: 'bar',
                    barWidth: 20,
                    barCategoryRadius: '20%',
                    data: Object.values(data)
                }]
            };
            myChart.setOption(option)
        }, 'json');
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }


    $(function () {
        $('#select').on('change', function () {
            var val = $(this).val();
            loadOption(val);
        });
    });

    var MYCHART;  //声明一个大写的全局变量，能不用全局的尽量就不要用全局变量
    function echart_4() {
        // 基于准备好的dom，初始化echarts实例
        MYCHART = echarts.init(document.getElementById('chart_4'));
        // 指定图表的配置项和数据
        // MYCHART.setOption(option, true);
        loadOption('餐饮')
        // $.get('http://localhost:5000/total_sex', function (data) {

        // })
    }

    //ajax 异步加载配置数据项
    function loadOption(type_name) {
        $.ajax({
            url: 'http://localhost:5000/types_sex/' + type_name,
            type: 'get',
            dataType: 'json',
            async: false,
            success: function (result) {
                if (result) {
                    var option = {
                        title: {
                            text: ''
                        },
                        tooltip: {},
                        legend: {
                            data: ['金额']
                        },
                        xAxis: {
                            data: Object.keys(result),
                            axisTick: {      // 坐标轴的刻度
                                show: true,    // 是否显示
                                inside: true,  // 是否朝内
                                length: 1,      // 长度
                                lineStyle: {
                                    color: 'red',  // 默认取轴线的颜色
                                    width: 1,
                                    type: 'solid'
                                }
                            },
                        },
                        yAxis: {
                            axisLabel: {    // 坐标轴标签
                                show: true,  // 是否显示
                                inside: false, // 是否朝内
                                rotate: -45, // 旋转角度
                                margin: 1, // 刻度标签与轴线之间的距离
                                //color: 'green'  // 默认取轴线的颜色
                            },
                            axisTick: {      // 坐标轴的刻度
                                show: false,    // 是否显示
                                inside: true,  // 是否朝内
                                lineStyle: {
                                    width: 1,
                                    type: 'solid'
                                }
                            },
                        },
                        series: [{
                            name: '金额',
                            itemStyle: {
                                color: 'yellow'
                            },
                            type: 'bar',
                            barWidth: 20,
                            barCategoryRadius: '20%',
                            data: Object.values(result)
                        }]
                    };
                    MYCHART.setOption(option)
                    window.addEventListener("resize", function () {
                        MYCHART.resize();
                    });
                }
            },
            error: function () {
                alert("不好意思请求失败了");
            }
        })
    }

        function echart_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_5'));
        // 指定图表的配置项和数据
        $.get('http://localhost:5000/total_age', function (data) {
            var option = {
                title: {
                    text: ''
                },
                tooltip: {},
                legend: {
                    data: ['金额']
                },
                xAxis: {
                    data: Object.keys(data),
                    axisTick: {      // 坐标轴的刻度
                        show: true,    // 是否显示
                        inside: true,  // 是否朝内
                        length: 1,      // 长度
                        lineStyle: {
                            color: 'red',  // 默认取轴线的颜色
                            width: 1,
                            type: 'solid'
                        }
                    },
                },
                yAxis: {
                    axisLabel: {    // 坐标轴标签
                        show: true,  // 是否显示
                        inside: false, // 是否朝内
                        rotate: -45, // 旋转角度
                        margin: 1, // 刻度标签与轴线之间的距离
                        //color: 'green'  // 默认取轴线的颜色
                    },
                    axisTick: {      // 坐标轴的刻度
                        show: false,    // 是否显示
                        inside: true,  // 是否朝内
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
                    },
                },
                series: [{
                    name: '金额',
                    itemStyle: {
                        color: 'pink'
                    },
                    type: 'bar',
                    barWidth: 20,
                    barCategoryRadius: '20%',
                    data: Object.values(data)
                }]
            };
            myChart.setOption(option)
        }, 'json');
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }


    $(function () {
        $('#select1').on('change', function () {
            var val = $(this).val();
            loadOption1(val);
        });
    });

    var MYCHART1;  //声明一个大写的全局变量，能不用全局的尽量就不要用全局变量
    function echart_6() {
        // 基于准备好的dom，初始化echarts实例
        MYCHART1 = echarts.init(document.getElementById('chart_6'));
        // 指定图表的配置项和数据
        // MYCHART.setOption(option, true);
        loadOption1('餐饮')
    }

    //ajax 异步加载配置数据项
    function loadOption1(type_name) {
        $.ajax({
            url: 'http://localhost:5000/types_age/' + type_name,
            type: 'get',
            dataType: 'json',
            async: false,
            success: function (result) {
                if (result) {
                    var option = {
                        title: {
                            text: ''
                        },
                        tooltip: {},
                        legend: {
                            data: ['金额']
                        },
                        xAxis: {
                            data: Object.keys(result),
                            axisTick: {      // 坐标轴的刻度
                                show: true,    // 是否显示
                                inside: true,  // 是否朝内
                                length: 1,      // 长度
                                lineStyle: {
                                    color: 'red',  // 默认取轴线的颜色
                                    width: 1,
                                    type: 'solid'
                                }
                            },
                        },
                        yAxis: {
                            axisLabel: {    // 坐标轴标签
                                show: true,  // 是否显示
                                inside: false, // 是否朝内
                                rotate: -45, // 旋转角度
                                margin: 1, // 刻度标签与轴线之间的距离
                                //color: 'green'  // 默认取轴线的颜色
                            },
                            axisTick: {      // 坐标轴的刻度
                                show: false,    // 是否显示
                                inside: true,  // 是否朝内
                                lineStyle: {
                                    width: 1,
                                    type: 'solid'
                                }
                            },
                        },
                        series: [{
                            name: '金额',
                            itemStyle: {
                                color: 'pink'
                            },
                            type: 'bar',
                            barWidth: 20,
                            barCategoryRadius: '20%',
                            data: Object.values(result)
                        }]
                    };
                    MYCHART1.setOption(option)
                    window.addEventListener("resize", function () {
                        MYCHART1.resize();
                    });
                }
            },
            error: function () {
                alert("不好意思请求失败了");
            }
        })
    }


});
