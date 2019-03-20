import React from 'react';
import './index.scss';

const FileZone = (props) => {
  const { textArray = [], addText, handleClickWord } = props;

  return (
    <div id='file-zone'>
      <form
        id='textForm'
        className='add-text'
        onSubmit={addText}
      >
        <textarea
          className='add-text__textarea'
          data-gramm_editor='false'
          cols='50'
          name='text'
          form='textForm'
          placeholder='Input text here' />
        <button
          className='add-text__button'
          type='submit'>Add text</button>
      </form>
      <div id='file'>
        {
          textArray.length > 0 ? textArray.map(word => {
            const { id, value, italic, bold, underline, selected } = word;
            const italicClass = italic ? 'italic' : '';
            const boldClass = bold ? 'bold' : '';
            const underlineClass = underline ? 'underline' : '';
            const selectedClass = selected ? 'selected' : '';
            const classes = `${italicClass} ${boldClass} ${underlineClass} ${selectedClass}`;

            return (
              <React.Fragment key={id}>
                <span
                  style={{color: word.color}}
                  className={classes}
                  onDoubleClick={() => handleClickWord(id)}
                >{value}</span>&nbsp;
          </React.Fragment>
            )
          }) : ('')
        }
      </div>
    </div >
  );
};

export default FileZone;
