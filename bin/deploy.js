const fs = require("fs")
const datapay = require("datapay")
const { readTar, readKey } = require("./gear-utils.js")

const main = async (contract) => {
  // fetch key
  const key = await readKey()

  // read wasm bytecode
  //const bytecode = await readContract(contract)

  const blueprint = await readTar(contract)

  // format and send transaction
  datapay.send({
    data: ["gear", blueprint],
    pay: {
      key: key.privateKey,
      fee: 0
    }
  }, (error, hash) => {
    if (error) console.log("### could not deploy contract", error)
    console.log(`
#################################################################
#
#   Successfully Deployed Contract:
#
#   https://whatsonchain.com/tx/${hash}
#
#################################################################
    `)
  })

}

// const readContract = (contract) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(`${process.cwd()}/output/${contract}.out.wasm`, (error, data) => {
//       if (error) reject(error)
//       resolve(data)
//     })
//   })
// }
// 
// const readTar = (contract) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(`${process.cwd()}/${contract}.tar.gz`, (error, data) => {
//       if (error) reject(error)
//       resolve(data)
//     })
//   })
// }
//
// const readKey = () => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(`${process.cwd()}/key.json`, (error, data) => {
//       if (error) reject(error)
//       resolve(JSON.parse(data))
//     })
//   })
// }

module.exports = main
