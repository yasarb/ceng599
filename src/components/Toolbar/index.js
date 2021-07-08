import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons'
import './Toolbar.scss';

function Toolbar(props) {
  
  const { disabled, onReset, onRandom, onClear } = props;

  return (
    <div className="toolbar-container">
      <button className="btn" onClick={onRandom} disabled={disabled}>
        <FontAwesomeIcon icon={faRandom} />
        Random
      </button>
      <button className="btn" disabled={disabled} onClick={onReset} >
        <FontAwesomeIcon icon={faUndo} />
        Reset
      </button>
      <button className="btn" disabled={disabled} onClick={onClear} >
        <FontAwesomeIcon icon={faTrash} />
        Clear
      </button>
    </div>
  );
}

export default Toolbar;
