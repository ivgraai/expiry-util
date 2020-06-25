import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-native-testing-library';
import { Provider } from 'react-redux';
import reducer from '../constants/redux/Reducers';

export function renderWithRedux(ui: React.ReactElement<any>, { initialState, store = createStore(reducer, initialState) } = { }) {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        store
    };
}
