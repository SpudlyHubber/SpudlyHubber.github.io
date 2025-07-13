let w = window.open();
function loop() {
    w.location.reload();
    requestAnimationFrame(loop);
}
