const test = require("tape")
const contractModule = require("../output/NonFungibleToken.out.js")

contractModule.onRuntimeInitialized = () => {
  test("NonFungibleToken contract tests", async (t) => {
    t.plan(4)

    console.log("CONSTRUCTOR")
    const nonFungibleToken = new contractModule.NonFungibleToken("sean")
    const owner1 = nonFungibleToken.getOwner()
    t.equal(owner1, "sean", "Should have initialized contract with 'sea' as the owner.")

    console.log("MINT")
    nonFungibleToken.mint("sean", "glenn")
    const tokenOwner1 = nonFungibleToken.getTokenOwner(0)
    t.equal(tokenOwner1, "glenn", "Should have minted a token with 'glenn' as the owner.")

    console.log("TRANSFER")
    nonFungibleToken.transfer("glenn", 0, "craig")
    const tokenOwner2 = nonFungibleToken.getTokenOwner(0)
    t.equal(tokenOwner2, "craig", "Should have transferred owner ship of token '0' to 'criag'.")

    console.log("SETOWNER")
    nonFungibleToken.setOwner("sean", "dave")
    const owner2 = nonFungibleToken.getOwner()
    t.equal(owner2, "dave", "Should have transferred ownership of the contract from 'sean' to 'dave'.")
  })
}
