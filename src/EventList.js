import React from 'react';
import { Event } from "./Event";

export function EventList(props) {
    const { events, eventNumber } = props;
    return (
        <ul className='event-list grid lg:grid-cols-3'>
            {(eventNumber ? events.slice(0, eventNumber) : events).map(event =>
                <li className="h-min m-4 p-4" key={event.id}>
                    <Event event={event} />
                </li>
            )}
        </ul>
    );
}

