import React from 'react';

const splitBadgeDescriptionByLine = desc => {
  return desc.split('\n');
}

const contentClass = ['square', 'circle', 'badge'];

const avgUserStat = (
  badge, 
  stat,
  content_class
) => {

  return (
    <div className="column badge">
      <div className="badge-content" id={contentClass[content_class]}>
        <h1>{Math.round(stat*10)/10}</h1>
      </div>
    </div>
  )
}

export default avgUserStat;
