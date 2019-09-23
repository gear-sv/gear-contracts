const test = require("tape")
const contract = require("../output/NamingService.out.js")

contract.onRuntimeInitialized = () => {
  test("Naming Service tests", async t => {
    t.plan(4)

    console.log("CONSTRUCTOR")
    const namingService = new contract.NamingService("sean")
    const owner1 = namingService.getOwner()
    t.equal(owner1, "sean", "Initial owner is set to 'sean'.")

    console.log("ENROLL")
    namingService.enroll("sean", "gearsv", "glenn")
    const nameOwner1 = namingService.getNameOwner("gearsv")
    t.equal(nameOwner1, "glenn", "Should enroll 'glenn' as the owner of 'gearsv' name.")

    console.log("TRANSFER")
    namingService.transfer("glenn", "gearsv", "craig")
    const nameOwner2 = namingService.getNameOwner("gearsv")
    t.equal(nameOwner2, "craig", "Should have transered ownership of 'gearsv' from 'glenn' to 'craig'")

    console.log("SETOWNER")
    namingService.setOwner("sean", "dave")
    const owner2 = namingService.getOwner()
    t.equal(owner2, "dave", "Should have changed contract ownership from 'sean' to 'dave'")
  })
}
