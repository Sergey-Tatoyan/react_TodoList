import React from 'react';

import ListItem from '../ListItem';

import './List.css';

const List = ({ todoList, onDeleted, onImportant, onDone }) => {

  const elements = todoList.map((list) => {
    return (
      <ListItem
        label={list}
        key={list.id}
        onDeleted={onDeleted}
        onImportant={onImportant}
        onDone={onDone}
      />
    );
  });

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  );
};

export default List;