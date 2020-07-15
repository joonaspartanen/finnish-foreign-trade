import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import './tradeBalanceChart.css'

const D3TradeBalanceChart = ({ tradeBalance: tradeData }) => {
  const ref = useRef()

  useEffect(() => {
    if (!tradeData) {
      return
    }

    const margin = { TOP: 40, RIGHT: 40, BOTTOM: 60, LEFT: 40 }
    const padding = { TOP: 20, RIGHT: 10, BOTTOM: 20, LEFT: 10 }

    const width = window.innerWidth - margin.RIGHT - margin.LEFT
    const height = window.innerHeight - margin.TOP - margin.BOTTOM
    const keys = ['imports', 'exports']

    const keyDescriptions = {
      imports: 'Total value of goods imported to Finland',
      exports: 'Total value of goods exported from Finland',
    }

    const colors = d3.scaleOrdinal().range(['#58556d', '#743033'])

    const maxValue = Math.max(
      d3.max(tradeData.map(d => d.imports)),
      d3.max(tradeData.map(d => d.exports))
    )

    const drawHorizontalChart = () => {
      const x0 = d3
        .scaleBand()
        .domain(tradeData.map(d => d.year).sort((a, b) => a - b))
        .rangeRound([margin.LEFT, width - margin.RIGHT])
        .paddingInner(0.1)

      const x1 = d3.scaleBand().domain(keys).rangeRound([0, x0.bandwidth()]).padding(0.05)

      const y = d3
        .scaleLinear()
        .domain([0, maxValue])
        .nice()
        .rangeRound([height - margin.TOP, margin.TOP])

      const xAxis = g =>
        g
          .attr('transform', `translate(0, ${height - padding.BOTTOM})`)
          .call(d3.axisBottom(x0).tickSize(0))
          .style('color', '#fff')
          .call(g => g.select('.domain').remove())
          .selectAll('text')

      const yAxis = g =>
        g
          .attr('transform', `translate(${margin.LEFT}, 0)`)
          .call(d3.axisLeft(y).ticks(null, 's').tickSizeInner(0))
          .style('color', '#fff')
          .call(g => g.select('.domain').remove())

      svg.append('g').call(xAxis)
      svg.append('g').call(yAxis)

      svg
        .append('g')
        .attr('class', 'grid')
        .call(
          d3
            .axisLeft(y)
            .tickSize(-width + margin.RIGHT + padding.RIGHT + 20)
            .tickFormat('')
        )
        .attr('transform', `translate(${margin.LEFT + padding.LEFT}, 0)`)

      svg
        .append('g')
        .selectAll('g')
        .data(tradeData)
        .join('g')
        .attr('transform', d => `translate(${x0(d.year) + padding.LEFT}, 0)`)
        .selectAll('rect')
        .data(d => keys.map(key => ({ key, value: d[key] })))
        .join('rect')
        .attr('class', 'bar')
        .attr('x', d => x1(d.key))
        .attr('width', x1.bandwidth())
        .attr('y', d => y(0))
        .transition()
        .ease(d3.easePoly)
        .duration(1500)
        .attr('y', d => y(d.value))
        .attr('height', d => y(0) - y(d.value))
        .attr('fill', d => colors(d.key))
    }

    const chart = d3.select(ref.current)

    const svg = chart
      .append('svg')
      .attr('width', width + padding.RIGHT + padding.LEFT)
      .attr('height', height + padding.TOP + padding.BOTTOM)
      .attr(
        'viewBox',
        `0 0 ${width + padding.RIGHT + padding.LEFT} ${height + padding.TOP + padding.BOTTOM}`
      )

    drawHorizontalChart()

    
    svg
      .selectAll('.bar')
      .on('mouseover', function (d) {
        d3.select(this).style('fill', d3.rgb(colors(d.key)).darker(1))
      })
      .on('mouseout', function (d) {
        d3.select(this).style('fill', colors(d.key))
      })
      .on('mouseover', d => {
        const tooltipHtml = `
        <div>
          Total ${d.key} from Finland:
          <br>
          ${d3.format(',')(d.value)}
        €</div>
        `
        showTooltip(tooltip, tooltipHtml)
      })
      .on('mousemove', () => moveTooltip(tooltip))
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden')
      })

    const tooltip = d3.select('body').append('div').attr('class', 'd3-tooltip')

    const showTooltip = (tooltip, tooltipHtml) =>{
      tooltip.style('visibility', 'visible')
      tooltip.html(tooltipHtml)
    }

    const moveTooltip = tooltip => {
      tooltip.style('left', `${d3.event.pageX + 5}px`).style('top', `${d3.event.pageY - 65}px`)
    }

    const legendWrapper = chart
      .append('svg')
      .attr('width', 300)
      .attr('height', 40)
      .attr('class', 'legend-wrapper')

    const legend = legendWrapper
      .selectAll('.legend')
      .data(keys)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(${i * 140}, 0)`)

    legend
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 40)
      .attr('height', 40)
      .style('fill', d => colors(d))
      .on('mouseover', d => {
        const tooltipHtml = `<div>${keyDescriptions[d]}</div>`
        showTooltip(tooltip, tooltipHtml)
      })
      .on('mousemove', () => moveTooltip(tooltip))
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden')
      })

    legend
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('transform', d => 'translate(50, 25)')
      .attr('class', 'd3-legend-text')
      .style('fill', '#fff')
      .text(d => d.toUpperCase())

    return () => {
      chart.selectAll('*').remove()
    }
  }, [tradeData])

  useEffect(() => {
    if (!tradeData) {
      return
    }
    // TODO: Update data without redrawing whole chart
    console.log('trade data updated')
  }, [tradeData])

  return <div ref={ref}></div>
}

export default D3TradeBalanceChart
