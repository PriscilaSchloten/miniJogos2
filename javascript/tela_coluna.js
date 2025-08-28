
const sentences = [
    { left: "She visited", right: "the museum on Saturday." },
    { left: "They watched", right: "a movie at the cinema." },
    { left: "He played", right: "football with his friends last weekend." },
    { left: "We studied", right: "English for the exam last night." },
    { left: "I bought", right: "a new computer yesterday." },
    { left: "He cooked", right: "dinner for his family." },
    { left: "She cleaned", right: "her room in the morning." },
    { left: "They traveled", right: "to Spain last summer." },
    { left: "I woke up", right: "late on Sunday." },
    { left: "We listened", right: "to music all evening." },
    { left: "He read", right: "an interesting book last week." },
    { left: "She called", right: "her best friend yesterday." },
    { left: "They opened", right: "the new store downtown." },
    { left: "We visited", right: "our grandparents last weekend." },
    { left: "I wrote", right: "a letter to my teacher." }
];

let selectedLeft = null;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function loadGame() {
    selectedLeft = null;
    const leftCol = document.getElementById("leftCol");
    const rightCol = document.getElementById("rightCol");
    leftCol.innerHTML = "";
    rightCol.innerHTML = "";

    // escolhe 5 frases aleatórias
    const chosen = shuffle([...sentences]).slice(0, 5);

    const leftItems = shuffle([...chosen]);
    const rightItems = shuffle([...chosen]);

    leftItems.forEach((s, index) => {
        const div = document.createElement("div");
        div.className = "item";
        div.dataset.id = index;
        div.textContent = s.left;
        leftCol.appendChild(div);
    });

    rightItems.forEach((s, index) => {
        const div = document.createElement("div");
        div.className = "item";
        div.dataset.match = leftItems.findIndex(l => l.right === s.right);
        div.textContent = s.right;
        rightCol.appendChild(div);
    });

    // Eventos
    document.querySelectorAll("#leftCol .item").forEach(item => {
        item.addEventListener("click", () => {
            document.querySelectorAll("#leftCol .item").forEach(i => i.classList.remove("selected"));
            item.classList.add("selected");
            selectedLeft = item;
        });
    });

    document.querySelectorAll("#rightCol .item").forEach(item => {
        item.addEventListener("click", () => {
            if (!selectedLeft) return;
            if (item.dataset.match === selectedLeft.dataset.id) {
                selectedLeft.classList.add("correct");
                item.classList.add("correct");
                selectedLeft.classList.remove("selected");
                selectedLeft = null;
            } else {
                item.classList.add("wrong");
                setTimeout(() => item.classList.remove("wrong"), 800);
            }
        });
    });
}

// inicia jogo
loadGame();
