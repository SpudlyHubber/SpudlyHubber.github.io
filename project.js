let w = window.open("https://www.google.com/");
let n = 0;
function loop() {
    w.location.reload();
    requestAnimationFrame(loop);
}
loop();