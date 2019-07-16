const bsv = require("bsv")
const fs = require("fs")
const qr = require("qr-image")

const privateKey = bsv.PrivateKey.fromRandom()

const publicKey = bsv.PublicKey.fromPrivateKey(privateKey)

const address = bsv.Address.fromPublicKey(publicKey)

const key = {
  privateKey: privateKey.toString(),
  publicKey: publicKey.toString(),
  address: address.toString()
}

fs.writeFile("key.json", JSON.stringify(key), "utf8", () => {
  console.log("keyfile written to key.json")
})

const code = qr.image(address.toString(), { type: "png" })
const output = fs.createWriteStream("address.png")
code.pipe(output)
