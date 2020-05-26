// VAR/SELECTOR
const btnInsert = document.getElementById('btnInsert');
const txtNombre = document.getElementById('txtNombre');
const txtDescripcion = document.getElementById('txtDescripcion');
const customFile = document.getElementById('customFile');
const lblNotify = document.getElementById('lblNotify');
const divTableContent = document.getElementById('divTableContent');
const divImgLoading = document.getElementById('divImgLoading');

// EVENTS LISTENER
btnInsert.addEventListener('click', insertGame);

getAllGames();

// FUNCTIONS
// To Insert games into database
async function insertGame() {
    if (txtNombre.value && txtDescripcion.value && customFile.value) {
        lblNotify.style.display = 'none';
        // Usamos el formData para mandar imagenes o archivos
        let formData = new FormData();
        divTableContent.style.display = 'none';
        divImgLoading.style.display = '';
        try {
            formData.append('nombre', txtNombre.value)
            formData.append('descripcion', txtDescripcion.value)
            formData.append('image', customFile.files[0]);
            let user = await fetch('/game', {
                method: 'POST',
                body: formData,
            });
            let userSaved = await user.json();
            if (userSaved.ok) {
                setTimeout(getAllGames(), 3000);
            } else {
                throw new Error;
            }

        } catch (e) {
            console.log('Error trying inserted');
        }
    } else {
        lblNotify.style.color = 'red';
        lblNotify.innerHTML = 'Todos los campos son obligatorios!!!'
        lblNotify.style.display = '';
    }
}

// to get all games from database
async function getAllGames() {
    try {
        let games = await fetch('/games', {
            method: 'GET'
        });
        let gamesDB = await games.json();
        if (gamesDB) {
            console.log(gamesDB.games);
            renderizarGames(gamesDB.games);
        } else {

        }
    } catch (e) {
        console.log('Error trying to get all games');
    }
}

// Para renderizar todos los juegos
async function renderizarGames(games) {
    let html = '';
    html += `<table class="table table-hover">`;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th>Nombre del Juego</th>`;
    html += `<th>Descripcion</th>`;
    html += `<th colspan="2">Acciones</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    games.map(game => {
        html += `<tr>`;
        html += `<td>${game.nombre}</td>`;
        html += `<td>${game.descripcion}</td>`;
        html += `<td><a href="/updateGame?id=${game._id}" class="far fa-edit iconAction"></a></td>`;
        html += `<td><a href="/deleteGame?id=${game._id}" class="fas fa-trash-alt iconAction"></a></td>`;
        html += `</tr>`;
    });

    html += `</tbody>`;
    html += `</table>`;
    divImgLoading.style.display = 'none';
    divTableContent.style.display = '';
    divTableContent.innerHTML = html;
}