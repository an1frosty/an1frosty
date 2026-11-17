(() => {
const audio=document.getElementById('audio'),play=document.getElementById('play'),icon=document.getElementById('play-icon'),seek=document.getElementById('seek'),volume=document.getElementById('volume'),current=document.getElementById('current'),duration=document.getElementById('duration');let dragging=false;
const fmt=s=>Number.isFinite(s)?`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`:'0:00';
const state=on=>{play.setAttribute('aria-label',on?'Пауза':'Воспроизвести');play.title=on?'Пауза':'Воспроизвести';icon.innerHTML=on?'<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>':'<path d="m8 5 11 7-11 7z"/>';};
play.addEventListener('click',async()=>{if(audio.paused){try{await audio.play();state(true)}catch(e){state(false)}}else{audio.pause();state(false)}});
audio.addEventListener('loadedmetadata',()=>{duration.textContent=fmt(audio.duration);current.textContent=fmt(audio.currentTime)});
audio.addEventListener('timeupdate',()=>{current.textContent=fmt(audio.currentTime);if(!dragging&&audio.duration>0)seek.value=String(Math.round(audio.currentTime/audio.duration*1000))});
seek.addEventListener('input',()=>{dragging=true;if(audio.duration>0)current.textContent=fmt(Number(seek.value)/1000*audio.duration)});
seek.addEventListener('change',()=>{if(audio.duration>0)audio.currentTime=Number(seek.value)/1000*audio.duration;dragging=false});
volume.addEventListener('input',()=>audio.volume=Number(volume.value));audio.volume=Number(volume.value);
audio.addEventListener('play',()=>state(true));audio.addEventListener('pause',()=>state(false));audio.addEventListener('ended',()=>{state(false);seek.value='0';current.textContent='0:00'});
audio.addEventListener('error',()=>duration.textContent='Audio error');
})();