var cacheName = 'bs-0-2-4';
var cacheFiles = [
	'/',
	'./index.html',
	'./index.js',
	'./index.css',
	'./img/book-144.png'
];

// 安装阶段，缓存资源
self.addEventListener('install', e => {
	// sw.js 文件的更新是一个非常坑爹的过程。因为，它的替换是当 older SW 不工作的时候，new SW 才能发生作用。
	// 用skipWaiting主动触发sw的更新
	self.skipWaiting();
	// caches open 没有存在的cache就新建，有就打开
	// cache.addAll 缓存添加资源 相当于cache.put + http fetch request
	var p = caches.open(cacheName).then(cache => cache.addAll(cacheFiles));
	// 存储完毕后，进入下一阶段
	e.waitUntil(p);
	console.log('安装成功');
});

// 拦截请求，查询缓存
self.addEventListener('fetch', e => {
	var request = e.request;
	console.log('请求', request);

	e.respondWith(fetchProxy(request));
});

// 激活阶段清除上个sw残留的缓存
self.addEventListener('activate', e => {
	var p = caches.keys().then(keys => Promise.all(keys.map(key => key != cacheName && caches.delete(key))));
	e.waitUntil(p);
	return self.clients.claim();
});

function fetchProxy(request) {
	return caches.open(cacheName).then(cache => {
		return cache.match(request).then(cacheRes => {
			var p = fetch(request).then(response => {
				cache.put(request, response);
				return response;
			});
			return cacheRes || p;
		})
	})
}