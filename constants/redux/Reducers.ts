import { CHOOSE_IMAGE, CANCEL_CHOSEN_IMAGE, EDIT_GOOD, SET_EXPIRY, CHECK_AVAILABLE, PICK_LOCATION, RESET_ALL } from './Types';

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
    expiry: new Date(),
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
        isChosen: false
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

function applyResetAll(state: IState) {
    return defaultState;
}

// The receiver of the action is known as a reducer. Whenever an action is triggered, the state of the application changes. The handling of the application’s state is done by the reducers.
// A reducer is a pure function that calculates the next state based on the initial or previous state. It always produces the same output if the state is unchanged.

function reducer(state = initialState, action: any) {
    switch (action.type) {
        case CHOOSE_IMAGE:
            return applyChooseImage(state, action.uri);
        case CANCEL_CHOSEN_IMAGE:
            return applyCancelChosenImage(state);
        case EDIT_GOOD:
            return applyEditGood(state, action.parameter);
        case SET_EXPIRY:
            return applySetExpiry(state, action.expiry);
        case CHECK_AVAILABLE:
            return applyCheckAvailable(state);
        case PICK_LOCATION:
            return applyPickLocation(state, action.location);
        case RESET_ALL:
            return applyResetAll(state);
        default:
            return state;
    }
}

export default reducer;
