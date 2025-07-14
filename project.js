let w = window.open("about:blank");
const worker = new Worker("project.js");
function loop() {
    w.location.reload();
    requestAnimationFrame(loop);
}
loop();
