var C='notif-v1',A=['./','index.html','style.css','app.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(A)}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(function(r){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)});return r}).catch(function(){return caches.match(e.request)}))});
self.addEventListener('notificationclick',function(e){e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(function(l){return l.length?l[0].focus():clients.openWindow('./')}))});
