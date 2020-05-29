// EXECUTE FUNCTION

// VAR/SELECTOR
const btnInsert = document.getElementById('btnInsert');
const txtNombre = document.getElementById('txtNombre');
const txtDescripcion = document.getElementById('txtDescripcion');
const customFile = document.getElementById('customFile');
const lblNotify = document.getElementById('lblNotify');
const divTableContent = document.getElementById('divTableContent');
const divImgLoading = document.getElementById('divImgLoading');

getAllGames();

// EVENTS LISTENER
btnInsert.addEventListener('click', insertGame);

// FUNCTIONS
// To Insert games into database
async function insertGame() {
    if (txtNombre.value && txtDescripcion.value && customFile.value) {
        lblNotify.style.display = 'none';
        // Usamos el formData para mandar imagenes o archivos
        divTableContent.style.display = 'none';
        divImgLoading.style.display = '';
        let formData = new FormData();
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
                getAllGames();
                txtNombre.value = '';
                txtDescripcion.value = '';
                customFile.value = "";
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
        divTableContent.style.display = 'none';
        divImgLoading.style.display = '';
        let games = await fetch('/games', {
            method: 'GET'
        });
        let gamesDB = await games.json();
        if (gamesDB) {
            renderizarGames(gamesDB.games);
        } else {

        }
    } catch (e) {
        console.log('Error trying to get all games', e);
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
    //html += `<th colspan="3">Acciones</th>`;
    html += `<th>Acciones</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    games.map(game => {
        html += `<tr>`;
        html += `<td>${game.nombre}</td>`;
        html += `<td>${game.descripcion}</td>`;
        html += `<td><button id="btnUpdateGame" links="${game._id}" class="btn btn-success">Ver Detalle</button> <button id="btn" links="${game._id}" class="btn btn-info">Actulizar</button> <button id="btnDeleteGame" links="${game._id}" onclick="deleteGa(this)" class="btn btn-danger">Borrar</button></td>`;
        // html += `<td></td>`;
        // html += `<td></td>`;
        html += `</tr>`;
    });

    html += `</tbody>`;
    html += `</table>`;
    divImgLoading.style.display = 'none';
    divTableContent.style.display = '';
    divTableContent.innerHTML = html;
}

// para borrar un juego/game
async function deleteGa(elemt) {
    let data = {
        id: elemt.getAttribute('links')
    }
    try {
        divTableContent.style.display = 'none';
        divImgLoading.style.display = '';
        let deleteGame = await fetch('/deleteGame', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let deletegameResult = await deleteGame.json();
        if (deletegameResult.ok) {
            console.log(deletegameResult);
            getAllGames();
        } else {
            throw new Error;
        }
    } catch (e) {
        console.log('Error trying to delete game', e);
    }
}