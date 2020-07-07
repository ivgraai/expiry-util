import * as SQLite from 'expo-sqlite';

export default class DbHelper {
    private static db = SQLite.openDatabase('ivgraai');

    static initialize() {
        DbHelper.db.transaction(tx => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS goods(id INTEGER, name VARCHAR(32), expiry DATE, notifications BLOB, image TEXT)", []);
            tx.executeSql("CREATE TABLE IF NOT EXISTS downloads(id INTEGER PRIMARY KEY AUTOINCREMENT, type VARCHAR(16), uri TEXT, foreign_key INTEGER)");
            tx.executeSql("CREATE TABLE IF NOT EXISTS nearby_datas(name VARCHAR(32), expiry DATE, distance REAL, id INTEGER, is_requested_by_me INTEGER, latitude REAL, longitude REAL)");
        });
    }

    private static fromBoolean(value: boolean): number {
        return value ? 1 : 0;
    }

    static select1FromDual() {
        DbHelper.db.transaction(tx => tx.executeSql("SELECT * FROM sqlite_master WHERE type = 'table'", [], (_tr, { rows }) => console.log(rows)));
    }

    static insertGood(entity: any, callback?: () => void) {
        DbHelper.db.transaction(tx => tx.executeSql("INSERT INTO goods(name, expiry, notifications, image) VALUES(?, ?, ?, ?)", [entity.name, entity.expiry.toISOString(), entity.notifications, entity.image], () => {}, _error => { return true; }), undefined, callback);
    }

    static selectGoods(): Promise<Array<{id: number, name: string, expiry: string, image: string}>> {
        return new Promise(function(resolve, _reject) {
            DbHelper.db.transaction(tx => tx.executeSql("SELECT id, name, expiry, image FROM goods", [], (_, { rows }) =>
                resolve(rows._array)
            ));
        });
    }

    static deleteMyGoods(asWellTheTable: boolean) {
        DbHelper.db.exec([{sql: (asWellTheTable ? "DROP TABLE" : "DELETE FROM") + " goods", args: []}], false, () => {});
    }

    static newImage(uri: string, isSmall: boolean) {
        DbHelper.db.transaction(tx => tx.executeSql("INSERT INTO downloads(type, uri) VALUES(?, ?)", ["image-" + (isSmall ? "small" : "large"), uri], () => {}, () => true ));
    }

    static selectImages(): Promise<string[]> {
        return new Promise(resolve => {
            DbHelper.db.transaction(tx => tx.executeSql("SELECT uri FROM downloads WHERE type LIKE 'image-%'", [], (_, resultSet: any) =>
                resolve(resultSet.rows._array.map((entity: { uri: string }) => entity.uri))
            ));
        });
    }

    static deleteDownloads() {
        DbHelper.db.exec([{sql: "DROP TABLE downloads", args: []}], false, () => {});
    }

    static newNearbyGood(response: Array<{name: string, expiry: Date, distance: number, id: number, isRequestedByMe: boolean}>, latitude: number, longitude: number) {
        DbHelper.deleteNearbyGood(false, () =>
            DbHelper.db.transaction(tx => {response.forEach(good =>
                tx.executeSql("INSERT INTO nearby_datas(name, expiry, distance, id, is_requested_by_me, latitude, longitude) VALUES(?, ?, ?, ?, ?, ?, ?)", [good.name, good.expiry.toISOString(), good.distance, good.id, DbHelper.fromBoolean(good.isRequestedByMe), latitude, longitude], () => {}, () => true )
            )})
        );
    }

    static updateNearbyGood(name: string, expiry: Date, distance: number, id: number, isRequestedByMe: boolean) {
        DbHelper.db.transaction(tx =>
            tx.executeSql("UPDATE nearby_datas SET name = ?, expiry = ?, distance = ?, is_requested_by_me = ? WHERE id = ?", [name, expiry.toISOString(), distance, DbHelper.fromBoolean(isRequestedByMe), id], () => {}, () => true )
        );
    }

    static deleteNearbyGood(asWellTheTable: boolean, callback?: SQLite.SQLiteCallback) {
        if (undefined == callback) {
            callback = () => {};
        }
        DbHelper.db.exec([{sql: (asWellTheTable ? "DROP TABLE" : "DELETE FROM") + " nearby_datas", args: []}], false, callback);
    }

    static fetchNearbyGood(lowerLatitude: number, lowerLongitude: number, upperLatitude: number, upperLongitude: number): Promise<Array<{name: string, expiry: Date, distance: number, id: number, isRequestedByMe: number}>> {
        return new Promise(resolve => {
            DbHelper.db.transaction(tx => tx.executeSql("SELECT name, expiry, distance, id, is_requested_by_me AS isRequestedByMe FROM nearby_datas WHERE ? <= latitude AND latitude <= ? AND ? <= longitude AND longitude <= ?", [lowerLatitude, upperLatitude, lowerLongitude, upperLongitude], (_, { rows }) =>
                resolve(rows._array)
            ));
        });
    }
}
