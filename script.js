// ====== EVENTO DOM CONTENT LOADED ======
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initQuiz();
});

// ====== FUNÇÃO MODO ESCURO (DARK MODE) ======
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Verifica se o usuário já tinha uma preferência salva
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Salva a preferência no navegador
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

// ====== LÓGICA DO QUIZ INTERATIVO ======
const quizData = [
    {
        question: "Qual das seguintes tecnologias ajuda diretamente a evitar o desperdício de água no campo?",
        options: [
            "Uso de tratores maiores", 
            "Sistemas de irrigação por gotejamento", 
            "Uso excessivo de fertilizantes químicos", 
            "Aragem profunda do solo"
        ],
        correct: 1
    },
    {
        question: "O que caracteriza a rotação de culturas na agricultura sustentável?",
        options: [
            "Mudar a fazenda de lugar a cada ano", 
            "Alternar as espécies plantadas na mesma área para preservar o solo", 
            "Girar as plantas para que peguem mais sol", 
            "Vender a produção para diferentes países"
        ],
        correct: 1
    },
    {
        question: "Como os dejetos e resíduos orgânicos do agro podem ajudar o meio ambiente?",
        options: [
            "Sendo queimados ao ar livre", 
            "Sendo descartados em rios próximos", 
            "Sendo transformados em biomassa e biogás para gerar energia limpa", 
            "Deixando acumulados sem nenhum tratamento"
        ],
        correct: 2
    }
];

function initQuiz() {
    const quizWindow = document.getElementById('quiz-window');
    const quizResult = document.getElementById('quiz-result');
    const resultText = document.getElementById('result-text');
    const btnRestart = document.getElementById('btn-restart');

    let currentQuestionIndex = 0;
    let score = 0;

    function renderQuestion() {
        // Limpa a janela do quiz
        quizWindow.innerHTML = '';
        
        if (currentQuestionIndex < quizData.length) {
            const currentQuiz = quizData[currentQuestionIndex];
            
            // Cria o título da pergunta
            const questionElement = document.createElement('div');
            questionElement.className = 'question-title';
            questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuiz.question}`;
            quizWindow.appendChild(questionElement);
            
            // Cria a lista de opções
            const optionsList = document.createElement('div');
            optionsList.className = 'options-list';
            
            currentQuiz.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'option-btn';
                button.innerText = option;
                // Adiciona evento de clique para validar resposta
                button.addEventListener('click', () => handleAnswer(index));
                optionsList.appendChild(button);
            });
            
            quizWindow.appendChild(optionsList);
        } else {
            showResults();
        }
    }

    function handleAnswer(selectedIndex) {
        const correctAnswerIndex = quizData[currentQuestionIndex].correct;
        if (selectedIndex === correctAnswerIndex) {
            score++;
        }
        currentQuestionIndex++;
        renderQuestion();
    }

    function showResults() {
        quizWindow.classList.add('hidden');
        quizResult.classList.remove('hidden');
        resultText.innerText = `Você acertou ${score} de ${quizData.length} perguntas!`;
        
        if(score === quizData.length) {
            resultText.innerText += " 🎉 Excelente! Você é um mestre do Agro Sustentável.";
        } else if (score > 0) {
            resultText.innerText += " 👍 Muito bem! Continue estudando para proteger nosso futuro.";
        } else {
            resultText.innerText += " 🧑‍🌾 Que tal ler os nossos cards de Pilares e tentar novamente?";
        }
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizResult.classList.add('hidden');
        quizWindow.classList.remove('hidden');
        renderQuestion();
    }

    btnRestart.addEventListener('click', restartQuiz);
    
    // Inicializa a primeira pergunta
    renderQuestion();
}