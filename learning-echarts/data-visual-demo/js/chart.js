function renderBarChart() {
    const chart = echarts.init($('bar-chart'))
    chart.setOption({
        grid: {
            left: '5%',
            top: '15%',
            bottom: '5%',
            containLabel: true, // 将标签文本也一起参与计算
        },
        title: {
            text: '各类水果总销量',
            left: 'center',
            textStyle: {
                color: 'white',
            },
        },
        xAxis: {
            type: 'value',
            axisLine: { // 轴线条设置
                lineStyle: { // 线条样式
                    color: 'white' // 线条颜色为白色（同时会设置轴上的标签文本颜色）
                },
            },
        },
        yAxis: {
            type: 'category',
            data: CATEGORY_DATA,
            axisLine: { // 轴线条设置
                lineStyle: { // 线条样式
                    color: 'white' // 线条颜色为白色（同时会设置轴上的标签文本颜色）
                }
            }
        },
        series: [{
            type: 'bar',
            data: BAR_VALUE_DATA,
            label: {
                show: true,
                color: 'white',
                position: 'insideRight',// 标签的位置
                align: 'right' // 文本对齐标签的位置（position），这里是文本对齐标签的位置（position）的右端
            },
            itemStyle: {
                borderRadius: [0, 20, 20, 0],
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                        offset: 0.7, color: '#4687ef' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#1864c7' // 100% 处的颜色
                    }],
                }
            }
        }]
    })
}

function renderMapChart() {
    echarts.registerMap('ChinaMap', CHINA_MAP_DATA)
    const chart = echarts.init($('map-chart'))
    chart.setOption({
        geo: {
            map: 'ChinaMap',
            top: '20%',
            itemStyle: {
                borderColor: 'rgb(222,117,117)', // 设置地图边界的边框颜色
                areaColor: 'orange',
                shadowColor: 'rgba(253,253,253,0.4)',  // 设置地图边界的阴影颜色
                shadowBlur: 30,  // 设置地图边界的阴影模糊大小
            },
            emphasis: {  // 鼠标聚焦时
                focus: 'self', // 自身区域聚焦显示，其他其区域淡出
                label: { // 标签文字设置
                    color: 'white' // 标签文字的颜色
                },
            },
            label: { // 标签文字设置
                color: 'white' // 标签文字的颜色
            }
        },
        title: {
            text: '水果销量分布区域',
            left: 'center',
            top: '5%',
            textStyle: {
                color: 'white',
                textShadowColor: 'white',
                textShadowBlur: 30
            },
        },
        tooltip: {
            formatter: param => `${param.data.name} 销售${param.data.value[2]}个`
        },
        series: [{
            type: 'effectScatter',
            symbolSize: 6,
            rippleEffect: {
                num: 2,
                scale: 5
            },
            coordinateSystem: 'geo',
            data: MAP_SCATTER_DATA,
        }],
        // 视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）
        visualMap: {
            type: 'continuous', // 类型为连续型
            min: 100, // 允许的最小值
            max: 1000, // 允许的最大值
            // 定义在选中范围中的视觉元素。（用户可以和 visualMap 组件交互，用鼠标或触摸选择范围）
            inRange: {
                color: ['#dcdcdc', '#ef0e0e']
            },
            // 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
            calculable: true,
            textStyle: {
                color: 'white',
            }
        }
    })
}

function renderPieChart() {
    const chart = echarts.init($('pie-chart'))
    chart.setOption({
        color: ['#3fb1e3','#6be6c1','#626c91','#a0a7e6','#c4ebad'],
        title: {
            text: '各类水果销量占比',
            left: 'center',
            textStyle: {
                color: 'white'
            },
        },
        series: [{
            type: 'pie',
            data: PIE_VALUE_DATA,
            roseType: 'area',
            radius: [10, '80%'],
            center: ['53%', '55%'], // 设置饼图的中心位置
            label: {
                position: 'inside', // 图表文本标签展示的位置
                color: 'white',
            },
            itemStyle: {
                borderRadius: 10
            }
        }],
        legend: {
            right: 0,
            top: 0,
            orient: 'vertical',
            textStyle: {
                color: 'white'
            }
        },
    })
}

function renderLineStackChart() {
    const chart = echarts.init($('line-stack-chart'))
    chart.setOption({
        color: ['red', 'yellow', 'blue', 'purple'],
        grid: {
            left: '2%',
            bottom: '5%',
            containLabel: true, // 将标签文本也一起参与计算
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6c8bff', // 指示器标签文本的背景色
                }
            },
        },
        legend: {
            top: '10%',
            textStyle: {
                color: 'white'
            },
        },
        title: {
            text: '2022年四季度各水果销售额',
            left: 'center',
            textStyle: {
                color: 'white'
            },
        },
        xAxis: {
            data: CATEGORY_DATA,
            boundaryGap: false, // 是否和图表的边界保持一定的间隙
            axisLine: { // 轴线条设置
                lineStyle: { // 线条样式
                    color: 'white' // 线条颜色为白色（同时会设置轴上的标签文本颜色）
                }
            }
        },
        yAxis: {
            axisLine: { // 轴线条设置
                lineStyle: { // 线条样式
                    color: 'white' // 线条颜色为白色（同时会设置轴上的标签文本颜色）
                }
            }
        },
        series: [{
            stack: 'QuarterStack',
            showSymbol: false, // 是否展示折线图的点
            smooth: true,
            type: 'line',
            name: '一季度',
            data: LINE_STACK_VALUE_DATA.FIRST_QUARTER,
            lineStyle: {
                width: 0, // 折线图的线的宽度，0即不需要显示线条
            },
            areaStyle: {
                opacity: .9,
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#ffb2b2' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#f80000' // 100% 处的颜色
                    }],
                }
            },
            emphasis: {
                focus: 'series'
            }
        }, {
            stack: 'QuarterStack',
            showSymbol: false, // 是否展示折线图的点
            smooth: true,
            type: 'line',
            name: '二季度',
            data: LINE_STACK_VALUE_DATA.SECOND_QUARTER,
            lineStyle: {
                width: 0,
            },
            areaStyle: {
                opacity: .9,
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#ffe6b8' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#e7ac1b' // 100% 处的颜色
                    }],
                }
            },
            emphasis: {
                focus: 'series'
            }
        }, {
            stack: 'QuarterStack',
            showSymbol: false, // 是否展示折线图的点
            smooth: true,
            type: 'line',
            name: '三季度',
            data: LINE_STACK_VALUE_DATA.THIRD_QUARTER,
            lineStyle: {
                width: 0,
            },
            areaStyle: {
                opacity: .9,
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#9cbeff' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#1b52ce' // 100% 处的颜色
                    }],
                }
            },
            emphasis: {
                focus: 'series'
            }
        }, {
            stack: 'QuarterStack',
            showSymbol: false, // 是否展示折线图的点
            smooth: true,
            type: 'line',
            name: '四季度',
            data: LINE_STACK_VALUE_DATA.FOURTH_QUARTER,
            lineStyle: {
                width: 0,
            },
            areaStyle: {
                opacity: .9,
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#f7adff' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#a310a8' // 100% 处的颜色
                    }],
                }
            },
            emphasis: {
                focus: 'series'
            }
        }]
    })
}

function renderBarStackChart() {
    const chart = echarts.init($('bar-stack-chart'))
    chart.setOption({
        color: ['#3fb1e3','#6be6c1','#626c91','#a0a7e6','#c4ebad'],
        grid: {
            left: '2%',
            bottom: '5%',
            containLabel: true, // 将标签文本也一起参与计算
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        legend: {
            top: '10%',
            textStyle: {
                color: 'white'
            }
        },
        title: {
            text: '各类水果库存数量',
            left: 'center',
            textStyle: {
                color: 'white',
            },
        },
        xAxis: {
            data: CATEGORY_DATA,
            axisLine: { // 轴线条设置
                lineStyle: { // 线条样式
                    color: 'white' // 线条颜色为白色（同时会设置轴上的标签文本颜色）
                }
            }
        },
        yAxis: {
            axisLine: { // 轴线条设置
                lineStyle: { // 线条样式
                    color: 'white' // 线条颜色为白色（同时会设置轴上的标签文本颜色）
                }
            }
        },
        series: [{
            stack: 'StockStack',
            type: 'bar',
            name: '苹果',
            data: BAR_STACK_VALUE_DATA.APPLE,
            label: { // 标签设置
                show: true, // 标签文本是否显示
                color: 'white',
            },
            emphasis: { // 聚焦时的设置
                focus: 'series', // 高亮当前系列
            }
        }, {
            stack: 'StockStack',
            type: 'bar',
            name: '香蕉',
            data: BAR_STACK_VALUE_DATA.BANANA,
            label: { // 标签设置
                show: true, // 标签文本是否显示
                color: 'white',
            },
            emphasis: { // 聚焦时的设置
                focus: 'series', // 高亮当前系列
            }
        }, {
            stack: 'StockStack',
            type: 'bar',
            name: '梨子',
            data: BAR_STACK_VALUE_DATA.PEAR,
            label: { // 标签设置
                show: true, // 标签文本是否显示
                color: 'white',
            },
            emphasis: { // 聚焦时的设置
                focus: 'series', // 高亮当前系列
            }
        }, {
            stack: 'StockStack',
            type: 'bar',
            name: '西瓜',
            data: BAR_STACK_VALUE_DATA.WATERMELON,
            label: { // 标签设置
                show: true, // 标签文本是否显示
                color: 'white',
            },
            emphasis: { // 聚焦时的设置
                focus: 'series', // 高亮当前系列
            }
        }, {
            stack: 'StockStack',
            type: 'bar',
            name: '芒果',
            data: BAR_STACK_VALUE_DATA.MANGO,
            label: { // 标签设置
                show: true, // 标签文本是否显示
                color: 'white',
            },
            emphasis: { // 聚焦时的设置
                focus: 'series', // 高亮当前系列
            }
        },]
    })
}
