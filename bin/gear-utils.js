const util = require("util")
const readdir = util.promisify(require("fs").readdir)
const readFile = util.promisify(require("fs").readFile)
const exec = util.promisify(require("child_process").exec)
const fs = require("fs")

const readContract = (contract) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${process.cwd()}/output/${contract}.out.wasm`, (error, data) => {
      if (error) reject(error)
      resolve(data)
    })
  })
}

const readTar = (contract) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${process.cwd()}/output/${contract}.tar.gz`, (error, data) => {
      if (error) reject(error)
      resolve(data)
    })
  })
}

// returns contracts object with all .cpp files from contracts folder
const findContracts = async () => {
  const contractFiles = await readdir(`${process.cwd()}/contracts`)
  return contractFiles.filter(contract => contract.substring(contract.length - 4, contract.length) === ".cpp")
}

const getFunctions = async (contract) => {
  const interface = await readFile(`${process.cwd()}/contracts/${contract}.json`)
  const interfaceObj = JSON.parse(interface.toString())

  const s = interfaceObj.setters
  const setters = Object.keys(s).reduce((sum, setter) => {
    sum.push("_" + setter)
    return sum
  }, [])

  const g = interfaceObj.getters
  const getters = Object.keys(g).reduce((sum, getter) => {
    sum.push("_" + getter)
    return sum
  }, [])

  return JSON.stringify(setters.concat(getters))
}

const readKey = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${process.cwd()}/key.json`, (error, data) => {
      if (error) reject(error)
      resolve(JSON.parse(data))
    })
  })
}

const createPackageJson = (name, version, author) => {
  return new Promise((resolve, reject) => {
    const config = {
      name,
      version,
      author,
      license: "OpenBSV"
    }
    fs.writeFile(`${process.cwd()}/${name}/package.json`, JSON.stringify(config), (error) => {
      resolve(true)
    })
  })
}

module.exports = {
  findContracts,
  getFunctions,
  readContract,
  readTar,
  readKey,
  createPackageJson
}
