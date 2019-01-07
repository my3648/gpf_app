/*
 Highcharts JS v7.0.1 (2018-12-19)
 Boost module

 (c) 2010-2018 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
;(function(z) {
  'object' === typeof module && module.exports
    ? (module.exports = z)
    : 'function' === typeof define && define.amd
    ? define(function() {
        return z
      })
    : z('undefined' !== typeof Highcharts ? Highcharts : void 0)
})(function(z) {
  ;(function(l) {
    function z() {
      var a = Array.prototype.slice.call(arguments),
        c = -Number.MAX_VALUE
      a.forEach(function(a) {
        if (
          'undefined' !== typeof a &&
          null !== a &&
          'undefined' !== typeof a.length &&
          0 < a.length
        )
          return (c = a.length), !0
      })
      return c
    }
    function V(a) {
      var c = 0,
        d = 0,
        f = G(a.options.boost && a.options.boost.allowForce, !0),
        b
      if ('undefined' !== typeof a.boostForceChartBoost)
        return a.boostForceChartBoost
      if (1 < a.series.length)
        for (var l = 0; l < a.series.length; l++)
          (b = a.series[l]),
            0 !== b.options.boostThreshold &&
              !1 !== b.visible &&
              'heatmap' !== b.type &&
              (H[b.type] && ++d,
              z(b.processedXData, b.options.data, b.points) >=
                (b.options.boostThreshold || Number.MAX_VALUE) && ++c)
      a.boostForceChartBoost = f && ((d === a.series.length && 0 < c) || 5 < c)
      return a.boostForceChartBoost
    }
    function P(a) {
      return G(a && a.options && a.options.boost && a.options.boost.enabled, !0)
    }
    function pa(a) {
      function c() {
        k.length && l.error('[highcharts boost] shader error - ' + k.join('\n'))
      }
      function d(b, e) {
        var c = a.createShader(
          'vertex' === e ? a.VERTEX_SHADER : a.FRAGMENT_SHADER
        )
        a.shaderSource(c, b)
        a.compileShader(c)
        return a.getShaderParameter(c, a.COMPILE_STATUS)
          ? c
          : (k.push(
              'when compiling ' + e + ' shader:\n' + a.getShaderInfoLog(c)
            ),
            !1)
      }
      function f() {
        function b(b) {
          return a.getUniformLocation(h, b)
        }
        var f = d(
            '#version 100\nprecision highp float;\nattribute vec4 aVertexPosition;\nattribute vec4 aColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform mat4 uPMatrix;\nuniform float pSize;\nuniform float translatedThreshold;\nuniform bool hasThreshold;\nuniform bool skipTranslation;\nuniform float plotHeight;\nuniform float xAxisTrans;\nuniform float xAxisMin;\nuniform float xAxisMinPad;\nuniform float xAxisPointRange;\nuniform float xAxisLen;\nuniform bool  xAxisPostTranslate;\nuniform float xAxisOrdinalSlope;\nuniform float xAxisOrdinalOffset;\nuniform float xAxisPos;\nuniform bool  xAxisCVSCoord;\nuniform float yAxisTrans;\nuniform float yAxisMin;\nuniform float yAxisMinPad;\nuniform float yAxisPointRange;\nuniform float yAxisLen;\nuniform bool  yAxisPostTranslate;\nuniform float yAxisOrdinalSlope;\nuniform float yAxisOrdinalOffset;\nuniform float yAxisPos;\nuniform bool  yAxisCVSCoord;\nuniform bool  isBubble;\nuniform bool  bubbleSizeByArea;\nuniform float bubbleZMin;\nuniform float bubbleZMax;\nuniform float bubbleZThreshold;\nuniform float bubbleMinSize;\nuniform float bubbleMaxSize;\nuniform bool  bubbleSizeAbs;\nuniform bool  isInverted;\nfloat bubbleRadius(){\nfloat value \x3d aVertexPosition.w;\nfloat zMax \x3d bubbleZMax;\nfloat zMin \x3d bubbleZMin;\nfloat radius \x3d 0.0;\nfloat pos \x3d 0.0;\nfloat zRange \x3d zMax - zMin;\nif (bubbleSizeAbs){\nvalue \x3d value - bubbleZThreshold;\nzMax \x3d max(zMax - bubbleZThreshold, zMin - bubbleZThreshold);\nzMin \x3d 0.0;\n}\nif (value \x3c zMin){\nradius \x3d bubbleZMin / 2.0 - 1.0;\n} else {\npos \x3d zRange \x3e 0.0 ? (value - zMin) / zRange : 0.5;\nif (bubbleSizeByArea \x26\x26 pos \x3e 0.0){\npos \x3d sqrt(pos);\n}\nradius \x3d ceil(bubbleMinSize + pos * (bubbleMaxSize - bubbleMinSize)) / 2.0;\n}\nreturn radius * 2.0;\n}\nfloat translate(float val,\nfloat pointPlacement,\nfloat localA,\nfloat localMin,\nfloat minPixelPadding,\nfloat pointRange,\nfloat len,\nbool  cvsCoord\n){\nfloat sign \x3d 1.0;\nfloat cvsOffset \x3d 0.0;\nif (cvsCoord) {\nsign *\x3d -1.0;\ncvsOffset \x3d len;\n}\nreturn sign * (val - localMin) * localA + cvsOffset + \n(sign * minPixelPadding);\n}\nfloat xToPixels(float value){\nif (skipTranslation){\nreturn value;// + xAxisPos;\n}\nreturn translate(value, 0.0, xAxisTrans, xAxisMin, xAxisMinPad, xAxisPointRange, xAxisLen, xAxisCVSCoord);// + xAxisPos;\n}\nfloat yToPixels(float value, float checkTreshold){\nfloat v;\nif (skipTranslation){\nv \x3d value;// + yAxisPos;\n} else {\nv \x3d translate(value, 0.0, yAxisTrans, yAxisMin, yAxisMinPad, yAxisPointRange, yAxisLen, yAxisCVSCoord);// + yAxisPos;\nif (v \x3e plotHeight) {\nv \x3d plotHeight;\n}\n}\nif (checkTreshold \x3e 0.0 \x26\x26 hasThreshold) {\nv \x3d min(v, translatedThreshold);\n}\nreturn v;\n}\nvoid main(void) {\nif (isBubble){\ngl_PointSize \x3d bubbleRadius();\n} else {\ngl_PointSize \x3d pSize;\n}\nvColor \x3d aColor;\nif (isInverted) {\ngl_Position \x3d uPMatrix * vec4(xToPixels(aVertexPosition.y) + yAxisPos, yToPixels(aVertexPosition.x, aVertexPosition.z) + xAxisPos, 0.0, 1.0);\n} else {\ngl_Position \x3d uPMatrix * vec4(xToPixels(aVertexPosition.x) + xAxisPos, yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, 0.0, 1.0);\n}\n}',
            'vertex'
          ),
          l = d(
            'precision highp float;\nuniform vec4 fillColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform sampler2D uSampler;\nuniform bool isCircle;\nuniform bool hasColor;\nvoid main(void) {\nvec4 col \x3d fillColor;\nvec4 tcol;\nif (hasColor) {\ncol \x3d vColor;\n}\nif (isCircle) {\ntcol \x3d texture2D(uSampler, gl_PointCoord.st);\ncol *\x3d tcol;\nif (tcol.r \x3c 0.0) {\ndiscard;\n} else {\ngl_FragColor \x3d col;\n}\n} else {\ngl_FragColor \x3d col;\n}\n}',
            'fragment'
          )
        if (!f || !l) return (h = !1), c(), !1
        h = a.createProgram()
        a.attachShader(h, f)
        a.attachShader(h, l)
        a.linkProgram(h)
        if (!a.getProgramParameter(h, a.LINK_STATUS))
          return k.push(a.getProgramInfoLog(h)), c(), (h = !1)
        a.useProgram(h)
        a.bindAttribLocation(h, 0, 'aVertexPosition')
        m = b('uPMatrix')
        Q = b('pSize')
        n = b('fillColor')
        g = b('isBubble')
        A = b('bubbleSizeAbs')
        e = b('bubbleSizeByArea')
        I = b('uSampler')
        v = b('skipTranslation')
        F = b('isCircle')
        B = b('isInverted')
        p = b('plotHeight')
        return !0
      }
      function b(b, e) {
        a &&
          h &&
          ((b = N[b] = N[b] || a.getUniformLocation(h, b)), a.uniform1f(b, e))
      }
      var N = {},
        h,
        m,
        Q,
        n,
        g,
        A,
        e,
        v,
        F,
        B,
        p,
        k = [],
        I
      return a && !f()
        ? !1
        : {
            psUniform: function() {
              return Q
            },
            pUniform: function() {
              return m
            },
            fillColorUniform: function() {
              return n
            },
            setPlotHeight: function(b) {
              a && h && a.uniform1f(p, b)
            },
            setBubbleUniforms: function(c, d, f) {
              var l = c.options,
                u = Number.MAX_VALUE,
                w = -Number.MAX_VALUE
              a &&
                h &&
                'bubble' === c.type &&
                ((u = G(
                  l.zMin,
                  Math.min(
                    u,
                    Math.max(
                      d,
                      !1 === l.displayNegative
                        ? l.zThreshold
                        : -Number.MAX_VALUE
                    )
                  )
                )),
                (w = G(l.zMax, Math.max(w, f))),
                a.uniform1i(g, 1),
                a.uniform1i(F, 1),
                a.uniform1i(e, 'width' !== c.options.sizeBy),
                a.uniform1i(A, c.options.sizeByAbsoluteValue),
                b('bubbleZMin', u),
                b('bubbleZMax', w),
                b('bubbleZThreshold', c.options.zThreshold),
                b('bubbleMinSize', c.minPxSize),
                b('bubbleMaxSize', c.maxPxSize))
            },
            bind: function() {
              a && h && a.useProgram(h)
            },
            program: function() {
              return h
            },
            create: f,
            setUniform: b,
            setPMatrix: function(b) {
              a && h && a.uniformMatrix4fv(m, !1, b)
            },
            setColor: function(b) {
              a && h && a.uniform4f(n, b[0] / 255, b[1] / 255, b[2] / 255, b[3])
            },
            setPointSize: function(b) {
              a && h && a.uniform1f(Q, b)
            },
            setSkipTranslation: function(b) {
              a && h && a.uniform1i(v, !0 === b ? 1 : 0)
            },
            setTexture: function(b) {
              a && h && a.uniform1i(I, b)
            },
            setDrawAsCircle: function(b) {
              a && h && a.uniform1i(F, b ? 1 : 0)
            },
            reset: function() {
              a && h && (a.uniform1i(g, 0), a.uniform1i(F, 0))
            },
            setInverted: function(b) {
              a && h && a.uniform1i(B, b)
            },
            destroy: function() {
              a && h && (a.deleteProgram(h), (h = !1))
            }
          }
    }
    function R(a, c, d) {
      function f() {
        b && (a.deleteBuffer(b), (l = b = !1))
        k = 0
        h = d || 2
        n = []
      }
      var b = !1,
        l = !1,
        h = d || 2,
        m = !1,
        k = 0,
        n
      return {
        destroy: f,
        bind: function() {
          if (!b) return !1
          a.vertexAttribPointer(l, h, a.FLOAT, !1, 0, 0)
        },
        data: n,
        build: function(d, A, e) {
          var g
          n = d || []
          if (!((n && 0 !== n.length) || m)) return f(), !1
          h = e || h
          b && a.deleteBuffer(b)
          m || (g = new Float32Array(n))
          b = a.createBuffer()
          a.bindBuffer(a.ARRAY_BUFFER, b)
          a.bufferData(a.ARRAY_BUFFER, m || g, a.STATIC_DRAW)
          l = a.getAttribLocation(c.program(), A)
          a.enableVertexAttribArray(l)
          return !0
        },
        render: function(c, d, e) {
          var g = m ? m.length : n.length
          if (!b || !g) return !1
          if (!c || c > g || 0 > c) c = 0
          if (!d || d > g) d = g
          a.drawArrays(a[(e || 'points').toUpperCase()], c / h, (d - c) / h)
          return !0
        },
        allocate: function(a) {
          k = -1
          m = new Float32Array(4 * a)
        },
        push: function(a, b, c, d) {
          m && ((m[++k] = a), (m[++k] = b), (m[++k] = c), (m[++k] = d))
        }
      }
    }
    function qa(a) {
      function c(a) {
        var b, c
        return a.isSeriesBoosting
          ? ((b = !!a.options.stacking),
            (c = a.xData || a.options.xData || a.processedXData),
            (b = (b ? a.data : c || a.options.data).length),
            'treemap' === a.type
              ? (b *= 12)
              : 'heatmap' === a.type
              ? (b *= 6)
              : fa[a.type] && (b *= 2),
            b)
          : 0
      }
      function d() {
        e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT)
      }
      function f(a, b) {
        function c(a) {
          a &&
            (b.colorData.push(a[0]),
            b.colorData.push(a[1]),
            b.colorData.push(a[2]),
            b.colorData.push(a[3]))
        }
        function e(a, b, e, d, w) {
          c(w)
          q.usePreallocated
            ? A.push(a, b, e ? 1 : 0, d || 1)
            : (B.push(a), B.push(b), B.push(e ? 1 : 0), B.push(d || 1))
        }
        function d() {
          b.segments.length && (b.segments[b.segments.length - 1].to = B.length)
        }
        function w() {
          ;(b.segments.length &&
            b.segments[b.segments.length - 1].from === B.length) ||
            (d(), b.segments.push({ from: B.length }))
        }
        function g(a, b, d, w, g) {
          c(g)
          e(a + d, b)
          c(g)
          e(a, b)
          c(g)
          e(a, b + w)
          c(g)
          e(a, b + w)
          c(g)
          e(a + d, b + w)
          c(g)
          e(a + d, b)
        }
        function ha(a, c) {
          q.useGPUTranslations ||
            ((b.skipTranslation = !0),
            (a.x = y.toPixels(a.x, !0)),
            (a.y = z.toPixels(a.y, !0)))
          c ? (B = [a.x, a.y, 0, 2].concat(B)) : e(a.x, a.y, 0, 2)
        }
        var f = a.pointArrayMap && 'low,high' === a.pointArrayMap.join(','),
          h = a.chart,
          O = a.options,
          m = !!O.stacking,
          k = O.data,
          S = a.xAxis.getExtremes(),
          N = S.min,
          S = S.max,
          p = a.yAxis.getExtremes(),
          u = p.min,
          p = p.max,
          n = a.xData || O.xData || a.processedXData,
          F = a.yData || O.yData || a.processedYData,
          v = a.zData || O.zData || a.processedZData,
          z = a.yAxis,
          y = a.xAxis,
          E = a.chart.plotHeight,
          I = a.chart.plotWidth,
          G = !n || 0 === n.length,
          H = O.connectNulls,
          r = a.points || !1,
          Q = !1,
          J = !1,
          x,
          T,
          U,
          k = m ? a.data : n || k,
          n = { x: Number.MAX_VALUE, y: 0 },
          K = { x: -Number.MAX_VALUE, y: 0 },
          L = 0,
          M = !1,
          t,
          ca,
          D = -1,
          Z = !1,
          aa = !1,
          ba,
          W = 'undefined' === typeof h.index,
          X = !1,
          da = !1,
          V = fa[a.type],
          ea = !1,
          P = !0,
          ga = !0,
          R = O.threshold
        if (!(O.boostData && 0 < O.boostData.length)) {
          h.inverted && ((E = a.chart.plotWidth), (I = a.chart.plotHeight))
          a.closestPointRangePx = Number.MAX_VALUE
          w()
          if (r && 0 < r.length)
            (b.skipTranslation = !0),
              (b.drawMode = 'triangles'),
              r[0].node &&
                r[0].node.levelDynamic &&
                r.sort(function(a, b) {
                  if (a.node) {
                    if (a.node.levelDynamic > b.node.levelDynamic) return 1
                    if (a.node.levelDynamic < b.node.levelDynamic) return -1
                  }
                  return 0
                }),
              r.forEach(function(b) {
                var c = b.plotY,
                  e
                'undefined' === typeof c ||
                  isNaN(c) ||
                  null === b.y ||
                  ((c = b.shapeArgs),
                  (e = h.styledMode
                    ? b.series.colorAttribs(b)
                    : (e = b.series.pointAttribs(b))),
                  (b = e['stroke-width'] || 0),
                  (T = l.color(e.fill).rgba),
                  (T[0] /= 255),
                  (T[1] /= 255),
                  (T[2] /= 255),
                  'treemap' === a.type &&
                    ((b = b || 1),
                    (U = l.color(e.stroke).rgba),
                    (U[0] /= 255),
                    (U[1] /= 255),
                    (U[2] /= 255),
                    g(c.x, c.y, c.width, c.height, U),
                    (b /= 2)),
                  'heatmap' === a.type &&
                    h.inverted &&
                    ((c.x = y.len - c.x),
                    (c.y = z.len - c.y),
                    (c.width = -c.width),
                    (c.height = -c.height)),
                  g(c.x + b, c.y + b, c.width - 2 * b, c.height - 2 * b, T))
              })
          else {
            for (; D < k.length - 1; ) {
              x = k[++D]
              if (W) break
              G
                ? ((r = x[0]),
                  (t = x[1]),
                  k[D + 1] && (aa = k[D + 1][0]),
                  k[D - 1] && (Z = k[D - 1][0]),
                  3 <= x.length &&
                    ((ca = x[2]),
                    x[2] > b.zMax && (b.zMax = x[2]),
                    x[2] < b.zMin && (b.zMin = x[2])))
                : ((r = x),
                  (t = F[D]),
                  k[D + 1] && (aa = k[D + 1]),
                  k[D - 1] && (Z = k[D - 1]),
                  v &&
                    v.length &&
                    ((ca = v[D]),
                    v[D] > b.zMax && (b.zMax = v[D]),
                    v[D] < b.zMin && (b.zMin = v[D])))
              if (H || (null !== r && null !== t)) {
                if (
                  (aa && aa >= N && aa <= S && (X = !0),
                  Z && Z >= N && Z <= S && (da = !0),
                  f
                    ? (G && (t = x.slice(1, 3)), (ba = t[0]), (t = t[1]))
                    : m && ((r = x.x), (t = x.stackY), (ba = t - x.y)),
                  null !== u &&
                    'undefined' !== typeof u &&
                    null !== p &&
                    'undefined' !== typeof p &&
                    (P = t >= u && t <= p),
                  r > S && K.x < S && ((K.x = r), (K.y = t)),
                  r < N && n.x > N && ((n.x = r), (n.y = t)),
                  null !== t || !H)
                )
                  if (null !== t && (P || X || da)) {
                    if ((r >= N && r <= S && (ea = !0), ea || X || da)) {
                      if (
                        !q.useGPUTranslations &&
                        ((b.skipTranslation = !0),
                        (r = y.toPixels(r, !0)),
                        (t = z.toPixels(t, !0)),
                        t > E && (t = E),
                        r > I && 'points' === b.drawMode)
                      )
                        continue
                      if (V) {
                        x = ba
                        if (!1 === ba || 'undefined' === typeof ba)
                          x = 0 > t ? t : 0
                        f || m || (x = Math.max(R, u))
                        q.useGPUTranslations || (x = z.toPixels(x, !0))
                        e(r, x, 0, 0, !1)
                      }
                      b.hasMarkers &&
                        ea &&
                        !1 !== Q &&
                        (a.closestPointRangePx = Math.min(
                          a.closestPointRangePx,
                          Math.abs(r - Q)
                        ))
                      !q.useGPUTranslations &&
                      !q.usePreallocated &&
                      Q &&
                      1 > Math.abs(r - Q) &&
                      J &&
                      1 > Math.abs(t - J)
                        ? q.debug.showSkipSummary && ++L
                        : (O.step && !ga && e(r, J, 0, 2, !1),
                          e(r, t, 0, 'bubble' === a.type ? ca || 1 : 2, !1),
                          (Q = r),
                          (J = t),
                          (M = !0),
                          (ga = !1))
                    }
                  } else w()
              } else w()
            }
            q.debug.showSkipSummary && console.log('skipped points:', L)
            M ||
              !1 === H ||
              'line_strip' !== a.drawMode ||
              (n.x < Number.MAX_VALUE && ha(n, !0),
              K.x > -Number.MAX_VALUE && ha(K))
          }
          d()
        }
      }
      function b() {
        u = []
        y.data = B = []
        z = []
        A && A.destroy()
      }
      function k(a) {
        g &&
          (g.setUniform('xAxisTrans', a.transA),
          g.setUniform('xAxisMin', a.min),
          g.setUniform('xAxisMinPad', a.minPixelPadding),
          g.setUniform('xAxisPointRange', a.pointRange),
          g.setUniform('xAxisLen', a.len),
          g.setUniform('xAxisPos', a.pos),
          g.setUniform('xAxisCVSCoord', !a.horiz))
      }
      function h(a) {
        g &&
          (g.setUniform('yAxisTrans', a.transA),
          g.setUniform('yAxisMin', a.min),
          g.setUniform('yAxisMinPad', a.minPixelPadding),
          g.setUniform('yAxisPointRange', a.pointRange),
          g.setUniform('yAxisLen', a.len),
          g.setUniform('yAxisPos', a.pos),
          g.setUniform('yAxisCVSCoord', !a.horiz))
      }
      function m(a, b) {
        g.setUniform('hasThreshold', a)
        g.setUniform('translatedThreshold', b)
      }
      function p(c) {
        if (c) (v = c.chartWidth || 800), (F = c.chartHeight || 400)
        else return !1
        if (!(e && v && F && g)) return !1
        q.debug.timeRendering && console.time('gl rendering')
        e.canvas.width = v
        e.canvas.height = F
        g.bind()
        e.viewport(0, 0, v, F)
        g.setPMatrix([
          2 / v,
          0,
          0,
          0,
          0,
          -(2 / F),
          0,
          0,
          0,
          0,
          -2,
          0,
          -1,
          1,
          -1,
          1
        ])
        g.setPlotHeight(c.plotHeight)
        1 < q.lineWidth && !l.isMS && e.lineWidth(q.lineWidth)
        A.build(y.data, 'aVertexPosition', 4)
        A.bind()
        g.setInverted(c.inverted)
        u.forEach(function(a, b) {
          var d = a.series.options,
            f = d.marker,
            C
          C = 'undefined' !== typeof d.lineWidth ? d.lineWidth : 1
          var w = d.threshold,
            n = J(w),
            N = a.series.yAxis.getThreshold(w),
            w = G(
              d.marker ? d.marker.enabled : null,
              a.series.xAxis.isRadial ? !0 : null,
              a.series.closestPointRangePx >
                2 * ((d.marker ? d.marker.radius : 10) || 10)
            ),
            f = E[(f && f.symbol) || a.series.symbol] || E.circle
          if (
            !(
              0 === a.segments.length ||
              (a.segmentslength && a.segments[0].from === a.segments[0].to)
            )
          ) {
            f.isReady &&
              (e.bindTexture(e.TEXTURE_2D, f.handle), g.setTexture(f.handle))
            c.styledMode
              ? (f =
                  a.series.markerGroup && a.series.markerGroup.getStyle('fill'))
              : ((f =
                  (a.series.pointAttribs && a.series.pointAttribs().fill) ||
                  a.series.color),
                d.colorByPoint && (f = a.series.chart.options.colors[b]))
            a.series.fillOpacity &&
              d.fillOpacity &&
              (f = new ia(f).setOpacity(G(d.fillOpacity, 1)).get())
            f = l.color(f).rgba
            q.useAlpha || (f[3] = 1)
            'lines' === a.drawMode && q.useAlpha && 1 > f[3] && (f[3] /= 10)
            'add' === d.boostBlending
              ? (e.blendFunc(e.SRC_ALPHA, e.ONE), e.blendEquation(e.FUNC_ADD))
              : 'mult' === d.boostBlending
              ? e.blendFunc(e.DST_COLOR, e.ZERO)
              : 'darken' === d.boostBlending
              ? (e.blendFunc(e.ONE, e.ONE), e.blendEquation(e.FUNC_MIN))
              : e.blendFuncSeparate(
                  e.SRC_ALPHA,
                  e.ONE_MINUS_SRC_ALPHA,
                  e.ONE,
                  e.ONE_MINUS_SRC_ALPHA
                )
            g.reset()
            0 < a.colorData.length &&
              (g.setUniform('hasColor', 1),
              (b = R(e, g)),
              b.build(a.colorData, 'aColor', 4),
              b.bind())
            g.setColor(f)
            k(a.series.xAxis)
            h(a.series.yAxis)
            m(n, N)
            'points' === a.drawMode &&
              (d.marker && d.marker.radius
                ? g.setPointSize(2 * d.marker.radius)
                : g.setPointSize(1))
            g.setSkipTranslation(a.skipTranslation)
            'bubble' === a.series.type &&
              g.setBubbleUniforms(a.series, a.zMin, a.zMax)
            g.setDrawAsCircle(H[a.series.type] || !1)
            if (0 < C || 'line_strip' !== a.drawMode)
              for (C = 0; C < a.segments.length; C++)
                A.render(a.segments[C].from, a.segments[C].to, a.drawMode)
            if (a.hasMarkers && w)
              for (
                d.marker && d.marker.radius
                  ? g.setPointSize(2 * d.marker.radius)
                  : g.setPointSize(10),
                  g.setDrawAsCircle(!0),
                  C = 0;
                C < a.segments.length;
                C++
              )
                A.render(a.segments[C].from, a.segments[C].to, 'POINTS')
          }
        })
        q.debug.timeRendering && console.timeEnd('gl rendering')
        a && a()
        b()
      }
      function n(a) {
        d()
        if (a.renderer.forExport) return p(a)
        I
          ? p(a)
          : setTimeout(function() {
              n(a)
            }, 1)
      }
      var g = !1,
        A = !1,
        e = !1,
        v = 0,
        F = 0,
        B = !1,
        z = !1,
        y = {},
        I = !1,
        u = [],
        E = {},
        fa = { column: !0, columnrange: !0, bar: !0, area: !0, arearange: !0 },
        H = { scatter: !0, bubble: !0 },
        q = {
          pointSize: 1,
          lineWidth: 1,
          fillColor: '#AA00AA',
          useAlpha: !0,
          usePreallocated: !1,
          useGPUTranslations: !1,
          debug: {
            timeRendering: !1,
            timeSeriesProcessing: !1,
            timeSetup: !1,
            timeBufferCopy: !1,
            timeKDTree: !1,
            showSkipSummary: !1
          }
        }
      return (y = {
        allocateBufferForSingleSeries: function(a) {
          var b = 0
          q.usePreallocated && (a.isSeriesBoosting && (b = c(a)), A.allocate(b))
        },
        pushSeries: function(a) {
          0 < u.length &&
            u[u.length - 1].hasMarkers &&
            (u[u.length - 1].markerTo = z.length)
          q.debug.timeSeriesProcessing &&
            console.time('building ' + a.type + ' series')
          u.push({
            segments: [],
            markerFrom: z.length,
            colorData: [],
            series: a,
            zMin: Number.MAX_VALUE,
            zMax: -Number.MAX_VALUE,
            hasMarkers: a.options.marker ? !1 !== a.options.marker.enabled : !1,
            showMarkers: !0,
            drawMode:
              {
                area: 'lines',
                arearange: 'lines',
                areaspline: 'line_strip',
                column: 'lines',
                columnrange: 'lines',
                bar: 'lines',
                line: 'line_strip',
                scatter: 'points',
                heatmap: 'triangles',
                treemap: 'triangles',
                bubble: 'points'
              }[a.type] || 'line_strip'
          })
          f(a, u[u.length - 1])
          q.debug.timeSeriesProcessing &&
            console.timeEnd('building ' + a.type + ' series')
        },
        setSize: function(a, b) {
          ;(v === a && b === b) ||
            !g ||
            ((v = a),
            (F = b),
            g.bind(),
            g.setPMatrix([
              2 / v,
              0,
              0,
              0,
              0,
              -(2 / F),
              0,
              0,
              0,
              0,
              -2,
              0,
              -1,
              1,
              -1,
              1
            ]))
        },
        inited: function() {
          return I
        },
        setThreshold: m,
        init: function(a, c) {
          function d(a, b) {
            var c = {
                isReady: !1,
                texture: K.createElement('canvas'),
                handle: e.createTexture()
              },
              d = c.texture.getContext('2d')
            E[a] = c
            c.texture.width = 512
            c.texture.height = 512
            d.mozImageSmoothingEnabled = !1
            d.webkitImageSmoothingEnabled = !1
            d.msImageSmoothingEnabled = !1
            d.imageSmoothingEnabled = !1
            d.strokeStyle = 'rgba(255, 255, 255, 0)'
            d.fillStyle = '#FFF'
            b(d)
            try {
              e.activeTexture(e.TEXTURE0),
                e.bindTexture(e.TEXTURE_2D, c.handle),
                e.texImage2D(
                  e.TEXTURE_2D,
                  0,
                  e.RGBA,
                  e.RGBA,
                  e.UNSIGNED_BYTE,
                  c.texture
                ),
                e.texParameteri(
                  e.TEXTURE_2D,
                  e.TEXTURE_WRAP_S,
                  e.CLAMP_TO_EDGE
                ),
                e.texParameteri(
                  e.TEXTURE_2D,
                  e.TEXTURE_WRAP_T,
                  e.CLAMP_TO_EDGE
                ),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR),
                e.bindTexture(e.TEXTURE_2D, null),
                (c.isReady = !0)
            } catch (xa) {}
          }
          var f = 0,
            h = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d']
          I = !1
          if (!a) return !1
          for (
            q.debug.timeSetup && console.time('gl setup');
            f < h.length && !(e = a.getContext(h[f], {}));
            f++
          );
          if (e) c || b()
          else return !1
          e.enable(e.BLEND)
          e.blendFunc(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA)
          e.disable(e.DEPTH_TEST)
          e.depthFunc(e.LESS)
          g = pa(e)
          if (!g) return !1
          A = R(e, g)
          d('circle', function(a) {
            a.beginPath()
            a.arc(256, 256, 256, 0, 2 * Math.PI)
            a.stroke()
            a.fill()
          })
          d('square', function(a) {
            a.fillRect(0, 0, 512, 512)
          })
          d('diamond', function(a) {
            a.beginPath()
            a.moveTo(256, 0)
            a.lineTo(512, 256)
            a.lineTo(256, 512)
            a.lineTo(0, 256)
            a.lineTo(256, 0)
            a.fill()
          })
          d('triangle', function(a) {
            a.beginPath()
            a.moveTo(0, 512)
            a.lineTo(256, 0)
            a.lineTo(512, 512)
            a.lineTo(0, 512)
            a.fill()
          })
          d('triangle-down', function(a) {
            a.beginPath()
            a.moveTo(0, 0)
            a.lineTo(256, 512)
            a.lineTo(512, 0)
            a.lineTo(0, 0)
            a.fill()
          })
          I = !0
          q.debug.timeSetup && console.timeEnd('gl setup')
          return !0
        },
        render: n,
        settings: q,
        valid: function() {
          return !1 !== e
        },
        clear: d,
        flush: b,
        setXAxis: k,
        setYAxis: h,
        data: B,
        gl: function() {
          return e
        },
        allocateBuffer: function(a) {
          var b = 0
          q.usePreallocated &&
            (a.series.forEach(function(a) {
              a.isSeriesBoosting && (b += c(a))
            }),
            A.allocate(b))
        },
        destroy: function() {
          b()
          A.destroy()
          g.destroy()
          e &&
            (ra(E, function(a) {
              E[a].handle && e.deleteTexture(E[a].handle)
            }),
            (e.canvas.width = 1),
            (e.canvas.height = 1))
        },
        setOptions: function(a) {
          sa(!0, q, a)
        }
      })
    }
    function ja(a, c) {
      var d = a.chartWidth,
        f = a.chartHeight,
        b = a,
        k = a.seriesGroup || c.group,
        h = K.implementation.hasFeature(
          'www.http://w3.org/TR/SVG11/feature#Extensibility',
          '1.1'
        ),
        b = a.isChartSeriesBoosting() ? a : c,
        h = !1
      b.renderTarget ||
        ((b.canvas = ta),
        a.renderer.forExport || !h
          ? ((b.renderTarget = a.renderer
              .image('', 0, 0, d, f)
              .addClass('highcharts-boost-canvas')
              .add(k)),
            (b.boostClear = function() {
              b.renderTarget.attr({ href: '' })
            }),
            (b.boostCopy = function() {
              b.boostResizeTarget()
              b.renderTarget.attr({ href: b.canvas.toDataURL('image/png') })
            }))
          : ((b.renderTargetFo = a.renderer
              .createElement('foreignObject')
              .add(k)),
            (b.renderTarget = K.createElement('canvas')),
            (b.renderTargetCtx = b.renderTarget.getContext('2d')),
            b.renderTargetFo.element.appendChild(b.renderTarget),
            (b.boostClear = function() {
              b.renderTarget.width = b.canvas.width
              b.renderTarget.height = b.canvas.height
            }),
            (b.boostCopy = function() {
              b.renderTarget.width = b.canvas.width
              b.renderTarget.height = b.canvas.height
              b.renderTargetCtx.drawImage(b.canvas, 0, 0)
            })),
        (b.boostResizeTarget = function() {
          d = a.chartWidth
          f = a.chartHeight
          ;(b.renderTargetFo || b.renderTarget)
            .attr({ x: 0, y: 0, width: d, height: f })
            .css({
              pointerEvents: 'none',
              mixedBlendMode: 'normal',
              opacity: 1
            })
          b instanceof l.Chart && b.markerGroup.translate(a.plotLeft, a.plotTop)
        }),
        (b.boostClipRect = a.renderer.clipRect()),
        (b.renderTargetFo || b.renderTarget).clip(b.boostClipRect),
        b instanceof l.Chart &&
          ((b.markerGroup = b.renderer.g().add(k)),
          b.markerGroup.translate(c.xAxis.pos, c.yAxis.pos)))
      b.canvas.width = d
      b.canvas.height = f
      b.boostClipRect.attr(a.getBoostClipRect(b))
      b.boostResizeTarget()
      b.boostClear()
      b.ogl ||
        ((b.ogl = qa(function() {
          b.ogl.settings.debug.timeBufferCopy && console.time('buffer copy')
          b.boostCopy()
          b.ogl.settings.debug.timeBufferCopy && console.timeEnd('buffer copy')
        })),
        b.ogl.init(b.canvas) ||
          l.error('[highcharts boost] - unable to init WebGL renderer'),
        b.ogl.setOptions(a.options.boost || {}),
        b instanceof l.Chart && b.ogl.allocateBuffer(a))
      b.ogl.setSize(d, f)
      return b.ogl
    }
    function ka(a, c, d) {
      a &&
        c.renderTarget &&
        c.canvas &&
        !(d || c.chart).isChartSeriesBoosting() &&
        a.render(d || c.chart)
    }
    function la(a, c) {
      a &&
        c.renderTarget &&
        c.canvas &&
        !c.chart.isChartSeriesBoosting() &&
        a.allocateBufferForSingleSeries(c)
    }
    function ua(a) {
      var c = !0
      this.chart.options &&
        this.chart.options.boost &&
        (c =
          'undefined' === typeof this.chart.options.boost.enabled
            ? !0
            : this.chart.options.boost.enabled)
      if (!c || !this.isSeriesBoosting) return a.call(this)
      this.chart.isBoosting = !0
      if ((a = ja(this.chart, this))) la(a, this), a.pushSeries(this)
      ka(a, this)
    }
    var L = l.win,
      K = L.document,
      va = function() {},
      ma = l.Chart,
      ia = l.Color,
      p = l.Series,
      k = l.seriesTypes,
      ra = l.objectEach,
      na = l.extend,
      M = l.addEvent,
      wa = l.fireEvent,
      J = l.isNumber,
      sa = l.merge,
      G = l.pick,
      y = l.wrap,
      W = l.getOptions().plotOptions,
      ta = K.createElement('canvas'),
      X,
      oa = 'area arearange column columnrange bar line scatter heatmap bubble treemap'.split(
        ' '
      ),
      H = {}
    oa.forEach(function(a) {
      H[a] = 1
    })
    ia.prototype.names = {
      aliceblue: '#f0f8ff',
      antiquewhite: '#faebd7',
      aqua: '#00ffff',
      aquamarine: '#7fffd4',
      azure: '#f0ffff',
      beige: '#f5f5dc',
      bisque: '#ffe4c4',
      black: '#000000',
      blanchedalmond: '#ffebcd',
      blue: '#0000ff',
      blueviolet: '#8a2be2',
      brown: '#a52a2a',
      burlywood: '#deb887',
      cadetblue: '#5f9ea0',
      chartreuse: '#7fff00',
      chocolate: '#d2691e',
      coral: '#ff7f50',
      cornflowerblue: '#6495ed',
      cornsilk: '#fff8dc',
      crimson: '#dc143c',
      cyan: '#00ffff',
      darkblue: '#00008b',
      darkcyan: '#008b8b',
      darkgoldenrod: '#b8860b',
      darkgray: '#a9a9a9',
      darkgreen: '#006400',
      darkkhaki: '#bdb76b',
      darkmagenta: '#8b008b',
      darkolivegreen: '#556b2f',
      darkorange: '#ff8c00',
      darkorchid: '#9932cc',
      darkred: '#8b0000',
      darksalmon: '#e9967a',
      darkseagreen: '#8fbc8f',
      darkslateblue: '#483d8b',
      darkslategray: '#2f4f4f',
      darkturquoise: '#00ced1',
      darkviolet: '#9400d3',
      deeppink: '#ff1493',
      deepskyblue: '#00bfff',
      dimgray: '#696969',
      dodgerblue: '#1e90ff',
      feldspar: '#d19275',
      firebrick: '#b22222',
      floralwhite: '#fffaf0',
      forestgreen: '#228b22',
      fuchsia: '#ff00ff',
      gainsboro: '#dcdcdc',
      ghostwhite: '#f8f8ff',
      gold: '#ffd700',
      goldenrod: '#daa520',
      gray: '#808080',
      green: '#008000',
      greenyellow: '#adff2f',
      honeydew: '#f0fff0',
      hotpink: '#ff69b4',
      indianred: '#cd5c5c',
      indigo: '#4b0082',
      ivory: '#fffff0',
      khaki: '#f0e68c',
      lavender: '#e6e6fa',
      lavenderblush: '#fff0f5',
      lawngreen: '#7cfc00',
      lemonchiffon: '#fffacd',
      lightblue: '#add8e6',
      lightcoral: '#f08080',
      lightcyan: '#e0ffff',
      lightgoldenrodyellow: '#fafad2',
      lightgrey: '#d3d3d3',
      lightgreen: '#90ee90',
      lightpink: '#ffb6c1',
      lightsalmon: '#ffa07a',
      lightseagreen: '#20b2aa',
      lightskyblue: '#87cefa',
      lightslateblue: '#8470ff',
      lightslategray: '#778899',
      lightsteelblue: '#b0c4de',
      lightyellow: '#ffffe0',
      lime: '#00ff00',
      limegreen: '#32cd32',
      linen: '#faf0e6',
      magenta: '#ff00ff',
      maroon: '#800000',
      mediumaquamarine: '#66cdaa',
      mediumblue: '#0000cd',
      mediumorchid: '#ba55d3',
      mediumpurple: '#9370d8',
      mediumseagreen: '#3cb371',
      mediumslateblue: '#7b68ee',
      mediumspringgreen: '#00fa9a',
      mediumturquoise: '#48d1cc',
      mediumvioletred: '#c71585',
      midnightblue: '#191970',
      mintcream: '#f5fffa',
      mistyrose: '#ffe4e1',
      moccasin: '#ffe4b5',
      navajowhite: '#ffdead',
      navy: '#000080',
      oldlace: '#fdf5e6',
      olive: '#808000',
      olivedrab: '#6b8e23',
      orange: '#ffa500',
      orangered: '#ff4500',
      orchid: '#da70d6',
      palegoldenrod: '#eee8aa',
      palegreen: '#98fb98',
      paleturquoise: '#afeeee',
      palevioletred: '#d87093',
      papayawhip: '#ffefd5',
      peachpuff: '#ffdab9',
      peru: '#cd853f',
      pink: '#ffc0cb',
      plum: '#dda0dd',
      powderblue: '#b0e0e6',
      purple: '#800080',
      red: '#ff0000',
      rosybrown: '#bc8f8f',
      royalblue: '#4169e1',
      saddlebrown: '#8b4513',
      salmon: '#fa8072',
      sandybrown: '#f4a460',
      seagreen: '#2e8b57',
      seashell: '#fff5ee',
      sienna: '#a0522d',
      silver: '#c0c0c0',
      skyblue: '#87ceeb',
      slateblue: '#6a5acd',
      slategray: '#708090',
      snow: '#fffafa',
      springgreen: '#00ff7f',
      steelblue: '#4682b4',
      tan: '#d2b48c',
      teal: '#008080',
      thistle: '#d8bfd8',
      tomato: '#ff6347',
      turquoise: '#40e0d0',
      violet: '#ee82ee',
      violetred: '#d02090',
      wheat: '#f5deb3',
      white: '#ffffff',
      whitesmoke: '#f5f5f5',
      yellow: '#ffff00',
      yellowgreen: '#9acd32'
    }
    ma.prototype.isChartSeriesBoosting = function() {
      return (
        G(this.options.boost && this.options.boost.seriesThreshold, 50) <=
          this.series.length || V(this)
      )
    }
    ma.prototype.getBoostClipRect = function(a) {
      var c = {
        x: this.plotLeft,
        y: this.plotTop,
        width: this.plotWidth,
        height: this.plotHeight
      }
      a === this &&
        this.yAxis.forEach(function(a) {
          c.y = Math.min(a.pos, c.y)
          c.height = Math.max(a.pos - this.plotTop + a.len, c.height)
        }, this)
      return c
    }
    l.eachAsync = function(a, c, d, f, b, k) {
      b = b || 0
      f = f || 3e4
      for (var h = b + f, m = !0; m && b < h && b < a.length; )
        (m = c(a[b], b)), ++b
      m &&
        (b < a.length
          ? k
            ? l.eachAsync(a, c, d, f, b, k)
            : L.requestAnimationFrame
            ? L.requestAnimationFrame(function() {
                l.eachAsync(a, c, d, f, b)
              })
            : setTimeout(function() {
                l.eachAsync(a, c, d, f, b)
              })
          : d && d())
    }
    p.prototype.getPoint = function(a) {
      var c = a,
        d = this.xData || this.options.xData || this.processedXData || !1
      !a ||
        a instanceof this.pointClass ||
        ((c = new this.pointClass().init(
          this,
          this.options.data[a.i],
          d ? d[a.i] : void 0
        )),
        (c.category = c.x),
        (c.dist = a.dist),
        (c.distX = a.distX),
        (c.plotX = a.plotX),
        (c.plotY = a.plotY),
        (c.index = a.i))
      return c
    }
    y(p.prototype, 'searchPoint', function(a) {
      return this.getPoint(a.apply(this, [].slice.call(arguments, 1)))
    })
    M(p, 'destroy', function() {
      var a = this,
        c = a.chart
      c.markerGroup === a.markerGroup && (a.markerGroup = null)
      c.hoverPoints &&
        (c.hoverPoints = c.hoverPoints.filter(function(c) {
          return c.series === a
        }))
      c.hoverPoint && c.hoverPoint.series === a && (c.hoverPoint = null)
    })
    y(p.prototype, 'getExtremes', function(a) {
      if (!this.isSeriesBoosting || !this.hasExtremes || !this.hasExtremes())
        return a.apply(this, Array.prototype.slice.call(arguments, 1))
    })
    oa.forEach(function(a) {
      W[a] &&
        ((W[a].boostThreshold = 5e3),
        (W[a].boostData = []),
        (k[a].prototype.fillOpacity = !0))
    })
    ;[
      'translate',
      'generatePoints',
      'drawTracker',
      'drawPoints',
      'render'
    ].forEach(function(a) {
      function c(c) {
        var d =
          this.options.stacking && ('translate' === a || 'generatePoints' === a)
        if (
          !this.isSeriesBoosting ||
          d ||
          !P(this.chart) ||
          'heatmap' === this.type ||
          'treemap' === this.type ||
          !H[this.type] ||
          0 === this.options.boostThreshold
        )
          c.call(this)
        else if (this[a + 'Canvas']) this[a + 'Canvas']()
      }
      y(p.prototype, a, c)
      'translate' === a &&
        'column bar arearange columnrange heatmap treemap'
          .split(' ')
          .forEach(function(d) {
            k[d] && y(k[d].prototype, a, c)
          })
    })
    y(p.prototype, 'processData', function(a) {
      function c(a) {
        return (
          d.chart.isChartSeriesBoosting() ||
          (a ? a.length : 0) >= (d.options.boostThreshold || Number.MAX_VALUE)
        )
      }
      var d = this,
        f = this.options.data
      P(this.chart) && H[this.type]
        ? ((c(f) &&
            'heatmap' !== this.type &&
            'treemap' !== this.type &&
            !this.options.stacking &&
            this.hasExtremes &&
            this.hasExtremes(!0)) ||
            (a.apply(this, Array.prototype.slice.call(arguments, 1)),
            (f = this.processedXData)),
          (this.isSeriesBoosting = c(f))
            ? this.enterBoost()
            : this.exitBoost && this.exitBoost())
        : a.apply(this, Array.prototype.slice.call(arguments, 1))
    })
    M(p, 'hide', function() {
      this.canvas &&
        this.renderTarget &&
        (this.ogl && this.ogl.clear(), this.boostClear())
    })
    p.prototype.enterBoost = function() {
      this.alteredByBoost = []
      ;['allowDG', 'directTouch', 'stickyTracking'].forEach(function(a) {
        this.alteredByBoost.push({
          prop: a,
          val: this[a],
          own: this.hasOwnProperty(a)
        })
      }, this)
      this.directTouch = this.allowDG = !1
      this.stickyTracking = !0
      this.animate = null
      this.labelBySeries && (this.labelBySeries = this.labelBySeries.destroy())
    }
    p.prototype.exitBoost = function() {
      ;(this.alteredByBoost || []).forEach(function(a) {
        a.own ? (this[a.prop] = a.val) : delete this[a.prop]
      }, this)
      this.boostClear && this.boostClear()
    }
    p.prototype.hasExtremes = function(a) {
      var c = this.options,
        d = this.xAxis && this.xAxis.options,
        f = this.yAxis && this.yAxis.options
      return (
        c.data.length > (c.boostThreshold || Number.MAX_VALUE) &&
        J(f.min) &&
        J(f.max) &&
        (!a || (J(d.min) && J(d.max)))
      )
    }
    p.prototype.destroyGraphics = function() {
      var a = this,
        c = this.points,
        d,
        f
      if (c)
        for (f = 0; f < c.length; f += 1)
          (d = c[f]) && d.destroyElements && d.destroyElements()
      ;['graph', 'area', 'tracker'].forEach(function(b) {
        a[b] && (a[b] = a[b].destroy())
      })
    }
    l.hasWebGLSupport = function() {
      var a = 0,
        c,
        d = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'],
        f = !1
      if ('undefined' !== typeof L.WebGLRenderingContext)
        for (c = K.createElement('canvas'); a < d.length; a++)
          try {
            if (
              ((f = c.getContext(d[a])), 'undefined' !== typeof f && null !== f)
            )
              return !0
          } catch (b) {}
      return !1
    }
    l.hasWebGLSupport()
      ? (l.extend(p.prototype, {
          renderCanvas: function() {
            function a(a, b) {
              var c,
                d,
                f = !1,
                g = 'undefined' === typeof k.index,
                l = !0
              if (
                !g &&
                (J ? ((c = a[0]), (d = a[1])) : ((c = a), (d = n[b])),
                G
                  ? (J && (d = a.slice(1, 3)), (f = d[0]), (d = d[1]))
                  : H && ((c = a.x), (d = a.stackY), (f = d - a.y)),
                w || (l = d >= v && d <= z),
                null !== d && c >= A && c <= e && l)
              )
                if (((a = h.toPixels(c, !0)), K)) {
                  if (void 0 === Y || a === y) {
                    G || (f = d)
                    if (void 0 === C || d > M) (M = d), (C = b)
                    if (void 0 === Y || f < L) (L = f), (Y = b)
                  }
                  a !== y &&
                    (void 0 !== Y &&
                      ((d = m.toPixels(M, !0)),
                      (E = m.toPixels(L, !0)),
                      R(a, d, C),
                      E !== d && R(a, E, Y)),
                    (Y = C = void 0),
                    (y = a))
                } else (d = Math.ceil(m.toPixels(d, !0))), R(a, d, b)
              return !g
            }
            function c() {
              wa(d, 'renderedCanvas')
              delete d.buildKDTree
              d.buildKDTree()
              P.debug.timeKDTree && console.timeEnd('kd tree building')
            }
            var d = this,
              f = d.options || {},
              b = !1,
              k = d.chart,
              h = this.xAxis,
              m = this.yAxis,
              p = f.xData || d.processedXData,
              n = f.yData || d.processedYData,
              g = f.data,
              b = h.getExtremes(),
              A = b.min,
              e = b.max,
              b = m.getExtremes(),
              v = b.min,
              z = b.max,
              B = {},
              y,
              K = !!d.sampling,
              I,
              u = !1 !== f.enableMouseTracking,
              E = m.getThreshold(f.threshold),
              G = d.pointArrayMap && 'low,high' === d.pointArrayMap.join(','),
              H = !!f.stacking,
              q = d.cropStart || 0,
              w = d.requireSorting,
              J = !p,
              L,
              M,
              Y,
              C,
              P,
              W = 'x' === f.findNearestPointBy,
              V = this.xData || this.options.xData || this.processedXData || !1,
              R = function(a, b, c) {
                a = Math.ceil(a)
                X = W ? a : a + ',' + b
                u &&
                  !B[X] &&
                  ((B[X] = !0),
                  k.inverted && ((a = h.len - a), (b = m.len - b)),
                  I.push({
                    x: V ? V[q + c] : !1,
                    clientX: a,
                    plotX: a,
                    plotY: b,
                    i: q + c
                  }))
              },
              b = ja(k, d)
            k.isBoosting = !0
            P = b.settings
            if (this.visible) {
              if (this.points || this.graph)
                (this.animate = null), this.destroyGraphics()
              k.isChartSeriesBoosting()
                ? ((this.markerGroup = k.markerGroup),
                  this.renderTarget &&
                    (this.renderTarget = this.renderTarget.destroy()))
                : (this.markerGroup = d.plotGroup(
                    'markerGroup',
                    'markers',
                    !0,
                    1,
                    k.seriesGroup
                  ))
              I = this.points = []
              d.buildKDTree = va
              b && (la(b, this), b.pushSeries(d), ka(b, this, k))
              k.renderer.forExport ||
                (P.debug.timeKDTree && console.time('kd tree building'),
                l.eachAsync(H ? d.data : p || g, a, c))
            }
          }
        }),
        ['heatmap', 'treemap'].forEach(function(a) {
          k[a] && y(k[a].prototype, 'drawPoints', ua)
        }),
        k.bubble &&
          (delete k.bubble.prototype.buildKDTree,
          y(k.bubble.prototype, 'markerAttribs', function(a) {
            return this.isSeriesBoosting
              ? !1
              : a.apply(this, [].slice.call(arguments, 1))
          })),
        (k.scatter.prototype.fill = !0),
        na(k.area.prototype, { fill: !0, fillOpacity: !0, sampling: !0 }),
        na(k.column.prototype, { fill: !0, sampling: !0 }),
        l.Chart.prototype.callbacks.push(function(a) {
          M(a, 'predraw', function() {
            a.boostForceChartBoost = void 0
            a.boostForceChartBoost = V(a)
            a.isBoosting = !1
            !a.isChartSeriesBoosting() && a.didBoost && (a.didBoost = !1)
            a.boostClear && a.boostClear()
            a.canvas &&
              a.ogl &&
              a.isChartSeriesBoosting() &&
              ((a.didBoost = !0), a.ogl.allocateBuffer(a))
            a.markerGroup &&
              a.xAxis &&
              0 < a.xAxis.length &&
              a.yAxis &&
              0 < a.yAxis.length &&
              a.markerGroup.translate(a.xAxis[0].pos, a.yAxis[0].pos)
          })
          M(a, 'render', function() {
            a.ogl && a.isChartSeriesBoosting() && a.ogl.render(a)
          })
        }))
      : 'undefined' !== typeof l.initCanvasBoost
      ? l.initCanvasBoost()
      : l.error(26)
  })(z)
})
//# sourceMappingURL=boost.js.map
