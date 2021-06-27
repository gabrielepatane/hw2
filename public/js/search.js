document.querySelector("#search form").addEventListener("submit", search);


  function jsonSpotify(json) {
    if (!json.tracks.items.length) {noResults(); return;}
    const loader = document.getElementById('loader');
    loader.classList.remove('hidden');
    overlay.removeEventListener('click', closeModal);
    overlay.classList.remove("hidden");
    fetchUserSongs();
    const container = document.getElementById('results');
    container.innerHTML = '';
    container.className = 'spotify';
    for (let track in json.tracks.items) {
        const card = document.createElement('div');
        card.dataset.id = json.tracks.items[track].id;
        card.dataset.title = json.tracks.items[track].name;
        card.dataset.artist = json.tracks.items[track].artists[0].name;
        card.dataset.duration = json.tracks.items[track].duration_ms;
        card.dataset.popularity = json.tracks.items[track].popularity;
        card.dataset.image = json.tracks.items[track].album.images[0].url;
        card.dataset.release_date = json.tracks.items[track].album.release_date;
        card.classList.add('track');
        fetch("./track-features/"+encodeURIComponent(card.dataset.id)).then(fetchResponse).then(fetchTrackFeatures);
        const trackInfo = document.createElement('div');
        trackInfo.classList.add('trackInfo');
        card.appendChild(trackInfo);
        const img = document.createElement('img');
        img.src = json.tracks.items[track].album.images[0].url;
        trackInfo.appendChild(img);
        const infoContainer = document.createElement('div');
        infoContainer.classList.add("infoContainer");
        trackInfo.appendChild(infoContainer);
        const info = document.createElement('div');
        info.classList.add("info");
        infoContainer.appendChild(info);
        const name = document.createElement('strong');
        name.innerHTML = json.tracks.items[track].name;
        info.appendChild(name);
        const artist = document.createElement('a');
        artist.innerHTML = json.tracks.items[track].artists[0].name;
        info.appendChild(artist);
        const saveForm = document.createElement('form');
        saveForm.classList.add("saveForm");
        card.appendChild(saveForm);
        const save = document.createElement('input');
        save.value='';
        save.setAttribute("type", "submit");
        save.classList.add("save");
        saveForm.appendChild(save);
        saveForm.addEventListener('submit', saveSong);
        const trackFeatures = document.createElement('div');
        trackFeatures.classList.add('trackFeatures');
        trackFeatures.classList.add('hidden');
        const dateContainer = document.createElement('div');
        dateContainer.classList.add('rowInfo1');
        const dateLabel = document.createElement('p');
        dateLabel.innerHTML = 'Data di pubblicazione';
        const date = document.createElement('span');
        date.innerHTML = json.tracks.items[track].album.release_date;
        dateContainer.appendChild(dateLabel);
        dateContainer.appendChild(date);
        //CONVERSIONE DURATA BRANI DA MS A MIN
        const durationContainer = document.createElement('div');
        const durationLabel = document.createElement('p');
        durationLabel.innerHTML = 'Durata';
        const duration = document.createElement('span');
        const durationMs = json.tracks.items[track].duration_ms;
        const durationSec = durationMs / 1000;
        const durationMin = durationSec / 60;
        const intPart = parseInt(durationMin, 10);
        const decimalPart = durationMin - intPart;
        const decimalPartRounded =  Math.floor(decimalPart * 100) / 100;
        const trackSec = parseInt((decimalPartRounded * 60), 10);
        duration.classList.add("duration");
        duration.innerHTML = intPart+" min "+trackSec+" sec";
        durationContainer.appendChild(durationLabel);
        durationContainer.appendChild(duration);
        const featureRow1 = document.createElement('div');
        featureRow1.classList.add('featureRow');
        featureRow1.appendChild(dateContainer);
        featureRow1.appendChild(durationContainer);
        trackFeatures.appendChild(featureRow1);

        const keyContainer = document.createElement('div');
        const keyLabel = document.createElement('p');
        keyLabel.innerHTML = 'Scala';
        const key = document.createElement('span');

        const progContainer = document.createElement('div');
        progContainer.classList.add('progContainer');
        const featureRow2 = document.createElement('div');
        featureRow2.setAttribute("id", "featureRow2");
        featureRow2.classList.add('featureRow');
        featureRow2.appendChild(progContainer);

        const energyContainer = document.createElement('div');
        const energyLabel = document.createElement('p');
        energyLabel.innerHTML = 'Energia';
        const energy = document.createElement('span');

        energyContainer.classList.add('rowInfo1');
        const tempoContainer = document.createElement('div');
        const tempoLabel = document.createElement('p');
        tempoLabel.innerHTML = 'Tempo';
        const tempo = document.createElement('span');

        keyContainer.appendChild(keyLabel);
        keyContainer.appendChild(key);
        featureRow2.appendChild(keyContainer);
        energyContainer.appendChild(energyLabel);
        energyContainer.appendChild(energy);
        const featureRow3 = document.createElement('div');
        featureRow3.classList.add('featureRow');
        featureRow3.appendChild(energyContainer);
        tempoContainer.appendChild(tempoLabel);
        tempoContainer.appendChild(tempo);
        featureRow3.appendChild(tempoContainer);
        trackFeatures.appendChild(featureRow3);
        trackFeatures.appendChild(featureRow2);

        infoContainer.appendChild(trackFeatures);
        container.appendChild(card);
        }
    const tracks = document.querySelectorAll(".track")
    for (track of tracks){     
      track.addEventListener('click', resizeSong);
    }
    fetchProgressions();
}

function search(event)
{
    // Leggo il tipo e il contenuto da cercare e mando tutto alla pagina PHP
    contentObj = {};
    const form_data = new FormData(document.querySelector("#search form"));
    // Mando le specifiche della richiesta alla pagina PHP, che prepara la richiesta e la inoltra
    fetch("./home/search/"+encodeURIComponent(form_data.get('search'))).then(searchResponse).then(searchJson);

    // Mostro i risultati ottenuti
    const container = document.getElementById('results');
    container.innerHTML = '';

    // Evito che la pagina venga ricaricata
    event.preventDefault();
}

function searchResponse(response)
{
    console.log(response);
    return response.json();
}

function searchJson(json)
{
    console.log(json);

    if (json.length == 0) { noResults(); return; }
    jsonSpotify(json);
}