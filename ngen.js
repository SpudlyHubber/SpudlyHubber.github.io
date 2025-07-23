var text = document.getElementById("text");
let vowels = ['a', 'e', 'i', 'o', 'u'];
let consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'k', 'l',
 'm', 'n', 'p', 'r', 's', 't', 'y', 'v', 'x']
let vpairs = ['ee', 'oo', 'ea', 'ou', 'oi', 'io', 'au'];
let cpairs = ['th', 'ch', 'sh', 'tr', 'st', 'lt', 'ck', 'pl', 'sl', 'fr', 'bl', 'br'];
let titles = [' the Creator', ' the Destroyer', ' the Scholar', ' the Warrior', ' the Ruler', ' the Overlord',
    ' the Merciful', ' the Merciless', ' the Gentle', ' the Powerful', ' the Cunning', ' the Great'];
const capitalize = function(n) {
    return n[0].toUpperCase() + n.slice(1, n.length);
}
function genname() {
    var nchars = Math.round(Math.random() * 5 + 2);
    var name = "";
    var rand = 0;
    if(Math.ceil(Math.random() * 2) == 1) {
        rand = 1;
    }
    else {
        rand = 2;
    }
    var chosenChar = 0;
    for(var i = 0; i < nchars; i++) {
        switch(rand) {
            case 1:
                chosenChar = Math.round(Math.random() * 4);
                name = name += vowels[chosenChar];
                break;
            case 2:
                chosenChar = Math.round(Math.random() * (consonants.length - 1));
                name = name += consonants[chosenChar];
                break;
            case 3:
                chosenChar = Math.round(Math.random() * (vpairs.length - 1));
                name = name += vpairs[chosenChar];
                break;
            case 4:
                chosenChar = Math.round(Math.random() * (cpairs.length - 1));
                name = name += cpairs[chosenChar];
                break;
        }
        if(rand == 1 || rand == 3) {
            if(Math.ceil(Math.random() * 2) == 2) {
                rand = 2;
            }
            else {
                rand = 4;
            }
        }
        else if(rand == 2 || rand == 4) {
            if(Math.ceil(Math.random() * 3) < 3) {
                rand = 1;
            }
            else {
                rand = 3;
            }
        }
        if(i == nchars - 1) {
            if(Math.ceil(Math.random() * 2) == 1) {
                rand = 1;
            }
            else {
                if(rand == 2) {
                    rand = 1;
                }
                else {
                    rand = 2;
                }
            }
        }
    }
    if(vpairs.includes(name[name.length - 2] + name[name.length - 1])) {
        chosenChar = Math.round(Math.random() * (consonants.length - 1));
        name = name += consonants[chosenChar];
    }
    if(cpairs.includes(name[name.length - 2] + name[name.length - 1])) {
        chosenChar = Math.round(Math.random() * (vowels.length - 1));
        name = name += vowels[chosenChar];
    }
    return name;
}
function createTitle(name) {
    return capitalize(name) + titles[Math.round(Math.random() * (titles.length - 1))];
}
function gen() {
    text.innerHTML = createTitle(genname());
}