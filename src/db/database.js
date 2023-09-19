import mysql from 'mysql2';
import 'dotenv/config'
import fs from 'fs';

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST, 
  port: process.env.MYSQL_PORT, 
  user: process.env.MYSQL_USER, 
  password: process.env.MYSQL_PASSWORD, 
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true,
});

if (process.env.MYSQL_CERT){
  connection.config.ssl = {
    ca: fs.readFileSync(procces.env.MYSQL_CERT)
  }
}

export default connection;
