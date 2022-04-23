const database = require('better-sqlite3')

const logdb = new database('log.db')

const stmt = logdb.prepare(`
        SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';
`)
//Get the first row of the accesslog table
let row = stmt.get();
//If the table doesn't exist, create it
if (row === undefined) {
    console.log('Log database appears to be missing. Creating log database...')

    const sqlInit = `
        CREATE TABLE accesslog (id INTEGER PRIMARY KEY, remoteaddr VARCHAR, 
            remoteuser VARCHAR, time VARCHAR, method VARCHAR, url VARCHAR, 
            protocol VARCHAR, httpversion NUMERIC, status INTEGER, 
            referer VARCHAR, useragent VARCHAR);
    `
    logdb.exec(sqlInit)
    console.log("Your database has been initialized with a new table.")
//Else report that the database already exists
} else {
    console.log('Log database already exists.')
}

module.exports = logdb