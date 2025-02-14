// const sql = require("mssql");

// const config = {
//   user: "sa",
//   password: "Psalmuel",
//   server: "Adedara",
//   port: 1433,
//   database: "ebook_db",
//   options: {
//     encrypt: false,
//     enableArithAbort: true,
//     trustServerCertificate: true,
//   },
// };

// const poolPromise = new sql.ConnectionPool(config)
//   .connect()
//   .then((pool) => {
//     console.log("Connected to SQL Server");
//     return pool;
//   })
//   .catch((err) => {
//     console.error("Database Connection Failed! Bad Config: ", err);
//     throw err;
//   });

// module.exports = {
//   sql,
//   poolPromise,
// };


const sql = require("mssql");

const config = {
  server: "Adedara",
  port: 1433,
  database: "ebook_db",
  options: {
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
  authentication: {
    type: "ntlm",
    options: {
      domain: "",
      workstation: "",
    },
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("Database Connection Failed! Bad Config: ", err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise,
};