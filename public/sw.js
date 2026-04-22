const cacheName = self.location.pathname
const pages = [

  "/pinyin-book/docs/example/",
  "/pinyin-book/docs/example/table-of-contents/with-toc/",
  "/pinyin-book/docs/example/table-of-contents/without-toc/",
  "/pinyin-book/posts/creating-a-new-theme/",
  "/pinyin-book/posts/migrate-from-jekyll/",
  "/pinyin-book/docs/example/table-of-contents/",
  "/pinyin-book/docs/example/collapsed/",
  "/pinyin-book/",
  "/pinyin-book/showcases/",
  "/pinyin-book/posts/",
  "/pinyin-book/posts/goisforlovers/",
  "/pinyin-book/categories/",
  "/pinyin-book/categories/Development/",
  "/pinyin-book/tags/development/",
  "/pinyin-book/posts/hugoisforlovers/",
  "/pinyin-book/tags/go/",
  "/pinyin-book/categories/golang/",
  "/pinyin-book/tags/golang/",
  "/pinyin-book/tags/hugo/",
  "/pinyin-book/tags/",
  "/pinyin-book/tags/templates/",
  "/pinyin-book/tags/themes/",
  "/pinyin-book/docs/example/collapsed/3rd-level/4th-level/",
  "/pinyin-book/docs/example/collapsed/3rd-level/",
  "/pinyin-book/docs/example/hidden/",
  "/pinyin-book/docs/shortcodes/",
  "/pinyin-book/docs/shortcodes/asciinema/",
  "/pinyin-book/docs/shortcodes/buttons/",
  "/pinyin-book/docs/shortcodes/columns/",
  "/pinyin-book/docs/shortcodes/details/",
  "/pinyin-book/docs/shortcodes/experimental/",
  "/pinyin-book/docs/shortcodes/experimental/badges/",
  "/pinyin-book/docs/shortcodes/experimental/cards/",
  "/pinyin-book/docs/shortcodes/experimental/images/",
  "/pinyin-book/docs/shortcodes/hints/",
  "/pinyin-book/docs/shortcodes/mermaid/",
  "/pinyin-book/docs/shortcodes/section/",
  "/pinyin-book/docs/shortcodes/section/first-page/",
  "/pinyin-book/docs/shortcodes/section/second-page/",
  "/pinyin-book/docs/shortcodes/steps/",
  "/pinyin-book/docs/shortcodes/tabs/",
  "/pinyin-book/docs/",
  "/pinyin-book/docs/shortcodes/katex/",
  "/pinyin-book/book.min.4d6d5ad3b0ae85d2a15b20ab217863f70db543e46314629e239ced759e674898.css",
  "/pinyin-book/en.search-data.min.ff7284d85859ad13f4aec972dc4e38a79b7b2de9ebe711cf6b7f5b5ee1f951a2.json",
  "/pinyin-book/en.search.min.e1e597dfc3b6d16f52026c3a81e6117868777c892320b24a2978be2ca527d802.js",
  
];

self.addEventListener("install", function (event) {
  self.skipWaiting();

  caches.open(cacheName).then((cache) => {
    return cache.addAll(pages);
  });
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  /**
   * @param {Response} response
   * @returns {Promise<Response>}
   */
  function saveToCache(response) {
    if (cacheable(response)) {
      return caches
        .open(cacheName)
        .then((cache) => cache.put(request, response.clone()))
        .then(() => response);
    } else {
      return response;
    }
  }

  /**
   * @param {Error} error
   */
  function serveFromCache(error) {
    return caches.open(cacheName).then((cache) => cache.match(request.url));
  }

  /**
   * @param {Response} response
   * @returns {Boolean}
   */
  function cacheable(response) {
    return response.type === "basic" && response.ok && !response.headers.has("Content-Disposition")
  }

  event.respondWith(fetch(request).then(saveToCache).catch(serveFromCache));
});
