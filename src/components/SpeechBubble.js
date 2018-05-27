import React from 'react';


const SpeechBubble = ({ text, active }) => {
  if(!active) 
    return <div></div>
  return (
      <svg width="100%" height="100%" viewBox="0 0 1113 95" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <title>Speech Bubble </title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Tutorial-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-164.000000, -219.000000)" opacity="0.5">
            <g id="Speech-bubble" transform="translate(164.000000, 219.000000)" fill="#B5DCCD">
                <g id="Speech-Bubble-">
                    <rect id="Rectangle-12" x="0" y="0" width="100%" height="76.369863" rx="10"></rect>
                    <polygon id="Triangle-2" transform="translate(22.500000, 85.136986) scale(1, -1) translate(-22.500000, -85.136986) " points="7 75.2739726 38 95 15.1482349 95"></polygon>
                    <text id="myText" fontSize="25" fontFamily="arial" fill="black">
                        <tspan x="5" y="20">{text}</tspan>
                        {/* {text} */}
                    </text>
                </g>
            </g>
        </g>
      </svg>
  )
}

export default SpeechBubble;