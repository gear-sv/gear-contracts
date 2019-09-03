const fs = require("fs")
const datapay = require("datapay")
const prompts = require('prompts');



const main = async () => {

const questions = [
  {
    type: 'text',
    name: 'contract',
    message: 'What is your contract addr?'
  },
  {
    type: 'text',
    name: 'procedure',
    message: 'function name'
  },
  {
    type: 'text',
    name: 'params',
    message: 'params',
  }
];

const response = await prompts(questions);



  // fetch key
  const key = await readKey()

  // format setOwner call
  datapay.send({
    data: ["gear", response.contract, response.procedure, JSON.stringify(response.params)],
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
