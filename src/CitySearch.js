import React, { Component } from 'react';
import { InfoAlert } from './Alert';

export class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
        return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        suggestions: [],
        infoText: 'No city with that name',
      });
    } else {
      this.setState({
          query: value,
          suggestions,
          infoText: ''
      });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
        query: suggestion,
        showSuggestions: false,
        infoText: ''
    });

    this.props.updateLocation(suggestion);
  }

  render() {
    return (
      <div className="CitySearch flex flex-col items-center m-3">
        <label htmlFor="cityPicker" className="font-bold">Pick a Place</label>
        <input
          type="text"
          name="cityPicker"
          className="city font-bold dark:text-slate-700 border-solid border-4 border-pink-400 rounded-xl p-2"
          value={this.state.query}
          onChange={this.handleInputChanged}
          onFocus={() => { this.setState({ showSuggestions: true }) }}
        />
        <ul className="suggestions bg-slate-300 dark:bg-slate-500 rounded mt-1 p-3 min-w-full max-h-30 overflow-auto" style={this.state.showSuggestions ? {} : { display: 'none' }} >
            {this.state.suggestions.map((suggestion) => (
                <li
                className='cursor-pointer'
                key={suggestion}
                onClick={() => this.handleItemClicked(suggestion)}
                >{suggestion}</li>
            ))}
            <InfoAlert text={this.state.infoText} />
            <li
              className='cursor-pointer'
              key='all'
              onClick={() => this.handleItemClicked('all')}
            >
                <b>See all cities</b>
            </li>
        </ul>
      </div>
    );
  }
}

