emcc $contract_path \
  -O0 -s \
  EXPORTED_FUNCTIONS=$functions -s \
  EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
  -std=c++11 \
  -o output/$contract_name.out.js
