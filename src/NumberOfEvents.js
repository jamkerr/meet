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
            <div className="NumberOfEvents w-full flex flex-col items-center m-3">
                <input
                    type="number"
                    className="EventNumberInput"
                    value={this.state.eventNumber}
                    onChange={this.handleInputChanged}
                />
            </div>
        );
    }
}

