import React from 'react';
import { shallow } from 'enzyme';

import { NumberOfEvents } from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {

    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    // Test that NumberOfEvents container exists
    test('render number of events container', () => {
        expect(NumberOfEventsWrapper.find('.NumberOfEvents')).toHaveLength(1);
    });

    // Test that EventNumberInput field exists
    test('render number of events input field', () => {
        expect(NumberOfEventsWrapper.find('.EventNumberInput')).toHaveLength(1);
    });

    // Test that EventNumberInput field renders correct default content of 32
    test('render number of events content', () => {
        expect(NumberOfEventsWrapper.find('.EventNumberInput').prop('value')).toBe(32);
    });

    // Test that eventNumber state changes when EventNumberInput input number is changed
    test('change state when text input changes', () => {
        NumberOfEventsWrapper.setState({
            eventNumber: 32
        });
        const eventObject = { target: { value: 12 } };
        NumberOfEventsWrapper.find('.EventNumberInput').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('eventNumber')).toBe(12);
    });

})