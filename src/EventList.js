import React from 'react';
import { Event } from "./Event";

export function EventList(props) {
    const { events, eventNumber } = props;
    return (
        <div className='w-full md:w-4/5 lg:w-3/4'>
            <h2 className='text-5xl text-center font-extrabold'>Events</h2>
            <ul className='event-list grid lg:grid-cols-3'>
                {(eventNumber ? events.slice(0, eventNumber) : events).map(event =>
                    <li className="h-min m-4 p-4" key={event.id}>
                        <Event event={event} />
                    </li>
                )}
            </ul>
        </div>
    );
}

