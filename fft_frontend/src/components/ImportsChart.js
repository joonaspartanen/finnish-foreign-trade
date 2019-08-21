import React, { useEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4plugins_sliceGrouper from '@amcharts/amcharts4/plugins/sliceGrouper'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4themes_dark from '@amcharts/amcharts4/themes/dark'

const ImportsChart = ({ imports }) => {

  useEffect(() => {

    am4core.useTheme(am4themes_animated)
    am4core.useTheme(am4themes_dark)

    let chart = am4core.create('imports-chart-div', am4charts.PieChart)
    chart.data = imports

   /* let title = chart.titles.create()
    title.text = 'Imports to Finland'
    title.fontSize = 25 */

    let pieSeries = chart.series.push(new am4charts.PieSeries())
    pieSeries.dataFields.value = 'euros'
    pieSeries.dataFields.category = 'class'
    pieSeries.labels.template.disabled = true
    pieSeries.ticks.template.disabled = true

    let grouper = pieSeries.plugins.push(new am4plugins_sliceGrouper.SliceGrouper())
    grouper.threshold = 5
    grouper.groupName = 'Other'
    grouper.clickBehavior = 'break'

    //chart.legend = new am4charts.Legend()
    //chart.legend.position = 'bottom'

    chart.innerRadius = am4core.percent(40)

    var label = pieSeries.createChild(am4core.Label)
    label.text = 'Imports'
    label.horizontalCenter = 'middle'
    label.verticalCenter = 'middle'
    label.fontSize = 20

    return (() => {
      if (chart) {
        chart.dispose()
      }
    })

  }, [imports])

  return (
    <div>
      <div id='imports-chart-div' style={{ width: '100%', height: '60vh' }}></div>
    </div >
  )

}

export default ImportsChart
