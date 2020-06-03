import * as SQLite from 'expo-sqlite';

export default class DbHelper {
    private static db = SQLite.openDatabase('ivgraai');

    static initialize() {
        DbHelper.db.transaction(tx => tx.executeSql("CREATE TABLE IF NOT EXISTS goods(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(32), expiry DATE, image TEXT, notifications BLOB)", []));
    }

    static select1FromDual() {
        DbHelper.db.transaction(tx => tx.executeSql("SELECT * FROM sqlite_master WHERE type = 'table'", [], (tr, { rows }) => console.log(rows)));
    }

    static insertGood(entity: any) {
        DbHelper.db.transaction(tx => tx.executeSql("INSERT into goods(name, expiry, image, notifications) values(?, ?, ?, ?)", [entity.name, entity.expiry.toISOString(), entity.image, entity.notifications], () => {}, error => { return true; }));
    }

    static selectGoods() {
        return new Promise(function(resolve, reject) {
            DbHelper.db.transaction(tx => tx.executeSql("SELECT id, name, expiry, image FROM goods", [], (_, { rows }) =>
                resolve(rows/*._array*/)
            ));
        });
    }

    static deleteGoods() {
        DbHelper.db.exec([{sql: "DROP TABLE goods", args: []}], false, () => {});
    }
}
