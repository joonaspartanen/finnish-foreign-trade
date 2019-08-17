import React, { useEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'

const TradeBalanceChart = ({ tradeBalance }) => {

  useEffect(() => {

    let chart = am4core.create("chartdiv", am4charts.XYChart)
    chart.data = tradeBalance

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.dataFields.category = 'year'
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())

    let importSeries = chart.series.push(new am4charts.LineSeries())
    importSeries.stroke = am4core.color('red')
    importSeries.strokeWidth = 3
    importSeries.dataFields.valueY = 'imports'
    importSeries.dataFields.categoryX = 'year'

    let exportSeries = chart.series.push(new am4charts.LineSeries())
    exportSeries.stroke = am4core.color('blue')
    exportSeries.strokeWidth = 3
    exportSeries.dataFields.valueY = 'exports'
    exportSeries.dataFields.categoryX = 'year'

    let tradeBalanceSeries = chart.series.push(new am4charts.ColumnSeries())
    tradeBalanceSeries.fill = am4core.color('teal')
    tradeBalanceSeries.dataFields.valueY = 'tradeBalance'
    tradeBalanceSeries.dataFields.categoryX = 'year'

  }, [tradeBalance])

  return (
    <div>
      <div id='chartdiv' style={{ width: '100%', height: '100vh' }}></div>
    </div>
  )

}

export default TradeBalanceChart