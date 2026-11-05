/* 拼音乐园 离线缓存 Service Worker
   audio/ 下的发音文件不预缓存：首次播放时运行时缓存，
   取不到时页面会自动回落到 index.html 里的内嵌音频。 */
var CACHE = 'pinyin-fun-v20261105-0821';
var ASSETS = [
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './splash/splash-750x1334.png',
  './splash/splash-828x1792.png',
  './splash/splash-1125x2436.png',
  './splash/splash-1170x2532.png',
  './splash/splash-1179x2556.png',
  './splash/splash-1242x2688.png',
  './splash/splash-1284x2778.png',
  './splash/splash-1290x2796.png'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      return Promise.all(ASSETS.map(function(u){
        return c.add(new Request(u, {cache:'reload'})).catch(function(){});
      }));
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method !== 'GET') return;
  if(req.url.indexOf('http') !== 0) return;

  // 打开页面：先联网取新版，取不到再用缓存（保证能及时更新，也保证离线可用）
  if(req.mode === 'navigate'){
    e.respondWith(
      fetch(req).then(function(res){
        if(res && res.status === 200){
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put('./index.html', copy); });
        }
        return res;
      }).catch(function(){
        return caches.match('./index.html', {ignoreSearch:true});
      })
    );
    return;
  }

  // audio/：网络优先，保证替换真人录音后立刻生效；离线时用缓存
  if(req.url.indexOf('/audio/') >= 0){
    e.respondWith(
      fetch(req).then(function(res){
        if(res && res.status === 200){
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copy); });
        }
        return res;
      }).catch(function(){
        return caches.match(req, {ignoreSearch:true});
      })
    );
    return;
  }

  // 其他资源：缓存优先
  e.respondWith(
    caches.match(req, {ignoreSearch:true}).then(function(hit){
      if(hit) return hit;
      return fetch(req).then(function(res){
        if(res && res.status === 200 && res.type === 'basic'){
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copy); });
        }
        return res;
      }).catch(function(){
        // 离线且未缓存过：回一个 404，让页面自动回落到内嵌音频
        return new Response('', {status:404, statusText:'offline'});
      });
    })
  );
});
