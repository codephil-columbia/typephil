import React from 'react';

const List = () => {

}

const ListItem = (items, style) => {
  return (
    <ul>
      {items.forEach(element => <li>{element}</li>)}
    </ul>
  )
}