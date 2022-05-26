import {createInstance} from '@optimizely/optimizely-sdk';
import Ably from "ably/callbacks";

const optimizely = createInstance({
    sdkKey: '41W6e8Z6JgB87DKE8Ych8',
    enableRealtimeUpdateNotification: true,
    enableStreaming: false,
});

optimizely?.onReady().then((d) => {
    document.getElementById("flag1").innerHTML = "flag1";
});

// Admin API Key
// const realtime = new Ably.Realtime('1ZS5wg.jAEL8A:8SDXX7o4lEI2NSDToNWetGjvb52gY5BlpMmfqnjah38');
const realtime = new Ably.Realtime('8bjSyw.MGAWTA:upb01Uzp9GcHmP0Y01QCvpbZUZl3GQCqnbB6xHsVIEQ');
const channel = realtime.channels.get("21468570738_development");

document.addEventListener("readystatechange", readyEvent => {
    const { readyState } = readyEvent.target as Document;
    if (readyState !== 'complete') {
        return;
    }

    const sendPushButton = document.getElementById("send-push-button");
    sendPushButton.addEventListener("click", clickEvent => {
        clickEvent.preventDefault();
        console.log("Clicked manual push button on client.");
        channel.publish("datafile-updated", {"datafile": "{JSON String Here}"});
    });
});

