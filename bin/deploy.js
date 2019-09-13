const fs = require("fs")
const datapay = require("datapay")
const { readTar, readKey } = require("./gear-utils.js")

const main = async (contract) => {
  // fetch key
  const key = await readKey()

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

module.exports = main
