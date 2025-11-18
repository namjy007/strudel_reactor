import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
/*Tried but didnt work but i can still explain my work: I attempted to build a custom waveform display using D3.js. I created a React component called AudioWaveform, where I used an <svg> element and connected it to the browser’s AnalyserNode
Inside the component, I used useRef to access the SVG element and useEffect to run the D3 drawing logic once the analyser was available.
I set up an fftSize, created a Uint8Array buffer, and used D3 scales(xScale and yScale) to map the audio data to SVG coordinates
I then used d3.line() to generate the waveform path and appended the path to the SVG.
Inside renderFrame()*/
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
