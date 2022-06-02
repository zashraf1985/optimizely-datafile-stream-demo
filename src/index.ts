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
    const title  = decision.variables[decision.variationKey];
    document.getElementsByTagName("h1").textContent = title;
}

const updateHeroImage = (decision: OptimizelyDecision): void => {
    const imageUrl  = decision.variables[decision.variationKey];
    document.getElementsByClassName("hero-container").style.backgroundImage = `url('${imageUrl}')`;
}

optimizely?.onReady().then(() => {
    const HERO_TITLE_EXPERIMENT = 'hero_title';
    const HERO_IMAGE_EXPERIMENT = 'hero_image';

    const userContext: OptimizelyUserContext = optimizely.createUserContext('user-673e7c9d-2b2a-49e3-9faf-9d7216ecd1fe');

    const heroTitleDecision = userContext.decide(HERO_TITLE_EXPERIMENT);
    updateHeroTitle(heroTitleDecision);

    const heroImageDecision = userContext.decide(HERO_IMAGE_EXPERIMENT);
    updateHeroImage(heroImageDecision);

    userContext.subscribeToFlag(HERO_TITLE_EXPERIMENT, (decision: OptimizelyDecision)=>{
        console.log('Hero 🎉 title updated.');
        console.dir(decision);
        updateHeroTitle(decision);
    });
    userContext.subscribeToFlag(HERO_IMAGE_EXPERIMENT, (decision: OptimizelyDecision)=>{
        console.log('Hero 🖼️ image updated.');
        console.dir(decision);
        updateHeroImage(decision);
    });
});
