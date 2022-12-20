import React from 'react';
import { Event } from "./Event";

export function EventList(props) {
    const { events, eventNumber } = props;
    return (
        <ul className='EventList'>
            {events.slice(eventNumber ? -eventNumber : events.length).map(event =>
                <li key={event.id}>
                    <Event event={event} />
                </li>
            )}
        </ul>
    );
}

