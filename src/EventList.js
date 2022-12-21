import React from 'react';
import { Event } from "./Event";

export function EventList(props) {
    const { events, eventNumber } = props;
    return (
        <ul className='event-list'>
            {(eventNumber ? events.slice(0, eventNumber) : events).map(event =>
                <li key={event.id}>
                    <Event event={event} />
                </li>
            )}
        </ul>
    );
}

