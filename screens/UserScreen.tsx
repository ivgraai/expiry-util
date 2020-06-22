import React from 'react';
import { View, Text, Alert } from 'react-native';
import StyledTextInput from '../components/StyledTextInput';
import StyledButton from '../components/StyledButton';
import { i18n } from '../constants/Dictionary';
import HttpClient from '../services/HttpClient';
import UserManager from '../services/UserManager';
import Utility from '../common/Utility';
import { styles } from '../constants/styles/UserScreen';
import validate from 'validate.js';
import constraints from '../constants/validation/UserConstraint';

interface IProps {
    navigation: any;
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

export default class UserScreen extends React.Component<IProps, IState> {
    private name!: string;
    private email!: string;
    private password!: string;
    private confirmPassword!: string;

    constructor(props: any) {
        super(props);
        this.state = {
            switched: false,
            errors: undefined
        };
    }

    validate(attributes: any): boolean {
        const validationResult = validate(attributes, constraints);
        this.setState({errors: validationResult});
        return (undefined == validationResult);
    }

    validateAll(): boolean {
        return this.validate({name: this.name, password: this.password, confirmPassword: this.confirmPassword, emailAddress: this.email});
    }

    validateNameAndPassword(): boolean {
        return this.validate({name: this.name, password: this.password, emailAddress: "simple@example.com"});
    }

    signUp() {
        var notValid = !this.validateAll();
        if (notValid) {
            return;
        }
        HttpClient.register(this.name, this.email, this.password)
            .then(response => {
                if (response.ok) {
                    Alert.alert(i18n.youHaveSuccessfullysignedUp.capitalize() + '!', '', [{
                        text: i18n.signIn.toUpperCase(), onPress: () => this.setState({switched: false})
                    }]);
                } else {
                    Alert.alert(i18n.aProblemOccurredWhileCommunicatingWithTheServer.toUpperCase());
                }
            })
            .catch(HttpClient.ERROR_HANDLER);
    }

    signIn() {
        var notValid = !this.validateNameAndPassword();
        if (notValid) {
            return;
        }
        HttpClient.login(this.name, this.password)
            .then(response => {
                if (typeof response === 'string') {
                    UserManager.setToken(response);
                    let action = this.props.navigation.getParam('stackAction');
                    this.props.navigation.dispatch(action);
                }
            });
    }

    getErrorStyle(property: string) {
        return (this.state.errors?.[property] ? styles.error : null);
    }

    render() {
        const { navigation } = this.props;
        let form = this.state.switched ? <>
                <View style={styles.inputsAndValidationResultView}>
                    <View style={styles.inputsView}>
                        <StyledTextInput header={i18n.name.toUpperCase()} style = {[styles.textInput, this.getErrorStyle('name')]} onChangeText={(value: string) => this.name = value} onBlur={() => this.validateAll()}/>
                        <StyledTextInput header={i18n.password.toUpperCase()} style = {[styles.textInput, this.getErrorStyle('password')]} onChangeText={(value: string) => this.password = value} onBlur={() => this.validateAll()} secureTextEntry={true}/>
                        <StyledTextInput header={i18n.confirmPassword.toUpperCase()} style = {[styles.textInput, this.getErrorStyle('confirmPassword')]} onChangeText={(value: string) => this.confirmPassword = value} onBlur={() => this.validateAll()} secureTextEntry={true}/>
                        <StyledTextInput header={i18n.emailAddress.toUpperCase()} style = {[styles.textInput, this.getErrorStyle('emailAddress')]} onChangeText={(value: string) => this.email = value} onBlur={() => this.validateAll()}/>
                    </View>
                    <Errors messages={this.state.errors} separator={Utility.LINE_SEPARATOR}/>
                </View>
                <View style={styles.buttonsView}>
                    <View style={styles.buttonWrapper}><StyledButton onPress={() => this.signUp()}>{i18n.signUp.toUpperCase()}</StyledButton></View>
                    <Text style={styles.orText}>{i18n.or.toUpperCase()}</Text>
                    <View style={styles.buttonWrapper}><StyledButton onPress={() => this.setState({switched: false})} inverted={true}>{i18n.goToSignIn.toUpperCase()}</StyledButton></View>
                </View>
            </> : <>
                <View style={styles.inputsAndValidationResultView}>
                    <View style={styles.inputsView}>
                        <StyledTextInput header={i18n.name.toUpperCase()} style = {[styles.textInput, this.getErrorStyle('name')]} onChangeText={(value: string) => this.name = value} onBlur={() => this.validateNameAndPassword()} testID="signInUsername"/>
                        <StyledTextInput header={i18n.password.toUpperCase()} style = {[styles.textInput, this.getErrorStyle('password')]} onChangeText={(value: string) => this.password = value} onBlur={() => this.validateNameAndPassword()} secureTextEntry={true} testID="signInPassword"/>
                    </View>
                    <Errors messages={this.state.errors} separator={Utility.LINE_SEPARATOR}/>
                </View>
                <View style={styles.buttonsView}>
                    <View style={styles.buttonWrapper}><StyledButton onPress={() => this.signIn()} testID="signInButton">{i18n.signIn.toUpperCase()}</StyledButton></View>
                    <Text style={styles.orText}>{i18n.or.toUpperCase()}</Text>
                    <View style={styles.buttonWrapper}><StyledButton onPress={() => this.setState({switched: true})} inverted={true}>{i18n.goToSignUp.toUpperCase()}</StyledButton></View>
                </View>
            </>;
        return (
            <View style={styles.container}>
                <Text style={styles.messageText}>{navigation.getParam('message')}</Text>
                {form}
            </View>
        );
    }
}
