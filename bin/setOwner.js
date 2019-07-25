const fs = require("fs")
const datapay = require("datapay")

const main = async () => {
  // fetch key
  const key = await readKey()
  console.log("key", key.privateKey)
  // format setOwner call
  const contract = "63eec681025b07b9aa9d3720a125ce33dfd46e0b940a518100811c1f4eea86f0"
  const params = ["1NwsR7pW5Nb3C5Gq2h9C1mVagbG6UWGiNZ"]
  datapay.send({
    data: ["gear.sv", contract, "setOwner", JSON.stringify(params)],
    pay: {
      key: key.privateKey,
      fee: 0 
    }
  })
}

const readKey = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./key.json", (error, data) => {
      if (error) reject(error)
        resolve(JSON.parse(data))
    })
  })
}

main()
