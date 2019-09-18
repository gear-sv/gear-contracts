const inquirer = require("inquirer")
const util = require("util")
const readFile = util.promisify(require("fs").readFile)
const datapay = require("datapay")

const { readTar, readKey } = require("./gear-utils.js")

const main = async (contract) => {
  // fetch key
  const key = await readKey()

  // fetch contract package
  const blueprint = await readTar(contract)

  // fetch constructor
  const abi = await readFile(`${process.cwd()}/contracts/${contract}.json`)
  const { constructor } = JSON.parse(abi)

  const prompts = Object.keys(constructor).map(input => ({
    type: "input", name: input, message: input, default: ""
  }))

  const constructorInputs = await inquirer.prompt(prompts)

  // format and send transaction
  datapay.send({
    data: ["gear", blueprint, ...Object.values(constructorInputs)],
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
