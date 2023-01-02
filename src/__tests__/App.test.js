import React from 'react';
import { shallow, mount } from 'enzyme';
import { App } from '../App';
import { EventList } from '../EventList';
import { CitySearch } from '../CitySearch';
import { NumberOfEvents } from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

// Unit tests
describe('<App /> component', () => {

    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App updateEventNumber={() => {}} /> );
    });

    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    test('render NumberOfEvents', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    });
});

// Integration tests
describe('<App /> integration', () => {

    let AppWrapper;

    test('App passes "events" state as a prop to EventList', () => {
        AppWrapper = mount(<App /> );
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });

    test('App passes "locations" state as a prop to CitySearch', () => {
        AppWrapper = mount(<App /> );
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });

    test('get a list of events matching the city selected by the user', async () => {
        AppWrapper = mount(<App /> );
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });

    test('get a list of all events when a user selects that option', async () => {
        AppWrapper = mount(<App /> );
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });

    // Tests for Number of Events integration functionality

    test('App passes "number of events" state as a prop to NumberOfEvents', () => {
        AppWrapper = mount(<App /> );
        const AppEventNumberState = AppWrapper.state('eventNumber');
        expect(AppEventNumberState).not.toEqual(undefined);
        expect(AppWrapper.find(NumberOfEvents).props().eventNumber).toEqual(AppEventNumberState);
        AppWrapper.unmount();
    });

    test('App passes "number of events" state as a prop to EventList', () => {
        AppWrapper = mount(<App /> );
        const AppEventNumberState = AppWrapper.state('eventNumber');
        expect(AppEventNumberState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().eventNumber).toEqual(AppEventNumberState);
        AppWrapper.unmount();
    });

    test('number of events state App is equal to number of events state in NumberOfEvents', async () => {
        AppWrapper = mount(<App /> );
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        const EventListWrapper =  shallow(<EventList events={mockData} />);
        const testNumber = mockData.length;
        NumberOfEventsWrapper.find('.EventNumberInput').simulate('change', {
            target: { value: testNumber },
        });
        await getEvents();
        expect(AppWrapper.state('eventNumber')).toBe(testNumber);
        expect(NumberOfEventsWrapper.state('eventNumber')).toBe(testNumber);
        expect(EventListWrapper.find('.event-list li')).toHaveLength(testNumber);
        AppWrapper.unmount();
    });

    test('Title of events shown in EventList should match mock data', async () => {
        AppWrapper = mount(<App /> );
        const EventListWrapper = mount(<EventList events={mockData} />);
        await getEvents();
        for (let i = 0; i < mockData.length; i += 1) {
            expect(EventListWrapper.find('.event-list li .summary').at(i).text()).toEqual(mockData[i].summary);
        }
        expect(AppWrapper.state('events')).toEqual(mockData);
        EventListWrapper.unmount()
        AppWrapper.unmount();
    })

});