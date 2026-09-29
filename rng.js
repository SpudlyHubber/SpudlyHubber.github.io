var rarityText = document.getElementById("rarity");
var chanceText = document.getElementById("num");
var bg = document.getElementById("bg");
var origStyle = Object.create(rarityText.style);
var bgOrigStyle = Object.create(bg.style);
var effects = document.getElementById("effects");
var s;
var s_b;
effects.width = innerWidth;
effects.height = 400;
var ctx = effects.getContext("2d");
var particles = [];
var f = 0;
var currentRoll;
ctx.fillRect(0, 0, 100, 100);
var rarities = [];
const colors = {
    ABYSS_PURPLE: "rgb(200, 0, 200)",
}
function addRarity(name, traits, chance, style, anim) {
    rarities.push({name: name, traits: traits, chance: chance, style: style, anim: anim});
}
addRarity("Common", [], 28.99328);
addRarity("Uncommon", [], 24.3);
addRarity("Rare", [], 19);
addRarity("Epic", [], 10,);
addRarity("Fabled", [], 7, ["Gold"]);
addRarity("Legendary", [], 5, ["Gold"]);
addRarity("Exotic", [], 3.2, ["Gold", "Shadow"]);
addRarity("Mythical", [], 1, ["Gold", "Shadow"]);
addRarity("Divine", [], 0.5, ["Divine"]); // 0.5
addRarity("-Aurora-", [], 0.33, ["Aurora", "Dark"]); // 0.33
addRarity("Apex", [], 0.25, ["Apex"]); // 0.25
addRarity("Void", [], 0.2, ["Void", "Dark"]); // 0.2
addRarity("Celestial", [], 0.15, ["Celestial"]); // 0.15
addRarity("Sonic Boom", [], 0.136, ["Sonic Boom"]); // 0.136
addRarity("Fractured", [], 0.133, ["Fractured"]); // 0.133
addRarity("Eclipse", [], 0.128, ["Eclipse"]); // 0.128
addRarity("Spirit", [], 0.1, ["Spirit"]); // 0.1
addRarity("Abyssal", [], 0.05, ["Abyssal"]); // 0.05
addRarity("Transcendent", [], 0.03, ["Transcendent"]); // 0.03
addRarity("Cosmic", [], 0.02, ["Cosmic"]); // 0.02
addRarity("Oblivion", [], 0.015, ["Oblivion"], ["Fire"]); // 0.015
addRarity("Stellar", [], 0.010001, ["Stellar"]); // 0.010001
addRarity("Corrupted", [], 0.009, ["Corrupted"]) // 0.009
addRarity("Singularity", [], 0.0067, ["Singularity"]) // 0.0067
addRarity("null", [], 0.0023001, ["Null"]) // 0.0023001
addRarity("Zodiac", [], 0.001, ["Zodiac"], ["Wheel", "BGShift"]) // 0.001
addRarity("Nihility", [], 0.0000001, ["Nihility"]); // 0.0000001
var currentRarity;
var totChance = 0;
for(var i = 0; i < rarities.length; i++) {
    totChance += rarities[i].chance;
}
function getRarity(chance) {
    let getchance = 0;
    if(chance == undefined) {
        getChance = Math.random() * totChance;
    }
    else {
        getChance = chance;
    }
    let compareChance = 0;
    let i = -1;
    while(compareChance < getChance) {
        i++;
        compareChance += rarities[i].chance;
    }
    currentRoll = rarities[i];
    SetAnims();
    currentRarity = currentRoll.name;
    chanceText.innerHTML = "Chance: " + (rarities[i].chance / totChance * 100).toFixed(3) + "%";
    return rarities[i].style;
}
function SetAnims() {
    try {
        particles = [];
        if(currentRoll.anim.includes("Fire")) {
            for(var i = 0; i < 50; i ++) {
                particles.push(new Particle(Math.floor((Math.random() - 0.5) * effects.width * 2), Math.floor((Math.random()) * effects.height), "Fire"));
            }
        }
        if(currentRoll.anim.includes("Wheel")) {
            particles.push(new Particle(250, effects.height / 2, "Wheel", { speed: 0.005 }));
            particles.push(new Particle(1250, effects.height / 2, "Wheel", { speed: -0.005 }));
        }
    }
    catch {
    }
}
function roll(chance) {
    let style = getRarity(chance);
    s = rarityText.style;
    s_b = bg.style;
    rarityText.innerHTML = currentRarity;
    try {
        rarityText.style = origStyle;  
        bg.style = bgOrigStyle;     
        if(style.includes("Glitch")) {
            rarityText.style.textShadow = "2px 2px 0px red, -2px -2px 0px blue";
        }
        if(style.includes("Shadow")) {
            rarityText.style.textShadow = "2px 2px 0px black";
        }
        if(style.includes("Gold")) {
            rarityText.style.color = "gold";
        }
        if(style.includes("Aurora")) {
            rarityText.style.color = "purple";
            rarityText.style.textShadow = "2px 2px 1px rgb(184, 122, 199)";
            rarityText.style.letterSpacing = "50px";
            rarityText.style.fontSize = "77px";
            rarityText.style.textTransform = "uppercase";
            rarityText.style.fontFamily = "Courier New";
        }
        if(style.includes("Divine")) {
            rarityText.style.color = "yellow";
            rarityText.style.textShadow = "3px 3px 0px white";
            rarityText.style.letterSpacing = "30px";
            rarityText.style.fontSize = "70px";
            rarityText.style.textTransform = "uppercase";
            rarityText.style.fontFamily = "Impact";
            rarityText.style.background = "linear-gradient(to bottom, blue, lightblue)";
        }
        if(style.includes("Dark")) {
            s_b.backgroundColor = "black";
        }
        if(style.includes("Void")) {
            s.textShadow = "2px 2px 0px rgba(111, 0, 255, 1), -2px -2px 0px rgba(111, 0, 255, 0.3)";
            s.fontSize = "88px";
            s.letterSpacing = "88px";
        }
        if(style.includes("Celestial")) {
            // s.textShadow = "2px 2px 0px black";
            s.fontSize = "92px";
            s.letterSpacing = "60px";
            s.color = "transparent";
            s.background = "linear-gradient(to bottom, #0000ff, #00ffff) text";
            s.backgroundClip = "text";
            s_b.background = "linear-gradient(to top, #3333ff, #00ffff)";
        }
        if(style.includes("Apex")) {
            s.textShadow = "2px 2px 0px black";
            s.fontSize = "90px";
            s.letterSpacing = "50px";
            s.color = "green";
            s.fontFamily = "Impact";
            s.textTransform = "uppercase";
            s.background = "linear-gradient(135deg, lightgreen, darkgreen, lightgreen)";
        }
        if(style.includes("Sonic Boom")) {
            s.textShadow = "3px 0px 0px rgba(0, 0, 255, 0.25), -3px 0px 0px rgba(0, 0, 255, 0.25)";
            s.fontSize = "94px";
            s.color = "rgb(0, 0, 255)";
            s.fontFamily = "Impact";
            s.letterSpacing = "11px";
            s.textTransform = "uppercase";
            s.background = "linear-gradient(to left, black, #0000ff, #00ffff, #0000ff, black)";
            rarityText.innerHTML = "Sonic<br>Boom";
        }
        if(style.includes("Fractured")) {
            s.background = "url('Assets/Fractured.jpg')";
            s.backgroundClip = "text";
            s.color = "transparent";
            s.fontSize = "90px";
            s.letterSpacing = "50px";
            s.fontFamily = "Impact";
            s.textTransform = "uppercase";
        }
        if(style.includes("Eclipse")) {
            s.background = "linear-gradient(to right, black, black, black, white, white, black, black, black)";
            s.backgroundClip = "text";
            s.color = "transparent";
            s.fontSize = "90px";
            s.letterSpacing = "50px";
            s.fontFamily = "Impact";
            s.textTransform = "uppercase";
            s.textShadow = "0px 0px 5px rgba(255, 255, 255, 0.5)";
            s.zIndex = "1";
            s_b.background = "black";
            rarityText.innerHTML = 'Eclipse';
            // rarityText.innerHTML = 'Ecli<div class="moon"></div>pse';
        }
        if(style.includes("Spirit")) {
            s.fontSize = "90px";
            s.color = "white";
            s.textShadow = "0px 0px 10px white";
            s.fontFamily = "Rubik Wet Paint, cursive";
            s.letterSpacing = "100px";
            s.transform = "perspective(500px) rotateX(30deg)";
            s_b.background = "black";
        }
        if(style.includes("Abyssal")) {
            rarityText.innerHTML = '<span class="tilt-right">Abys</span><span class="tilt-left">sal</span>';
            s.fontSize = "120px";
            s.letterSpacing = "50px";
            s.fontFamily = "Courier New";
            s_b.background = "radial-gradient(circle, black, rgb(200, 0, 200))";
        }
        if(style.includes("Transcendent")) {
            s.fontSize = "140px";
            s.fontFamily = "Impact";
            s.textTransform = "uppercase";
            s.transform = "perspective(500px) rotateX(20deg)";
            s.color = "yellow";
            s.textShadow = "0px 0px 10px yellow";
            s_b.background = "linear-gradient(to top, blue, black)";
        }
        if(style.includes("Cosmic")) {
            s.fontSize = "180px";
            s.fontFamily = "Impact";
            s.textTransform = "uppercase";
            s.letterSpacing = "25px";
            s.backgroundImage = "url('Assets/cosmos.jpg')";
            s.backgroundClip = "text";
            s.color = "transparent";
            s_b.background = "radial-gradient(circle, black, rgb(50, 0, 50))";
        }
        if(style.includes("Oblivion")) {
            s.fontSize = "200px";
            s.fontFamily = "Impact";
            s.textTransform = "uppercase";
            s.background = "linear-gradient(to top, black, black, black, red, red)";
            s.backgroundClip = "text";
            s.color = "transparent";
            s_b.background = "linear-gradient(to top, orange, darkred)";
        }
        if(style.includes("Stellar")) {
            s.fontSize = "210px";
            s.fontFamily = "BBH Hegarty";
            s.textTransform = "uppercase";
            s.background = "url('Assets/Stellar.webp')";
            s.color = "transparent";
            s.backgroundClip = "text";
        }
        if(style.includes("Corrupted")) {
            s.fontSize = "140px";
            s.fontFamily = "BBH Hegarty";
            s.letterSpacing = "30px";
            s.textTransform = "uppercase";
            s.textShadow = "5px 5px 0px red, -5px -5px 0px blue, 5px -5px 0px yellow, -5px 5px 0px purple";
            s.background = "radial-gradient(circle, darkgreen, black)";
        }
        if(style.includes("Singularity")) {
            s.fontSize = "220px";
            s.fontFamily = "Impact";
            s.background = "url('Assets/Singularity.jpg')";
            s.backgroundPositionX = "132px";
            s.color = "transparent";
            s.backgroundClip = "text";
            s_b.background = "radial-gradient(circle, black, black, red, yellow, orange, black)";
            s.textTransform = "uppercase";
        }
        if(style.includes("Null")) {
            s.fontFamily = "Courier New";
            s.fontSize = "100px";
            s.color = "lightgreen";
            s.textShadow = "0px 0px 10px lightgreen";
            s_b.background = "radial-gradient(circle, green, black)";
        }
        if(style.includes("Zodiac")) {
            s.fontFamily = "BBH Bogle";
            s.fontSize = "200px";
            s.color = "transparent";
            s.background = "url('Assets/Zodiac.jpg')";
            s.backgroundClip = "text";
            s_b.background = "radial-gradient(circle, white, rgb(255, 250, 183))";
        }
        if(style.includes("Nihility")) {
            s.fontSize = "250px";
            s.color = "white";
            s.textShadow = "0px 0px 5px black";
        }
        s.paddingLeft = s.letterSpacing;
    }
    catch {
        rarityText.style = origStyle;
        bg.style = bgOrigStyle; 
    }
}
class Particle {
    constructor(x, y, type, props) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.delete = false;
        this.dir = 0;
        this.props = props;
        this.j = 0;
        switch(this.type) {
            case "Fire":
                this.width = Math.round(Math.random() * 7);
                this.height = 7;
                break;
        }
    }
    draw() {
        switch(this.type) {
            case "Fire":
                ctx.fillStyle = "orange";
                ctx.beginPath();
                ctx.ellipse(this.x, this.y, Math.floor(Math.abs(this.width)), this.height, Math.PI / 4, 0, Math.PI * 2, false);
                ctx.fill();
                break;
            case "Wheel":
                ctx.strokeStyle = "Black";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.j, 0, Math.PI * 2);
                for(var i = 0; i < 12; i++) {
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(this.x + this.j * Math.cos(this.dir + i * Math.PI / 6), this.y + this.j * Math.sin(this.dir + i * Math.PI / 6));
                }
                ctx.stroke();
                break;
        }
    }
    update() {
        switch(this.type) {
            case "Fire":
                this.y -= 1;
                this.x += 1;
                if(this.y < -20) {
                    this.delete = true;
                }
                this.width -= 0.1;
                if(this.width < -7) {
                    this.width = 7;
                }
                break;
            case "Wheel":
                this.dir += this.props.speed;
                if(Math.abs(this.dir) > Math.PI * 2) {
                    this.dir = 0;
                }
                if(this.j < 100) {
                    this.j += 2;
                }
                else {
                    this.j = 100;
                }
                break;
        }
    }
}
function loop() {
    ctx.clearRect(0, 0, effects.width, effects.height);
    try {
        if(currentRoll.anim.includes("Fire")) {
            f++;
            if(f > 3) {
                f = 0;
                particles.push(new Particle(Math.floor((Math.random() - 0.5) * effects.width * 2), 420 + Math.round(Math.random() * 50), "Fire"));
            }
        }
        if(currentRoll.anim.includes("BGShift")) {
            s.backgroundPositionX = f + "px";
            f += 0.3;
            if(f > 3039) {
                f = 0;
            }
        }
    }
    catch {
        particles = [];
    }
    particles.forEach((particle) => {
        particle.draw();
        particle.update();
    });
    particles = particles.filter((particle) => !particle.delete);
    requestAnimationFrame(loop);
}
loop();
