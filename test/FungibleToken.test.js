const test = require("tape")
const contract = require("../output/FungibleToken.out.js")

contract.onRuntimeInitialized = () => {
  test("Fungible Token tests", async (t) => {
    t.plan(7)

    console.log("CONSTRUCTOR")
    const fungibleToken = new contract.FungibleToken("sean")
    const supply1 = fungibleToken.getSupply()
    const owner1 = fungibleToken.getOwner()

    t.equal(supply1, 0, "Initital supply should be set to 0.")
    t.equal(owner1, "sean", "Initial owner should be set to 'sean'.")

    console.log("MINT")
    fungibleToken.mint("sean", 100)
    const supply2 = fungibleToken.getSupply()
    const balance1 = fungibleToken.getBalance("sean")
    t.equal(supply2, 100, "Should have increased supply by 100 tokens.")
    t.equal(balance1, 100, "Should have assigned newly minted tokens to the owner.")

    console.log("TRANSFER")
    fungibleToken.transfer("sean", "glenn", 50)
    const balance2 = fungibleToken.getBalance("glenn")
    const balance3 = fungibleToken.getBalance("sean")
    t.equal(balance2, 50, "Should have transfered 50 tokens to 'glenn'.")
    t.equal(balance3, 50, "Should have decremented 'sean' balance by 50 tokens.")

    console.log("SETOWNER")
    fungibleToken.setOwner("sean", "glenn")
    const owner2 = fungibleToken.getOwner()
    t.equal(owner2, "glenn", "Should have transfered ownwership of the contract to 'glenn'.")
  })
}
