const test = require("tape")
const contract = require("../output/DoubleAuction.out.js")

contract.onRuntimeInitialized = () => {
  test("DoubleAuction tests", async (t) => {
    t.plan(1)

    console.log("CONSTRUCTOR")
    const doubleAuction = new contract.DoubleAuction()

    const
    t.equal(true, true, "Created DoubleAuction")
  })
}
