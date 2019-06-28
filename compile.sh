emcc contracts/Token.cpp -O0 -s EXPORTED_FUNCTIONS='["_mint", "_getSupply", "_setOwner"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap", "writeStringToMemory"]' -std=c++11



