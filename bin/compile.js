const util = require("util")
const readdir = util.promisify(require("fs").readdir)
const exec = util.promisify(require("child_process").exec)

const main = async (contractName="Token") => {
  try {
    /* check that header file exists */
    const headerStats = await fs.stat(`contracts/${contractName}.h`)

    /* check that cpp file exists */
    const cppStats = await fs.stat(`contracts/${contractName}.cpp`)

    /* generate contract ABI */
    const ABI = createABI(contractName)

    /*  generate bytecode for contract */
    const bytecode = await createBytecode(contractName)
  }

  catch (error) {
    console.log("error compiling contract", error)
  }
}


const createABI = async (contractName) => {
  console.log("parsing header file to create ABI")

  try {
    // read header file as string
    const contractHeaderBuffer = await fs.readFile(`contracts/${contractName}.h`)
    const contractHeaderString = contractHeaderBuffer.toString()

    console.log("contractHeaderString", contractHeaderString)

    const lines = contractHeaderString.split(/\r?\n/)

    /* hardcoded return value */

    const ABI = {
      state: {
        supply: {
          type: "unsigned int"
        },
        balances: {
          type: "std::map",
          key: "char*",
          value: "unsigned int"
        }
      },
      methods: {
        transfer: {
          recipient: {
            type: "char*"
          },
          value: {
            type: "unsigned int"
          },
          returns: {
            type: "bool"
          }
        }
      }
    }

    return ABI
  }

  catch (error) {
    console.log("error creating ABI", error)
  }
}


const createBytecode = async (contractName) => {
  try {
    // call emcc
    const { stdout, stderr } = exec('. ./compile.sh')
    return stdout
  } catch (error) {
    console.log("error creating byte code", error)
  }
}

const findContracts = async () => {
  const contractFiles = await readdir(`${process.cwd()}/contracts`)
  return contractFiles.filter(contract => contract.substring(contract.length - 4, contract.length) === ".cpp")
}

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
  compile: main,
  findContracts
}
