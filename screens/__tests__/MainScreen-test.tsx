import React from "react";
import { } from "react-native-testing-library";
import { renderWithRedux } from "../../services/TestHelper";
import MainScreen from "../MainScreen";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

test(`add`, () => {
    let navigation = {
        addListener: (_name: string, _callback: () => void) => () => {}
    };
    renderWithRedux(<MainScreen navigation={navigation} />);
});
