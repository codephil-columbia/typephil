import React from 'react';
import Spinner from 'react-spinkit';

const ShowSpinner = () => {
  const spinnerStyle = {
    width: '75px',
    height: '75px',
    marginTop: '25%',
    marginLeft: '48%',
    color: '#77BFA3',
  }
  return (
    <div>
      <Spinner name="circle" style={spinnerStyle}/>
    </div>
  )
}

export default ShowSpinner;