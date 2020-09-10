// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
// importScripts(
//   "/precache-manifest.fa4fd7bea76f4a95cf2840771851f432.js"
// );

if (workbox) {
    console.log('有進入workbox')
    // adjust log level for displaying workbox logs
    // workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);
    // workbox.core.setCacheNameDetails({prefix: "adamSW"});
    // workbox.precaching.precacheAndRoute([{
    //     "revision": "17ecfaee522eaf5b3ad9c9aa1b2973cc",
    //     "url": "/manifest.json"
    // }]);
    // workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

    // 強製 build 版
    // workbox.setConfig({
    //     debug: false,
    // });

    // workbox.precaching.precacheAndRoute([]);

    workbox.core.setCacheNameDetails({
        prefix: 'adamWorkBox',
        suffix: 'v1'
    });

    // api 匹配 url
    const matchFunction = ({url, request, event}) => {
        return url.href === 'https://example.com/app.js';
    };
    workbox.routing.registerRoute(
        matchFunction,
        handler
    );

    workbox.precaching.precacheAndRoute([
        {
          url: '/',
          revision: 'v1',
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
    
    // 字型
    // workbox.routing.registerRoute(
    //     new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    //     workbox.strategies.cacheFirst({
    //         cacheName: 'googleapis',
    //         plugins: [
    //             new workbox.expiration.Plugin({
    //                 maxEntries: 30,
    //             }),
    //         ],
    //     }),
    // );
}


// 導入precache-manifest和workbox CDN
// self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings();
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// 訂閱service-worker.js文件中的消息並採取相應措施：
// self.addEventListener("message", msg=>{
//     if (msg.data.action=='skipWaiting'){
//         self.skipWaiting()
//     }
// })

// const filesToCache = [
//     '/',
//     '/index.html',
//     '/favicon.ico'
// ];
// const cacheName = 'adam-v1';

// install
self.addEventListener('install', event => {
    console.log('installing.......');
    // event.waitUntil(
    //     caches.open(cacheName).then(cache => {
    //         console.log('Caching app ok');
    //         return cache.addAll(filesToCache)
    //     })
    // );
});
// activate
self.addEventListener('activate', event => {
    console.log('now ready to handle fetches!');
    // event.waitUntil(
    //     // caches.keys() 是 caches 的 API，負責的工作是把所有的 cacheName 取出來
    //     // caches.keys() 返回promise
    //     caches.keys().then(cacheNames => {
    //         const promiseArr = cacheNames.map(item => {
    //             if (item !== cacheName) {
    //                 return caches.delete(item);
    //             }
    //         })
    //         return Promise.all(promiseArr);
    //     })
    // );
});
// fetch
self.addEventListener('fetch', event => {
    console.log('抓到request:', event.request);
    // console.log('抓到fetch事件', event.request.url);
    // 用 respondWith 方法把 response 回傳給網頁檢查用
    // event.respondWith(
    //     caches.match(event.request).then(response => {
    //         console.log('event.request===', event.request)
    //       return response || fetch(event.request).then((response) => {
            
    //         let responseClone = response.clone();
    //         caches.open(cacheName).then((cache) => {
    //             if((event.request.url.indexOf('http') === 0)){
    //                 cache.put(event.request, responseClone);
    //                 console.log('response cache===', responseClone)
    //             }
    //         });
    //         return response;
    //       }).catch(() => {
    //         console.log('失敗進入catch')
    //       })
    //     })
    // );
});