import { React, useEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4themes_spiritedaway from '@amcharts/amcharts4/themes/spiritedaway'

const ProductsBarChart = ({ productData }) => {
  useEffect(() => {
    console.log(productData)
    am4core.useTheme(am4themes_animated)
    am4core.useTheme(am4themes_spiritedaway)

    let chart = am4core.create('products-barchart-div', am4charts.XYChart)

    chart.data = productData

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.dataFields.category = 'flow'
    categoryAxis.renderer.grid.template.location = 0

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.renderer.inside = true
    valueAxis.min = 0
    valueAxis.title.text = 'Euros'
    valueAxis.numberFormatter.numberFormat = '##.##a'
    valueAxis.numberFormatter.bigNumberPrefixes = [{ number: 1e9, suffix: 'B' }]

    const createSeries = field => {
      let series = chart.series.push(new am4charts.ColumnSeries())
      series.name = field
      series.dataFields.valueY = field
      series.dataFields.categoryX = 'flow'
      series.sequencedInterpolation = true
      series.stacked = true
      series.columns.template.height = am4core.percent(100)
      series.columns.template.width = am4core.percent(30)
      series.columns.template.tooltipText = '{name}\n€ {valueY}'

      return series
    }

    createSeries('Food and live animals')
    createSeries('Beverages and tobacco')
    createSeries('Crude materials,inedible,except fuels')
    createSeries('Mineral fuels etc')
    createSeries('Animal and vegetable oils and fats')
    createSeries('Chemicals and related products,n.e.s.')
    createSeries('Basic manufactures')
    createSeries('Machinery,transport equipment')
    createSeries('Miscellaneous manufactured articles')
    createSeries('Goods not classified elsewhere')

    // Show legend only in landscape view
    if (window.innerHeight < window.innerWidth) {
      chart.legend = new am4charts.Legend()
      chart.legend.position = 'right'
      chart.legend.width = am4core.percent(40)
      chart.legend.paddingLeft = '20px'
    } else {
      valueAxis.renderer.disabled = true
    }

    return () => {
      if (chart) {
        chart.dispose()
      }
    }
  }, [productData])

  return (
    <div
      id='products-barchart-div'
      style={{ width: '100%', height: '100vh', paddingTop: '2em' }}
    ></div>
  )
}

export default ProductsBarChart
