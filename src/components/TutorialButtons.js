import React from 'react';
import '../style/LessonTutorialButtons.css'


const LessonTutorialButtons = ({ shouldFreeze, next, prev, isLastContent, redirectToNextLesson }) => {
  if(shouldFreeze)
    return "";
  return (
    <div className="lesson-buttons">
        { /* Empty div so that the next button stays anchored to the right side */ } 
        {!isLastContent ? <BackButton prev={prev} /> : <div></div>}
        <NextButton 
            next={isLastContent ? redirectToNextLesson : next}
            shouldRedirectToNextLesson={isLastContent} 
        />
    </div>
  )
}

const BackButton = ({ prev }) => (
    <React.Fragment>
        <svg width="170px" height="57px" viewBox="0 0 170 57" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <title>Previous Arrow</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="Tutorial-3" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-125.000000, -836.000000)">
                <g id="Previous/Next-Buttons" transform="translate(131.000000, 840.000000)">
                    <g id="Previous-Arrow">
                        <text 
                            cursor="pointer" 
                            id="Previous" 
                            onClick={prev} 
                            fontFamily="AvenirNext-DemiBold, Avenir Next" 
                            fontSize="25" 
                            fontWeight="500" 
                            fill="#9B9B9B">
                            <tspan x="67" y="32">Previous</tspan>
                        </text>
                        <polygon 
                            cursor="pointer" 
                            id="Triangle" 
                            onClick={prev} 
                            stroke="#AAAAAA" 
                            strokeWidth="5" 
                            transform="translate(24.500000, 24.500000) scale(-1, 1) rotate(90.000000) translate(-24.500000, -24.500000)" 
                            points="24.5 0 49 49 0 49">
                        </polygon>
                    </g>
                </g>
            </g>
        </svg>
    </React.Fragment>
)

const NextButton = ({ next, shouldRedirectToNextLesson }) => (
    <React.Fragment>
        <svg width="134px" height="57px" viewBox="0 0 134 57" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <title>Next Arrow</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g id="Tutorial-3" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-1179.000000, -837.000000)">
              <g id="Previous/Next-Buttons" transform="translate(131.000000, 840.000000)">
                  <g id="Next-Arrow" transform="translate(1047.000000, 1.000000)">
                      <text 
                        cursor="pointer" 
                        onClick={next} 
                        id="Next" 
                        fontFamily="AvenirNext-DemiBold, Avenir Next" 
                        fontSize="25" 
                        fontWeight="500" 
                        fill="#52B094">
                        <tspan y="31" x="0">
                            {shouldRedirectToNextLesson ? "Next" : "Next"}
                        </tspan>
                      </text>
                      <polygon 
                        cursor="pointer" 
                        onClick={next} 
                        id="Triangle" 
                        stroke="#52B094" 
                        strokeWidth="5" 
                        transform="translate(104.500000, 24.500000) rotate(90.000000) translate(-104.500000, -24.500000)" 
                        points="104.5 0 129 49 80 49">
                      </polygon>
                  </g>
              </g>
          </g>
      </svg>
    </React.Fragment>
)

export default LessonTutorialButtons;