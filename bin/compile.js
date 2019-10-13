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

  console.log('### sending files to compiler server. will take a few seconds.')

  const response = await axios({
    method: 'post',
    url: `http://compile.gear.computer/emcc`,
    data: form,
    headers: {
      'content-type': `multipart/form-data; boundary=${form._boundary}`
    }
  })
  
  const wasmFile = response.data.wasmFile
  const jsFile = response.data.jsFile
  await writeFile(`${process.cwd()}/output/${contractName}.out.wasm`, Buffer.from(wasmFile, 'hex'))
  await writeFile(`${process.cwd()}/output/${contractName}.out.js`, Buffer.from(jsFile, 'hex'))
}
