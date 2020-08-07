import MockStorage from "AsyncStorage";
import "react-native-gesture-handler/jestSetup";

jest.mock("react-native/Libraries/Storage/AsyncStorage", () => new MockStorage());
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

require("jest-fetch-mock").enableMocks();
fetchMock.doMock();

if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
  process.on("unhandledRejection", (reason) => {
    console.log("REJECTION", reason);
    // throw reason;
  });
  process.env.LISTENING_TO_UNHANDLED_REJECTION = true;
}
