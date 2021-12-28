addEventListener('message', function (e: MessageEvent) {
    let data = e.data + 1
    postMessage('收到: ' + data)
}, false)