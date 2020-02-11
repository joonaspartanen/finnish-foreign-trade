import React, { useEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4themes_spiritedaway from '@amcharts/amcharts4/themes/spiritedaway'

const ProductsTreeMap = ({ importsSITC2 }) => {
  useEffect(() => {
    am4core.useTheme(am4themes_animated)
    am4core.useTheme(am4themes_spiritedaway)
    let chart = am4core.create('products-treemap-div', am4charts.TreeMap)
    chart.legend = new am4charts.Legend()
    chart.layoutAlgorithm = chart.binaryTree

    chart.data = importsSITC2
    chart.dataFields.value = 'value'
    chart.dataFields.name = 'group'
    chart.dataFields.children = 'children'

    let level1 = chart.seriesTemplates.create('1')
    let level1_column = level1.columns.template

    level1_column.tooltipText = '{group}: {value} €'

    return () => {
      if (chart) {
        chart.dispose()
      }
    }
  }, [importsSITC2])

  return (
    <div
      id='products-treemap-div'
      style={{ width: '100%', height: '100vh', paddingTop: '2em' }}
    ></div>
  )
}

export default ProductsTreeMap
