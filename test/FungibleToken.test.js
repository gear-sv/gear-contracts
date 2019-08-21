const test = require("tape")
const contract = require("../output/FungibleToken.out.js")

contract.onRuntimeInitialized = () => {
  test("Fungible Token tests", async (t) => {
    t.plan(10)

    console.log("CONSTRUCTOR")
    const fungibleToken = new contract.FungibleToken("sean")
    const supply1 = fungibleToken.getSupply()
    const owner1 = fungibleToken.getOwner()
    t.equal(supply1, 0, "Initital supply should be set to 0.")
    t.equal(owner1, "sean", "Initial owner should be set to 'sean'.")

    console.log("MINT")
    const status1 = fungibleToken.mint("sean", 100)
    const supply2 = fungibleToken.getSupply()
    const balance1 = fungibleToken.getBalance("sean")
    t.equal(supply2, 100, "Should have increased supply by 100 tokens.")
    t.equal(balance1, 100, "Should have assigned newly minted tokens to the owner.")

    console.log("TRANSFER")
    const status2 = fungibleToken.transfer("sean", "glenn", 50)
    const balance2 = fungibleToken.getBalance("glenn")
    const balance3 = fungibleToken.getBalance("sean")
    t.equal(balance2, 50, "Should have transferred 50 tokens to 'glenn'.")
    t.equal(balance3, 50, "Should have decremented 'sean' balance by 50 tokens.")

    console.log("SETOWNER")
    const status4 = fungibleToken.setOwner("sean", "glenn")
    const owner2 = fungibleToken.getOwner()
    t.equal(owner2, "glenn", "Should have transferred ownwership of the contract to 'glenn'.")

    console.log("FAIL")
    const status5 = fungibleToken.transfer("sean", "glenn", 200)
    t.equal(status5, "fail", "Should have failed to transfer when sending more tokens than the current balance.")

    const status6 = fungibleToken.setOwner("sean", "craig")
    t.equal(status6, "fail", "Should have failed to set owner when SENDER is not the current owner.")

    const status7 = fungibleToken.mint("sean", 100)
    t.equal(status7, "fail", "Should have failed to mint when SENDER is not the current owner.")
  })
}
