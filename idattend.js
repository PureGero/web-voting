const express = require('express');

const idattend = express.Router();

let sql;
let trustedConnectionEnabled = false;

try {
  sql = require('mssql/msnodesqlv8');
  trustedConnectionEnabled = true;
} catch (error) {
  sql = require('mssql');
}

idattend.get('/isTrustedConnectionEnabled', (req, res) => {
  res.send(trustedConnectionEnabled);
});

idattend.post('/connect', async (req, res) => {
  // const sqlConfig = {
  //   domain: '',
  //   user: '',
  //   password: '',
  //   database: 'IDAttend2021',
  //   server: '',
  //   options: {
  //     encrypt: false, // for azure
  //     trustServerCertificate: true, // change to true for local dev / self-signed certs
  //     trustedConnection: false
  //   }
  // };
  await sql.connect(req.body);
  const result = await sql.query(`select * from dbo.tblStudents where id = ${value}`);
  console.dir(result);
  res.send(result);
});

module.exports = idattend;