const fs = require("fs")
const datapay = require("datapay")
const inquirer = require("inquirer")
const util = require("util")
const readFile = util.promisify(require("fs").readFile)

const filteredParams = [
  'SENDER',
  'BLOCK_HEIGHT',
  'BLOCK_TIME'
]

const main = async (contractName) => {
  // fetch key
  const key = await readKey()

  // fetch abi
  let abi = await readFile(`${process.cwd()}/contracts/${contractName}.json`)
  abi = JSON.parse(abi)

  // format transaction call
  const questions = [
    {
      type: "input",
      name: "contract",
      message: "contract id (deployment transaction hash)",
      default: ""
    },
    {
      type: "input",
      name: "method",
      message: "function name",

    },
  ]

  const { contract, method } = await inquirer.prompt(questions)

  // chek to make sure method exists
  if (!Object.keys(abi.setters).includes(method)) {
    console.error("### method does not exist")
    return false
  }

  const paramInputs = Object.keys(abi.setters[method])
    .filter(param => !filteredParams.includes(param))
    .map(param => ({
      type: "input",
      name: param,
      message: param,
      default: ""
    }))

  const params = await inquirer.prompt(paramInputs)

  datapay.send({
    data: [
      "gear",
      contract,
      method,
      JSON.stringify(Object.values(params))
    ],
    pay: {
      key: key.privateKey,
      fee: 0
    }
  }, (error, hash) => {
    if (error) console.log("### error writing to contract", error)
    console.log(`
  #################################################################
  #
  #   Successfully Wrote to Contract:
  #
  #   https://whatsonchain.com/tx/${hash}
  #
  #################################################################
    `)
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

module.exports = main
