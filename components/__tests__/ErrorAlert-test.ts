import * as ErrorAlert from "../ErrorAlert";
import { Alert } from "react-native";
import "../../common/String.extension";
import UnsupportedStatusException from "../../common/errors/UnsupportedStatusException";
import UnsupportedContentException from "../../common/errors/UnsupportedContentException";
import EmptyResultException from "../../common/errors/EmptyResultException";

const TITLE = "A problem occurred while communicating with the server";
const BUTTONS = [{ onPress: undefined, text: "Okay" }];

describe(`ErrorAlert`, () => {
  let spy: jest.SpyInstance<
    void,
    [
      string,
      (string | undefined)?,
      (import("react-native").AlertButton[] | undefined)?,
      (import("react-native").AlertOptions | undefined)?
    ]
  >;
  beforeEach(() => {
    spy = jest.spyOn(Alert, "alert");
  });
  test(`without error`, () => {
    ErrorAlert.alert(null);
    expect(spy).toHaveBeenCalledTimes(0);
  });
  test(`with unsupported status error`, () => {
    ErrorAlert.alert(new UnsupportedStatusException(404));
    expect(spy).toHaveBeenCalledWith(TITLE, "Unsupported status (404)", BUTTONS);
  });
  test(`with unsupported content error`, () => {
    ErrorAlert.alert(new UnsupportedContentException("text/html"));
    expect(spy).toHaveBeenCalledWith(TITLE, "Unsupported content (text/html)", BUTTONS);
  });
  test(`with result set is empty error`, () => {
    ErrorAlert.alert(new EmptyResultException());
    expect(spy).toHaveBeenCalledWith(TITLE, "Result set is empty", BUTTONS);
  });
  afterEach(() => {
    spy.mockRestore();
  });
});
