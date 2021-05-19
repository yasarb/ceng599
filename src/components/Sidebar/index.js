import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AlgorithmService } from 'algorithms';
import './Sidebar.scss'

function Sidebar() {
  const { activeAlgorithm } = useSelector(state => state.app);
  const algoNames = AlgorithmService.listAlgoNames();
  
  return (
    <div>
      <h1>
        { AlgorithmService.getAlgoTitle(activeAlgorithm) ?? 'Welcome' }
      </h1>
      <div className="sidebar-item-wrapper">
        {
          algoNames.map(algo => <Link to={`/${algo.key}`}><div className="sidebar-item" key={algo.key}>{algo.name}</div></Link>)
        }
      </div>
      <ul>
        
      </ul>
    </div>
  );
}

export default Sidebar;
