const questions = [
  {
    question: "বাংলাদেশের রাজধানী কোনটি?",
    options: ["ঢাকা", "চট্টগ্রাম", "খুলনা", "রাজশাহী"],
    correct: "ঢাকা"
  },
  {
    question: "HTML এর পূর্ণরূপ কী?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text Management Language"],
    correct: "Hyper Text Markup Language"
  },
  {
    question: "CSS এর কাজ কী?",
    options: ["স্টাইলিং","ডাটাবেস","সার্ভার","অ্যালগরিদম"],
    correct: "স্টাইলিং"
  },
  {
    question: "JavaScript কোন ধরনের ভাষা?",
    options: ["Programming","Markup","Styling","Database"],
    correct: "Programming"
  },
  {
    question: "React কে তৈরি করেছে?",
    options: ["Google","Facebook","Microsoft","Apple"],
    correct: "Facebook"
  }
];

let currentQuestion = 0;
let score = 0;

function showQuestion() {
  // প্রশ্ন নম্বর দেখানো
  document.getElementById("question").innerText = 
    `Question ${currentQuestion + 1} of ${questions.length}: ${questions[currentQuestion].question}`;
  
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  questions[currentQuestion].options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(btn);
  });
}
 
function checkAnswer(selected) {
  if (selected === questions[currentQuestion].correct) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    document.getElementById("quiz").innerHTML = `<h2>Quiz Finished!</h2><p>Final Score: ${score} out of ${questions.length}</p>`;
  }
}

showQuestion();
