import { bindActionCreators } from 'redux';
import { actionCreators as actions } from './Actions';
import { IState } from './Reducers';

export function mapStateToProps(state: IState) {
    const { userData } = state;
    return {
        name: userData.name,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        email: userData.emailAddress
    };
}

export function mapDispatchToProps(dispatch: any) {
    return {
        fillDataOut: bindActionCreators(actions.fillUserDataOut, dispatch),
        clearData: bindActionCreators(actions.clearUserData, dispatch)
    };
}
