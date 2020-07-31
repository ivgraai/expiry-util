import * as Types from './Types';
import CacheHandler from '../../services/CacheHandler';
import moment from 'moment';

// In Redux, the state of the whole application is represented by one JavaScript object.

export type ILocation = {
    lat: number | null,
    lng: number | null
};
export type IUSerData = {
    name?: string,
    password?: string,
    confirmPassword?: string,
    emailAddress?: string
};
export type IGoodData = {
    isChosen: boolean,
    imageUri: string | undefined,
    good: string | undefined,
    expiry: Date,
    available: boolean,
    location: ILocation
};
export type IState = IGoodData & {
    userData: IUSerData
};

const defaultState: IGoodData = {
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
const initialState = {
    ...defaultState,
    userData: {}
};

function applyChooseImage(state: IState, uri: string): IState {
    return {
        ...state,
        isChosen: true,
        imageUri: uri
    };
}

function applyCancelChosenImage(state: IState): IState {
    return {
        ...state,
        isChosen: false,
        imageUri: undefined
    }
}

function applyEditGood(state: IState, good: string): IState {
    return {
        ...state,
        good
    };
}

function applySetExpiry(state: IState, expiry: Date): IState {
    return {
        ...state,
        expiry
    };
}

function applyCheckAvailable(state: IState): IState {
    return {
        ...state,
        available: !state.available
    };
}

function applyPickLocation(state: IState, location: ILocation): IState {
    return {
        ...state,
        location
    };
}

function applyResetAll(state: IState): IState {
    return {
        ...defaultState,
        userData: state.userData
    };
}

function applyRequestGood(state: IState, object: any): IState {
    // TODO: Other logic should be here as well.
    CacheHandler.requestNearbyGood(object);
    return state;
}

function applyFillUserDataOut(state: IState, userData: IUSerData): IState {
    let predicate = (data: string | undefined) => ("" == data);
    return {
        ...state,
        userData: {
            ...(!predicate(userData.name) && {name: userData.name || state.userData.name}),
            ...(!predicate(userData.password) && {password: userData.password || state.userData.password}),
            ...(!predicate(userData.confirmPassword) && {confirmPassword: userData.confirmPassword || state.userData.confirmPassword}),
            ...(!predicate(userData.emailAddress) && {emailAddress: userData.emailAddress || state.userData.emailAddress})
        }
    };
}

function applyClearUserData(state: IState) {
    return {
        ...state,
        userData: {}
    }
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
        case Types.FILL_USER_DATA_OUT:
            return applyFillUserDataOut(state, action.userData);
        case Types.CLEAR_USER_DATA:
            return applyClearUserData(state);
        default:
            return state;
    }
}

export default reducer;
