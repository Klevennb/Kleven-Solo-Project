import React, { Component } from 'react';
import { MegadraftEditor, editorStateFromRaw } from "megadraft";
import { editorStateToJSON } from 'megadraft/lib/utils';
import '../TextEditor/megadraft.css';
import './TextEditor.css';
import {connect} from 'react-redux';
// import Timer from '../Timer/Timer';
import PromptButton from '../TextEditor/TextEditorPrompts/PromptButton'
import CreativeWritingPrompt from '../TextEditor/TextEditorPrompts/CreativeWritingPrompt';
import Genre from '../Genre/Genre';
import PinnedPrompt from './TextEditorPrompts/PinnedPrompt';
import PropTypes from 'prop-types'; //materialUI stuff
// import classNames from ' ';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import brown from '@material-ui/core/colors/brown';

var moment = require('moment');  //needed to timestamp submission

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});
class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: editorStateFromRaw(null), title: '',entry_length: ''};
  }
  componentDidMount(){
    this.clearPinnedPrompt();
  }
  clearPinnedPrompt = () => {
    let action = {
      type: 'PIN_PROMPT',
      payload: []
    }
    this.props.dispatch(action);
  }
  onChange = (editorState) => {  //on change in the editor
    this.setState({ editorState });
  }
  saveContent = () => {
    const pinPrompt = this.props.pinnedPrompt;
    // // pinPrompt = this.props.pinnedPrompt;
    const {editorState} = this.state;
    const content = { text: editorStateToJSON(editorState), title: this.state.title, genre: this.props.genreSave, entry_length: this.wordsLeft(), entry_prompt: pinPrompt, subTime: moment()._d };
      //once tags are added, make sure all info is added before you can save
    console.log(content);
    console.log(this.props.pinnedPrompt);
    
    if (this.state.title !== '') {
      const action = {type: 'ADD_ENTRY', payload: content}
      this.props.dispatch(action);
    } else {
        alert("Make sure to name your story!");;
    }
    this.props.history.push("/home")
  }
  buttonStyling = () => {
      const { classes } = this.props;
      return (
        <div>
          <Button variant="contained" onClick={this.saveContent} color="primary" className={this.button}>
            Save
          </Button>
        </div>
      );
  }
  
 countWords = (s) => {   //word counter found on stack overflow. Counts line breaks as 16 words.
     s = s.replace(/(^\s*)|(\s*$)/gi, "");//exclude  start and end white-space
     s = s.replace(/[ ]{2,}/gi, " ");//2 or more space to 1
     s = s.replace(/\n /, "\n"); // exclude newline with a start spacing
     return s.split(' ').filter(function (str) { return str !== ""; }).length;
      //return s.split(' ').filter(String).length; - this can also be used
 }
  wordsLeft = () => {
    let wordsInEditor = editorStateToJSON(this.state.editorState);
    let wordsCounted = this.countWords(wordsInEditor);
    let wordsTilGoal = 500;
    // this.setState({ entry_length: wordsTilGoal - (wordsCounted - 21) })
    return wordsTilGoal - (wordsCounted-21); //21 is the length of the JSON string
  }
  titleChange = (event) => {
    this.setState({ title: event.target.value })
  }

  render() {
    return (
      <div >
        <div className="editor-header header">
          <div className="editor-header">
            <h2>Title:</h2>
            <input className="title" placeholder="Title" onChange={this.titleChange}></input>
          </div>
          
          <h3>Words Til Goal: {this.wordsLeft()}</h3>
        </div>
          {/* <Timer onSaveClick={this.handleTimeChange} 
            saveContent={this.saveContent}/> */}
        
      
        <PromptButton />
        <div className="pinned-content"><PinnedPrompt /></div>
        
        <div id="editorContainer">        
          <MegadraftEditor
          editorState={this.state.editorState}
          onChange={this.onChange} />
        </div>

        {this.buttonStyling()}
        {/* <CreativeWritingPrompt /> */}
        <Genre />
      </div>
    );
  }
}
TextEditor.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStoreToProps = state => ({
  genreSave: state.genreSave,
  pinnedPrompt: state.pinnedPrompt
});
export default connect(mapStoreToProps)(TextEditor);