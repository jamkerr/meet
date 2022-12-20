import React from 'react';
import './App.css';

import { EventList } from './EventList';
import { CitySearch } from './CitySearch';
import { NumberOfEvents } from './NumberOfEvents';

export function App () {
    return (
        <div className="App">
            <CitySearch />
            <NumberOfEvents />
            <EventList />
        </div>
    );
}