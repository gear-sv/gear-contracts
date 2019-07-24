emcc $contract_path \
  -O0 -s \
  EXPORTED_FUNCTIONS='["_mint", "_setOwner", "_transfer", "_getOwner", "_getSupply", "_getBalance", "_getBalances", "_getTicker"]' -s \
  EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
  -std=c++11
