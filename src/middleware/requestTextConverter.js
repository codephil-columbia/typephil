import { GET_CURRENT_LESSON } from '../actions/homepage';

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
     }
     return next(action);
}

function convertPlaceholdersToActualText(text, action) {
    return text.replace(
        CONVERTERS[action].regex,
        CONVERTERS[action].text
    );
}

/**
 * Put hard coded special characters inside the regex, and what it maps to as the text
 */
const CONVERTERS = {
    GET_CURRENT_LESSON: {
        regex: /&#59/g,
        text: ';'
    }
}

export default requestTextConverter;