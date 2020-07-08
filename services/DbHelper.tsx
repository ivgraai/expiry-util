import * as SQLite from 'expo-sqlite';

export default class DbHelper {
    private static db = SQLite.openDatabase('ivgraai');

    static initialize() {
        DbHelper.db.transaction(tx => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS goods(id INTEGER, name VARCHAR(32), expiry DATE, notifications BLOB, image TEXT, is_requested_by_other INTEGER)", []);
            tx.executeSql("CREATE TABLE IF NOT EXISTS downloads(id INTEGER PRIMARY KEY AUTOINCREMENT, type VARCHAR(16), uri TEXT, foreign_key INTEGER)");
            tx.executeSql("CREATE TABLE IF NOT EXISTS nearby_datas(name VARCHAR(32), expiry DATE, distance REAL, id INTEGER, is_requested_by_me INTEGER, latitude REAL, longitude REAL)");
        });
    }

    private static fromBoolean(value: boolean | undefined): number {
        return value ? 1 : 0;
    }

    private static deleteOrDropTable(isDeletion: boolean, tableName: string, callback?: SQLite.SQLiteCallback) {
        DbHelper.db.exec([{sql: (isDeletion ? "DELETE FROM " : "DROP TABLE ") + tableName, args: []}], false, !callback ? () => {} : callback);
    }

    private static fromRowList(rows: SQLResultSetRowList): Array<any> {
        var collection = [];
        for (let i = 0; i < rows.length; ++i) {
            collection.push(rows.item(i));
        }
        return collection;
    }

    static select1FromDual() {
        DbHelper.db.transaction(tx => tx.executeSql("SELECT * FROM sqlite_master WHERE type = 'table'", [], (_tr, { rows }) => console.log(rows)));
    }

    static insertGood(entity: any, callback?: () => void, tx?: SQLTransaction) {
        var consumer = (transaction: SQLTransaction) => transaction.executeSql("INSERT INTO goods(name, expiry, notifications, image, id, is_requested_by_other) VALUES(?, ?, ?, ?, ?, ?)", [entity.name, entity.expiry.toISOString(), entity.notifications, entity.image, entity.id, entity.isRequestedByOther], () => {}, _error => { return true; });
        if (undefined == tx) {
            DbHelper.db.transaction(tx => consumer(tx), undefined, callback);
        } else {
            consumer(tx);
        }
    }

    static insertGoods(entities: Array<{name: string, expiry: Date, notifications: string | null, image: string | null, id: number, isRequestedByOther: boolean}>) {
        DbHelper.deleteMyGoods(false, () =>
            DbHelper.db.transaction(tx =>
                entities.forEach(entity => DbHelper.insertGood(entity, undefined, tx))
            )
        );
    }

    static selectGoods(): Promise<Array<{id: number, name: string, expiry: string, notifications: string | null, image: string | null, isRequestedByOther: number}>> {
        return new Promise(function(resolve, _reject) {
            DbHelper.db.transaction(tx => tx.executeSql("SELECT id, name, expiry, notifications, image, is_requested_by_other AS isRequestedByOther FROM goods", [], (_, { rows }) =>
                resolve(DbHelper.fromRowList(rows))
            ));
        });
    }

    static deleteMyGoods(asWellTheTable: boolean, callback?: SQLite.SQLiteCallback) {
        DbHelper.deleteOrDropTable(!asWellTheTable, "goods", callback);
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
        DbHelper.deleteOrDropTable(!asWellTheTable, "nearby_datas", callback);
    }

    static fetchNearbyGood(lowerLatitude: number, lowerLongitude: number, upperLatitude: number, upperLongitude: number): Promise<Array<{name: string, expiry: Date, distance: number, id: number, isRequestedByMe: number}>> {
        return new Promise(resolve => {
            DbHelper.db.transaction(tx => tx.executeSql("SELECT name, expiry, distance, id, is_requested_by_me AS isRequestedByMe FROM nearby_datas WHERE ? <= latitude AND latitude <= ? AND ? <= longitude AND longitude <= ?", [lowerLatitude, upperLatitude, lowerLongitude, upperLongitude], (_, { rows }) =>
                resolve(DbHelper.fromRowList(rows))
            ));
        });
    }
}
