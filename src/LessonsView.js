import React, { Component } from 'react';

import showLessonStats from './components/lessonStats';
import Lock from './components/Lock';


class LessonsView extends Component {
  constructor(props) {
    super(props);

    const firstLesson = this.props.lessons[0];
    this.state = {
      currentSelectedLesson: firstLesson,
    }
  }

  userDidChangeLesson = (clickedLesson) => {
    this.setState({
      currentSelectedLesson: clickedLesson
    })
  }

  hasCompletedLesson = (currentLesson, completed) => {
    return completed.find(({ LessonID }) => {
      return currentLesson.LessonID === LessonID;
    });
  }

  render() {
    const { 
      lessons, 
      completed,
      chapterName
    } = this.props;

    const { 
      currentSelectedLesson, 
    } = this.state;

    const lessonStats = this.hasCompletedLesson(currentSelectedLesson, completed);
    const lessonStatView = lessonStats
      ? showLessonStats(currentSelectedLesson, lessonStats)
      : <Lock />

    return (
      <div className="container lesson-wrapper"> 
        <div className="container lesson-left">
          {lessons.map((lesson, i) => {
            if(lesson.LessonName === currentSelectedLesson.LessonName) { 
              return (<h4 style={{color: 'green'}} 
                key={i}
                onClick={() => this.userDidChangeLesson(lesson)}>
                {lesson.LessonName}
              </h4>)
          } else if (this.hasCompletedLesson(lesson, completed)) {
              return (<h4 style={{color: 'black'}}
                key={i} 
                onClick={() => this.userDidChangeLesson(lesson)}>
                {lesson.LessonName}
              </h4>)
          } else {
              return (<h4 style={{color: 'grey'}} 
                key={i}
                onClick={() => this.userDidChangeLesson(lesson)}>
                {lesson.LessonName}
              </h4>)
            }
          })}
        </div>
        <vl className="lesson-sep"/>
        <div className="container lesson-right">
          <div className="lesson-stats">
            { lessonStatView }
          </div>
        </div>
      </div>
    )
  }
}

export default LessonsView;