if (workbox) {
    workbox.core.setCacheNameDetails({
        prefix: 'adamWorkBox',
        suffix: 'v1'
    });

    workbox.precaching.precacheAndRoute([
        {
          url: 'index.html'
        }
    ]);
    workbox.routing.registerRoute(
        /.*\.js/,
        new workbox.strategies.NetworkFirst({
            cacheName: 'js-cache',
        })
    );
    workbox.routing.registerRoute(
        /.*\.css/,
        new workbox.strategies.NetworkFirst({
            cacheName: 'css-cache',
        })
    );
    // 圖像可以cache並使用，最久7天之後更新
    workbox.routing.registerRoute(
        /.*\.(?:png|jpg|jpeg|svg|gif)/,
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
    console.log('fetch');
});