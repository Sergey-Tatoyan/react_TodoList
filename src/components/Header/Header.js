import React from 'react';

import './Header.css';

const Header = ({ doneCount, notDoneCount }) => {
  return (
    <>
      <h1>Todo List</h1>
      <div className="stats">
        { notDoneCount } more todo, { doneCount } done
      </div>
    </>
  );
};

export default Header;