emcc $contract_path \
  -O0 -s \
  EXPORTED_FUNCTIONS='["_mint", "_setOwner", "_transfer", "_getOwner", "_getSupply", "_getBalance", "_getTicker"]' -s \
  EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
  -std=c++11

mv a.out.wasm output/$wasm_file
mv a.out.js output/$js_file
