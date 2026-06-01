import { useEffect, useRef } from 'react'
import { timeline } from '../data'

export default function Journey() {
  const chartRef = useRef(null)
  const rootRef  = useRef(null)

  useEffect(() => {
    let root
    import('@amcharts/amcharts5').then(am5 => {
      import('@amcharts/amcharts5/xy').then(am5xy => {
        import('@amcharts/amcharts5/themes/Animated').then(am5themes => {

          if (rootRef.current) rootRef.current.dispose()

          root = am5.Root.new('timeline-chart')
          root.setThemes([am5themes.default.new(root)])
          rootRef.current = root

          const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
              panX: false, panY: false,
              wheelX: 'none', wheelY: 'none',
              layout: root.verticalLayout,
              paddingLeft: 0, paddingRight: 0,
            })
          )

          const yAxis = chart.yAxes.push(
            am5xy.CategoryAxis.new(root, {
              categoryField: 'title',
              renderer: am5xy.AxisRendererY.new(root, {
                minGridDistance: 20,
                inversed: false,
              }),
            })
          )

          yAxis.get('renderer').labels.template.setAll({
            fontFamily: 'DM Sans',
            fontSize: 12,
            fill: am5.color('#8c7a62'),
            maxWidth: 160,
            oversizedBehavior: 'wrap',
          })
          yAxis.get('renderer').grid.template.setAll({ stroke: am5.color('#ede8e0'), strokeWidth: 1 })

          const xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
              baseInterval: { timeUnit: 'month', count: 1 },
              renderer: am5xy.AxisRendererX.new(root, {}),
            })
          )
          xAxis.get('renderer').labels.template.setAll({
            fontFamily: 'DM Sans', fontSize: 11, fill: am5.color('#b5a48e'),
          })
          xAxis.get('renderer').grid.template.setAll({ stroke: am5.color('#ede8e0') })

          const series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
              xAxis, yAxis,
              valueXField: 'end',
              openValueXField: 'start',
              categoryYField: 'title',
              sequencedInterpolation: true,
            })
          )

          series.columns.template.setAll({
            height: am5.percent(60),
            cornerRadiusBL: 2, cornerRadiusBR: 2,
            cornerRadiusTL: 2, cornerRadiusTR: 2,
            strokeOpacity: 0,
            templateField: 'columnSettings',
            tooltipText: '{org}\n{location}',
          })

          series.columns.template.adapters.add('fill', (fill, target) => {
            return target.dataItem?.dataContext?.color
              ? am5.color(target.dataItem.dataContext.color)
              : fill
          })

          const data = timeline.map(t => ({
            title: t.title,
            org: t.org,
            location: t.location,
            start: new Date(t.date).getTime(),
            end: new Date(t.endDate || '2026-06').getTime(),
            color: t.color,
            columnSettings: { fill: am5.color(t.color), strokeOpacity: 0 },
          }))

          yAxis.data.setAll(data)
          series.data.setAll(data)
          series.appear(1000)
          chart.appear(1000, 100)
        })
      })
    })

    return () => { if (rootRef.current) { rootRef.current.dispose(); rootRef.current = null } }
  }, [])

  return (
    <section id="journey" className="py-28 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">

        <div className="reveal mb-14">
          <p className="section-label">Journey</p>
          <h2 className="section-title">How I got <em>here.</em></h2>
          <div className="section-rule" />
        </div>

        {/* amCharts Gantt */}
        <div className="reveal mb-16">
          <div id="timeline-chart" />
        </div>

        {/* Card detail view */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {timeline.map((t, i) => (
            <div
              key={i}
              className="reveal bg-white border border-black/[0.07] p-6 rounded-sm hover:border-black/20 transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: i * 0.06 + 's' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="w-2 h-2 rounded-full mb-3" style={{ background: t.color }} />
                  <h3 className="font-serif text-lg text-ink leading-tight">{t.title}</h3>
                  <p className="text-terracotta text-xs font-medium mt-0.5">{t.org}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="text-xs text-muted">{t.date.replace('-', ' /')} →</div>
                  <div className="text-xs text-muted">{t.endDate ? t.endDate.replace('-', ' /') : 'Present'}</div>
                </div>
              </div>
              <p className="text-xs text-muted mb-3 flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1C3.79 1 2 2.79 2 5c0 3 4 7 4 7s4-4 4-7c0-2.21-1.79-4-4-4zm0 5.5C5.17 6.5 4.5 5.83 4.5 5S5.17 3.5 6 3.5 7.5 4.17 7.5 5 6.83 6.5 6 6.5z" fill="currentColor"/></svg>
                {t.location}
              </p>
              <ul className="space-y-1.5">
                {t.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2 text-xs text-muted leading-relaxed">
                    <span className="text-terracotta shrink-0 mt-0.5">·</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
