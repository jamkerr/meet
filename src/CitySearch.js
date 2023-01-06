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
        infoText: 'We can\'t find the city you\'re looking for. Please try another city.',
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
        <InfoAlert text={this.state.infoText} />
        <label htmlFor="cityPicker" className="font-bold">Pick a Place</label>
        <input
          type="text"
          name="cityPicker"
          className="city font-bold dark:text-slate-700 border-solid border-4 border-pink-400 rounded-xl p-2"
          value={this.state.query}
          onChange={this.handleInputChanged}
          onFocus={() => { this.setState({ showSuggestions: true }) }}
        />
        <ul className="suggestions" style={this.state.showSuggestions ? {} : { display: 'none' }} >
            {this.state.suggestions.map((suggestion) => (
                <li
                key={suggestion}
                onClick={() => this.handleItemClicked(suggestion)}
                >{suggestion}</li>
            ))}
            <li
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

