import mysql from "mysql2";


const db = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "amYisraelChai",
    database: "intellegence",
  });

export default db;
// const result = StylePropertyMapReadOnly.query("SELECT * FROM users");
// console.log(result);
