# gear-contracts

Example test, compile, deploy framework for BSV powered c++ contracts.

![deLorean Time Machine](delorean.jpg)
___

### Install Emscripten

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
1. `git clone https://github.com/gear-sv/gear-contracts.git`
2. `npm i`
___
### Create account
1. `npm run keys`
```
Creates key pair.
Saves privateKey, publicKey, and address to key.json
Generates QR code image of address to address.png
```
2. Fund account by sending some bsv to the generated address in `key.json`.

### Compile
`npm run compile`

```
Compiles c++ code to wasm bytecode at a.out.wasm.
Generates javascript module interface to a.out.js.

Exports cwrap interfaces based on output functions in emcc call.
See compile.sh for details.
```

### Test

### Deploy
`npm run deploy`
