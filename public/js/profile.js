document.querySelector("#searchSongs").addEventListener("keyup", search);

function search(event){
  var  input, filter, tracksContainer, tracks, artist, title, i, txtValue;
  input = event.currentTarget;
  filter = input.value.toUpperCase();
  tracksContainer = document.getElementById("results");
  tracks = tracksContainer.querySelectorAll('.track');

  for (i = 0; i < tracks.length; i++) {
    title = tracks[i].querySelector(".info").children[0];
    artist = tracks[i].querySelector('.info').children[1];
    txtValue1 = artist.innerHTML;
    txtValue2 = title.innerHTML;
    if (txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
      tracks[i].style.display = "flex";
    } else {
      tracks[i].style.display = "none";
    }
  }
}

function fetchSongs() {
    fetch("./user-songs").then(fetchResponse).then(fetchSongsJson);
}


function fetchResponse(response) {
    if (!response.ok) {return null};
    return response.json();
}

function fetchSongsJson(json) {
  if (!json.length) {noResults(); return;}
  const loader = document.getElementById('loader');
  loader.classList.remove('hidden');
  overlay.removeEventListener('click', closeModal);
  overlay.classList.remove("hidden");
  const container = document.getElementById('results');
  container.innerHTML = '';
  container.className = 'spotify';
  for (let track in json) {
      const card = document.createElement('div');
      card.dataset.id = json[track].songid;
      card.classList.add('track');
      const trackInfo = document.createElement('div');
      trackInfo.classList.add('trackInfo');
      card.appendChild(trackInfo);
      const img = document.createElement('img');
      img.src = json[track].content.image;
      trackInfo.appendChild(img);
      const infoContainer = document.createElement('div');
      infoContainer.classList.add("infoContainer");
      trackInfo.appendChild(infoContainer);
      const info = document.createElement('div');
      info.classList.add("info");
      infoContainer.appendChild(info);
      const name = document.createElement('strong');
      name.innerHTML = json[track].content.title;
      info.appendChild(name);
      const artist = document.createElement('a');
      artist.innerHTML = json[track].content.artist;
      info.appendChild(artist);
      const saveForm = document.createElement('form');
      saveForm.classList.add("saveForm");
      saveForm.classList.add("savedForm");
      card.appendChild(saveForm);
      const save = document.createElement('input');
      save.value='';
      save.setAttribute("type", "submit");
      save.classList.add("save");
      save.classList.add("saved");
      saveForm.appendChild(save);
      saveForm.addEventListener('submit', deleteSong);
      const trackFeatures = document.createElement('div');
      trackFeatures.classList.add('trackFeatures');
      trackFeatures.classList.add('hidden');
      const dateContainer = document.createElement('div');
      dateContainer.classList.add('rowInfo1');
      const dateLabel = document.createElement('p');
      dateLabel.innerHTML = 'Data di pubblicazione';
      const date = document.createElement('span');
      date.innerHTML = json[track].content.release_date;
      dateContainer.appendChild(dateLabel);
      dateContainer.appendChild(date);
      //CONVERSIONE DURATA BRANI DA MS A MIN
      const durationContainer = document.createElement('div');
      const durationLabel = document.createElement('p');
      durationLabel.innerHTML = 'Durata';
      const duration = document.createElement('span');
      const durationMs = json[track].content.duration;
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
      keyContainer.classList.add('keyContainer');
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
      fetch("./track-features/"+encodeURIComponent(card.dataset.id)).then(fetchResponse).then(fetchTrackFeatures);
    }
  const tracks = document.querySelectorAll(".track")
  for (track of tracks){     
    track.addEventListener('click', resizeSong);
  }
  fetchProgressions();
}

function noResults() {
    // Definisce il comportamento nel caso in cui non ci siano contenuti da mostrare
    const container = document.getElementById('results');
    container.innerHTML = '';
    const nores = document.createElement('div');
    nores.className = "nores";
    nores.textContent = "Nessun risultato.";
    container.appendChild(nores);
  }

async function deleteSong(event){
  const track = event.currentTarget.parentNode;
  contentObj.id = track.dataset.id;
  const formData = new FormData(document.querySelector(".saveForm"));
  track.children[1].classList.remove("savedForm");
  track.children[1].children[0].classList.remove("saved");
  formData.append('id', contentObj.id);
  await fetch("./delete-song", {headers: {"X-CSRF-TOKEN": token}, method: 'post', body: formData}).then(dispatchResponse, dispatchError);
  fetchSongs();
  event.preventDefault();
}

function fetchStats(){
  fetch("./profile-stats").then(fetchResponse).then(fetchStatsJson);
}

function fetchStatsJson(json){
  const progStat = document.querySelector('.progStat');
  const favProg = document.createElement('span');
  favProg.innerHTML = json.fav_prog;
  progStat.appendChild(favProg);
  const keyStat = document.querySelector('.keyStat');
  const favKey = document.createElement('span');
  favKey.innerHTML = json.fav_key;
  keyStat.appendChild(favKey);
  const energyStat = document.querySelector('.energyStat');
  const avgEnergy = document.createElement('span');
  avgEnergy.innerHTML = Math.floor((json.avg_energy)*100);
  energyStat.appendChild(avgEnergy);
  const tempoStat = document.querySelector('.tempoStat');
  const avgTempo = document.createElement('span');
  avgTempo.innerHTML = Math.floor(json.avg_tempo)+' BPM';
  tempoStat.appendChild(avgTempo);
  const numSongsDiv = document.querySelector('.numSongs');
  const numSongs = document.createElement('span');
  numSongs.innerHTML = json.num_songs;
  numSongsDiv.appendChild(numSongs);
}

fetchSongs();
fetchStats();