let expansions = [
    {
        name: "The River",
        components: {
            tiles: 17
        },
        playTime: 0
    },
    {
        name: "The Abbot",
        components: {
            player: [
                {
                    number: 1,
                    name: "Abbot"
                }
            ]
        },
        playTime: 0
    },
    {
        name: "Inns & Cathedrals",
        components: {
            tiles: 18,
            player: [
                {
                    number: 1,
                    name: "Large meeple"
                }
            ]
        },
        playTime: 15
    },
    {
        name: "Traders & Builders",
        components: {
            tiles: 24,
            general: [
                {
                    number: 20,
                    name: "Goods token"
                }
            ],
            player: [
                {
                    number: 1,
                    name: "Builder"
                },
                {
                    number: 1,
                    name: "Pig"
                }
            ]
        },
        playTime: 15
    },
    {
        name: "The Flying Machines",
        components: {
            tiles: 8,
            general: [
                {
                    number: 1,
                    name: "Flight die"
                }
            ]
        },
        playTime: 10
    },
    {
        name: "The Messengers",
        components: {
            general: [
                {
                    number: 8,
                    name: "Message tile"
                }
            ],
            player: [
                {
                    number: 1,
                    name: "Mesenger"
                }
            ]
        },
        playTime: 15
    },
    {
        name: "The Ferries",
        components: {
            general: [
                {
                    number: 8,
                    name: "Ferry"
                }
            ],
            tiles: 8
        },
        playTime: 15
    },
    {
        name: "The Gold Mines",
        components: {
            general: [
                {
                    number: 1,
                    name: "\"The Gold Mines\" scoring token"
                }
            ],
            tiles: 8
        },
        playTime: 10
    },
    {
        name: "Mage & Witch",
        components: {
            general: [
                {
                    number: 1,
                    name: "Mage figure"
                },
                {
                    number: 1,
                    name: "Witch figure"
                }
            ],
            tiles: 8
        },
        playTime: 10
    },
    {
        name: "The Robbers",
        components: {
            tiles: 8,
            player: [
                {
                    number: 1,
                    name: "Robber figure"
                }
            ]
        },
        playTime: 10
    },
    {
        name: "The Crop Circles",
        components: {
            tiles: 6
        },
        playTime: 10
    }
];

window.onload = function (){
    let temp = document.getElementById('expansion-t');
    let expDiv = document.getElementById('expansions');

    for (let i of expansions) {
        let clone = temp.content.cloneNode(true);
        let label = clone.childNodes[1];
        label.innerHTML = label.innerHTML.replace("NAME", i.name);
        expDiv.appendChild(clone);
    }
}

function generate() {
    let generatedDiv = document.getElementById('generated');
    let expansionsDiv = document.getElementById('expansions');
    let componentsTemplate = document.getElementById('components-t');

    generatedDiv.innerHTML = '';

    let activeExpansions = [{
        name: "Carcassonne",
        components: {
            tiles: 84,
            player: [
                {
                    number: 8,
                    name: "Meeple"
                }
            ],
            general: [
                {
                    number: 1,
                    name: "Scoreboard"
                },
                {
                    number: 8,
                    name: "Points tile"
                }
            ]
        },
        playTime: 35
    }];

    for (let expansion of expansionsDiv.getElementsByTagName('label')) {
        let checkbox = expansion.querySelector('.expansion-checkbox');
        if (checkbox.checked) activeExpansions.push(expansions.find((obj) => obj.name === expansion.innerText));
    }

    let components = {
        tiles: [],
        player: [],
        general: []
    };

    for (let key in components) {
        console.log(key);
        for (let expansion of activeExpansions) {
            console.log(expansion);
            if (expansion.components[key] === undefined) continue;
            components[key] = components[key].concat(window["generate_" + key](expansion));
        }
    }

    let playTime = 0;
    for (let i of activeExpansions) {
        playTime += i.playTime;
    }

    let playTimeP = document.createElement('p');
    playTimeP.innerHTML = "<b>Estimated play time:</b> " + String(playTime) + " Min";
    generatedDiv.appendChild(playTimeP);

    let clone = componentsTemplate.content.cloneNode(true);

    for (let ul of clone.querySelectorAll("ul")) {
        let currentComponents = components[ul.dataset.category];
        for (let i of currentComponents) {
            let li = document.createElement('li');
            li.innerHTML = i;
            ul.appendChild(li);
        }
    }

    generatedDiv.appendChild(clone);
}

function generate_tiles(expansion) {
    let number = expansion.components.tiles;
    let name = expansion.name;

    return `${number} \"${name}\" land tiles`;
}

function generate_player(expansion) {
    let out = [];

    for (let i of expansion.components.player) {
        let number = i.number;
        let name = i.name;

        out = out.concat(number + " x " + name);
    }

    return out;
}

function generate_general(expansion) {
    let out = [];

    for (let i of expansion.components.general) {
        let number = i.number;
        let name = i.name;

        out = out.concat(number + " x " + name);
    }

    return out;
}
