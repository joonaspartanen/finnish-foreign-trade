import React, { useEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow'

const Map = ({ imports, exports, flow, year }) => {

  let values = null

  flow === 'exports'
    ? values = exports
    : values = imports

  useEffect(() => {

    am4core.useTheme(am4themes_animated)

    var map = am4core.create('mapdiv', am4maps.MapChart)

    map.geodata = am4geodata_worldLow
    //map.projection = new am4maps.projections.Miller()
    map.projection = new am4maps.projections.Orthographic()
    map.panBehavior = 'rotateLongLat'
    map.zoomControl = new am4maps.ZoomControl()
    map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color('#eee')
    map.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1

    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries())

    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: map.colors.getIndex(2).brighten(0.8),
      max: map.colors.getIndex(2).brighten(-0.6)
    })

    polygonSeries.useGeodata = true
    polygonSeries.exclude = ['AQ']

    polygonSeries.data = values

    let polygonTemplate = polygonSeries.mapPolygons.template
    polygonTemplate.tooltipText = `{name}: {euros} €`
    polygonTemplate.nonScalingStroke = true
    polygonTemplate.strokeWidth = 0.5

    let hs = polygonTemplate.states.create('hover')
    hs.properties.fill = am4core.color('#800000')

    return (() => {
      if (map) {
        map.dispose()
      }
    })

    /* let heatLegend = map.createChild(am4maps.HeatLegend)
    heatLegend.series = polygonSeries
    heatLegend.width = am4core.percent(100)
    heatLegend.orientation = 'vertical' */

  }, [values])

  return (
    <div>
      <div id='mapdiv' style={{ width: '100%', height: '90vh' }}></div>
    </div>
  )
}

export default Map