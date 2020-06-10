import '../String.extension';

describe("String", () => {

    it("capitalize", () => {
        expect("lorem ipsum dolor sit amet, consectetur adipiscing elit.".capitalize()).toEqual("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
    });
    it("toCamelCase", () => {
        expect("Integer id gravida nibh, vel aliquet purus. Curabitur quis erat libero.".toCamelCase()).toEqual("Integer Id Gravida Nibh, Vel Aliquet Purus. Curabitur Quis Erat Libero.");
    });

});
