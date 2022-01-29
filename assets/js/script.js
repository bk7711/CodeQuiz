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
var scoreEl = document.querySelector("#scoreKeeper");
var resultEl = document.querySelector("#result");
var highscoresEl = document.querySelector(".highscores");
var displayHighScoresEl = document.querySelector(".displayHighScores");
var highScores = []
var currentScore = {};


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
        //stop clock if game is over or time runs out
        if(secondsLeft <= 0 || currentQuestion === bank.length){
            storeScore();
            clearInterval(timerInterval);
        }

    }, 1000);
//run the function to pull the question     
    getQuestion();
//get rid of the start button
    startEl.setAttribute("style", "display:none");
    // scoreEl.setAttribute("style", "display:block");
});

//post a question
function getQuestion(){
    var q = bank[currentQuestion];
    
    //post the answer choices and create click events for each answer as long as there are questions left

    if(currentQuestion < bank.length){
    questionsEl.innerHTML = "<p>" + q.question + "<p>";
    // resultEl.innerHTML = " ";
    choiceA.innerHTML = q.answers.a;
    choiceA.setAttribute("style", "border:3px solid blue; border-radius: 10px; background-color:rgba(231,229,229,0.863);")
    choiceA.addEventListener("click",choice);
    choiceB.innerHTML = q.answers.b;
    choiceB.setAttribute("style", "border:3px solid blue; border-radius: 10px; background-color:rgba(231,229,229,0.863);")
    choiceB.addEventListener("click", choice);
    choiceC.innerHTML = q.answers.c;
    choiceC.setAttribute("style", "border:3px solid blue; border-radius: 10px; background-color:rgba(231,229,229,0.863);")
    choiceC.addEventListener("click", choice);
    choiceD.innerHTML = q.answers.d;
    choiceD.setAttribute("style", "border:3px solid blue; border-radius: 10px; background-color:rgba(231,229,229,0.863);")
    choiceD.addEventListener("click", choice);
    }
      
}
//check the if the answer is correct or incorrect and change score if correct or incorrect
function choice(event){
    if(event.target.id == bank[currentQuestion].correctAnswer){
        correctEl++;
        //inform user of correct answer
        resultEl.innerHTML = "Correct";
        resultEl.setAttribute("style", "color:green;");
        currentQuestion++;
        

        console.log("correctEl",correctEl)
        getQuestion();
        
    }else if(event.target.id !== bank[currentQuestion].correctAnswer){
        secondsLeft-=3;
        incorrectEl++;
        //inform user of inccorrect answer
        resultEl.innerHTML = "Wrong";
        resultEl.setAttribute("style", "color:red;");
        currentQuestion++;
        console.log("IncorrectEl",incorrectEl)
        getQuestion();
        
    }
        
};
 //once time runs out or last question is answered   
function endGame(){
    var initials = prompt(`Game over. You scored ${correctEl} points. Enter your initials.`);
    return initials;
}
//grab the final score and initials and push to highScores array and local storage
function storeScore(){
    var currentScore = {};
    currentScore.player=endGame().trim();
    currentScore.points= correctEl;
    highScores.push(currentScore);
    localStorage.setItem("user", JSON.stringify(highScores));
  }
//pull saved scores from localStorage
function saveHighScore(){
     highScores = JSON.parse(localStorage.getItem('user'));
    console.log(highScores);
 }
//provide info from local storage as the highscores list
highscoresEl.addEventListener("click",function(){
    saveHighScore();
    for(i = 0; i < highScores.length; i++){
        var player = document.createElement("p");
        player.innerHTML = highScores[i].player + " : " + highScores[i].points + " points";
        displayHighScoresEl.appendChild(player);
    }
    displayHighScoresEl.setAttribute("style", "display:block;");
});