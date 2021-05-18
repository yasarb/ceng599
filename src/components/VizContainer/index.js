import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';
import { AlgorithmService } from 'algorithms';
import ConvexHullRenderer from 'algorithms/ConvexHull/ConvexHull.rd3';

function VizContainer() {
  const { activeAlgorithm } = useSelector(state => state.app);
  const comp = AlgorithmService.getAlgoRenderer(activeAlgorithm);
  const ref = useRef(null);
  const [vertices, setVertices] = useState([]);
  const [renderer, setRenderer] = useState(null);

  useEffect(() => {
    if (ref.current) {
      const randomX = d3.randomInt(ref.current.offsetWidth - 10);
      const randomY = d3.randomInt(ref.current.offsetHeight - 20);
      setVertices(d3.range(25).map(function () { return [randomX() + 10, randomY() + 20]; }));
    }
  }, []);

  return (
    <div className="viz-container" ref={ref}>
      { comp && React.createElement(comp, {data: vertices,})}
    </div>
  );
}

export default VizContainer;