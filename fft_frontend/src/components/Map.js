import React, { useEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
//import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow'

const Map = ({ imports, exports, flow, year }) => {

  let values = null
  let colorIndex = 0
  let hoverColor = null

  if (flow === 'exports') {
    values = exports
    colorIndex = 0
    hoverColor = '#800000'
  } else {
    values = imports
    colorIndex = 6
    hoverColor = '#800000'
  }

  useEffect(() => {

    //am4core.useTheme(am4themes_animated)

    let map = am4core.create('mapdiv', am4maps.MapChart)

    map.geodata = am4geodata_worldLow
    //map.projection = new am4maps.projections.Miller()
    map.projection = new am4maps.projections.Orthographic()
    map.panBehavior = 'rotateLongLat'
    map.zoomControl = new am4maps.ZoomControl()
    map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color('#EEE')
    map.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1

    let graticuleSeries = map.series.push(new am4maps.GraticuleSeries())
    graticuleSeries.mapLines.template.line.stroke = am4core.color('#67b7dc')
    graticuleSeries.mapLines.template.line.strokeOpacity = 0.2
    graticuleSeries.fitExtent = false

    map.homeZoomLevel = 1

    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries())

    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: map.colors.getIndex(colorIndex).brighten(0.8),
      max: map.colors.getIndex(colorIndex).brighten(-0.6)
    })

    console.log(colorIndex)
    polygonSeries.useGeodata = true
    polygonSeries.exclude = ['AQ']

    polygonSeries.data = values

    let polygonTemplate = polygonSeries.mapPolygons.template
    polygonTemplate.tooltipText = `{name}: {euros} €`
    polygonTemplate.nonScalingStroke = true
    polygonTemplate.strokeWidth = 0.5

    let hs = polygonTemplate.states.create('hover')
    hs.properties.fill = am4core.color(hoverColor)

    return (() => {
      if (map) {
        map.dispose()
      }
    })

    /* let heatLegend = map.createChild(am4maps.HeatLegend)
    heatLegend.series = polygonSeries
    heatLegend.width = am4core.percent(100)
    heatLegend.orientation = 'vertical' */

  }, [values, colorIndex, hoverColor])

  return (
    <div>
      <div id='mapdiv' style={{ width: '100%', height: '80vh' }}></div>
    </div>
  )
}

export default Map