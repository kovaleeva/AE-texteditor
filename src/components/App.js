import React, { Component } from 'react';
import '../styles/App.css';
import { getSynonymsFromApi } from '../helpers/synonym.service';
import ControlPanel from "./ControlPanel";
import FileZone from "./FileZone";
import Synonyms from "./Synonyms";
import getMockText from '../helpers/text.service';

class App extends Component {
  state = {
    counter: 0,
    text: [],
    defaultText: [],
    selectedWord: {},
    synonyms: [],
  };

  componentDidMount = () => {
    this.getText();
    // const { editor } = this.refs;
    // const draftEditor = editor.refs.editor;
    // draftEditor.setAttribute('data-gramm', 'false');
  }

  getText = () => {
    getMockText().then((result) => {
      this.defaultText = result;
      this.setText(result)
    });
  }

  handleClickWord = (wordId) => {
    let words = [...this.state.text];
    let deselectIndex = words.findIndex(i => i.selected);

    words[deselectIndex] = { ...words[deselectIndex], selected: false };
    words[wordId] = { ...words[wordId], selected: true };

    this.setState({
      synonyms: [],
      text: words,
      selectedWord: words[wordId],
    });
  }

  handleChangeWord = (data) => {
    const { id } = this.state.selectedWord;
    let words = [...this.state.text];

    words[id] = { ...words[id], ...data };

    this.setState({
      text: words,
      selectedWord: words[id],
    });
  }

  resetSelection = () => {
    this.setText(this.defaultText);
    this.setState({
      selectedWord: {},
      synonyms: [],
    });
  }

  setText = (result) => {
    const text = result.split(' ')
      .filter(item => item.length !== 0)
      .map((word, i) => ({
        id: i,
        value: word,
        italic: false,
        bold: false,
        underline: false,
        isSelected: false,
        color: '#000',
      }));

    this.setState({
      text,
    });
  }

  addText = (e) => {
    const { value } = e.target.text;
    e.preventDefault();
    this.setText(value);
  }

  handleGetSynonym = async () => {
    const result = await getSynonymsFromApi(this.state.selectedWord.value);

    this.setState({
      synonyms: result.map(syn => syn.word)
    })
  }

  render() {
    const { text, selectedWord, synonyms } = this.state;

    return (
      <div className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          <ControlPanel
            resetSelection={this.resetSelection}
            selectedWord={selectedWord}
            handleChangeWord={this.handleChangeWord}
            handleGetSynonym={this.handleGetSynonym}
          />
          {selectedWord.id !== undefined && (
            <Synonyms
              synonyms={synonyms}
              handleChangeWord={this.handleChangeWord}
            />
          )}
          <FileZone
            handleClickWord={this.handleClickWord}
            addText={this.addText}
            textArray={text}
          />
        </main>
      </div>
    );
  }
}

export default App;
