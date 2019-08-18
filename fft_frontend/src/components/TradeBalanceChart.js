import React, { useEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4themes_spriritedaway from '@amcharts/amcharts4/themes/spiritedaway'


const TradeBalanceChart = ({ tradeBalance }) => {

  useEffect(() => {

    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_spriritedaway)

    let chart = am4core.create('chartdiv', am4charts.XYChart)
    chart.data = tradeBalance

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.dataFields.category = 'year'
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.title.text = 'Euros'

    let importSeries = chart.series.push(new am4charts.LineSeries())
    importSeries.name = 'Imports'
    importSeries.stroke = am4core.color('red')
    importSeries.strokeWidth = 3
    importSeries.dataFields.valueY = 'imports'
    importSeries.dataFields.categoryX = 'year'

    let importBullet = importSeries.bullets.push(new am4charts.CircleBullet())
    importBullet.tooltipText = 'Imports: [bold]{valueY} €[/] ({categoryX})'

    let exportSeries = chart.series.push(new am4charts.LineSeries())
    exportSeries.name = 'Exports'
    exportSeries.stroke = am4core.color('blue')
    exportSeries.strokeWidth = 3
    exportSeries.dataFields.valueY = 'exports'
    exportSeries.dataFields.categoryX = 'year'

    let exportBullet = exportSeries.bullets.push(new am4charts.CircleBullet())
    exportBullet.tooltipText = 'Exports: [bold]{valueY} €[/] ({categoryX})'

    let tradeBalanceSeries = chart.series.push(new am4charts.ColumnSeries())
    tradeBalanceSeries.name = 'Balance of Trade'
    tradeBalanceSeries.stroke = am4core.color('#5a5')
    tradeBalanceSeries.fill = am4core.color('#5a5')
    tradeBalanceSeries.dataFields.valueY = 'tradeBalance'
    tradeBalanceSeries.dataFields.categoryX = 'year'
    tradeBalanceSeries.columns.template.tooltipText = '{name}: [bold]{valueY}[/] ({categoryX}))'

    tradeBalanceSeries.columns.template.adapter.add('fill', function (fill, target) {
      if (target.dataItem && (target.dataItem.valueY < 0)) {
        return am4core.color('#a55');
      }
      else {
        return fill;
      }
    })

    return (() => {
      if (chart) {
        chart.dispose()
      }
    })

  }, [tradeBalance])

  return (
    <div>
      <div id='chartdiv' style={{ width: '100%', height: '100vh' }}></div>
    </div>
  )

}

export default TradeBalanceChart