/* eslint-disable no-restricted-globals*/
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlay, setProgress } from 'components/Player/Player.slice';
import Toolbar from 'components/Toolbar';
import ConvexHull from './algorithm';
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

    if (ConvexHull.steps.length < 1) {
      dispatch(setProgress(0));  
    } else {
      dispatch(setProgress(ConvexHull.lastStepId * 100 / ConvexHull.steps.length));
    }

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

  const handleRandom = () => {
    ConvexHull.clearCanvas();
    ConvexHull.points = [];
    ConvexHull.steps = [];
    ConvexHull.init();
    ConvexHull.reset();
    dispatch(setProgress(0));
  }

  const handleReset = () => {
    ConvexHull.clearCanvas();
    ConvexHull.reset();
    dispatch(setProgress(0));
  }

  const handleClear = () => {
    ConvexHull.points = [];
    ConvexHull.steps = [];
    ConvexHull.clearCanvas();
    ConvexHull.initCanvas(true);
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
      <div className='convexHullCanvas'>
        <canvas id="convexHullCanvas" style={{'cursor' : 'crosshair'}} width={ConvexHull.DEFAULT_CANVAS_WIDTH} height={ConvexHull.DEFAULT_CANVAS_HEIGHT} />
      </div>
    </React.Fragment>
  );
}

export default ConvexHullRenderer;
