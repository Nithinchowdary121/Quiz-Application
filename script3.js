const htmlQuestions = [ 
  { 
    question: "What does HTML stand for?", 
    options: ["Hyper Trainer Marking Language", "HyperText Markup Language", "Hyper Text Marketing Language", "HyperText Machine Language"], 
  answer: 1 
}, 
{ 
   question: "Which tag is used for inserting a line break?",     options: ["<break>", "<br>", "<lb>", "<line>"],     answer: 1 
  }, 
  { 
    question: "Which HTML tag is used to display an image?",     options: ["<pic>", "<image>", "<img>", "<src>"],     answer: 2 
  }, 
  { 
    question: "What attribute is used to provide alternative text for an image?",     options: ["alt", "src", "title", "href"],     answer: 0 
  }, 
  { 
    question: "Which tag is used to create a hyperlink?",     options: ["<a>", "<link>", "<href>", "<url>"],     answer: 0 
  } 
]; 
const cssQuestions = [ 
  { 
    question: "What does CSS stand for?", 
    options: ["Creative Style Sheets", "Colorful Style Sheets", "Cascading Style Sheets", 
"Computer Style Sheets"],
    answer: 2 
  }, 
  { 
    question: "Which property is used to change the background color?",     options: ["bgcolor", "backgroundColor", "color", "background"],     answer: 3 
  }, 
  { 
    question: "Which CSS property controls the text size?",     options: ["font-style", "text-size", "font-size", "text-style"],     answer: 2 
  }, 
  { 
    question: "How do you select an element with the id 'header'?",     options: ["#header", ".header", "*header", "header"],     answer: 0 
  }, 
  { 
    question: "Which property is used to center text?",     options: ["text-style", "text-align", "text-center", "font-align"],     answer: 1 
  } 
]; 
const jsQuestions = [ 
  { 
    question: "Inside which HTML element do we put JavaScript?",     options: ["<js>", "<javascript>", "<script>", "<code>"],     answer: 2 
}, 
{ 
  question: "Which keyword is used to declare a variable?",    options: ["var", "int", "let", "Both var and let"],     answer: 3 
  }, 
  { 
    question: "What does `typeof` operator return in JavaScript?", 
    options: ["data type of a variable", "value of a variable", "reference of a variable", 
"None"],     answer: 0 
  }, 
  { 
    question: "What is the correct syntax for a function in JavaScript?",     options: ["function myFunc()", "def myFunc()", "func myFunc()", "function:myFunc()"],     answer: 0 
  }, 
  { 
    question: "How do you write a comment in JavaScript?",     options: ["<!-- comment -->", "// comment", "/* comment */", "Both // and /* */"],     answer: 3 
  } 
]; 
let questions = []; let current = 0; let score = 0; let topic = ''; 
const questionEl = document.getElementById("question"); 
const optionsEl = document.getElementById("options"); const resultEl = document.getElementById("result"); const highScoreEl = document.getElementById("high-score"); const quizBox = document.getElementById("quiz-box"); document.getElementById("start-btn").addEventListener("click", () => {   topic = document.getElementById("category").value;   if (topic === "html") questions = htmlQuestions;   else if (topic === "css") questions = cssQuestions;   else if (topic === "js") questions = jsQuestions;   current = 0;   score = 0;   quizBox.style.display = "block";   const nextBtn = document.getElementById("next-btn");   nextBtn.style.display = "inline-block";   nextBtn.disabled = false;   loadQuestion(); 
}); 
function loadQuestion() {   const q = questions[current];   questionEl.textContent = q.question;   optionsEl.innerHTML = "";   resultEl.textContent = "";   highScoreEl.textContent = ""; 
  q.options.forEach((opt, idx) => {     let li = document.createElement("li");     li.textContent = opt;     li.addEventListener("click", () => checkAnswer(idx, li));     optionsEl.appendChild(li); 
}); 
}
function checkAnswer(selected, li) {   const correctIndex = questions[current].answer;   [...optionsEl.children].forEach((el, idx) => {     el.style.pointerEvents = "none";     if (idx === correctIndex) el.classList.add("correct");     else if (idx === selected) el.classList.add("incorrect"); 
  }); 
  if (selected === correctIndex) {     score++;     resultEl.textContent = "  Correct!"; 
  } else { 
    resultEl.textContent = "  Incorrect!"; 
  } 
} 
document.getElementById("next-btn").addEventListener("click", () => {   current++;   if (current < questions.length) {     loadQuestion(); 
  } else {     showScore(); 
  } }); 
function showScore() {   questionEl.textContent = `  Quiz Completed!`;   optionsEl.innerHTML = "";   resultEl.textContent = `Your Score: ${score} / ${questions.length}`; const key = `highScore_${topic}`;  const high = parseInt(localStorage.getItem(key) || "0");   if (score > high) {     localStorage.setItem(key, score);     highScoreEl.textContent = `  New High Score in ${topic.toUpperCase()}: ${score}`; 
  } else { 
    highScoreEl.textContent = `High Score in ${topic.toUpperCase()}: ${high}`; 
  } 
  const nextBtn = document.getElementById("next-btn");   nextBtn.style.display = "none";   
  // Remove old end buttons if reloaded   
    const oldRestart = document.getElementById("restart-btn");   const oldBoard = document.getElementById("board-btn");   if (oldRestart) oldRestart.remove();   if (oldBoard) oldBoard.remove(); 
  // Restart Button   
     const restartBtn = document.createElement("button");   restartBtn.id = "restart-btn";   restartBtn.textContent = "  Restart Quiz";   restartBtn.style.margin = "10px";   restartBtn.addEventListener("click", () => window.location.reload());   quizBox.appendChild(restartBtn); 
  // Scoreboard Button   
    const boardBtn = document.createElement("button");   boardBtn.id = "board-btn";   boardBtn.textContent = "  Go to Scoreboard";   boardBtn.style.margin = "10px";   boardBtn.addEventListener("click", () => {   window.location.href = "scoreboard.html"; 
 }); 
  quizBox.appendChild(boardBtn); 
} 
