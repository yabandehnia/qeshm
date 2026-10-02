const C='qm-v1',F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./azan-Makkah-2.mp3'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
async function part(req,res){const b=await res.arrayBuffer(),m=/bytes=(\d+)-(\d*)/.exec(req.headers.get('range')),s=+m[1],e=m[2]?+m[2]:b.byteLength-1;return new Response(b.slice(s,e+1),{status:206,headers:{'Content-Type':'audio/mpeg','Content-Range':'bytes '+s+'-'+e+'/'+b.byteLength,'Content-Length':String(e-s+1)}});}
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>{if(r&&e.request.headers.get('range'))return part(e.request,r);return r||fetch(e.request);}));});
