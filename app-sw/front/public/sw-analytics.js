// analytics module | service worker

// Life Cycle

// browser will wrap this code into an Object from ServiceWorker class + Promise {
    self.addEventListener('install', e => {
        console.info('Analytics: SW installed!');
    })

    self.addEventListener('activate', e => {
        console.info('Analytics: SW activated!');
        // PRAPERE the DB
        // 1. open a DB
        let dbConn = indexedDB.open('analytics');
        dbConn.onupgradeneeded = dbEvent => {
            console.info('DB opened successfully');
            let db = dbEvent.target.result
            console.info(db);

            // 2. create a storage
            let analyticsStorage = db.createObjectStore('actions');
        }
    })

    self.addEventListener('fetch', e => {
        // filtering anything that is out of /api/analytics scope
        if(e.request.url.endsWith('/api/analytics')) {
            console.info('Analytics: fetch intercepted!', e);

            // 1. network ok? (offline, req/res - ok?)
            if(!navigator.onLine) {
                // extract the request body (see fetch API)
                e.request.json().then(data => {
                    console.info("SAVING offline data > ", data);

                    let dbConn = indexedDB.open('analytics');
                        dbConn.onsuccess = dbEvent => {
                            let db = dbEvent.target.result;
                            db.transaction('actions', 'readwrite')
                              .objectStore('actions')
                              .add(data, 1);
                        }
                })
            } else {
                console.info("SENDING online data")
            }
            // 2. accumulate data inside IndexedDB

            // 3. redirect data
        }
    })
// }