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
var highscoresEl = document.querySelector(".highscores");

var currentQuestion = 0;

var secondsLeft = 90;

var correctEl=0;
var incorrectEl = 0;
var scoreEl = 0;

//start timer
startEl.addEventListener("click", function(){

    var timerInterval = setInterval(function (){
        secondsLeft--;
        // timeEl.innerHTML = secondsLeft;
        document.getElementById("timer").innerHTML = secondsLeft;
        if(secondsLeft <= 0){
            alert(`Your time is up. Here is your score ${(correctEl/11)*100} % `);
            clearInterval(timerInterval);
        }

    }, 1000);
    startEl.setAttribute("style", "display:none");
    getQuestion();
});

//post a question
function getQuestion(){
    var q = bank[currentQuestion];
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
function choice(event){
    if(event.target.id == bank[currentQuestion].correctAnswer){
        correctEl++;
        currentQuestion++;
        resultEl.innerHTML = "Correct";
        console.log("correctEl",correctEl)
        getQuestion();
        
    }else if(event.target.id !== bank[currentQuestion].correctAnswer){
        secondsLeft-=10;
        incorrectEl++;
        resultEl.innerHTML = "Wrong";
        currentQuestion++;
        console.log("IncorrectEl",incorrectEl)
        getQuestion();
    }else if(currentQuestion > bank.length){
        alert(`Game over. Here is your score ${(correctEl/11)*100} % `);
    }
        
};
    
  
