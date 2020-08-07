import React from "react";
import { fireEvent } from "react-native-testing-library";
import AppNavigator from "../AppNavigator";
import { renderWithRedux } from "../../services/TestHelper";
import UserManager from "../../services/UserManager";

jest.mock("react-native-maps", () => {
  const { View } = require("react-native");
  const MockMapView = (props: any) => {
    return <View>{props.children}</View>;
  };
  const MockMarker = (props: any) => {
    return <View>{props.children}</View>;
  };
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  };
});

test(`MainTabNavigator and MapScreen`, async () => {
  jest.spyOn(UserManager, "isSignedIn").mockResolvedValueOnce(true);
  const component = <AppNavigator />;
  const { findByText, findByTestId } = renderWithRedux(component);
  const toClick = await findByText("SET LOCATION");
  fireEvent(toClick, "press");
  const newHeader = await findByTestId("header-back");
  expect(newHeader).toBeTruthy();
});
