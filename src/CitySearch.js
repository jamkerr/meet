import React, { Component } from 'react';

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
    this.setState({
        query: value,
        suggestions
    });
  }

  handleItemClicked = (suggestion) => {
    this.setState({
        query: suggestion,
        showSuggestions: false
    });

    this.props.updateLocation(suggestion);
  }

  render() {
    return (
      <div className="CitySearch w-full flex flex-col items-center m-3">
        <label htmlFor="cityPicker" className="font-bold">Pick a Place</label>
        <input
          type="text"
          name="cityPicker"
          className="city border-solid border-4 border-pink-400 rounded-xl p-2"
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

