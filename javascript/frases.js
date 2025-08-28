const sentences = [
    "She visited her grandmother yesterday",
    "They played football last weekend",
    "I watched a movie last night",
    "We studied English at school",
    "He cooked pasta for dinner",
    "The teacher explained the lesson",
    "I cleaned my room yesterday",
    "She danced at the party",
    "We traveled to London last year",
    "He finished his homework early"
];

let currentSentence = "";
let chosenWords = [];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function newSentence() {
    document.getElementById("feedback").innerHTML = "";
    chosenWords = [];
    document.getElementById("sentence").innerHTML = "";

    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    const words = shuffle(currentSentence.split(" "));

    const wordsDiv = document.getElementById("words");
    wordsDiv.innerHTML = "";
    words.forEach(word => {
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = word;
        span.onclick = () => chooseWord(span);
        wordsDiv.appendChild(span);
    });
}

function chooseWord(span) {
    chosenWords.push(span.textContent);
    document.getElementById("sentence").innerHTML = chosenWords.join(" ");
    span.style.display = "none";
}

function checkAnswer() {
    const feedback = document.getElementById("feedback");
    const userSentence = chosenWords.join(" ");
    if (userSentence === currentSentence) {
        feedback.innerHTML = `<p class="correct">✅ Correct! ${userSentence}</p>`;
    } else {
        feedback.innerHTML = `<p class="wrong">❌ Wrong! Correct sentence: "${currentSentence}"</p>`;
    }
}

newSentence();
