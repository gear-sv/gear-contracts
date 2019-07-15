const bsv = require("bsv")
const fs = require("fs")

const privateKey = bsv.PrivateKey.fromRandom()
console.log("private Key", privateKey.toString())

const publicKey = bsv.PublicKey.fromPrivateKey(privateKey)
console.log("publicKey", publicKey)

const address = bsv.Address.fromPublicKey(publicKey).toString()
console.log("address", address)

const key = {
  privateKey: privateKey.toString(),
  publicKey: publicKey.toString(),
  address: address.toString()
}

fs.writeFile("key.json", JSON.stringify(key), "utf8", () => {
  console.log("wrote keyfile")
})
