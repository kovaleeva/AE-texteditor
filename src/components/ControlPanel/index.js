import React, { Component } from 'react';
import { CompactPicker } from 'react-color';
import './index.scss';

class ControlPanel extends Component {
  state = {
    pickerVisible: false,
  }

  handleBold = () => {
    this.props.handleChangeWord({
      bold: !this.props.selectedWord.bold,
    });
  }

  handleItalic = () => {
    this.props.handleChangeWord({
      italic: !this.props.selectedWord.italic,
    });
  }

  handleUnderline = () => {
    this.props.handleChangeWord({
      underline: !this.props.selectedWord.underline,
    });
  }

  handleColorChange = ({ hex }) => {
    this.props.handleChangeWord({
      color: hex,
    });
  }

  onTogglePicker = () => this.setState({ pickerVisible: !this.state.pickerVisible })

  render() {
    const { selectedWord, resetSelection, handleGetSynonym } = this.props;
    const { bold, italic, underline, } = selectedWord;

    return (
      <div id="control-panel">
        <div id="format-actions">
          <button
            disabled={selectedWord.id === undefined}
            onClick={this.handleBold}
            className={`format-action ${bold && 'active'}`}
            type="button">
            <b>B</b>
          </button>
          <button
            disabled={selectedWord.id === undefined}
            onClick={this.handleItalic}
            className={`format-action ${italic && 'active'}`}
            type="button">
            <i>I</i>
          </button>
          <button
            disabled={selectedWord.id === undefined}
            onClick={this.handleUnderline}
            className={`format-action ${underline && 'active'}`}
            type="button">
            <u>U</u>
          </button>
          <button
            disabled={selectedWord.id === undefined}
            onClick={handleGetSynonym}
            type="button">Sunonym</button>

          <button
            onClick={resetSelection}
            type="button">Reset</button>

          <button
            disabled={selectedWord.id === undefined}
            onClick={this.onTogglePicker}>
            Choose text color
          </button>

          {this.state.pickerVisible && (
            <div style={{ position: 'absolute' }}>
              <CompactPicker
                color="#333"
                onChangeComplete={this.handleColorChange}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ControlPanel;
