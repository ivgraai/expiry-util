import React from "react";
import { render, fireEvent, waitFor } from "react-native-testing-library";
import "@testing-library/jest-native/extend-expect";
import ApprovalScreen from "../ApprovalScreen";
import "../../common/String.extension";
import HttpClient from "../../services/HttpClient";
import * as Dtos from "../../constants/Dtos";
import UserManager from "../../services/UserManager";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
let originalGetToken: any, originalFindAllRequest: any, originalApproveRequest: any;
const TOKEN: string = "token", REQUEST_ID: number = 2;

beforeAll(() => {
  originalGetToken = UserManager.getToken;
  UserManager.getToken = jest.fn(
    () => new Promise((resolve) => resolve(TOKEN))
  );
  originalFindAllRequest = HttpClient.findAllRequest;
  var datetime = new Date(0).toISOString();
  HttpClient.findAllRequest = jest.fn(
    () =>
      new Promise((resolve) =>
        resolve(
          new Dtos.RequestAllResponse({
            accepted: null,
            datas: [
              { username: "Test Username 1", datetime, message: "Test my message 1?", id: 1 },
              { username: "Test Username 2", datetime, message: "Test my message 2?", id: REQUEST_ID },
              { username: "Test Username 3", datetime, message: "Test my message 3?", id: 3 }
            ]
          }, value => new Date(value))
        )
      )
  );
  originalApproveRequest = HttpClient.approveRequest;
  HttpClient.approveRequest = jest.fn(() => {
    return new Promise<Response>((resolve) => resolve());
  });
});
afterAll(() => {
  HttpClient.approveRequest = originalApproveRequest;
  HttpClient.findAllRequest = originalFindAllRequest;
  UserManager.getToken = originalGetToken;
});

test(`approve`, async () => {
  const { getByTestId } = render(
    <ApprovalScreen navigation={{ getParam: jest.fn(() => 1) }}></ApprovalScreen>
  );
  const id: string = "approveButton1";
  await waitFor(() => getByTestId(id));
  fireEvent.press(getByTestId(id));
  const message: string = "Test reply message!";
  fireEvent.changeText(getByTestId("textInput"), message);
  fireEvent.press(getByTestId("button"));
  await waitFor(() => expect(HttpClient.approveRequest).toHaveBeenCalled());
  expect(HttpClient.approveRequest).toHaveBeenCalledTimes(1);
  expect(HttpClient.approveRequest).toHaveBeenCalledWith(TOKEN, REQUEST_ID, message);
  expect(getByTestId(id)).toBeDisabled();
});
