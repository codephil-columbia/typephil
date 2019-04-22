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
    const Box2 = styler(document.querySelector('.box2'));
    const Box3 = styler(document.querySelector('.box3'));

    tween({
      from: {x:-2000, y:-250},

      to: { x: 1000, y:-250},
      duration: 8000,
      //flip: Infinity,
      // elapsed: 500,
      loop: 5,
      // yoyo: 5
    }).start(Box.set);

    tween({
      from: {x:-3000, y: -25},

      to: { x: 1000, y: -25},
      duration: 10000,
      //flip: Infinity,
      // elapsed: 500,
      loop: 5,
      // yoyo: 5
    }).start(Box2.set);

    tween({
      from: {x:-1000, y:200},

      to: { x: 1000, y:200 },
      duration: 12000,
      //flip: Infinity,
      // elapsed: 500,
      loop: 5,
      // yoyo: 5
    }).start(Box3.set);



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
      <div>
      <div className="box">Hello
      <img height="auto" width="100%" src="./images/games/Meteor.svg"/>
      </div>

      <div className="box2">Hel
      <img height="auto" width="100%" src="./images/games/Meteor.svg"/>
      </div>

      <div className="box3">He
      <img height="auto" width="100%" src="./images/games/Meteor.svg"/>
      </div>
      </div>
    );
  }
}

export default (Animation);