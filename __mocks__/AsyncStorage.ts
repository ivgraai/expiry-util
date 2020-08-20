// ReactNative.AsyncStorage = { };

export default class MockStorage {
    cache: any = {};
    setItem = jest.fn((key, value) => new Promise((resolve, reject) => {
        return (typeof key !== 'string' || typeof value !== 'string') ? reject(new Error()) : resolve(this.cache[key] = value);
    }));
    getItem = jest.fn((key) => new Promise((resolve) => {
        return this.cache.hasOwnProperty(key) ? resolve(this.cache[key]) : resolve(null);
    }));
    removeItem = jest.fn(key => new Promise((resolve, reject) => {
        if (delete this.cache[key]) {
            resolve();
        } else {
            reject();
        }
    }));
}
