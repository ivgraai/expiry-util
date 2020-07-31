import { renderHook } from "@testing-library/react-hooks";
import fetchMock from "jest-fetch-mock";
import { useFetch } from "../UseFetch";

test(`useFetch`, async () => {
  const expected = { name: "Gergo IVAN", age: 30 };
  fetchMock.mockResponseOnce(JSON.stringify(expected));
  const { result, waitForNextUpdate } = renderHook(() =>
    useFetch("https://example.com", response => response.json())
  );
  expect(result.current.loading).toBe(true);
  await waitForNextUpdate();
  expect(result.current.loading).toBe(false);
  expect(result.current.response).toEqual(expected);
});
