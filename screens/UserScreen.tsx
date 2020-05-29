import React from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { i18n } from '../constants/Dictionary';
import HttpClient from '../services/HttpClient';
import UserManager from '../services/UserManager';

export default class UserScreen extends React.Component {
    private name!: string;
    private email!: string;
    private password!: string;

    constructor(props: any) {
        super(props);
        this.state = {
            switched: false
        };
    }

    signUp() {
        HttpClient.register(this.name, this.email, this.password)
            .then(response => {
                Alert.alert(response.ok ? i18n.youHaveSuccessfullysignedUp.toUpperCase() : i18n.aProblemOccurredWhileFinalizingYourSigningUp.toUpperCase());
            });
    }

    signIn() {
        HttpClient.login(this.name, this.password)
            .then(response => {
                if (typeof response === 'string') {
                    UserManager.setToken(response);
                    // navigation.goBack() or to the MapScreen
                }
            });
    }

    render() {
        const { navigation } = this.props;
        let form = this.state.switched ? <>
                <Text>{i18n.signUp.toUpperCase()}</Text>
                <Text>{i18n.name.toCamelCase()}</Text>
                <TextInput style = {{ borderColor: "lightgray", borderWidth: 1 }} onChangeText={name => this.name = name}/>
                <Text>{i18n.password.toCamelCase()}</Text>
                <TextInput style = {{ borderColor: "lightgray", borderWidth: 1 }} onChangeText={password => this.password = password} secureTextEntry={true}/>
                <Text>{i18n.confirmPassword.toCamelCase()}</Text>
                <TextInput style = {{ borderColor: "lightgray", borderWidth: 1 }} secureTextEntry={true}/>
                <Text>{i18n.emailAddress.toCamelCase()}</Text>
                <TextInput style = {{ borderColor: "lightgray", borderWidth: 1 }} onChangeText={email => this.email = email}/>
                <Button title={i18n.submit.toCamelCase()} onPress={() => this.signUp()}/>
            </> : <>
                <Text>{i18n.signIn.toUpperCase()}</Text>
                <Text>{i18n.name.toCamelCase()}</Text>
                <TextInput style = {{ borderColor: "lightgray", borderWidth: 1 }} onChangeText={name => this.name = name}/>
                <Text>{i18n.password.toCamelCase()}</Text>
                <TextInput style = {{ borderColor: "lightgray", borderWidth: 1 }} onChangeText={password => this.password = password} secureTextEntry={true}/>
                <Button title={i18n.signUp.toCamelCase()} onPress={() => this.setState({switched: true})}/>
                <Button title={i18n.submit.toCamelCase()} onPress={() => this.signIn()}/>
            </>;
        return (
            <View style = {{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "stretch" }}>
                <Text>{navigation.getParam('message')}</Text>
                {form}
            </View>
        );
    }
}
