import React, { Component } from 'react';

class LessonTutorialContent extends Component {
  constructor(props) {
    super(props);

    let currentGroup = this.buildRows(this.props.currentContent);
    let nextGroup = this.buildRows(this.props.nextContent);

    console.log(currentGroup, nextGroup);

    this.state = {
    };
  }

  buildRows = (content) => {
    let rows = [];
    if(content === undefined) {
      return rows;
    }

    rows.push(this.breakInto30CharacterRows(content));
    if(rows[0] !== null) {
      rows = rows[0].map((content, i) => this.buildRow(content, i));
    }
    console.log(rows);
    return rows;
  }

  buildRow = (content, i) => {
    let row;
    return <div className="row" key={i}>
        <h1 className="column column-10"></h1>
        <h1 className="column content-column">{content.trim()}</h1>
        <h1 className="column column-10"></h1>
      </div>
  }

  breakInto30CharacterRows = (line) => {
    return line.match(/.{1,30}/g);
  }

  render() {
    const { isActive, currentContent, nextContent } = this.props;
    let currentGroup = this.buildRows(currentContent);
    let nextGroup = this.buildRows(nextContent);

    console.log(currentGroup, nextGroup);
    
    if(!isActive) {
      return <div>notactive</div>
    }

    return (
      <div className="container">
        {currentGroup}
      </div>
    )
  }
}

export default LessonTutorialContent;