import Utility from "../Utility";
import { SizeRequest, ImageRequest, Address } from "../../constants/Dtos";
import * as Permissions from "expo-permissions";
import { resolvedPermissionValue } from "../../services/TestHelper";

describe("Utility", () => {
    let deniedPermission = resolvedPermissionValue(Permissions.PermissionStatus.DENIED, false);

    it("convertImageToDto", () => {
        let uri = "file:///var/mobile/Containers/Data/Application/CB2EDF3E-81AA-4E30-9272-BF039B11AA32/Library/Caches/ExponentExperienceData/%2540ivgraai%252Fexpiry-util/ImagePicker/7106AD16-2332-4A07-AB69-1DFF7DE2F145.jpg";
        expect(Utility.convertImageToDto(uri)).toEqual(new ImageRequest("7106AD16-2332-4A07-AB69-1DFF7DE2F145.jpg", "image/jpg", uri));
    });
    it("remoteURI", () => {
        expect(Utility.remoteURI("null", 13, SizeRequest.large)).toEqual("https://ivgraai.ddns.net:443/v1/good/image/13?size=large&cache=2020");
    });
    it("assignChildState", () => {
        let car: any = {
            brand: "Fiat", model: "500", weight: "850kg", color: { red: 0, green: 128, blue: 255 }
          };
        expect(Utility.assignChildState("color.red", 255, car)).toEqual({
            brand: "Fiat",
            model: "500",
            weight: "850kg",
            color: {
                red: 255,
                green: 128,
                blue: 255
            }
        });
    });
    test("formatAddress", () => {
        let address = new Address({
            country: "England",
            city: "London",
            street: "Houses of Parliament, Westminster",
            postalCode: "SW1A 0AA",
            name: "House of Commons",
            region: "Greater London"
        });
        expect(Utility.formatAddress(address)).toEqual("SW1A 0AA England\nGreater London, London\nHouses of Parliament, Westminster\nHouse of Commons");
    });
    test("currentLocation", () => {
        jest.spyOn(Permissions, "getAsync").mockResolvedValueOnce(deniedPermission);
        jest.spyOn(Permissions, "askAsync").mockResolvedValueOnce(deniedPermission);
        return Utility.currentLocation().then(position => expect(position).toEqual({latitude: 47.497913, longitude: 19.040236}));
    });
    test("todayMidnigth", () => {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        expect(Utility.todayMidnigth()).toEqual(today);
    });
    test("obtainPermission", async () => {
        jest.spyOn(Permissions, "getAsync").mockResolvedValueOnce(deniedPermission);
        let onDeniedCallback = jest.fn(() => {});
        let onGrantedCallback = jest.fn(() => new Promise<void>(resolve => resolve()));
        await Utility.obtainPermission([], false, onGrantedCallback, onDeniedCallback, () => new Promise(resolve => resolve(false)));
        expect(onDeniedCallback.mock.calls.length).toBe(1);
        expect(onGrantedCallback.mock.calls.length).toBe(0);
        jest.spyOn(Permissions, "getAsync").mockResolvedValueOnce(deniedPermission);
        jest.spyOn(Permissions, "askAsync").mockResolvedValueOnce(resolvedPermissionValue(Permissions.PermissionStatus.GRANTED, true));
        await Utility.obtainPermission([], false, onGrantedCallback, onDeniedCallback);
        expect(onGrantedCallback.mock.calls.length).toBe(1);
        expect(onDeniedCallback.mock.calls.length).toBe(1);
    });
});
