import { bindActionCreators } from 'redux';
import { actionCreators as actions } from './Actions';
import { IState } from './Reducers';

// We need to bind action creators with our MainScreen in order to make it fully functional.
// bindActionCreators maps action functions to an object using the names of the action functions. These functions automatically dispatch the action to the store when the function is called. To change the data, we need to dispatch an action. To enable this, we need two things: mapStateToProps and mapDispatchToProps, and we need to connect both of them with our component.

// mapStateToProps is an object that lives in the store whose keys are passed down to the component as props.
export function mapStateToProps(state: IState) {
    const { isChosen, imageUri, good, expiry, available, location } = state;
    return {
        isChosen,
        imageUri,
        goods: good,
        expiry,
        available,
        location
    };
}

export function mapDispatchToProps(dispatch: any) {
    return {
        chooseImage: bindActionCreators(actions.chooseImage, dispatch),
        setStateGoods: bindActionCreators(actions.editGood, dispatch),
        setExpiry: bindActionCreators(actions.setExpiry, dispatch),
        checkAvailable: bindActionCreators(actions.checkAvailable, dispatch),
        pickLocation: bindActionCreators(actions.pickLocation, dispatch)
    };
}
