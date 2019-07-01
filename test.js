const contractModule = require("./a.out.js")

contractModule.onRuntimeInitialized = () => {

  const address = "public_address"

  console.log("setting owner of contract")
  const setOwner = contractModule.cwrap("setOwner", "bool", ["string", "string"])
  const setOwnerResult = setOwner(address, "sean")

  console.log("getting owner of the contract")
  const getOwner = contractModule.cwrap("getOwner", "string")
  const owner = getOwner()
  console.log("owner is", owner)

  console.log("minting a 1000 tokens")
  const mint = contractModule.cwrap("mint", "bool", ["string", "number"])
  const mintResult = mint(address, 1000)
  console.log("mintResult is", mintResult)

  console.log("checking total supply")
  const getSupply = contractModule.cwrap("getSupply", "number")
  const supply = getSupply()
  console.log("total supply is", supply)

  console.log("calling transfer method")
  const transfer = contractModule.cwrap("transfer", "bool", ["string", "string", "number"])
  const transferResult = transfer(address, "glenn", 100)
}


