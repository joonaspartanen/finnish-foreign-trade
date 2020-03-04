import React, { useEffect } from 'react'
import { Header } from 'semantic-ui-react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4themes_spiritedaway from '@amcharts/amcharts4/themes/spiritedaway'

const ProductsTreeMap = ({ SITC2Data, flow }) => {
  const attributes = { id: `products-treemap-div-${flow}` }

  useEffect(() => {
    am4core.useTheme(am4themes_animated)
    am4core.useTheme(am4themes_spiritedaway)
    let chart = am4core.create(`products-treemap-div-${flow}`, am4charts.TreeMap)

    chart.data = SITC2Data
    chart.dataFields.value = 'value'
    chart.dataFields.name = 'group'
    chart.dataFields.children = 'children'

    let level1 = chart.seriesTemplates.create('1')
    let level1_column = level1.columns.template

    level1_column.tooltipText = '{group}: {value} €'

    // Show legend only in landscape view
    if (window.innerHeight < window.innerWidth) {
      chart.legend = new am4charts.Legend()
      chart.legend.position = 'bottom'
      chart.legend.paddingTop = 20
    }

    return () => {
      if (chart) {
        chart.dispose()
      }
    }
  }, [SITC2Data, flow])

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        paddingTop: '3em',
        paddingRight: '1em',
        paddingLeft: '1em',
        textAlign: 'center'
      }}>
      <Header inverted as='h3'>
        Finnish {flow} by product category
      </Header>
      <div {...attributes} style={{ width: '100%', height: '90%' }}></div>
    </div>
  )
}

export default ProductsTreeMap
