import React, { Component } from 'react';

import './Filter.css';

export default class Filter extends Component {
  state = {
    text: ''
  };

  buttons = [
    { name: 'all', title: 'All' },
    { name: 'active', title: 'Active' },
    { name: 'done', title: 'Done' },
  ];

  onInputChange = ({ target:{ value } }) => {
    this.setState({ text: value });
    this.props.onSearchChange(value);
  };

  render() {

    const buttons = this.buttons.map((btn) => {
      let classes = 'btn btn-outline-primary mb-2';
      classes += btn.name === this.props.filter? ' active': '';

      return (
          <button
            key={ btn.name }
            className={ classes }
            onClick={ () => this.props.onFilterChange(btn.name) }
          >{ btn.title }</button>
      );
    });

    return (
      <div className="row filter-data">
        <div className="form-group col-md-7">
          <input
            type="text"
            className="form-control-plaintext"
            placeholder="Type to Search"
            onChange={ this.onInputChange }
            value={ this.state.text }
          />
        </div>
        <div className="form-group col-md-5">
          { buttons }
        </div>
      </div>
    );
  }
}