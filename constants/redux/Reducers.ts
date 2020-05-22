import { CHOOSE_IMAGE } from './Types';

const initialState = {
    isChosen: false
};

function applyChooseImage(state) {
    return {
        ...state,
        isChosen: true
    };
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case CHOOSE_IMAGE:
            return applyChooseImage(state);
        default:
            return state;
    }
}

export default reducer;
