import React, { useEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow'

const Map = ({ values }) => {

  useEffect(() => {
    am4core.useTheme(am4themes_animated)

    const map = am4core.create("chartdiv", am4maps.MapChart)

    map.geodata = am4geodata_worldLow
    map.projection = new am4maps.projections.Miller()

    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries())

    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: map.colors.getIndex(1).brighten(2),
      max: map.colors.getIndex(1).brighten(-2)
    })

    polygonSeries.useGeodata = true

    polygonSeries.data = values

    let polygonTemplate = polygonSeries.mapPolygons.template
    polygonTemplate.tooltipText = "{name}: {value}"
    polygonTemplate.nonScalingStroke = true
    polygonTemplate.strokeWidth = 0.5

    let hs = polygonTemplate.states.create("hover")
    hs.properties.fill = am4core.color("#3c5bdc")
  }, [values])


  return (
    <div>
      <div id="chartdiv" style={{ width: "100%", height: "80vw" }}></div>
    </div>
  )
}

export default Map