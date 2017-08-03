module.exports = {
  "globDirectory": "app/",
  "globPatterns": [
    "style/main.css",
    "index.html",
    "pages/offline.html",
    "pages/404.html",
    "js/idb-promised.js"
    // want a pattern in here though to demonstrate
  ],
  "swSrc": "app/src/sw.js",
  "swDest": "app/service-worker.js",
  "globIgnores": [
    "../workbox-cli-config.js"
  ]
};
