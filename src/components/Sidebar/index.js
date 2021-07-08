import React from 'react';
import { useSelector } from 'react-redux';
import { AlgorithmService } from 'algorithms';
import './Sidebar.scss'

function Sidebar() {
  const { activeAlgorithm } = useSelector(state => state.app);
  const algoNames = AlgorithmService.listAlgoNames();
  
  return (
    <div>
      <div className={'header'}>
        <h1>
          { AlgorithmService.getAlgoTitle(activeAlgorithm) ?? 'Welcome' }
        </h1>
      </div>
      <div className="sidebar-item-wrapper">
        <a href={`/`} key={'home'}><div className="sidebar-item" key={'home'}>Home</div></a>
        {
          algoNames.map(algo => <a href={`/${algo.key}`} key={algo.key}><div className="sidebar-item" key={algo.key}>{algo.name}</div></a>)
        }
      </div>
    </div>
  );
}

export default Sidebar;
