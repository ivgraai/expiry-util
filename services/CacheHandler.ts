import Constants from "expo-constants";
import { AsyncStorage } from "react-native";
import Utility from "../common/Utility";
import DbHelper from "./DbHelper";

export default class CacheHandler {
    private static readonly EVICTION_FREQUENCY: string = Constants.manifest.extra.cache.data.evictionFrequency;
    private static readonly ENABLED: boolean = Constants.manifest.extra.cache.data.enabled;
    private static MINE_GOODS_DATE: string = "mine_goods_date";
    private static NEARBY_GOODS_DATE: string = "nearby_goods_date";

    public static clear() {
        AsyncStorage.removeItem(this.MINE_GOODS_DATE);
        AsyncStorage.removeItem(this.NEARBY_GOODS_DATE);
        DbHelper.deleteMyGoods(true);
        DbHelper.deleteNearbyGood(true);
    }

    public static enabled(): boolean {
        return this.ENABLED;
    }

    public static refreshMineGoods() {
        AsyncStorage.setItem(this.MINE_GOODS_DATE, new Date().toISOString());
    }

    public static clearMineGoods() {
        DbHelper.deleteMyGoods(false);
    }

    public static addMineGoods(good: {name: string, expiry: Date, notifications: string, image: string | undefined}, onSuccess: () => void) {
        DbHelper.insertGood(good, onSuccess);
    }

    public static refreshNearbyGoods() {
        AsyncStorage.setItem(this.NEARBY_GOODS_DATE, new Date().toISOString());
    }

    public static requestNearbyGood(good: {name: string, expiry: Date, distance: number, id: number}) {
        DbHelper.updateNearbyGood(good.name, good.expiry, good.distance, good.id, true);
    }

    public static async isMineGoodsStillValid(): Promise<boolean> {
        let now = Date.now();
        const value = await AsyncStorage.getItem(this.MINE_GOODS_DATE);
        return this.validate(now, value);
    }

    public static async isNearbyGoodsStillValid(): Promise<boolean> {
        let now = Date.now();
        const value = await AsyncStorage.getItem(this.NEARBY_GOODS_DATE);
        return this.validate(now, value);
    }

    private static validate(now: number, value: string | null): boolean {
        return !value ? true :
            (Utility.calculateURLCacheValue(this.EVICTION_FREQUENCY, new Date(now)) ==
            Utility.calculateURLCacheValue(this.EVICTION_FREQUENCY, new Date(value)));
    }
}
