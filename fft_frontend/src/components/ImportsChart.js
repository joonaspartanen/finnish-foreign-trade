import React, { useEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4themes_spiritedaway from '@amcharts/amcharts4/themes/spiritedaway'


const ImportsChart = ({ imports }) => {

  useEffect(() => {

    am4core.useTheme(am4themes_animated)
    am4core.useTheme(am4themes_spiritedaway)

    let chart = am4core.create('imports-chart-div', am4charts.PieChart)
    chart.data = imports
    let pieSeries = chart.series.push(new am4charts.PieSeries())
    pieSeries.dataFields.value = 'euros'
    pieSeries.dataFields.category = 'class'
    pieSeries.labels.template.disabled = true
    pieSeries.ticks.template.disabled = true

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'bottom'

    chart.innerRadius = am4core.percent(60)

    var label = pieSeries.createChild(am4core.Label)

    label.text = 'Imports to Finland'
    label.horizontalCenter = 'middle'
    label.verticalCenter = 'middle'
    label.fontSize = 15

    return (() => {
      if (chart) {
        chart.dispose()
      }
    })

  }, [imports])

  return (
    <div>
      <div id='imports-chart-div' style={{ width: '100%', height: '100vh' }}></div>
    </div >
  )

}

export default ImportsChart
