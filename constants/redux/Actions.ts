import { CHOOSE_IMAGE } from './Types';

function chooseImage() {
    return {
        type: CHOOSE_IMAGE
    };
}

const actionCreators = {
    chooseImage
};

export { actionCreators };
