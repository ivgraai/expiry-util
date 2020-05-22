import { CHOOSE_IMAGE, EDIT_GOOD } from './Types';

// Think of the state as read-only, since we cannot make changes to this object (which is represented in the form of a tree) directly. We need actions to do so.
// Actions are like events in Redux. The nature of each event mentioned is mutable. An action is a JavaScript object.

function chooseImage() {
    return {
        type: CHOOSE_IMAGE
    };
}

function editGood(name: string) {
    return {
        type: EDIT_GOOD,
        parameter: name
    };
}

// Action Creators are functions that create actions.

const actionCreators = {
    chooseImage,
    editGood
};

export { actionCreators };
