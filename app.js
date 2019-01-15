var flashQuestions = [
    {
		question: "Who was Savitar trying to kill in Season 3?",
		answers: [
            'Joe',
            'HR',
            'Iris'
        ],
		correctAnswer: 'Iris'
	},
	{
		question: "What was Zoom's mission in Season 2?",
		answers: [
            'Beat The Flash in a race',
            'To become the fastest man alive!',
            'To kill The Flash'
        ],
		correctAnswer: 'To become the fastest man alive!'
    },
    {
		question: "Who is The Flash?",
		answers: [
            'Iris West',
			'Eddie Thawne',
			'Barry Allen'
        ],
		correctAnswer: 'Barry Allen'
    },
    {
		question: "What important plot twist occured in the episode 'Enter Zoom' in Season 2?",
		answers: [
			'Barry beats Zoom in a race',
			"Barry's father dies",
			"Zoom breaks Barry's back"
        ],
		correctAnswer: "Zoom breaks Barry's back"
    },
    {
		question: "What happens in the Season 2 finale?",
		answers: [
            'Barry goes back in time to save his mother',
			"Iris moves out of Joe's house",
			'Wally dies'
        ],
		correctAnswer: 'Barry goes back in time to save his mother'
    },
    {
		question: "Is Eobard Thawne ever erased completely out of existence?",
		answers: [
            'Yes, he is.', 
            "Nope! He's still out there.",
            'I dunno . . . '
        ],
		correctAnswer: "Nope! He's still out there."
    },
    {
		question: "Who is the villian in Season 4?",
		answers: [
            'DeVoe',
			'Zoom',
			'Reverse Flash'
        ],
		correctAnswer: 'DeVoe'
    },
    {
		question: "What family member reveals herself at the end of Season 4?",
		answers: [
            "Caitlin's mother",
			"Cisco's second cousin",
			"Barry's daughter"
        ],
		correctAnswer: "Barry's daughter"
    },
    {
		question: "What series did The Flash cross-over with in Season 5?",
		answers: [
            "Arrow",
			"Supergirl",
			"Both"
        ],
		correctAnswer: "Both"
    },
    {
		question: "Who is The Flash's ultimate enemy?",
		answers: [
            "Reverse Flash",
			"Arrow",
			"Savitar"
        ],
		correctAnswer: "Reverse Flash"
	}
];

var flashQuiz = document.getElementById("flashQuiz");
var start = document.getElementById("start");
var next = document.getElementById('next');
next.style.visibility = "hidden";
var prev = document.getElementById('prev');
prev.style.visibility = "hidden";
var restart = document.getElementById("restart");
restart.style.visibility = "hidden";

var numCompleted = 0;
var userAnswers = []; 

function startQuiz(){
    generateQuiz(flashQuestions, flashQuiz);
}
start.addEventListener('click', startQuiz);

    
function restartQuiz(){
    window.location.href = window.location.href;
}
restart.addEventListener('click', restartQuiz);

function changePic(){
    var flashPic = document.createElement("img");
    flashPic.id = "flashPic";
    flashPic.src = "https://lh3.googleusercontent.com/qFjpZLdTg9et1yuRYmXefigV1RQbe5z7oriEJK0rpL55N9Bf_Zi78yTAqO74mkHJM3UJcplwS3DLbEVN3xue5DChnDOSOXk7FpJNtu-o0PIPmoSOcXJf6ZK45tCiPwzZcMBGR3wZ-yJxvAfW8U5L3glfTiYIjcF2J4DDNzpiEbwOKUx9QF7uohoYodHBybmMoXmhw-FzOvnXt5L2OK_A1sOQZKUZ0r_MqMHkfHnwYYrDZS21E2KvG7B_QDzxxzgwDDr5KM17GfuNHdlynsmYaU0Dvdbe1pxiwaU-DlhX-Hb3vjr42lR5eJ863Spe8YQ8hoOt-yvu3hv5BQabjK4Ecb1OU2P_5T6FEWMih7dDM9CgeIUWPqNgdzIyTQxKFUWWs0tjugy-JSp414Z89ja-r02Cp869t4lpQEZ61cLt_0vG8uM787msJQYO-swNc-C3Uj0J8sOcx0lg5bsbJV3Q6jCmUS3CxDjFX8Lf7AAfC15sBMGy3uZUJVWfJtaqLjAFkRq9AEGh16H0nsOlyhHaQA1gku_ZUJSX96JZGOSN4QEhSp9HiuPtQ2fTLMTGDpsInYt86pKRWyV7OikJOf1EGDftUAz0ele7dBjkrLidNSiBa21nd6tKqrN--bY7seNfBNQed01gmHydg2Y_Uwxh1wVcfPOOxoddBRly4g23jvMg3XAHBji0VyGIvfrnWla96VV3a9n3dOmT-wTFaw=w950-h534-no";
  
    var current = document.getElementById("intro");
    var parentDiv = current.parentNode;

    parentDiv.replaceChild(flashPic, current);
}
start.addEventListener('click', changePic);

//generates quiz 
function generateQuiz(questions, quiz){

    //returns a single question with question and answers
    function createQuestion(num){
        //question div
        var qElement = document.createElement('div');
        qElement.classList.add("question");
        //number of question
        var header = document.createElement('h2'); 
        header.innerHTML = 'Question ' + (num + 1);
        qElement.appendChild(header);
        //actual question
        var question = document.createElement('h3');
        question.innerHTML = questions[num].question;
        qElement.appendChild(question);
        //answer choices
        var choices = showAnswers(questions, quiz, num);
        qElement.appendChild(choices);
        
        return qElement;
    }

    function displayNext(questions, quiz) {
        
        quiz.setAttribute('id', 'flashQuiz');                
        
        quiz.innerHTML = "";
      
        restart.style.visibility = "visible";
  
        if(numCompleted >= 1){
          prev.style.visibility = "visible";
         }else if(numCompleted === 0){
          prev.style.visibility = "hidden";
          next.style.visibility = "visible";
         }

        if(numCompleted < questions.length){
            var nextQuestion = createQuestion(numCompleted);
            quiz.appendChild(nextQuestion);
            return nextQuestion;
            
    
        }else{
            var score = calculateScore(questions, quiz);
            quiz.appendChild(score);
            next.style.visibility = "hidden";
            prev.style.visibility = "hidden";
            restart.style.visibility = "visible";
        }
    }

    //displays the possible answers for the current question
    function showAnswers(questions, quiz, num){
    
        var answerContainer = document.createElement('div');
        answerContainer.setAttribute('id', 'choices');

        for (var i = 0; i < questions[num].answers.length; i++) {
            var value = questions[num].answers[i];
            var item = '<input type="radio" id="answer" name="answer" value="' + value + '"/>' + value;
            answerContainer.innerHTML += item;
        }

        return answerContainer;
    }

    function getUserAnswer(){
        var checkedValue = document.querySelector('input[name="answer"]:checked').value;
        userAnswers[numCompleted] = checkedValue;
    }
    
    //calculates final score based on user's answers
    function calculateScore(questions, quiz){
      
        var numCorrect = 0;
        var finalScore = document.createElement('p')
        finalScore.setAttribute('id', 'score');

        //compare users answers to the correct answer
        for (var k = 0; k < userAnswers.length; k++) {
            if (userAnswers[k] == questions[k].correctAnswer) {
                 numCorrect += 1;
            }
        }

        var percent = numCorrect*10;
        finalScore.innerHTML = "You got " + percent + "% correct";
        var verdict = document.createElement('p');
        if (numCorrect <= 3){
            verdict.innerHTML = "Uh no. Rewatch the series. Retake the quiz."
        } else if (numCorrect <= 6){
            verdict.innerHTML = "Good enough, I guess."
        } else if (numCorrect == 10){
            verdict.innerHTML = "Super sonic punch baby! - Cisco"
        } else {
            verdict.innerHTML = "Pretty good! This quiz deems you an honorary speedster."
        }

        finalScore.appendChild(verdict);

        //show correct answers

        return finalScore;
    }

    displayNext(questions, quiz);

    function goForward(){
        getUserAnswer();
        numCompleted++;       
        displayNext(questions, quiz);
    }
    next.addEventListener("click", goForward);
    
    function goBack(){
        numCompleted--;
        displayNext(questions, quiz);
    }
    prev.addEventListener("click", goBack);

}
