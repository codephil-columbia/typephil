import React from 'react';
import ReactDOM from 'react-dom';
import posed from 'react-pose';
import SplitText from 'react-pose-text';
import { tween } from 'popmotion';
import { styler } from 'popmotion';
import './style/animation.css';



const charPoses = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 30
  }
};

function App() {
  return (
    <div className="container">
      <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
        React Pose Text
      </SplitText>
    </div>
  );
}

class Animation extends React.Component {
  state = { isMoving: true };

  componentDidMount() {
    const Box = styler(document.querySelector('.box'));

    tween({
      from: {x:-1000, y:100},

      to: { x: 1000, y:100 },
      duration: 3000,
      //flip: Infinity,
      // elapsed: 500,
      loop: 5,
      // yoyo: 5
    }).start(Box.set);

    setInterval(() => {
      this.setState({ isMoving: !this.state.isMoving });
    }, 2000);
  }

  render() {
    const { isMoving } = this.state;
    return (
      // <Box className="box" pose={isMoving ? 'left' : 'right'}> 
        // Hi <img height="42" width="42" src="./Meteor2.svg"/>
      // </Box>
      <div className="box">Hello
      <img height="auto" width="100%" src="./images/games/Meteor.svg"/>
      </div>
    );
  }
}

export default (Animation);