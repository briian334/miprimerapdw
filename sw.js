//asignar nombre y version de la cache
const CACHE_NAME = 'v1_cache_BCH_PWA';

//configuracion de los ficheros
var urlToCache = [
    './',
    './css/style.css',
    './img/about.png',
    './img/bg.jpg',
    './img/carousel-1.jpg',
    './img/carousel-2.jpg',
    './img/favicon-16.jpg',
    './img/favicon-32.jpg',
    './img/favicon-64.jpg',
    './img/favicon-96.jpg',
    './img/favicon-128.jpg',
    './img/favicon-192.jpg',
    './img/favicon-256.jpg',
    './img/favicon-384.jpg',
    './img/favicon-512.jpg',
    './img/favicon-1024.jpg',
    './img/favicon.jpg',
    './img/screenshot1280x720.png',
    './img/screenshot720x1280.png'
];
self.addEventListener('install', e =>{
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(Cache => {
                return Cache.addAll(urlToCache)
                    .then(()=>{
                        self.skipWaiting();
                    })
            })
            .catch(err => console.log('No se pudo registrar cache',err))
    );
})
//Evento activate
self.addEventListener('activate', e =>{
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheNames=>{
                    if (cacheWhitelist.indexOf(cacheNames)==1) {
                        //borrar elementos que no necesitan
                        return cache.delete(cacheNames);
                    }
                })
            );
        }).then(()=> {
            self.clients.claim(); //se activa la cache en el dispositivo
        })
    );
});
//checa si tienes archivos en cache
self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res =>{
            if (res) {
                //devuelve datos desde cache
                return res;
            }
            return fetch(e.request);
            //hago peticion al servidor en caso de que no este en cache
        })
    )
})