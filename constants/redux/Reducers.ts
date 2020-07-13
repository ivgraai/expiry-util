import * as Types from './Types';
import CacheHandler from '../../services/CacheHandler';
import moment from 'moment';

// In Redux, the state of the whole application is represented by one JavaScript object.

export type ILocation = {
    lat: number | null,
    lng: number | null
};
export type IState = {
    isChosen: boolean,
    imageUri: string | undefined,
    good: string | undefined,
    expiry: Date,
    available: boolean,
    location: ILocation
};

const defaultState: IState = {
    isChosen: false,
    imageUri: undefined,
    good: undefined,
    expiry: moment().add(1, 'days').toDate(),
    available: false,
    location: {
        lat: null,
        lng: null
    }
};
const initialState = defaultState;

function applyChooseImage(state: IState, uri: string) {
    return {
        ...state,
        isChosen: true,
        imageUri: uri
    };
}

function applyCancelChosenImage(state: IState) {
    return {
        ...state,
        isChosen: false,
        imageUri: undefined
    }
}

function applyEditGood(state: IState, good: string) {
    return {
        ...state,
        good
    };
}

function applySetExpiry(state: IState, expiry: Date) {
    return {
        ...state,
        expiry
    };
}

function applyCheckAvailable(state: IState) {
    return {
        ...state,
        available: !state.available
    };
}

function applyPickLocation(state: IState, location: ILocation) {
    return {
        ...state,
        location
    };
}

function applyResetAll(_: IState) {
    return defaultState;
}

function applyRequestGood(state: IState, object: any) {
    // TODO: Other logic should be here as well.
    CacheHandler.requestNearbyGood(object);
    return state;
}

// The receiver of the action is known as a reducer. Whenever an action is triggered, the state of the application changes. The handling of the application’s state is done by the reducers.
// A reducer is a pure function that calculates the next state based on the initial or previous state. It always produces the same output if the state is unchanged.

function reducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHOOSE_IMAGE:
            return applyChooseImage(state, action.uri);
        case Types.CANCEL_CHOSEN_IMAGE:
            return applyCancelChosenImage(state);
        case Types.EDIT_GOOD:
            return applyEditGood(state, action.parameter);
        case Types.SET_EXPIRY:
            return applySetExpiry(state, action.expiry);
        case Types.CHECK_AVAILABLE:
            return applyCheckAvailable(state);
        case Types.PICK_LOCATION:
            return applyPickLocation(state, action.location);
        case Types.RESET_ALL:
            return applyResetAll(state);
        case Types.REQUEST_GOOD:
            return applyRequestGood(state, action.good);
        default:
            return state;
    }
}

export default reducer;
