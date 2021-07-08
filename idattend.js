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
  try {
    await sql.connect(req.body);
    const result = await sql.query(`select top 10 * from dbo.tblStudents`);
    console.dir(result);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = idattend;