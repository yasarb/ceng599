import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AlgorithmService } from 'algorithms';
import { updateActiveFile } from 'components/App/App.slice';
import './PageTabs.scss';

export default function PageTabs(props) {
  const dispatch = useDispatch();
  const { activeAlgorithm, activeFile } = useSelector(state => state.app);
  const { children } = props;
  const [files, setFiles] = useState([]);
  
  const setEditingFile = (file) => {
    if (file.key === 'code') {
      document.location.reload(); // hot fix for react canvas rerendering bug
    } else {
      dispatch(updateActiveFile(file.key));
    }
  }

  useEffect(() => {
    const pages = AlgorithmService.getAlgoPages(activeAlgorithm);

    if (pages) {
      setFiles(Object.keys(pages).map(key => pages[key]));
    }
  }, [activeAlgorithm]);

  return (
    <div className={'tab_container'}>
      <div className={'tab_bar'}>
        <div className={'title fake'}/>
        {
          files.map((file, i) => 
            <div className={`title ${file.key === activeFile ? 'selected' : ''}`} key={i}
                 onClick={() => setEditingFile(file)}>
              {file.name}
            </div>
          )
        }
        <div className={'title fake'}/>
      </div>
      <div className={'content'}>
        {children}
      </div>
    </div>
  );
}
