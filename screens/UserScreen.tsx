import React from 'react';
import { View, Text, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import * as ErrorAlert from '../components/ErrorAlert';
import StyledTextInput from '../components/StyledTextInput';
import StyledButton from '../components/StyledButton';
import { i18n } from '../constants/Dictionary';
import HttpClient from '../services/HttpClient';
import UserManager from '../services/UserManager';
import CacheHandler from '../services/CacheHandler';
import Utility from '../common/Utility';
import { styles } from '../constants/styles/UserScreen';
import validate from 'validate.js';
import constraints from '../constants/validation/UserConstraint';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from "react-redux";
import * as conn from "../constants/redux/Connection_User";

interface IProps {
    navigation: any;
    name: string | undefined;
    password: string | undefined;
    confirmPassword: string | undefined;
    email: string | undefined;
    fillDataOut: (data: {name?: string, password?: string, confirmPassword?: string, emailAddress?: string}) => void;
    clearData: () => void;
}

interface IState {
    switched: boolean;
    errors: any;
}

function Errors(props: any) {
    const errors = props.messages;
    let text = !errors ? [] : Object.values(errors).join(props.separator);
    return (
        <Text style={styles.validationResultText}>{text}</Text>
      );
}

class UserScreen extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            switched: false,
            errors: undefined
        };
    }

    internalComponentWillUnmount(switched: boolean): void {
        this.setState({switched, errors: undefined});
        this.props.clearData();
    }

    validate(attributes: any): boolean {
        const validationResult = validate(attributes, constraints);
        this.setState({errors: validationResult});
        return (undefined == validationResult);
    }

    validateAll(): boolean {
        return this.validate({name: this.props.name, password: this.props.password, confirmPassword: { value: this.props.confirmPassword }, emailAddress: this.props.email});
    }

    validateNameAndPassword(): boolean {
        return this.validate({name: this.props.name, password: this.props.password, emailAddress: "simple@example.com"});
    }

    signUp() {
        var notValid = !this.validateAll();
        if (notValid) {
            return;
        }
        HttpClient.register(this.props.name!, this.props.email!, this.props.password!)
            .then(_ => {
                Alert.alert(i18n.youHaveSuccessfullysignedUp.capitalize() + '!', '', [{
                    text: i18n.signIn.toUpperCase(), onPress: () => this.setState({switched: false})
                }]);
            })
            .catch(reason => ErrorAlert.alert(reason));
    }

    signIn() {
        var notValid = !this.validateNameAndPassword();
        if (notValid) {
            return;
        }
        HttpClient.login(this.props.name!, this.props.password!)
            .then(response => {
                if (typeof response === 'string') {
                    CacheHandler.clearMineGoods();
                    UserManager.setToken(response);
                    let action = this.props.navigation.getParam('stackAction');
                    this.props.navigation.dispatch(action);
                }
            })
            .catch(reason => ErrorAlert.alert(reason));
    }

    getErrorStyle(property: string) {
        return (this.state.errors?.[property] ? styles.error : null);
    }

    render() {
        const { navigation } = this.props;
        let form = this.state.switched ? <>
         <KeyboardAwareScrollView 
            style={{height:'85%'}}
             resetScrollToCoords={{ x: 0, y: 0 }} 
             scrollEnabled={true} 
         > 
                <View style={styles.inputsAndValidationResultView}>
                    <View style={styles.inputsView}>
                        <StyledTextInput header={i18n.name.toUpperCase()} style = {[styles.textInput, this.getErrorStyle('name')]} onChangeText={(value: string) => this.props.fillDataOut({name: value})} onBlur={() => this.validateAll()} value={this.props.name}/>
                        <StyledTextInput header={i18n.password.toUpperCase()} style = {[styles.textInput, this.getErrorStyle('password')]} onChangeText={(value: string) => this.props.fillDataOut({password: value})} onBlur={() => this.validateAll()} secureTextEntry={true} value={this.props.password}/>
                        <StyledTextInput header={i18n.confirmPassword.toUpperCase()} style = {[styles.textInput, this.getErrorStyle('confirmPassword')]} onChangeText={(value: string) => this.props.fillDataOut({confirmPassword: value})} onBlur={() => this.validateAll()} secureTextEntry={true} value={this.props.confirmPassword}/>
                        <StyledTextInput header={i18n.emailAddress.toUpperCase()} style = {[styles.textInput, this.getErrorStyle('emailAddress')]} onChangeText={(value: string) => this.props.fillDataOut({emailAddress: value})} onBlur={() => this.validateAll()} value={this.props.email}/>
                    </View>
                    <Errors messages={this.state.errors} separator={Utility.LINE_SEPARATOR}/>
                </View>
                <View style={styles.buttonsView}>
                    <View style={styles.buttonWrapper}><StyledButton onPress={() => this.signUp()}>{i18n.signUp.toUpperCase()}</StyledButton></View>
                    <Text style={styles.orText}>{i18n.or.toUpperCase()}</Text>
                    <View style={styles.buttonWrapper}><StyledButton onPress={() => {this.internalComponentWillUnmount(false);}} inverted={true}>{i18n.goToSignIn.toUpperCase()}</StyledButton></View>
                </View>
    </KeyboardAwareScrollView>
            </> : <>
            <KeyboardAwareScrollView 
            style={{height:'75%'}}
             resetScrollToCoords={{ x: 0, y: 0 }} 
             scrollEnabled={true} 
         > 
                <View style={styles.inputsAndValidationResultView}>
                    <View style={styles.inputsView}>
                        <StyledTextInput header={i18n.name.toUpperCase()} style = {[styles.textInput, this.getErrorStyle('name')]} onChangeText={(value: string) => this.props.fillDataOut({name: value})} onBlur={() => this.validateNameAndPassword()} testID="signInUsername" value={this.props.name}/>
                        <StyledTextInput header={i18n.password.toUpperCase()} style = {[styles.textInput, this.getErrorStyle('password')]} onChangeText={(value: string) => this.props.fillDataOut({password: value})} onBlur={() => this.validateNameAndPassword()} secureTextEntry={true} testID="signInPassword" value={this.props.password}/>
                    </View>
                    <Errors messages={this.state.errors} separator={Utility.LINE_SEPARATOR}/>
                </View>
                <View style={styles.buttonsView}>
                    <View style={styles.buttonWrapper}><StyledButton onPress={() => this.signIn()} testID="signInButton">{i18n.signIn.toUpperCase()}</StyledButton></View>
                    <Text style={styles.orText}>{i18n.or.toUpperCase()}</Text>
                    <View style={styles.buttonWrapper}><StyledButton onPress={() => {this.internalComponentWillUnmount(true);}} inverted={true}>{i18n.goToSignUp.toUpperCase()}</StyledButton></View>
                </View>
         </KeyboardAwareScrollView>
            </>;
        return (
            <View style={styles.container}>
                <NavigationEvents onDidBlur={() => this.internalComponentWillUnmount(this.state.switched)} />
                <Text style={styles.messageText}>{navigation.getParam('message')}</Text>
                {form}
            </View>
        );
    }
}

export default connect(conn.mapStateToProps, conn.mapDispatchToProps)(UserScreen);
