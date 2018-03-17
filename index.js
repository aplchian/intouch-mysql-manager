require("dotenv").config()
const mysql = require("promise-mysql")
const data = require("./data1/convertedData.json")
const { forEach } = require("ramda")

var connection = mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  })
  .then(conn => {

    const addToTable = fan => {
      conn.query("INSERT INTO fans SET ?", fan).then(res => {
        console.log("res", res)
      })
    }

    forEach(addToTable, data)

    conn.end()
  })
