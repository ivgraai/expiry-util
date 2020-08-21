import moment from 'moment';

describe('CacheHandler', () => {
  test(`enabled`, () => {
    var CacheHandler = require('../CacheHandler');
    expect(CacheHandler.default.enabled()).toBe(false);
  });
  test(`isMineGoodsStillValid`, async () => {
    var CacheHandler = require('../CacheHandler');
    expect(await CacheHandler.default.isMineGoodsStillValid()).toEqual(true);
    CacheHandler.default.refreshMineGoods();
    expect(await CacheHandler.default.isMineGoodsStillValid()).toEqual(true);
    jest.spyOn(Date, 'now').mockReturnValueOnce(new Date().getTime() + 24 * 60 * 60 * 1000 + 1);
    expect(await CacheHandler.default.isMineGoodsStillValid()).toEqual(false);
  });
  test(`isNearbyGoodsStillValid`, async () => {
    jest.resetModules();
    jest.mock('expo-constants', () => ({
      manifest: {
        extra: {
          cache: {
            data: {
              evictionFrequency: 'monthly',
            },
          },
        },
      },
    }));
    var CacheHandler = require('../CacheHandler');
    CacheHandler.default.refreshNearbyGoods();
    jest
      .spyOn(Date, 'now')
      .mockReturnValueOnce(moment().endOf('month').valueOf());
    expect(await CacheHandler.default.isNearbyGoodsStillValid()).toEqual(true);
  });
});
