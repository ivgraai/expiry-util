import CacheHandler from "../CacheHandler";

test(`isMineGoodsStillValid`, async () => {
  expect(await CacheHandler.isMineGoodsStillValid()).toEqual(true);
  CacheHandler.refreshMineGoods();
  expect(await CacheHandler.isMineGoodsStillValid()).toEqual(true);
  jest
    .spyOn(Date, "now")
    .mockReturnValueOnce(new Date().getTime() + 24 * 60 * 60 * 1000 + 1);
  expect(await CacheHandler.isMineGoodsStillValid()).toEqual(false);
});
