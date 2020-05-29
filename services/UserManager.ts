import { AsyncStorage } from 'react-native';

export default class UserManager {

    private static USER_TOKEN: string = 'user_token';

    public static isSignedIn(): Promise<boolean> {
        return new Promise(function (resolve, reject) {
            UserManager.getToken()
                .then(token => resolve((null != token) ? true : false))
                .catch(exception => reject(exception));
        });
    }

    public static getToken(): Promise<string | null> {
        return AsyncStorage.getItem(this.USER_TOKEN);
    }

    public static setToken(token: string): Promise<void> {
        return AsyncStorage.setItem(this.USER_TOKEN, token);
    }

    public static removeToken(): Promise<void> {
        return AsyncStorage.removeItem(this.USER_TOKEN);
    }

}
