import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { AlgorithmService } from 'algorithms';
import Player from 'components/Player';
import './VizContainer.scss';

function VizContainer() {
  const { activeAlgorithm, activeFile } = useSelector(state => state.app);
  const comp = AlgorithmService.getAlgoRenderer(activeAlgorithm);
  const [isMarkdown, setIsMarkdown] = useState(true);
  const [content, setContent] = useState('');

  useEffect(() => {
    const pages = AlgorithmService.getAlgoPages(activeAlgorithm);

    if (pages) {
      if (pages[activeFile]['type'] === 'markdown') {
        setIsMarkdown(true);
        setContent(pages[activeFile]['content']);
      } else {
        setIsMarkdown(false);
        setContent('');
      }
    }
  }, [activeAlgorithm, activeFile])

  return (
    <div className={`viz-container ${isMarkdown ? 'markdownRenderer' : ''}`}>
      { isMarkdown ? (
        <div>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {content}
          </ReactMarkdown>
          </div>
      ) : (
        <React.Fragment>
          <Player />
          { comp && React.createElement(comp)}
        </React.Fragment>
      )
    }
    </div>
  );
}

export default VizContainer;
