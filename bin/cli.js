#! /usr/bin/env node

const program = require("commander")
const exec = require("child_process").exec

program
  .version("0.0.1")
  .option("-c, --contract", "Specify contract id by transaction hash.")
  .option("-p, --parameters", "Specifiy the parameters as a stringified JSON array.")
  .option("-a, --address", "Sepcify the local key that you want to sign transaction with.")
  .parse(process.argv)

switch(program.args[0]) {
  case "init":
    init()
    break
  case "compile":
    compile()
    break
  case "test":
    test()
    break
  default:
    console.log("no command given")
    break
}

function init() {
  if (!program.args[1]) {
    console.log("please provide a project name")
    process.exit()
  }

  const clone = exec(`project_name=${program.args[1]} . ${__dirname}/init.sh`, (error, stdout, stderr) => {
    if (error) console.log("could not clone example gear-contracts project", error)
  })
}

function compile() {
  console.log("process.cwd()", process.cwd())
  if (!program.args[1]) {
    console.log("please provide a token name to compile")
    process.exit()
  }
  const contract_path = `${process.cwd()}/contracts/${program.args[1]}.cpp`
  const compile = exec(`contract_path=${contract_path} . ${__dirname}/compile.sh`, (error, stdout, stderr) => {
    if (error) console.log("could not compile contract", error)
  })
}

function test() {
  const test = exec(`node ${process.cwd()}/test.js`, (error, stdout, stderr) => {
    if (error) console.log("could not execute test cases", error)
  })
}
