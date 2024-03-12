const version = 'v1'
const cachedRes = ['/', './index.html', './static/logo.png']
const bc = new BroadcastChannel('sw')



self.addEventListener('install', async e => {
    console.log('[install]正在安装 Service Worker', e);
    const cache = await caches.open(version)
    cache.addAll(cachedRes)
})

self.addEventListener('activate', e => {
    console.log('[activate]正在激活 Service Worker', e);
})

const cacheFirst = async request => {
    let response = await caches.match(request)
    try {
        if (response) {
            console.log('[fetch]命中缓存，从缓存返回数据', response);
            return response
        }
        response = await fetch(request)
        console.log('[fetch]未命中缓存，从服务器获取数据', response);
        return response
    } catch (reason) {
        console.log('[fetch]发生了些错误', reason);
        return reason
    }
}

self.addEventListener('fetch', e => {
    console.log('[fetch]正在通过 Service Worker 获取数据', e);
    e.respondWith(
        cacheFirst(e.request)
    )

})

const sendStyle = async response => {
    bc.postMessage(await response.text())
}

const loadStyle = async () => {
    try {
        let response = await caches.match('style.css')
        if (response) {
            console.log('[sync]命中缓存，从缓存返回数据', response);
            await sendStyle(response.clone())
            return response
        }


        response = await fetch('style.css')
        await sendStyle(response.clone())

        const cache = await caches.open(version)
        cache.put('style.css', response.clone())

        console.log('[sync]未命中缓存，从服务器获取到数据', response);
        return response
    } catch (reason) {
        console.log('[sync]发生了些错误', reason);
        return reason
    }
}



self.addEventListener('sync', e => {
    console.log('[sync]Service Worker 接收到同步任务', e);
    if (e.tag === 'load-style')
        e.waitUntil(
            loadStyle()
        )

})


self.addEventListener('push', e => {
    console.log('[push]从服务器接收到推送消息', e.data.text());
    const { title, message } = e.data.json()
    e.waitUntil(
        self.registration.showNotification(title, {
            body: message,
        })
    )
})