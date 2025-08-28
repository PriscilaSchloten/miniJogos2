//para checar se meus botoes radio estão selecionados
const radioBotao = document.querySelectorAll('input[name="botao"]');

//if para verificar e notificar preenchimento do nick
// document.getElementById("form-validar").addEventListener("submit", function (e) {
//     e.preventDefault();

//     const textoInput = document.getElementById("input_nickname").value.trim();

//     if (textoInput) {
//         localStorage.setItem("nickname", textoInput); // Armazena o valor no localStorage
//         alert("Nickname confirmado com Sucesso!");
//         document.getElementById("mensagem").innerHTML = "Nickname confirmado com Sucesso!";
//         checkRadio();
//     }
// });

//função de contador + if para verificar e notificar preenchimento dificuldade
// Evento para o formulário: só verifica a dificuldade
document.getElementById("form-validar").addEventListener("submit", function (e) {
    e.preventDefault();
    checkRadio();
});

// Função para verificar e redirecionar conforme a dificuldade
function checkRadio() {
    let isSelected = false;
    let difi = null;
    for (let i = 0; i < radioBotao.length; i++) {
        if (radioBotao[i].checked) {
            isSelected = true;
            difi = radioBotao[i].value;
            break;
        }
    }
    if (isSelected) {
        alert("Confirmado com Sucesso!");
        if (difi == 'Fácil') {
            window.location.replace("tela_lvlFacil.html");
        } else if (difi == "Médio") {
            window.location.replace("tela_lvlMedio.html");
        } else if (difi == "Difícil") {
            window.location.replace("tela_lvlDificil.html");
        } else if (difi == "Insano") {
            window.location.replace("tela_lvlInsano.html");
        }
    } else {
        alert("Selecione alguma dificuldade!");
    }
    checkFields()
    toggleButton()
}

// para verificar e permitir depois que preenchido
function toggleButton() {
    const dificuldade = document.querySelectorAll('#tela_lvlFacil', '#tela_lvlMedio', '#tela_lvlDificil', '#tela_lvlInsano').value;
    // const nickname = document.querySelector('#nickname').value;

    if (dificuldade) {
        document.querySelector('#botao_avancar').disabled = false;
        return
    }
    document.querySelector('#botao_avancar').disabled = true;
}
