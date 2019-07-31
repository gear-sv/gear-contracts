const fs = require("fs")
const datapay = require("datapay")

const main = async () => {
  // fetch key
  const key = await readKey()

  // read wasm bytecode
  const bytecode = await readContract()

  // format and send transaction
  datapay.send({
    data: ["gearsv", bytecode, "binary", "token.wasm"],
    pay: {
      key: key.privateKey,
      fee: 0
    }
  })

}

const readContract = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./a.out.wasm", "binary" (error, data) => {
      if (error) reject(error)
      resolve(data)
    })
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

module.exports = main()
