emcc $contract_path \
  --bind \
  -Os -s WASM=1 \
  -o output/$contract_name.out.js
