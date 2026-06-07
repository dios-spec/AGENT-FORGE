var CACHE="agent-forge-v1";
var ASSETS=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}));self.skipWaiting();});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.map(function(n){if(n!==CACHE)return caches.delete(n);}));}));self.clients.claim();});
self.addEventListener("fetch",function(e){
  var u=e.request.url;
  if(u.indexOf("api.openai.com")>-1||u.indexOf("api.anthropic.com")>-1||u.indexOf("generativelanguage.googleapis.com")>-1)return; // never cache AI calls
  e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request);}));
});
