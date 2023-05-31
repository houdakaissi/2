const CACHE_NAME="version-1"
const urlsToCache=['index.html','offline.html']
const self=this;
 
self.addEventListener('install',(event)=>{
event.waitUntil(
  caches.open(CACHE_NAME)

.then((cache)=>{
console.log("openedddddddddddddddddddddddddddddddddddddddddddddd cache");
return cache.addAll(urlsToCache);
})
)
})

self.addEventListener('fetch',(event)=>{
event.respondWith(
  caches.match(event.request)
  .then(()=>{
    return fetch(event.request)
    .catch(()=> caches.match('offline.html'))
     
  })
)
});

self.addEventListener('activate',(event)=>{
const cacheWhitelist=[];
cacheWhitelist.push(CACHE_NAME)

event.waitUntil(
  caches.keys().then((cacheNames)=>Promise.all(
    cacheNames.map((cacheName)=>{
      if(!cacheWhitelist.includes(cacheName)){
        return caches.delete(cacheName)
      }
    })
  ))
)

})
/*import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
  ({ request, url }) => {
    if (request.mode !== "navigate") {
      return false;
    }

    if (url.pathname.startsWith("/_")) {
      return false;
    }

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
);

registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"),
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
*/