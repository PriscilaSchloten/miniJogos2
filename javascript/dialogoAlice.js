// animacao dialogo com a alice
document.addEventListener('DOMContentLoaded', (event) => {
    const frases = [
        "Olá, eu sou a Alice. O que você está tentando fazer?",
        "(...)",
        " Entretanto vamos jogar um jogo, vai ser jogo da memória,\njá que o pessoal daqui adora, e se vencer vou dizer onde \no coelho está! Ele vive se escondendo então vai ser um \nbelo prêmio para sua busca.\nPronto?"
    ];

    let fraseIndex = 0;
    let charIndex = 0;
    let currentText = '';
    let isDeleting = false;
    const textoElement = document.getElementById('texto');

    function type() {
        if (isDeleting) {
            currentText = frases[fraseIndex].substring(0, charIndex--);
        } else {
            currentText = frases[fraseIndex].substring(0, charIndex++);
        }

        if (fraseIndex === 2) { 
            textoElement.innerHTML = `<p>${currentText.replace(/\n/g, '<br>')}</p>`;
        } else {
            textoElement.textContent = currentText;
        }

        if (!isDeleting && charIndex === frases[fraseIndex].length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            fraseIndex = (fraseIndex + 1) % frases.length;
        }

        const typingSpeed = isDeleting ? 50 : 90;
        setTimeout(type, typingSpeed);
    }

    type();
});

    // Ativa o botão após x segundos (X000 ms)
document.addEventListener('DOMContentLoaded', () => {
    const botao_avancar = document.getElementById('botao_avancar');
    
    setTimeout(() => {
        botao_avancar.classList.add('active');
    }, 36000);
});





