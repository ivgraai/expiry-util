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

    private static deleteOrDropTable(isDeletion: boolean, tableName: string, callback?: () => void, transaction?: SQLTransaction) {
        if (undefined == transaction) {
            DbHelper.db.transaction(tx => tx.executeSql((isDeletion ? "DELETE FROM " : "DROP TABLE ") + tableName), undefined, callback);
        } else {
            DbHelper.db.exec([{sql: (isDeletion ? "DELETE FROM " : "DROP TABLE ") + tableName, args: []}], false, !callback ? () => {} : callback);
        }
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

    private static _insertGood(entity: any, tx: SQLTransaction) {
        tx.executeSql("INSERT INTO goods(name, expiry, notifications, image, id, is_requested_by_other) VALUES(?, ?, ?, ?, ?, ?)", [entity.name, entity.expiry.toISOString(), entity.notifications, entity.image, entity.id, entity.isRequestedByOther], () => {}, _error => { return true; });
    }

    static insertGood(entity: any, callback?: () => void) {
        DbHelper.db.transaction(tx => DbHelper._insertGood(entity, tx), undefined, callback);
    }

    static insertGoods(entities: Array<{name: string, expiry: Date, notifications: string | null, image: string | null, id: number, isRequestedByOther: boolean}>) {
        DbHelper.db.transaction(tx =>
            DbHelper._deleteMyGoods(false, () =>
                entities.forEach(entity => DbHelper._insertGood(entity, tx)),
            tx)
        );
    }

    static selectGoods(): Promise<Array<{id: number, name: string, expiry: string, notifications: string | null, image: string | null, isRequestedByOther: number}>> {
        return new Promise(function(resolve, _reject) {
            DbHelper.db.transaction(tx => tx.executeSql("SELECT id, name, expiry, notifications, image, is_requested_by_other AS isRequestedByOther FROM goods", [], (_, { rows }) =>
                resolve(DbHelper.fromRowList(rows))
            ));
        });
    }

    private static _deleteMyGoods(asWellTheTable: boolean, callback?: () => void, tx?: SQLTransaction) {
        DbHelper.deleteOrDropTable(!asWellTheTable, "goods", callback, tx);
    }

    static deleteMyGoods(asWellTheTable: boolean, callback?: () => void) {
        DbHelper._deleteMyGoods(asWellTheTable, callback);
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
        DbHelper.db.transaction(tx => {
            DbHelper._deleteNearbyGood(false, () => response.forEach(good =>
                tx.executeSql("INSERT INTO nearby_datas(name, expiry, distance, id, is_requested_by_me, latitude, longitude) VALUES(?, ?, ?, ?, ?, ?, ?)", [good.name, good.expiry.toISOString(), good.distance, good.id, DbHelper.fromBoolean(good.isRequestedByMe), latitude, longitude], () => {}, () => true ),
            ), tx)
        });
    }

    static updateNearbyGood(name: string, expiry: Date, distance: number, id: number, isRequestedByMe: boolean) {
        DbHelper.db.transaction(tx =>
            tx.executeSql("UPDATE nearby_datas SET name = ?, expiry = ?, distance = ?, is_requested_by_me = ? WHERE id = ?", [name, expiry.toISOString(), distance, DbHelper.fromBoolean(isRequestedByMe), id], () => {}, () => true )
        );
    }

    private static _deleteNearbyGood(asWellTheTable: boolean, callback?: () => void, tx?: SQLTransaction) {
        DbHelper.deleteOrDropTable(!asWellTheTable, "nearby_datas", callback, tx);
    }

    static deleteNearbyGood(asWellTheTable: boolean, callback?: () => void) {
        DbHelper._deleteNearbyGood(asWellTheTable, callback);
    }

    static fetchNearbyGood(lowerLatitude: number, lowerLongitude: number, upperLatitude: number, upperLongitude: number): Promise<Array<{name: string, expiry: Date, distance: number, id: number, isRequestedByMe: number}>> {
        return new Promise(resolve => {
            DbHelper.db.transaction(tx => tx.executeSql("SELECT name, expiry, distance, id, is_requested_by_me AS isRequestedByMe FROM nearby_datas WHERE ? <= latitude AND latitude <= ? AND ? <= longitude AND longitude <= ?", [lowerLatitude, upperLatitude, lowerLongitude, upperLongitude], (_, { rows }) =>
                resolve(DbHelper.fromRowList(rows))
            ));
        });
    }
}
