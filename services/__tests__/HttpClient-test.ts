import fetch from "jest-fetch-mock";
import HttpClient from "../HttpClient";
import * as Dtos from "../../constants/Dtos";
import Constants from "expo-constants";
import Utility from "../../common/Utility";

function FormDataMock() {
  this.append = jest.fn();
}
global.FormData = FormDataMock;

const BASE_URL: string = Constants.manifest.extra.serverUrl;
const TIME_TO_RUN: number = Constants.manifest.extra.httpTimeout;
function mockOnce(body?: string, milliseconds: number = 0) {
  return fetchMock.once(() => {
    if (0 != milliseconds) {
      jest.advanceTimersByTime(milliseconds);
    }
    return new Promise((resolve) =>
      resolve({
        status: 200,
        statusText: "OK",
        url: "",
        body,
        init: {
          headers: {
            "Content-Type": "application/json",
          },
        },
      })
    );
  });
}
function testToken(
  headers: Headers | string[][] | Record<string, string> | undefined,
  token: string
) {
  expect((headers as { [key: string]: string })["token"]).toEqual(token);
}

describe(`HttpClient`, () => {
  test(`login`, async () => {
    const counter = 0;
    var token = "test token";
    mockOnce(token);
    var name = "test_name",
      password = "test_password";
    let response = await HttpClient.login(name, password);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(response).toEqual(token);
    expect(fetch.mock.calls[counter][0]).toEqual(
      BASE_URL + "user?name=" + name + "&password=" + password
    );
    expect(fetch.mock.calls[counter][1]!.method).toEqual("GET");
  });
  test(`register`, async () => {
    const counter = 1;
    mockOnce();
    var name = "test name",
      password = "test password",
      email = "test email";
    await HttpClient.register(name, email, password);
    expect(fetch.mock.calls[counter][0]).toEqual(BASE_URL + "user");
    expect(fetch.mock.calls[counter][1]!.method).toEqual("POST");
    expect(fetch.mock.calls[counter][1]!.body).toEqual(
      '{"password":"' +
        password +
        '","name":"' +
        name +
        '","email":"' +
        email +
        '"}'
    );
  });
  test(`unregister`, async () => {
    const counter = 2;
    mockOnce();
    var token = "test token";
    await HttpClient.unregister(token);
    expect(fetch.mock.calls[counter][0]).toEqual(BASE_URL + "user");
    expect(fetch.mock.calls[counter][1]!.method).toEqual("DELETE");
    testToken(fetch.mock.calls[counter][1]!.headers, token);
  });
  test(`addGood`, async () => {
    const counter = 3;
    mockOnce();
    var token = "test token",
      name = "test name",
      expiry = new Date(),
      latitude = 47.497913,
      longitude = 19.040236,
      available = true,
      image = Utility.convertImageToDto(
        "file:///var/mobile/Containers/Data/Application/CB2EDF3E-81AA-4E30-9272-BF039B11AA32/Library/Caches/ExponentExperienceData/%2540ivgraai%252Fexpiry-util/ImagePicker/7106AD16-2332-4A07-AB69-1DFF7DE2F145.jpg"
      );
    await HttpClient.addGood(
      token,
      name,
      expiry,
      latitude,
      longitude,
      available,
      image
    );
    expect(fetch.mock.calls[counter][0]).toEqual(BASE_URL + "good/add");
    expect(fetch.mock.calls[counter][1]!.method).toEqual("POST");
    testToken(fetch.mock.calls[counter][1]!.headers, token);
    let body: any = (fetch.mock.calls[counter][1]!.body as FormData).append.mock
      .calls;
    expect(body[0][0]).toEqual("image");
    expect(body[0][1].name).toEqual("7106AD16-2332-4A07-AB69-1DFF7DE2F145.jpg");
    expect(body[0][1].type).toEqual("image/jpg");
    expect(body[0][1].uri).toEqual(
      "/var/mobile/Containers/Data/Application/CB2EDF3E-81AA-4E30-9272-BF039B11AA32/Library/Caches/ExponentExperienceData/%2540ivgraai%252Fexpiry-util/ImagePicker/7106AD16-2332-4A07-AB69-1DFF7DE2F145.jpg"
    );
    expect(body[1][0]).toEqual("name");
    expect(body[1][1]).toEqual(name);
    expect(body[2][0]).toEqual("expiry");
    expect(body[2][1]).toEqual(expiry.toISOString());
    expect(body[3][0]).toEqual("location.latitude");
    expect(body[3][1]).toEqual(latitude);
    expect(body[4][0]).toEqual("location.longitude");
    expect(body[4][1]).toEqual(longitude);
    expect(body[5][0]).toEqual("available");
    expect(body[5][1]).toEqual(available);
  });
  test(`listAllGood`, async () => {
    const counter = 4;
    var expectedName = "test name 2",
      expectedExpiry = new Date(),
      expectedIsRequestedByOther = true,
      expectedId = 2;
    mockOnce(
      JSON.stringify([
        {
          name: "test name 1",
          expiry: new Date().toISOString(),
          isRequestedByOther: false,
          id: 1,
        },
        {
          name: expectedName,
          expiry: expectedExpiry.toISOString(),
          isRequestedByOther: expectedIsRequestedByOther,
          id: expectedId,
        },
      ])
    );
    var token = "test token";
    let response = await HttpClient.listAllGood(token);
    expect(response).toEqual(
      expect.arrayContaining([
        expect.any(Dtos.GoodAllResponse),
        expect.any(Dtos.GoodAllResponse),
        expect.objectContaining(
          new Dtos.GoodAllResponse()
            .setName(expectedName)
            .setExpiry(expectedExpiry)
            .setIsRequestedByOther(expectedIsRequestedByOther)
            .setId(expectedId)
        ),
      ])
    );
    expect(fetch.mock.calls[counter][0]).toEqual(BASE_URL + "good/all");
    expect(fetch.mock.calls[counter][1]!.method).toEqual("GET");
    testToken(fetch.mock.calls[counter][1]!.headers, token);
  });
  test(`listNearbyGood`, async () => {
    const counter = 5;
    var expectedName = "test name",
      expectedExpiry = new Date(),
      expectedDistance = 1234,
      expectedId = 0,
      expectedIsRequestedByMe = true;
    mockOnce(
      JSON.stringify([
        {
          name: expectedName,
          expiry: expectedExpiry.toISOString(),
          distance: expectedDistance,
          id: expectedId,
          isRequestedByMe: expectedIsRequestedByMe,
        },
      ])
    );
    var latitude = 47.497913,
      longitude = 19.040236;
    let response = await HttpClient.listNearbyGood(null, latitude, longitude);
    expect(response).toHaveLength(1);
    expect(response[0]).toEqual(
      new Dtos.GoodNearbyResponse().buildFromValues(
        expectedName,
        expectedExpiry,
        expectedDistance,
        expectedId,
        expectedIsRequestedByMe
      )
    );
    expect(fetch.mock.calls[counter][0]).toEqual(
      BASE_URL +
        "good/nearby?location.latitude=" +
        latitude +
        "&location.longitude=" +
        longitude +
        "&radius=3000"
    );
    expect(fetch.mock.calls[counter][1]!.method).toEqual("GET");
  });
  test(`requestTheGood`, async () => {
    const counter = 6;
    var token = "test token";
    mockOnce();
    var goodId = 1,
      message = "test message";
    await HttpClient.requestTheGood(token, goodId, message);
    expect(fetch.mock.calls[counter][0]).toEqual(BASE_URL + "good/need");
    expect(fetch.mock.calls[counter][1]!.method).toEqual("POST");
    testToken(fetch.mock.calls[counter][1]!.headers, token);
    expect(fetch.mock.calls[counter][1]!.body).toEqual(
      '{"id":' + goodId + ',"message":"' + message + '"}'
    );
  });
  test(`checkStatus`, async () => {
    const counter = 7;
    var payload = {
      address: {
        country: "test country",
        city: "test city",
        street: "test street",
        postalCode: "test postal code",
        name: "test name",
        region: "test region",
      },
      replyMessage: "test reply message",
      isAccepted: false,
      name: "test name",
      expiry: new Date().toISOString(),
      myMessage: "test my message",
      username: "test username",
    };
    mockOnce(JSON.stringify(payload));
    var id = 0;
    let response = await HttpClient.checkStatus(null, id);
    expect(response).toEqual(
      new Dtos.GoodResponse(payload, (value) => new Date(value))
    );
    expect(fetch.mock.calls[counter][0]).toEqual(BASE_URL + "good/" + id);
    expect(fetch.mock.calls[counter][1]!.method).toEqual("GET");
  });
  test(`findAllRequest`, async () => {
    const counter = 8;
    var expectedUsername = "test username 1",
      expectedDatetime = new Date(),
      expectedMessage = "test message 1",
      expectedId = 1;
    var payload = {
      accepted: expectedId,
      datas: [
        {
          username: expectedUsername,
          datetime: expectedDatetime.toISOString(),
          message: expectedMessage,
          id: expectedId,
        },
        {
          username: "test username 2",
          datetime: new Date().toISOString(),
          message: "test message 2",
          id: 2,
        },
      ],
    };
    mockOnce(JSON.stringify(payload));
    var token = "test token",
      goodId = 1;
    let response = await HttpClient.findAllRequest(token, goodId);
    expect(response.accepted).toBe(1);
    expect(response.datas).toContainEqual(
      new Dtos.RequestData(
        {
          username: expectedUsername,
          datetime: expectedDatetime,
          message: expectedMessage,
          id: expectedId,
        },
        (value) => new Date(value)
      )
    );
    expect(fetch.mock.calls[counter][0]).toEqual(
      BASE_URL + "request/all?goodId=" + goodId
    );
    expect(fetch.mock.calls[counter][1]!.method).toEqual("GET");
    testToken(fetch.mock.calls[counter][1]!.headers, token);
  });
  test(`approveRequest`, async () => {
    const counter = 9;
    var message = "test message";
    mockOnce(message);
    var token = "test token",
      id = 0;
    await HttpClient.approveRequest(token, id, message);
    expect(fetch.mock.calls[counter][0]).toEqual(BASE_URL + "request/" + id);
    expect(fetch.mock.calls[counter][1]!.method).toEqual("PUT");
    testToken(fetch.mock.calls[counter][1]!.headers, token);
    expect(fetch.mock.calls[counter][1]!.body).toEqual(message);
  });
  test(`aborting`, async () => {
    jest.useFakeTimers();
    mockOnce("", TIME_TO_RUN + 500);
    await expect(HttpClient.login("test name", "test password")).rejects.toThrow("Aborted");
    jest.useRealTimers();
  });
});
