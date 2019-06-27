emcc contracts/Token.cpp -O0 -s EXPORTED_FUNCTIONS='["_init_contract"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' -std=c++11



