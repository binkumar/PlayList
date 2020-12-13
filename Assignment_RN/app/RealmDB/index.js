const Realm = require("realm");
const mockData = {};
const Album = {
    name: 'Album',
    primaryKey: 'id',
    properties: {
        id: { type: 'int' },
        title: { type: 'string?' },
        releaseDate: { type: 'string' },
        image: { type: 'string?' },
        price: { type: 'int?' },
        category: { type: 'string' },
        artist: { type: 'string?' },
        name: { type: 'string?' }
    },
};

let databaseOptions = {
    path: "assignment",
    schema: [Album],
    schemaVersion: 0,
    // encryptionKey: new Int8Array(64),
};


export const insertData = async () =>
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                mockData.map(obj => realm.create(Album.name, obj, Realm.UpdateMode.Modified))
            })
            return Promise.resolve("DB Inserted");
        })
        .catch(error => Promise.reject(error));


export const queryDB = async (query) =>
    Realm.open(databaseOptions)
        .then(realm => {
            let queryList = null;
            if (!query) {
                queryList = realm.objects(Album.name).snapshot();
            } else {
                queryList = realm.objects(Album.name).filtered(query).snapshot();
            }
            console.log("Fetched DB data", queryList);
            return Promise.resolve(queryResultsToArray(queryList));
        })
        .catch(error => Promise.reject(error));


const queryResultsToArray = (queryResults) => {
    let objectArr = [];
    for (let obj in queryResults) {
        objectArr.push(JSON.parse(JSON.stringify(queryResults[obj])));
    }
    return objectArr;
}
