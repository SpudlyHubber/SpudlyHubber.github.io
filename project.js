let w = window.open("about:blank");
self.addEventListener('message', function (e) {
    if (e.data === 'run the timer') {
        setInterval(function() {
            self.postMessage('timer tick');
        }, 1000);
    }
});
function loop() {
    w.location.reload();
    requestAnimationFrame(loop);
}
loop();
