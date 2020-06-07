// SOCKET IO INIT
var socket = io();

socket.on('connect', function () {
    console.log('Conectado al servidor');
});

socket.on('voted', function (msj) {
    console.log(msj);
    renderizarGames();
});

// VAR / SELECTORS
const divGames = document.getElementById('divGames');

// EVENTSLISTENER


// CALL FUNCTIONS
renderizarGames();

// FUNCTION
async function renderizarGames() {
    try {
        let data = await fetch('/games');
        let games = await data.json();
        if (games.ok) {
            games.games.map(async (game) => {
                let votes = await getGameVotes(game._id);
                let html = '';
                let div = document.createElement('div');
                div.classList.add('divCard');
                div.classList.add('col-sm-2');
                html += `<div id="divCardImg">`;
                html += `<img src="img/games/${game.imagen}" alt="" style="max-width: 100%; max-height: 100%;">`;
                html += `</div>`;
                html += `<div id="divCardContent">`;
                // html += `<span id="titleGame">${game.nombre}</span><br>`;
                html += `<span id="titleDescripcion">${game.nombre}</span><br><br>`;
                html += `<div id="divVotos" class="text-center">`;
                html += `<span id="sVotosTitle">Votos</span><br>`;
                html += `<span id="sVotos">${votes}</span><br>`;
                html += `</div>`;
                // html += `<p>${game.descripcion}</p>`;
                // html += `<button class="form-control btn btn-primary" idGames="${game._id}" onclick="votar(this)">VOTAR</button>`;
                html += `</div>`;
                div.innerHTML = html;
                divGames.appendChild(div);
            });
        }
    } catch (e) {
        console.log('Error Trying to get all games', e);
    }
}

async function getGameVotes(id) {
    try {
        let data = await fetch(`/gameVotes?id=${id}`);
        let gameVote = await data.json();
        if (gameVote.ok) {
            return gameVote.gameVotes.count
        } else {
            return 0;
        }
    } catch (e) {
        console.log('Error Trying ro get game votes');
    }
}