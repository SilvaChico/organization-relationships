import mysql from 'mysql';
require('dotenv').config();

export function connectToDb() {

    const connection: mysql.Connection = mysql.createConnection({
        //socketPath: '/cloudsql/woven-diorama-292718:europe-west4:org-rel-dev',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? +process.env.DB_PORT : 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    return new Promise<mysql.Connection>((resolve, reject) => {
        connection.connect(function (err) {
            if (err) reject(err);
            else resolve(connection);
        });
    });



}