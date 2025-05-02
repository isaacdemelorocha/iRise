// Controle de quizzes
let quiz1Completed = false;
let quiz2Completed = false;

// Verifica se ambos os quizzes foram concluídos
function checkFinalResult() {
  if (quiz1Completed && quiz2Completed) {
    document.getElementById('encerramento').style.display = 'block';

    // Abre o modal do certificado usando Bootstrap
    const certificadoModal = new bootstrap.Modal(document.getElementById('certificadoModal'));
    certificadoModal.show();
  }
}

// Função para validar o primeiro quiz
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

// Função para validar o segundo quiz (case-study)
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

// Reset do segundo quiz
function resetCaseStudyQuiz() {
  document.getElementById('case-study-quiz-form').reset();
  document.getElementById('case-study-quiz-result').innerHTML = '';
  const questions = document.querySelectorAll('.mb-3');
  questions.forEach(question => {
    question.style.border = 'none';
    question.style.padding = '0';
  });
}

// Toggle do menu lateral (caso seja usado)
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('show');
}

// Formulário de emissão de certificado (único handler)
document.getElementById("certificadoForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;

  // Envio para Google Forms
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeVPjylC48FwGo1LUUn9mBZxxOyddAbwCFG9QRX5XgdIQi02A/formResponse";
  const formData = new FormData();
  formData.append("entry.1556172680", nome);

  fetch(formUrl, {
    method: "POST",
    mode: "no-cors",
    body: formData
  });

  // Geração do PDF com jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('landscape');
  const imagemCertificado = 'certificado.png';

  doc.addImage(imagemCertificado, 'PNG', 10, 10, 280, 200);
  doc.setFontSize(30);
  doc.text(nome, 150, 106, null, null, 'center');

  const pdfUrl = doc.output('bloburl');
  window.open(pdfUrl, '_blank');

  // Fechar o modal
  const modalElement = document.getElementById('certificadoModal');
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  modalInstance.hide();

  alert("Certificado gerado com sucesso!");
  this.reset();
});
