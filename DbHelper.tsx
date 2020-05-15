import * as SQLite from 'expo-sqlite';

export default class DbHelper {
    static initialize() {
        db = SQLite.openDatabase('ivgraai');
        db.transaction(tx => tx.executeSql("CREATE TABLE IF NOT EXISTS goods(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(32), expiry DATE, image TEXT)", []));
    }

    static select1FromDual() {
        db.transaction(tx => tx.executeSql("SELECT * FROM sqlite_master WHERE type = 'table'", [], (_, { rows }) => console.log(rows)));
    }

    static insertGood(entity) {
        db.transaction(tx => tx.executeSql("INSERT into goods(name, expiry, image) values(?, ?, ?)", [entity.name, entity.expiry.toISOString(), entity.image], () => {}, error => console.log(JSON.stringify(error))));
    }

    static selectGoods() {
        return new Promise(function(resolve, reject) {
            db.transaction(tx => tx.executeSql("SELECT * FROM goods", [], (_, { rows }) =>
                resolve(rows)
            ));
        });
    }

    static deleteGoods() {
        db.exec([{sql: "DROP TABLE goods", args: []}], false);
    }
}
