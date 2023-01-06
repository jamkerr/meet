import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

export class NumberOfEvents extends Component {

    state = {
        eventNumber: 32
    }

    handleInputChanged = (event) => {
        const value = parseInt(event.target.value);
        if (value < 1 || value > 250) {
            this.setState({
                errorText: 'Pick a number between 1 and 250'
            });
        } else {
            this.setState({
                eventNumber: value,
                errorText: ''
            });
            this.props.updateEventNumber(value);
        }
    }

    render() {
        return (
            <div className="NumberOfEvents flex flex-col items-center m-3">
                <label htmlFor="eventNumberPicker" className="font-bold">Number of Events</label>
                <input
                    type="number"
                    name="eventNumberPicker"
                    className="EventNumberInput font-bold dark:text-slate-700 border-solid border-4 border-pink-400 rounded-xl p-2"
                    value={this.state.eventNumber}
                    onChange={this.handleInputChanged}
                />
                <ErrorAlert text={this.state.errorText} />
            </div>
        );
    }
}

