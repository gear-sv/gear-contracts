const bsv = require("bsv")
const fs = require("fs")
const qr = require("qrcode-terminal")

const createAccount = () => {
  return new Promise((resolve, reject) => {
    const privateKey = bsv.PrivateKey.fromRandom()

    const publicKey = bsv.PublicKey.fromPrivateKey(privateKey)

    const address = bsv.Address.fromPublicKey(publicKey)

    const key = {
      privateKey: privateKey.toString(),
      publicKey: publicKey.toString(),
      address: address.toString()
    }

    fs.writeFile(`${process.cwd()}/key.json`, JSON.stringify(key), "utf8", (error) => {
      console.log("### keyfile written to key.json")
    })
    const genQR = qr.generate(address.toString());
    genQR;

    const output = fs.createWriteStream(`${process.cwd()}/address.png`)
    genQR.pipe(output)

    output.on("close", () => {
    resolve(key);

}
  )})}
module.exports = createAccount
createAccount()
