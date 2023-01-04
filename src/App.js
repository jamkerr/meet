import React, { Component } from 'react';
import './App.css';
import './nprogress.css';

import { EventList } from './EventList';
import { CitySearch } from './CitySearch';
import { NumberOfEvents } from './NumberOfEvents';
import { getEvents, extractLocations } from './api';

export class App extends Component {

    state = {
        events: [],
        locations: [],
        eventNumber: 32
    }

    updateLocation = (location) => {
        getEvents().then((events) => {
            const locationEvents = (location === 'all') ? events : events.filter((event) => event.location === location);
            this.setState({
                events: locationEvents
            });
        });
    }

    updateEventNumber = (eventNumber) => {
        getEvents().then(() => {
            this.setState({
                eventNumber: eventNumber
            });
        });
    }

    componentDidMount() {
        this.mounted = true;
        getEvents().then((events) => {
            if (this.mounted) {
                this.setState({ events, locations: extractLocations(events) });
            }
        });
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    render() {
        return (
            <div className='App bg-slate-50 min-h-screen flex items-center flex-col py-10'>
                <h1 className='text-6xl font-extrabold m-4'>Meet</h1>
                <div className='flex flex-row m-4'>
                    <CitySearch locations={this.state.locations} updateLocation={this.updateLocation} />
                    <NumberOfEvents eventNumber={this.state.eventNumber} updateEventNumber={this.updateEventNumber} />
                </div>
                <EventList events={this.state.events} eventNumber={this.state.eventNumber} />
            </div>
        );
    }
}