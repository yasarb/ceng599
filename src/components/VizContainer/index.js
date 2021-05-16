import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Renderer } from 'algorithms/ConvexHull';

function VizContainer() {
  const ref = useRef(null);
  const [vertices, setVertices] = useState([]);

  useEffect(() => {
    if (ref.current) {
      const randomX = d3.randomInt(ref.current.offsetWidth - 10);
      const randomY = d3.randomInt(ref.current.offsetHeight - 20);
      setVertices(d3.range(25).map(function () { return [randomX() + 10, randomY() + 20]; }));
    }
  }, []);

  return (
    <div className="viz-container" ref={ref}>
      <Renderer data={vertices}/>
    </div>
  );
}

export default VizContainer;
