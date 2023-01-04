import React, { Component } from 'react';
import moment from "moment/moment";

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
            <div className='event border-solid border-8 border-pink-400 rounded-xl p-4'>
                <h3 className='summary font-extrabold text-xl'>{event.summary}</h3>
                <div className='location'>{event.location}</div>
                <div className='when mb-4'>{moment(event.start.dateTime).format('MMMM Do YYYY, h:mm a')}</div>

                {!isCollapsed && (
                    <div className='description border-solid border-x-4 border-t-4 border-pink-400 rounded-xl p-4'>{event.description}</div>
                )}

                <button
                    className='toggle-details bg-pink-500 rounded-xl p-2 w-full font-bold text-neutral-50'
                    onClick={() => this.toggleDetails()}
                >{isCollapsed ? 'Show Details' : 'Hide Details'}</button>
            </div>


        );
    }
};