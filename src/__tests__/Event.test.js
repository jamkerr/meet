import React from 'react';
import { shallow } from 'enzyme';
import { Event } from "../Event";

import { mockData } from '../mock-data';


describe('<Event /> component', () => {

    let eventData, EventWrapper;
    beforeAll(() => {
        eventData = mockData[0];
        EventWrapper = shallow(<Event event={eventData} />);
    })

    // Test whether default fields exist
    test('render event fields', () => {
        expect(EventWrapper.find('.summary')).toHaveLength(1);
        expect(EventWrapper.find('.location')).toHaveLength(1);
        expect(EventWrapper.find('.when')).toHaveLength(1);
    });

    // Test whether default fields are filled correctly
    test('render event information', () => {
        expect(EventWrapper.find('.summary').text()).toBe(eventData.summary);
        expect(EventWrapper.find('.location').text()).toBe(eventData.location);
        expect(EventWrapper.find('.when').text()).toBe(eventData.start.dateTime);
    });

    // Test whether state is collapsed by default
    test('default state is collapsed', () => {
        expect(EventWrapper.state('isCollapsed')).toBe(true);
    });

    // Test whether user can click to reveal extra details
    test('render event details on click', () => {
        EventWrapper.setState({
            isCollapsed: true
        });
        EventWrapper.find('.toggle-details').simulate('click');
        expect(EventWrapper.find('.description').text()).toBe(eventData.description);
    });

    // Test whether user can click to hide extra details
    test('hide event details on click', () => {
        EventWrapper.setState({
            isCollapsed: false
        });
        EventWrapper.find('.toggle-details').simulate('click');
        expect(EventWrapper.find('.description')).toHaveLength(0);
    });
});