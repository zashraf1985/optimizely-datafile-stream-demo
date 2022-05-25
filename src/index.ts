import { createInstance, enums, setLogLevel } from '@optimizely/optimizely-sdk';

const optimizely = createInstance({
  sdkKey: 'Vro3NpoQyjkv7jQAaQeH8'
});

optimizely?.onReady().then((d) => {
  document.getElementById("flag1").innerHTML = "flag1";
})