import fetch from "jest-fetch-mock";
import HttpClient from "../HttpClient";
import * as Dtos from "../../constants/Dtos";

const BASE_URL: string = "https://ivgraai.ddns.net:443/v1/";
function mockOnce(body?: string) {
  return fetchMock.once(
    () =>
      new Promise((resolve) =>
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
      )
  );
}
function testToken(
  headers: Headers | string[][] | Record<string, string> | undefined,
  token: string
) {
  expect((headers as { [key: string]: string })["token"]).toEqual(token);
}

describe(`HttpClient`, () => {
  // abort
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
  // addGood
  test(`listAllGood`, async () => {
    const counter = 3;
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
    const counter = 4;
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
    const counter = 5;
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
    const counter = 6;
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
    const counter = 7;
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
    const counter = 8;
    var message = "test message";
    mockOnce(message);
    var token = "token",
      id = 0;
    await HttpClient.approveRequest(token, id, message);
    expect(fetch.mock.calls[counter][0]).toEqual(BASE_URL + "request/" + id);
    expect(fetch.mock.calls[counter][1]!.method).toEqual("PUT");
    testToken(fetch.mock.calls[counter][1]!.headers, token);
    expect(fetch.mock.calls[counter][1]!.body).toEqual(message);
  });
  // wrong status (reject)
  // wrong content
});
