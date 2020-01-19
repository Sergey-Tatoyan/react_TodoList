import React, { Component } from 'react';

import './AddItem.css';

export default class AddItem extends Component {

  state = {
    text: ''
  };

  onInputChange = ({ target:{ value } }) => {
    this.setState({
      text: value
    });
  };

  onAddClick = (e) => {
    e.preventDefault();

    const { onAddItem } = this.props;
    this.setState(({ text }) => {
      onAddItem(text);

      return { text: '' };
    });
  };

  render() {
    const { text } = this.state;

    return (
      <form className="row add-item" onSubmit={this.onAddClick}>
        <div className="form-group col-md-9">
          <input
            className="form-control"
            placeholder="Add new data"
            onChange={ this.onInputChange }
            onDragEnter={this.onAddClick}
            value={ text }
          />
        </div>
        <div className="form-group col-md-3">
          <button className="btn btn-info">Add Item</button>
        </div>
      </form>
    );
  }
}