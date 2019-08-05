# gear-contracts 👨‍🚀

Example test, compile, deploy harness for BSV powered c++ contracts.

![deLorean Time Machine](delorean.jpg)
___

### Install [Emscripten](https://emscripten.org/docs/)

MacOS Installation Instructions:

1. `brew install emscripten`
```
Installs to /usr/local/Cellar/emscripten/[version].

Generates default config file at `~/.emscripten`.
```

2. Follow configuration steps by updating your `~/.emscripten` file accordingly.
```
Manually set LLVM_ROOT to
  /usr/local/opt/emscripten/libexec/llvm/bin
and comment out BINARYEN_ROOT
in ~/.emscripten after running `emcc` for the first time.
```

### Install gear-contracts
`npm i gear-contracts -g`
___

### Create Project
`gear-contracts init [project_name]`

```
Generates a minimal contract harness.

contracts
  FungibleToken.h
  FungibleToken.cpp
  NamingService.h
  NamingService.cpp
  NonFungibleToken.h
  NonFungibleToken.cpp

tests
  FungibleToken.test.js
  NamingService.test.js
  NonFungibleToken.test.js

output
  [compiled emscripten modules]
  [compiled wasm binaries]
```
### Create account
1. `gear-contracts keys`
```
Creates key pair.
Saves privateKey, publicKey, and address to key.json.
Generates QR code image of address to address.png.
```
2. Fund account by sending some bsv to the generated address in `key.json`. You can easily scan the QR code and send payment with HandCash.

### Compile
`gear-contracts compile [contract_name]`

```
Compiles c++ code to wasm bytecode at [contract_name].out.wasm.
Generates javascript module interface to [contract_name].out.js.
```

### Test
`gear-contracts test [contract_name]`

### Deploy
`gear-contracts deploy [contract_name]`

```
Reads bytecode from file.
Formats gearsv contract deploy call.
Broadcasts transaction.

Check for the deployment transaction at https://whatsonchain.com/address/[address]
```
