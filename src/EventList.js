import React from 'react';
import { Event } from "./Event";
import { WarningAlert } from './Alert';

export function EventList(props) {
    const { events, eventNumber } = props;
    const online = navigator.onLine;
    return (
        <div className='w-full md:w-4/5 lg:w-3/4'>
            <div className='text-center font-extrabold'>
                <h2 className='text-5xl'>Events</h2>
                {/* Display warning message if app is offline */}
                { !online && <WarningAlert text="You're currently using the app offline. These events might not be up to date."></WarningAlert> }
            </div>

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

