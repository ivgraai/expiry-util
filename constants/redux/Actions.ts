import { CHOOSE_IMAGE, EDIT_GOOD, CHECK_AVAILABLE, PICK_LOCATION } from './Types';

// Think of the state as read-only, since we cannot make changes to this object (which is represented in the form of a tree) directly. We need actions to do so.
// Actions are like events in Redux. The nature of each event mentioned is mutable. An action is a JavaScript object.

function chooseImage(uri: string) {
    return {
        type: CHOOSE_IMAGE,
        uri
    };
}

function editGood(name: string) {
    return {
        type: EDIT_GOOD,
        parameter: name
    };
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

// Action Creators are functions that create actions.

const actionCreators = {
    chooseImage,
    editGood,
    checkAvailable,
    pickLocation
};

export { actionCreators };
