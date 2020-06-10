import Utility from "../Utility";
import { SizeRequest } from "../../constants/Dtos";

it("imageRemoteRI", () => {
    expect(Utility.remoteURI("null", 13, SizeRequest.large)).toEqual("https://ivgraai.ddns.net:443/v1/good/image/13?size=large&cache=2020");
});
