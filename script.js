let expansions = [
    {
        name: "The River",
        components: {
            tiles: "17 \"The River\" land tiles"
        }
    },
    {
        name: "The Abbot",
        components: {
            player: ["1 abbot"]
        }
    },
    {
        name: "Inns & Cathedrals",
        components: {
            tiles: "18 \"Inns & Cathedrals\" land tiles",
            player: ["1 large meeple"]
        }
    },
    {
        name: "Traders & Builders",
        components: {
            tiles: "24 \"Traders & Builders\" land tiles",
            general: ["20 goods tokens (9x Wine, 6x Corn and 5x Cloth)"],
            player: ["1 builder", "1 pig"]
        }
    },
    {
        name: "The Flying Machines",
        components: {
            tiles: "8 \"The Flying Machines\" land tiles",
            general: ["1 flight die"]
        }
    },
    {
        name: "The Messengers",
        components: {
            general: ["8 message tiles"],
            player: ["1 messenger"]
        }
    },
    {
        name: "The Ferries",
        components: {
            general: ["8 ferries"],
            tiles: "8 \"The Ferries\" land tiles"
        }
    },
    {
        name: "The Gold Mines",
        components: {
            general: ["1 \"The Gold Mines\" scoring token", "8 gold ingots"],
            tiles: "8 \"The Gold Mines\" land tiles"
        }
    },
    {
        name: "Mage & Witch",
        components: {
            general: ["1 mage figure", "1 witch figure"],
            tiles: "8 \"Magician & Witch\" land tiles"
        }
    },
    {
        name: "The Robbers",
        components: {
            tiles: "8 \"The Robbers\" land tiles",
            player: ["1 robber figure"]
        }
    },
    {
        name: "The Crop Circles",
        components: {
            tiles: "6 \"The Crop Circles\" land tiles"
        }
    }
];

window.onload = function () {
    let temp = document.getElementById('expansion-temp');
    let expDiv = document.getElementById('expansions')

    for (let i in expansions) {
        let clone = temp.content.cloneNode(true);
        let label = clone.childNodes[1];
        label.innerHTML = label.innerHTML.replace("NAME", expansions[i].name);
        expDiv.appendChild(clone);
    }
}

function generate() {
    let generated = document.getElementById("generated");
    generated.innerHTML = '';

    let exps = document.getElementById("expansions").children;
    let active = [];

    for (let exp of exps) {
        let checkbox = exp.children[0];
        if (exp.tagName !== 'LABEL') continue;
        if (checkbox.checked) active.push(expansions.find((obj) => obj.name === exp.innerText));
    }

    // Components
    let components = {
        general: [],
        player: [],
        tiles: []
    };
    for (let i of active) {
        for (let j in components) {
            if (i.components[j] === undefined) continue;
            components[j] = components[j].concat(i.components[j]);
        }
    }

    let temp = document.getElementById("comp-temp");

    let clone = temp.content.cloneNode(true);
    for (let i of clone.querySelectorAll("ul")) {
        let currentComponents = components[i.id];
        for (let j of currentComponents) {
            let li = document.createElement('li');
            li.innerHTML = j;
            i.appendChild(li);
        }
    }

    generated.appendChild(clone);

    /*
    // Pieces
    let pieces = [];
    for (let expansion of active) {
        pieces = [...pieces, ...expansion.pieces];
    }


    let temp = document.getElementById("pieces-temp");

    let clone = temp.content.cloneNode(true);
    let ul = clone.querySelector('ul');

    for (let i in pieces) {
        let li = document.createElement('li');
        li.innerHTML = pieces[i];
        ul.appendChild(li);
    }

    generated.appendChild(clone);*/
}
