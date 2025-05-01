    document.getElementById("certificadoForm").addEventListener("submit", function(event) {
      event.preventDefault();

      const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeVPjylC48FwGo1LUUn9mBZxxOyddAbwCFG9QRX5XgdIQi02A/formResponse";
      const formData = new FormData();

      // Substitua pelos seus entry.X reais:
      formData.append("entry.1556172680");
  

      fetch(formUrl, {
        method: "POST",
        mode: "no-cors", // Importante: evita erros de CORS
        body: formData
      });

      alert("Enviado com sucesso (mesmo sem resposta do Google)!");
      this.reset();
    });

document.getElementById("certificadoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeVPjylC48FwGo1LUUn9mBZxxOyddAbwCFG9QRX5XgdIQi02A/formResponse";
    
    const formData = new FormData();

    // Substitua pelos seus entry.X reais:
    formData.append("entry.1556172680", this.nome.value);
    
    fetch(formUrl, {
      method: "POST",
      mode: "no-cors", // Importante: evita erros de CORS
      body: formData
    });

    alert("Enviado com sucesso (mesmo sem resposta do Google)!");
    this.reset();
  });





// Funções do primeiro quiz (Introdução)
  function checkAnswer() {
    const answers = {
        q1: 'C',
        q2: 'B',
        q3: 'C',
        q4: 'B',
        q5: 'C',
    };

    let score = 0;
    let total = Object.keys(answers).length;
    let feedback = '';

    for (let key in answers) {
        const selected = document.querySelector(`input[name="${key}"]:checked`);
        const correctAnswer = answers[key];
        const question = document.querySelector(`#${key}`);

        question.style.border = 'none';
        question.style.padding = '0';

        if (selected) {
            if (selected.value === correctAnswer) {
                score++;
                feedback += `✅ Pergunta ${key.replace('q', '')} correta<br>`;
                question.style.border = '2px solid green';
                question.style.padding = '10px';
            } else {
                feedback += `❌ Pergunta ${key.replace('q', '')} incorreta<br>`;
                question.style.border = '2px solid red';
                question.style.padding = '10px';
            }
        } else {
            feedback += `❌ Pergunta ${key.replace('q', '')} não respondida<br>`;
        }
    }

    document.getElementById('quiz-result').innerHTML = `Você acertou ${score} de ${total} perguntas.<br>${feedback}`;
    
    quiz1Completed = (score === total);
    checkFinalResult();
}

    // Funções do segundo quiz (Gestão de Projetos)
    function checkCaseStudyAnswer() {
        const answers = {
            qu1: 'B',
            qu2: 'B',
            qu3: 'B',
            qu4: 'B',
            qu5: 'B',
        };
    
        let score = 0;
        let total = Object.keys(answers).length;
        let feedback = '';
    
        for (let key in answers) {
            const selected = document.querySelector(`input[name="${key}"]:checked`);
            const correctAnswer = answers[key];
            const question = document.querySelector(`input[name="${key}"]`).closest('.mb-3');
    
            question.style.border = 'none';
            question.style.padding = '0';
    
            if (selected) {
                if (selected.value === correctAnswer) {
                    score++;
                    feedback += `✅ Pergunta ${key.replace('qu', '')} correta<br>`;
                    question.style.border = '2px solid green';
                    question.style.padding = '10px';
                } else {
                    feedback += `❌ Pergunta ${key.replace('qu', '')} incorreta<br>`;
                    question.style.border = '2px solid red';
                    question.style.padding = '10px';
                }
            } else {
                feedback += `❌ Pergunta ${key.replace('qu', '')} não respondida<br>`;
            }
        }
    
        document.getElementById('case-study-quiz-result').innerHTML = `Você acertou ${score} de ${total} perguntas.<br>${feedback}`;
        
        quiz2Completed = (score === total);
        checkFinalResult();
    }

    function resetCaseStudyQuiz() {
      document.getElementById('case-study-quiz-form').reset();
      document.getElementById('case-study-quiz-result').innerHTML = '';
      const questions = document.querySelectorAll('.mb-3');
      questions.forEach(question => {
        question.style.border = 'none';
        question.style.padding = '0';
      });
    }

    function toggleSidebar() {
      document.getElementById('sidebar').classList.toggle('show');
    }

// Quando o formulário for enviado, vamos gerar o PDF
document.getElementById('certificadoModal').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que o formulário recarregue a página

    // Coleta o nome do usuário
    var nome = document.getElementById('nome').value;

    // Cria um novo documento PDF usando jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape'); // Criando PDF em modo paisagem

    // Caminho da imagem do certificado (certificado em branco em formato PNG)
    const imagemCertificado = 'certificado.png';  // Substitua por seu caminho de imagem real

    // Adicionando a imagem do certificado ao PDF
    doc.addImage(imagemCertificado, 'PNG', 10, 10, 280, 200);  // Ajuste a posição e o tamanho conforme necessário

    // Centralizando o nome do usuário
    doc.setFontSize(30);
    doc.text(nome, 150, 106, null, null, 'center'); // Nome do usuário centralizado no PDF

    // Gerando o PDF como uma URL para abrir em uma nova aba
    const pdfUrl = doc.output('bloburl'); // Cria uma URL para o PDF gerado

    // Abrindo o PDF em uma nova aba
    window.open(pdfUrl, '_blank');  // Abre o PDF em uma nova aba
});

let quiz1Completed = false;
let quiz2Completed = false;

function checkFinalResult() {
    if (quiz1Completed && quiz2Completed) {
      document.getElementById('encerramento').style.display = 'block';
  
      // Abre o modal do certificado usando Bootstrap
      const certificadoModal = new bootstrap.Modal(document.getElementById('certificadoModal'));
      certificadoModal.show();
    }
  }

