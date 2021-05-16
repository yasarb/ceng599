import React, { useRef, useLayoutEffect } from 'react';
import * as d3 from 'd3';
import Promise from 'bluebird';
import './ConvexHull.scss';

function ConvexHullRenderer(props) {
  const d3Container = useRef(null);

  useLayoutEffect(
    () => {
      console.log(props.data);
        if (props.data && props.data.length > 0 && d3Container.current) {
            const svg = d3.select(d3Container.current);
            svg.attr("transform", "scale(1,-1)")

            let h = svg.append("path")
              .attr("class", "hull");

            let p = svg
              .append("g")
              .selectAll("circle")
              .data(props.data)
              .join("circle")
              .attr("r", 3)
              .attr("cx", d => d[0])
              .attr("cy", d => d[1]);
            
            let hull = d3.polygonHull(props.data);
            draw();

            async function draw() {
              for (let i = 2; i <= hull.length; i++) {
                const visible = hull.slice(0, i);
                h.attr("d", `M${visible.join("L")}Z`);
                p.style("fill", d => (visible.includes(d) ? "orange" : "#f4eee8"));
                await Promise.delay(300);
              }
            }
          
            h.transition().style("fill", "#f3f4ed22");
        }
    }, 
    [props.data]);

    return (
      <svg ref={d3Container} />
  );
}

export default ConvexHullRenderer;
