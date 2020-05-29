import React from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { i18n } from '../constants/Dictionary';
import HttpClient from '../services/HttpClient';
import UserManager from '../services/UserManager';
import { StackActions, NavigationActions } from 'react-navigation';
import { styles } from '../constants/styles/UserScreen';

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
                if (response.ok) {
                    Alert.alert(i18n.youHaveSuccessfullysignedUp.toUpperCase(), '', [{
                        text: i18n.signIn.toUpperCase(), onPress: () => this.setState({switched: false})
                    }]);
                } else {
                    Alert.alert(i18n.aProblemOccurredWhileCommunicatingWithTheServer.toUpperCase());
                }
            });
    }

    signIn() {
        HttpClient.login(this.name, this.password)
            .then(response => {
                if (typeof response === 'string') {
                    UserManager.setToken(response);
                    let replaceAction = StackActions.replace({
                        key: undefined,
                        routeName: 'Map'
                    });
                    this.props.navigation.dispatch(replaceAction);
                }
            });
    }

    render() {
        const { navigation } = this.props;
        let form = this.state.switched ? <>
                <Text style={styles.signUpInText}>{i18n.signUp.toUpperCase()}</Text>
                <View style={styles.hrView}/>
                <Text style={styles.text}>{i18n.name.toCamelCase()}</Text>
                <TextInput style = {styles.textInput} onChangeText={name => this.name = name}/>
                <Text style={styles.text}>{i18n.password.toCamelCase()}</Text>
                <TextInput style = {styles.textInput} onChangeText={password => this.password = password} secureTextEntry={true}/>
                <Text style={styles.text}>{i18n.confirmPassword.toCamelCase()}</Text>
                <TextInput style = {styles.textInput} secureTextEntry={true}/>
                <Text style={styles.text}>{i18n.emailAddress.toCamelCase()}</Text>
                <TextInput style = {styles.textInput} onChangeText={email => this.email = email}/>
                <View style={styles.buttonWrapper}><Button title={i18n.signIn.toCamelCase()} onPress={() => this.setState({switched: false})}/></View>
                <Text style={styles.orText}>{i18n.or}</Text>
                <View style={styles.buttonWrapper}><Button title={i18n.submit.toCamelCase()} onPress={() => this.signUp()}/></View>
            </> : <>
                <Text style={styles.signUpInText}>{i18n.signIn.toUpperCase()}</Text>
                <View style={styles.hrView}/>
                <Text style={styles.text}>{i18n.name.toCamelCase()}</Text>
                <TextInput style = {styles.textInput} onChangeText={name => this.name = name}/>
                <Text style={styles.text}>{i18n.password.toCamelCase()}</Text>
                <TextInput style = {styles.textInput} onChangeText={password => this.password = password} secureTextEntry={true}/>
                <View style={styles.buttonWrapper}><Button title={i18n.signUp.toCamelCase()} onPress={() => this.setState({switched: true})}/></View>
                <Text style={styles.orText}>{i18n.or}</Text>
                <View style={styles.buttonWrapper}><Button title={i18n.submit.toCamelCase()} onPress={() => this.signIn()}/></View>
            </>;
        return (
            <View style={styles.container}>
                <Text style={styles.messageText}>{navigation.getParam('message')}</Text>
                {form}
            </View>
        );
    }
}
