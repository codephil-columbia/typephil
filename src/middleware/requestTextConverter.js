import { GET_CURRENT_LESSON } from '../actions/homepage';
import { FETCH_ALL_PAIRS_SUCCESS, FETCH_LESSON_BY_ID_SUCCESS } from '../actions/learn';

/**
 * Put hard coded special characters inside the regex, and what it maps to as the text
 */
const CONVERTERS = {
    GET_CURRENT_LESSON: {
        regex: /&#59/g,
        text: ';'
    },
    FETCH_ALL_PAIRS_SUCCESS: {
        regex: /&#59/g,
        text: ';'
    },
    FETCH_LESSON_BY_ID_SUCCESS: {
      regex: /&#59/g,
      text: ';'    
    }
}

/**
 * 
 * Since we had trouble including some characters in PSQL (';', etc)
 * this middleware will for now check all of the requests that deliver lesson text that could
 * potentially include some of these weird characters.
 */
const requestTextConverter = _ => next => action => {
     switch(action.type) {
         case GET_CURRENT_LESSON:
            const { lessondescriptions, lessontext } = action.data;
            action.data.lessondescriptions = lessondescriptions.map(
                (desc) => convertPlaceholdersToActualText(desc, GET_CURRENT_LESSON)
            );
            action.data.lessontext = lessontext.map(
                (text) => convertPlaceholdersToActualText(text, GET_CURRENT_LESSON)
            );
            action.data.lessonname = convertPlaceholdersToActualText(action.data.lessonname, GET_CURRENT_LESSON);
            break;
        case FETCH_ALL_PAIRS_SUCCESS:
            action.data.forEach((group, i) => {
                group.lessons = group.lessons.map((lesson) => {
                    lesson.LessonName = convertPlaceholdersToActualText(lesson.LessonName, FETCH_ALL_PAIRS_SUCCESS);
                    return lesson;
                })
                action.data[i] = group;
            });
            break;
        case FETCH_LESSON_BY_ID_SUCCESS:
          const { LessonDescriptions, LessonText } = action.data;
          action.data.LessonDescriptions = LessonDescriptions.map(
              (desc) => convertPlaceholdersToActualText(desc, FETCH_LESSON_BY_ID_SUCCESS)
          );
          action.data.LessonText = LessonText.map(
              (text) => convertPlaceholdersToActualText(text, FETCH_LESSON_BY_ID_SUCCESS)
          );
          action.data.LessonName = convertPlaceholdersToActualText(action.data.LessonName, FETCH_LESSON_BY_ID_SUCCESS);
          break;
        default:
          break;
     }
     return next(action);
}

function convertPlaceholdersToActualText(text, action) {
    return text.replace(
        CONVERTERS[action].regex,
        CONVERTERS[action].text
    );
}

// 34 => ""

export default requestTextConverter;