const express = require('express');

const idattend = express.Router();

let sql = require('mssql');
let driver;
let trustedConnectionEnabled = false;

try {
  sql = require('mssql/msnodesqlv8');
  trustedConnectionEnabled = true;
  driver = 'msnodesqlv8';
} catch (error) {
  console.log(error);
}

idattend.get('/isTrustedConnectionEnabled', (req, res) => {
  res.send(trustedConnectionEnabled);
});

idattend.get('/getDefaultDomain', (req, res) => {
  res.send(process.env.USERDOMAIN ? process.env.USERDOMAIN : '');
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
    req.body.driver = driver;
    console.log(req.body);
    await sql.connect(req.body);
    const result = await sql.query(`select top 10 * from dbo.tblStudents`);
    console.dir(result);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
});

module.exports = idattend;