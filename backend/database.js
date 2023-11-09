import mysql from "mysql2/promise";

// TODO: check need for db.end()
const db = await mysql
  .createConnection({
    host: "localhost",
    user: "root",
    password: "amYisraelChai",
    database: "intellegence",
    multipleStatements: true,
  });

export default db;
