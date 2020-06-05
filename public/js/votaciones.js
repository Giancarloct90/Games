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
        console.log(games);
        if (games.ok) {
            games.games.map(game => {
                let html = '';
                let div = document.createElement('div');
                div.classList.add('divCard');
                div.classList.add('col-md-2');
                html += `<div id="divCardImg">`;
                html += `<img src="img/games/${game.imagen}" alt="" style="max-width: 100%; max-height: 100%;">`;
                html += `</div>`;
                html += `<div id="divCardContent">`;
                html += `<span id="titleGame">${game.nombre}</span><br>`;
                html += `<span id="titleDescripcion">Descripcion</span>`;
                html += `<p>${game.descripcion}</p>`;
                html += `<button class="form-control btn btn-primary" idGames="${game._id}">VOTAR</button>`;
                html += `</div>`;
                div.innerHTML = html;
                divGames.appendChild(div);
            });
        }
    } catch (e) {
        console.log('Error Trying to get all games', e);
    }
}