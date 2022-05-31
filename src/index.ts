import {createInstance} from '@optimizely/optimizely-sdk';

const optimizely = createInstance({
    sdkKey: 'Dp4dLTSVkoP8VhYkdb4Z4',
    datafileOptions: {
        enableRealtimeUpdateNotification: false,
        enableStreaming: true,
        ablyApiKey: '1ZS5wg.g5H34w:Q9kxDvOBljjdhQ5LcK9eTWqp64e4b5iHioyT3zI_5_g',
    }
});

optimizely?.onReady().then((d) => {
    document.getElementById("flag1").innerHTML = "flag1";
});
