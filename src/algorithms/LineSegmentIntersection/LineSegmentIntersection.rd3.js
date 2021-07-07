/* eslint-disable no-restricted-globals*/

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { togglePlay, setProgress } from 'components/Player/Player.slice';
import LineSegmentIntersection from './algo';

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

  return (
    <div>
      <canvas id="lsiCanvas" style={{'cursor' : 'crosshair'}} width="800" height="600" />
    </div>
  );
}

export default LineSegmentIntersectionRenderer;
