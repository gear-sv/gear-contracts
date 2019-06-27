const contractModule = require("./a.out.js")

contractModule.onRuntimeInitialized = () => {
  const mint = contractModule.cwrap("mint", "bool", ["number"])

  const result = mint(1000)

  console.log("result", result)

}


