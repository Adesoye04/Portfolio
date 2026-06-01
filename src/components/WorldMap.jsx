import { useEffect, useRef } from 'react'

const locations = [
  { id: 'nigeria',       title: 'Lagos, Nigeria',         lat:  6.5244, lon:  3.3792, color: '#c8824f', desc: 'Founded Techvantage · Stop the Spread · Wakanow PM Intern' },
  { id: 'virginia',      title: 'Virginia, USA',           lat: 37.4316, lon: -78.6569, color: '#9e4a2e', desc: 'Data Engineer Intern @ Muzedata' },
  { id: 'prince-george', title: 'Prince George, BC',       lat: 53.9171, lon:-122.7497, color: '#b5603a', desc: 'UNBC · CTLT Research Lead · HRI Lab · Home base' },
  { id: 'brighton',      title: 'Brighton, UK',            lat: 50.8225, lon: -0.1372,  color: '#6b8c72', desc: 'ACM IDC 2026 · R&D Challenge Finalist · Presenting June 2026' },
]

export default function WorldMap() {
  const rootRef = useRef(null)

  useEffect(() => {
    let root
    Promise.all([
      import('@amcharts/amcharts5'),
      import('@amcharts/amcharts5/map'),
      import('@amcharts/amcharts5-geodata/worldLow'),
      import('@amcharts/amcharts5/themes/Animated'),
    ]).then(([am5, am5map, geodata, am5themes]) => {
      if (rootRef.current) return

      root = am5.Root.new('world-map-chart')
      root.setThemes([am5themes.default.new(root)])
      rootRef.current = root

      const chart = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: 'rotateX',
          projection: am5map.geoNaturalEarth1(),
          paddingBottom: 0,
          paddingTop: 0,
        })
      )

      // Land polygons
      const polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: geodata.default,
          exclude: ['AQ'],
        })
      )
      polygonSeries.mapPolygons.template.setAll({
        fill: am5.color('#ede8e0'),
        stroke: am5.color('#faf8f4'),
        strokeWidth: 0.5,
      })
      polygonSeries.mapPolygons.template.states.create('hover', {
        fill: am5.color('#d4b896'),
      })

      // Point series
      const pointSeries = chart.series.push(
        am5map.MapPointSeries.new(root, {})
      )

      pointSeries.bullets.push((root, series, dataItem) => {
        const container = am5.Container.new(root, {})

        // Pulse ring
        const ring = container.children.push(am5.Circle.new(root, {
          radius: 14, fill: am5.color(dataItem.dataContext.color), fillOpacity: 0.15,
          stroke: am5.color(dataItem.dataContext.color), strokeOpacity: 0.4, strokeWidth: 1,
        }))
        ring.animate({ key: 'radius', from: 6, to: 22, duration: 1800, loops: Infinity, easing: am5.ease.out(am5.ease.cubic) })
        ring.animate({ key: 'opacity', from: 0.5, to: 0, duration: 1800, loops: Infinity, easing: am5.ease.out(am5.ease.cubic) })

        // Dot
        container.children.push(am5.Circle.new(root, {
          radius: 6, fill: am5.color(dataItem.dataContext.color),
          stroke: am5.color('#faf8f4'), strokeWidth: 1.5,
          tooltipText: '{title}\n{desc}',
          showTooltipOn: 'hover',
          cursorOverStyle: 'pointer',
        }))

        return am5.Bullet.new(root, { sprite: container })
      })

      pointSeries.data.setAll(locations.map(l => ({
        geometry: { type: 'Point', coordinates: [l.lon, l.lat] },
        title: l.title, desc: l.desc, color: l.color,
      })))

      chart.appear(1000, 100)
    })

    return () => { if (rootRef.current) { rootRef.current.dispose(); rootRef.current = null } }
  }, [])

  return (
    <section className="py-28 px-8 md:px-16 bg-bg2">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-10">
          <p className="section-label">Global Footprint</p>
          <h2 className="section-title">Where my work has <em>reached.</em></h2>
          <div className="section-rule" />
        </div>

        <div className="reveal mb-8">
          <div id="world-map-chart" className="rounded-sm border border-black/[0.07] overflow-hidden" />
        </div>

        {/* Location cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger reveal">
          {locations.map(l => (
            <div key={l.id} className="bg-white border border-black/[0.07] p-4 rounded-sm hover:border-black/20 transition-all duration-300 hover:-translate-y-1">
              <div className="w-2 h-2 rounded-full mb-3" style={{ background: l.color }} />
              <div className="font-medium text-sm text-ink mb-1">{l.title}</div>
              <div className="text-xs text-muted leading-relaxed">{l.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
