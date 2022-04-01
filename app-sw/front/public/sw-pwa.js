const appVersionID = 'app-shop-v0.5.0';
// HINT: replace the version from 'package.json' / env
//       use webpack to preprocess 'sw-pwa.js', replace a variable - version

// HINT: check offline, online, not found caching strategies
// ATTENTION: server / client resource identification !!!
// SHELL of the app
const CACHE_OFFLINE_ASSETS = [
    '/',
    '/static/js/bundle.js'
];

// HINT: respect user freedom (prompt?)
self.addEventListener('install', e => {
    // activate the server ONLY after the code insede this method will be executed
    e.waitUntil(
        // using caches API
        caches.open(appVersionID)
              .then((cache) => {
                cache.addAll(CACHE_OFFLINE_ASSETS)
              })
    )
    console.info('pwa: SW installed!');
});

self.addEventListener('activate', e => {
    // clear app cache
    e.waitUntil(
        caches
            .keys()
            .then(keys => Promise.all(
                keys
                    .filter(key => key != appVersionID)
                    .map(key => caches.delete(key))
            ))
    )
})

self.addEventListener('fetch', e => {
    // browser -> req ----> server
    //   \---> event ---> sw-pwa
    //     <---   .respondWith()
    //         <--- res --- 404, 403, offline
    e.respondWith(
        caches
            .match(e.request)
            .then(asset => {
                console.log(asset);
                return asset || fetch(e.request)
            })
    )

})