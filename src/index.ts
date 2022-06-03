import {createInstance, OptimizelyUserContext, OptimizelyDecision} from '@optimizely/optimizely-sdk';

const optimizely = createInstance({
    sdkKey: 'FYDMrz5n9uRYLfyF15CLm',
    datafileOptions: {
        enableRealtimeUpdateNotification: true,
        ablyApiKey: '1ZS5wg.g5H34w:Q9kxDvOBljjdhQ5LcK9eTWqp64e4b5iHioyT3zI_5_g',
        urlTemplate: 'https://optimizely-staging.s3.amazonaws.com/datafiles/%s.json'
    },
});

const updateHeroTitle = (decision: OptimizelyDecision): void => {
    const title  = decision.variables[decision.variationKey] as string;
    if (title === undefined) {
        return;
    }
    document.getElementById("hero-title").textContent = title;
}

const updateHeroImage = (decision: OptimizelyDecision): void => {
    const imageUrl  = decision.variables[decision.variationKey] as string;
    if (imageUrl === undefined) {
        return;
    }
    document.getElementById("hero-container").style.backgroundImage = `url('${imageUrl}')`;
}

optimizely?.onReady().then(() => {
    const userContext: OptimizelyUserContext = optimizely.createUserContext('user-673e7c9d-2b2a-49e3-9faf-9d7216ecd1fe');

    userContext.subscribeToFlag('hero_title', (decision: OptimizelyDecision)=>{
        console.log('Hero 🎉 title updated FROM subscribeToFlag().');
        console.dir(decision);
        updateHeroTitle(decision);
    });
    userContext.subscribeToFlag('hero_image', (decision: OptimizelyDecision)=>{
        console.log('Hero 🖼️ image updated FROM subscribeToFlag().');
        console.dir(decision);
        updateHeroImage(decision);
    });
});
