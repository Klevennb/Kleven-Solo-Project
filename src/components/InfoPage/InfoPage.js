import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'
const InfoPage = () => (
  <div>
    <p>
      Technologies Used:

      React.js
      MegadraftEditor
      Node.js/Express.js
      Material UI
      HTML/css
      Ajax/Axios
      PostgreSQL
    </p>
  </div>
);

export default InfoPage;

// //Test page for text editor
// import React, { Component } from 'react';
// import ReactDOM from "react-dom";
// import { MegadraftEditor, editorStateFromRaw } from "megadraft";
// import '../TextEditor/megadraft.css';
// // This is one of our simplest components
// // It doesn't have local state, so it can be a function component.
// // It doesn't dispatch any redux actions or display any part of redux state
// // or even care what the redux state is, so it doesn't need 'connect()'

// class InfoPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { editorState: editorStateFromRaw(null) };
//   }
//   onChange = (editorState) => {
//     this.setState({ editorState });
//   }

//   render() {
//     return (
//       <div>
//         <p>
//           Info Page
//         </p>
//         <MegadraftEditor
//           editorState={this.state.editorState}
//           onChange={this.onChange} />
//       </div>
//     );
//   }
// }
// ReactDOM.render(
//   <InfoPage />,
//   document.getElementById('react-root')
// );
// export default InfoPage;
