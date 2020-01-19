import React, { Component } from 'react';

import Header from '../Header';
import Filter from '../Filter';
import List from '../List';
import AddItem from '../AddItem';

import './App.css';

class App extends Component {

  maxId = 1;

  state = {
    todoData: [
      this.createNewItem('Սովորել React'),
      this.createNewItem('Կոֆե խմել'),
      this.createNewItem('Սովորել Node.js'),
      this.createNewItem('Հաց ուտել'),
    ],
    searchText: '',
    filter: 'all' // active, done or all
  }

  createNewItem(title) {
    return {
      id: this.maxId++,
      title,
      important: false,
      isDone: false
    }
  }

  getIndex(id) {
    const { todoData } = this.state;
    return todoData.findIndex((el) => el.id === id);
  }

  toggleProperty(arr, id, propName) {
    const idx = this.getIndex(id);

    const obj = {
      ...arr[idx],
      [propName]: !arr[idx][propName]
    };

    const before = arr.slice(0, idx);
    const after = arr.slice(idx + 1);

    return [...before, obj, ...after];
  }

  deleteListItem = (id) => {
    const idx = this.getIndex(id);

    this.setState(({ todoData }) => {
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);

      return {
        todoData: [...before, ...after]
      }
    });
  };

  addNewItem = (text) => {
    text = text.trim();
    if(!text) return;

    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, this.createNewItem(text)]
      }
    });
  };

  onImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  };

  onDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'isDone')
      }
    });
  };

  filter = (items, filter) => {
    switch(filter) {
      case 'active': return items.filter((item) => !item.isDone);
      case 'done': return items.filter((item) => item.isDone);
      default: return items;
    }
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  }

  onSearchChange = (text) => {
    this.setState({ searchText: text });
  }

  search = (todoData, searchText) => {
    if(!searchText.length) return todoData;

    return todoData.filter((item) => {
      return item.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
  };

  render() {
    const { todoData, searchText, filter } = this.state;
    const visibilItems = this.filter(
      this.search(todoData, searchText), filter
    );

    const doneCount = visibilItems.filter((el) => el.isDone).length;
    const notDoneCount = visibilItems.length - doneCount;

    return (
      <div className="container">
        <Header doneCount={ doneCount } notDoneCount={ notDoneCount } />
        <Filter
          onSearchChange={ this.onSearchChange }
          onFilterChange={ this.onFilterChange }
          filter={ this.state.filter }
        />
        <List
          todoList={visibilItems}
          onDeleted={this.deleteListItem}
          onImportant={this.onImportant}
          onDone={this.onDone}
        />
        <AddItem onAddItem={this.addNewItem} />
      </div>
    );
  }
}

export default App;