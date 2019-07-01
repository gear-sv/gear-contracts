const contractModule = require("./a.out.js")

contractModule.onRuntimeInitialized = () => {
  console.log("setting owner of contract")
  const setOwner = contractModule.cwrap("setOwner", "bool", ["string"])
  const setOwnerResult = setOwner("sean")
  console.log("setOwnerResult", ownerBuffer)

  console.log("minting a 1000 tokens")
  const mint = contractModule.cwrap("mint", "bool", ["number"])
  const mintResult = mint(1000)
  console.log("mintResult is", mintResult)

  console.log("checking total supply")
  const getSupply = contractModule.cwrap("getSupply", "number")
  const supply = getSupply()
  console.log("total supply is", supply)

  console.log("calling transfer method")
  const transfer = contractModule.cwrap("transfer", "bool", ["string", "number"])
  const transferResult = transfer("glenn", 100)

}


