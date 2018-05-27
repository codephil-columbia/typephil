import React from 'react';

const splitBadgeDescriptionByLine = desc => {
  return desc.split('\n');
}

const avgUserStats = (
  badgeList, 
  badgeDescriptions, 
  stats
) => {

  return (
    <div className="row">
      {badgeList.map((badge, i) => {
        const badgeDescSplit = splitBadgeDescriptionByLine(badgeDescriptions[i]);
        return (
          <div className="column badge" key={i}>
            <div className="badge-content">
              <h1>{stats[i]}</h1>
            </div>
            <div className="badge-description">
              <h3><strong>{badge}</strong></h3>
              <p>
                {badgeDescSplit.map(desc => {
                  return <span>{desc}<br></br></span>
                })}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default avgUserStats;