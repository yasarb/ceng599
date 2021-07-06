/* eslint-disable no-restricted-globals*/
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlay, setProgress } from 'components/Player/Player.slice';
import ConvexHull from './algo';
import './ConvexHull.scss';

function ConvexHullRenderer(props) {
  
  const { playing, progress, speed } = useSelector(state => state.player);
  const dispatch = useDispatch();

  let ConvexHullAnimateTimer;
  let ConvexHullAnimateId;
  var ConvexHullAnimateDelay;

  const ConvexHullAnimateCallback = () => {
    ConvexHullAnimateTimer = undefined;
    ConvexHull.processUpTo(ConvexHull.lastStepId + ConvexHullAnimateId);
    // ConvexHull.draw();

    dispatch(setProgress(ConvexHull.lastStepId * 100 / ConvexHull.steps.length));

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
  }, []);

  useEffect(() => {
    if (playing) {
      ConvexHull.reset();
      ConvexHullAnimate(1, 1 / speed);
    }
  }, [playing, speed]);

  useEffect(() => {
    if (!playing  && progress > 0) {

      const id = parseInt(progress / 100 * ConvexHull.steps.length);
      ConvexHull.processUpTo(id);
      ConvexHull.draw();
    }
  }, [progress]);

  return (
      <div>
        <canvas id="voronoiCanvas" style={{'cursor' : 'crosshair'}} width="800" height="600" />
      </div>
  );
}

export default ConvexHullRenderer;
