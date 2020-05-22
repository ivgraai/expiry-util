import { bindActionCreators } from 'redux';
import { actionCreators as actions } from './Actions';

// We need to bind action creators with our MainScreen in order to make it fully functional.
// bindActionCreators maps action functions to an object using the names of the action functions. These functions automatically dispatch the action to the store when the function is called. To change the data, we need to dispatch an action. To enable this, we need two things: mapStateToProps and mapDispatchToProps, and we need to connect both of them with our component.

// mapStateToProps is an object that lives in the store whose keys are passed down to the component as props.
export function mapStateToProps(state) {
    const { isChosen, good } = state;
    return {
        isChosen,
        goods: good
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        chooseImage: bindActionCreators(actions.chooseImage, dispatch),
        setStateGoods: bindActionCreators(actions.editGood, dispatch)
    };
}
