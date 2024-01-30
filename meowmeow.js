
self.addEventListener('message', (message) => {
    const { action, catsArray } = message.data;
    if (action === 'getRandomCat') {
        const randomIndex = Math.floor(Math.random() * catsArray.length);
        const randomCatUrl = catsArray[randomIndex].url;
        // Send the random cat URL back to the main thread
        self.postMessage(randomCatUrl);
    }
});