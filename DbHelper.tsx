import * as SQLite from 'expo-sqlite';

export default class DbHelper {
    private static db = SQLite.openDatabase('ivgraai');

    static initialize() {
        DbHelper.db.transaction(tx => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS goods(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(32), expiry DATE, image TEXT, notifications BLOB)", []);
            tx.executeSql("CREATE TABLE IF NOT EXISTS downloads(id INTEGER PRIMARY KEY AUTOINCREMENT, type VARCHAR(16), uri TEXT, foreign_key INTEGER)");
        });
    }

    static select1FromDual() {
        DbHelper.db.transaction(tx => tx.executeSql("SELECT * FROM sqlite_master WHERE type = 'table'", [], (_tr, { rows }) => console.log(rows)));
    }

    static insertGood(entity: any) {
        DbHelper.db.transaction(tx => tx.executeSql("INSERT into goods(name, expiry, image, notifications) values(?, ?, ?, ?)", [entity.name, entity.expiry.toISOString(), entity.image, entity.notifications], () => {}, _error => { return true; }));
    }

    static selectGoods() {
        return new Promise(function(resolve, _reject) {
            DbHelper.db.transaction(tx => tx.executeSql("SELECT id, name, expiry, image FROM goods", [], (_, { rows }) =>
                resolve(rows)
            ));
        });
    }

    static deleteGoods() {
        DbHelper.db.exec([{sql: "DROP TABLE goods", args: []}], false, () => {});
    }

    static newImage(uri: string, isSmall: boolean) {
        DbHelper.db.transaction(tx => tx.executeSql("INSERT into downloads(type, uri) values(?, ?)", ["image-" + (isSmall ? "small" : "large"), uri], () => {}, () => true ));
    }

    static selectImages(): Promise<string[]> {
        return new Promise(resolve => {
            DbHelper.db.transaction(tx => tx.executeSql("SELECT uri FROM downloads WHERE type LIKE 'image-%'", [], (_, resultSet: any) =>
                resolve(resultSet.rows._array.map((entity: { uri: string }) => entity.uri))
            ));
        });
    }

    static deleteDownloads() {
        DbHelper.db.exec([{sql: "DELETE FROM downloads", args: []}], false, () => {});
    }
}
