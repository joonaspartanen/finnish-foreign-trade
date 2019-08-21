import React, { useEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4themes_spiritedaway from '@amcharts/amcharts4/themes/spiritedaway'


const TradeBalanceChart = ({ tradeBalance }) => {

  useEffect(() => {

    am4core.useTheme(am4themes_animated)
    am4core.useTheme(am4themes_spiritedaway)

    let chart = am4core.create('chartdiv', am4charts.XYChart)
    chart.data = tradeBalance
    chart.marginRight = '100'

    if (window.innerHeight > window.innerWidth) {
      let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'year'
      categoryAxis.numberFormatter.numberFormat = '#'
      categoryAxis.renderer.inversed = true
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.cellStartLocation = 0.1
      categoryAxis.renderer.cellEndLocation = 0.9

      let valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
      valueAxis.min = 0
      valueAxis.numberFormatter.numberFormat = '##.##a'
      valueAxis.numberFormatter.bigNumberPrefixes = [
        { 'number': 1e+9, 'suffix': 'B' }
      ]

      valueAxis.renderer.opposite = true

      let importSeries = chart.series.push(new am4charts.ColumnSeries())
      importSeries.name = 'Imports'
      importSeries.fill = am4core.color('#63718B')
      importSeries.strokeWidth = 0
      importSeries.dataFields.valueX = 'imports'
      importSeries.dataFields.categoryY = 'year'
      importSeries.columns.template.height = am4core.percent(100)
      importSeries.sequencedInterpolation = true
      importSeries.columns.template.tooltipText = '{name}: €{valueX}'

      let exportSeries = chart.series.push(new am4charts.ColumnSeries())
      exportSeries.name = 'Exports'
      exportSeries.fill = am4core.color('#EBA05C')
      exportSeries.strokeWidth = 0
      exportSeries.dataFields.valueX = 'exports'
      exportSeries.dataFields.categoryY = 'year'
      exportSeries.columns.template.height = am4core.percent(100)
      exportSeries.sequencedInterpolation = true
      exportSeries.columns.template.tooltipText = '{name}: €{valueX}'
    } else {
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'year'
      categoryAxis.numberFormatter.numberFormat = '#'
      categoryAxis.renderer.inversed = true
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.cellStartLocation = 0.1
      categoryAxis.renderer.cellEndLocation = 0.9

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.min = 0
      valueAxis.numberFormatter.numberFormat = '##.##a'
      valueAxis.numberFormatter.bigNumberPrefixes = [
        { 'number': 1e+9, 'suffix': 'B' }
      ]

      let importSeries = chart.series.push(new am4charts.ColumnSeries())
      importSeries.name = 'Imports'
      importSeries.fill = am4core.color('#63718B')
      importSeries.strokeWidth = 0
      importSeries.dataFields.valueY = 'imports'
      importSeries.dataFields.categoryX = 'year'
      importSeries.columns.template.height = am4core.percent(100)
      importSeries.sequencedInterpolation = true
      importSeries.columns.template.tooltipText = '{name}: €{valueY}'

      let exportSeries = chart.series.push(new am4charts.ColumnSeries())
      exportSeries.name = 'Exports'
      exportSeries.fill = am4core.color('#EBA05C')
      exportSeries.strokeWidth = 0
      exportSeries.dataFields.valueY = 'exports'
      exportSeries.dataFields.categoryX = 'year'
      exportSeries.columns.template.height = am4core.percent(100)
      exportSeries.sequencedInterpolation = true
      exportSeries.columns.template.tooltipText = '{name}: €{valueY}'

    }

    return (() => {
      if (chart) {
        chart.dispose()
      }
    })

  }, [tradeBalance])

  return (
    <div id='chartdiv' style={{ width: '100%', height: '100%', overflow: 'hidden' }}></div>
  )

}

export default TradeBalanceChart