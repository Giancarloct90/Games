// SOCKET IO INIT
var socket = io();

socket.on('connect', function () {
    console.log('Conectado al servidor');
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
            games.games.map(game => {
                let html = '';
                let div = document.createElement('div');
                div.classList.add('divCard');
                div.classList.add('col-sm-2');
                html += `<div id="divCardImg">`;
                html += `<img src="img/games/${game.imagen}" alt="" style="max-width: 100%; max-height: 100%;">`;
                html += `</div>`;
                html += `<div id="divCardContent">`;
                html += `<span id="titleGame">${game.nombre}</span><br>`;
                html += `<span id="titleDescripcion">Descripcion</span>`;
                html += `<p>${game.descripcion}</p>`;
                html += `<button class="form-control btn btn-primary" idGames="${game._id}" onclick="votar(this)">VOTAR</button>`;
                html += `</div>`;
                div.innerHTML = html;
                divGames.appendChild(div);
            });
        }
    } catch (e) {
        console.log('Error Trying to get all games', e);
    }
}

// TO VOTE
async function votar(elemt) {
    let votes = await getGameVotes(elemt.getAttribute('idGames'));
    let data = {
        votos: votes + 1
    }
    try {
        let data1 = await fetch(`/vote?id=${elemt.getAttribute('idGames')}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        });
        let gameVoted = await data1.json();
        if (gameVoted.ok) {
            socket.emit('voted', 'se voto');
            console.log('Voted!!!');
            showNotification('Votaste!!!', true);
        } else {
            console.log('Error');
        }
    } catch (e) {
        console.log('Error trying to vote', e);
    }
}

// TO GET VOTES FOR GAME
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

//
function showNotification(message, state) {
    if (state) {
        divNotify.style.display = '';
        divNotify2.classList.add('alert');
        divNotify2.classList.add('alert-success');
        divNotify2.innerHTML = `${message}`
        divNotify2.classList.add('showNotification');
        setTimeout(function () {
            divNotify2.classList.remove('showNotification');
            divNotify.style.display = 'none';
        }, 3000);
    } else {
        divNotify.style.display = '';
        divNotify2.classList.add('alert');
        divNotify2.classList.add('alert-danger');
        divNotify2.innerHTML = `${message}`
        divNotify2.classList.add('showNotification');
        setTimeout(function () {
            divNotify2.classList.remove('showNotification');
            divNotify.style.display = 'none';
        }, 3000);
    }
}