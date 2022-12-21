import React, { Component } from 'react';

export class Event extends Component {

    state = { isCollapsed: true };

    toggleDetails = () => {
        this.setState((currentState) => ({
            isCollapsed: !currentState.isCollapsed
        }));
    }

    render() {
        const { event } = this.props;
        const { isCollapsed } = this.state;
        return(
            <div className='event'>
                <h2 className='summary'>{event.summary}</h2>
                <div className='location'>{event.location}</div>
                <div className='when'>{event.start.dateTime}</div>

                {!isCollapsed && (
                    <div className='description border-solid border-4 border-white rounded p-2'>{event.description}</div>
                )}

                <button
                    className='toggle-details bg-white p-2 w-full rounded'
                    onClick={() => this.toggleDetails()}
                >{isCollapsed ? 'Show Details' : 'Hide Details'}</button>
            </div>


        );
    }
};