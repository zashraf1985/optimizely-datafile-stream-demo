git clone git@github.com:optimizely/javascript-sdk.git
pushd javascript-sdk && git checkout zeeshan/hack-real-time-df && popd
pushd javascript-sdk/packages/datafile-manager && npm install && popd
pushd javascript-sdk/packages/optimizely-sdk && npm install && popd
