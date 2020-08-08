import React from "react";
import { SafeAreaViewProps } from "react-navigation";

jest.mock("react-navigation", () => ({
  ...require.requireActual("react-navigation"),
  NavigationEvents: "mockNavigationEvents",
  withNavigation: (Component: React.ComponentClass) => (props: any) => (
    <Component navigation={{ navigate: jest.fn() }} {...props} />
  ),
  SafeAreaView: ({ children }: SafeAreaViewProps) => <>{children}</>,
  ThemeColors: {
    light: {
      label: "rgba(0, 0, 0, 0.9)",
      bodyContent: "",
    },
    dark: {
      body: "rgba(0, 0, 0, 0.9)",
      bodyContent: "",
    },
  },
}));
module.exports = require.requireMock("react-navigation");
