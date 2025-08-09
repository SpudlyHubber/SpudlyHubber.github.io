filter = [];
const img = new Image();
var mode = 1;
img.src = "";
img.crossOrigin = "Anonymous";
var canvas = document.getElementById("canvas");
var cb = document.createElement("canvas");
var ctxb = cb.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight * 0.75;
const ctx = canvas.getContext("2d");
const effects = {
    modify: function() {
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const data = imageData.data;
        for(var i = 0; i < data.length; i += 4) {
            if(i / 4 % img.width >= img.width / 2 && filter.includes("half-invert")) {
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i + 1];
                data[i + 2] = 255 - data[i + 2];
            }
            if(filter.includes("invert")) {
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i + 1];
                data[i + 2] = 255 - data[i + 2];
            }
            if(data[i + 3] > 0 && filter.includes("ghost")) {
                data[i + 3] = 255 - (255 * ((i / 4 % img.width) / img.width));
            }
            if(filter.includes("red:blue")) {
                [data[i], data[i + 2]] = [data[i + 2], data[i]];
            }
            if(filter.includes("red:green")) {
                [data[i], data[i + 1]] = [data[i + 1], data[i]];
            }
            if(filter.includes("green:blue")) {
                [data[i + 1], data[i + 2]] = [data[i + 2], data[i + 1]];
            }
            if(filter.includes("greyscale")) {
                let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg;
                data[i + 1] = avg;
                data[i + 2] = avg;
            }
            if(filter.includes("sepia")) {
                let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = 112 / 255 * avg;
                data[i + 1] = 66 / 255 * avg;
                data[i + 2] = 20 / 255 * avg;
            }
        }
        cb.width = img.width;
        cb.height = img.height;
        ctx.putImageData(imageData, 0, 0);
        ctxb.putImageData(imageData, 0, 0);
        }
}
function loop() {
    img.src = url.value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    try {
        ctx.drawImage(img, 0, 0, img.width, img.height);
        effects.modify();
    }
    catch {
    }
}
function setFilter(f) {
    if(mode === 1) {
        filter.push(f);
    }
    else {
        if(filter.includes(f)) {
            filter.splice(filter.indexOf(f), 1);
        }
    }
}
function toggle() {
    mode = 1 - mode;
    if(mode === 1) {
        addf.value = "Add Filters";
    }
    if(mode === 0) {
        addf.value = "Remove Filters";
    }
}
function removeFilters() {
    filter = [];
}
function downloadCanvas() {
    cb.toBlob(blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Filtered-image.png";
        link.click();
    });
}
addEventListener("load", () => {
    setInterval(loop, 1000);
});



