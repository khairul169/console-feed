function r(r, e) {
  ;(null == e || e > r.length) && (e = r.length)
  for (var t = 0, n = Array(e); t < e; t++) n[t] = r[t]
  return n
}
function e(r, e) {
  if (!(r instanceof e)) throw TypeError('Cannot call a class as a function')
}
function t(r, e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(r, n.key, n)
  }
}
function n(r, e, n) {
  return e && t(r.prototype, e), n && t(r, n), r
}
function a(r, e, t) {
  return (
    e in r
      ? Object.defineProperty(r, e, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (r[e] = t),
    r
  )
}
function i(r, e) {
  return null != e && 'undefined' != typeof Symbol && e[Symbol.hasInstance]
    ? !!e[Symbol.hasInstance](r)
    : r instanceof e
}
function o(r) {
  for (var e = 1; e < arguments.length; e++) {
    var t = null != arguments[e] ? arguments[e] : {},
      n = Object.keys(t)
    'function' == typeof Object.getOwnPropertySymbols &&
      (n = n.concat(
        Object.getOwnPropertySymbols(t).filter(function (r) {
          return Object.getOwnPropertyDescriptor(t, r).enumerable
        })
      )),
      n.forEach(function (e) {
        a(r, e, t[e])
      })
  }
  return r
}
function u(r, e) {
  return (
    (e = null != e ? e : {}),
    Object.getOwnPropertyDescriptors
      ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(e))
      : (function (r, e) {
          var t = Object.keys(r)
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(r)
            t.push.apply(t, n)
          }
          return t
        })(Object(e)).forEach(function (t) {
          Object.defineProperty(r, t, Object.getOwnPropertyDescriptor(e, t))
        }),
    r
  )
}
function l(e) {
  return (
    (function (e) {
      if (Array.isArray(e)) return r(e)
    })(e) ||
    (function (r) {
      if (
        ('undefined' != typeof Symbol && null != r[Symbol.iterator]) ||
        null != r['@@iterator']
      )
        return Array.from(r)
    })(e) ||
    (function (e, t) {
      if (e) {
        if ('string' == typeof e) return r(e, void 0)
        var n = Object.prototype.toString.call(e).slice(8, -1)
        if (
          ('Object' === n && e.constructor && (n = e.constructor.name),
          'Map' === n || 'Set' === n)
        )
          return Array.from(n)
        if (
          'Arguments' === n ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        )
          return r(e, void 0)
      }
    })(e) ||
    (function () {
      throw TypeError(
        'Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      )
    })()
  )
}
function c(r) {
  return r && 'undefined' != typeof Symbol && r.constructor === Symbol
    ? 'symbol'
    : typeof r
}
var f,
  s,
  d,
  y,
  h = { timings: {}, count: {} },
  m = function () {
    return 'undefined' != typeof performance && performance.now
      ? performance.now()
      : Date.now()
  },
  p = function () {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : h,
      e = arguments.length > 1 ? arguments[1] : void 0
    switch (e.type) {
      case 'COUNT':
        var t = r.count[e.name] || 0
        return u(o({}, r), { count: u(o({}, r.count), a({}, e.name, t + 1)) })
      case 'TIME_START':
        return u(o({}, r), {
          timings: u(o({}, r.timings), a({}, e.name, { start: m() })),
        })
      case 'TIME_END':
        var n = r.timings[e.name],
          i = m(),
          l = n.start
        return u(o({}, r), {
          timings: u(
            o({}, r.timings),
            a({}, e.name, u(o({}, n), { end: i, time: i - l }))
          ),
        })
      default:
        return r
    }
  },
  v = function (r) {
    s = p(s, r)
  }
function b(r) {
  for (
    var e = arguments.length, t = Array(e > 1 ? e - 1 : 0), n = 1;
    n < e;
    n++
  )
    t[n - 1] = arguments[n]
  return (
    !r &&
    (0 === t.length && t.push('console.assert'),
    { method: 'error', data: ['Assertion failed:'].concat(l(t)) })
  )
}
var g = function (r, e, t) {
  var n,
    a =
      t ||
      (n = function () {
        return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
      })() +
        n() +
        '-' +
        n() +
        '-' +
        n() +
        '-' +
        n() +
        '-' +
        n() +
        '-' +
        Date.now()
  switch (r) {
    case 'clear':
      return { method: r, id: a }
    case 'count':
      var i,
        c = 'string' == typeof e[0] ? e[0] : 'default'
      if (!c) return !1
      return u(
        o(
          {},
          (v({ type: 'COUNT', name: c }),
          (i = s.count[c]),
          { method: 'log', data: [''.concat(c, ': ').concat(i)] })
        ),
        { id: a }
      )
    case 'time':
    case 'timeEnd':
      var f = 'string' == typeof e[0] ? e[0] : 'default'
      if (!f) return !1
      if ('time' === r) return v({ type: 'TIME_START', name: f }), !1
      return u(
        o(
          {},
          (function (r) {
            var e,
              t = null === (e = s) || void 0 === e ? void 0 : e.timings[r]
            if (t && !t.end) {
              v({ type: 'TIME_END', name: r })
              var n = s.timings[r].time
              return {
                method: 'log',
                data: [''.concat(r, ': ').concat(n, 'ms')],
              }
            }
            return {
              method: 'warn',
              data: ["Timer '".concat(r, "' does not exist")],
            }
          })(f)
        ),
        { id: a }
      )
    case 'assert':
      if (0 !== e.length) {
        var d = b.apply(void 0, [e[0]].concat(l(e.slice(1))))
        if (d) return u(o({}, d), { id: a })
      }
      return !1
    case 'error':
      return {
        method: r,
        id: a,
        data: e.map(function (r) {
          try {
            return r.stack || r
          } catch (e) {
            return r
          }
        }),
      }
    default:
      return { method: r, id: a, data: e }
  }
}
;((f = d || (d = {}))[(f.infinity = 0)] = 'infinity'),
  (f[(f.minusInfinity = 1)] = 'minusInfinity'),
  (f[(f.minusZero = 2)] = 'minusZero')
var S = {
    type: 'Map',
    lookup: Map,
    shouldTransform: function (r, e) {
      return e && e.constructor && 'Map' === e.constructor.name
    },
    toSerializable: function (r) {
      var e = {}
      return (
        r.forEach(function (r, t) {
          e['object' == typeof t ? JSON.stringify(t) : t] = r
        }),
        {
          name: 'Map',
          body: e,
          proto: Object.getPrototypeOf(r).constructor.name,
        }
      )
    },
    fromSerializable: function (r) {
      var e = o({}, r.body)
      return (
        'string' == typeof r.proto && (e.constructor = { name: r.proto }), e
      )
    },
  },
  O = /^#*@(t|r)$/,
  T = '__console_feed_remaining__',
  w = (0, eval)('this'),
  k = 'function' == typeof ArrayBuffer,
  _ = 'function' == typeof Map,
  j = 'function' == typeof Set,
  A = [
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array',
  ],
  M = Array.prototype.slice,
  z = {
    serialize: function (r) {
      return JSON.stringify(r)
    },
    deserialize: function (r) {
      return JSON.parse(r)
    },
  },
  E = (function () {
    function r(t, n, a) {
      e(this, r),
        (this.references = t),
        (this.transforms = n),
        (this.transformsMap = this._makeTransformsMap()),
        (this.circularCandidates = []),
        (this.circularCandidatesDescrs = []),
        (this.circularRefCount = 0),
        (this.limit = null != a ? a : 1 / 0)
    }
    return (
      n(
        r,
        [
          {
            key: '_createCircularCandidate',
            value: function (r, e, t) {
              this.circularCandidates.push(r),
                this.circularCandidatesDescrs.push({
                  parent: e,
                  key: t,
                  refIdx: -1,
                })
            },
          },
          {
            key: '_applyTransform',
            value: function (r, e, t, n) {
              var a = Object.create(null),
                i = n.toSerializable(r)
              return (
                'object' == typeof i && this._createCircularCandidate(r, e, t),
                (a['@t'] = n.type),
                (a.data = this._handleValue(
                  function () {
                    return i
                  },
                  e,
                  t
                )),
                a
              )
            },
          },
          {
            key: '_handleArray',
            value: function (r) {
              for (
                var e = this,
                  t = function (t) {
                    n[t] = e._handleValue(
                      function () {
                        return r[t]
                      },
                      n,
                      t
                    )
                  },
                  n = [],
                  a = Math.min(r.length, this.limit),
                  i = r.length - a,
                  o = 0;
                o < a;
                o++
              )
                t(o)
              return (n[a] = T + i), n
            },
          },
          {
            key: '_handlePlainObject',
            value: function (r) {
              var e,
                t,
                n = this,
                a = function (e) {
                  if (Reflect.has(r, e)) {
                    if (o >= n.limit) return u++, 'continue'
                    var t = O.test(e) ? '#'.concat(e) : e
                    ;(i[t] = n._handleValue(
                      function () {
                        return r[e]
                      },
                      i,
                      t
                    )),
                      o++,
                      u++
                  }
                },
                i = Object.create(null),
                o = 0,
                u = 0
              for (var l in r) a(l)
              var c = u - o,
                f =
                  null == r
                    ? void 0
                    : null === (t = r.__proto__) || void 0 === t
                    ? void 0
                    : null === (e = t.constructor) || void 0 === e
                    ? void 0
                    : e.name
              return (
                f && 'Object' !== f && (i.constructor = { name: f }),
                c && (i[T] = c),
                i
              )
            },
          },
          {
            key: '_handleObject',
            value: function (r, e, t) {
              return (
                this._createCircularCandidate(r, e, t),
                Array.isArray(r)
                  ? this._handleArray(r)
                  : this._handlePlainObject(r)
              )
            },
          },
          {
            key: '_ensureCircularReference',
            value: function (e) {
              var t = this.circularCandidates.indexOf(e)
              if (t > -1) {
                var n = this.circularCandidatesDescrs[t]
                return (
                  -1 === n.refIdx &&
                    (n.refIdx = n.parent ? ++this.circularRefCount : 0),
                  r._createRefMark(n.refIdx)
                )
              }
              return null
            },
          },
          {
            key: '_handleValue',
            value: function (r, e, t) {
              try {
                var n = r(),
                  a = void 0 === n ? 'undefined' : c(n),
                  o = 'object' === a && null !== n
                if (o) {
                  var u = this._ensureCircularReference(n)
                  if (u) return u
                }
                var l = this._findTransform(a, n)
                if (l) return this._applyTransform(n, e, t, l)
                if (o) return this._handleObject(n, e, t)
                return n
              } catch (r) {
                try {
                  return this._handleValue(
                    function () {
                      return i(r, Error) ? r : Error(r)
                    },
                    e,
                    t
                  )
                } catch (r) {
                  return null
                }
              }
            },
          },
          {
            key: '_makeTransformsMap',
            value: function () {
              if (_) {
                var r = new Map()
                return (
                  this.transforms.forEach(function (e) {
                    e.lookup && r.set(e.lookup, e)
                  }),
                  r
                )
              }
            },
          },
          {
            key: '_findTransform',
            value: function (r, e) {
              if (_ && e && e.constructor) {
                var t = this.transformsMap.get(e.constructor)
                if (null == t ? void 0 : t.shouldTransform(r, e)) return t
              }
              var n = !0,
                a = !1,
                i = void 0
              try {
                for (
                  var o, u = this.transforms[Symbol.iterator]();
                  !(n = (o = u.next()).done);
                  n = !0
                ) {
                  var l = o.value
                  if (l.shouldTransform(r, e)) return l
                }
              } catch (r) {
                ;(a = !0), (i = r)
              } finally {
                try {
                  n || null == u.return || u.return()
                } finally {
                  if (a) throw i
                }
              }
            },
          },
          {
            key: 'transform',
            value: function () {
              var e = this,
                t = [
                  this._handleValue(
                    function () {
                      return e.references
                    },
                    null,
                    null
                  ),
                ],
                n = !0,
                a = !1,
                i = void 0
              try {
                for (
                  var o, u = this.circularCandidatesDescrs[Symbol.iterator]();
                  !(n = (o = u.next()).done);
                  n = !0
                ) {
                  var l = o.value
                  l.refIdx > 0 &&
                    ((t[l.refIdx] = l.parent[l.key]),
                    (l.parent[l.key] = r._createRefMark(l.refIdx)))
                }
              } catch (r) {
                ;(a = !0), (i = r)
              } finally {
                try {
                  n || null == u.return || u.return()
                } finally {
                  if (a) throw i
                }
              }
              return t
            },
          },
        ],
        [
          {
            key: '_createRefMark',
            value: function (r) {
              var e = Object.create(null)
              return (e['@r'] = r), e
            },
          },
        ]
      ),
      r
    )
  })(),
  C = (function () {
    function r(t, n) {
      e(this, r),
        (this.activeTransformsStack = []),
        (this.visitedRefs = Object.create(null)),
        (this.references = t),
        (this.transformMap = n)
    }
    return (
      n(r, [
        {
          key: '_handlePlainObject',
          value: function (r) {
            var e = Object.create(null)
            for (var t in ('constructor' in r &&
              (!r.constructor || 'string' != typeof r.constructor.name) &&
              (r.constructor = { name: 'Object' }),
            r))
              r.hasOwnProperty(t) &&
                (this._handleValue(r[t], r, t),
                O.test(t) && ((e[t.substring(1)] = r[t]), delete r[t]))
            for (var n in e) r[n] = e[n]
          },
        },
        {
          key: '_handleTransformedObject',
          value: function (r, e, t) {
            var n = r['@t'],
              a = this.transformMap[n]
            if (!a)
              throw Error('Can\'t find transform for "'.concat(n, '" type.'))
            this.activeTransformsStack.push(r),
              this._handleValue(r.data, r, 'data'),
              this.activeTransformsStack.pop(),
              (e[t] = a.fromSerializable(r.data))
          },
        },
        {
          key: '_handleCircularSelfRefDuringTransform',
          value: function (r, e, t) {
            var n = this.references
            Object.defineProperty(e, t, {
              val: void 0,
              configurable: !0,
              enumerable: !0,
              get: function () {
                return void 0 === this.val && (this.val = n[r]), this.val
              },
              set: function (r) {
                this.val = r
              },
            })
          },
        },
        {
          key: '_handleCircularRef',
          value: function (r, e, t) {
            this.activeTransformsStack.includes(this.references[r])
              ? this._handleCircularSelfRefDuringTransform(r, e, t)
              : (this.visitedRefs[r] ||
                  ((this.visitedRefs[r] = !0),
                  this._handleValue(this.references[r], this.references, r)),
                (e[t] = this.references[r]))
          },
        },
        {
          key: '_handleValue',
          value: function (r, e, t) {
            if ('object' == typeof r && null !== r) {
              var n = r['@r']
              if (void 0 !== n) this._handleCircularRef(n, e, t)
              else if (r['@t']) this._handleTransformedObject(r, e, t)
              else if (Array.isArray(r))
                for (var a = 0; a < r.length; a++) this._handleValue(r[a], r, a)
              else this._handlePlainObject(r)
            }
          },
        },
        {
          key: 'transform',
          value: function () {
            return (
              (this.visitedRefs[0] = !0),
              this._handleValue(this.references[0], this.references, 0),
              this.references[0]
            )
          },
        },
      ]),
      r
    )
  })(),
  I = [
    {
      type: '[[NaN]]',
      shouldTransform: function (r, e) {
        return 'number' === r && isNaN(e)
      },
      toSerializable: function () {
        return ''
      },
      fromSerializable: function () {
        return NaN
      },
    },
    {
      type: '[[undefined]]',
      shouldTransform: function (r) {
        return 'undefined' === r
      },
      toSerializable: function () {
        return ''
      },
      fromSerializable: function () {},
    },
    {
      type: '[[Date]]',
      lookup: Date,
      shouldTransform: function (r, e) {
        return i(e, Date)
      },
      toSerializable: function (r) {
        return r.getTime()
      },
      fromSerializable: function (r) {
        var e = new Date()
        return e.setTime(r), e
      },
    },
    {
      type: '[[RegExp]]',
      lookup: RegExp,
      shouldTransform: function (r, e) {
        return i(e, RegExp)
      },
      toSerializable: function (r) {
        var e = { src: r.source, flags: '' }
        return (
          r.global && (e.flags += 'g'),
          r.ignoreCase && (e.flags += 'i'),
          r.multiline && (e.flags += 'm'),
          e
        )
      },
      fromSerializable: function (r) {
        return new RegExp(r.src, r.flags)
      },
    },
    {
      type: '[[Error]]',
      lookup: Error,
      shouldTransform: function (r, e) {
        return i(e, Error)
      },
      toSerializable: function (r) {
        var e, t
        return (
          r.stack ||
            null === (e = (t = Error).captureStackTrace) ||
            void 0 === e ||
            e.call(t, r),
          { name: r.name, message: r.message, stack: r.stack }
        )
      },
      fromSerializable: function (r) {
        var e = new (w[r.name] || Error)(r.message)
        return (e.stack = r.stack), e
      },
    },
    {
      type: '[[ArrayBuffer]]',
      lookup: k && ArrayBuffer,
      shouldTransform: function (r, e) {
        return k && i(e, ArrayBuffer)
      },
      toSerializable: function (r) {
        var e = new Int8Array(r)
        return M.call(e)
      },
      fromSerializable: function (r) {
        if (k) {
          var e = new ArrayBuffer(r.length)
          return new Int8Array(e).set(r), e
        }
        return r
      },
    },
    {
      type: '[[TypedArray]]',
      shouldTransform: function (r, e) {
        if (k) return ArrayBuffer.isView(e) && !i(e, DataView)
        var t = !0,
          n = !1,
          a = void 0
        try {
          for (
            var o, u = A[Symbol.iterator]();
            !(t = (o = u.next()).done);
            t = !0
          ) {
            var l = o.value
            if ('function' == typeof w[l] && i(e, w[l])) return !0
          }
        } catch (r) {
          ;(n = !0), (a = r)
        } finally {
          try {
            t || null == u.return || u.return()
          } finally {
            if (n) throw a
          }
        }
        return !1
      },
      toSerializable: function (r) {
        return { ctorName: r.constructor.name, arr: M.call(r) }
      },
      fromSerializable: function (r) {
        return 'function' == typeof w[r.ctorName]
          ? new w[r.ctorName](r.arr)
          : r.arr
      },
    },
    {
      type: '[[Map]]',
      lookup: _ && Map,
      shouldTransform: function (r, e) {
        return _ && i(e, Map)
      },
      toSerializable: function (r) {
        var e = []
        return (
          r.forEach(function (r, t) {
            e.push(t), e.push(r)
          }),
          e
        )
      },
      fromSerializable: function (r) {
        if (_) {
          for (var e = new Map(), t = 0; t < r.length; t += 2)
            e.set(r[t], r[t + 1])
          return e
        }
        for (var n = [], a = 0; a < r.length; a += 2) n.push([r[t], r[t + 1]])
        return n
      },
    },
    {
      type: '[[Set]]',
      lookup: j && Set,
      shouldTransform: function (r, e) {
        return j && i(e, Set)
      },
      toSerializable: function (r) {
        var e = []
        return (
          r.forEach(function (r) {
            e.push(r)
          }),
          e
        )
      },
      fromSerializable: function (r) {
        if (j) {
          for (var e = new Set(), t = 0; t < r.length; t++) e.add(r[t])
          return e
        }
        return r
      },
    },
  ],
  x = (function () {
    function r(t) {
      e(this, r),
        (this.transforms = []),
        (this.transformsMap = Object.create(null)),
        (this.serializer = t || z),
        this.addTransforms(I)
    }
    return (
      n(r, [
        {
          key: 'addTransforms',
          value: function (r) {
            r = Array.isArray(r) ? r : [r]
            var e = !0,
              t = !1,
              n = void 0
            try {
              for (
                var a, i = r[Symbol.iterator]();
                !(e = (a = i.next()).done);
                e = !0
              ) {
                var o = a.value
                if (this.transformsMap[o.type])
                  throw Error(
                    'Transform with type "'.concat(
                      o.type,
                      '" was already added.'
                    )
                  )
                this.transforms.push(o), (this.transformsMap[o.type] = o)
              }
            } catch (r) {
              ;(t = !0), (n = r)
            } finally {
              try {
                e || null == i.return || i.return()
              } finally {
                if (t) throw n
              }
            }
            return this
          },
        },
        {
          key: 'removeTransforms',
          value: function (r) {
            r = Array.isArray(r) ? r : [r]
            var e = !0,
              t = !1,
              n = void 0
            try {
              for (
                var a, i = r[Symbol.iterator]();
                !(e = (a = i.next()).done);
                e = !0
              ) {
                var o = a.value,
                  u = this.transforms.indexOf(o)
                u > -1 && this.transforms.splice(u, 1),
                  delete this.transformsMap[o.type]
              }
            } catch (r) {
              ;(t = !0), (n = r)
            } finally {
              try {
                e || null == i.return || i.return()
              } finally {
                if (t) throw n
              }
            }
            return this
          },
        },
        {
          key: 'encode',
          value: function (r, e) {
            var t = new E(r, this.transforms, e).transform()
            return this.serializer.serialize(t)
          },
        },
        {
          key: 'decode',
          value: function (r) {
            return new C(
              this.serializer.deserialize(r),
              this.transformsMap
            ).transform()
          },
        },
      ]),
      r
    )
  })(),
  N = [
    {
      type: 'HTMLElement',
      shouldTransform: function (r, e) {
        return (
          e &&
          e.children &&
          'string' == typeof e.innerHTML &&
          'string' == typeof e.tagName
        )
      },
      toSerializable: function (r) {
        return {
          tagName: r.tagName.toLowerCase(),
          attributes: (function (r) {
            var e = {},
              t = !0,
              n = !1,
              a = void 0
            try {
              for (
                var i, o = r.attributes[Symbol.iterator]();
                !(t = (i = o.next()).done);
                t = !0
              ) {
                var u = i.value
                e[u.name] = u.value
              }
            } catch (r) {
              ;(n = !0), (a = r)
            } finally {
              try {
                t || null == o.return || o.return()
              } finally {
                if (n) throw a
              }
            }
            return e
          })(r),
          innerHTML: r.innerHTML,
        }
      },
      fromSerializable: function (r) {
        try {
          var e = (
            y || (y = document.implementation.createHTMLDocument('sandbox'))
          ).createElement(r.tagName)
          e.innerHTML = r.innerHTML
          var t = !0,
            n = !1,
            a = void 0
          try {
            for (
              var i, o = Object.keys(r.attributes)[Symbol.iterator]();
              !(t = (i = o.next()).done);
              t = !0
            ) {
              var u = i.value
              try {
                e.setAttribute(u, r.attributes[u])
              } catch (r) {}
            }
          } catch (r) {
            ;(n = !0), (a = r)
          } finally {
            try {
              t || null == o.return || o.return()
            } finally {
              if (n) throw a
            }
          }
          return e
        } catch (e) {
          return r
        }
      },
    },
    {
      type: 'Function',
      lookup: Function,
      shouldTransform: function (r, e) {
        return 'function' == typeof e
      },
      toSerializable: function (r) {
        var e = ''
        try {
          e = r.toString().substring(e.indexOf('{') + 1, e.lastIndexOf('}'))
        } catch (r) {}
        return {
          name: r.name,
          body: e,
          proto: Object.getPrototypeOf(r).constructor.name,
        }
      },
      fromSerializable: function (r) {
        try {
          var e = function () {}
          return (
            'string' == typeof r.name &&
              Object.defineProperty(e, 'name', { value: r.name, writable: !1 }),
            'string' == typeof r.body &&
              Object.defineProperty(e, 'body', { value: r.body, writable: !1 }),
            'string' == typeof r.proto && (e.constructor = { name: r.proto }),
            e
          )
        } catch (e) {
          return r
        }
      },
    },
    {
      type: 'Arithmetic',
      lookup: Number,
      shouldTransform: function (r, e) {
        return (
          'number' === r && (e === 1 / 0 || e === -1 / 0 || 1 / e == -1 / 0)
        )
      },
      toSerializable: function (r) {
        return r === 1 / 0 ? 0 : r === -1 / 0 ? 1 : 2
      },
      fromSerializable: function (r) {
        return 0 === r ? 1 / 0 : 1 === r ? -1 / 0 : 2 === r ? -0 : r
      },
    },
    S,
    {
      type: 'BigInt',
      shouldTransform: function (r, e) {
        return (void 0 === e ? 'undefined' : c(e)) === 'bigint'
      },
      toSerializable: function (r) {
        return ''.concat(r, 'n')
      },
      fromSerializable: function (r) {
        return BigInt(r.slice(0, -1))
      },
    },
  ],
  P = new x()
P.addTransforms(N),
  window.parent !== window &&
    [
      'log',
      'debug',
      'info',
      'warn',
      'error',
      'table',
      'clear',
      'time',
      'timeEnd',
      'count',
      'assert',
    ].forEach(function (r) {
      var e = console[r]
      console[r] = function () {
        for (var t = arguments.length, n = Array(t), a = 0; a < t; a++)
          n[a] = arguments[a]
        e.apply(void 0, l(n))
        var i = g(r, n)
        i &&
          parent.window.postMessage(
            { type: 'console', data: JSON.parse(P.encode(i, void 0)) },
            '*'
          )
      }
    })
