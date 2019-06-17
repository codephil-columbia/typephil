import React, { Component, Fragment } from 'react';

import LessonTutorialButtons from './components/TutorialButtons';
import TutorialContent from './components/TutorialContent';
import Header from './components/header';
import Keyboard from './components/Keyboard';
import RightHand from './components/RightHand';
import LeftHand from './components/LeftHand';
import ShowSpinner from './components/spinner';
import TutorialStats from './components/TutorialStats';
import TutorialImage from './components/TutorialImage';

import { TutorialService, LocalStorageCache } from './services';

import './style/Tutorial.css'

const TutorialSource = Object.assign({
  LearnPage: "LearnPage",
  HomePage: "HomePage"
});

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.tutorialService = new TutorialService();
    this.cache = new LocalStorageCache();

    this.state = {
      uid: this.cache.get("uid"),
      username: this.cache.get("username"),
      isLoading: true,

      currentLesson: {},
      contentList: [],
      contentTypeList: [],
      lessonDescriptions: [],
      totalContentLength: 0,
      lessonImages: [],
      content: "",
      correctCount: 0,
      headerLinks: [],
      indexPtr: 0,
      shouldFreeze: true,
      totalTime: 0,
      userState: this.appState.READING,
      isFinished: false,
      wpm: 0,
      shouldShowStats: false,
      didUserPassLesson: true,
      results: {
        totalTime: 0,
        totalLength: 0,
        totalIncorrect: 0,
      },
      resultsForCurrentLesson: {
        time: 0,
        length: 0,
        incorrect: 0
      },

      nextURLLocation: ""
    };

    this.fetchNextLesson = this.fetchNextLesson.bind(this);
  }

  componentWillMount = () => {
    this.freezeTimerIfIsLessonText();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPressed);
  }

  async componentDidMount() {
    document.addEventListener('keydown', this.onKeyPressed);
    this.setState({
      results: {
        totalTime: 0,
        totalLength: 0,
        totalIncorrect: 0,
      },
      wpm: 0,
      totalTime: 0,
    })

    this.setState({ isLoading: true });

    if(this.cache.get("tutorial").pageSource === "LearnPage") {
      this.setState({ nextURLLocation: "LearnPage" });

      const [currentLesson, chapter] = await Promise.all([
        this.tutorialService.getLesson(this.cache.get("lessonID")),
        this.tutorialService.getChapter(this.cache.get("chapterID"))
      ]).catch(err => console.log(err));

      this.setUpTutorial(currentLesson, chapter);
    } else {
      this.setState({ nextURLLocation: "TutorialPage" });

      const { lesson, chapter } = (
        await this.tutorialService.getTutorialInfo(this.state.uid)
          .catch(err => console.log(err))
      );
      this.setUpTutorial(lesson, chapter);
    }
  }

  setUpTutorial(lesson, chapter) {
    const { lessonDescriptions, lessonText, lessonImages } = lesson;

    const contentList = [];
    const contentTypeList = [];
    lessonText.forEach((val, i) => {
      if(val !== "") {
        contentList.push(val);
        contentTypeList.push(this.contentType.TEXT)
      }
      if(lessonDescriptions[i] !== "") {
        contentList.push(lessonDescriptions[i]);
        contentTypeList.push(this.contentType.DESCRIPTION);
      }
    });
    const totalContentLength = contentList.length;
    lesson.chapterName = chapter.chapterName;

    this.setState({
      currentLesson: lesson,
      contentList,
      contentTypeList,
      lessonDescriptions, 
      lessonText,
      lessonImages,
      totalContentLength,
      content: contentList[0],

      isLoading: false
    });
    this.freezeTimerIfIsLessonText();
  }

  isLastContent = () => {
    return (this.state.indexPtr + 1) >= this.state.contentList.length;
  }

  onKeyPressed = (e) => {
    let isRightKey = ['ArrowLeft', 'ArrowRight'].indexOf(e.key);
    switch(isRightKey) {
      case 1: {
        if(this.isLastContent()) {
          this.saveTutorialResultAndRedirect();
        } else {
          if (
            this.state.userState === this.appState.READING
            || this.state.isFinished) {
            this.next();
          }
        }
        break;
      }
      case 0: {
        this.prev();
        break;
      }
      default: {
        return;
      }
    }
  };

  appState = Object.freeze({
    COMPLETED_TUTORIAL: "completed",
    READING: "reading",
    TYPING: "typing",
  });

  // As specified in the database, lesson descriptions is what people type, 
  // and lesson text is what people read
  contentType = Object.freeze({
    DESCRIPTION: "description",
    TEXT: "text"
  })

  updateResults = ({ time, length, incorrect }) => {
    let { totalTime, totalLength, totalIncorrect } = this.state.results;
    totalIncorrect += incorrect;
    totalTime += time;
    totalLength += length;

    const accuracy = (totalLength - totalIncorrect) / totalLength;
    if(accuracy < .69) {
      this.setState({ 
        didUserPassLesson: false,
        results: {
          totalTime,
          totalIncorrect,
          totalLength
        }, resultsForCurrentLesson: {
          time,
          length,
          incorrect
        }
      });
    } else {
      this.setState({
        results: {
          totalTime,
          totalLength,
          totalIncorrect
        }, resultsForCurrentLesson: {
          time, 
          length, 
          incorrect
        },
        didUserPassLesson: true
      });
    }
  }

  clearStatsForCurrentLesson = () => {
    this.setState({ resultsForCurrentLesson: { time: 0, length: 0, incorrect: 0 } });
  }

  setTutorialStats = ({ wpm, time, accuracy }) => {
    this.setState({ wpm, accuracy, time });
  }

  calculateTime = txt => {
    return (txt.length/5) * 60/200 * 100;
  };

  setAppState = indexPtr => {
    if (this.state.contentTypeList[indexPtr] === this.contentType.DESCRIPTION) {
      this.setState({ userState: this.appState.TYPING });
    } else {
      this.setState({ userState: this.appState.READING });
    }
  }

  next = () => {
    let { indexPtr, totalContentLength } = this.state;
    if(indexPtr < totalContentLength) {
      indexPtr += 1;
      this.freezeTimerIfIsLessonText();
    }
    this.clearStatsForCurrentLesson();
    this.setAppState(indexPtr);
    this.setState({ indexPtr, shouldShowStats: false, isFinished: false });
  };

  prev = () => {
    let { indexPtr } = this.state;
    const { time, length, incorrect} = this.state.resultsForCurrentLesson;
    const { totalIncorrect, totalTime, totalLength } = this.state.results;
    if(indexPtr - 1 < 0) {
      indexPtr = 0;
    } else {
      indexPtr -= 1;
    }
    
    this.setAppState(indexPtr);
    this.setState({ 
      indexPtr, 
      shouldShowStats: false,
      results: {
        totalTime: totalTime - time,
        totalLength: totalLength - length,
        totalIncorrect: totalIncorrect - incorrect
      }
    });
    this.clearStatsForCurrentLesson();
  };

  getContent = (indexPtr) => {
    const { contentList, contentTypeList } = this.state;

    if(indexPtr >= contentList.length) {
      return { 
        content: null, 
        userState: this.appState.COMPLETED_TUTORIAL
      };
    }
    
    let userState;
    if(contentTypeList[indexPtr] === this.contentType.TEXT) {
      userState = this.appState.READING;
    } else {
      userState = this.appState.TYPING 
    }

    const content = contentList[indexPtr];
    return { content, userState };
  };

  freezeTimerIfIsLessonText = () => {
    const { indexPtr, contentList } = this.state;
    if(!contentList[indexPtr]) {
      return;
    }
    const totalTime = this.calculateTime(contentList[indexPtr]);
    this.setState({ shouldFreeze: true });
    setTimeout(() => {
      this.setState({ shouldFreeze: false });
    }, totalTime);
  };

  saveTutorialResultAndRedirect = () => {
    const { results, uid } = this.state;
    const { chapterID, lessonID } = this.state.currentLesson;

    if (results.totalLength.size === 0) {
      this.tutorialService.saveTutorialResult({
        chapterID,
        lessonID,
        uid,
        wpm: null, 
        accuracy: null,
      });
    } else {
      this.tutorialService.saveTutorialResult({
        uid,
        chapterID,
        lessonID,
        wpm: Math.trunc((results.totalLength / 5) / ((results.totalTime)/60)),
        accuracy: ((results.totalLength - results.totalIncorrect) / results.totalLength) * 100
      });
    }

    this.fetchNextLesson();
    this.redirect("tutorial");
  }

  fetchNextLesson() {
    const pageSource = this.cache.get("tutorial").pageSource;

    if (pageSource === TutorialSource.LearnPage) {
      this.setTutorialCacheForNextLesson(this.state.currentLesson);
    }
  }

  setTutorialCacheForNextLesson({ nextLessonID }) {
    const { lessonID, chapterID } = this.tutorialService.getLesson(nextLessonID);
    this.cache.set("lessonID", lessonID);
    this.cache.set("chapterID", chapterID); 
  }

  redirect(to) {
    window.location = `/${to}`;
  }

  showStats = () => {
    this.setState({ shouldShowStats: true });
  }

  isFinished = () => {
    this.setState({ isFinished: true });
  }

  render() { 
    const { 
      headerLinks,
      shouldFreeze,
      indexPtr,
      shouldShowStats,
      didUserPassLesson,
      resultsForCurrentLesson,
      lessonImages,
      username
    } = this.state;
    
    if (this.state.isLoading) {
      return <ShowSpinner />
    }

    const { content, userState } = this.getContent(indexPtr);

    let hasImage;
    let imagePath;
    if(userState === this.appState.READING && lessonImages[indexPtr] !== "") {
      hasImage = true;
      imagePath = lessonImages[indexPtr];
    } else {
      hasImage = false;
    }

    return (
      <Fragment>
        <Header links={headerLinks} isLoggedIn={true} username={username} 
        isTutorial={true} tutorialInfo={this.state.currentLesson}/>
        <div className="container-tutorial container tutorial">
          {userState === this.appState.READING ? (
            <div className="info-text">
              <div className="tutorial-text">{content}</div>
                {hasImage ? (
                  <TutorialImage path={imagePath} />
                ) : (
                  <div className="tutorial-hands-keyboard">
                    <LeftHand />
                    <Keyboard />
                    <RightHand />
                  </div>
                )}
            </div>
          ) : (
            <TutorialContent
              currentContent={content}
              completedStats={this.setTutorialStats}
              updateResults={this.updateResults}
              currentUser={this.props.currentUser}
              showStats={this.showStats}
              isFinished={this.isFinished}
            />
          )}{shouldShowStats && (
            <TutorialStats 
              time={resultsForCurrentLesson.time}
              length={resultsForCurrentLesson.length}
              incorrect={resultsForCurrentLesson.incorrect}
              didUserPassLesson={didUserPassLesson}
            />
          )}
          <LessonTutorialButtons 
            currentPageIndex={indexPtr}
            totalNumOfPages={this.state.contentList.length}
            next={this.next}
            prev={this.prev}
            isFinished={this.state.isFinished}
            isLastContent={this.state.indexPtr + 1 >= this.state.contentList.length}
            saveTutorialResultAndRedirect={this.saveTutorialResultAndRedirect}
            shouldFreeze={shouldFreeze}
            userState={userState}
            didUserPassLesson={didUserPassLesson}
          />
        </div>
      </Fragment>
    )
  }
}

export default Tutorial;
