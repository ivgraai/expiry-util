import Utility from "../Utility";
import { SizeRequest, ImageRequest } from "../../constants/Dtos";

describe("Utility", () => {

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

});
