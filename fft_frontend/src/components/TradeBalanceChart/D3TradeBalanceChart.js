import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const D3TradeBalanceChart = ({ tradeBalance }) => {
  console.log(tradeBalance)

  const ref = useRef()

  useEffect(() => {
    if (tradeBalance) {
      const margin = 100
      const width = window.innerWidth - 2 * margin
      const height = window.innerHeight - 2 * margin

      console.log()
      const xScale = d3
        .scaleBand()
        .domain(tradeBalance.map(d => d.year).sort((a,b) => a - b))
        .range([margin, width - margin])
        .padding(0.2)

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(tradeBalance.map(d => d.imports))])
        .range([height, 0])

      const svg = d3.select(ref.current)

      svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale))
        .style('color', '#fff')

      svg
        .append('g')
        .attr('transform', `translate(${margin}, 0)`)
        .call(d3.axisLeft(yScale))
        .style('color', '#fff')

      svg
        .selectAll()
        .data(tradeBalance)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.year))
        .attr('y', d => yScale(d.imports))
        .attr('height', d => height - yScale(d.imports))
        .attr('width', xScale.bandwidth())
        .style('fill', '#fff')
    }
  }, [tradeBalance])

  return <svg ref={ref} style={{ height: 'calc(100vh - 50px)', width: '90vw' }}></svg>
}

export default D3TradeBalanceChart
