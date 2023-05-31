import db from "./connection.js";

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

if(isDeleteMode){
    db.exec('DROP TABLE IF EXISTS users;');
}

db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    username TEXT,
    password TEXT,
    choice BOOLEAN,
    hasChosen BOOLEAN
);
`);
db.exec(`
CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    publishedAt DATETIME,
    image BLOB,
    publisherID INTEGER,
    FOREIGN KEY(publisher) REFERENCES users(id)
    );
`);