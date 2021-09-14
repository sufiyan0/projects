// DOM elements of all containers
const word = document.getElementById('word');
const incorrectLettors = document.getElementById('incorrect-lettors');
const popup = document.getElementById('popup-container');
const finalMassage = document.getElementById('final-massage');
const playBtn = document.getElementById('play-btn');
const notification = document.getElementById('notification-container');

// DOM elements of hangman
// const hangmanPart = document.querySelectorAll('hangman-part');
const hangman = document.querySelectorAll('.hangman-part');


// these are the words which will be used for selecting random words 
const words = ["successful","behavior","by","similar","bill","tell","ordinary","joy","sale","brother","circle","universe","map","slide","figure","dream","silence","spirit","thing","salmon","spell","liquid","greatest","southern","burst","higher","area","excitement","season","effort","examine","active","army","piano","town","fill","our","southern","advice","percent","captain","daily"]


//    const words = ['asad','number']
// select  a word at a random words array
let selectedWords = words[Math.floor (Math.random() * words.length)]


const correctLetterArray = ['a','e','i','o','u'];
const incorrectLetterArray = [];


function dispalyWord() {
    word.innerHTML = `
        ${selectedWords
            .split('')
            .map(letter => `
                <span class= "letter " >
                    ${correctLetterArray.includes(letter) ? letter : ''  }
                </span>
                `
            )
            .join('')
        }
    `; 
    // Replace new line character and form inner word    
    const innerWord = word.innerText.replace(/\n/g, '');
    

        //comare inner word to selected word.. if booth words are same then the user won!
    if(innerWord === selectedWords){
        finalMassage.innerText = 'Congratulation You won!'
        popup.style.display = 'flex'
    }

};


function showNotification(){
    // Add classs show to the notification cantainer 
    notification.classList.add('show');
    // After 2 seconds, hide it
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);

}

// function that updates IncorrectLetter.
function updateIncorrectLetter(){
    // Dosplay Incorrect letters
    incorrectLettors.innerHTML = `
        ${incorrectLetterArray.length > 0  ? '<p> Incorrect Letters</p>' : ''}
        ${incorrectLetterArray.map(letter =>`<span>${letter}</span>`)}
    `;

    //display hangman parts
    hangman.forEach((part, index) =>{
        //how many incorrect letter user enter
        const errors = incorrectLetterArray.length
        if(index < errors){
            part.style.display = 'block';

        } else {
            part.style.display = 'none'
        }
    });

    //chack if user lost
    if(incorrectLetterArray.length === hangman.length){
        finalMassage.innerText = 'Ohhh! You Lost The Game!'
        popup.style.display = 'flex'  

    }

} 







//Event Handlear
//Listen for keyboard
window.addEventListener('keydown', e => {
    //Check if key press is letter a = 65 and z = 95 
    if(e.keyCode >=65 && e.keyCode <= 95) {
        const letter = e.key;
        
        //check if the letter is in the selected words
        if (selectedWords.includes(letter)) {
            // Check if letter is already in correctLetterArray.
            if(!correctLetterArray.includes(letter)){
                //add letter into the correctLetterArray 
                correctLetterArray.push(letter);
                // Run the display  function again to display new letter.
                dispalyWord();
            }else{
                showNotification();
            }

        } else{
            if(!incorrectLetterArray.includes(letter)){
                    // Add the letter in to incorrectLetterArray.
                incorrectLetterArray.push(letter);
                    //update the incorrect letter UI
                updateIncorrectLetter();
            }else{
                showNotification();
            }
        }
    }

});

playBtn.addEventListener('click',() => {
    correctLetterArray.splice(0);
    incorrectLetterArray.splice(0);
    selectedWords = words[Math.floor (Math.random() * words.length)]
    updateIncorrectLetter();
    popup.style.display = 'none'
    dispalyWord();



})


// Function that are executing.
dispalyWord();


