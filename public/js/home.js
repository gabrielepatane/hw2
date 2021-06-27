const overlay = document.getElementById("overlay");
overlay.classList.add("hidden");
overlay.addEventListener('click', closeModal);
const chordGrades = ['i', 'I','ii', 'II', 'ii°','iii', 'III', 'iv', 'IV', 'v', 'V', 'vi', 'VI', 'vii', 'VII', 'vii°'];
const keys = ['C', 'C#','D', 'D#', 'E','F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
let prog = "";
let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

function closeModal(event){
  event.currentTarget.classList.add("hidden");
  const card = document.querySelector('.selected');
  const modContainers = card.querySelectorAll('.modContainer');
  const progForms = card.querySelectorAll('.progForm');
  card.classList.remove("selected");
  card.classList.add("track");
  
  card.querySelector('.trackInfo').classList.remove('row');
  card.querySelector('.infoContainer').classList.remove('infoSelected');
  card.querySelector('.info').children[1].classList.remove('showArtist');
  card.querySelector('.trackFeatures').classList.add('hidden');
  card.children[0].children[0].classList.remove("img-selected");
  card.children[0].children[1].children[0].children[0].classList.remove("showTitle");
  if(progForms){
    for(let i=0; i<progForms.length; i++){
      progForms[i].remove();
      progForms[i].children[1].classList.remove('hidden');
    }
    if(card.querySelector('.addProg')){
      card.querySelector('.addProg').classList.remove('hidden');
    }
    if(modContainers){
      for(let i=0; i<modContainers.length; i++){
        modContainers[i].children[0].classList.remove('hidden');
        modContainers[i].children[1].classList.remove('hidden');
      }
    }
  }
}

function resizeSong(event){ 
const track = event.currentTarget;
if ( event.target.classList.contains('save') ) return false; //notice this line
      event = event || window.event;
      stopPropagation(event);    
  const overlay = document.getElementById("overlay");
  const title = event.currentTarget.children[0].children[1].children[0].children[0];
    contentObj.id = track.dataset.id;
    contentObj.title = track.dataset.title;
    contentObj.artist = track.dataset.artist;
    contentObj.duration = track.dataset.duration;
    contentObj.popularity = track.dataset.popularity;
    contentObj.image = track.dataset.image;
    overlay.classList.remove("hidden");
    title.classList.add("showTitle");
    event.currentTarget.classList.remove("track");
    event.currentTarget.classList.add("selected");
    event.currentTarget.querySelector('.trackInfo').classList.add("row");
    event.currentTarget.querySelector('.info').children[1].classList.add("showArtist");
    event.currentTarget.querySelector('.trackFeatures').classList.remove("hidden");
    event.currentTarget.querySelector('img').classList.add("img-selected"); 
    event.currentTarget.querySelector('.infoContainer').classList.add("infoSelected");
}

function stopPropagation(event) {
  if (typeof event.stopPropagation == "function") {
      event.stopPropagation();
  } else {
      event.cancelBubble = true;
  }
}

let contentObj = {}; 

function addProgression(event){
  const progBtn = event.currentTarget;
  const container = progBtn.parentNode;
  progBtn.classList.add('hidden');
  const chordsLabel = document.createElement('p');
  chordsLabel.innerHTML="Numero Accordi"
  const chords = document.createElement('select');
  chords.setAttribute("id", "chords");
  chords.setAttribute("name", "chords");
  chords.classList.add("chordsInput");
  for(let i = 1; i<7; i++){
    const chordsOption = document.createElement('option');
    chordsOption.setAttribute("value", i);
    chordsOption.innerHTML=i;
    chords.appendChild(chordsOption);
  } 
  const chordProg = document.createElement('select');
  chordProg.setAttribute("id", "chordProg");
  chordProg.setAttribute("name", "chordProg");
  chordProg.classList.add("chordsInput");
  for(let i = 0; i<chordGrades.length; i++){
    const chordProgOption = document.createElement('option');
    chordProgOption.setAttribute("value", chordGrades[i]);
    chordProgOption.innerHTML=chordGrades[i];
    chordProg.appendChild(chordProgOption);
  } 
  const inputContainer = document.createElement('div');
  inputContainer.classList.add('inputContainer');
  inputContainer.appendChild(chordProg);
  chords.addEventListener('change', chordsInputs);
  const progForm = document.createElement('form');
  progForm.classList.add("progForm");
  if(progBtn.classList.contains('modify')){
    progForm.classList.add('modifyForm');
  }
  progForm.appendChild(chordsLabel);
  progForm.appendChild(chords);
  progForm.appendChild(inputContainer);
  const submitContainer = document.createElement('div');
  submitContainer.classList.add('submitContainer');
  if(progBtn.classList.contains('modify')){
    container.children[0].classList.add('hidden');
    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.innerHTML = "Elimina";
    deleteBtn.addEventListener('click', deleteProg);
    submitContainer.appendChild(deleteBtn);
  }
  const submitProg = document.createElement('input');
  submitProg.value='Salva';
  submitProg.setAttribute("type", "submit");
  submitProg.classList.add("saveProg");
  submitContainer.appendChild(submitProg);
  progForm.addEventListener('submit', saveProg);
  progForm.appendChild(submitContainer);
  container.appendChild(progForm);
}

function chordsInputs(event){
  const form = event.currentTarget.parentNode;
  inputContainer = form.children[2];
  inputContainer.innerHTML='';
  for(i=0;i<event.currentTarget.value;i++){
    if(i>0){
      const separator = document.createElement('div');
      separator.classList.add('chordSeparator');
      separator.innerHTML='-';
      inputContainer.appendChild(separator);
    }
    const chordProg = document.createElement('select');
    chordProg.setAttribute("id", "chordProg"+i);
    chordProg.setAttribute("name", "chordProg"+i);
    chordProg.classList.add("chordsInput");
    for(let i = 0; i<chordGrades.length; i++){
      const chordProgOption = document.createElement('option');
      chordProgOption.setAttribute("value", chordGrades[i]);
      chordProgOption.innerHTML=chordGrades[i];
      chordProg.appendChild(chordProgOption);
    } 
    inputContainer.appendChild(chordProg);
  }
}

function saveProg(event){
    event.preventDefault();
    if(!event.currentTarget.classList.contains('modifyForm')){
      event.currentTarget.parentNode.querySelector('.addProg').remove();
    }
    prog = "";
    const form = document.querySelector(".progForm");
    const formData = new FormData(form);
    const track = document.querySelector('.selected');
    const modContainer = event.currentTarget.parentNode;
    contentObj.id = track.dataset.id;
    const chords = event.currentTarget.children[1];
    const inputs = event.currentTarget.children[2].querySelectorAll('.chordsInput');
    for(i=0;i<chords.value;i++){
      if(i<1){
        prog += inputs[i].value;
      }else{
        prog += "-"+inputs[i].value;
      }
    }
    formData.append('id', contentObj.id);
    formData.append('prog', prog);
    formData.append('chords', chords.value);
    if(form.classList.contains('modifyForm')){
      formData.append('old_progid', form.parentNode.dataset.id);
      modContainer.classList.add('new');
      modContainer.children[0].children[1].innerHTML = prog;
      fetch("./update-prog", {headers: {"X-CSRF-TOKEN": token}, method: 'post', body: formData}).then(fetchResponse).then(fetchUpdateProgJson);
      modContainer.children[0].classList.remove('hidden');
      modContainer.children[1].classList.remove('hidden');
    }else{
      const newModContainer = document.createElement('div');
      newModContainer.classList.add('modContainer');
      newModContainer.classList.add('new');
      const modifyBtn = document.createElement('div');
      modifyBtn.classList.add("modify");
      modifyBtn.innerHTML = 'Modifica';
      modifyBtn.addEventListener('click', addProgression);
      track.querySelector('.progContainer').appendChild(newModContainer);
      const progDiv = document.createElement('div');
      progDiv.classList.add('progDiv');
      const progLabel = document.createElement('p');
      progLabel.innerHTML = 'Progressione';
      const newProg = document.createElement('span');
      newProg.innerHTML = prog;
      const addProg = document.createElement('div');
      addProg.classList.add("addProg");
      addProg.innerHTML="Aggiungi Progressione";
      addProg.addEventListener('click', addProgression);
      progDiv.appendChild(progLabel);
      progDiv.appendChild(newProg);
      newModContainer.appendChild(progDiv);
      newModContainer.appendChild(modifyBtn);
      track.querySelector('.progContainer').appendChild(addProg);
      fetch("./save-prog", {headers: {"X-CSRF-TOKEN": token}, method: 'post', body: formData}).then(fetchResponse).then(fetchUpdateProgJson);
    }
    event.currentTarget.remove();
}

function deleteProg(event) {
  const songid = document.querySelector('.selected').dataset.id;
  const modContainer = event.currentTarget.parentNode.parentNode.parentNode;
  const progid = modContainer.dataset.id;
  const formData = new FormData();
  formData.append('songid', songid);
  formData.append('progid', progid);
  fetch("./delete-prog", {headers: {"X-CSRF-TOKEN": token}, method: 'post', body: formData}).then(dispatchResponse, dispatchError);
  modContainer.remove();
}

function noResults() {
  // Definisce il comportamento nel caso in cui non ci siano contenuti da mostrare
  const container = document.getElementById('results');
  container.innerHTML = '';
  const nores = document.createElement('div');
  nores.className = "loading";
  nores.textContent = "Nessun risultato.";
  container.appendChild(nores);
}

function saveSong(event){
  const track = event.currentTarget.parentNode;
  contentObj.id = track.dataset.id;
  contentObj.title = track.dataset.title;
  contentObj.artist = track.dataset.artist;
  contentObj.duration = track.dataset.duration;
  contentObj.popularity = track.dataset.popularity;
  contentObj.image = track.dataset.image;
  contentObj.release_date = track.dataset.release_date;
  contentObj.key = track.querySelector('#featureRow2').children[1].children[1].innerHTML;
  contentObj.energy = track.dataset.energy;
  contentObj.tempo = track.dataset.tempo;
  const formData = new FormData(document.querySelector(".saveForm"));
  if(track.children[1].classList.contains("savedForm")){
    track.children[1].classList.remove("savedForm");
    track.children[1].children[0].classList.remove("saved");
    formData.append('id', contentObj.id);
    fetch("./delete-song", {headers: {"X-CSRF-TOKEN": token}, method: 'post', body: formData}).then(dispatchResponse, dispatchError);
  }
  else{
    track.children[1].classList.add("savedForm");
    track.children[1].children[0].classList.add("saved");
    event.stopPropagation();
    // Preparo i dati da mandare al server e invio la richiesta con POST
    formData.append('id', contentObj.id);
    formData.append('title', contentObj.title);
    formData.append('artist', contentObj.artist);
    formData.append('duration', contentObj.duration);
    formData.append('popularity', contentObj.popularity);
    formData.append('image', contentObj.image);
    formData.append('release_date', contentObj.release_date);
    formData.append('key', contentObj.key);
    formData.append('energy', contentObj.energy);
    formData.append('tempo', contentObj.tempo);
    fetch("./save-song", {headers: {"X-CSRF-TOKEN": token}, method: 'post', body: formData}).then(dispatchResponse, dispatchError);
  }
  event.preventDefault();
}

function dispatchResponse(response) {

  console.log(response);
  return response.json().then(databaseResponse); 
}

function dispatchError(error) { 
  console.log("Errore");
}

function databaseResponse(json) {
  if (!json.ok) {
      dispatchError();
      return null;
  }
}

function fetchUserSongs(){
  fetch("./user-songs").then(fetchResponse).then(fetchUserSongsJson);
}

function fetchResponse(response) {
  console.log(response);
  if (!response.ok) {return null};
  return response.json();
}

function fetchUserSongsJson(json){
  const songs = document.querySelectorAll('.track');
  for (song of songs){
    for (let track in json) {
      if(song.dataset.id == json[track].songid){
        song.children[1].classList.add("savedForm");
        song.children[1].children[0].classList.add("saved");
      }    
    }
  }
}

function fetchProgressions(){
  fetch("./get-progressions").then(fetchResponse).then(fetchProgressionsJson);
}

function fetchProgressionsJson(json){
  const songs = document.querySelectorAll('.track');
  for (song of songs){
    for (let track in json) {
      if(song.dataset.id == json[track].song){
        const modContainer = document.createElement('div');
        modContainer.classList.add('modContainer');
        const modifyBtn = document.createElement('div');
        modifyBtn.classList.add("modify");
        modifyBtn.innerHTML = 'Modifica';
        modifyBtn.addEventListener('click', addProgression);
        console.log('fetch Progressions')
        song.querySelector('.progContainer').appendChild(modContainer);
        const progDiv = document.createElement('div');
        modContainer.dataset.id = json[track].id;
        progDiv.classList.add('progDiv');
        const progLabel = document.createElement('p');
        progLabel.innerHTML = 'Progressione';
        const prog = document.createElement('span');
        prog.innerHTML = json[track].prog;
        progDiv.appendChild(progLabel);
        progDiv.appendChild(prog);
        modContainer.appendChild(progDiv);
        if(song.children[1].classList.contains("savedForm")){
          modContainer.appendChild(modifyBtn);
        }
      }    
    }
    if(song.children[1].classList.contains("savedForm")){
      const addProg = document.createElement('div');
      addProg.classList.add("addProg");
      addProg.innerHTML="Aggiungi Progressione";
      addProg.addEventListener('click', addProgression);
      song.querySelector('.progContainer').appendChild(addProg);
    }
  }
  loader.classList.add('hidden');
  overlay.classList.add("hidden");
  overlay.addEventListener('click', closeModal);
}

function fetchUpdateProgJson(json){
  console.log(json);
  const modContainer = document.querySelector('.new');
  modContainer.dataset.id = json.id;
  modContainer.classList.remove('new');
}

function fetchTrackFeatures(json){
  const songs = document.querySelectorAll('.track');
  for (song of songs){
    const trackFeatures = song.querySelector('.trackFeatures');
      if(song.dataset.id == json.id){
          song.dataset.key = json.key;
          song.dataset.energy = json.energy;
          song.dataset.tempo = json.tempo;
          const keyContainer = trackFeatures.children[2].children[1];
          const key = keyContainer.children[1];
          key.innerHTML = keys[json.key];
          if(json.mode == 0){
              key.innerHTML += 'm';
          }
          const energy = trackFeatures.children[1].children[0].children[1];
          energy.innerHTML = Math.floor((json.energy)*100);
          const tempo = trackFeatures.children[1].children[1].children[1];
          tempo.innerHTML = Math.floor(json.tempo)+' BPM';
          
      }        
  }
}
