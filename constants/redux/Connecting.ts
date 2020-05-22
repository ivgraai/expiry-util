import { bindActionCreators } from 'redux';
import { actionCreators as actions } from './Actions';

export function mapStateToProps(state) {
    const { isChosen } = state;
    return {
        isChosen
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        chooseImage: bindActionCreators(actions.chooseImage, dispatch)
    };
}
