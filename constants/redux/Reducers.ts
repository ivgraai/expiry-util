import { CHOOSE_IMAGE, EDIT_GOOD, CHECK_AVAILABLE, PICK_LOCATION } from './Types';

// In Redux, the state of the whole application is represented by one JavaScript object.

export type ILocation = {
    lat: number | null,
    lng: number | null
};
export type IState = {
    isChosen: boolean,
    imageUri: string | undefined,
    good: string | undefined,
    available: boolean,
    location: ILocation
};

const initialState: IState = {
    isChosen: false,
    imageUri: undefined,
    good: undefined,
    available: false,
    location: {
        lat: null,
        lng: null
    }
};

function applyChooseImage(state: IState, uri: string) {
    return {
        ...state,
        isChosen: true,
        imageUri: uri
    };
}

function applyEditGood(state: IState, good: string) {
    return {
        ...state,
        good
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

// The receiver of the action is known as a reducer. Whenever an action is triggered, the state of the application changes. The handling of the application’s state is done by the reducers.
// A reducer is a pure function that calculates the next state based on the initial or previous state. It always produces the same output if the state is unchanged.

function reducer(state = initialState, action: any) {
    switch (action.type) {
        case CHOOSE_IMAGE:
            return applyChooseImage(state, action.uri);
        case EDIT_GOOD:
            return applyEditGood(state, action.parameter);
        case CHECK_AVAILABLE:
            return applyCheckAvailable(state);
        case PICK_LOCATION:
            return applyPickLocation(state, action.location);
        default:
            return state;
    }
}

export default reducer;
