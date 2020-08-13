import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-native-testing-library';
import { Provider } from 'react-redux';
import reducer from '../constants/redux/Reducers';
import * as Permissions from 'expo-permissions';

export function renderWithRedux(ui: React.ReactElement<any>, { initialState, store = createStore(reducer, initialState) } = { }) {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        store
    };
}

export function resolvedPermissionValue(status: Permissions.PermissionStatus, granted: boolean): Permissions.PermissionResponse {
    return {
        "status": status,
        "expires": "never",
        "canAskAgain": true,
        "granted": granted,
        "permissions": {

        }
    };
}
