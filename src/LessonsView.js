import React, { Component } from 'react';

import showLessonStats from './components/lessonStats';
import Lock from './components/lock';


class LessonsView extends Component {
  constructor(props) {
    super(props);
    this.state = { currentSelectedLesson: this.props.lessons[0] };
  }

  userDidChangeLesson = (clickedLesson) => {
    this.setState({ currentSelectedLesson: clickedLesson });
  }

  hasCompletedLesson = (currentLesson, completed) => {
    if (completed === null) {
      return;
    }

    return completed.find(({ lessonID }) => {
      return currentLesson.LessonID === lessonID;
    });
  }

  render() {
    const {
      lessons,
      completed,
      doRestartLesson
    } = this.props;

    const { currentSelectedLesson } = this.state;
    const lessonStats = this.hasCompletedLesson(currentSelectedLesson, completed);

    let lessonStatView;
    if(lessonStats) {
      lessonStatView = showLessonStats(currentSelectedLesson, lessonStats, doRestartLesson);
    } else {
      lessonStatView = <Lock isMostRecentLesson={this.props.mostRecentLessonName === currentSelectedLesson.LessonName} />
    }

    return (
      <div className="container lesson-wrapper"> 
        <div className="container lesson-left">
          {lessons.map((lesson, i) => {
            if(lesson.LessonName === currentSelectedLesson.LessonName) { 
              return (
                <h4 
                  style={{color: 'green'}} 
                  key={i}
                  onClick={() => this.userDidChangeLesson(lesson)}>
                  {lesson.LessonName}
                </h4>
              )
          } else if (this.hasCompletedLesson(lesson, completed)) {
              return (
                <h4 style={{color: 'black'}}
                  key={i} 
                  onClick={() => this.userDidChangeLesson(lesson)}>
                  {lesson.LessonName}
                </h4>
              )
          } else {
              return (
                <h4 style={{color: 'grey'}} 
                  key={i}
                  onClick={() => this.userDidChangeLesson(lesson)}>
                  {lesson.LessonName}
                </h4>
              )
            }
          })}
        </div>
        <vl className="lesson-sep"/>
        <div className="container lesson-right">
          <div className="lesson-stats">
            {lessonStatView}
          </div>
        </div>
      </div>
    )
  }
}

export default LessonsView;