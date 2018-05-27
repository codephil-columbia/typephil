import React, { Component }from 'react';

class ChaptersView extends Component {
  clickedChapter = (e, i) => {
    const chapterPos = e.target.dataset['id'];
    this.props.userDidClickChapter(chapterPos);
  }

  removeChapterNumbers = (chapters) => {
    return chapters.map(e => e.split(":")[1].trim());
  }

  render() {
    let { chapters } = this.props;
    chapters = this.removeChapterNumbers(chapters);  
    return (
        <div className="block-info">
          <div className="chapter-info">
          {chapters.map((chapter, i) => {
            return (
              <div className="chapter" key={i}>
                <div className="chapter-num">
                  <h4 className="num">{i}</h4>
                </div>
                <div className="chapter-name">
                  <h3 onClick={this.clickedChapter} data-id={i}>{chapter}</h3>
                </div>
              </div>
            )
          })}
          </div>
        </div>
    )
  }
}

export default ChaptersView;