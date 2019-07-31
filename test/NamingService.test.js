const test = require("tape")
const contractModule = require(".output/NamingService.out.js")

contractModule.onRuntimeInitialized = () => {
  console.log("contract initialized")
  // test("NamingService contract tests", async t => {
  //
  // })
}
