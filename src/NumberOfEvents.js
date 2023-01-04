import React, { Component } from 'react';

export class NumberOfEvents extends Component {

    state = {
        eventNumber: 32
    }

    handleInputChanged = (event) => {
        const value = parseInt(event.target.value);
        this.setState({
            eventNumber: value,
        });

        this.props.updateEventNumber(value);
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
            </div>
        );
    }
}

