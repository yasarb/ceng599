import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputRange from 'react-input-range';
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { setProgress, setSpeed, togglePlay } from './Player.slice';
import ProgressBar from 'components/ProgressBar';
import './Player.scss';

const Player = () => {
  const dispatch = useDispatch();
  const { activeAlgorithm } = useSelector(state => state.app);
  const { playing, progress, speed } = useSelector(state => state.player);

  const togglePlayStatus = () => {
    dispatch(togglePlay());
  };

  const handleChangeProgress = (newProgress) => {
    if (!playing && progress !== newProgress) {
      dispatch(setProgress(newProgress));
    }
  }

  const handleChangeSpeed = (newSpeed) => {
    if (!playing && speed !== newSpeed) {
      dispatch(setSpeed(newSpeed));
    }
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
      <div className={'speed'}>
        Speed
        <InputRange
          classNames={{
            inputRange: 'range',
            labelContainer: 'range_label_container',
            slider: 'range_slider',
            track: 'range_track',
          }} minValue={0.001} maxValue={0.02} step={0.001} value={speed}
          onChange={handleChangeSpeed}/>
      </div>
    </div>
  );
}

export default Player;
