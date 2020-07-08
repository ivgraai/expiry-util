import Constants from "expo-constants";
import { AsyncStorage } from "react-native";
import Utility from "../common/Utility";

export default class CacheHandler {
    private static readonly EVICTION_FREQUENCY: string = Constants.manifest.extra.cache.dataEvictionFrequency;
    private static MINE_GOODS_DATE: string = "mine_goods_date";
    private static NEARBY_GOODS_DATE: string = "nearby_goods_date";

    public static clear() {
        AsyncStorage.removeItem(CacheHandler.MINE_GOODS_DATE);
        AsyncStorage.removeItem(CacheHandler.NEARBY_GOODS_DATE);
    }

    public static refreshMineGoods() {
        AsyncStorage.setItem(CacheHandler.MINE_GOODS_DATE, new Date().toISOString());
    }

    public static refreshNearbyGoods() {
        AsyncStorage.setItem(CacheHandler.NEARBY_GOODS_DATE, new Date().toISOString());
    }

    public static async isMineGoodsStillValid(): Promise<boolean> {
        let now = new Date();
        const value = await AsyncStorage.getItem(CacheHandler.MINE_GOODS_DATE);
        return CacheHandler.validate(now, value);
    }

    public static async isNearbyGoodsStillValid(): Promise<boolean> {
        let now = new Date();
        const value = await AsyncStorage.getItem(CacheHandler.NEARBY_GOODS_DATE);
        return CacheHandler.validate(now, value);
    }

    private static validate(now: Date, value: string | null): boolean {
        return !value ? false :
            (Utility.calculateURLCacheValue(CacheHandler.EVICTION_FREQUENCY, now) ==
            Utility.calculateURLCacheValue(CacheHandler.EVICTION_FREQUENCY, new Date(value)));
    }
}
