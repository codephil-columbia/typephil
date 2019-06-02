// @flow
import {
  GET_CURRENT_LESSON
} from '../actions/homepage';

let tutorialState = {
  chapterID: "",
  image: [],
  lessonDescriptions: [],
  lessonID: "",
  lessonName: "",
  lessonText: [],
  minimumScoreToPass: [],
  chapterName: ""
};

const tutorialReducer = (state = tutorialState, action) => {
  switch(action.type) {
    case GET_CURRENT_LESSON:
    const { currentChapter, currentLesson } = action.data;
    return {
      ...state,
      chapterID: currentChapter.chapterID,
      image: currentLesson.image,
      lessonDescriptions: currentLesson.lessonDescriptions,
      lessonID: currentLesson.lessonID,
      lessonName: currentLesson.lessonName,
      lessonText: currentLesson.lessonText,
      minimumScoreToPass: currentLesson.minimumScoreToPass,
      chapterName: currentChapter.chapterName,
      chapterImage: currentChapter.chapterImage
    }
    default:
    return state;
  }
}

export default tutorialReducer;