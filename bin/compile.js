const { promises: fs } = require("fs")
const util = require("util")
const exec = util.promisify(require("child_process").exec)

/* hard coded contract name */
const contractName = "Token"

/* file runtime method */

const main = async () => {
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
    console.log("about to run emcc")
    // call emcc
    const { stdout, stderr } = exec('. ./compile.sh')
    console.log("stdout", stdout)
    console.log("stderr", stderr)

    return stdout
  } catch (error) {
    console.log("error creating byte code", error)
  }
}

console.log("compiling contract", contractName)
main()
