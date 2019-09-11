emcc $contract_path \
  --bind \
  -Os -s WASM=1 \
  -o output/$contract_name.out.js

#TODO: add $contract_version to gear-lock
tar -zcvf $contract_name.tar.gz contracts output
