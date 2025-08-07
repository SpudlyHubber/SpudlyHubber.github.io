const img = new Image();
var filter = ["red:green"];
var mode = 1;
img.src = "https://ac.blooket.com/marketassets/blooks/megabot.svg";
img.crossOrigin = "Anonymous";
var canvas = document.getElementById("canvas");
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
        }
        ctx.putImageData(imageData, 0, 0);
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
img.addEventListener("load", () => {
    setInterval(loop, 1000);
});