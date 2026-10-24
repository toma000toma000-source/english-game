// Cache only this lesson's application shell, not other games on the same GitHub Pages site.
const CACHE='english-lesson4-pwa-v1';
const APP='20261027_chu1_joyfulwork_L4.html';
const FILES=[APP,'lesson4-manifest.webmanifest','lesson4-icon-192.png','lesson4-icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('english-lesson4-pwa-')&&k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',event=>{
 const u=new URL(event.request.url);
 if(event.request.method!=='GET'||u.origin!==self.location.origin||!u.pathname.endsWith('/'+APP))return;
 // Fresh online copy on each launch; cached lesson is used when offline.
 event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(APP,copy));}return response;}).catch(()=>caches.match(APP)));
});
