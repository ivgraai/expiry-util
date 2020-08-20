import UserManager from "../UserManager";

test("removeToken", async () => {
    await UserManager.setToken("c453d2f2-68fd-4eec-840b-77d290363405");
    expect(await UserManager.isSignedIn()).toBe(true);
    await UserManager.removeToken();
    expect(await UserManager.isSignedIn()).toBe(false);
});
