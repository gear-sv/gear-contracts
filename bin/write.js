const fs = require("fs")
const datapay = require("datapay")
const prompts = require('prompts')

const main = async () => {
  // fetch key
  const key = await readKey()

  // format transaction call
  const questions = [
    {
      type: 'text',
      name: 'contract',
      message: 'contract id (deployment transaction hash)'
    },
    {
      type: 'text',
      name: 'procedure',/
      message: 'function name'
    },
    {
      type: 'text',
      name: 'params',
      message: 'params (JSON string)',
    }
  ]

   const response = await prompts(questions)

   datapay.send({
      data: ["gear", response.contract, response.procedure, JSON.stringify(response.params)],
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
