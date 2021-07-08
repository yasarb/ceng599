/* eslint-disable no-restricted-globals*/

import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { togglePlay, setProgress } from 'components/Player/Player.slice';
import Voronoi from './algo';


function VoronoiRenderer(props) {

  const { playing, progress, speed } = useSelector(state => state.player);
  const dispatch = useDispatch();
  const canvas = useRef(null);

  let VoronoiAnimateTimer;
  let VoronoiAnimatePixels;
  var VoronoiAnimateDelay;

  const VoronoiAnimateCallback = () => {
    VoronoiAnimateTimer = undefined;
    Voronoi.processUpTo(Voronoi.sweep+VoronoiAnimatePixels);
    Voronoi.draw();

    dispatch(setProgress(Voronoi.sweep * 100 / Voronoi.bbox.yb));

    if (!Voronoi.queueIsEmpty() || Voronoi.sweep < Voronoi.bbox.yb) {
      VoronoiAnimateTimer = setTimeout(VoronoiAnimateCallback, VoronoiAnimateDelay);
    } else { 
      dispatch(togglePlay());
    }
  }

  const VoronoiAnimate = (px,ms) => {
    if (VoronoiAnimateTimer !== undefined) {
      clearTimeout(VoronoiAnimateTimer);
      VoronoiAnimateTimer = undefined;
    }

    if (Voronoi.queueIsEmpty()) {
      Voronoi.reset();
    }
    VoronoiAnimatePixels = self.isNaN(px) ? 5 : Voronoi.max(px,1);
    VoronoiAnimateDelay = self.isNaN(ms) ? 200 : Voronoi.max(ms,1);
    VoronoiAnimateTimer = setTimeout(VoronoiAnimateCallback,VoronoiAnimateDelay);
  }

  useEffect(() => {
    Voronoi.init(canvas.current);
    Voronoi.reset(canvas.current);
  }, []);

  useEffect(() => {
    if (playing) {
      Voronoi.reset();
      VoronoiAnimate(10, 1 / speed);
    }
  }, [playing, speed]);

  useEffect(() => {
    if (!playing) {
      Voronoi.reset();
      Voronoi.processUpTo((progress / 100) * Voronoi.bbox.yb);
      Voronoi.draw();
    }
  }, [progress]);

  return (
      <div>
        <canvas ref={canvas} id="voronoiCanvas" style={{'cursor' : 'crosshair'}} width="800" height="600" />
      </div>
  );
}

export default VoronoiRenderer;
