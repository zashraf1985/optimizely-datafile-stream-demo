import {createInstance} from '@optimizely/optimizely-sdk';
import Ably from "ably/callbacks";
import {RealtimeDatafileManagerConfig} from "../javascript-sdk/packages/datafile-manager/lib/datafileManager";

const config: RealtimeDatafileManagerConfig = {
    sdkKey: 'Vro3NpoQyjkv7jQAaQeH8', // TODO: Need SDK Key from Santiago
    enableRealtimeUpdateNotification: false,
    enableStreaming: true,
    // datafileOptions: {
    //     urlTemplate: 'https://optimizely-staging.s3.amazonaws.com/datafiles/%s.json',
    // }
}
const optimizely = createInstance(config);

optimizely?.onReady().then((d) => {
    document.getElementById("flag1").innerHTML = "flag1";
});

// Admin API Key
// const realtime = new Ably.Realtime('1ZS5wg.jAEL8A:8SDXX7o4lEI2NSDToNWetGjvb52gY5BlpMmfqnjah38');
const realtime = new Ably.Realtime('8bjSyw.MGAWTA:upb01Uzp9GcHmP0Y01QCvpbZUZl3GQCqnbB6xHsVIEQ');
const channel = realtime.channels.get("21468570738_development");

document.addEventListener("readystatechange", readyEvent => {
    const {readyState} = readyEvent.target as Document;
    if (readyState !== 'complete') {
        return;
    }

    const sendMockNotificationButton = document.getElementById("send-mock-notification");
    const sendMockDiffStreamButton = document.getElementById("send-mock-diff-stream");

    const mockNotificationDataViaAbly = {"any": "notification data", "doesn't": "matter really"};
    sendMockNotificationButton.addEventListener("click", clickEvent => {
        clickEvent.preventDefault();
        channel.publish("datafile-updated", mockNotificationDataViaAbly);
    });

    const mockJsonPatchViaAbly = [
        {
            "op": "replace",
            "path": "/rollouts/6481581326/experiments/6476790042/trafficAllocation",
            "value": [{"entityId": "6505170634", "endOfRange": 4600}]
        }, {
            "op": "replace",
            "path": "/rollouts/6481581326/experiments/6476790042/trafficAllocation",
            "value": [{"entityId": "6505170634", "endOfRange": 4600}]
        }
    ];
    sendMockDiffStreamButton.addEventListener("click", clickEvent => {
        clickEvent.preventDefault();
        channel.publish("datafile-updated", mockJsonPatchViaAbly);
    });
});

