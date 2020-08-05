import fetch from "jest-fetch-mock";
import HttpClient from "../HttpClient";

const BASE_URL: string = "https://ivgraai.ddns.net:443/v1/";

describe(`HttpClient`, () => {
  test(`login`, async () => {
    var token = "token";
    fetchMock.once(
      () =>
        new Promise((resolve) =>
          resolve({
            status: 200,
            statusText: "OK",
            url: "",
            body: token,
            init: {
              headers: {
                "Content-Type": "application/json",
              },
            },
          })
        )
    );
    var name = "name",
      password = "password";
    let response = await HttpClient.login(name, password);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(response).toEqual(token);
    expect(fetch.mock.calls[0][0]).toEqual(
      BASE_URL + "user?name=" + name + "&password=" + password
    );
    expect(fetch.mock.calls[0][1]!.method).toEqual("GET");
  });
});
