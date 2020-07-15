const mysql = require("mysql");

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "fblinktest7"
  });
  
  module.exports = connection;