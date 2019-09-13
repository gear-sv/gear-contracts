mkdir tmp

cp contracts/${contract_name}.cpp tmp/
cp contracts/${contract_name}.h tmp/
cp contracts/${contract_name}.json tmp/

cp output/${contract_name}.out.wasm tmp/
cp output/${contract_name}.out.js tmp/

tar -zcvf ${contract_name}.tar.gz tmp
mv ${contract_name}.tar.gz output/

rm -rf tmp
