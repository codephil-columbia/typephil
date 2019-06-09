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
    if (!completed) {
      return;
    }
    return completed.find(({ lessonID }) => {
      return currentLesson.lessonID === lessonID;
    });
  }

  sortLessonsByName = (l1, l2) => {
    // We want Tests to be sorted to be the last lessons in each chapter
    if (l1.lessonName.includes("Test")) {
      return 1;
    } 
    
    if (l2.lessonName.includes("Test")) {
      return -1;
    }

    return l1.lessonName.localeCompare(l2.lessonName);
  }

  render() {
    const {
      lessons,
      completed,
      doRestartLesson
    } = this.props;
    console.log(this.props);

    const { currentSelectedLesson } = this.state;
    const lessonStats = this.hasCompletedLesson(currentSelectedLesson, completed);

    // Lessons don't come sorted
    this.props.lessons.sort(this.sortLessonsByName);

    let lessonStatView;
    if(lessonStats) {
      lessonStatView = showLessonStats(currentSelectedLesson, lessonStats, doRestartLesson);
    } else {
      lessonStatView = <Lock isMostRecentLesson={this.props.mostRecentLessonName === currentSelectedLesson.lessonName} />
    }

    return (
      <div className="container lesson-wrapper"> 
        <div className="container lesson-left">
          {lessons.map((lesson, i) => {
            if(lesson.lessonName === currentSelectedLesson.lessonName) { 
              return (
                <h4 
                  className='lesson-view-text'
                  style={{color: 'green'}} 
                  key={i}
                  onClick={() => this.userDidChangeLesson(lesson)}>
                  {lesson.lessonName}
                </h4>
              )
          } else if (this.hasCompletedLesson(lesson, completed)) {
              return (
                <h4
                  className='lesson-view-text' 
                  key={i} 
                  onClick={() => this.userDidChangeLesson(lesson)}>
                  {lesson.lessonName}
                </h4>
              )
          } else {
              return (
                <h4 
                  className='lesson-view-text'
                  style={{color: 'grey'}} 
                  key={i}
                  onClick={() => this.userDidChangeLesson(lesson)}>
                  {lesson.lessonName}
                </h4>
              )
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
