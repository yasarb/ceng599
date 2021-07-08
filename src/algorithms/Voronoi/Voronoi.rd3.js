/* eslint-disable no-restricted-globals*/

import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { togglePlay, setProgress } from 'components/Player/Player.slice';
import Toolbar from 'components/Toolbar';
import Voronoi from './algo';
import './Voronoi.scss';


function VoronoiRenderer(props) {

  const { playing, progress, speed } = useSelector(state => state.player);
  const dispatch = useDispatch();

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
    Voronoi.init();
    Voronoi.reset();
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
  
  const handleRandom = () => {
    Voronoi.clearCanvas();
    dispatch(setProgress(0));
    Voronoi.sites = [];
    Voronoi.init();
    Voronoi.reset();
  }

  const handleReset = () => {
    Voronoi.clearCanvas();
    dispatch(setProgress(0));
    Voronoi.reset();
  }

  const handleClear = () => {
    Voronoi.sites = [];
    Voronoi.clearCanvas();
    Voronoi.initCanvas(true);
    dispatch(setProgress(0));
  }

  return (
    <React.Fragment>
      <Toolbar
        disabled={playing}
        onReset={handleReset}
        onRandom={handleRandom}
        onClear={handleClear}
      />
      <div className='voronoiCanvas'>
        <canvas id="voronoiCanvas" style={{'cursor' : 'crosshair'}} />
      </div>
    </React.Fragment>

  );
}

export default VoronoiRenderer;
