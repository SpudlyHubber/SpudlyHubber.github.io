let w = open("about:blank");
function loop() {
    w.location.reload();
    SetInterval(() => {
        try {
            w.location.reload();
        } 
        catch (e) {
            console.warn("Error :(\n"+e); // most browsers have some thing for anti spam .reload()
        }
        loop();
    }, 100); // this is in ms
}
loop();
