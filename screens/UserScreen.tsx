import React from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { i18n } from '../constants/Dictionary';
import HttpClient from '../services/HttpClient';
import UserManager from '../services/UserManager';
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
        <Text>{text}</Text>
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
                    Alert.alert(i18n.youHaveSuccessfullysignedUp.toUpperCase(), '', [{
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
                <Text style={styles.signUpInText}>{i18n.signUp.toUpperCase()}</Text>
                <View style={styles.hrView}/>
                <Text style={styles.text}>{i18n.name.toCamelCase()}</Text>
                <TextInput style = {[styles.textInput, this.getErrorStyle('name')]} onChangeText={value => this.name = value} onBlur={() => this.validateAll()}/>
                <Text style={styles.text}>{i18n.password.toCamelCase()}</Text>
                <TextInput style = {[styles.textInput, this.getErrorStyle('password')]} onChangeText={value => this.password = value} onBlur={() => this.validateAll()} secureTextEntry={true}/>
                <Text style={styles.text}>{i18n.confirmPassword.toCamelCase()}</Text>
                <TextInput style = {[styles.textInput, this.getErrorStyle('confirmPassword')]} onChangeText={value => this.confirmPassword = value} onBlur={() => this.validateAll()} secureTextEntry={true}/>
                <Text style={styles.text}>{i18n.emailAddress.toCamelCase()}</Text>
                <TextInput style = {[styles.textInput, this.getErrorStyle('emailAddress')]} onChangeText={value => this.email = value} onBlur={() => this.validateAll()}/>
                <Errors messages={this.state.errors} separator={"\n"}/>
                <View style={styles.buttonWrapper}><Button title={i18n.submit.toCamelCase()} onPress={() => this.signUp()}/></View>
                <Text style={styles.orText}>{i18n.or}</Text>
                <View style={styles.buttonWrapper}><Button title={i18n.signIn.toCamelCase()} onPress={() => this.setState({switched: false})}/></View>
            </> : <>
                <Text style={styles.signUpInText}>{i18n.signIn.toUpperCase()}</Text>
                <View style={styles.hrView}/>
                <Text style={styles.text}>{i18n.name.toCamelCase()}</Text>
                <TextInput style = {[styles.textInput, this.getErrorStyle('name')]} onChangeText={value => this.name = value} onBlur={() => this.validateNameAndPassword()} testID="signInUsername"/>
                <Text style={styles.text}>{i18n.password.toCamelCase()}</Text>
                <TextInput style = {[styles.textInput, this.getErrorStyle('password')]} onChangeText={value => this.password = value} onBlur={() => this.validateNameAndPassword()} secureTextEntry={true} testID="signInPassword"/>
                <Errors messages={this.state.errors} separator={"\n"}/>
                <View style={styles.buttonWrapper}><Button title={i18n.submit.toCamelCase()} onPress={() => this.signIn()} testID="signInButton"/></View>
                <Text style={styles.orText}>{i18n.or}</Text>
                <View style={styles.buttonWrapper}><Button title={i18n.signUp.toCamelCase()} onPress={() => this.setState({switched: true})}/></View>
            </>;
        return (
            <View style={styles.container}>
                <Text style={styles.messageText}>{navigation.getParam('message')}</Text>
                {form}
            </View>
        );
    }
}
