// Import DOM Elenent
const container = document.getElementById('container');
const songTitle = document.getElementById('song-title');
const progress = document.getElementById('progress');
const audio = document.getElementById('audio');
const albumArt = document.getElementById('album-art');
const previousBtn = document.getElementById('previous');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progrsee-bar');


function addPlay() {
    container.classList.add('play')
}


// Song Array
const tracks = ['Kuch To Hay' , 'Na Tera Khuda'];


// Index of current Playing song 
let trackIndex = 1;

// Load the track
loadTrack(tracks[trackIndex]);

// function to load the selecter track
function loadTrack(track){
    // Update the text for the title of track
    songTitle.innerText = track;
    // update the sor in the audio element with the audio file
    audio.src = `audio/${track}.mp3`;
    // Update the src in the img element with image file of the selected track
    albumArt.src = `img/${track}.jpg`;
     
};

// Function to play the track
function playTrack(){
    // Add the second class 'play' to the container
    container.classList.add('play');
    // REmove the play icon and display the pause icon
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    // play the track using the pause element (builten Function)
    audio.play();

};

function pausedTrack() {
    container.classList.remove('play');
    // REmove the pause icon and display the play icon
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    // Pause the track using the pause element (builten Function)
    audio.pause();

};


// Function to switch to previous song
function prevTrack(){
    // Decrement the value of trackIndex by 1 . 
    trackIndex--;
    // Check if selected index value is less then 0
    if(trackIndex < 0){
        //REsign the track value to last track value
        trackIndex = tracks.length - 1;
    } 
    // load the selected  track 
    loadTrack(tracks[trackIndex]);
    // play the selected track
    playTrack();
};

// Function to switch to next song
function nextTrack(){
    // incerment the value of trackIndex by 1 . 
    trackIndex++;
    // Check if selected index value is less then 0
    if(trackIndex > tracks.length - 1 ){
        //REsign the track value to last track value
        trackIndex = 0;
    } 
    // load the selected  track 
    loadTrack(tracks[trackIndex]);
    // play the selected track
    playTrack();
};


// finction to update the progress bar
function updateProgress(e){
    //destructure the total time and duration
    const {duration, currentTime } = e.srcElement
    // calculate the percentage of overall played using currentTime and duration
    const progressPercent = currentTime / duration * 100;
    // reasign progress bar of progress precentage
    progressBar.style.width = `${progressPercent}%`
}

// Function to set the progress bar
function setProgress (){
    
}


// Event Listners
// 1. Listen for click on the play button
playBtn.addEventListener('click', () =>{
    // Check if track is playing
    const isPlaying = container.classList.contains('play');
    // Conditions for play and paused audio
    if(isPlaying) {
        // if playing, pause the song
        pausedTrack();
    } else{
        // if pause, play the track
        playTrack();
    }

});

// 2. Listen to click on a previousBtn
previousBtn.addEventListener('click', prevTrack);

// 3. Listen to click on a nextBtn
nextBtn.addEventListener('click',nextTrack);


audio.addEventListener('timeupdate',updateProgress);


// 5. listen on click on progress bar
progress.addEventListener('click', setProgress);
