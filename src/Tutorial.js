import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getNextText } from './actions/tutorial';

import Header from './components/header';
import './style/Tutorial.scss'

class Tutorial extends Component {

  constructor(props) {
    super(props);

    this.state = {
      headerLinks: ["Learn", "Progress", "Home"],
    }
  }

  startLesson = () => {
    console.log("STARTING LESSON");
  }

  showTutorialDescriptions = () => {
    console.log("hello");
  }

  render() {
    const { headerLinks } = this.state;
    console.log(this.props);
    return (
      <div>
        <Header links={headerLinks}/>
        <div className="container tutorial">
          <div className="row tutorial-content">
            <h2>crr</h2>
          </div>
          <div className="row tutorial-keyboard">
            <h2>stuff</h2>
          </div>
          <button onClick={this.props.getNextText}>click</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getNextText }, dispatch);
}

export default connect(null, mapDispatchToProps)(Tutorial);


class PreTutorialInformation extends Component {

}

class TypingTutorial extends Component {

}