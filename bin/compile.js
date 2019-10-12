const axios = require("axios")
const util = require('util')
const readFile = util.promisify(require('fs').readFile)
const writeFile = util.promisify(require('fs').writeFile)

const FormData = require("form-data")

module.exports = async (contractName) => {
  const cppFile = await readFile(`${process.cwd()}/contracts/${contractName}.cpp`)
  const hFile = await readFile(`${process.cwd()}/contracts/${contractName}.h`)

  const form = new FormData()
  form.append('file', cppFile.toString('hex'))
  form.append('fileName', `${contractName}.cpp`)
  form.append('file2', hFile.toString('hex'))
  form.append('fileName2', `${contractName}.h`)

  // !!! ip address is hardcoded for now
  const response = await axios({
    method: 'post',
    url: `http://35.203.71.42:7050/compile`,
    data: form,
    headers: {
      'content-type': `multipart/form-data; boundary=${form._boundary}`
    }
  })

  // console.log("response", response.data)
  console.log("yoooo", typeof response.data, Object.keys(response.data))
  const wasmFile = response.data.wasmFile.data
  const jsFile = response.data.jsFile.data
  console.log("wasmFile", typeof wasmFile)
  console.log("jsFile", typeof jsFile)
  await writeFile(`${process.cwd()}/output/${contractName}.wasm`, Buffer.from(wasmFile, 'hex'))
  await writeFile(`${process.cwd()}/output/${contractName}.js`, Buffer.from(jsFile, 'hex'))
}
