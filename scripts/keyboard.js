const keyboardContainer = document.getElementById("keyboard");
const word = document.getElementById("gameWord");

const keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        onInput: null,
    },

    initialize() {
        this.elements.main = keyboardContainer;
        this.elements.keysContainer = document.createElement("div");
        this.elements.main.appendChild(this.elements.keysContainer);
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboardKeys");
        this.elements.keysContainer.appendChild(this.createKeys());
    },

    createKeys() {
        const fragment = document.createDocumentFragment();
        const layout = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
            "A", "S", "D", "F", "G", "H", "J", "K", "L",
            "Z", "X", "C", "V", "B", "N", "M"
        ];

        layout.forEach(function (key) {
            const button = document.createElement("button");

            button.setAttribute("type", "button");
            button.setAttribute("name", key);
            button.innerHTML = key;
            button.classList.add("keyboardKey");

            button.addEventListener("click", function () {
                console.log(`${key} key was pressed!`);
                word.innerHTML = `${key} key was pressed!`
                button.classList.add("keyboardKey--pressed");
            });

            //console.log(`${key} button was created`);
            fragment.appendChild(button);

            if (key === "P" || key === "L") {
                fragment.appendChild(document.createElement("br"));
                //console.log(`Line breaker added after ${key}`)
            };
        });
        //console.log(fragment);
        return fragment;

    },

    resetKeys (){
        //console.log(this.elements.keysContainer);
        const children = this.elements.keysContainer.childNodes;
        children.forEach(function (button){
            button.classList.remove("keyboardKey--pressed");
        });
    }


    // triggerEvent(handler) {
    //     console.log("Event triggered. " + handler);
    // }

};

// function resetKeys() {
//     keyboard.elements.keysContainer.forEach(function (button) {
//         button.classList.remove("keyboardKey--pressed");
//     });
// }

word.addEventListener("click", function(){
    keyboard.resetKeys();
});


window.addEventListener("DOMContentLoaded", function () {
    keyboard.initialize();
});

