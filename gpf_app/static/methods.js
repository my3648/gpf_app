$(function() {
  // var chart
  $('#tin_curve').bind('mousemove touchmove touchstart', function(e) {
    var chart, point, i, event
    for (i = 0; i < Highcharts.charts.length; i = i + 1) {
      chart = Highcharts.charts[i]
      event = chart.pointer.normalize(e.originalEvent) // Find coordinates within the chart
      point = chart.series[0].searchPoint(event, true) // Get the hovered point
      if (point) {
        point.highlight(e)
      }
    }
  })
  /**
   * 重写内部的方法， 这里是将提示框即十字准星的隐藏函数关闭
   */
  Highcharts.Pointer.prototype.reset = function() {
    return undefined
  }
  /**
   * 高亮当前的数据点，并设置鼠标滑动状态及绘制十字准星线
   */
  Highcharts.Point.prototype.highlight = function(event) {
    this.onMouseOver() // 显示鼠标激活标识
    this.series.chart.tooltip.refresh(this) // 显示提示框
    this.series.chart.xAxis[0].drawCrosshair(event, this) // 显示十字准星线
  }
  /**
   * 同步缩放效果，即当一个图表进行了缩放效果，其他图表也进行缩放
   */
  function syncExtremes(e) {
    var thisChart = this.chart
    if (e.trigger !== 'syncExtremes') {
      Highcharts.each(Highcharts.charts, function(chart) {
        if (chart !== thisChart) {
          if (chart.xAxis[0].setExtremes) {
            chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
              trigger: 'syncExtremes'
            })
          }
        }
      })
    }
  }
  var curve1 = [
    {
      //PFltSig_ratRFlowEgB1_T
      name: '初始值',
      lineWidth: 3,
      color: 'rgba(223, 83, 83, .5)',
      data: [
        [-50.040000000000006, 0.817],
        [85.66, 1.162],
        [221.35999999999999, 1.473],
        [357.15999999999997, 1.674],
        [492.86, 1.731],
        [628.5600000000001, 2.19],
        [764.26, 2.548],
        [900.0600000000001, 2.79],
        [1035.76, 3.026],
        [1171.46, 3.255],
        [1307.26, 3.479]
      ]
    },
    {
      name: '标定值',
      lineWidth: 3,
      color: 'rgba(119, 152, 191, .5)',
      data: [
        [-50.040000000000006, 0.817],
        [85.66, 1.162],
        [221.35999999999999, 1.473],
        [357.15999999999997, 1.674],
        [492.86, 1.731],
        [628.5600000000001, 2.19],
        [764.26, 2.548],
        [900.0600000000001, 2.79],
        [1035.76, 3.026],
        [1171.46, 3.255],
        [1307.26, 3.479]
      ]
    }
  ]
  var curve2 = [
    {
      //"PFltSig_rFlowPfilRefB1_T"
      name: '初始值2',
      color: 'rgba(223, 83, 83, .5)',
      data: [
        [-50.040000000000006, 0.0365],
        [85.66, 0.03607],
        [221.35999999999999, 0.035],
        [357.15999999999997, 0.0329],
        [492.86, 0.0313],
        [628.5600000000001, 0.02856],
        [764.26, 0.02682],
        [900.0600000000001, 0.02629],
        [1035.76, 0.02587],
        [1171.46, 0.02546],
        [1307.26, 0.02503]
      ]
    },
    {
      name: '标定值2',
      color: 'rgba(119, 152, 191, .5)',
      data: [
        [-50.040000000000006, 0.0365],
        [85.66, 0.03607],
        [221.35999999999999, 0.035],
        [357.15999999999997, 0.0329],
        [492.86, 0.0313],
        [628.5600000000001, 0.02856],
        [764.26, 0.02682],
        [900.0600000000001, 0.02629],
        [1035.76, 0.02587],
        [1171.46, 0.02546],
        [1307.26, 0.02503]
      ]
    }
  ]

  var curves = [
    {
      name: '标定值s',
      color: 'rgba(223, 83, 83, .5)',
      data: [
        [-50.040000000000006, 0.0298205],
        [85.66, 0.04191334],
        [221.35999999999999, 0.051555],
        [357.15999999999997, 0.0550746],
        [492.86, 0.0541803],
        [628.5600000000001, 0.0625464],
        [764.26, 0.06833736],
        [900.0600000000001, 0.0733491],
        [1035.76, 0.07828262],
        [1171.46, 0.0828723],
        [1307.26, 0.08707937]
      ]
    },
    {
      name: '初始值s',
      color: 'rgba(119, 152, 191, .5)',
      data: [
        [-50.040000000000006, 0.0298205],
        [85.66, 0.04191334],
        [221.35999999999999, 0.051555],
        [357.15999999999997, 0.0550746],
        [492.86, 0.0541803],
        [628.5600000000001, 0.0625464],
        [764.26, 0.06833736],
        [900.0600000000001, 0.0733491],
        [1035.76, 0.07828262],
        [1171.46, 0.0828723],
        [1307.26, 0.08707937]
      ]
    }
  ]
  // curves
  var curves2 = [
    {
      name: '初始值',
      lineWidth: 3,
      color: 'rgba(223, 83, 83, .5)',
      data: curves[1]['data']
    },
    {
      name: '标定值',
      lineWidth: 3,
      color: 'rgba(119, 152, 191, .5)',
      data: curves[0]['data']
    }
  ]
  //PFltSig_rFlowPfilRefB1_T
  var rFlowPfilRefB1_T = [
    {
      name: '初始值',
      lineWidth: 3,
      color: 'rgba(223, 83, 83, .5)',
      data: curve1[1]['data']
    },
    {
      name: '标定值',
      lineWidth: 3,
      color: 'rgba(119, 152, 191, .5)',
      data: curve1[0]['data']
    }
  ]
  // PFltSig_ratRFlowEgB1_T
  var ratRFlowEgB1_T = [
    {
      name: '初始值',
      lineWidth: 3,
      color: 'rgba(223, 83, 83, .5)',
      data: curve2[1]['data']
    },
    {
      name: '标定值',
      lineWidth: 3,
      color: 'rgba(119, 152, 191, .5)',
      data: curve2[0]['data']
    }
  ]

  var calibrations = {
    PFltSig_vfEgPfilFildMinB1_C: 100.0,
    PFltSig_vfEgPfilFildMaxB1_C: 800.0,
    PFltSig_tiNormMin_C: 20.0,
    PFltSig_dvfEgPfilFildMinB1_C: 35.0,
    PFltSig_dvfEgPfilFildMaxB1_C: 1000.0,
    PFltSig_dmSotOxdMax_C: 32.0,
    PPfilDif_ratPCorrlnThdDual_C: -0.5,
    PFltSig_ratPCorrlnMinDiag_C: 0.3,
    PFltSig_numPCorrlnAvrgDiag_C: 3.0,
    PFltSig_numPCorrlnAvrg_C: 6.0,
    PFltSig_facPDeltaPfilRefCorrB1_C: 21.0,
    PFltSig_tiFilPDifB1_C: 4.0,
    PFltSig_tiFilVfB1_C: 4.0,
    PFltSig_stRstCrssCorrlnB1_C: 112.0,
    tiEfcDurnMin_C: 20.0,
    PFltSig_stHaltCrssCorrlnB1_C: 142.0,
    PFltSig_rFlowPfilRefB1_T: {
      retXData: [
        -50.040000000000006,
        85.66,
        221.35999999999999,
        357.15999999999997,
        492.86,
        628.5600000000001,
        764.26,
        900.0600000000001,
        1035.76,
        1171.46,
        1307.26
      ],
      retZData: [
        3.2767,
        0.0784,
        3.2767,
        0.0784,
        3.2767,
        0.0,
        3.2767,
        3.2767,
        0.0784,
        3.2767,
        0.0784
      ]
    },
    PFltSig_ratRFlowEgB1_T: {
      retXData: [
        -50.040000000000006,
        85.66,
        221.35999999999999,
        357.15999999999997,
        492.86,
        628.5600000000001,
        764.26,
        900.0600000000001,
        1035.76,
        1171.46,
        1307.26
      ],
      retZData: [
        0.817,
        1.162,
        1.473,
        1.674,
        1.731,
        2.19,
        2.548,
        2.79,
        3.026,
        3.255,
        3.479
      ]
    },
    lost_signals: "['apple', 'banana']"
  }

  //Select CFF signals

  //绘图

  // var chart = Highcharts.chart('tin_curve', {
  //   chart: {
  //             marginLeft: 40, // Keep all charts left aligned
  //             spacingTop: 20,
  //             spacingBottom: 20,
  //             zoomType: 'x'
  //           },
  //           title: {
  //             text: "",
  //             align: 'left',
  //             margin: 0,
  //             x: 30
  //           },
  //           credits: {
  //             enabled: false
  //           },
  //           legend: {
  //             enabled: false
  //           },
  //           xAxis: {
  //             crosshair: true,
  //             events: {
  //               setExtremes: syncExtremes
  //             },
  //             labels: {
  //               format: '{value} km'
  //             }
  //           },
  //           yAxis: {
  //             title: {
  //               text: null
  //             }
  //           },

  //           series: curve2
  // })

  //
  var dataserious = [rFlowPfilRefB1_T, ratRFlowEgB1_T, curves2]

  for (var i = 0; i < dataserious.length; i++) {
    console.log(dataserious[i])
    console.log()
    $('<div class="chart">')
      .appendTo('#tin_curve')
      .highcharts({
        chart: {
          marginLeft: 40, // Keep all charts left aligned
          spacingTop: 20,
          spacingBottom: 20,
          zoomType: 'x'
        },
        title: {
          text: '',
          align: 'left',
          margin: 0,
          x: 30
        },
        credits: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        xAxis: {
          crosshair: true,
          events: {
            setExtremes: syncExtremes
          },
          labels: {
            format: '{value} km'
          }
        },
        yAxis: {
          title: {
            text: null
          }
        },

        series: dataserious[i]
        // {
        //   data: dataserious[i][data],

        // }
      })
  }
  // dataserious.forEach(x=>{
  //   console.log(x);

  //   })

  function syncExtremes(e) {
    var thisChart = this.chart
    if (e.trigger !== 'syncExtremes') {
      Highcharts.each(Highcharts.charts, function(chart) {
        if (chart !== thisChart) {
          if (chart.xAxis[0].setExtremes) {
            chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
              trigger: 'syncExtremes'
            })
          }
        }
      })
    }
  }

  //表格1

  $('#tblAppendGrid_c1').appendGrid({
    caption: 'curve1',
    // captionTooltip
    captionTooltip: {
      items: 'td',
      content: 'curve1',
      show: {
        effect: 'fold',
        delay: 200
      }
    },
    columns: [
      {
        name: 'x',
        display: 'x'
      },
      {
        name: 'y',
        display: 'y'
      }
    ],
    initData: [
      {
        x: '-50.040000000000006',
        y: '0.817'
      },
      {
        x: '85.66',
        y: '1.162'
      },
      {
        x: '221.359999999999',
        y: '1.473'
      },
      {
        x: '357.159999',
        y: '1.674'
      },
      {
        x: '492.86',
        y: '1.731'
      },
      {
        x: '628.56',
        y: '2.19'
      },
      {
        x: '764.26',
        y: '2.548'
      },
      {
        x: '900.06',
        y: '2.79'
      },
      {
        x: '1035.76',
        y: '3.026'
      },
      {
        x: '1171.46',
        y: '3.255'
      },
      {
        x: '1307.26',
        y: '3.479'
      }
    ]
  })
  //把表格数据发给绘图变量

  $('#confirm_c1')
    .button()
    .click(function() {
      var chart = Highcharts.charts[0]
      var count = $('#tblAppendGrid_c1').appendGrid('getRowCount') //行数
      console.log('count:' + count)
      var data = $('#tblAppendGrid_c1').appendGrid('getAllValue')
      console.log(data)
      // var pushrow = [0, 0];
      var datas = []
      for (i = 0; i < count; i++) {
        datas.push([parseFloat(data[i].x), parseFloat(data[i].y)])
      }
      console.log(datas)
      curve1[0]['data'] = datas
      console.log(curve1[0]['data'])
      console.log(curve1[0])

      chart.series[0].remove()
      chart.series[0].remove()

      //   curve1.shift()
      //  curve1.shift()
      // chart.redraw();
      chart.addSeries({
        name: '初始值',
        lineWidth: 3,
        color: 'rgba(223, 83, 83, .5)',
        data: datas
      }) //将表格数据发送给绘图，并重新绘图！！！
      chart.addSeries({
        name: '标定值',
        lineWidth: 3,
        color: 'rgba(119, 152, 191, .5)',
        data: curve1[0]['data']
      })
      chart.setTitle({
        text: 'PFltSig_rFlowPfilRefB1_T'
      })
      chart.redraw()
    })

  //表格参数初始化
  $('#init_c1')
    .button()
    .click(function() {
      $('#tblAppendGrid_c1').appendGrid('load', [
        {
          x: '-50.040000000000006',
          y: '0.817'
        },
        {
          x: '85.66',
          y: '1.162'
        },
        {
          x: '221.359999999999',
          y: '1.473'
        },
        {
          x: '357.159999',
          y: '1.674'
        },
        {
          x: '492.86',
          y: '1.731'
        },
        {
          x: '628.56',
          y: '2.19'
        },
        {
          x: '764.26',
          y: '2.548'
        },
        {
          x: '900.06',
          y: '2.79'
        },
        {
          x: '1035.76',
          y: '3.026'
        },
        {
          x: '1171.46',
          y: '3.255'
        },
        {
          x: '1307.26',
          y: '3.479'
        }
      ])
      var data = $('#tblAppendGrid_c1').appendGrid('getAllValue', true)

      var datas = []
      for (i = 0; i < data['_RowCount']; i++) {
        datas.push([parseFloat(data['x_' + i]), parseFloat(data['y_' + i])])
      }
      curve1[0]['data'] = datas
      console.log(curve1[0]['data'])
    })

  //表格2

  $('#tblAppendGrid_c2').appendGrid({
    caption: 'curve2',
    // captionTooltip
    captionTooltip: {
      items: 'td',
      content: 'curve2',
      show: {
        effect: 'fold',
        delay: 200
      }
    },
    columns: [
      {
        name: 'x',
        display: 'x'
      },
      {
        name: 'y',
        display: 'y'
      }
    ],
    initData: [
      {
        x: '-50.040000000000006',
        y: '0.03650'
      },
      {
        x: '85.66',
        y: '0.036070'
      },
      {
        x: '221.359999999999',
        y: '0.035000'
      },
      {
        x: '357.159999',
        y: '0.03290'
      },
      {
        x: '492.86',
        y: '0.031300'
      },
      {
        x: '628.56',
        y: '0.028560'
      },
      {
        x: '764.26',
        y: '0.02682'
      },
      {
        x: '900.06',
        y: '0.026290'
      },
      {
        x: '1035.76',
        y: '0.02587'
      },
      {
        x: '1171.46',
        y: '0.025460'
      },
      {
        x: '1307.26',
        y: '0.025030'
      }
    ]
  })
  //把表格数据发给绘图变量
  $('#confirm_c2')
    .button()
    .click(function() {
      var chart = Highcharts.charts[1]
      var count = $('#tblAppendGrid_c2').appendGrid('getRowCount') //行数
      console.log('count:' + count)
      var data = $('#tblAppendGrid_c2').appendGrid('getAllValue')
      console.log(data)
      // var pushrow = [0, 0];
      var datas = []
      for (i = 0; i < count; i++) {
        datas.push([parseFloat(data[i].x), parseFloat(data[i].y)])
      }
      console.log(datas)
      curve2[0]['data'] = datas
      console.log(curve2[0]['data'])
      chart.series[0].remove()
      chart.series[0].remove()

      // chart.redraw();
      chart.addSeries({
        name: '初始值',
        lineWidth: 3,
        color: 'rgba(223, 83, 83, .5)',
        data: datas
      }) //将表格数据发送给绘图，并重新绘图！！！
      chart.addSeries({
        name: '标定值',
        lineWidth: 3,
        color: 'rgba(119, 152, 191, .5)',
        data: curve2[0]['data']
      })
      chart.setTitle({
        text: 'PFltSig_ratRFlowEgB1_T'
      })
      chart.redraw()
    })
  //表格参数初始化
  $('#init_c2')
    .button()
    .click(function() {
      $('#tblAppendGrid_c2').appendGrid('load', [
        {
          x: '-50.040000000000006',
          y: '0.03650'
        },
        {
          x: '85.66',
          y: '0.036070'
        },
        {
          x: '221.359999999999',
          y: '0.035000'
        },
        {
          x: '357.159999',
          y: '0.03290'
        },
        {
          x: '492.86',
          y: '0.031300'
        },
        {
          x: '628.56',
          y: '0.028560'
        },
        {
          x: '764.26',
          y: '0.02682'
        },
        {
          x: '900.06',
          y: '0.026290'
        },
        {
          x: '1035.76',
          y: '0.02587'
        },
        {
          x: '1171.46',
          y: '0.025460'
        },
        {
          x: '1307.26',
          y: '0.025030'
        }
      ])
      var data = $('#tblAppendGrid_c2').appendGrid('getAllValue', true)

      var datas = []
      for (i = 0; i < data['_RowCount']; i++) {
        datas.push([parseFloat(data['x_' + i]), parseFloat(data['y_' + i])])
      }
      curve2[0]['data'] = datas
    })

  $(function() {
    $('#tblAppendGrid_c3').appendGrid({
      caption: 'curves',
      // captionTooltip
      captionTooltip: {
        items: 'td',
        content: 'curves',
        show: {
          effect: 'fold',
          delay: 200
        }
      },
      columns: [
        {
          name: 'x',
          display: 'x'
        },
        {
          name: 'y',
          display: 'y'
        }
      ],
      initData: [
        {
          x: '-50.040000000000006',
          y: '0.03650'
        },
        {
          x: '85.66',
          y: '0.036070'
        },
        {
          x: '221.359999999999',
          y: '0.035000'
        },
        {
          x: '357.159999',
          y: '0.03290'
        },
        {
          x: '492.86',
          y: '0.031300'
        },
        {
          x: '628.56',
          y: '0.028560'
        },
        {
          x: '764.26',
          y: '0.02682'
        },
        {
          x: '900.06',
          y: '0.026290'
        },
        {
          x: '1035.76',
          y: '0.02587'
        },
        {
          x: '1171.46',
          y: '0.025460'
        },
        {
          x: '1307.26',
          y: '0.025030'
        }
      ]
    })
    //把表格数据发给绘图变量
    $('#confirm_c3')
      .button()
      .click(function() {
        var chart = Highcharts.charts[2]
        var count = $('#tblAppendGrid_c3').appendGrid('getRowCount') //行数
        console.log('count:' + count)
        var data = $('#tblAppendGrid_c3').appendGrid('getAllValue')
        console.log(data)
        // var pushrow = [0, 0];
        var datas = []
        for (i = 0; i < count; i++) {
          datas.push([parseFloat(data[i].x), parseFloat(data[i].y)])
        }
        console.log(datas)
        curves[0]['data'] = datas
        console.log(curve2[0]['data'])
        chart.series[0].remove()
        chart.series[0].remove()

        // chart.redraw();
        chart.addSeries({
          name: '初始值',
          lineWidth: 3,
          color: 'rgba(223, 83, 83, .5)',
          data: datas
        }) //将表格数据发送给绘图，并重新绘图！！！
        chart.addSeries({
          name: '标定值',
          lineWidth: 3,
          color: 'rgba(119, 152, 191, .5)',
          data: curves[0]['data']
        })
        chart.setTitle({
          text: 'Curves'
        })
        chart.redraw()
      })
    //表格参数初始化
    $('#init_c3')
      .button()
      .click(function() {
        $('#tblAppendGrid_c3').appendGrid('load', [
          {
            x: '-50.040000000000006',
            y: '0.03650'
          },
          {
            x: '85.66',
            y: '0.036070'
          },
          {
            x: '221.359999999999',
            y: '0.035000'
          },
          {
            x: '357.159999',
            y: '0.03290'
          },
          {
            x: '492.86',
            y: '0.031300'
          },
          {
            x: '628.56',
            y: '0.028560'
          },
          {
            x: '764.26',
            y: '0.02682'
          },
          {
            x: '900.06',
            y: '0.026290'
          },
          {
            x: '1035.76',
            y: '0.02587'
          },
          {
            x: '1171.46',
            y: '0.025460'
          },
          {
            x: '1307.26',
            y: '0.025030'
          }
        ])
        var data = $('#tblAppendGrid_c3').appendGrid('getAllValue', true)

        var datas = []
        for (i = 0; i < data['_RowCount']; i++) {
          datas.push([parseFloat(data['x_' + i]), parseFloat(data['y_' + i])])
        }
        curves[0]['data'] = datas
      })
  })

  //标定曲线选择
  // $('#slector_curve').change(function() {
  //   var selectedItem = $('#slector_curve').val()
  //   if (selectedItem == 'PFltSig_rFlowPfilRefB1_T') {
  //     chart.series[0].remove()
  //     chart.series[0].remove()
  //     chart.addSeries({
  //       name: '初始值',
  //       lineWidth: 3,
  //       color: 'rgba(223, 83, 83, .5)',
  //       data: curve1[1]['data']
  //     }) //将表格数据发送给绘图，并重新绘图！！！
  //     chart.addSeries({
  //       name: '标定值',
  //       lineWidth: 3,
  //       color: 'rgba(119, 152, 191, .5)',
  //       data: curve1[0]['data']
  //     })
  //     chart.setTitle({
  //       text: 'PFltSig_rFlowPfilRefB1_T'
  //     })
  //     chart.redraw()
  //   }
  //   if (selectedItem == 'PFltSig_ratRFlowEgB1_T') {
  //     chart.series[0].remove()
  //     chart.series[0].remove()
  //     chart.addSeries({
  //       name: '初始值',
  //       lineWidth: 3,
  //       color: 'rgba(223, 83, 83, .5)',
  //       data: curve2[1]['data']
  //     }) //将表格数据发送给绘图，并重新绘图！！！
  //     chart.addSeries({
  //       name: '标定值',
  //       lineWidth: 3,
  //       color: 'rgba(119, 152, 191, .5)',
  //       data: curve2[0]['data']
  //     })
  //     chart.setTitle({
  //       text: 'PFltSig_ratRFlowEgB1_T'
  //     })
  //     chart.redraw()
  //   }
  //   if (selectedItem == 'Curves') {
  //     chart.series[0].remove()
  //     chart.series[0].remove()
  //     chart.addSeries({
  //       name: '初始值',
  //       lineWidth: 3,
  //       color: 'rgba(223, 83, 83, .5)',
  //       data: curves[1]['data']
  //     }) //将表格数据发送给绘图，并重新绘图！！！
  //     chart.addSeries({
  //       name: '标定值',
  //       lineWidth: 3,
  //       color: 'rgba(119, 152, 191, .5)',
  //       data: curves[0]['data']
  //     })
  //     chart.setTitle({
  //       text: 'Curves'
  //     })
  //     chart.redraw()
  //   }
  // })

  //标定结果选择
  $('#slector_signal').change(function() {
    var selectedItem = $('#slector_signal').val()
    if (selectedItem == 'PFltSig_ratPCorrlnSnsrHslnCnctnB1') {
      console.log('s1')
      // chart.series[0].setData(curve1[0]['data']);//将表格数据发送给绘图，并重新绘图！！！
    }
    if (
      selectedItem == 'PFltSig_vfEgPfilCorrdFildB1 - PFltSig_pPfilDifFildB1'
    ) {
      console.log('s2')
      // chart.series[0].setData(curve1[0]['data']);//将表格数据发送给绘图，并重新绘图！！！
    }
    if (selectedItem == 'PFltSig_pPfilDifRefB1/PFltSig_pPfilDifFildB1') {
      console.log('s3')
      // chart.series[0].setData(curve1[0]['data']);//将表格数据发送给绘图，并重新绘图！！！
    }
    if (
      selectedItem == 'PFltSig_pDeltaPfilDifRefB1/PFltSig_pDeltaPfilDifFildB1'
    ) {
      console.log('s4')
      // chart.series[0].setData(curve1[0]['data']);//将表格数据发送给绘图，并重新绘图！！！
    }
  })

  //改变y坐标
  $('#yrange')
    .button()
    .click(function() {
      var min = $('#yrange_min').val()
      var max = $('#yrange_max').val()
      // var selectedItem = $('#slector_curve').val();//用selector_curve做演示

      console.log($('#yrange_max').val())
      for (i = 0; i < Highcharts.charts.length; i = i + 1) {
        chart = Highcharts.charts[i]
        chart.yAxis[0].update({
          max: max,
          min: min
        })
      }
    })

  // var calibration_data

  //保存DCM
  $('#simulation').click(function() {
    var array = $('#appendGrid1').serializeArray()
    var array2 = $('#appendGrid2').serializeArray()
    console.log(array2)
    var target = 'UAES-NE2/GPFtoolbox/1.dat'
    var appendGrid1X = []
    var appendGrid1Y = []
    var appendGrid2X = []
    var appendGrid2Y = []

    for (var i = 0; i < array.length; i++) {
      if (i % 2 == 0) {
        appendGrid1X.push(array[i].value)
      } else {
        appendGrid1Y.push(array[i].value)
      }
    }
    appendGrid1X.pop()
    console.log(appendGrid1X)
    console.log(appendGrid1Y)
    //表格2
    for (var i = 0; i < array2.length; i++) {
      if (i % 2 == 0) {
        appendGrid2X.push(array2[i].value)
      } else {
        appendGrid2Y.push(array2[i].value)
      }
    }
    appendGrid2X.pop()
    console.log(appendGrid2X)
    console.log(appendGrid2Y)

    calibrations = {
      PFltSig_vfEgPfilFildMinB1_C: $('#PFltSig_vfEgPfilFildMinB1_C').val(),
      PFltSig_vfEgPfilFildMaxB1_C: $('#PFltSig_vfEgPfilFildMaxB1_C').val(),
      PFltSig_tiNormMin_C: $('#PFltSig_tiNormMin_C').val(),
      PFltSig_dvfEgPfilFildMinB1_C: $('#PFltSig_dvfEgPfilFildMinB1_C').val(),
      PFltSig_dvfEgPfilFildMaxB1_C: $('#PFltSig_dvfEgPfilFildMaxB1_C').val(),
      PFltSig_dmSotOxdMax_C: $('#PFltSig_dvfEgPfilFildMaxB1_C').val(),
      PPfilDif_ratPCorrlnThdDual_C: $('#PPfilDif_ratPCorrlnThdDual_C').val(),
      PFltSig_ratPCorrlnMinDiag_C: $('#PFltSig_ratPCorrlnMinDiag_C').val(),
      PFltSig_numPCorrlnAvrgDiag_C: $('#PFltSig_numPCorrlnAvrgDiag_C').val(),
      PFltSig_numPCorrlnAvrg_C: $('#PFltSig_numPCorrlnAvrg_C').val(),
      PFltSig_facPDeltaPfilRefCorrB1_C: $(
        '#PFltSig_facPDeltaPfilRefCorrB1_C'
      ).val(),
      PFltSig_tiFilPDifB1_C: $('#PFltSig_tiFilPDifB1_C').val(),
      PFltSig_tiFilVfB1_C: $('#PFltSig_tiFilVfB1_C').val(),
      PFltSig_stRstCrssCorrlnB1_C: $('#PFltSig_stRstCrssCorrlnB1_C').val(),
      'PFltSig_StMacPBasdB1.tiEfcDurnMin_C': $('#tiEfcDurnMin_C').val(),
      PFltSig_stHaltCrssCorrlnB1_C: $('#PFltSig_stHaltCrssCorrlnB1_C').val(),
      PFltSig_rFlowPfilRefB1_T: {
        retXData: appendGrid1X,
        retZData: appendGrid1Y
      },
      PFltSig_ratRFlowEgB1_T: {
        retXData: appendGrid2X,
        retZData: appendGrid2Y
      }
    }

    console.log(calibrations)
    console.log(target)
    // setTimeout(() => {

    // }, timeout);
    $.ajax({
      type: 'POST',
      url:
        'http://139.224.5.105:30002/uaes-intelligent-calibration/v1/wc/gpf/analysisGPFToolBox',
      data: {
        jsonStr: JSON.stringify(calibrations),
        fileUrl: target
      },
      dataType: 'json',
      success: function(data) {
        console.log(calibrations)
        console.log(data)
      }
    })
  })
  // $('#postfiles').click(function(){

  // })

  // if ($('.progress-bar') && 0 < $('.progress-bar').width() < 200) {
  //   console.log('disabled')
  //   $('#selectfiles').addClass('disabled')
  // }

  //上传时禁止a

  // createDCM

  $('#create_DCM').click(function() {
    var array = $('#appendGrid1').serializeArray()
    var array2 = $('#appendGrid2').serializeArray()
    var target = 'UAES-NE2/GPFtoolbox/1.dat'
    var appendGrid1X = []
    var appendGrid1Y = []
    var appendGrid2X = []
    var appendGrid2Y = []

    for (var i = 0; i < array.length; i++) {
      if (i % 2 == 0) {
        appendGrid1X.push(array[i].value)
      } else {
        appendGrid1Y.push(array[i].value)
      }
    }
    appendGrid1X.pop()
    // console.log(appendGrid1X)
    // console.log(appendGrid1Y)
    //表格2
    for (var i = 0; i < array2.length; i++) {
      if (i % 2 == 0) {
        appendGrid2X.push(array2[i].value)
      } else {
        appendGrid2Y.push(array2[i].value)
      }
    }
    appendGrid2X.pop()
    // console.log(appendGrid2X)
    // console.log(appendGrid2Y)

    var calibrations = {
      PFltSig_vfEgPfilFildMinB1_C: $('#PFltSig_vfEgPfilFildMinB1_C').val(),
      PFltSig_vfEgPfilFildMaxB1_C: $('#PFltSig_vfEgPfilFildMaxB1_C').val(),
      PFltSig_tiNormMin_C: $('#PFltSig_tiNormMin_C').val(),
      PFltSig_dvfEgPfilFildMinB1_C: $('#PFltSig_dvfEgPfilFildMinB1_C').val(),
      PFltSig_dvfEgPfilFildMaxB1_C: $('#PFltSig_dvfEgPfilFildMaxB1_C').val(),
      PFltSig_dmSotOxdMax_C: $('#PFltSig_dvfEgPfilFildMaxB1_C').val(),
      PPfilDif_ratPCorrlnThdDual_C: $('#PPfilDif_ratPCorrlnThdDual_C').val(),
      PFltSig_ratPCorrlnMinDiag_C: $('#PFltSig_ratPCorrlnMinDiag_C').val(),
      PFltSig_numPCorrlnAvrgDiag_C: $('#PFltSig_numPCorrlnAvrgDiag_C').val(),
      PFltSig_numPCorrlnAvrg_C: $('#PFltSig_numPCorrlnAvrg_C').val(),
      PFltSig_facPDeltaPfilRefCorrB1_C: $(
        '#PFltSig_facPDeltaPfilRefCorrB1_C'
      ).val(),
      PFltSig_tiFilPDifB1_C: $('#PFltSig_tiFilPDifB1_C').val(),
      PFltSig_tiFilVfB1_C: $('#PFltSig_tiFilVfB1_C').val(),
      PFltSig_stRstCrssCorrlnB1_C: $('#PFltSig_stRstCrssCorrlnB1_C').val(),
      'PFltSig_StMacPBasdB1.tiEfcDurnMin_C': $('#tiEfcDurnMin_C').val(),
      PFltSig_stHaltCrssCorrlnB1_C: $('#PFltSig_stHaltCrssCorrlnB1_C').val(),
      PFltSig_rFlowPfilRefB1_T: {
        retXData: appendGrid1X,
        retZData: appendGrid1Y
      },
      PFltSig_ratRFlowEgB1_T: {
        retXData: appendGrid2X,
        retZData: appendGrid2Y
      }
    }
    var test_dcm_title = 'KONSERVIERUNG_FORMAT 2.0\n'
    var FESTWERT = 'FESTWERT '
    var funktionen =
      "FUNKTIONEN\nFKT PFltSig_PCorrln 'U100.11.1' 'U100.11.1 Cross-correlation estimation of referenced and measured differential pressure gradients over GPF for pressure-based GPF-diagnosis' \nEND\n\n"
    var dcm_content = test_dcm_title + funktionen

    var c4 = [
      'PFltSig_stHaltCrssCorrlnB1_C',
      'tiEfcDurnMin_C',
      'PFltSig_stRstCrssCorrlnB1_C'
    ]
    var t4 = []
    var PFltSig_Coorr = creat_dcm(dcm_content, c4, t4, calibrations)
    console.log(PFltSig_Coorr)
    c3 = ['PFltSig_tiFilPDifB1_C', 'PFltSig_tiFilVfB1_C']
    t3 = ['PFltSig_ratRFlowEgB1_T']
    var PFltSig_PCdng = creat_dcm(dcm_content, c3, t3, calibrations)
    console.log(PFltSig_PCdng)
    c2 = [
      'PFltSig_facPDeltaPfilRefCorrB1_C',
      'PFltSig_numPCorrlnAvrg_C',
      'PFltSig_numPCorrlnAvrgDiag_C',
      'PFltSig_ratPCorrlnMinDiag_C',
      'PPfilDif_ratPCorrlnThdDual_C'
    ]
    t2 = ['PFltSig_rFlowPfilRefB1_T']
    var PFltSig_PCorrln = creat_dcm(dcm_content, c2, t2, calibrations)
    console.log(PFltSig_PCorrln)

    c1 = [
      'PFltSig_dmSotOxdMax_C',
      'PFltSig_dvfEgPfilFildMaxB1_C',
      'PFltSig_dvfEgPfilFildMinB1_C',
      'PFltSig_tiNormMin_C',
      'PFltSig_vfEgPfilFildMaxB1_C',
      'PFltSig_vfEgPfilFildMinB1_C'
    ]
    t1 = []
    var PFltSig_PCorrln2 = creat_dcm(dcm_content, c1, t1, calibrations)
    console.log(PFltSig_PCorrln2)
    // console.log(Coorr_p[1])
    function creat_dcm(dcm_content, c, t, calibrations) {
      txt = dcm_content
      for (i = 0; i < c.length; i++) {
        txt = txt + create_c(c[i], calibrations[c[i]])
      }
      for (i = 0; i < t.length; i++) {
        txt = txt + create_t(t[i], calibrations[t])
      }
      return txt
    }

    function create_c(name, value) {
      var myDate = new Date()
      var mytime = myDate.getTime() //获取当前时间
      var txt = 'FESTWERT '
      txt =
        txt +
        name +
        '\n' +
        '    LANGNAME   ' +
        myDate.getTime() +
        '\n' +
        '    FUNKTION \n ' +
        "    EINHEIT_W '-'\n" +
        '    WERT ' +
        value +
        '\n' +
        'END' +
        '\n\n'
      return txt
    }

    function create_t(name, value) {
      var myDate = new Date()
      var mytime = myDate.getTime() //获取当前时间
      var txt = 'KENNLINIE  '
      txt =
        txt +
        name +
        '\n' +
        '    LANGNAME   ' +
        myDate.getTime() +
        '\n' +
        '    FUNKTION \n '
      var x = '   ST/X    '
      for (i = 0; i < 6; i++) {
        x = x + value['retXData'][i] + '   '
      }
      x = x + '\n    ST/X    '
      for (i = 6; i < 11; i++) {
        x = x + value['retXData'][i] + '   '
      }
      x = x + '\n'
      txt = txt + x

      x = '    WERT   '
      for (i = 0; i < 6; i++) {
        x = x + value['retZData'][i] + '   '
      }
      x = x + '\n    WERT   '
      for (i = 6; i < 11; i++) {
        x = x + value['retZData'][i] + '   '
      }
      x = x + '\n'
      txt = txt + x
      txt = txt + 'END\n\n'
      return txt
    }
    var DCMData =
      PFltSig_Coorr + PFltSig_PCdng + PFltSig_PCorrln + PFltSig_PCorrln2
    var blob = new Blob([DCMData], {
      type: 'text/plain;charset=utf-8'
    })
    var d = new Date()
    var n = d.getTime()
    var name1 = n + Math.ceil(Math.random() * 1000) + '.DCM'
    // var name2 = n + Math.ceil(Math.random() * 1000) + '.DCM'
    // var name3 = n + Math.ceil(Math.random() * 1000) + '.DCM'
    // var name4 = n + Math.ceil(Math.random() * 1000) + '.DCM'

    saveAs(blob, name1)
    //
    // var blob2 = new Blob([PFltSig_PCdng], {
    //   type: 'text/plain;charset=utf-8'
    // })
    // saveAs(blob2, name2)
    // //
    // var blob3 = new Blob([PFltSig_PCorrln], {
    //   type: 'text/plain;charset=utf-8'
    // })
    // saveAs(blob3, name3)
    // //
    // var blob4 = new Blob([PFltSig_PCorrln2], {
    //   type: 'text/plain;charset=utf-8'
    // })

    // saveAs(blob4, name4)
    //
  })

  $('.read_DCM').change(function() {
    var DCM
    function ReadDCM(files) {
      if (files.length) {
        var file = files[0]
        console.log(file)
        var reader = new FileReader() //new一个FileReader实例
        // if (/text+/.test(file.type)) {
        //判断文件类型，是不是text类型

        reader.onload = function() {
          DCM = this.result
          console.log(DCM)
          var dcm_dict = read_DCM(DCM)
          console.log(dcm_dict)

          function read_DCM(DCM_string) {
            console.log(DCM)
            var result = DCM.match(/(FESTWERT)[\s\S]*?(END\n)/g)
            console.log(result)
            var return_dict = {}
            calibrations = []
            result.forEach(x => {
              x = x.trim()
              var obj = {}
              var splitlines = x.split('\n')
              var linetitle = splitlines[0].trim()
              obj['name'] = linetitle.split(' ')[1]
              obj['value'] = splitlines[4].trim().split(' ')[1]
              calibrations.push(obj)
              return_dict[linetitle.split(' ')[1]] = parseFloat(
                splitlines[4].trim().split(' ')[1]
              )
            })

            result = DCM.match(/(KENNLINIE)[\s\S]*?(END\n)/g)
            // console.log();

            T = {
              x: [],
              y: []
            }
            result.forEach(x => {
              x = x.trim()
              var obj = {}
              var splitlines = x.split('\n')
              var linetitle = splitlines[0].trim()
              obj['name'] = linetitle.split(' ')[1]
              return_dict[obj['name']] = {}
              obj['x'] = []
              splitlines[5]
                .trim()
                .split('  ')
                .slice(1, 7)
                .forEach(element => {
                  obj['x'].push(parseFloat(element))
                })
              splitlines[6]
                .trim()
                .split('  ')
                .slice(1, 6)
                .forEach(element => {
                  obj['x'].push(parseFloat(element))
                })
              obj['y'] = []
              splitlines[7]
                .trim()
                .split('  ')
                .slice(1, 7)
                .forEach(element => {
                  obj['y'].push(parseFloat(element))
                })
              splitlines[8]
                .trim()
                .split('  ')
                .slice(1, 6)
                .forEach(element => {
                  obj['y'].push(parseFloat(element))
                })
              T['y'] = obj['y']
              T['x'] = obj['x']
              return_dict[obj['name']]['x'] = T['x']
              return_dict[obj['name']]['y'] = T['y']
            })
            return return_dict
          }
        }
        reader.readAsText(file)
        // }
        //  else if (/image+/.test(file.type)) {
        //   //判断文件是不是imgage类型
        //   reader.onload = function() {
        //     $('body').append('<img src="' + this.result + '"/>')
        //   }
        //   reader.readAsDataURL(file)
        // }
      }
    }
    ReadDCM(this.files)

    //获取上传的文件

    //readDCM
  })
})
