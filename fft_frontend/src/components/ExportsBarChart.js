import React, { useEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4themes_spiritedaway from '@amcharts/amcharts4/themes/spiritedaway'

const ExportsChart = ({ exports }) => {

  useEffect(() => {

    am4core.useTheme(am4themes_animated)
    am4core.useTheme(am4themes_spiritedaway)

    let chart = am4core.create("exports-barchart-div", am4charts.XYChart);

    chart.data = exports

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.dataFields.category = "flow"
    categoryAxis.renderer.grid.template.location = 0

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.renderer.inside = true
    valueAxis.renderer.labels.template.disabled = true
    valueAxis.min = 0

    const createSeries = (field) => {
      let series = chart.series.push(new am4charts.ColumnSeries())
      series.name = field
      series.dataFields.valueY = field
      series.dataFields.categoryX = "flow"
      series.sequencedInterpolation = true
      series.stacked = true
      series.columns.template.height = am4core.percent(100)
      series.columns.template.width = am4core.percent(40)
      series.columns.template.tooltipText = "[bold]{name}[/]\n{valueY} €"

      return series
    }

    createSeries("Food and live animals")
    createSeries("Beverages and tobacco")
    createSeries("Crude materials,inedible,except fuels")
    createSeries("Mineral fuels etc")
    createSeries("Animal and vegetable oils and fats")
    createSeries("Chemicals and related products,n.e.s.")
    createSeries("Basic manufactures")
    createSeries("Machinery,transport equipment")
    createSeries("Miscellaneous manufactured articles")
    createSeries("Goods not classified elsewhere")

    // Legend
    // chart.legend = new am4charts.Legend();

    return (() => {
      if (chart) {
        chart.dispose()
      }
    })

  }, [exports])

  return (
    <div id='exports-barchart-div' style={{ width: '100%', height: '100vh' }}></div>
  )

}

export default ExportsChart
