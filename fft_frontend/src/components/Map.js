import React, { useEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4themes_dark from '@amcharts/amcharts4/themes/dark'
//import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow'

const Map = ({ imports, exports, flow, year }) => {

  let values = null
  let color = '#5E5B78'
  let hoverColor = '#4B0000'

  if (flow === 'exports') {
    values = exports
    color = '#5E5B78'
    hoverColor = '#4B0000'
  } else {
    values = imports
    color = '#C17D80'
    hoverColor = '#161331'
  }

  useEffect(() => {

    //am4core.useTheme(am4themes_animated)
    am4core.useTheme(am4themes_dark)

    let map = am4core.create('mapdiv', am4maps.MapChart)

    map.geodata = am4geodata_worldLow
    map.projection = new am4maps.projections.Mercator()
    //map.projection = new am4maps.projections.Orthographic()
    //map.panBehavior = 'rotateLongLat'
    map.zoomControl = new am4maps.ZoomControl()
    map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color('#EEE')
    map.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1
    map.chartContainer.wheelable = false

    //let graticuleSeries = map.series.push(new am4maps.GraticuleSeries())
    //graticuleSeries.mapLines.template.line.stroke = am4core.color('#67b7dc')
    //graticuleSeries.mapLines.template.line.strokeOpacity = 0.2
    //graticuleSeries.fitExtent = false

    // The initial zoom level must be higher if using portrait view.
    if (window.innerHeight > window.innerWidth) {
      map.homeZoomLevel = 5
      map.minZoomLevel = 5
    } else {
      map.homeZoomLevel = 2
      map.minZoomLevel = 2
    }

    map.homeGeoPoint = {
      latitude: 50,
      longitude: 11
    }

    map.maxPanOut = 0

    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries())

    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color(color).brighten(1.4),
      max: am4core.color(color).brighten(-0.6)

      //      min: map.colors.getIndex(colorIndex).brighten(2.0),
      //      max: map.colors.getIndex(colorIndex).brighten(-0.8)
    })

    polygonSeries.useGeodata = true
    polygonSeries.exclude = ['AQ', 'SJ']

    polygonSeries.data = values

    let polygonTemplate = polygonSeries.mapPolygons.template
    polygonTemplate.tooltipText = `{name}: {euros} €`
    polygonTemplate.nonScalingStroke = true
    polygonTemplate.strokeWidth = 0.5

    map.events.on("ready", () => {
      let finland = polygonSeries.getPolygonById("FI")
      finland.fill = am4core.color('#FFF')
      finland.tooltipText = ''
    })

    let hs = polygonTemplate.states.create('hover')
    hs.properties.fill = am4core.color(hoverColor)

    return (() => {
      if (map) {
        map.dispose()
      }
    })
  }, [values, color, hoverColor])

  return (
    <div id='mapdiv' style={{ width: '100%', height: '100%', overflow: 'hidden' }}></div>
  )
}

export default Map