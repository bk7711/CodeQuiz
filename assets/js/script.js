var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices")
var choiceEl = document.querySelector(".choice");
var choiceA = document.querySelector("#a");
var choiceB = document.querySelector("#b");
var choiceC = document.querySelector("#c");
var choiceD = document.querySelector("#d");
var startEl = document.querySelector("#start");
var quizEl = document.querySelector("#quiz");
var correctEl = document.querySelector("#correct");
var incorrectEl = document.querySelector("#incorrect");
var scoreEl = document.querySelector("#score");
var resultEl = document.querySelector("#result");
var displayHighScoresEl = document.querySelector(".displayHighScores");
var highscoresEl = document.querySelector(".highscores");
var highScores = []


var currentQuestion = 0;
var secondsLeft = 90;

var correctEl=0;
var incorrectEl = 0;
var scoreEl = 0;

//start timer
startEl.addEventListener("click", function(){
    saveHighScore();
    var timerInterval = setInterval(function (){
        secondsLeft--;
        // timeEl.innerHTML = secondsLeft;
        document.getElementById("timer").innerHTML = secondsLeft;
        if(secondsLeft <= 0 || currentQuestion === bank.length){
            storeScore();
            clearInterval(timerInterval);
        }

    }, 1000);
    startEl.setAttribute("style", "display:none");
    getQuestion();
});

//post a question
function getQuestion(){
    var q = bank[currentQuestion];
    resultEl.innerHTML = " ";
    
    if(currentQuestion < bank.length){
    questionsEl.innerHTML = "<p>" + q.question + "<p>";
    choiceA.innerHTML = q.answers.a;
    choiceA.addEventListener("click",choice);
    choiceB.innerHTML = q.answers.b;
    choiceB.addEventListener("click", choice);
    choiceC.innerHTML = q.answers.c;
    choiceC.addEventListener("click", choice);
    choiceD.innerHTML = q.answers.d;
    choiceD.addEventListener("click", choice);
    }
    // else{
    //     storeScore();
    // }     
}

function choice(event){
    if(event.target.id == bank[currentQuestion].correctAnswer){
        correctEl++;
        currentQuestion++;
        resultEl.innerHTML = "Correct";

        console.log("correctEl",correctEl)
        getQuestion();
        
    }else if(event.target.id !== bank[currentQuestion].correctAnswer){
        secondsLeft-=3;
        incorrectEl++;
        resultEl.innerHTML = "Wrong";
        currentQuestion++;
        console.log("IncorrectEl",incorrectEl)
        getQuestion();
    }
        
};
    
function endGame(){
    
    var initials = prompt(`Game over. You scored ${correctEl} points. Enter your initials.`);
    return initials;
}

function storeScore(){
    var currentScore = {};
    currentScore.player=endGame().trim();
    currentScore.points= correctEl;
    highScores.push(currentScore);
    localStorage.setItem("user", JSON.stringify(highScores));
  }
 function saveHighScore (){
     highScores = JSON.parse(localStorage.getItem('user'));
    console.log(highScores);
 }
highscoresEl.addEventListener("click",function(){
    saveHighScore();
    for(i = 0; i < highScores.length; i++){
        var player = document.createElement('li');
        player.innerHTML = highScores[i].player + " : " + highScores[i].points + " points";
        displayHighScoresEl.appendChild(player);
    }
    displayHighScoresEl.setAttribute("style", "display:block;");
});