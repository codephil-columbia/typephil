import React from 'react';

const splitBadgeDescriptionByLine = desc => {
  return desc.split('\n');
}

const contentClass = ['square', 'circle', 'badge'];

const avgUserStat = (
  badge, 
  stat,
  content_class,
  badgeDescriptions
) => {

  const badgeDescSplit = splitBadgeDescriptionByLine(badgeDescriptions);

  return (
    <div className="column badge">
      <div className="badge-content" id={contentClass[content_class]}>
        <h1>{Math.round(stat*10)/10}</h1>
      </div>
      <div className="badge-description" align="left">
        <h3 className="badge-name">Mean {badge}</h3>
        <p>
          {badgeDescSplit.map(desc => {
            return <span>{desc}<br></br></span>
          })}
        </p>
      </div>
    </div>
  )
}

export default avgUserStat;
