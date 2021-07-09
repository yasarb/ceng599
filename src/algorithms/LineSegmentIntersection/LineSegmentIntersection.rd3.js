/* eslint-disable no-restricted-globals*/

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tree from 'avl';
import { togglePlay, setProgress } from 'components/Player/Player.slice';
import Toolbar from 'components/Toolbar';
import LineSegmentIntersection from './algorithm';
import './LineSegmentIntersection.scss';

function LineSegmentIntersectionRenderer(props) {

  const { playing, progress, speed } = useSelector(state => state.player);
  const dispatch = useDispatch();

  let LSIAnimateTimer;
  let LSIAnimatePixels;
  var LSIAnimateDelay;

  const LSIAnimateCallback = () => {
    LSIAnimateTimer = undefined;
    LineSegmentIntersection.processUpTo(LineSegmentIntersection.sweepline.x + LSIAnimatePixels);
    LineSegmentIntersection.draw();

    dispatch(setProgress(LineSegmentIntersection.sweepline.x * 100 / LineSegmentIntersection.bbox.xr));

    if (!LineSegmentIntersection.queueIsEmpty() || LineSegmentIntersection.sweepline.x < LineSegmentIntersection.bbox.xr) {
      LSIAnimateTimer = setTimeout(LSIAnimateCallback, LSIAnimateDelay);
    } else { 
      dispatch(togglePlay());
    }
  }

  const LSIAnimate = (px, ms) => {
    if (LSIAnimateTimer !== undefined) {
      clearTimeout(LSIAnimateTimer);
      LSIAnimateTimer = undefined;
    }

    if (LineSegmentIntersection.queueIsEmpty()) {
      LineSegmentIntersection.reset();
    }
    LSIAnimatePixels = self.isNaN(px) ? 5 : LineSegmentIntersection.max(px,1);
    LSIAnimateDelay = self.isNaN(ms) ? 200 : LineSegmentIntersection.max(ms,1);
    LSIAnimateTimer = setTimeout(LSIAnimateCallback, LSIAnimateDelay);
  }

  useEffect(() => {
    LineSegmentIntersection.init();
    LineSegmentIntersection.reset();
  }, []);

  useEffect(() => {
    if (playing) {
      LineSegmentIntersection.reset();
      LSIAnimate(10, 1 / speed);
    }
  }, [playing, speed]);

  useEffect(() => {
    if (!playing  && progress > 0) {
      const pixel = parseInt(progress / 100 * LineSegmentIntersection.bbox.xr);
      LineSegmentIntersection.reset();
      LineSegmentIntersection.processUpTo(pixel);
      LineSegmentIntersection.draw();
    }
  }, [progress]);

  const handleRandom = () => {
    LineSegmentIntersection.clearCanvas();
    dispatch(setProgress(0));
    LineSegmentIntersection.init();
    LineSegmentIntersection.reset();
  }

  const handleReset = () => {
    LineSegmentIntersection.clearCanvas();
    dispatch(setProgress(0));
    LineSegmentIntersection.reset();
  }

  const handleClear = () => {
    LineSegmentIntersection.queueBackup = new Tree(LineSegmentIntersection.comparePoints, true);
    LineSegmentIntersection.clearCanvas();
    LineSegmentIntersection.initCanvas(true);
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
      <div className='lsiCanvas'>
        <canvas id="lsiCanvas" style={{'cursor' : 'crosshair'}} width={LineSegmentIntersection.DEFAULT_CANVAS_WIDTH} height={LineSegmentIntersection.DEFAULT_CANVAS_HEIGHT} />
      </div>
    </React.Fragment>
  );
}

export default LineSegmentIntersectionRenderer;
