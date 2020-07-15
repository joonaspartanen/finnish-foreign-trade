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

    const drawVerticalChart = () => {
      const y0 = d3
        .scaleBand()
        .domain(tradeData.map(d => d.year).sort((a, b) => a - b))
        .rangeRound([height - margin.TOP, margin.TOP])
        .paddingInner(0.1)

      const y1 = d3.scaleBand().domain(keys).rangeRound([0, y0.bandwidth()]).padding(0.05)

      const x = d3
        .scaleLinear()
        .domain([0, maxValue])
        .nice()
        .rangeRound([margin.LEFT, width - margin.RIGHT])

      const xAxis = g =>
        g
          .attr('transform', `translate(0, ${height - margin.TOP + 10})`)
          .call(d3.axisBottom(x).tickSize(0))
          .style('color', '#fff')
          .call(g => g.select('.domain').remove())

      const yAxis = g =>
        g
          .attr('transform', `translate(${margin.LEFT - 5}, 0)`)
          .call(d3.axisLeft(y0).ticks(null, 's').tickSizeInner(0))
          .style('color', '#fff')
          .call(g => g.select('.domain').remove())

      svg.append('g').call(xAxis)
      svg.append('g').call(yAxis)
      svg
        .append('g')
        .attr('class', 'grid')
        .call(
          d3
            .axisBottom(x)
            .tickSize(-height + margin.TOP + 20)
            .tickFormat('')
        )
        .attr('transform', `translate(0, 0)`)

      svg
        .append('g')
        .selectAll('g')
        .data(tradeData)
        .join('g')
        .attr('transform', d => `translate(${y0(d.year)}, 0)`)
        .selectAll('rect')
        .data(d => keys.map(key => ({ key, value: d[key] })))
        .join('rect')
        .attr('class', 'bar')
        .attr('y', d => y1(d.key))
        .attr('heigth', y1.bandwidth())
        .attr('x', d => x(d.value))
        .attr('width', d => x(d.value))
        .attr('fill', d => colors(d.key))
    }

    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('transform', `translate(${margin.LEFT}, ${margin.TOP})`)

    const resize = () => {
      svg.attr('width', window.innerWidth - margin.LEFT - margin.RIGHT)
      svg.attr('height', window.innerHeight - margin.TOP - margin.BOTTOM)
    }

    d3.select(window).on('resize', resize)

    if (orientation === 'horizontal') {
      drawHorizontalChart()
    } else {
      // TODO: Fix this and think it over...
      //drawVerticalChart()
    }

    svg
      .selectAll('.bar')
      .on('mouseover', function (d) {
        d3.select(this).style('fill', d3.rgb(colors(d.key)).darker(1))
      })
      .on('mouseout', function (d) {
        d3.select(this).style('fill', colors(d.key))
      })

    /*
      const legend = svg
        .selectAll('.legend')
        .data(keys)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(0, ${i * 20})`)

      legend
        .append('rect')
        .attr('x', width - 20)
        .attr('width', 20)
        .attr('height', 20)
        .style('fill', d => colors(d))

      legend
        .append('text')
        .attr('x', width - 24)
        .attr('y', 9)
        .attr('dy', '.35em')
        .style('text-anchor', 'end')
        .text(d => d)
        */
  }, [tradeData])

  return <div ref={ref}></div>
}

export default D3TradeBalanceChart
