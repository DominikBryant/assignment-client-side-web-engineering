import PouchDB from 'pouchdb'
import {
  emptyItemQuery
} from './item'

const localDB = new PouchDB('mmt-ss2017')
const remoteDB = new PouchDB('https://couchdb.5k20.com/mmt-ss2017', {
    auth: {
        username: 'dbryant',
        password: 'test',
    }
})

export default class Store {
    /**
     * @param {!string} name Database name
     * @param {function()} [callback] Called when the Store is ready
     */
    constructor(name, callback) {
        /**
         * @type {ItemList}
         */
        let liveTodos
        remoteDB
            .sync(localDB, {
                live: true,
                retry: true
            }).on('change', function (info) {
              if (callback) {
                  callback()
              }
            })
            .on('error', err => {
                console.error(`An error occured: ${err}`)
            });

        /**
         * Read the local ItemList from localStorage.
         *
         * @returns {ItemList} Current array of todos
         */
        this.getStore = () => {
            return localDB.
                allDocs({
                   include_docs: true
                }).then((todos) => {
                    const converted_todos = todos.rows.map((row) => {
                        return {
                            id: row.id,
                            title: row.doc.title,
                            completed: row.doc.completed,
                            _rev: row.doc._rev,
                        }
                    })
                    return converted_todos
                })
                .catch(function (err) {
                  console.log(err);
                });
        }

        if (callback) {
            callback()
        }
    }

    /**
     * Find items with properties matching those on query.
     *
     * @param {ItemQuery} query Query to match
     * @param {function(ItemList)} callback Called when the query is done
     *
     * @example
     * db.find({completed: true}, data => {
	 *	 // data shall contain items whose completed properties are true
	 * })
     */
    find(query, callback) {
        this.getStore().then((todos) => {
            let k
            callback(todos.filter(todo => {
                for (k in query) {
                    if (query[k] !== todo[k]) {
                        return false
                    }
                }
                return true
            }))
        })
    }

    /**
     * Update an item in the Store.
     *
     * @param {ItemUpdate} update Record with an id and a property to update
     * @param {function()} [callback] Called when partialRecord is applied
     */
    update(update, callback) {
        const id = update.id
        localDB
            .get(`${id}`)
            .then((todo)=> {
                localDB.put(Object.assign(todo, update))
                .then(() => {
                    if (callback) {
                        callback()
                    }
                })
            })
    }

    /**
     * Insert an item into the Store.
     *
     * @param {Item} item Item to insert
     * @param {function()} [callback] Called when item is inserted
     */
    insert(item, callback) {
        item._id = `${item.id}`
        localDB
            .put(item)
            .then(() => {
                if (callback) {
                    callback()
                }
            })
    }

    /**
     * Remove items from the Store based on a query.
     *
     * @param {ItemQuery} query Query matching the items to remove
     * @param {function(ItemList)|function()} [callback] Called when records matching query are removed
     */
    remove(query, callback) {
        localDB
            .get(`${query.id}`)
            .then((todo)=> {
                console.log(todo)
                localDB.put(Object.assign(todo, {_deleted: true}))
                .then(() => {
                    if (callback) {
                        callback()
                    }
                })
            })
    }

    /**
     * Count total, active, and completed todos.
     *
     * @param {function(number, number, number)} callback Called when the count is completed
     */
    count(callback) {
        this.find(emptyItemQuery, data => {
            const total = data.length

            let i = total
            let completed = 0

            while (i--) {
                completed += data[i].completed
            }
            callback(total, total - completed, completed)
        })
    }
}
