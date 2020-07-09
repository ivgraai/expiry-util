import {
    CHOOSE_IMAGE,
    CANCEL_CHOSEN_IMAGE,
    EDIT_GOOD,
    SET_EXPIRY,
    CHECK_AVAILABLE,
    PICK_LOCATION,
    RESET_ALL,
    REQUEST_GOOD
} from './Types';

// Think of the state as read-only, since we cannot make changes to this object (which is represented in the form of a tree) directly. We need actions to do so.
// Actions are like events in Redux. The nature of each event mentioned is mutable. An action is a JavaScript object.

function chooseImage(uri: string) {
    return {
        type: CHOOSE_IMAGE,
        uri
    };
}

function cancelChosenImage() {
    return {
        type: CANCEL_CHOSEN_IMAGE
    };
}

function editGood(name: string) {
    return {
        type: EDIT_GOOD,
        parameter: name
    };
}

function setExpiry(expiry: Date) {
    return {
        type: SET_EXPIRY,
        expiry
    }
}

function checkAvailable() {
    return {
        type: CHECK_AVAILABLE
    };
}

function pickLocation(location: any) {
    return {
        type: PICK_LOCATION,
        location
    };
}

function resetAll() {
    return {
        type: RESET_ALL
    };
}

function requestGood(object: any) {
    return {
        type: REQUEST_GOOD,
        good: object
    };
}

// Action Creators are functions that create actions.

const actionCreators = {
    chooseImage,
    cancelChosenImage,
    editGood,
    setExpiry,
    checkAvailable,
    pickLocation,
    resetAll,
    requestGood
};

export { actionCreators };
