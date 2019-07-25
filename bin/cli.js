#! /usr/bin/env node

const program = require("commander")
const exec = require("child_process").exec

const cleanPackage = require("./init.js")
const createAccount = require("./keys.js")

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
  default:
    console.log("### please provide a valid command")
    break
}

function init() {
  if (!program.args[1]) {
    console.log("### please provide a project name")
    process.exit()
  }

  const projectName = program.args[1]
  const clone = exec(`project_name=${projectName} . ${__dirname}/init.sh`, (error, stdout, stderr) => {
    if (error) console.log("#### could not clone example gear-contracts project", error)
    console.log(stdout)

    cleanPackage(projectName)

    console.log(`#### ${projectName} created`)
  })
}

function compile() {
  console.log("process.cwd()", process.cwd())
  if (!program.args[1]) {
    console.log("### please provide a token name to compile")
    process.exit()
  }
  const contract_path = `${process.cwd()}/contracts/${program.args[1]}.cpp`
  const compile = exec(`contract_path=${contract_path} . ${__dirname}/compile.sh`, (error, stdout, stderr) => {
    if (error) console.log("could not compile contract", error)
  })
}

function test() {
  const test = exec(`${process.cwd()}/node_modules/tape/bin/tape ${process.cwd()}/test.js`, (error, stdout, stderr) => {
    console.log(stdout)
  })
}
