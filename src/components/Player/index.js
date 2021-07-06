import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { setProgress, togglePlay } from './Player.slice';
import ProgressBar from 'components/ProgressBar';
import './Player.scss';

const Player = () => {
  const dispatch = useDispatch();
  const { activeAlgorithm } = useSelector(state => state.app);
  const { playing, progress } = useSelector(state => state.player);

  const togglePlayStatus = () => {
    dispatch(togglePlay());
  };

  const handleChangeProgress = (progress) => {
    dispatch(setProgress(progress));
  }

  return (
    <div className="player-container">
      {
        playing ? (
          <button className="btn btn-playing" disabled={playing}>
            Playing
          </button>
        ) : (
          <button className="btn btn-play" onClick={togglePlayStatus} disabled={!activeAlgorithm}>
            <FontAwesomeIcon icon={faPlay} />
            Play
          </button>
        )
      }
      
      <ProgressBar 
        className='progress_bar' 
        current={progress} 
        total={100}
        onChangeProgress={progress => handleChangeProgress(progress)}
      />
    </div>
  );
}

export default Player;
