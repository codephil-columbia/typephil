import React from 'react';
import ReactDOM from 'react-dom';
import posed from 'react-pose';
import SplitText from 'react-pose-text';
import './styles.css';

const Box = posed.div({
  left: { x: 100},
  right:{x: -100},
  transition: {duration: 100}
});

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

class Example extends React.Component {
  state = { isVisible: true };

  componentDidMount() {
    setInterval(() => {
      this.setState({ isVisible: !this.state.isVisible });
    }, 1000);
  }

  render() {
    const { isVisible } = this.state;
    return <Box className="box" pose={isVisible ? 'left' : 'right'} > 
    Hi <img height="42" width="42" src="https://cdn.motor1.com/images/mgl/pAl1J/s3/mini-logo-2018.jpg"/>
    </Box>;
  }
}

ReactDOM.render(<Example />, document.getElementById('root'));