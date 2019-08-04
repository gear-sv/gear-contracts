emcc $contract_path \
  --bind \
  -o output/$contract_name.out.js


  # EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
  # EXPORTED_FUNCTIONS=$functions -s \
  # -std=c++11 \
  # -O0 -s \
