#! /usr/bin/env node

const program = require("commander")
const exec = require("child_process").exec
const inquirer = require("inquirer")
const cleanPackage = require("./init.js")
const createAccount = require("./keys.js")
const deploy = require("./deploy.js")

program
  .version("0.0.1")
  .parse(process.argv)

switch(program.args[0]) {
  case "init":
    init()
    break
  case "keys":
    createAccount()
    break
  case "compile":
    compile()
    break
  case "test":
    test()
    break
  case "deploy":
    deploy()
    break
  default:
    console.log("### please provide a valid command")
    break
}

/*******************************************
*
* $ gear-contracts init
*
*******************************************/

async function init() {
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
  const clone = exec(`project_name=${projectName} . ${__dirname}/init.sh`, (error, stdout, stderr) => {
    if (error) console.log("#### could not clone example gear-contracts project", error)
    console.log(stdout)

    cleanPackage(projectName, answers.AUTHOR, answers.VERSION)

    console.log(`#### ${projectName} created`)
  })
}

/*******************************************
*
* $ gear-contracts compile [contract_name]
*
*******************************************/

function compile() {
  if (!program.args[1]) {
    console.log("### please provide a token name to compile")
    process.exit()
  }
  const contract_path = `${process.cwd()}/contracts/${program.args[1]}.cpp`
  const compile = exec(`contract_path=${contract_path} . ${__dirname}/compile.sh`, (error, stdout, stderr) => {
    if (error) console.log("could not compile contract", error)
  })
}

/*******************************************
*
* $ gear-contracts test [contract_name]
*
*******************************************/

function test() {
  const test = exec(`${process.cwd()}/node_modules/tape/bin/tape ${process.cwd()}/test.js`, (error, stdout, stderr) => {
    console.log(stdout)
  })
}

/*******************************************
*
* $ gear-contracts deploy [contract_name]
*
*******************************************/
