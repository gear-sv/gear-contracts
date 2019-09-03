#! /usr/bin/env node

const program = require("commander")
const exec = require("child_process").exec
const inquirer = require("inquirer")
const cleanPackage = require("./init.js")
const createAccount = require("./keys.js")
const deploy = require("./deploy.js")
const { findContracts, getFunctions } = require("./compile.js")
const write = require("./write")

/*******************************************
*
* $ gear-contracts init
*
*******************************************/

program
  .command("init")
  .action(async () => {
    console.log(`
#################################################################
#
#   GearSV: smart contracts on bitcoin
#
#################################################################
    `)

    const answers = await inquirer.prompt([
      { type: "input", name: "PROJECT", message: "Project Name", default: "test-project"},
      { type: "input", name: "AUTHOR", message: "Author's Name", default: "John Appleseed"},
      { type: "input", name: "VERSION", message: "Version Number", default: "0.0.1"}
    ])

    const projectName = answers.PROJECT

    console.log(`
#################################################################
#
#   INIT: ${projectName}
#
#################################################################
    `)

    const clone = exec(`project_name=${projectName} . ${__dirname}/init.sh`, (error, stdout, stderr) => {
      if (error) console.log("#### could not clone example gear-contracts project", error)
      console.log(stdout)

      cleanPackage(projectName, answers.AUTHOR, answers.VERSION)

      console.log(`#### ${projectName} created`)
    })
  })


/*******************************************
*
* $ gear-contracts keys
*
*******************************************/
program
  .command("keys")
  .action(async () => {

    console.log(`
#################################################################
#
#   KEYS
#
#################################################################
    `)

    const keys = await createAccount()

    console.table(keys)
  })

/*******************************************
*
* $ gear-contracts compile [contract_name]
*
*******************************************/

program
  .command("compile [contract]")
  .action(async (contract) => {
    if (!contract) {
      const contracts = await findContracts()
      const answers = await inquirer.prompt([
        { type: "list", name: "CONTRACT", message: "Choose Contract", choices: contracts}
      ])
      contract = answers.CONTRACT.slice(0, -4)
    }

    console.log(`
#################################################################
#
#   COMPILE: ${contract}
#
#################################################################
    `)

    const contract_path = `${process.cwd()}/contracts/${contract}.cpp`
    const wasm_file = `${contract}.out.wasm`
    const js_file = `${contract}.out.js`

    const compile = exec(`contract_path=${contract_path} contract_name=${contract} . ${__dirname}/compile.sh`, (error, stdout, stderr) => {
      if (error) console.log("could not compile contract", error)
      console.log(`### created wasm bytecode to output/${wasm_file}`)
      console.log(`### created javascript interface to output/${js_file}`)
    })
  })

/*******************************************
*
* $ gear-contracts test [contract_name]
*
*******************************************/

program
  .command("test [contract]")
  .action(async (contract) => {
    if (!contract) {
      const contracts = await findContracts()
      const answers = await inquirer.prompt([
        { type: "list", name: "CONTRACT", message: "Choose Contract", choices: contracts}
      ])
      contract = answers.CONTRACT.slice(0, -4)
    }

    console.log(`
#################################################################
#
#   TEST ${contract}
#
#################################################################
    `)

    const test = exec(`${__dirname}/../node_modules/.bin/tape ${process.cwd()}/test/${contract}.test.js | ${__dirname}/../node_modules/.bin/tap-spec --color=always`, (error, stdout, stderr) => {
      console.log(stdout)
    })
  })


/*******************************************
*
* $ gear-contracts deploy [contract_name]
*
*******************************************/

program
  .command("deploy [contract]")
  .action(async (contract) => {
    if (!contract) {
      const contracts = await findContracts()
      const answers = await inquirer.prompt([
        { type: "list", name: "CONTRACT", message: "Choose Contract", choices: contracts}
      ])
      contract = answers.CONTRACT.slice(0, -4)
    }

    console.log(`
#################################################################
#
#   DEPLOY ${contract}
#
#################################################################
    `)

    deploy(contract)
  })

/*******************************************
*
* $ gear-contracts write
*
*******************************************/

program
  .command("write")
  .action(async (contract) => {
    write()
  })

/*******************************************/

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
