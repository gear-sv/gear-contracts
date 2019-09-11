const util = require("util")
const readdir = util.promisify(require("fs").readdir)
const readFile = util.promisify(require("fs").readFile)
const exec = util.promisify(require("child_process").exec)

const createBytecode = async (contractName) => {
  try {
    // call emcc
    const { stdout, stderr } = exec('sh ./compile.sh')
    return stdout
  } catch (error) {
    console.log("error creating byte code", error)
  }
}

// const findContracts = async () => {
//   const contractFiles = await readdir(`${process.cwd()}/contracts`)
//   return contractFiles.filter(contract => contract.substring(contract.length - 4, contract.length) === ".cpp")
// }
//
// const getFunctions = async (contract) => {
//   const interface = await readFile(`${process.cwd()}/contracts/${contract}.json`)
//   const interfaceObj = JSON.parse(interface.toString())
//   console.log("generated interfaceObj"+interfaceObj)
//
//   const s = interfaceObj.setters
//   const setters = Object.keys(s).reduce((sum, setter) => {
//     sum.push("_" + setter)
//     return sum
//   }, [])
//
//   const g = interfaceObj.getters
//   const getters = Object.keys(g).reduce((sum, getter) => {
//     sum.push("_" + getter)
//     return sum
//   }, [])
//
//   return JSON.stringify(setters.concat(getters))
// }

// const compiler = () => {
//   parser.lexer.cppUnit.clearPreprocessors(`${process.cwd()}/contracts/Token.cpp`, (error, codeText) => {
//     if (error) console.log(error)
//     console.log(codeText)
//
//     var tokens = parser.lexer.lexUnit.tokenize(codeText)
//     console.log(tokens)
//
//     var parse_tree = parser.parse(tokens);
//     console.log(parse_tree)
//   })
// }

module.exports = {
  findContracts,
  getFunctions
}
