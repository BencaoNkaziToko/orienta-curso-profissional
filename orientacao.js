const questions = [
  { question: "Você costuma desmontar e montar dispositivos eletrônicos por curiosidade?", key: "it_essentials" },
  { question: "Você já resolveu problemas técnicos por conta própria?", key: "it_essentials" },
  { question: "Você se sente atraído por entender como a internet funciona em um nível mais profundo?", key: "ccna" },
  { question: "Você já procurou aprender sobre protocolos de comunicação de redes?", key: "ccna" },
  { question: "Você se interessa por tecnologias de rastreamento veicular por motivos além da segurança?", key: "gps" },
  { question: "Você já pesquisou sobre como sistemas de GPS são usados em logística?", key: "gps" },
  { question: "Você gosta de resolver desafios de lógica ou quebra-cabeças?", key: "logica_programacao" },
  { question: "Você já tentou aprender uma linguagem de programação só por diversão?", key: "logica_programacao" },
  { question: "Você já desenvolveu um pequeno aplicativo ou website por conta própria?", key: "programacao" },
  { question: "Você sente vontade de explorar diferentes linguagens de programação?", key: "programacao" },
  { question: "Você se interessa por organizar e analisar grandes conjuntos de dados?", key: "banco_dados" },
  { question: "Você já se perguntou como grandes empresas lidam com o armazenamento de dados?", key: "banco_dados" },
  { question: "Você gosta de participar de eventos sociais ou de fazer networking?", key: "relacoes_publicas" },
  { question: "Você já se imaginou lidando com situações de crise de imagem empresarial?", key: "relacoes_publicas" },
  { question: "Você prefere trabalhar em equipes e liderar projetos?", key: "gestao_rh" },
  { question: "Você se considera bom em resolver conflitos ou mediar situações delicadas?", key: "gestao_rh" },
  { question: "Você gosta de buscar soluções para problemas do dia a dia?", key: "empreendedorismo" },
  { question: "Você já teve ideias de negócio que gostaria de transformar em realidade?", key: "empreendedorismo" },
  { question: "Você tem interesse em explorar diferentes campos da tecnologia?", key: "informatica" },
  { question: "Você já pensou em como a tecnologia pode impactar diferentes aspectos da sociedade?", key: "informatica" },
  { question: "Você gosta de desenhar ou criar modelos tridimensionais?", key: "autocad" },
  { question: "Você já imaginou projetando sua própria casa ou edifício?", key: "autocad" }
];

const courses = {
  it_essentials: { name: "IT Essentials", description: "Curso introdutório sobre fundamentos de TI.", career: "Técnico de suporte de TI", areas: ["Tecnologia da Informação"], objectives: "Preparar os alunos para a certificação CompTIA IT Fundamentals (ITF+)." },
  ccna: { name: "CCNA", description: "Curso de rede de computadores da Cisco.", career: "Especialista em redes", areas: ["Tecnologia da Informação", "Telecomunicações"], objectives: "Preparar os alunos para a certificação Cisco Certified Network Associate (CCNA)." },
  gps: { name: "GPS - Bloqueio e localização de viaturas", description: "Curso sobre tecnologias de rastreamento veicular.", career: "Técnico em segurança veicular", areas: ["Segurança", "Logística"], objectives: "Capacitar profissionais para instalação e manutenção de sistemas de rastreamento veicular." },
  logica_programacao: { name: "Lógica de Programação", description: "Curso introdutório sobre lógica de programação.", career: "Desenvolvedor de software", areas: ["Desenvolvimento de Software"], objectives: "Ensinar os conceitos fundamentais de lógica de programação para iniciantes." },
  programacao: { name: "Programação Web", description: "Curso sobre desenvolvimento de aplicações web.", career: "Desenvolvedor web", areas: ["Desenvolvimento de Software", "Web Development"], objectives: "Ensinar linguagens e tecnologias utilizadas para desenvolvimento de aplicações web." },
  banco_dados: { name: "Banco de Dados", description: "Curso sobre modelagem e gerenciamento de bancos de dados.", career: "Administrador de banco de dados", areas: ["Tecnologia da Informação", "Banco de Dados"], objectives: "Ensinar técnicas de modelagem, consulta e gerenciamento de bancos de dados." },
  relacoes_publicas: { name: "Relações Públicas", description: "Curso sobre gestão de comunicação empresarial.", career: "Profissional de Relações Públicas", areas: ["Comunicação", "Marketing"], objectives: "Preparar profissionais para gerir a comunicação e imagem de empresas e instituições." },
  gestao_rh: { name: "Gestão de Recursos Humanos", description: "Curso sobre gestão de pessoas e equipes.", career: "Gestor de Recursos Humanos", areas: ["Recursos Humanos", "Administração"], objectives: "Desenvolver habilidades de gestão de pessoas e liderança." },
  empreendedorismo: { name: "Empreendedorismo", description: "Curso sobre criação e gestão de negócios.", career: "Empreendedor", areas: ["Negócios", "Startups"], objectives: "Capacitar empreendedores para criar e gerir seus próprios negócios." },
  informatica: { name: "Informática", description: "Curso introdutório sobre informática.", career: "Técnico em informática", areas: ["Tecnologia da Informação"], objectives: "Ensinar conceitos básicos de informática e uso de software." },
  autocad: { name: "AutoCAD", description: "Curso de desenho assistido por computador.", career: "Desenhista técnico", areas: ["Engenharia", "Arquitetura"], objectives: "Ensinar o uso do software AutoCAD para desenho técnico." }
};

const modal = document.getElementById("modal");
const quizCard = document.getElementById("quizCard");
let currentQuestionIndex = 0;
let answers = {};

showQuestion(currentQuestionIndex);

function showQuestion(index) {
  const question = questions[index];
  const cardContent = `
    <p>${question.question}</p>
    <div>
      <input type="radio" id="yes${index}" name="question${index}" value="yes">
      <label for="yes${index}">Sim</label>
      <input type="radio" id="no${index}" name="question${index}" value="no">
      <label for="no${index}">Não</label>
    </div>
    <button id="nextBtn">Próxima</button>
  `;
  quizCard.innerHTML = cardContent;

  const nextBtn = document.getElementById("nextBtn");
  nextBtn.addEventListener("click", function() {
    const answer = document.querySelector(`input[name="question${index}"]:checked`);
    if (answer) {
      answers[question.key] = answer.value;
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
      } else {
        showResult();
      }
    } else {
      alert("Por favor, selecione uma opção.");
    }
  });
}



let titulo = "RESULTADOS: Cursos compatíveis com seus Interesses"
function showResult() {
  const result = calculateResult();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";


  const d = document.createElement("d");
  d.innerHTML = `<hr><h1>${titulo}</h1></hr>`;
  resultDiv.appendChild(d);

  for (const course in result) {
    if (result[course] > 0) {
      const p = document.createElement("p");
      p.innerHTML = `<strong>${courses[course].name}:</strong> ${courses[course].description}<br><em>Saídas profissionais:</em> ${courses[course].career}<br><em>Áreas de atuação:</em> ${courses[course].areas.join(", ")}<br><em>Objetivos do curso:</em> ${courses[course].objectives}<br><br>`;
      resultDiv.appendChild(p);
    }
  }

  modal.style.display = "block";
}

function calculateResult() {
  const result = {
    it_essentials: 0,
    ccna: 0,
    gps: 0,
    logica_programacao: 0,
    programacao: 0,
    banco_dados: 0,
    relacoes_publicas: 0,
    gestao_rh: 0,
    empreendedorismo: 0,
    informatica: 0,
    autocad: 0
  };

  for (const key in answers) {
    if (answers[key] === "yes") {
      result[key]++;
    }
  }

  return result;
}

document.getElementsByClassName("close")[0].addEventListener("click", function() {
  modal.style.display = "none";
  location.reload();
});

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


