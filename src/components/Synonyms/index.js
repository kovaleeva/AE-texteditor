import React from 'react';
import './index.scss';
  
const Synonyms = (props) => {
  const handleClickSynonym = (value) => props.handleChangeWord({ value });

  return (
    (
      <div id='synonyms'>
        Choose synonym for selected word:&nbsp;
        {props.synonyms.length > 0 ?
          props.synonyms.map((syn, i) => {
            return (<span
              key={'synonym' + i}
              onClick={() => handleClickSynonym(syn)}>
              {syn} /&nbsp;
          </span>)
          }) : 'no synonyms'}
      </div>
    )
  );
};

export default Synonyms;
