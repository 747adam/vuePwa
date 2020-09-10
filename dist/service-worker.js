importScripts("precache-manifest.124da65c653a98a206c733ebe457bf56.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

if (workbox) {
    console.log('有進入workbox')

    workbox.core.setCacheNameDetails({
        prefix: 'adamWorkBox',
        suffix: 'v3'
    });

    workbox.precaching.precacheAndRoute([
        {
          url: '/'
        }
    ]);
    workbox.routing.registerRoute(
        new RegExp('.+\\.js$'),
        // JavaScript文件盡可能來自網絡，但如果網絡出現故障，則回退到cache版本
        new workbox.strategies.NetworkFirst
    );
    workbox.routing.registerRoute(
        // Cache CSS files
        /.*\.css/,
        // Use cache but update in the background ASAP
        new workbox.strategies.NetworkFirst({
            // Use a custom cache name
            cacheName: 'css-cache',
        })
    );
    // 圖像可以cache並使用，最久7天之後更新
    workbox.routing.registerRoute(
        // /\.(?:png|gif|jpg|jpeg|svg)$/,
        // Cache image files
        /.*\.(?:png|jpg|jpeg|svg|gif)/,
        // Use the cache if it's available
        // workbox.strategies.staleWhileRevalidate({
            new workbox.strategies.CacheFirst({
            cacheName: 'images-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    // 最多cache圖片張數
                    maxEntries: 60,
                    maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
                    // 超過可用存儲量時自動刪除
                    purgeOnQuotaError: true,
                }),
            ],
        }),
    );
}

// install
self.addEventListener('install', event => {
    console.log('installing.......');
});
// activate
self.addEventListener('activate', event => {
    console.log('now ready to handle fetches!');
});
// fetch
self.addEventListener('fetch', event => {
    console.log('抓到request:', event.request);
});
