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
`npm run test`

### Deploy
`npm run deploy`

```
Reads bytecode from file.
Formats gearsv contract deploy call.
Broadcasts transaction.

Check for the deployment transaction at https://whatsonchain.com/address/[address]
```
____

### Token

The `Token` implementation is a port of the solidity `erc20` standard. See reference examply by OpenZeppelin [here](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/token/ERC20/ERC20.sol).
*The core functionality does not include check/approvals.*

| state  | type | explanation |
| ------------- | ------------- | ------------- |
| owner  | char*  | hex string address. ability to mint or set new owner.
| supply | uint  | current total supply in circulation.
| balances | (char*, uint)  | std::map of address to integer supply units. accounting ledger for token.
| ticker | char*  | shorthand identifier for token.

| setter  | parameters | explanation |
| ------------- | ------------- | ------------- |
| send  | (char* recipient, uint value)  |  transfers specified value from the sender to the recipient.
| setOwner | (char* newOwner)  | if the current owner, set a new owner to the specified address.
| mint | (uint value)  | if the current owner, mint the specified value, the sender being the recipient.
