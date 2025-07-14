function loop() {
    location.href = location.href;
    SetInterval(() => {
        try {
            location.href = location.href;
        } 
        catch (e) {
            console.warn("Error :(\n"+e); // most browsers have some thing for anti spam .reload()
        }
        loop();
    }, 50); // this is in ms
}
loop();
