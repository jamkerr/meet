import React, { Component } from 'react';
import './App.css';
import './nprogress.css';

import { EventList } from './EventList';
import { CitySearch } from './CitySearch';
import { NumberOfEvents } from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';

export class App extends Component {

    state = {
        events: [],
        locations: [],
        eventNumber: 32,
        darkMode: false,
        showWelcomeScreen: undefined
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

    toggleDarkMode = () => {
        this.setState((currentState) => ({
            darkMode: !currentState.darkMode
        }));
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }

    componentDidMount() {
        this.mounted = true;
        const accessToken = localStorage.getItem('access_token');
        const isTokenValid = !accessToken || checkToken(accessToken).error ? false : true;
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');
        this.setState({ showWelcomeScreen: !(code || isTokenValid) });
        if ((code || isTokenValid) && this.mounted) {
            getEvents().then((events) => {
                if (this.mounted) {
                    this.setState({ events, locations: extractLocations(events) });
                }
            });
        }
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
        const { darkMode } = this.state;
        if (this.state.showWelcomeScreen === undefined) return <div className='App' />
        return (
            <div className='App bg-slate-50 dark:bg-slate-700 dark:text-neutral-50 min-h-screen flex items-center flex-col py-10'>
                <button
                    className='rounded-md bg-slate-700 dark:bg-slate-50 text-neutral-50 dark:text-slate-700 p-3 absolute top-2 right-2'
                    onClick={() => this.toggleDarkMode()}
                >
                    {!darkMode ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                    }
                </button>
                <h1 className='text-6xl font-extrabold m-4'>Meet Again</h1>
                <div className='w-full flex flex-wrap flex-row justify-center m-4'>
                    <CitySearch locations={this.state.locations} updateLocation={this.updateLocation} />
                    <NumberOfEvents eventNumber={this.state.eventNumber} updateEventNumber={this.updateEventNumber} />
                </div>
                <EventList events={this.state.events} eventNumber={this.state.eventNumber} />
                <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
            </div>
        );
    }
}