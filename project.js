let w = window.open("about:blank");
function loop() {
    w.location.reload();
    requestAnimationFrame(loop);
}
loop();
