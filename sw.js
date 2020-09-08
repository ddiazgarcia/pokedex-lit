/* eslint-disable no-undef */
const POKEMON_CACHE = 'pokeCache';

self.addEventListener('install', async event => {
    const cache = await event.waitUntil(caches.open(POKEMON_CACHE));
    console.log(cache);
});

const manageCachedElement = async request => {
    const requestToCache = request.clone();

    let response = await caches.match(request);
    if (response) {
        return response;
    }
    // Entry is not in the cache. Fetch from server
    response = await fetch(request);
    //     if (event.request.url.startsWith('https://pokeapi.co/')) {
    if (
        response &&
        response.status === 200 &&
        (request.url.startsWith('https://pokeapi.co/') ||
            request.url.includes('.png'))
    ) {
        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        const responseToCache = response.clone();

        const cache = await caches.open(POKEMON_CACHE);
        cache.put(requestToCache, responseToCache);
        console.log(`Added resource ${requestToCache.url} to ${POKEMON_CACHE}`);
    }
    return response;
};

self.addEventListener('fetch', async event => {
    event.respondWith(manageCachedElement(event.request));
});
