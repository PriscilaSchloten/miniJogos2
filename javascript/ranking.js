document.addEventListener('DOMContentLoaded', () => {
    const rankingList = document.getElementById('rankingList');

    const getRanking = () => {
        return JSON.parse(localStorage.getItem('ranking')) || [];
    };

    const saveRanking = (ranking) => {
        localStorage.setItem('ranking', JSON.stringify(ranking));
    };

    const updateRankingDisplay = () => {
        const ranking = getRanking();
        rankingList.innerHTML = '';
        ranking.sort((a, b) => a.seconds - b.seconds);

        // Limite o ranking aos cinco primeiros jogadores
        const topFiveRanking = ranking.slice(0, 5);

        topFiveRanking.forEach((player, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-item');

            listItem.innerHTML = `
                <div class="list-item-header">
                    <span class="list-item-header-badge">${index + 1}º</span>
                </div>
                <div class="list-item-body">
                    <span class="list-item-title">${player.name} Dificuldade: ${player.dificu}</span>
                    <span class="list-item-subtitle">Tempo: ${player.minute}:${player.seconds}</span>
                    <div class="list-item-progress-bar">
                        <span class="progress" style="width: ${Math.max(100 - player.seconds, 0)}%;"></span>
                    </div>
                </div>
            `;

            rankingList.appendChild(listItem);
        });
    };
    
    const addPlayerToRanking = (name, minute, seconds) => {
        const ranking = getRanking();
        ranking.push({ name, minute, seconds, dificu });
        saveRanking(ranking);
        updateRankingDisplay();
    };

    // capturando tempo jogo
    const nickname = localStorage.getItem('nickname');
    const minutoss = localStorage.getItem('minutoPlayer');
    const segundoss = localStorage.getItem('segundoPlayer');
    const dificu = localStorage.getItem('dificuPlayer');
   
    const time = Math.floor(Math.random() * 100); // Substitui isso com o tempo do jogo
    const ganhou = true; // condição de vitória do jogador

    if (ganhou && nickname) {
        addPlayerToRanking(nickname, minutoss, segundoss, dificu);
    }
    // localStorage.clear();
    updateRankingDisplay();
});

