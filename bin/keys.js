const bsv = require("bsv")
const fs = require("fs")
const qr = require("qr-image")

const createAccount = () => {
  const privateKey = bsv.PrivateKey.fromRandom()

  const publicKey = bsv.PublicKey.fromPrivateKey(privateKey)

  const address = bsv.Address.fromPublicKey(publicKey)

  const key = {
    privateKey: privateKey.toString(),
    publicKey: publicKey.toString(),
    address: address.toString()
  }

  fs.writeFile(`${process.cwd()}/key.json`, JSON.stringify(key), "utf8", () => {
    console.log("### keyfile written to key.json")
  })

  console.table(key)

  const code = qr.image(address.toString(), { type: "png" })
  const output = fs.createWriteStream(`${process.cwd()}/address.png`)
  code.pipe(output)
  output.on("close", () => {
    console.log("### qr code saved to address.png")
  })
}

module.exports = createAccount
