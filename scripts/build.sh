pushd javascript-sdk/packages/datafile-manager && npm run build && popd
pushd javascript-sdk/packages/optimizely-sdk && npm run build && popd
npm run build
npm start