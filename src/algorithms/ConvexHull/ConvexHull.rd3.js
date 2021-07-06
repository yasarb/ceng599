/* eslint-disable no-restricted-globals*/
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlay } from 'components/Player/Player.slice';
import ConvexHull from './algo';
import './ConvexHull.scss';

function ConvexHullRenderer(props) {
  
  const { playing, progress } = useSelector(state => state.player);
  const dispatch = useDispatch();

  let ConvexHullAnimateTimer;
  let ConvexHullAnimateId;
  var ConvexHullAnimateDelay;

  const ConvexHullAnimateCallback = () => {
    ConvexHullAnimateTimer = undefined;
    ConvexHull.processUpTo(ConvexHull.lastStepId + ConvexHullAnimateId);
    // ConvexHull.draw();

    // dispatch(setProgress(ConvexHull.sweepline.x * 100 / ConvexHull.bbox.xr));

    if (ConvexHull.lastStepId < ConvexHull.steps.length) {
      ConvexHullAnimateTimer = setTimeout(ConvexHullAnimateCallback, ConvexHullAnimateDelay);
    } else { 
      dispatch(togglePlay());
    }
  }

  const ConvexHullAnimate = (id, ms) => {
    if (ConvexHullAnimateTimer !== undefined) {
      clearTimeout(ConvexHullAnimateTimer);
      ConvexHullAnimateTimer = undefined;
    }

    if (ConvexHull.lastStepId >= ConvexHull.steps.length) {
      ConvexHull.reset();
    }

    ConvexHullAnimateId = self.isNaN(id) ? 1 : ConvexHull.max(id, 1);
    ConvexHullAnimateDelay = self.isNaN(ms) ? 200 : ConvexHull.max(ms, 1);
    ConvexHullAnimateTimer = setTimeout(ConvexHullAnimateCallback, ConvexHullAnimateDelay);
  }

  useEffect(() => {
    ConvexHull.init();
    ConvexHull.reset();
  }, []);

  useEffect(() => {
    if (playing) {
      ConvexHull.reset();
      ConvexHullAnimate(1, 300);
    }
  }, [playing]);

  return (
      <div>
        <canvas id="voronoiCanvas" style={{'cursor' : 'crosshair'}} width="800" height="600" />
      </div>
  );
}

export default ConvexHullRenderer;
