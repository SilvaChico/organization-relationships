import mysql from 'mysql';

export function dbQueryArgs(connection: mysql.Connection, statement: string, args: Array<string>) {
    return new Promise((resolve, reject) => {
        connection.query(statement, args, function (err, result) {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

export function dbQuery(connection: mysql.Connection, statement: string) {
    return new Promise((resolve, reject) => {
        connection.query(statement, function (err, result) {
            if (err) reject(err);
            else resolve(result);
        });
    });


}