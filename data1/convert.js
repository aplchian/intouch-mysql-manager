const csv = require("csvtojson")
const csvFilePath = "./data1.csv"
const dateFormat = require("dateformat")
const { trim, propOr, map } = require("ramda")
const fs = require("fs")

const formatDate = data => dateFormat(data, "yyyy-mm-dd")
const getData = (key, data) => trim(propOr(null, key, data)) || null

const formatData = jsonObj => {
  const date = formatDate(new Date(jsonObj["Submitted On"]))
  const email = getData("Email Address", jsonObj)
  const city = getData("City", jsonObj)
  const state = getData("State", jsonObj)

  return {
    joinDate: date,
    email,
    city,
    state,
    band: 1
  }
}

csv()
  .fromFile(csvFilePath)
  .on("end_parsed", jsonObjs => {
    const result = map(formatData, jsonObjs)
    fs.writeFile(
      "./convertedData.json",
      JSON.stringify(result, null, 2),
      function(err) {
        if (err) {
          return console.log(err)
        }

        console.log("The file was saved!")
      }
    )
  })
  .on("done", error => {
    console.log("done!")
  })
