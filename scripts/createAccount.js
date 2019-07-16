const bsv = require("bsv")
const fs = require("fs")

const privateKey = bsv.PrivateKey.fromRandom()

const publicKey = bsv.PublicKey.fromPrivateKey(privateKey)

const address = bsv.Address.fromPublicKey(publicKey)

const key = {
  privateKey: privateKey.toString(),
  publicKey: publicKey.toString(),
  address: address.toString()
}

fs.writeFile("key.json", JSON.stringify(key), "utf8", () => {
  console.log("wrote keyfile")
})
