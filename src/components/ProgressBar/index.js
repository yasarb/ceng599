import React, { useState } from 'react';
import styles from './ProgressBar.scss';

function ProgressBar(props) {

  const handleMouseDown = (e) => {
    handleMouseMove(e);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  const handleMouseMove = (e) => {
    const { left } = e.target.getBoundingClientRect();
    const { offsetWidth } = e.target;
    const { onChangeProgress } = props;
    const progress = (e.clientX - left) * 100 / offsetWidth;

    if (onChangeProgress) 
      onChangeProgress(progress);
  }

  const handleMouseUp = (e) => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  const { className, total, current } = props;

  return (
    <div className={className} onMouseDown={handleMouseDown}>
      <div className='active' style={{ width: `${current / total * 100}%` }} />
      <div className='label'>
        <span className='current'>{current}</span> / {total}
      </div>
    </div>
  );
}

export default ProgressBar;
