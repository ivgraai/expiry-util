import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { i18n } from '../constants/Dictionary';
import HttpClient from '../services/HttpClient';

export default class UserScreen extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            name: undefined,
            email: undefined,
            password: undefined
        };
    }

    signUp() {
        HttpClient.register(this.state.name, this.state.email, this.state.password)
            .then(response => {
                // alert("successful");
            })
            .catch(error => console.log("unsuccessful"));
    }

    render() {
        return (
            // TODO: indicate why the user has to login
            <View style = {{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "stretch" }}>
                <Text>{i18n.signUp.toUpperCase()}</Text>
                <Text>{i18n.name.toCamelCase()}</Text>
                <TextInput style = {{ borderColor: "lightgray", borderWidth: 1 }} onChangeText={name => this.setState({name})}/>
                <Text>{i18n.emailAddress.toCamelCase()}</Text>
                <TextInput style = {{ borderColor: "lightgray", borderWidth: 1 }} onChangeText={email => this.setState({email})}/>
                <Text>{i18n.password.toCamelCase()}</Text>
                <TextInput style = {{ borderColor: "lightgray", borderWidth: 1 }} onChangeText={password => this.setState({password})}/>
                <Text>{i18n.confirmPassword.toCamelCase()}</Text>
                <TextInput style = {{ borderColor: "lightgray", borderWidth: 1 }}/>
                <Button title={i18n.submit.toCamelCase()} onPress={() => this.signUp()}/>
            </View>
        );
    }
}
