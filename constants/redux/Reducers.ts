import { CHOOSE_IMAGE, EDIT_GOOD } from './Types';

// In Redux, the state of the whole application is represented by one JavaScript object.

const initialState = {
    isChosen: false,
    good: undefined
};

function applyChooseImage(state) {
    return {
        ...state,
        isChosen: true
    };
}

function applyEditGood(state, good) {
    return {
        ...state,
        good
    };
}

// The receiver of the action is known as a reducer. Whenever an action is triggered, the state of the application changes. The handling of the application’s state is done by the reducers.
// A reducer is a pure function that calculates the next state based on the initial or previous state. It always produces the same output if the state is unchanged.

function reducer(state = initialState, action) {
    switch (action.type) {
        case CHOOSE_IMAGE:
            return applyChooseImage(state);
        case EDIT_GOOD:
            return applyEditGood(state, action.parameter);
        default:
            return state;
    }
}

export default reducer;
