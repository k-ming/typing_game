const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.btn-start');
const GAME_TIME = 9;


let score = 0; 
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let words = [];
let checkInterval;

function init(){
    buttonChange('loading...');
    getWords()
    wordInput.addEventListener('input', checkMatch);
}

init();



//function
function checkStatus(){
    if(!isPlaying && time === 0){
        buttonChange('Game Start');
        clearInterval(checkInterval)
    }
}

//Random words
function getWords(){
    axios.get('https://random-word-api.herokuapp.com/word?number=300')
        .then(function (response) {
        // handle success
        response.data.forEach((word)=>{
            if(word.length < 10){
                words.push(word);
            }
        })
        console.log()
        buttonChange('Game Start');
    
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
}

//compare to Words
function checkMatch(){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        wordInput.value = "";
        if(!isPlaying){
            return;
        }
        score ++;
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
      
     }
}


//play Game
function run(){
   if(isPlaying){
       return;
   }
   isPlaying = true;
   time = GAME_TIME;
   wordInput.focus();
   scoreDisplay.innerText = 0;
   timeInterval =  setInterval(countDown, 1000);
   checkInterval = setInterval(checkStatus, 50);
   buttonChange('Playing...');
}


function countDown(){
//(condition ? true : false)
 time > 0 ? time-- : isPlaying = false;
 if(!isPlaying){
    clearInterval(timeInterval)
 }
 timeDisplay.innerText = time;
}

function buttonChange(text){
 button.innerText = text;
 text === 'Game Start' ? button.classList.remove('.loading') : button.classList.add('.loading');

}