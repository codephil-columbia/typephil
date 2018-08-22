import React from 'react';
import ReactSVG from 'react-svg'


const TutorialImage = ({ path }) => {
  return <ReactSVG path={path} svgStyle={{ maxHeight: 400, maxWidth: 800 }} />
}

export default TutorialImage;