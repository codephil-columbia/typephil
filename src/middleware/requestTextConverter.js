export function applyTextTransformer(obj) {
    // Transform array of lessons or single lesson
    if (Array.isArray(obj)) {
        obj = obj.map(transformTutorialSpecialCharacters);
    } else {
        obj = transformTutorialSpecialCharacters(obj)
    }
    return obj;
}

function transformTutorialSpecialCharacters(lesson) {
    const { lessonDescriptions, lessonText, lessonName } = lesson;

    lesson.lessonDescriptions = lessonDescriptions.map(
        text => convertPlaceholdersToActualText(text, converters.REPLACE_TO_COMMA)
    );

    lesson.lessonText = lessonText.map(
        text => convertPlaceholdersToActualText(text, converters.REPLACE_TO_COMMA)
    );

    lesson.lessonName = convertPlaceholdersToActualText(lessonName, converters.REPLACE_TO_COMMA);

    return lesson
}

function convertPlaceholdersToActualText(text, action) {
    return text.replace(
        CONVERTER_MAP[action].regex,
        CONVERTER_MAP[action].text
    );
}

/**
 * Put hard coded special characters inside the regex, and what it maps to as the text
 */
const CONVERTER_MAP = {
    REPLACE_TO_COMMA: {
        regex: /&#59/g,
        text: ';'
    },
}

const converters = Object.assign({
    REPLACE_TO_COMMA: "REPLACE_TO_COMMA"
})
