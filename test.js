const contractModule = require("./a.out.js")

contractModule.onRuntimeInitialized = () => {
  console.log("setting owner of contract")
  const owner = "sean"
  const ownerBuffer = contractModule._malloc(owner.length + 1)
  console.log("ownerBuffer.size", typeof ownerBuffer)
  console.log("ownerBuffer", ownerBuffer)
  contractModule.writeStringToMemory(owner, ownerBuffer) 
  console.log("ownerBuffer", ownerBuffer)
  const setOwner = contractModule.cwrap("setOwner", "bool", ["string"])
  console.log("ownerbuffer type", typeof [ownerBuffer])
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
}


