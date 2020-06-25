import React from "react";
import { fireEvent, waitFor } from "react-native-testing-library";
import { renderWithRedux } from "../../services/TestHelper";
import UserScreen from "../UserScreen";
import HttpClient from "../../services/HttpClient";
import UserManager from "../../services/UserManager";

/* const ReactNative = jest.requireActual("react-native");
ReactNative.AsyncStorage = { } */
class MockStorage {
    cache: any = {};
    setItem = jest.fn((key, value) => new Promise((resolve, reject) => {
        return (typeof key !== 'string' || typeof value !== 'string') ? reject(new Error()) : resolve(this.cache[key] = value);
    }));
    getItem = jest.fn((key) => new Promise((resolve) => {
        return this.cache.hasOwnProperty(key) ? resolve(this.cache[key]) : resolve(null);
    }));
};
jest.mock("react-native/Libraries/Storage/AsyncStorage", () => new MockStorage());

it("signIn", async () => {
    expect.assertions(2);
    const props = {
        navigation: {
            getParam: jest.fn(() => "message"),
        }
    };
    const spy = jest.spyOn(HttpClient, "login");
    spy.mockReturnValue(new Promise(resolve =>
        resolve("14aad09f-08f6-45cc-9109-b417856d2ff5a")
    ));
    const { getByTestId } = renderWithRedux(<UserScreen {...props} />, {initialState: {}});
    fireEvent.changeText(getByTestId("signInUsername"), "username");
    fireEvent.changeText(getByTestId("signInPassword"), "password");
    fireEvent.press(getByTestId("signInButton"));
    let promise = waitFor(() => UserManager.getToken());
    await expect(promise).resolves.not.toBeNull();
    await expect(promise).resolves.toEqual("14aad09f-08f6-45cc-9109-b417856d2ff5a");
    spy.mockRestore();
});
