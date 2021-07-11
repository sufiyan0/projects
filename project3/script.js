const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

function toggleViddeoStatus(){
    if(video.paused){
        video.play();
    }else{
            video.pause();
    }
}

function updatePlayIcoon(){
    if(video.paused){
        play.innerHTML = '<i class="fas fa-play fa-2x"></i>'
    }
    else{
        play.innerHTML = '<i class="fas fa-pause fa-2x"></i>'
    }
}

// function  updateProgress(){
//     // progress.value = (video.currentTime / video.duration) * 100;
//     progress.value = (video.currentTime / video.duration) * 100;
// }

function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;

    // Set the time for timestamp
    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10) {
        mins = '0' + String(mins);
    }

    let secs = Math.floor(video.currentTime % 60);
    if(secs < 10) {
        secs = '0' + String(secs);
    }

    timestamp.innerHTML = `${mins}:${secs}`;
}

function stopVideo(){
    video.currentTime = 0;
    video.pause(); 
}

// function setVideoProgress(){
//     return true;
// }


// Create function to update the video progress using the slider
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
}



video.addEventListener('click', toggleViddeoStatus);
video.addEventListener('pause', updatePlayIcoon);
video.addEventListener('play', updatePlayIcoon);
video.addEventListener('timeupdate', updateProgress);

// play.addEventListener('click', toggleViddeoStatus);

play.addEventListener('click', toggleViddeoStatus)


stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);





