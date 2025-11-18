import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function AudioWaveform({ analyser }) {
    const svgRef = useRef();

    useEffect(() => {
  if (!analyser) return;

  const svg = d3.select(svgRef.current);
  const width = 500;
  const height = 150;
  svg.attr("width", width).attr("height", height);

  const bufferLength = analyser.fftSize;
  const dataArray = new Uint8Array(bufferLength);

  const xScale = d3.scaleLinear().domain([0, bufferLength - 1]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 255]).range([height, 0]);

  const line = d3.line()
    .x((_, i) => xScale(i))
    .y(d => yScale(d))
    .curve(d3.curveMonotoneX);

  const path = svg.append('path')
    .attr('stroke', 'white')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

  function renderFrame() {
    analyser.getByteTimeDomainData(dataArray);
    path.datum(dataArray).attr('d', line);
    requestAnimationFrame(renderFrame);
  }

  renderFrame();

  return () => {
    svg.selectAll('*').remove();
  };
}, [analyser]);


    return <svg ref={svgRef} />;
}
