const bsv = require("bsv")
const fs = require("fs")

const privateKey = new bsv.PrivateKey()
const exported = privateKey.toWIF()

fs.writeFile("key.json", JSON.stringify({ privateKey: exported }), "utf8", () => {
  console.log("wrote keyfile")
})
