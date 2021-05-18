import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AlgorithmService } from 'algorithms';

function Sidebar() {
  const { activeAlgorithm } = useSelector(state => state.app);
  const algoNames = AlgorithmService.listAlgoNames();
  
  return (
    <div>
      <h1>
        { activeAlgorithm }
      </h1>
      <ul>
        {
          algoNames.map(algo => <li key={algo.key}><Link to={`/${algo.key}`}>{algo.name}</Link></li>)
        }
      </ul>
    </div>
  );
}

export default Sidebar;
