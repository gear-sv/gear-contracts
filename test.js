const test = require("tape")
const bsv = require("bsv")
const contractModule = require("./a.out.js")

contractModule.onRuntimeInitialized = () => {
  test("Token contract tests", async (t) => {
    t.plan(9)

    const creator = "1EUSzmPjnDyvQgYTRukPDWaaeXSCHbCism"

    const getOwner = contractModule.cwrap("getOwner", "string")
    const owner = getOwner()
    t.equal(creator, owner, "contract has been initialized with the creator as owner")

    const mint = contractModule.cwrap("mint", "bool", ["string", "number"])
    const mintResult = mint(creator, 1000)
    t.equal(mintResult, +true, "owner address able to mint tokens")

    const getBalance = contractModule.cwrap("getBalance", "number", ["string"])
    const balance = getBalance(creator)
    t.equal(balance, 1000, "owner balance accepted minting amount of 1000 tokens")

    const getSupply = contractModule.cwrap("getSupply", "number")
    const supply = getSupply()
    t.equal(supply, 1000, "mint successfully increments supply by 1000 tokens")

    const transfer = contractModule.cwrap("transfer", "bool", ["string", "string", "number"])
    const transferResult = transfer(creator, "glenn", 100)
    t.equal(transferResult, +true, "succesfully transfered tokens")

    const balance1 = getBalance(creator)
    t.assert(balance1, 900, "succesfully decremented balance of sender by 100 tokens")

    const balance2 = getBalance("glenn")
    t.assert(balance2, 100, "succesfully incremented balance of glenn by 100 tokens")

    const setOwner = contractModule.cwrap("setOwner", "bool", ["string", "string"])
    const setOwnerResult = setOwner(creator, "sean")
    t.assert(setOwnerResult, +true, "succesfully changed owner")

    const newOwner = getOwner()
    t.assert(newOwner, "sean", "new owner is set to sean")
  })
}

