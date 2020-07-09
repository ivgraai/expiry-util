import { bindActionCreators } from 'redux';
import { actionCreators as actions } from './Actions';
import { IState } from './Reducers';

export function mapStateToProps(_state: IState) {
    return { };
}

export function mapDispatchToProps(dispatch: any) {
    return {
        requestGood: bindActionCreators(actions.requestGood, dispatch)
    };
}
