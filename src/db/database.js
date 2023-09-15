import mysql from 'mysql2';

export const con = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'jackKcaj',
  database: 'MusicBase',
  multipleStatements: true,
});
