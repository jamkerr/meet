import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { shallow } from 'enzyme';
import { Event } from '../Event';
import { mockData } from '../mock-data';


const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

    test('An event element is collapsed by default', ({ given, when, then }) => {

        let EventWrapper;
        given('an event\'s info has been loaded', () => {
            EventWrapper = shallow(<Event event={mockData[0]} />);
        });

        when('a user first sees an event', () => {
        });

        then('the event\'s details will not be visible', () => {
            expect(EventWrapper.find('.description')).toHaveLength(0);
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        
        let EventWrapper;
        given('an event\'s info has been loaded', () => {
            EventWrapper = shallow(<Event event={mockData[0]} />);
        });

        when('a user clicks a collapsed event panel', () => {
            EventWrapper.find('.toggle-details').simulate('click');
        });

        then('the details will become visible', () => {
            expect(EventWrapper.find('.description')).toHaveLength(1);
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {

        let EventWrapper;
        given('an event\'s details are visible', () => {
            EventWrapper = shallow(<Event event={mockData[0]} />);
            EventWrapper.find('.toggle-details').simulate('click');
        });

        when('a user clicks a "show details" button', () => {
            EventWrapper.find('.toggle-details').simulate('click');
        });

        then('the event\'s details will become hidden', () => {
            expect(EventWrapper.find('.description')).toHaveLength(0);
        });
    });
});